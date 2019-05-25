import React, { Component } from 'react';
import { Button, Input } from 'antd';
import api from '../../../axios'


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };
    }

    componentDidMount() {
        // if the user is authenticated redirect to dashboard
        api
            .get('/auth/isAuth')
            .then(() => this.props.history.push('/admin/dashboard'))
            .catch((err) => console.warn(err));
    }

    handleInputChange = e => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    };

    handleFormSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;

        api
            .post('/auth/login', {
                email,
                password
            })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                this.props.history.push('/admin/dashboard');
            })
            .catch(err => {
                if (err.response)
                    this.setState({ errorMessage: err.response.data.message });
            })
    };

    render() {
        const { email, password, errorMessage } = this.state;
        return (
            <div className="Admin-login">
                <form onSubmit={this.handleFormSubmit}>
                    <Input
                        name="email"
                        onChange={this.handleInputChange}
                        value={email}
                        type="email"
                        required
                        placeholder="email" />
                    <Input
                        name="password"
                        onChange={this.handleInputChange}
                        value={password}
                        type="password"
                        minLength="8"
                        required
                        placeholder="password" />
                    <p className="error-message">{errorMessage}</p>
                    <div className="Admin-submit">
                        <Button
                            disabled={!email || !password}
                            type="primary"
                            htmlType="submit"
                        >Login</Button>
                    </div>
                </form>
            </div>
        );
    };
}

export default Login;

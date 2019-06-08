import React from 'react';
import './welcome.css';



export default () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <h1 className="welcome-title">
            <span className="user-name">{user.name} </span> you are an administrator, be careful.
        </h1>
    )
}

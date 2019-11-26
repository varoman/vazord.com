import React, {useEffect, useState} from 'react';
import { List, Avatar, Skeleton } from 'antd';
import AddEditUserModal from './AddEditUserModal/AddEditUserModal';
import api from '../../../axios';
import { Notifications } from '../../../components';
import { ConfirmRemovingModal } from '../../Admin';


export default () => {

    const [ isAddingUser, setIsAddingUser ] = useState(false);
    const [ deletingUserId, setDeletingUserId ] = useState();
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const toggleModal = state => setIsAddingUser(state);

    const createUser = user => {
        api
            .post('/user/create-temp', { user })
            .then((res) => {
                Notifications.showSuccess(res.message);
                toggleModal(false);
            });
    };

    const getUsers = () => {
        api
            .get('/user/all')
            .then(res => setUsers(res));
    };
    
    const handleDeleteUser = confirmed => {
        if (!confirmed) {
            return setDeletingUserId();
        }
        api
            .post('user/delete', { id: deletingUserId })
            .then(({ message }) => {
                getUsers();
                Notifications.showSuccess('User was deleted successfully');
                setDeletingUserId();
            });
    };

    return (
        <div>
            <ConfirmRemovingModal
                isOpen={!!deletingUserId}
                entity='user'
                onClose={handleDeleteUser}
            />
            <AddEditUserModal
                isOpen={isAddingUser}
                onToggleModal={toggleModal}
                onCreateUser={createUser}
            />
            <div className="manage-users-title">
                <h1>Manage Users</h1>
            </div>
            <div>
                <i  onClick={() => toggleModal(true)}
                    title="Click to add a user"
                    className="fa fa-user-plus"></i>
                <hr/>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={item => (
                        <List.Item
                            actions={[ <a key="edit">edit</a>, <a onClick={() => setDeletingUserId(item.id)}
                                                                  key="delete">delete</a>]}
                        >
                            <Skeleton avatar loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            style={{ backgroundColor: '#1C9BF7', verticalAlign: 'middle' }} >{item.name[0].toUpperCase()}
                                        </Avatar>
                                    }
                                    title={<a href="https://ant.design">{item.name}</a>}
                                    description={item.email}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
};

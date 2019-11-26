import React, { useState } from 'react';
import { List, Avatar, Skeleton } from 'antd';
import AddEditUserModal from './AddEditUserModal/AddEditUserModal';
import api from '../../../axios';
import { Notifications } from '../../../components';


export default () => {

    const [ isAddingUser, setIsAddingUser ] = useState(false);

    const toggleModal = state => setIsAddingUser(state);

    const createUser = user => {
        api
            .post('/user/create-temp', { user })
            .then((res) => {
                Notifications.showSuccess(res.message);
                toggleModal(false);
            });
    };

    return (
        <div>
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
                    dataSource={[{ name: { first: 'varo', last: 'manukyan' } }]}
                    renderItem={item => (
                        <List.Item
                            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                        >
                            <Skeleton avatar loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={<a href="https://ant.design">{item.name.last}</a>}
                                    description="varomanukyan@gmail.com"
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
};

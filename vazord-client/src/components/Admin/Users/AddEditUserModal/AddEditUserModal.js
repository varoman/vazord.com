import React, { useState } from 'react';
import { Modal, Select, Input } from 'antd';


const { Option } = Select;

export default ({ isOpen, onToggleModal, onCreateUser }) => {

    const [ user, setUser ] = useState(null);

    return (
        <Modal
            title="Add User"
            centered
            visible={isOpen}
            okText="Create User"
            onOk={() => onCreateUser(user)}
            okButtonProps={{ disabled: !user || !user.email || !user.role }}
            onCancel={() => onToggleModal(false)}
        >
            <div className="topic-input">
                <Input
                    type="email"
                    required
                    style={{ display: 'block'}}
                    className="article-input-item"
                    placeholder="Enter user email"
                    onChange={(e) => setUser({...user, email: e.target.value})}
                />
                <Select
                    onChange={(role) => setUser({...user, role})}
                    placeholder="Select user role"
                    style={{ width: 200}}
                >
                    <Option value="admin">Admin</Option>
                    <Option value="super">Super Admin</Option>
                </Select>
            </div>
        </Modal>
    );
};

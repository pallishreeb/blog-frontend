import React, { useContext } from 'react'
import authContext from '../context'
import { Avatar } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
const ViewProfile = () => {
    const { user } = useContext(authContext)
    return (
        <div className="user-profile-card">
            <div className="profile-header">
                <Avatar size={90} icon={<UserOutlined />} style={{ backgroundColor: '#0c4174' }} />
                <h2>{user?.name}</h2>
            </div>
            <div className="profile-info">
                <p><MailOutlined /> {" "} Email: {user?.email}</p>
                <p> <PhoneOutlined /> {" "} Phone Number: {user?.phoneNumber}</p>
            </div>
        </div>
    )
}

export default ViewProfile
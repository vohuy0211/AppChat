import React, { useEffect, useState } from 'react';
import styles from './ListUser.module.css'
import { AuthAPI } from '../../api/auth';
import { RoomAPI } from '../../api/room';
import { ChatAPI } from '../../api/chatRoom';
import { Link, useNavigate } from 'react-router-dom';

const ListUser = () => {
    const [dataUser, setDataUser] = useState([]);
    const navigate = useNavigate();
    const [interactingUser, setInteractingUser] = useState(null);

    const userLogin = localStorage.getItem('user')
    const userLoinId = JSON.parse(userLogin)

    const handleGetAllUser = async () => {
        const response = await AuthAPI.getAllUser();
        setDataUser(response.data.data)
    }

    useEffect(() => {
        handleGetAllUser()
    }, [])

    const handleCreateRoom = async (receiverId) => {
        try {
            await RoomAPI.createRoom({ userId: userLoinId.id, receiverId: receiverId })
            const roomId = await ChatAPI.getRoomById(userLoinId.id, receiverId)
            navigate(`/ChatAll/${roomId.data.data.id}`);
            setInteractingUser(receiverId);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.wrapperListUser}>
            <div>
                <input placeholder='Tìm kiếm người dùng' />
            </div>
            <hr></hr>
            <div className={styles.ChatUser}>
                <h3>Welcome {userLoinId.username}</h3>
            </div>
            <hr></hr>
            {dataUser
                .filter(user => user.id !== userLoinId.id)
                .map((user => (
                    <ul key={user.id}>
                        <li
                            onClick={() => handleCreateRoom(user.id)}
                            className={interactingUser === user.id ? styles.boldText : ''}
                        >
                            {user.username}
                            {/* <span>1</span> */}
                        </li>
                    </ul>
                )))}
            <div className={styles.logout}>
                <hr></hr>
                <Link to='/Login'>logOut</Link>
            </div>
        </div>
    )
}

export default ListUser

import React, { useEffect, useState } from 'react';
import styles from './ListUser.module.css'
import { AuthAPI } from '../../api/auth';
import { RoomAPI } from '../../api/room';
import { ChatAPI } from '../../api/chatRoom';
import { useNavigate } from 'react-router-dom';

const ListUser = () => {
    const [dataUser, setDataUser] = useState([]);
    const navigate = useNavigate(); 

    const handleGetAllUser = async () => {
        const response = await AuthAPI.getAllUser();
        setDataUser(response.data.data)
    }

    useEffect(() => {
        handleGetAllUser()
    }, [])

    const handleCreateRoom = async (receiverId) => {
        try {
            const userLogin = localStorage.getItem('user')
            const userLoinId = JSON.parse(userLogin)
            await RoomAPI.createRoom({ userId: userLoinId.id, receiverId: receiverId })
            const roomId = await ChatAPI.getRoomById(userLoinId.id, receiverId)
            navigate(`/ChatAll/${roomId.data.data.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.wrapperNavbar}>
            <ul className={styles.wrapperNavbarItem}>
                <div>
                    <h2>List User</h2>
                </div>
                {dataUser.map((user) => (
                    <li key={user.id} className={styles.NameUser}>
                        <button
                            onClick={() => handleCreateRoom(user.id)}
                        >{user.username}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListUser

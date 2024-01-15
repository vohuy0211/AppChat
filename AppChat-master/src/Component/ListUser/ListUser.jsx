import React, { useEffect, useState } from 'react';
import styles from './ListUser.module.css'
import { AuthAPI } from '../../api/auth';
import { RoomAPI } from '../../api/room';

const ListUser = () => {
    const [dataUser, setDataUser] = useState([]);

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
            console.log(userLoinId);
            await RoomAPI.createRoom({ userId: userLoinId.id, receiverId: receiverId })
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

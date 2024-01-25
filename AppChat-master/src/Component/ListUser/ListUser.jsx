import React, { useEffect, useState } from 'react';
import styles from './ListUser.module.css'
import { AuthAPI } from '../../api/auth';
import { RoomAPI } from '../../api/room';
import { ChatAPI } from '../../api/chatRoom';
import { Link, useNavigate } from 'react-router-dom';
import { IoCreateOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListUser = () => {
    const [dataUser, setDataUser] = useState([]);
    const navigate = useNavigate();
    const [interactingUser, setInteractingUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
            console.log(roomId.data.data.id);
            console.log(receiverId);
            await RoomAPI.createUserRoom({ userId: receiverId, roomId: roomId.data.data.id })
            // navigate(`/ChatAll/${roomId.data.data.id}`);
            setInteractingUser(receiverId);
            setIsModalVisible(!isModalVisible);
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <div className={styles.wrapperListUser}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className={styles.create}>
                <input placeholder='Tìm kiếm người dùng' />
                <IoCreateOutline className={styles.item} onClick={handleModalToggle} />
            </div>
            {isModalVisible && (
                <div className={styles.modal}>
                    <input placeholder='Nhập tên người dùng' />
                    {
                        dataUser.filter((user) => user.id !== userLoinId.id)
                            .map((user) => (
                                <h3 key={user.id} onClick={() => handleCreateRoom(user.id)}>
                                    {user.username} <CiCirclePlus className={styles.iconAdd} />
                                </h3>
                            ))
                    }
                    <button onClick={handleModalToggle}>Cancle</button>
                </div>
            )}
            <hr></hr>
            <div className={styles.ChatUser}>
                <h3>Welcome {userLoinId.username}</h3>
            </div>
            <hr></hr>
            <ul >
                <li
                // onClick={() => handleCreateRoom(user.id)}
                >
                    tên trong cuộc trò chuyện
                    {/* <span>1</span> */}
                </li>
            </ul>
            <div className={styles.logout}>
                <hr></hr>
                <Link to='/Login'>logOut</Link>
            </div>
        </div>
    )
}

export default ListUser

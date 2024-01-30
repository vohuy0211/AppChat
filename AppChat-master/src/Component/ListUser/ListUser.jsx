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
import { io } from 'socket.io-client';

const ListUser = () => {
    const [dataUser, setDataUser] = useState([]);
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userRoom, setUserRoom] = useState([]);
    const socket = io("ws://localhost:3000", {
        transports: ['websocket']
    });

    const userLogin = localStorage.getItem('user')
    const userLoinId = JSON.parse(userLogin)

    const handleGetAllUser = async () => {
        const response = await AuthAPI.getAllUser();
        setDataUser(response.data.data)
    }

    const handleGetUserRoom = async () => {
        const response = await RoomAPI.getAllUserRoom(userLoinId.id);
        setUserRoom(response.data.data);
    }

    useEffect(() => {
        handleGetAllUser()
        handleGetUserRoom()
    }, [])

    useEffect(() => {
        socket.on("chatMessage", async (message) => {
            try {
                if (message) {
                    handleGetUserRoom()
                }
            } catch (error) {
                console.log(error);
            }
        });

        return () => {
            socket.off("chatMessage");
        };
    }, [socket]);


    const handleNavigateRoom = async (receiverId) => {
        try {
            const roomId = await ChatAPI.getRoomById(userLoinId.id, receiverId)
            navigate(`/ChatAll/${roomId.data.data.id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCreateRoom = async (receiverId) => {
        try {
            await RoomAPI.createRoom({ userId: userLoinId.id, receiverId: receiverId })
            const roomId = await ChatAPI.getRoomById(userLoinId.id, receiverId)

            await RoomAPI.createUserRoom({ userIds: [userLoinId.id, receiverId], roomId: roomId.data.data.id })
            await handleGetUserRoom();

            setIsModalVisible(!isModalVisible);
        } catch (error) {
            console.log(error);
            setIsModalVisible(!isModalVisible);
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
            <ul>
                {userRoom.map((room) => {
                    const otherUser = room.Users.find(u => u.id !== userLoinId.id);
                    return otherUser ? (
                        <li key={room.id} onClick={() => handleNavigateRoom(otherUser.id)}>
                            <h3>{otherUser.username}</h3>
                        </li>
                    ) : null;
                })}
            </ul>
            <div className={styles.logout}>
                <hr></hr>
                <Link to='/Login'>logOut</Link>
            </div>
        </div>
    )
}

export default ListUser

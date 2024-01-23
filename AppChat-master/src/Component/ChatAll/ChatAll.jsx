import React, { useEffect, useState } from "react";
import styles from "./ChatAll.module.css"
import { ChatAPI } from "../../api/chatRoom";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatAll() {
  const { id } = useParams();
  const socket = io("ws://localhost:3000", {
    transports: ['websocket']
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [dataMsg, setDataMsg] = useState([]);
  const [newMessageFromOthers, setNewMessageFromOthers] = useState(false);

  const handleGetAllMsg = async (currentPage) => {
    try {
      const response = await ChatAPI.getMessagesByIdRoom(id, currentPage);
      setCurrentPage(response.data.data.currentPage);
      setDataMsg(response.data.data.messages)
      setTotalPages(response.data.data.pageTotal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetAllMsg(currentPage)
  }, [id, currentPage])


  const userId = JSON.parse(localStorage.getItem('user'));

  const sendMessage = async (id) => {
    try {
      const response = await ChatAPI.sendMessage({
        text: newMessage,
        userId: userId.id,
        roomId: id,
      });

      setDataMsg([...dataMsg, response.data.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const joinRoom = () => {
    socket.emit("joinRoom", id);
  };

  useEffect(() => {
    joinRoom(); 
    socket.on("chatMessage", (message) => {
      if (message.userId !== userId.id) {
        setNewMessageFromOthers(true);
        toast.info(`Bạn có một tin nhắn mới!`);
      }
      setDataMsg(prevData => [...prevData, message]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [userId.id, socket]);

  const formatTime = (time) => {
    const momentTime = moment(time);
    if (momentTime.isValid()) {
      return momentTime.format("HH:mm");
    } else {
      return moment(time, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("HH:mm");
    }
  };

  const handleLoadOlderMessages = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLoadNewerMessages = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleWheelScroll = (e) => {
    if (e.deltaY < 0 && currentPage > 1) {
      handleLoadOlderMessages();
    } else if (e.deltaY > 0 && currentPage < totalPages) {
      handleLoadNewerMessages();
    }
  };

  return (
    <div className={styles.wrapperListChat}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false} />
      <div className={styles.ChatUser}>
        TÊN NGƯỜI NHẬN TIN NHẮN
      </div>
      <hr></hr>
      <div className={styles.chatContent} onWheel={handleWheelScroll}>
        {dataMsg.map((msg, index) => (
          <div key={index} className={msg.userId === userId.id ? styles.messageReceiver : styles.messageSender}>
            {msg.User && msg.User.username} : {msg.text}
            <h6>{formatTime(msg.createdAt)}</h6>
          </div>
        ))}
      </div>
      <hr></hr>
      <div className={styles.sendMessages}>
        <input placeholder='Send Messages'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={() => sendMessage(id)}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatAll;
import React, { useEffect, useState } from "react";
import styles from "./ChatAll.module.css"
import { ChatAPI } from "../../api/chatRoom";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import moment from "moment";

function ChatAll() {
  const { id } = useParams();
  const socket = io("ws://localhost:3000", {
    transports: ['websocket']
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [dataMsg, setDataMsg] = useState([]);

  const handleGetAllMsg = async (currentPage) => {
    try {
      const response = await ChatAPI.getMessagesByIdRoom(id, currentPage);
      setCurrentPage(response.data.data.currentPage);
      setDataMsg(response.data.data.messages)
      setTotalPages(response.data.data.pageTotal);

      // const { messages, pageTotal } = response.data.data;

      // if (messages.length < 8 && currentPage > 1) {
      //   setCurrentPage(currentPage - 1);
      // } else {
      //   setCurrentPage(response.data.data.currentPage);
      //   setDataMsg(messages);
      //   setTotalPages(pageTotal);
      // }
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

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      setDataMsg([...dataMsg, message]);
    });
    return () => {
      socket.off("chatMessage");
    };
  }, [dataMsg]);

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


  return (
    <div className={styles.wrapperListChat}>
      <div className={styles.ChatUser}>
        TÊN NGƯỜI NHẬN TIN NHẮN
      </div>
      <hr></hr>
      <div className={styles.chatContent}>
        <div>
          <button onClick={handleLoadNewerMessages} disabled={currentPage === totalPages}>
            Xem tin nhắn cũ
          </button>
        </div>
        {dataMsg.slice().reverse().map((msg, index) => (
          <div key={index} className={msg.userId === userId.id ? styles.messageReceiver : styles.messageSender}>
            {msg.User && msg.User.username} : {msg.text}
            <h6>{formatTime(msg.createdAt)}</h6>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleLoadOlderMessages} disabled={currentPage === 1}>
          Xem tin nhắn mới
        </button>
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
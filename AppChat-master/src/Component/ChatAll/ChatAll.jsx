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
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [dataMsg, setDataMsg] = useState([]);

  const handleGetAllMsg = async () => {
    try {
      const response = await ChatAPI.getMessagesByIdRoom(id);
      setDataMsg(response.data.data.messages)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetAllMsg()
  }, [id])


  const userId = JSON.parse(localStorage.getItem('user'));

  const sendMessage = async (id) => {
    try {
      const response = await ChatAPI.sendMessage({
        text: newMessage,
        userId: userId.id,
        roomId: id,
      });

      setMessages([...messages, response.data.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      console.log("socket on ");
      console.log("haha", message);
      setMessages([...messages, message]);
    });
    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const formatTime = (time) => {
    const momentTime = moment(time);
    if (momentTime.isValid()) {
      return momentTime.format("HH:mm");
    } else {
      return moment(time, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("HH:mm");
    }
  };

  return (
    <div className={styles.wrapperLisChat}>
      <div className={styles.navbarName}>
        <h5>Tên người chat</h5>
      </div>
      <div className={styles.wrapperChat}>
        {Array.isArray(dataMsg) &&
          dataMsg.map((message) => (
            <li key={message.id} className={styles.chat1}>
              <h3>{message.User.username}</h3>
              <p>{message.text}</p>
            </li>
          ))}
        <div className={styles.inputSend}>
          <input placeholder="Nhập tin nhắn"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} />
          <button onClick={() => sendMessage(id)}>Gửi</button>
        </div>
      </div>
    </div>
  );
}

export default ChatAll;
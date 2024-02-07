import React, { useEffect, useState } from "react";
import styles from "./ChatAll.module.css"
import { ChatAPI } from "../../api/chatRoom";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsThreeDots } from "react-icons/bs";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMsgId, setCurrentMsgId] = useState(null);
  const [replyToMessage, setReplyToMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
    }
  };


  const sendMessage = async (id) => {
    if (!selectedImage && !newMessage) {
      return toast.error("lỗi");
    };
    console.log(selectedImage);

    const formData = new FormData();
    formData.append('text', newMessage);
    formData.append('userId', userId.id);
    formData.append('roomId', parseInt(id));
    if (replyToMessage) formData.append('replyId', replyToMessage.id);
    if (selectedImage) formData.append('img', selectedImage);

    try {
      console.log(formData);
      const response = await ChatAPI.sendMessage(formData);
      setNewMessage("");
      setReplyToMessage(null);
      setSelectedImage(null)
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      if (message.userId !== userId.id) {
        setNewMessageFromOthers(true);
      }
      handleGetAllMsg()
      setNewMessage("");
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

  const handleModalToggle = (msgId = null) => {
    setCurrentMsgId(msgId);
    setIsModalVisible(!isModalVisible);
  };

  const handleReplyToMessage = (msg) => {
    setIsModalVisible(false);
    setReplyToMessage(msg);
    console.log(msg);
  };

  const handleReCallMsg = async (currentMsgId) => {
    try {
      const response = await ChatAPI.getMsgById(currentMsgId);
      const messageData = response.data.data;
      console.log(messageData.id);

      if (userId.id !== messageData.userId) {
        toast.error("bạn không có quyền thu hồi tin nhắn này");
        return setIsModalVisible(!isModalVisible);
      }

      if (messageData.status === 0) {
        const newStatus = 1;
        await ChatAPI.reCallMsg(currentMsgId, newStatus);

        const updatedMessages = dataMsg.map(msg =>
          msg.id === currentMsgId ? { ...msg, newStatus } : msg
        );
        setDataMsg(updatedMessages);
      }
      setIsModalVisible(!isModalVisible);
    } catch (error) {
      console.error("Error recalling message:", error);
      toast.error("bạn không có quyền thu hồi tin nhắn này");
    }
  }

  useEffect(() => {
    socket.on("reCallMsg", (message) => {
      console.log(message);
      setDataMsg((currentMessages) =>
        currentMessages.map((msg) =>
          msg.id === message ? { ...msg, status: 1, text: "Tin nhắn đã được thu hồi" } : msg
        )
      );
      handleGetAllMsg()
      return () => {
        socket.off("messageRecalled");
      };
    })
  }, [socket])


  return (
    <div className={styles.wrapperListChat}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false} />
      <div className={styles.ChatUser}>
        TÊN NGƯỜI NHẬN TIN NHẮN
      </div>
      <hr></hr>
      <div className={styles.chatContent} onWheel={handleWheelScroll}>
        {dataMsg.map((msg, index) => {
          const originalMsg = msg.replyId ? dataMsg.find(m => m.id === msg.replyId) : null;
          return (
            <div key={index} className={msg.userId === userId.id ? styles.messageReceiver : styles.messageSender}>
              {originalMsg && (
                <div className={styles.originalMessage}>
                  Replying to: {originalMsg.text}
                </div>
              )}
              {msg.User && msg.User.username} :
              {
                msg.status === 0
                  ? msg.text
                  : <i>Tin nhắn đã được thu hồi</i>
              }
              {msg.status === 0 && (
                <BsThreeDots
                  className={styles.iconDots}
                  onClick={() => handleModalToggle(msg.id)}
                />
              )}
              <h6>{formatTime(msg.createdAt)}</h6>
            </div>
          );
        })}
        {
          isModalVisible && currentMsgId && (
            <>
              <div className={styles.modalBackdrop} onClick={handleModalToggle}></div>
              <div className={styles.modal}>
                <button onClick={() => handleReCallMsg(currentMsgId)}>Thu hồi tin nhắn</button>
                <button onClick={() => {
                  const msgToReply = dataMsg.find(msg => msg.id === currentMsgId);
                  handleReplyToMessage(msgToReply);
                }}>Phản hồi tin nhắn</button>
              </div>
            </>
          )
        }
      </div>
      <div className={styles.replyToMessage}>
        {replyToMessage && (
          <>
            <p>Replying to: {replyToMessage.text}</p>
            <button onClick={() => setReplyToMessage(null)}>Cancel</button>
          </>
        )}
      </div>
      <hr></hr>
      <div className={styles.sendMessages}>
        <input placeholder='Send Messages'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={() => sendMessage(id)}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatAll;
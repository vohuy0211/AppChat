import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
import styles from "./ChatAll.module.css"
import { IoIosSend } from "react-icons/io";
import { ChatAPI } from "../../api/chatRoom";
import { io } from "socket.io-client";
const socket = io(window.location.origin, {
  transports: ['websocket'],
  upgrade: false,
  query: {
    debug: 'socket.io:*',
  },
});

function ChatAll() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [dataMsg, setDataMsg] = useState([]);

  const handleGetAllMsg = async () => {
    try {
      const response = await ChatAPI.getAllMessage();
      setDataMsg(response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleGetAllMsg()
  }, [])

  const userId = JSON.parse(localStorage.getItem('user'));

  const sendMessage = async () => {
    try {
      const response = await ChatAPI.sendMessage({
        text: newMessage,
        userId: userId.id,
      });

      socket.emit("chatMessage", response.data.data);
      setMessages(response.data.data);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      setMessages(message);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [messages]);


  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <MDBIcon fas icon="angle-left" />
              <p className="mb-0 fw-bold">Live chat</p>
              <MDBIcon fas icon="times" />
            </MDBCardHeader>
            <MDBCardBody className={styles.card}>
              {dataMsg.map((msg) => (
                <div key={msg.id}>
                  <li className={styles.msg}>
                    <div className={styles.avatar}>{msg.User.username}</div>
                    <div className="text_wrapper">
                      <div className="box bg-light-info">{msg.text}</div>
                    </div>
                  </li>
                </div>
              ))}
              <MDBTextArea
                className={styles.msgChat}
                label="Type your message"
                id="textAreaExample"
                rows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className={styles.btn}
                onClick={sendMessage}>
                <IoIosSend />
              </button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ChatAll;
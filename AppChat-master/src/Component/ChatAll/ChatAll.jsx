import React, { useEffect, useState } from "react";
import styles from "./ChatAll.module.css"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import Avatar from "react-avatar";

import { ChatAPI } from "../../api/chatRoom";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import moment from "moment";

function ChatAll() {
  const { id } = useParams();
  const socket = io(window.location.origin);
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
  }, [dataMsg])


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
      setMessages([...messages, message]);
    });
    return () => {
      socket.off("chatMessage");
    };
  }, [messages]);

  const formatTime = (time) => {
    const momentTime = moment(time);
    if (momentTime.isValid()) {
      return momentTime.format("HH:mm");
    } else {
      return moment(time, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("HH:mm");
    }
  };


  return (
    <MDBContainer
      fluid
      className={`py-5 ${styles.fullHeight}`}
      style={{ backgroundColor: "#eee" }}
    >
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Member
          </h5>
        </MDBCol>
        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled>
            {Array.isArray(dataMsg) && dataMsg.map((message) => (
              <li
                key={message.id}
                className={`d-flex justify-content-${message.userId === userId.id ? "end" : "start"
                  } mb-4`}
              >
                {message.userId !== userId.id && (
                  <Avatar
                    name={message.User.username} 
                    className={styles.avt}
                  />
                )}
                <MDBCard
                  className={`w-75 ${message.userId === userId.id ? "bg-info text-white" : ""
                    }`}
                >
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">{message.User.username}</p>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" /> {formatTime(message.createdAt)}
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">{message.text}</p>
                  </MDBCardBody>
                </MDBCard>
                {message.userId === userId.id && (
                  <Avatar
                    name={message.User.username} 
                    className={styles.avt}
                  />
                )}
              </li>
            ))}
            <li className="bg-white mb-3">
              <MDBTextArea
                label="Message"
                id="textAreaExample"
                rows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </li>
            <MDBBtn color="info" rounded className="float-end" onClick={() => sendMessage(id)}>
              Send
            </MDBBtn>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ChatAll;
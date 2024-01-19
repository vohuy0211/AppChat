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
    // <div className={styles.wrapperLisChat}>
    //   <div className={styles.navbarName}>
    //     <h5>Tên người chat</h5>
    //   </div>
    //   <div className={styles.wrapperChat}>
    //     {Array.isArray(dataMsg) &&
    //       dataMsg.map((message) => (
    //         <li key={message.id} className={styles.chat1}>
    //           <h3>{message.User.username}</h3>
    //           <p>{message.text}</p>
    //         </li>
    //       ))}
    //     <div className={styles.inputSend}>
    //       <input placeholder="Nhập tin nhắn"
    //         value={newMessage}
    //         onChange={(e) => setNewMessage(e.target.value)} />
    //       <button onClick={() => sendMessage(id)}>Gửi</button>
    //     </div>
    //   </div>
    // </div>
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className={styles.wrapperList}>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
        </MDBCol>
        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled className="text-white">
            <li className="d-flex justify-content-between mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />
              <MDBCard className="mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p className="fw-bold mb-0">Brad Pitt</p>
                  <p className="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 12 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>
            <li class="d-flex justify-content-between mb-4">
              <MDBCard className="w-100 mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p class="fw-bold mb-0">Lara Croft</p>
                  <p class="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 13 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium.
                  </p>
                </MDBCardBody>
              </MDBCard>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                width="60"
              />
            </li>
            <li className="d-flex justify-content-between mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />
              <MDBCard className="mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p className="fw-bold mb-0">Brad Pitt</p>
                  <p className="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 10 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>
            <li className="mb-3">
              <MDBTextArea label="Message" id="textAreaExample" rows={4} />
            </li>
            <MDBBtn color="light" size="lg" rounded className="float-end haha">
              Send
            </MDBBtn>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ChatAll;
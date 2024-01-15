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

// import { ChatAPI } from "../../api/chatRoom";
// import { io } from "socket.io-client";

function ChatAll() {
  // const socket = io(window.location.origin);
  // const [ messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState("");
  // const [dataMsg, setDataMsg] = useState([]);

  // const handleGetAllMsg = async () => {
  //   try {
  //     const response = await ChatAPI.getAllMessage();
  //     setDataMsg(response.data.data)
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   handleGetAllMsg()
  // }, [dataMsg])

  // const userId = JSON.parse(localStorage.getItem('user'));

  // const sendMessage = async () => {
  //   try {
  //     const response = await ChatAPI.sendMessage({
  //       text: newMessage,
  //       userId: userId.id,
  //     });

  //     setMessages([...messages, response.data.data]);
  //     setNewMessage("");
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  // useEffect(() => {
  //   socket.on("chatMessage", (message) => {
  //     setMessages([...messages, message]);
  //   });
  //   return () => {
  //     socket.off("chatMessage");
  //   };
  // }, [messages]);


  return (
    <MDBContainer fluid className={`py-5 ${styles.fullHeight}`} style={{ backgroundColor: "#eee" }}>
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Member
          </h5>
        </MDBCol>
        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled>
            <li className="d-flex justify-content-between mb-4">
              <Avatar name="huy" className={styles.avt}/>
              <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between p-3">
                  <p className="fw-bold mb-0">Brad Pitt</p>
                  <p className="text-muted small mb-0">
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
              <MDBCard className="w-100">
                <MDBCardHeader className="d-flex justify-content-between p-3">
                  <p class="fw-bold mb-0">Lara Croft</p>
                  <p class="text-muted small mb-0">
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
              <Avatar name="huy" className={styles.avt}/>
            </li>
            <li className="d-flex justify-content-between mb-4">
              <Avatar name="cười" className={styles.avt}/>
              <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between p-3">
                  <p className="fw-bold mb-0">Brad Pitt</p>
                  <p className="text-muted small mb-0">
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
            <li className="bg-white mb-3">
              <MDBTextArea label="Message" id="textAreaExample" rows={4} />
            </li>
            <MDBBtn color="info" rounded className="float-end">
              Send
            </MDBBtn>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ChatAll;
import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router";
import { INDEX_ROUTE } from "../../routes/routes";
import { listMessages, createMessages } from "../../actions/MessageActions";
import io from "socket.io-client";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MessageIcon from "@material-ui/icons/Message";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import moment from "moment";
import logo from "../../GyraMais_Regular.png";

const ChatPage = (props) => {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState();
  const endRef = useRef(null);

  const oldMessages = async () => {
    let response = await listMessages();
    if (response.status === 200) {
      setMessages(response.data.mensagens);
    }
  };

  const handleNewMessages = () => {
    const socket = io(process.env.REACT_APP_BASE_URL);

    socket.on("novaMensagem", (data) => {
      setMessages((messages) => [...messages, data.mensagem]);
      scrollToBottom(endRef);
    });
    // return () => {
    //   socket.off("novaMensagem");
    // }
  };

  useEffect(() => {
    if (!name) {
      props.history.push(INDEX_ROUTE);
    } else {
      oldMessages();
      handleNewMessages();
      scrollToBottom(endRef);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await createMessages({
      nomeRemetente: name,
      texto: message,
    });
    if (response.status === 201) {
      setMessage("");
    } else {
      alert(response.data.message);
    }
    // localStorage.setItem("name", name);
    // props.history.push(CHAT_ROUTE);
  };

  const handleExit = async () => {
    let response = await createMessages({
      nomeRemetente: "System",
      texto: `${name} saiu da sala.`,
    });
    if (response.status === 201) {
      localStorage.setItem("name", "");
      props.history.push(INDEX_ROUTE);
    } else {
      alert(response.data.message);
    }
  };

  const scrollToBottom = (ref) => {
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  const messageHeader = () => {
    return (
      <AppBar position="static" style={{ width: "100vw", backgroundColor: "white", marginBottom: 24}}>
        <Toolbar>
            <div style={{ flexGrow: 1 }} >
              <img src={logo} style={{ padding: 12 }} width="134" height="30" />
            </div>
            <IconButton style={{ padding: 12 }} onClick={() => handleExit()}>
              <ExitToAppIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    );
  };

  const messageBody = () => {
    return (
      <div style={{ maxHeight: "70vh", overflow: "auto", padding: 12 }} ref={endRef}>
        {messages &&
          messages.map((msg, index) => {
            return (
              <Card style={{ margin: 12, width: "100%" }} key={index}>
                <b
                  className={classNames({
                    my_message: msg.nomeRemetente === name,
                    system_message: msg.nomeRemetente === "System",
                  })}
                >
                  {msg.nomeRemetente}:
                </b>
                <div style={{ margin: 12 }} className="message">
                  <div className="message-text">
                    <span>{msg.texto}</span>
                  </div>
                  <div className="message-time">
                    <span>
                      {moment(msg.createdAt).format("D/MM/YYYY, h:mm:ss a")}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
    );
  };

  const messageFooter = () => {
    return (
      <div className="messages_footer" style={{ padding: 12 }}>
        <form onSubmit={handleSubmit}>
          <InputLabel style={{ width: "100%" }}>
            <Input
              style={{ padding: 12, width: "95%" }}
              type="text"
              placeholder="Escreva a mensagem"
              value={message || ""}
              name="message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton style={{ padding: 12 }} type="submit" value="Submit">
              <MessageIcon />
            </IconButton>
          </InputLabel>
        </form>
      </div>
    );
  };

  return (
    <Grid container>
      <Grid item lg={11} sm={11} xs={11}>
        {messageHeader()}
        {messageBody()}
        {messageFooter()}
      </Grid>
    </Grid>
  );
};

export default withRouter(ChatPage);

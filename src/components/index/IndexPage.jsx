import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { CHAT_ROUTE } from "../../routes/routes";
import { createMessages } from "../../actions/MessageActions";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../GyraMais_Regular.png";

const IndexPage = (props) => {
  const [name, setName] = useState(localStorage.getItem("name"));

  useEffect(() => {
    if (name) {
      props.history.push(CHAT_ROUTE);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.setItem("name", name);
    let response = await createMessages({
      nomeRemetente: "System",
      texto: `${name} entrou na sala.`,
    });
    if (response.status === 201) {
      props.history.push(CHAT_ROUTE);
    } else {
      alert(response.data.message);
    }
  };

  const messageHeader = () => {
    return (
      <AppBar position="static" style={{ width: "100vw", backgroundColor: "white", marginBottom: 24}}>
        <Toolbar>
            <div style={{ flexGrow: 1 }} >
              <img src={logo} style={{ padding: 12 }} width="134" height="30" />
            </div>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <>
    {messageHeader()}
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Card>
          <h1 style={{ padding: 12 }}>
            Bem vindo ao chat, favor informe seu nome para acessar.
          </h1>
          <form onSubmit={handleSubmit}>
            <InputLabel style={{ padding: 12 }}>
              Nome:
              <Input
                style={{ padding: 12 }}
                type="text"
                id="nameInput"
                placeholder="Informe seu nome"
                name="name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
              {/* <input
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            /> */}
              <Button
                style={{ padding: 12 }}
                size="small"
                color="primary"
                target="_blank"
                type="submit"
                value="Submit"
              >
                Entrar
              </Button>
            </InputLabel>
            {/* <input type="submit" value="Submit" /> */}
          </form>
        </Card>
      </Grid>
    </Grid>
    </>
  );
};

export default withRouter(IndexPage);

import React from 'react';
import { Link } from 'react-router-dom';
// import PageNotFound from '../assets/images/PageNotFound';

class NotFoundPage extends React.Component{
  render(){
    return (
    <div style={{textAlign:"center"}}>
      {/* <img src={PageNotFound}  /> */}
      <h1>Página não encontrada, favor confira a url, caso o erro persista entre em contato comigo(andreipaesfiguieredo@gmail.com).</h1>
      <p>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
    );     
  };
};

export default NotFoundPage;
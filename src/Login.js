import React, { useContext } from "react";
import { serveur } from "./constantes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "./App";


export function Login() {
  const navigate = useNavigate();
  const lecontext = useContext(TokenContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  function onChangeInputEmail(event) {
    setEmail(event.target.value);
  }
  function onChangeInputPassword(event) {
    setPassword(event.target.value);
  }

  async function handleClick() {
    const response = await fetch(`${serveur}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'email': email, 'password': password })
    });

    if (response.ok) {
      let data = await response.json();
      console.log(data);
      lecontext.setAccess_token(lecontext.access_token = data.token);
      console.log(`the token is ${lecontext.access_token}`);
      navigate("/subsriptions")
    } else {
      setErrorMessage("There's an error in the info, please try again")
      console.log("There's an error in the info, please try again")
    }
  }

  function cancel() {
    navigate("/")
  }

  return (
    <div className="container">
      <div className="title has-text-centered">
        <span>
          Login 
          </span>
        </div>
        <div className="box">
      <div className="field">
        <p className="control has-icons-left">
          <input
            key="email"
            autoComplete="email"
            className={(errorMessage ? ' input is-danger' : 'input')}
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChangeInputEmail}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left ">
          <input
            key="password"
            autoComplete="current-password"
            className={(errorMessage ? ' input is-danger' : 'input')}
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangeInputPassword}

          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>
      </div>
      <div className="field">
        <p className="control ">
          <button className="button is-success" onClick={handleClick}>
          <i className="fas fa-sign-in-alt"> Login </i>
          </button>
          <button className="button is-danger" style={{ marginLeft: "10px" }} onClick={cancel}>
            Cancel
          </button>
        </p>
      </div>
      <div className="field">
        {
          errorMessage &&
          <div key="divError" className="notification is-danger is-light">
            {errorMessage}
          </div>
        }
      </div>
    </div>
  )
}
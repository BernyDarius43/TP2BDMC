import React, { useContext } from "react";
import { TokenContext } from "./App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";




export function Menu() {
  const navigate = useNavigate();

  const lecontext = useContext(TokenContext)

  function logout() {
    lecontext.access_token = null;
    navigate("/");
  }
  return (
    <nav className="navbar is-dark" role="navigation"
      aria-label="main navigation" style={{ marginBottom: "20px" }}>
      <div className="navbar-brand">
        <Link to={"/"}>
          <div className="navbar-item navBar-link">
            <button className="button is-dark"><i className="fas fa-home"> Home </i></button>
          </div>
        </Link>
        <Link to={"/search"}>
              <div className="navbar-item navBar-link">
                 <button className="button is-dark"><i className="fas fa-search"> Page de recherche </i></button>
              </div>
              </Link>
        <button className="navbar-burger" aria-label="menu" aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        {
          lecontext.access_token !== null &&
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <Link to="/subsriptions">
                <div className="navBar-link navbar-item">
                  <p>

                    <button className="button is-dark">
                      <i className="fas fa-heart"> Subscriptions  </i>
                    </button>
                  </p>
                </div>
              </Link>
              <div className="navbar-item">
                <div className="buttons">
                  <button className="button is-dark" onClick={logout}>
                    <i className="fas fa-sign-out-alt"> Logout </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
        {
          lecontext.access_token === null &&
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/login">
                  <div className="navBar-link" style={{ marginLeft: "10px" }}>
                    <li className="button is-dark">
                    <i className="fas fa-sign-in-alt"> Login </i>
                    </li>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        }
      </div>
    </nav>
  )
}
import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import Footer from "../../components/Footer/Footer.js";
import { loginUser } from "../../actions/auth.js";

import loginImage from "./lo.jpg";
import SofiaLogo from "../../components/Icons/SidebarIcons/SofiaLogo.js";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../components/Icons/AuthIcons/LinkedinIcon.js";
import logo from "../../assets/logo.png"
// import axios

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated(token) {
    if (token) return true;
  }

  constructor(props) {
    super(props);

    this.state = {
      email: "gim",
      password: "123",
    };

    this.doLogin = this.doLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  doLogin(e) {
    e.preventDefault();
    this.props.dispatch(
      loginUser({ email: this.state.email, password: this.state.password })
    );
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/menu" },
    };

    if (
      Login.isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))
    ) {
      return <Redirect to={from} />;
    }

    return (
      <div className="auth-page">
        <Container className="col-12">
          <Row className="d-flex align-items-center">
            <Col xs={12} lg={7} md={7} className="right-column bg-dark">
              <div  style={{ verticleAlign: "top" }}>
                <img src={logo} alt='logo' />
                <table align='center'>
                  <tr>
                    <td className="text-left text-light">
                      
                       Welcome to Sanjaya Proffessionals tailors.!
                    
                    </td>
                  </tr>
                </table>
              </div>
            </Col>
            <Col xs={12} lg={5} md={5} className="left-column">
              <Widget className="widget-auth widget-p-lg ">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <p className="auth-header mb-0">Login</p>
                  <div className="logo-block">
                    {/* <SofiaLogo /> */}
                    <p className="mb-0"> </p>
                  </div>
                </div>
                <table align="center">
                  <tr>
                    <td>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        fill="currentColor"
                        class="bi bi-person-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                      </svg>
                    </td>
                  </tr>
                </table>

                <form>
                  <FormGroup className="my-3">
                    <FormText>Email</FormText>
                    <Input
                      id="email"
                      className="input-transparent pl-3"
                      value={this.state.email}
                      onChange={this.changeEmail}
                      type="email"
                      required
                      name="email"
                      placeholder="Email"
                    />
                  </FormGroup>
                  <FormGroup className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Password</FormText>
                      {/* <Link to="/error">Forgot password?</Link> */}
                    </div>
                    <Input
                      id="password"
                      className="input-transparent pl-3"
                      value={this.state.password}
                      onChange={this.changePassword}
                      type="password"
                      required
                      name="password"
                      placeholder="Password"
                    />
                  </FormGroup>
                  <div className="bg-widget d-flex justify-content-center">
                    <Button
                      className="btn bg-warning rounded-pill my-3 text-dark"
                      type="submit"
                      color="warning"
                      style={{ backgroundColor: "#0275d8", color: "#fff" }}
                      onClick={this.doLogin}
                    >
                      Login
                    </Button>
                    <br />
                  </div>
                  <br />
                </form>
              </Widget>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Login));

import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import {connect} from "react-redux";

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
} from "reactstrap";

import { logoutUser } from "../../actions/auth.js";
import { closeSidebar, openSidebar } from "../../actions/navigation.js";
import MenuIcon from "../Icons/HeaderIcons/MenuIcon.js";
import SearchBarIcon from "../Icons/HeaderIcons/SearchBarIcon.js";
import BellIcon from "../Icons/HeaderIcons/BellIcon.js";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon.js";

import ProfileIcon from "../../assets/navbarMenus/pfofileIcons/ProfileIcon.js";
import MessagesIcon from "../../assets/navbarMenus/pfofileIcons/MessagesIcon.js";
import TasksIcon from "../../assets/navbarMenus/pfofileIcons/TasksIcon.js";

import logoutIcon from "../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg";
import basketIcon from "../../assets/navbarMenus/basketIcon.svg";
import calendarIcon from "../../assets/navbarMenus/calendarIcon.svg";
import envelopeIcon from "../../assets/navbarMenus/envelopeIcon.svg";
import mariaImage from "../../assets/navbarMenus/mariaImage.jpg";
import notificationImage from "../../assets/navbarMenus/notificationImage.jpg";
import userImg from "../../assets/user.svg";
import { getSource } from "../../pages/db/server";

import s from "./Header.module.scss";
import "animate.css";
import axios from "axios";
import { Divider } from "@mui/material";

// import {getSource} from



class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);

    this.state = {
      menuOpen: false,
      notificationsOpen: false,
      searchFocused: false,
      user: [],
      loading: true,
    };

    
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  toggleSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
    } else {
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }

  toggleNotifications() {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: getSource()+"/users/me",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    }).then((response) => {
      this.setState({ user: response.data.payload[0], loading: false });
    }).catch((err)=>{
       localStorage.removeItem('user_token');
       localStorage.removeItem('authenticated');
       window.location.reload(true);
    });
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      );
    } else {
      return (
        <Navbar className={`${s.root} d-print-none`}>
          <div>
            <NavLink
              onClick={this.toggleSidebar}
              className={`d-md-none mr-3 ${s.navItem}`}
              href="#"
            >
              <MenuIcon className={s.menuIcon} />
            </NavLink>
          </div>
          <Form className="d-none d-sm-block" inline>
            <FormGroup>
              <InputGroup className="input-group-no-border">
                <Input
                  id="search-input"
                  placeholder="Search Dashboard"
                  className="focus"
                />
                <InputGroupAddon addonType="prepend">
                  <span>
                    <SearchBarIcon />
                  </span>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Form>
          <Nav className="ml-auto">
            <NavItem className="d-sm-none mr-4">
              <NavLink className="" href="#">
                <SearchIcon />
              </NavLink>
            </NavItem>

            <Dropdown
              isOpen={this.state.notificationsOpen}
              toggle={this.toggleNotifications}
              nav
              id="basic-nav-dropdown"
              className="ml-3"
            >
              <DropdownToggle nav caret className="navbar-dropdown-toggle">
                <span className={`${s.avatar} rounded-circle float-left mr-2`}>
                  {/* <img src={userImg} alt="User" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                </span>
                <span className="small d-none d-sm-block ml-1 mr-2 body-1">
                  Hi, {this.state.user.name}
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </DropdownToggle>
              <DropdownMenu
                className="navbar-dropdown profile-dropdown"
                style={{ width: "194px" }}
              >
                <DropdownItem className={s.dropdownProfileItem}>
                  <ProfileIcon />
                  <span>Profile</span>
                </DropdownItem>

                <NavItem>
                  <NavLink onClick={this.doLogout} href="#">
                    <button
                      className="btn btn-primary rounded-pill mx-auto logout-btn"
                      type="submit"
                    >
                      <img src={logoutIcon} alt="Logout" />
                      <span className="ml-1">Logout</span>
                    </button>
                  </NavLink>
                </NavItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Navbar>
      );
    }
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Header));


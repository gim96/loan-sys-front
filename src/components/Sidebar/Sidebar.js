import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
import { logoutUser } from "../../actions/auth.js";
import SofiaLogo from "../Icons/SidebarIcons/SofiaLogo.js";
import logo from "../../assets/logo.png";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    activeItem: "",
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener(
      "transitionend",
      () => {
        if (this.props.sidebarOpened) {
          this.element.classList.add(s.sidebarOpen);
        }
      },
      false
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.sidebarOpened !== prevProps.sidebarOpened) {
      if (this.props.sidebarOpened) {
        this.element.style.height = `276px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = "";
        }, 0);
      }
    }
  }

  doLogout(id) {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <nav
        className={s.root}
        ref={(nav) => {
          this.element = nav;
        }}
      >
        <header className={s.logo}>
          {/* <SofiaLogo /> */}
          {/* <span className={s.title}>Sanjaya Proffessionals</span> */}
           Loan Managemt System
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Dashboard"
            isHeader
            iconName={<i className={"eva eva-home-outline"} />}
            link="/menu/dashboard"
            index="dashboard"
            // badge="9"
          />
          <h5 className={s.navTitle}>
            <hr />
          </h5>
            {
                JSON.parse(localStorage.getItem('user')).role === 'admin' &&
                <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Products"
                isHeader
                iconName={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-box"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                  </svg>
                }
                link="/menu/products"
                index="products"
              />
            }
           {
                JSON.parse(localStorage.getItem('user')).role === 'admin' &&
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Loans"
            isHeader
            iconName={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-seam"
                viewBox="0 0 16 16"
              >
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
              </svg>
            }
            link="/menu/loans"
            index="loans"
          />
          }
            <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Shop"
            isHeader
            iconName={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-clipboard-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"
                />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
            }
            link="/menu/shop"
            index="typography"
          />
           {
                JSON.parse(localStorage.getItem('user')).role !== 'admin' &&
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="My Orders"
            isHeader
            iconName={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-clipboard-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"
                />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
            }
            link="/menu/my-orders"
            index="typography"
          />
          }
           {
                JSON.parse(localStorage.getItem('user')).role === 'admin' &&
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Customers"
            isHeader
            iconName={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-box"
                viewBox="0 0 16 16"
              >
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
              </svg>
            }
            link="/menu/customers"
            index="customers"
          />
  }
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));

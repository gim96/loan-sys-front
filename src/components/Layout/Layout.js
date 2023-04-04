import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

import Header from "../Header/Header.js";
import Sidebar from "../Sidebar/Sidebar.js";
import Footer from "../Footer/Footer.js";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs.js";

import Dashboard from "../../pages/dashboard/Dashboard.js";
import Charts from "../../pages/uielements/charts/Charts.js";
import Icons from "../../pages/uielements/icons/IconsPage.js";
import Maps from "../../pages/uielements/maps/google/GoogleMapPage";

import s from "./Layout.module.scss";
import Products from "../../pages/products/index.js";
import Customers from "../../pages/customers/index.js";
import MyOrders from "../../pages/myOrders/index.js";
import BookingOrders from "../../pages/shop/index.js";
import Loans from "../../pages/loans/index.js"

class Layout extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarOpened: false,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.wrap}>
          <Header />
          <Sidebar />
          <main className={s.content}>
            <Breadcrumbs url={this.props.location.pathname} />
            <Switch>
              <Route
                path="/menu"
                exact
                render={() => <Redirect to="menu/dashboard" />}
              />
              <Route path="/menu/dashboard" exact component={Dashboard} />
              <Route path="/menu/products/" exact component={Products} />
              <Route path="/menu/customers" exact component={Customers} />
              <Route path="/menu/my-orders" exact component={MyOrders} />
              <Route path="/menu/shop" exact component={BookingOrders} />
              <Route path="/menu/loans" exact component={Loans} />
              <Route
                path="/menu/ui-elements"
                exact
                render={() => <Redirect to={"/template/ui-elements/charts"} />}
              />
              <Route
                path="/template/ui-elements/charts"
                exact
                component={Charts}
              />
              <Route
                path="/template/ui-elements/icons"
                exact
                component={Icons}
              />
              <Route path="/template/ui-elements/maps" exact component={Maps} />
              <Route path="*" exact render={() => <Redirect to="/error" />} />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));

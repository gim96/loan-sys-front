import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

import Header from "../Header/Header.js";
import Sidebar from "../Sidebar/Sidebar.js";
import Footer from "../Footer/Footer.js";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs.js";

import Dashboard from "../../pages/dashboard/Dashboard.js";
import CreateOrder from "../../pages/create_order/CreateOrder.js";
import Bill from "../../pages/create_order/Bill.js";
// import Notifications from "../../pages/notifications/ClosedOrders.js";
// import Tables from "../../pages/tables/PendingOrders.js";
// import ViewOrder from "../../pages/reports/ViewOrder.js.js";
import Charts from "../../pages/uielements/charts/Charts.js";
import Icons from "../../pages/uielements/icons/IconsPage.js";
import Maps from "../../pages/uielements/maps/google/GoogleMapPage";

import s from "./Layout.module.scss";
import Items from "../../pages/items/index.js";
import Stocks from "../../pages/stock/index.js";
import ClosedOrders from "../../pages/closedOrders/index.js";
import Expenses from "../../pages/expenses/index.js";
import Customers from "../../pages/customers/index.js";
import Suppliers from "../../pages/suppliers/index.js";
import OngoingOrders from "../../pages/Ongoing_orders/index.js";
import BookingOrders from "../../pages/shop/index.js";

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
              <Route path="/menu/createOrder" exact component={CreateOrder} />
              <Route path="/menu/bill" exact component={Bill} />
              <Route path="/menu/items/" exact component={Items} />
              <Route path="/menu/stock" exact component={Stocks} />
              <Route path="/menu/closed-orders" exact component={ClosedOrders} />
              <Route path="/menu/customers" exact component={Customers} />
              <Route path="/menu/suppliers" exact component={Suppliers} />
              <Route path="/menu/ongoing-orders" exact component={OngoingOrders} />
              <Route path="/menu/shop" exact component={BookingOrders} />
              {/* <Route
                path="/menu/viewOrder/:orderId"
                exact
                component={ViewOrder}
              /> */}

              <Route path="/menu/expenses" exact component={Expenses} />
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

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import ApexActivityChart from "./components/ActivityChart.js";

import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";
import { getSource } from "../../pages/db/server";
import axios from "axios";
import moment from "moment";

import s from "./Dashboard.module.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOne = this.toggleOne.bind(this);
    this.toggleTwo = this.toggleTwo.bind(this);
    this.toggleThree = this.toggleThree.bind(this);

    this.state = {
      dropdownOpenOne: false,
      dropdownOpenTwo: false,
      dropdownOpenThree: false,
      checkboxes: [false, true],

      pendingCount: 0,
      totalCount: 0,
      closedCount: 0,
      pendingItemsCount: 0,
      ClosedItemsCount: 0,
      totalItemCount: 0,
      paidAmount: 0,
      toPaidAmount: 0,
      amount: 0,

      expenses: 0,
      totalOrders:0,
      rejectedOrders:0,

      loading: false,
    };
  }

  meals = [meal1, meal2, meal3];

  toggleOne() {
    this.setState({
      dropdownOpenOne: !this.state.dropdownOpenOne,
    });
  }

  toggleTwo() {
    this.setState({
      dropdownOpenTwo: !this.state.dropdownOpenTwo,
    });
  }

  toggleThree() {
    this.setState({
      dropdownOpenThree: !this.state.dropdownOpenThree,
    });
  }

  changeCheck(event, checkbox, id) {
    this.state[checkbox][id] = event.target.checked;

    if (!event.target.checked) {
      this.state[checkbox][id] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }

  componentDidMount() {
    //orders
    
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
        <div>
          <Row>
            <Col className="pr-grid-col" xs={12} lg={12}>
              <Row className="gutter mb-4">
                <Col className="mb-4 mb-md-0" xs={12} md={2}>
                  <b>Daily summery</b>
                </Col>
                <Col className="mb-4 mb-md-0" xs={12} md={10}>
                  <hr />
                </Col>
              </Row>
              <Row className="gutter mb-4">
                <Col className="mb-4 mb-md-0" xs={12} md={6}>
                  <Widget className="">
                    <table
                      width="100%"
                      cellPadding="10"
                      style={{
                        backgroundColor: "#4d53e0",
                        color: "#fff",
                        borderRadius: 10,
                      }}
                    >
                      <tbody>
                        <tr>
                          <td width="70%" style={{ color: "#fff" }}>
                            <br />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="64"
                              height="64"
                              fill="currentColor"
                              class="bi bi-cash-coin"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                              />
                              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                            </svg>
                          </td>
                          <td
                            align="center"
                            style={{ color: "#fff", paddingTop: "5%" }}
                          >
                            <br />
                            <h3>
                              {/* Rs.
                              {(
                                Math.round(this.state.amount * 100) / 100
                              ).toFixed(2)} */}
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6 style={{ color: "#fff" }}>Current balance</h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Widget>
                </Col>
                <Col className="mb-4 mb-md-0" xs={12} md={6}>
                  <Widget className="">
                    <table
                      width="100%"
                      cellPadding="10"
                      style={{
                        backgroundColor: "#4d53e0",
                        color: "#fff",
                        borderRadius: 10,
                      }}
                    >
                      <tbody>
                        <tr>
                          <td width="70%" style={{ color: "#fff" }}>
                            <br />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="64"
                              height="64"
                              fill="currentColor"
                              class="bi bi-wallet"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                            </svg>
                          </td>
                          <td
                            align="center"
                            style={{ color: "#fff", paddingTop: "5%" }}
                          >
                            <br />
                            <h3>
                              {/* Rs.
                              {(
                                Math.round(this.state.expenses * 100) / 100
                              ).toFixed(2)} */}
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6 style={{ color: "#fff" }}>Expenses</h6>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Widget>
                </Col>
              </Row>

              <Row className="gutter mb-4">
                <Col className="mb-4 mb-md-0" xs={12} md={4}>
                  <Widget className="">
                    <table
                      width="100%"
                      cellPadding="10"
                      style={{
                        backgroundColor: "#fff",
                        // color: "#fff",
                        fontWeight: "bold",
                        borderRadius: 10,
                      }}
                    >
                      <tbody>
                        <tr>
                          <td width="70%">Sold Items</td>
                          {/* <td align="right">{this.state.totalItemCount}</td> */}
                        </tr>
                      </tbody>
                    </table>
                  </Widget>
                </Col>
                <Col className="mb-4 mb-md-0" xs={12} md={4}>
                  <Widget className="">
                    <table
                      width="100%"
                      cellPadding="10"
                      style={{
                        backgroundColor: "#fff",
                        // color: "#fff",
                        fontWeight: "bold",
                        borderRadius: 10,
                      }}
                    >
                      <tbody>
                        <tr>
                          <td width="70%">success bills</td>
                          {/* <td align="right">{this.state.totalOrders}</td> */}
                        </tr>
                      </tbody>
                    </table>
                  </Widget>
                </Col>
                <Col className="mb-4 mb-md-0" xs={12} md={4}>
                  <Widget className="">
                    <table
                      width="100%"
                      cellPadding="10"
                      style={{
                        backgroundColor: "#fff",
                        // color: "#fff",
                        fontWeight: "bold",
                        borderRadius: 10,
                      }}
                    >
                      <tbody>
                        <tr>
                          <td width="70%">Rejected bills</td>
                          {/* <td align="right">{this.state.rejectedOrders}</td> */}
                        </tr>
                      </tbody>
                    </table>
                  </Widget>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Dashboard;

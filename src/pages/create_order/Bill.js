import React from "react";
import { Col, Row } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import moment from "moment";
import { getSource } from "../../pages/db/server";

import "./print.css";

class Bill extends React.Component {
  // const classes = useStyles();

  constructor(props) {
    super(props);

    this.state = {
      customerCode: "",
      date: "",

      itemName: "",
      // unitPrice: "",
      total: 0,

      description: "",
      brand: "",
      unitPrice: "",
      quantity: "",
      amount: "",
      user: [],

      itemCodes: [],
      itemCode: "",
      currentItem: [],
      stock: [],
      currentOrder: 0,
      orderId: 0,
      //
      discount: 0,
      subTotal: 0,
      cash: 0,
      balance: 0,

      items: [],
      loading: false,
      show: false,
    };
  }

  componentDidMount() {
    this.setState({
      date:
        moment(new Date()).format("YYYY-MM-DD") + " " + moment().format("LT"),
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
        <div>
          <body>
            <Row>
              <Col className="mb-4" xs={12}>
                <Widget className="widget-p-lg">
                  <table width="100%" align="left" id="my_section">
                    <tr>
                      <td>
                        <div
                          class="card"
                          style={{
                            width: "100%",
                            //   backgroundColor: "blue",
                            color: "#555",
                          }}
                        >
                          <div class="card-body">
                            <table width="100%">
                              <tr>
                                <td>
                                  <h4>Nildiya Stores</h4>
                                  No 14 , galle rad colombo.
                                  <br />
                                  phone:077X XXX XXX
                                  <br />
                                  <b>Salse invoice</b>
                                </td>
                              </tr>

                              <tr>
                                <td>
                                  <hr />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table width="100%">
                                    <tr>
                                      <td> user : {this.state.user.name}</td>
                                      <td align="right">{this.state.date}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Invoice no :{" "}
                                        {this.state.orderId * 1 + 1}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <hr />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table width="100%">
                                    <tr>
                                      <td style={{ fontWeight: "bold" }}>
                                        Item
                                      </td>
                                      <td style={{ fontWeight: "bold" }}>
                                        Brand
                                      </td>
                                      <td
                                        style={{ fontWeight: "bold" }}
                                        align="right"
                                      >
                                        Price
                                      </td>
                                      <td
                                        style={{ fontWeight: "bold" }}
                                        align="center"
                                      >
                                        Qty
                                      </td>
                                      <td
                                        style={{ fontWeight: "bold" }}
                                        align="right"
                                      >
                                        Amount
                                      </td>
                                    </tr>
                                    {this.state.items.map((data, index) => {
                                      return (
                                        <tr>
                                          <td>{data.name}</td>
                                          <td>{data.brand}</td>
                                          <td align="right">
                                            {data.unit_price}
                                          </td>
                                          <td align="center">
                                            {data.quantity}
                                          </td>
                                          <td align="right">{data.amount}</td>
                                        </tr>
                                      );
                                    })}
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <hr />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table width="100%">
                                    <tr>
                                      <td>Total</td>
                                      <td align="right">{this.state.total}</td>
                                    </tr>
                                    <tr>
                                      <td>Discount</td>
                                      <td align="right">
                                        {this.state.discount}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Sub total</td>
                                      <td align="right">
                                        {this.state.subTotal}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Cash</td>
                                      <td align="right">{this.state.cash}</td>
                                    </tr>
                                    <tr>
                                      <td>Balance</td>
                                      <td align="right">
                                        {this.state.balance}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <hr />
                                </td>
                              </tr>
                              <tr>
                                <td align="center">
                                  Thank you come again.!
                                  <br />
                                  Software by syntaxcore technologies
                                  <br />
                                  Tel : 0701 771 032
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>&nbsp;</td>
                    </tr>

                    <tr>
                      <td align="right"></td>
                    </tr>
                  </table>
                  <br />
                  <butto
                    className="btn btn-primary"
                    onClick={() => window.print()}
                  >
                    {" "}
                    print
                  </butto>
                </Widget>
              </Col>
            </Row>
          </body>
        </div>
      );
    }
  }
}

export default Bill;

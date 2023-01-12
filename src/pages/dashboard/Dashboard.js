import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardHeader, CardBody, Col, Row, CardSubtitle, CardTitle, CardText, Button, CardFooter } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import ApexActivityChart from "./components/ActivityChart.js";
import ReactApexChart from "react-apexcharts";
import {token_header} from "../../utils/tokenHeader";
// import {token_header} from "../.."
import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";
import { getSource } from "../../pages/db/server";
import axios from "axios";
import moment from "moment";

import CheckroomIcon from '@mui/icons-material/Checkroom';


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
      summery:[],

      loading: false,
      series: [
            0, 
            0,
            0
          ],
            options: {
              chart: {
                type: 'donut',
               
              },
              labels:['Booking','Pending','Closed'],
              responsive: [{
                breakpoint: 280,
                options: {
                  chart: {
                    width: 25
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
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

  getData() {
    axios.get(`${getSource()}/orders/summery`, token_header)
    .then((resp) => {
        const allThreeOrders = [resp.data.payload.booking_orders, resp.data.payload.pending_orders, resp.data.payload.closed_orders]
        this.setState({
          summery:resp.data.payload, 
          series:allThreeOrders
        });
        // setAllOrders(resp.data.payload);
    })  
    .catch((err) => {
        console.log(err);
    })
  }

  componentDidMount() {
    // const userData = JSON.parse(localStorage.getItem('user'))
    // if (window.location.pathname === '/#/menu/dashboard' && userData.role !== 'admin') {
    //   window.location.href = '/#/menu/createOrder'
    // }
    this.getData();
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
          {
            JSON.parse(localStorage.getItem('user')).role === 'admin' ? (
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
                  <Col className="mb-4 mb-md-0" lg={3} xs={12} md={6}>
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
                                width="32"
                                height="32"
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
                              
                                {/* {(
                                 this.state.summery && Math.round(this.state.summery[0] * 100) / 100
                                ).toFixed(2)} */}
                              </h3>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6 style={{ color: "#fff" }}>Earnings</h6>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Widget>
                  </Col>
                  <Col className="mb-4 mb-md-0" lg={3} xs={12} md={6}>
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clipboard-plus" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
                                 <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                              </svg>
                            </td>
                            <td
                              align="center"
                              style={{ color: "#fff", paddingTop: "5%" }}
                            >
                              <br />
                              <h3>
                             {this.state.summery.booking_orders }
                              </h3>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6 style={{ color: "#fff" }}>Bookings</h6>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Widget>
                  </Col>
                  <Col className="mb-4 mb-md-0" lg={3} xs={12} md={6}>
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clipboard-pulse" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1H3a1 1 0 0 0-1 1V14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3.5a1 1 0 0 0-1-1h-1v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Zm6.979 3.856a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.895-.133L4.232 10H3.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 .416-.223l1.41-2.115 1.195 3.982a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h1.5a.5.5 0 0 0 0-1h-1.128L9.979 5.356Z"/>
                              </svg>
                            </td>
                            <td
                              align="center"
                              style={{ color: "#fff", paddingTop: "5%" }}
                            >
                              <br />
                              <h3>
                              
                              {this.state.summery.pending_orders }
                              </h3>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6 style={{ color: "#fff" }}>Pending Orders</h6>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Widget>
                  </Col>
                  <Col className="mb-4 mb-md-0" lg={3} xs={12} md={6}>
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                              </svg>
                            </td>
                            <td
                              align="center"
                              style={{ color: "#fff", paddingTop: "5%" }}
                            >
                              <br />
                              <h3 className="pt-10">
                              {this.state.summery.closed_orders }
                              </h3>
                             
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <h6 style={{ color: "#fff" }}>Closed Orders</h6>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Widget>
                  </Col>
                </Row>
  
               
                <Row>
                  <Col lg={6}>
                    <Card className="p-5">
                      <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
                    </Card>
                   
                  </Col>
                  <Col lg={6}>
                    {/* <Row>
                      <Col lg={6}>
                        <Card className="p-5">
                          <CheckroomIcon fontSize="55px" />
                        </Card>
                      </Col>
                      <Col lg={6}>
                        <Card className="p-5">
                          fdf
                        </Card>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col lg={6}>
                        <Card className="p-5">
                          fdf
                        </Card>
                      </Col>
                      <Col lg={6}>
                        <Card className="p-5">
                          fdf
                        </Card>
                      </Col>
                    </Row> */}
                  </Col>
                </Row>
              </Col>
            </Row>
            ) : (
              <Row>
                <Col lg={12}>
                  <hr />
                  <h6 className='pl-1'>Quick Links</h6>
                  <Row className='pt-1'>
                      <Col lg={3} md={6} xs={12}>
                      <Card style={{height:'calc(100% - 2.2rem)'}}>
                        <CardBody>
                          <CardTitle tag="h6"> Create an Order</CardTitle>
                          <small>
                            In create an order , you can create fresh orders (Bookings & regular orders) 
                            </small>
                         
                          </CardBody>
                          <CardFooter className='bg-white'>
                          <Button color='primary' onClick={() => window.location.href = '/#/menu/dashboard'}>
                              GO
                            </Button>
                          </CardFooter>
                        </Card>
                      </Col>
                      <Col lg={3} md={6} xs={12}>
                      <Card style={{height:'calc(100% - 2.2rem)'}}>
                        <CardBody>
                          <CardTitle tag="h6"> Booking Orders</CardTitle>
                          <small>
                            Booking orders contains all the pre-requested orders.
                            </small>
                         
                          </CardBody>
                          <CardFooter className='bg-white'>
                          <Button color='primary' onClick={() => window.location.href = '/#/menu/dashboard'}>
                              GO
                            </Button>
                          </CardFooter>
                        </Card>
                      </Col>
                      <Col lg={3} md={6} xs={12}>
                      <Card style={{height:'calc(100% - 2.2rem)'}}>
                        <CardBody>
                          <CardTitle tag="h6">Ongoing Orders</CardTitle>
                          <small>
                            In create an order , you can create fresh orders (Bookings & regular orders) 
                          </small>
                         
                          </CardBody>
                          <CardFooter className='bg-white'>
                          <Button color='primary' onClick={() => window.location.href = '/#/menu/dashboard'}>
                              GO
                            </Button>
                          </CardFooter>
                        </Card>
                      </Col>
                      <Col lg={3} md={6} xs={12}>
                      <Card style={{height:'calc(100% - 2.2rem)'}}>
                        <CardBody>
                          <CardTitle tag="h6"> Closed Orders</CardTitle>
                          <small>
                           As Closed orders shows all the orders which completed orders.
                            </small>
                         
                          </CardBody>
                          <br />
                          <br />
                          <CardFooter className='bg-white'>
                          <Button color='primary' onClick={() => window.location.href = '/#/menu/dashboard'}>
                              GO
                            </Button>
                          </CardFooter>
                        </Card>
                      </Col>
                  </Row>
             
                  <Row>
                    <Col lg={12}>
                    <Card>
                        <CardBody>
                          <CardTitle tag="h6"> Create an Order</CardTitle>
                          <small>
                            In create an order , you can create fresh orders (Bookings & regular orders) 
                            </small>
                         <br />
                         <br />
                          </CardBody>
                          <CardFooter className='bg-white'>
                          <Button color='primary' onClick={() => window.location.href = '/#/menu/dashboard'}>
                              GO
                            </Button>
                          </CardFooter>
                        </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          }
          
         <hr />
         
        </div>
      );
    }
  }
}

export default Dashboard;

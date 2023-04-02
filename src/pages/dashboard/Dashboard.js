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

    this.state = {
      loan:[]
    };
  }

  meals = [meal1, meal2, meal3];


  getData() {
    if (JSON.parse(localStorage.getItem('user')).role === 'customer') {
        const user_id = JSON.parse(localStorage.getItem('user')).id
        axios.get(`${getSource()}/loans/get-loan-by-userId/${user_id}`, token_header)
        .then((resp) => {
          this.setState({loan:resp.data})
        })  
        .catch((err) => {
          console.log(err);
        })
    }
    
  }

  componentDidMount() {
    this.getData()
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
              </Col>
            </Row>
            ) : (
              <Row>
                <Col lg={12}>
                  <hr />
                  <h6 className='pl-1'>Loan Details</h6>
                  <Row className='pt-1'>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Loan Amount</CardTitle>
                            <h2>{this.state.loan && `${this.state.loan.loan_amount} LKR`}</h2>
                          </CardBody>
                          <br />
                        </Card>
                      </Col>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Used Amount</CardTitle>
                            <h2>{this.state.loan && `${this.state.loan.used_amount} LKR`}</h2>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Loan Balance</CardTitle>
                            <h2>{this.state.loan && `${this.state.loan.loan_amount * 1 - this.state.loan.used_amount * 1} LKR`}</h2>
                          </CardBody>
                        </Card>
                      </Col>
                  </Row>
                  <Row className='pt-1'>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Due Loan </CardTitle>
                            <h2>{this.state.loan && `${this.state.loan.loan_amount} LKR`}</h2>
                          </CardBody>
                          <br />
                        </Card>
                      </Col>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Payment Balance</CardTitle>
                            <h2>{this.state.loan && `${this.state.loan.used_amount} LKR`}</h2>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Due Balance</CardTitle>
                            <h2>{this.state.loan && `${this.state.loan.loan_amount * 1 - this.state.loan.used_amount * 1} LKR`}</h2>
                          </CardBody>
                        </Card>
                      </Col>
                  </Row>
                  <hr />
                  <Row className='pt-1'>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Total Loan Installments </CardTitle>
                            <h2>{this.state.loan && `${this.state.loan.loan_installment_type}`}</h2>
                          </CardBody>
                          <br />
                        </Card>
                      </Col>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Paid Installments</CardTitle>
                            <h2>{0}</h2>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Due Installments</CardTitle>
                            <h2>{0}</h2>
                          </CardBody>
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
                              make a payment
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

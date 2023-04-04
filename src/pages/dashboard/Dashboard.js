import React from "react";
import { Card, CardHeader, CardBody, Col, Row, CardSubtitle, CardTitle, CardText, Button, CardFooter } from "reactstrap";
import {token_header} from "../../utils/tokenHeader";
// import {token_header} from "../.."
import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";
import { getSource } from "../../pages/db/server";
import axios from "axios";
import moment from "moment";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loan:[],
      loans:[],
      totalLoanAmount:0,
      totalUsedLoan:0,
      totalLoanBalance:0,
      totalCustomers:0
    };
  }

  meals = [meal1, meal2, meal3];


  getData() {
    if (JSON.parse(localStorage.getItem('user')).role === 'customer') {
        const user_id = JSON.parse(localStorage.getItem('user')).id
        axios.get(`${getSource()}/loans/get-loan-by-userId/${user_id}`)
        .then((resp) => {
          this.setState({loan:resp.data})
        })  
        .catch((err) => {
          console.log(err);
        })
    } else {

      axios.get(`${getSource()}/users/get-customers/`)
      .then((resp) => {
       
        this.setState({totalCustomers:resp.data && resp.data.length})
      })  
      .catch((err) => {
        console.log(err);
      })
    
      axios.get(`${getSource()}/loans/`)
      .then((resp) => {
        let loan_amount = 0, used_amount = 0, loan_bal = 0
        
        resp.data.map((data) => {
           loan_amount = loan_amount + data.loan_amount
           used_amount = used_amount + data.used_amount
           loan_bal = loan_bal + (loan_amount - used_amount)
        })
        
        this.setState({loans:resp.data, totalLoanAmount:loan_amount, totalUsedLoan:used_amount, totalLoanBalance:loan_bal})
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
              <h6 className='pl-1'>Loan Details</h6>
                  <Row className='pt-1'>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6"> Lended Loan Amount</CardTitle>
                            <h2>{`${this.state.totalLoanAmount} LKR`}</h2>
                          </CardBody>
                          <br />
                        </Card>
                      </Col>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Used Amount</CardTitle>
                            <h2>{`${this.state.totalUsedLoan} LKR`}</h2>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Total Loan Balance</CardTitle>
                            <h2>{`${this.state.totalLoanBalance} LKR`}</h2>
                          </CardBody>
                        </Card>
                      </Col>
                  </Row>
                  <br />
                    <h6 className='pl-1'>Customer Details Details</h6>
                  <Row className='pt-1'>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">All Customers </CardTitle>
                            <h2>{`${this.state.totalCustomers}`}</h2>
                          </CardBody>
                          <br />
                        </Card>
                      </Col>
                      {/* <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Used Amount</CardTitle>
                            <h2>{`${this.state.totalUsedLoan} LKR`}</h2>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={4} md={6} xs={12}>
                        <Card style={{height:'calc(100% - 2.2rem)'}}>
                          <CardBody>
                            <CardTitle tag="h6">Total Loan Balance</CardTitle>
                            <h2>{`${this.state.totalLoanBalance} LKR`}</h2>
                          </CardBody>
                        </Card>
                      </Col> */}
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

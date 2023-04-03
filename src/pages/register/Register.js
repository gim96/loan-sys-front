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
import Login from "../login/Login.js";

import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { getSource } from "../db/server.js";

export default function Register() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(new Date());

  const [loanAmount, setLoanAmount] = useState(0);

   
   const validateDOB = () => { 
    const currDate = new Date().getFullYear()
    console.log(currDate)
    // var month_diff = Date.now() - dob.getTime();  
    // console.log(month_diff)
      
    // var age_dt = new Date(month_diff);   
    // console.log(age_dt)
    // var year = age_dt.getUTCFullYear();  
    // console.log(year)

    // var age = Math.abs(year - dob.split("-")[0] * 1)
    // console.log(age)
   }

   useEffect(() => {
    validateDOB()
   }, [])


   const handleRegister = () => {

      const user = {
        username,
        password,
        full_name:fullName,
        dob, 
        role:'customer'
      }

      
      const loan = {
        loan_amount:loanAmount,
        used_amount:0,
        loan_installment_type:'3 Months installments'
      }
      
      if (username.length > 0 && password.length > 0 && fullName.length > 0 && dob.length > 0 && loanAmount.toString().length > 0) {

        const diffAge = (new Date().getFullYear()).toString() * 1 -  dob.toString().split("-")[0] * 1

        if (diffAge > 18) {

          axios.post(`${getSource()}/users/`, user)
          .then((resp) => {
  
            const userId = resp.data.user_id
  
            axios.post(`${getSource()}/loans/`, { ...loan, user_id:userId})
            .then((res) => {
                alert('registration was succeeded.!')
                window.location.href = '/#/login'
            })
            .catch((er) => {
              console.log(er)
              alert('somthing went wrong')
            })
  
          })
          .catch((err) => {
             alert('something went wrong.!')
          })

        } else {
          alert('Age must be grater than 18')
        }

       

      } else {
        alert('required fields.!')
      }
   }

    return (
      <div className="auth-page">
        <Container className="col-12 p-4">
          <Row className="d-flex align-items-center">
            <Col xs={12} lg={12} className="left-column">
              <Widget className="widget-auth widget-p-lg">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <p className="auth-header mb-0">Customer Registation</p>
       
                </div>
                <div className="auth-info my-2">
                  <p>Let's bigin your finacial journey</p>
                </div>
                <form>
                  <small>Personal details</small>
                  <Divider />
                  <FormGroup className="my-3">
                    <FormText>Username</FormText>
                       <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </FormGroup>
                  <FormGroup  className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Password</FormText>
                    </div>  
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="my-3">
                    <FormText>Full Name</FormText>
                    <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </FormGroup>
                  <FormGroup className="my-3">
                    <FormText>Date of Birth</FormText>
                    <input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} />
                  </FormGroup>
                  <br />
                  <small>Loan Details</small>
                  <Divider />

                  <FormGroup className="my-3">
                    <FormText>Loan Amount</FormText>
                    <select value={loanAmount} className='form-control' onChange={(e) => setLoanAmount(e.target.value)}>
                    <option value="">Select a number</option>
                    <option value="1000">1,000</option>
                    <option value="2000">2,000</option>
                    <option value="3000">3,000</option>
                    <option value="4000">4,000</option>
                    <option value="5000">5,000</option>
                    <option value="6000">6,000</option>
                    <option value="7000">7,000</option>
                    <option value="8000">8,000</option>
                    <option value="9000">9,000</option>
                    <option value="10000">10,000</option>
                    <option value="11000">11,000</option>
                    <option value="12000">12,000</option>
                    <option value="13000">13,000</option>
                    <option value="14000">14,000</option>
                    <option value="15000">15,000</option>
                    </select>
                  </FormGroup>

                  <div className="bg-widget d-flex justify-content-center">
                    <Button className="rounded-pill my-3" type="button" color="secondary-red" onClick={handleRegister}>Sign Up</Button>
                  </div>
                
              
                  <Link to="/login" className="text-center">Login with existing account</Link>
                </form>
              </Widget>
            </Col>
          
          </Row>
        </Container>
        <Footer />
      </div>
    )
  }



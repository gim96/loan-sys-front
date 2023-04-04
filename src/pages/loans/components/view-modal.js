import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Badge, Spinner } from "reactstrap";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import axios from "axios";
import { getSource } from "../../db/server";
export default function ViewModal({openView, setOpenView, selectedItem}) {

  const [customer, setCustomer] = useState([])
    
  useEffect(() => {
    if (selectedItem) {
      console.log(selectedItem)

      axios.get(`${getSource()}/users/${selectedItem.user_id}`)
      .then((resp) => { 
        setCustomer(resp.data)
      })
      .catch((err) => {
        alert('something went wrong.!')
      })
    }
  }, [selectedItem])


    return(
        <Modal size='lg' isOpen={openView}>
        <ModalHeader toggle={() => setOpenView(false)}>Loan details</ModalHeader>
        {
          selectedItem && customer &&
          <ModalBody>
              Loan details
          <Row className="p-4 pt-2">
          <Col className="p-4 border rounded">
                 <Row className="p-1">
                  <Col lg={3}>Loan ID</Col>
                  <Col lg={9}>{selectedItem.loan_id}</Col>
                 </Row>
                 <Row className="p-1">
                  <Col  lg={3}>Loan Amount</Col>
                  <Col lg={9}>{selectedItem.loan_amount}.00 LKR</Col>
                 </Row>
                 <Row className="p-1">
                  <Col lg={3}>Used amount</Col>
                  <Col lg={9}>{selectedItem.used_amount}.00 LKR</Col>
                 </Row>
                 <Row className="p-1">
                  <Col lg={3}>Loan Balance</Col>
                  <Col lg={9}>{selectedItem.loan_amount * 1 - selectedItem.used_amount * 1}.00 LKR</Col>
                 </Row>
              </Col>
          </Row>
          <br />
          Customer's details 
          <Row className="p-4 pt-2">
            
            <Col className="p-4 border rounded">
                 <Row className="p-1">
                  <Col lg={3}>User ID</Col>
                  <Col lg={9}>{customer.user_id}</Col>
                 </Row>
                 <Row className="p-1">
                  <Col  lg={3}>Username</Col>
                  <Col lg={9}>{customer.username}</Col>
                 </Row>
                 <Row className="p-1">
                  <Col lg={3}>Full Name</Col>
                  <Col lg={9}>{customer.full_name}</Col>
                 </Row>
                 <Row className="p-1">
                  <Col lg={3}>Date of Birth</Col>
                  <Col lg={9}>{customer.dob}</Col>
                 </Row>
              </Col>
          </Row>
        
           
          </ModalBody>
        }
        
        <ModalFooter>
         
          <Button color="secondary" onClick={() => setOpenView(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
};
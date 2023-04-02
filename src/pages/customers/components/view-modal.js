import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, ListGroup,ListGroupItem  } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ViewModal({openView, setOpenView, currentItem}) {

    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (currentItem) {
            setPhone(currentItem.phone);
            setName(currentItem.name);
            setAddress(currentItem.address);
        }
    }, [currentItem])

   

    return(
        <Modal size='lg' isOpen={openView}>
        <ModalHeader toggle={() => setOpenView(false)}>&nbsp; Customer details</ModalHeader>
        <ModalBody>
        Customer's details 
          <Row className="p-4 pt-2">
            
            <Col className="p-4 border rounded">
                 <Row className="p-1">
                  <Col lg={3}>User ID</Col>
                  <Col lg={9}>{currentItem.user_id}</Col>
                 </Row>
                 <Row className="p-1">
                  <Col  lg={3}>Username</Col>
                  <Col lg={9}>{currentItem.username}</Col>
                 </Row>
                 <Row className="p-1">
                  <Col lg={3}>Full Name</Col>
                  <Col lg={9}>{currentItem.full_name}</Col>
                 </Row>
                 <Row className="p-1">
                  <Col lg={3}>Date of Birth</Col>
                  <Col lg={9}>{currentItem.dob}</Col>
                 </Row>
              </Col>
          </Row>
          Loan details
          <Row className="p-4 pt-2">
          <Col className="p-4 border rounded">
                 <Row className="p-1">
                  <Col lg={3}>Loan ID</Col>
                  <Col lg={9}>{currentItem.loan_id}</Col>
                 </Row>
                 <Row className="p-1">
                  <Col  lg={3}>Loan Amount</Col>
                  <Col lg={9}>{currentItem.loan_amount}.00 LKR</Col>
                 </Row>
                 <Row className="p-1">
                  <Col lg={3}>Used amount</Col>
                  <Col lg={9}>{currentItem.used_amount}.00 LKR</Col>
                 </Row>
                 <Row className="p-1">
                  <Col lg={3}>Loan Balance</Col>
                  <Col lg={9}>{currentItem.loan_amount * 1 - currentItem.used_amount * 1}.00 LKR</Col>
                 </Row>
              </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
         
          <Button color="secondary" onClick={() => setOpenView(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
};
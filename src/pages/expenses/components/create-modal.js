import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";
import firebase from "../../../pages/db/firebase";
import {SketchPicker} from "react-color";

export default function CreateModal({openCreate, setOpenCreate, handleCreate}) {

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const handleSave = () => {
     
      const item = {
        description:description,
        amount:amount,
      };

      handleCreate(item);
   
    };


    return(
        <Modal size='md' isOpen={openCreate}>
            <ModalHeader toggle={() => setOpenCreate(false)}><EditIcon />&nbsp; Add Expense details</ModalHeader>
            <ModalBody className="p-5" > 
            <Row>
                <Col >
                    Description
                    <Input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                    <br />
                    Amount
                    <Input type="number" onChange={(e) => setAmount(e.target.value)} value={amount} />
                    <br />
                   
                </Col>
            </Row>
            <hr />
            <Row>
                <Col lg={12} align='right'>
                  <Button color="primary" onClick={handleSave}>
                    Save
                  </Button>{' '}
                
                  <Button color="secondary" onClick={() => setOpenCreate(false)}>
                    Cancel
                  </Button>
                </Col>
            </Row>
          </ModalBody>
      </Modal>
    );
};
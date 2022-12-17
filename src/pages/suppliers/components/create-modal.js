import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";
import firebase from "../../../pages/db/firebase";
import {SketchPicker} from "react-color";

export default function CreateModal({openCreate, setOpenCreate, handleCreate}) {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState();
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("")
 
    const handleSave = () => {
     
      const item = {
        name:name,
        phone:phone,
        description:description,
        address:address
      };

      handleCreate(item);
   
    };


    return(
        <Modal size='md' isOpen={openCreate}>
            <ModalHeader toggle={() => setOpenCreate(false)}><EditIcon />&nbsp; Add Expense details</ModalHeader>
            <ModalBody className="p-5" > 
            <Row>
                <Col>
                    Name
                    <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    <br />
                    Phone
                    <Input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} />
                    <br />
                    Description
                    <Input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                    <br />
                    Address
                    <Input type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
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
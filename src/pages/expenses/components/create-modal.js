import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";
import firebase from "../../../pages/db/firebase";
import {SketchPicker} from "react-color";

export default function CreateModal({openCreate, setOpenCreate, handleCreate}) {

    const [itemCode, setItemCode] = useState("");
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);

    const handleSave = () => {
     
      const item = {
        itemCode:itemCode,
        name:name,
        color:color,
        size:size,
        type:type,
        price:price,
        status:1,
      };

      handleCreate(item);
      setItemCode("");
      setName("");
      setColor("");
      setSize("");
      setType("");
      setPrice(0);

    };


    return(
        <Modal size='md' isOpen={openCreate}>
            <ModalHeader toggle={() => setOpenCreate(false)}><EditIcon />&nbsp; Add Customer details</ModalHeader>
            <ModalBody className="p-5" > 
            <Row>
                <Col >
                    Item Code
                    <Input type="number" onChange={(e) => setItemCode(e.target.value)} value={itemCode} />
                    <br />
                    Name
                    <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    <br />
               
                    Size
                    <Input type="select" onChange={(e) => setSize(e.target.value)} value={size}>
                      <option>S</option> 
                      <option>M</option> 
                      <option>L</option> 
                      <option>XL</option> 
                      <option>XXL</option>  
                    </Input> 
                    <br />
                    Type
                    <Input type="select" onChange={(e) => setType(e.target.value)} value={type}>
                      <option>Sarong</option> 
                      <option>Blazor</option> 
                      <option>Shirt</option> 
                      <option>Trouser</option> 
                      <option>Waistcoat</option> 
                      <option>Accessory</option>  

                    </Input> 
                    <br />
                    Color
                    <Input type='color' className="w-50" onChange={(e) => setColor(e.target.value)} />
                    <br />
                    Price
                    <Input type="number" onChange={(e) => setPrice(e.target.value)} value={price} />
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
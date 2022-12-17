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
          <Row>
              <Col className="p-4">
                <ListGroup>
                  <ListGroupItem>
                    <PersonIcon /> &nbsp; {currentItem.name}
                  </ListGroupItem>
                  <ListGroupItem>
                    <LocalPhoneIcon /> &nbsp; {currentItem.phone}
                  </ListGroupItem>
                  <ListGroupItem>
                    <LocationOnIcon /> &nbsp; {currentItem.address}
                  </ListGroupItem>
                </ListGroup>
              </Col>
          </Row>
          
          <Row className="p-4 pt-2">
              <Col className="p-4 border rounded">
                 <img src={currentItem.idPhoto} width='100%' alt='nic' />
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
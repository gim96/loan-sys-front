import { Card,
  Col, Input, Row, Modal,
   ModalHeader, ModalBody, ModalFooter, Button, CardHeader, CardBody,
    CardFooter, CardText, CardTitle ,ListGroup ,ListGroupItem,Badge
   } from "reactstrap";
import { GetColorName } from 'hex-color-to-color-name';
import { useEffect, useState } from "react";
import moment from "moment";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ViewModal({openView, setOpenView, selectedItem}) {


    useEffect(() => {
      if (selectedItem) {
    
      }
    }, [selectedItem])

    return(
        <Modal size='lg' isOpen={openView}>
        <ModalHeader toggle={() => setOpenView(false)}>Order details</ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={12} align='right'>
           
                
              
              </Col>
            </Row>
        </ModalBody>
      
      </Modal>
    );
};
import { Card,
  Col, Input, Row, Modal,
   ModalHeader, ModalBody, ModalFooter, Button, CardHeader, CardBody,
    CardFooter, CardText, CardTitle ,ListGroup ,ListGroupItem,Badge,
   } from "reactstrap";
import { GetColorName } from 'hex-color-to-color-name';
import { useEffect, useState } from "react";
import moment from "moment";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ViewModal({openView, setOpenView}) {

    const [items, setItems] = useState([])
   


    return(
        <Modal size='lg' isOpen={openView}>
        <ModalHeader toggle={() => setOpenView(false)}>Cart </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={12} align='right'>
            <table width="95%" align="center">
              <tr>
                <td>
                  Item Details <br />

                  <Row>
                      <Col>item code</Col>
                      <Col>ds</Col>
                      <Col>description</Col>
                      <Col>Qty</Col>
                      <Col>price</Col>
                  </Row>
                 
                </td>
              </tr>
              <hr />
              <tr>
                  <td align="right">
                      <Button color="primary" onClick={() => {
                            setOpenView(false)
                        }}>Pay</Button>
                        &nbsp;&nbsp;<Button color="secondary" onClick={() => setOpenView(false)}> Cancel</Button>
                      </td>
                    </tr>
                  </table>
              </Col>
            </Row>
        </ModalBody>
      
      </Modal>
    );
};
import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Badge, Spinner } from "reactstrap";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
export default function ViewModal({openView, setOpenView, selectedItem}) {

  // const [currentImage, setCurrentImage] = useState('')
  useEffect(() => {
    if (selectedItem) {
      console.log(selectedItem)
    }
  }, [selectedItem])


    return(
        <Modal size='lg' isOpen={openView}>
        <ModalHeader toggle={() => setOpenView(false)}>Product details</ModalHeader>
        {
          selectedItem && 
          <ModalBody>
           
          <Row>
            <Col lg={4} >
              <img src={selectedItem.thumbnail} width='100%' style={{objectFit:'cover'}} />
            </Col>
            <Col lg={6} className='border-left'>
              <h5>{selectedItem.title}</h5>
              <p>{selectedItem.brand}</p>
              <p>{selectedItem.category}</p>
              <br />
              <b>{selectedItem.price}.00 LKR</b>
        
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
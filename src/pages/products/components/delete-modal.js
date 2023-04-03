import { useEffect } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, CardText } from "reactstrap";
import ErrorIcon from '@mui/icons-material/Error';
import axios from "axios";
import { getSource } from "../../db/server";

export default function DeleteModal({openDelete, setOpenDelete, selectedItem}) {

  useEffect(() => {
    if (selectedItem) {
       
    }
}, [selectedItem])

    const onDelete = () => {
      console.log(selectedItem)
      axios.delete(`${getSource()}/products/${selectedItem.product_id}`)
      .then((resp) => {
        alert('Record deleted')
        window.location.reload(true)
      })
      .catch((err) => {
        alert('Failed deletion')
      })
    };

    return(
        <Modal size='md' isOpen={openDelete}>
        <ModalHeader toggle={() => setOpenDelete(false)}>Remove Product</ModalHeader>
        <ModalBody>
         <CardText>  <ErrorIcon color='danger' /> &nbsp;Are you sure you want to remove this Product?</CardText>
         <Row className='pt-4'>
            <Col lg={12} align='right'>
              <Button color="primary"  onClick={onDelete}>
                Yes
              </Button>{' '}
              <Button color="secondary" onClick={() => setOpenDelete(false)}>
                No
              </Button>
            </Col>
         </Row>
        </ModalBody>
      
      </Modal>
    );
};
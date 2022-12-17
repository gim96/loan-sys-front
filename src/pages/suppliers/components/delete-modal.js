import { useEffect } from "react";
import { Col, Row, Modal, ModalHeader, ModalBody, Button, CardText } from "reactstrap";
import ErrorIcon from '@mui/icons-material/Error';

export default function DeleteModal({openDelete, setOpenDelete, currentItem, handleDelete}) {

  useEffect(() => {
    if (currentItem) {
       
    }
}, [currentItem])

    const onDelete = () => {
      handleDelete();
    };

    return(
        <Modal size='md' isOpen={openDelete}>
        <ModalHeader toggle={() => setOpenDelete(false)}>Remove Item</ModalHeader>
        <ModalBody>
         <CardText>  <ErrorIcon color='danger' /> &nbsp;Are you sure you want to remove this Item?</CardText>
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
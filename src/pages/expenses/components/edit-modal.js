import { useEffect, useState } from "react";
import { Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';

export default function EditModal({openEdit, setOpenEdit, currentItem, handleUpdate}) {

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

    useEffect(() => {
        if (currentItem) {
            console.log(currentItem)
            setDescription(currentItem.description);
            setAmount(currentItem.amount);
        }
    }, [currentItem])

    const handleSave = () => {
      const item = {
        description:description,
        amount:amount,
      };
      handleUpdate(item);
    };


    return(
        <Modal size='md' isOpen={openEdit}>
        <ModalHeader toggle={() => setOpenEdit(false)}><EditIcon />&nbsp; Edit Item details</ModalHeader>
        <ModalBody>
          <Row>
              <Col className="p-4">
                    Description
                    <Input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                    <br />
                    Amount
                    <Input type="number" min='0' onChange={(e) => setAmount(e.target.value)} value={amount} />
                    <br />
              </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={() => setOpenEdit(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
};
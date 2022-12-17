import { useEffect, useState } from "react";
import { Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';

export default function EditModal({openEdit, setOpenEdit, currentItem, handleUpdate}) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

    useEffect(() => {
        if (currentItem) {
            setName(currentItem.name);
            setPhone(currentItem.description);
            setDescription(currentItem.description);
            setAddress(currentItem.address);
        }
    }, [currentItem])

    const handleSave = () => {
      const item = {
        name:name,
        phone:phone,
        address:address,
        description:description
      };
      handleUpdate(item);
    };


    return(
        <Modal size='md' isOpen={openEdit}>
        <ModalHeader toggle={() => setOpenEdit(false)}><EditIcon />&nbsp; Edit Supplier details</ModalHeader>
        <ModalBody>
          <Row>
              <Col className="p-4">
                    Name
                    <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    <br />
                    Phone
                    <Input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} />
                    <br />
                    Address
                    <Input type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br />
                    Description
                    <Input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
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
import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";

export default function EditModal({openEdit, setOpenEdit, currentItem, handleUpdate}) {

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

    const handleSave = () => {
      const item = {
        phone:phone,
        name:name,
        address:address
      };
      handleUpdate(item);
    };

    return(
        <Modal size='md' isOpen={openEdit}>
        <ModalHeader toggle={() => setOpenEdit(false)}><EditIcon />&nbsp; Edit Customer details</ModalHeader>
        <ModalBody>
          <Row>
              <Col className="p-4">
                Phone
                <Input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} />
                <br />
                Name
                <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                <br />
                Address
                <Input type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
              </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{' '}
          <Button color="secondary">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
};
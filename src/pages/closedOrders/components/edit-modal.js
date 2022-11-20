import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";
import { SketchPicker } from 'react-color';
import Select from 'react-select';

export default function EditModal({openEdit, setOpenEdit, currentItem, handleUpdate, itemCodes}) {

    const [itemCode, setItemCode] = useState("");
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (currentItem) {
            setItemCode(currentItem.itemCode);
            setName(currentItem.name);
            setColor(currentItem.color);
            setSize(currentItem.size);
            setType(currentItem.type);
        }
    }, [currentItem])

    const handleColor = (color) => {
      setColor(color.hex);
    };

    const handleSave = () => {
      const item = {
        itemCode:itemCode,
        name:name,
        color:color,
        size:size,
        type:type
      };
      handleUpdate(item);
    };

    const handleChange = (_selectedOption) => {
      setSelectedOption(_selectedOption);
      
    };

    return(
        <Modal size='md' isOpen={openEdit}>
        <ModalHeader toggle={() => setOpenEdit(false)}><EditIcon />&nbsp; Edit Item details</ModalHeader>
        <ModalBody>
          <Row>
              <Col className="p-4">
                    Item Code
                    <Select
                      value={selectedOption}
                      onChange={handleChange}
                      options={itemCodes && itemCodes}
                    />
                    <br />
                    Name
                    <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    <br />
               
                    Size
                    <Input type="text" onChange={(e) => setSize(e.target.value)} value={size} />
                   
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
import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";
import { SketchPicker } from 'react-color';
import Select from 'react-select';

export default function EditModal({openEdit, setOpenEdit, currentItem, handleUpdate}) {

    const [itemCode, setItemCode] = useState("");
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState(0)

    useEffect(() => {
        if (currentItem) {
            setItemCode(currentItem.itemCode);
            setName(currentItem.name);
            setColor(currentItem.color);
            setSize(currentItem.size);
            setType(currentItem.type);
            setPrice(currentItem.price);
            setStatus(currentItem.status);
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
        type:type,
        price:price,
        status:status,
      };
      handleUpdate(item);
    };

    const options = [
      {
        label:'S',
        value:'S'
      },
      {
        label:'M',
        value:'M'
      },
      {
        label:'L',
        value:'L'
      },
      {
        label:'XL',
        value:'XL',
      },
      {
        label:'XXL',
        value:'XXL',
      },
    ]

    const clouth_types = [
      {
        label:'Sarong',
        value:'Sarong'
      },
      {
        label:'Trouser',
        value:'Trouser'
      },
      {
        label:'Shirt',
        value:'Shirt'
      },
      {
        label:'Blazor',
        value:'Blazor'
      },
      {
        label:'Waistcoat',
        value:'Waistcoat'
      },
      {
        label:'Accessory',
        value:'Accessory'
      },
      
    ]

    return(
        <Modal size='md' isOpen={openEdit}>
        <ModalHeader toggle={() => setOpenEdit(false)}><EditIcon />&nbsp; Edit Item details</ModalHeader>
        <ModalBody>
          <Row>
              <Col className="p-4">
                    Item Code
                    <Input type="number" onChange={(e) => setItemCode(e.target.value)} value={itemCode} />
                    <br />
                    Name
                    <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                    <br />
               
                    Size
                    <Select
                      value={{label:size, value:size}}
                      onChange={(value) => setSize(value.value)}
                      options={options}
                    />
                    <br />
                    Type
                    <Select
                      value={{label:type, value:type}}
                      onChange={(value) => setType(value.value)}
                      options={clouth_types}
                    />
                    <br />
                    Color
                    <Input type='color' className="w-50" onChange={(e) => setColor(e.target.value)} value={color} />
                    <br />
                    Price
                    <Input type="number" onChange={(e) => setPrice(e.target.value)} value={price} />
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
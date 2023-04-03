import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner} from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";
import { SketchPicker } from 'react-color';
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function EditModal({
  openEdit, setOpenEdit, selectedItem}) {


    useEffect(() => {
        if (currentItem) {
          console.log(currentItem)
            setItemCode(currentItem.itemCode);
            setName(currentItem.name);
            setColor(currentItem.color);
            setSize(currentItem.size);
            setType(currentItem.type);
            setPrice(currentItem.price);
            setStatus(currentItem.status);
            setSelectedImages(currentItem.images)
        }
    }, [currentItem])



    return(
        <Modal size='lg' isOpen={openEdit}>
        <ModalHeader toggle={() => {
          setCurrentItem([])
          setOpenEdit(false)
          setImages([])
        }}>
          <EditIcon />&nbsp; Edit Item details
        </ModalHeader>
        <ModalBody>
          <Row>
          <Row>
                <Col >
                   
                    Title
                    <Input type="textarea" 
                    onChange={(e) => setProduct({...product, title:e.target.value})} value={product.tile} />
                    <br />
                    Category
                    <Input type="text" onChange={(e) => setProduct({...product, category:e.target.value})} value={product.category} />
                    <br />
                    Brand
                    <Input type="text" onChange={(e) => setProduct({...product, brand:e.target.value})} value={product.brand} />
                   
                    <br />
                    Price
                    <Input type="number" min='0' onChange={(e) => setProduct({...product, price:e.target.value})} value={product.price} />
                    <br />
                    Image Url
                    <Input type="text" onChange={(e) => setProduct({...product, thubmnail:e.target.value})} value={product.thubmnail} />
                </Col>
                
            </Row>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={() => {
            setCurrentItem([])
            setOpenEdit(false)
            setImages([])
          }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
};
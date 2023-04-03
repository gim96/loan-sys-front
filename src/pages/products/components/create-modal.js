import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
// import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";
import firebase from "../../../pages/db/firebase";
import {SketchPicker} from "react-color";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import axios from "axios";

export default function CreateModal({openCreate, setOpenCreate, handleCreate}) {

    const [product, setProduct] = useState({
      title:'',
      brand:'',
      category:'',
      price:0,
      thubmnail:''
    })

    const handleSave = () => {
     
      axios.post(`${getSource()}/products/`)
      .then((resp) => {
          alert('product added.!')
          setOpenCreate(false)
          window.location.reload(true)
      })
      .catch((err) => {
        alert('something went wrong.!')
      })

    };


    return(
        <Modal size='md' isOpen={openCreate}>
            <ModalHeader toggle={() => setOpenCreate(false)}><EditIcon />&nbsp; Add Product details</ModalHeader>
            <ModalBody className="p-5" > 
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
            <hr />
            <Row>
                <Col lg={12} align='right'>
                  <Button color="primary" onClick={handleSave}>
                    Save
                  </Button>{' '}
                
                  <Button color="secondary" onClick={() => setOpenCreate(false)}>
                    Cancel
                  </Button>
                </Col>
            </Row>
          </ModalBody>
      </Modal>
    );
};
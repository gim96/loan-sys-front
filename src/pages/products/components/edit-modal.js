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

    const [product, setProduct] = useState({
      title:'',
      brand:'',
      category:'',
      price:0,
      thubmnail:''
    })



    useEffect(() => {
        if (selectedItem) {
          setProduct({
            title:selectedItem.title,
            brand:selectedItem.brand,
            category:selectedItem.category,
            price:selectedItem.price * 1,
            thubmnail:selectedItem.thumbnail
          })
        }
    }, [selectedItem])

    const handleSave = () => {
      console.log(product)
      axios.put(`${getSource()}/products/${selectedItem.product_id}`, product)
      .then((resp) => {
        console.log(resp)
          alert('product updated.!')
          setOpenEdit(false)
      })
      .catch((err) => {
        console.log(err)
        alert('something went wrong.!')
      })

    };



    return(
        <Modal size='md' isOpen={openEdit}>
        <ModalHeader toggle={() => setOpenEdit(false)}>
          <EditIcon />&nbsp; Edit Item details
        </ModalHeader>
        <ModalBody className="p-5">
        
          <Row>
                <Col >
                   
                    Title
                    <Input type="text" 
                    onChange={(e) => setProduct({...product, title:e.target.value})} value={product.title} />
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
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

export default function CreateModal({openCreate, setOpenCreate, handleCreate, onHandleImages, images, setImages, imgLoading}) {

    const [itemCode, setItemCode] = useState("");
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(null);

    const handleSave = () => {
     
      const item = {
        itemCode:itemCode,
        name:name,
        color:color,
        size:size,
        type:type,
        price:price,
        status:1,
      };

      handleCreate(item);
      setItemCode("");
      setName("");
      setColor("");
      setSize("");
      setType("");
      setPrice(0);

    };

    useEffect(() => {
      if (images) {
        console.log(images)
      }
    }, [images, imgLoading])

    const handleRemovePhoto = (x, i) => {
      console.log(x)
      const _images = images.filter((img) => img !== images[i]) 
      console.log(_images)
      setImages(_images)
    }


    return(
        <Modal size='lg' isOpen={openCreate}>
            <ModalHeader toggle={() => setOpenCreate(false)}><EditIcon />&nbsp; Add Item details</ModalHeader>
            <ModalBody className="p-5" > 
            <Row>
                <Col >
                    Item Code
                    <Input type="text" onChange={(e) => setItemCode(e.target.value)} value={itemCode} />
                    <br />
                    Description
                    <Input type="textarea" onChange={(e) => setName(e.target.value)} value={name} />
                    <br />
               
                    Size
                    <Input type="text" onChange={(e) => setSize(e.target.value)} value={size} />
                    <br />
                    Type
                    <Input type="select" onChange={(e) => setType(e.target.value)} value={type}>
                      <option>Sarong</option> 
                      <option>Blazer</option> 
                      <option>Shirt</option> 
                      <option>Trouser</option> 
                      <option>Waistcoat</option> 
                      <option>Accessory</option>  

                    </Input> 
                    <br />
                    Color
                    {/* <Input type='color' className="w-50" onChange={(e) => setColor(e.target.value)} /> */}
                    <Input type="select" onChange={(e) => setColor(e.target.value)} value={color}>
                      <option>Sarong</option> 
                      <option>Blazor</option> 
                      <option>Shirt</option> 
                      <option>Trouser</option> 
                      <option>Waistcoat</option> 
                      <option>Accessory</option>  

                    </Input> 
                    <br />
                    Price
                    <Input type="number" min='0'  onChange={(e) => setPrice(e.target.value)} value={price} />
                </Col>
                <Col>
                
                  Add images
                  <input type='file' onChange={onHandleImages} name='image' accept="image/*"  />
                  <br />
                  <br />
                  <Card className="bg-light border-secondary p-2" style={{height:'450px'}}>
                    {
                      imgLoading ? <div style={{paddingLeft:'45%', paddingTop:'55%'}}><Spinner size={150} /></div> : (
                        <PerfectScrollbar>
                        <Row>
                          {
                           images && images.length > 0 && images.map((image, i) => (
                              <Col lg={6} md={6} xs={12} className='pt-1 pb-1' key={i}>
                                <div className="card">
                                  {/* {image} */}
                                  <img src={image}  className='w-100' width='150px' height='140px' style={{objectFit:'cover'}} alt='img' />
                                  <span 
                                    onClick={() => handleRemovePhoto(image, i)} 
                                    class="badge badge-pill badge-danger btn"
                                    style={{cursor:'hand'}}
                                  >
                                    Remove
                                  </span>
                                </div>
                                
                              </Col>
                            )) 
                          }
                          </Row>
                          </PerfectScrollbar>
                      )
                    }
                  
                  </Card>
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
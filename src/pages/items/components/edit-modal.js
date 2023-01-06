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
  openEdit, setOpenEdit, currentItem, handleUpdate, onHandleImages, images, setImages, imgLoading, setCurrentItem}) {

    const [itemCode, setItemCode] = useState("");
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState(0)
    const [selectedImages, setSelectedImages] = useState([])
    const [removedImages, setRemovedImages] = useState([])

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

    useEffect(() => {
      if (images) {
        console.log(images)
      }
    }, [images])

    const handleColor = (color) => {
      setColor(color.hex);
    };

    const removeImage = (image, i) => {
     
      const filteredImages = selectedImages.filter((img) => img !== image)
      console.log(filteredImages)
      setImages(filteredImages)
      const _removedImages = selectedImages.filter((img) => img === image)
      setRemovedImages(_removedImages)
    }

    const handleSave = () => {
      const item = {
        itemCode:itemCode,
        name:name,
        color:color,
        size:size,
        type:type,
        price:price,
        status:status,
        images:images,
      };
      handleUpdate(item, removedImages);
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
        label:'Blazer',
        value:'Blazer'
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
              <Col className="p-4">
                    Item Code
                    <Input type="text" onChange={(e) => setItemCode(e.target.value)} value={itemCode} />
                    <br />
                    Name
                    <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
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
                    <Input type="select" onChange={(e) => setColor(e.target.value)} value={color}>
                      <option>black</option>
                      <option>white</option> 
                      <option>green</option> 
                      <option>light green</option> 
                      <option>Dark green</option> 
                      <option>blue</option> 
                      <option>light blue</option> 
                      <option>dark blue</option> 
                      <option>red</option> 
                      <option>dark red</option> 
                      <option>light red</option> 
                      <option>yellow</option> 
                      <option>purple</option> 
                      <option>cream</option> 
                      <option>gray</option>  
                      <option>ash</option>  
                      <option>light gray</option>  
                      <option>dark gray</option> 
                    </Input> 
                    <br />
                    Price
                    <Input type="number" onChange={(e) => setPrice(e.target.value)} value={price} />
              </Col>
              <Col>
                
                  Add images
                  <input 
                    type='file' 
                    onChange={(e) => {
                      onHandleImages(e)
                      // selectedImages
                    }} 
                    name='image' 
                    accept="image/*" 
                  />
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
                                    onClick={() => removeImage(image, i)} 
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
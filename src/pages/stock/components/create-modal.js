import { useEffect, useState } from "react";
import { Card,
   Col, Input, Row, Modal,
    ModalHeader, ModalBody, Button, CardHeader, CardBody,
     CardFooter, CardText, CardTitle ,ListGroup ,ListGroupItem,Badge
    } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";
import firebase from "../../../pages/db/firebase";
import {SketchPicker} from "react-color";
import { GetColorName } from 'hex-color-to-color-name';
import Select from 'react-select';

export default function CreateModal({openCreate, setOpenCreate, handleCreate, itemCodes, getItems, stockItem}) {

    const [itemCode, setItemCode] = useState("");
    const [quantity, setQuantity] = useState("");
    const [rentalPrice, setRentalPrice] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    // const [codes, setCodes]
    useEffect(() => {
      if (itemCodes) {
        // console.log(itemCodes);
        let arr = [];
        itemCodes.map((item) => {
          arr.push({value:item ,label:item})
        })
        setOptions(arr);
      }
    }, [itemCodes])

    useEffect(() => {
      if (stockItem) {
        console.log(stockItem);
      }
    }, [stockItem])


    const handleSave = () => {
     
      const item = {
        itemCode:itemCode,
        quantity:quantity,
        rentalPrice:rentalPrice,
       
      };
      handleCreate(item);
      setItemCode("");
      setQuantity("");
      setRentalPrice("");
   
    };

    // const handleItemCode = (e) => {
    //   setItemCode(e.target.value);
    //   getItems(e.target.value);
    // };

    const handleChange = (_selectedOption) => {
      setSelectedOption(_selectedOption);
      // console.log(_selectedOption);
      setItemCode(_selectedOption.value);
      getItems(_selectedOption.value);
    
    };

    return(
        <Modal size='lg' isOpen={openCreate}>
            <ModalHeader toggle={() => setOpenCreate(false)}><EditIcon />&nbsp; Add Stock details</ModalHeader>
            <ModalBody className="p-5" > 
            <Row>
                <Col lg={7}>
                <Card
                 
                    className="border-rounded p-3"
                  >
                    Item Code
                    <Select
                      value={selectedOption}
                      onChange={handleChange}
                      options={options}
                    />
                    {/* <Input type="select" onChange={handleItemCode} >
                      {
                        itemCodes && itemCodes.map((item, i) => (
                          <option key={i} value={item}>{item}</option>
                        ))
                      }
                        
                    </Input> */}
                    <br />
                    Quantity
                    <Input type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity} />
                    <br />
                    Rental Price
                    <Input type="number" onChange={(e) => setRentalPrice(e.target.value)} value={rentalPrice} />
                    
                    
                    </Card>
                </Col>
                <Col lg={5}>
                  {
                    stockItem && stockItem.length > 0 &&
                    <Card
                    style={{
                      width: '18rem'
                    }}
                    className="border-rounded"
                  >
                    <div style={{width:'100%'}}></div>
                    <CardBody>
                      
                      <CardText>
                        <b>Item Details</b>
                      </CardText>
                    </CardBody>
                    <ListGroup flush>
                    <ListGroupItem>
                      <Row>
                          <Col>Item Code</Col>
                          <Col align='right'>{stockItem[0].itemCode}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                      <Row>
                          <Col>Description</Col>
                          <Col align='right'>{stockItem[0].name}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                      <Row>
                          <Col>Type</Col>
                          <Col align='right'>{stockItem[0].type}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                      <Row>
                          <Col>Size</Col>
                          <Col align='right'>{stockItem[0].type}</Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                    <CardBody>
                     
                    <Row>
                          <Col>
                            Color <br />
                          <small>{GetColorName(`${stockItem[0].color}`)}</small>
                          </Col>
                          <Col align='right'>
                          <Badge className="p-4" style={{backgroundColor:stockItem[0].color}} pill> </Badge>

                          </Col>
                          
                        </Row>
                    </CardBody>
                  </Card>
                  }
                
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
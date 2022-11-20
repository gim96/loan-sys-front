import { Card,
  Col, Input, Row, Modal,
   ModalHeader, ModalBody, ModalFooter, Button, CardHeader, CardBody,
    CardFooter, CardText, CardTitle ,ListGroup ,ListGroupItem,Badge
   } from "reactstrap";
import { GetColorName } from 'hex-color-to-color-name';
import { useEffect } from "react";
import moment from "moment";

export default function ViewModal({openView, setOpenView, stockItem, currentItem}) {

    useEffect(() => {
      if (currentItem) {
        console.log(currentItem);
        // console.log(stockItem);
      }
    }, [currentItem])

    useEffect(() => {
      if (stockItem) {
        console.log(stockItem);
        // console.log(stockItem);
      }
    }, [stockItem])


    return(
        <Modal size='lg' isOpen={openView}>
        <ModalHeader toggle={() => setOpenView(false)}> Stock details</ModalHeader>
        <ModalBody>
        <Row>
                <Col lg={7} md={7}>
                    {
                      currentItem && 
                      <Card className="border-rounded p-3"   style={{height:'calc(100% - 2.2rem)'}}>
                        <b>Stock Details</b>
                        <hr />
                       <p>Date</p>
                       <small>{moment(currentItem.updatedAt).format('LLL')}</small> 
                       <hr />
                      Stock Id
                      <br />
                      <small>{currentItem._id}</small>
                      
                     
                     
                      <hr />
                      <Row>
                        <Col lg={6}>
                          Quantity
                          <p className="h4">{currentItem.quantity} Pcs</p>
                        </Col>
                        <Col lg={6} align='right'>
                          <span >Rental Price</span>
                          <p className="h4">{currentItem.rentalPrice}.00 LKR</p>
                        </Col>
                      </Row>
                      
                    </Card>
                    }
                    
                </Col>
                <Col lg={5}>
                  {
                    stockItem && stockItem.length > 0 &&
                    <Card style={{ width: '18rem' , height:'calc(100% - 2.2rem)'}}
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
                          <small>{GetColorName(`${'#fff'}`)}</small>
                          </Col>
                          <Col align='right'>
                          <Badge className="p-4" style={{backgroundColor:stockItem[0].color}} pill> </Badge>

                          </Col>
                          
                        </Row>
                        <br />
                    </CardBody>
                  </Card>
                  }
                
                </Col>
            </Row>
            <hr />
            <Row>
                <Col lg={12} align='right'>
                
                
                  <Button color="secondary" onClick={() => setOpenView(false)}>
                    Cancel
                  </Button>
                </Col>
            </Row>
        </ModalBody>
      
      </Modal>
    );
};
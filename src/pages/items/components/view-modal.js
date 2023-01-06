import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Badge, Spinner } from "reactstrap";
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
export default function ViewModal({openView, setOpenView, currentItem}) {

  const [currentImage, setCurrentImage] = useState('')
  useEffect(() => {
    if (currentItem) {
      console.log(currentItem)
    }
  }, [currentItem])

  useEffect(() => {
    if (!openView) {
      setCurrentImage('')
    }
  }, [openView])

    return(
        <Modal size='lg' isOpen={openView}>
        <ModalHeader toggle={() => setOpenView(false)}>Item details</ModalHeader>
        {
          currentItem && 
          <ModalBody>
            <Row>
              <Col lg={3}>
                <Card className="p-2 bg-primary">
                  <Label className="text-light">Item Code</Label>
                  <p className="h5 text-light">{currentItem.itemCode !== '' ? currentItem.itemCode : 'NULL'}</p>
                </Card>
                
              </Col>
              <Col lg={3}>
                <Card className="p-2 bg-primary">
                  <Label className="text-light">Item Name</Label>
                  <p className="h5 text-light">{currentItem.name !== '' ? currentItem.name : "NULL"}</p>
                </Card>
              </Col>
              <Col lg={3}>
              <Card className="p-2 bg-primary">
                <Label className="text-light">Type</Label>
                <p className="h5 text-light">{currentItem.type !== '' ? currentItem.type : 'NULL'}</p>
                </Card>
              </Col>
              <Col lg={3}>
              <Card className="p-2 bg-primary">
                <Label className="text-light">Size</Label>
                <p className="h5 text-light">{currentItem.size !== '' ? currentItem.size : 'NULL'}</p>
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg={4}>
                <Card className="p-2 bg-dark">
                  <Row>
                      <Col lg={6}>
                        <span className="text-light">Status</span>  
                      </Col>
                      <Col lg={6} align='right'>
                        {currentItem.status === 0 ? (<Badge color='danger'>Rented</Badge>) : (currentItem.status === 1 ? (<Badge color='success'>In-Store</Badge>) : (<Badge color='warning'>Booked</Badge>))}
                      </Col>
                  </Row>
               
              
                </Card>
              </Col>
              <Col lg={4}>
              <Card className="p-2 bg-dark">
                <Row>
                <Col lg={6}>
                  <span className="text-light">Color</span>
                </Col>
                <Col lg={6} align='right'>
                  <span class='text-light'>{currentItem.color}</span>
                  {/* <span class="badge badge-secondary pl-3 pr-3 border-light" style={{backgroundColor:`${currentItem.color}`}}>&nbsp; </span> */}
                </Col>
               
                </Row>
                </Card>
              </Col>
              <Col lg={4}>
               
              <Card className="p-2 bg-dark text-light">
              <Row>
                <Col lg={6}>
                <span className="text-light">Price</span>
                </Col>
                <Col lg={6} align='right'>
                <span className="text-light"> {currentItem.price}.00 LKR</span>
               
                </Col>
              </Row>
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
                <Col lg={12}>
                  <Card className="p-2">
                    <Row>
                      <Col lg={12}>
                        {
                          (currentItem && currentItem.images &&
                          <img src={currentImage === '' ? currentItem.images[0] : currentImage} alt='image' width='100%' />)

                          ||

                          <div style={{top:'50%', left:'50%'}}>
                             <Spinner />
                          </div>
                        }
                        
                      </Col>
                    </Row>
                    <Row>
                    <Col lg={12}>
                    <PerfectScrollbar>
                    {
                      currentItem && currentItem.images && currentItem.images.map((image, i) => (
                        <img 
                          src={image} 
                          className="cursor-pointer"
                          onClick={() => setCurrentImage(image)} 
                          style={{objectFit:'cover'}}
                          width='75px'
                          height='75px' 
                          alt='image' 
                        />
                      ))
                    }
                    </PerfectScrollbar>
                     </Col>
                   </Row>
                  </Card>
                </Col>
            </Row>
          </ModalBody>
        }
        
        <ModalFooter>
         
          <Button color="secondary" onClick={() => setOpenView(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
};
import { useEffect } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import moment from "moment";
export default function ViewModal({openView, setOpenView, currentItem}) {
   
  useEffect(() => {

    }, [currentItem])

    return(
        <Modal size='lg' isOpen={openView}>
        <ModalHeader toggle={() => setOpenView(false)}>Customer details</ModalHeader>
        <div>
        {
          currentItem && 
          <div>
          <ModalBody>
            <Row>
              <Col col={12}>
                <Card className="p-2 bg-light">
                  <Row>
                    <Col>
                      <h5>{currentItem.company}</h5>
                      {moment(currentItem.createdAt).format('YYYY-MM-DD h:mm A')}
                    </Col>
                    <Col align='right'>
                       {currentItem.amount}.00 LKR
                    </Col>
                  </Row>
                 
                </Card>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg={12}>
                  <img src={currentItem.billPhoto} width='100%' alt='img' />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
              <Button color="secondary" onClick={() => setOpenView(false)}>
                  Cancel
              </Button>
          </ModalFooter>
          </div>
        }
        </div>
      </Modal>
    );
};
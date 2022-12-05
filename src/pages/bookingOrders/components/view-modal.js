import { Card,
  Col, Input, Row, Modal,
   ModalHeader, ModalBody, ModalFooter, Button, CardHeader, CardBody,
    CardFooter, CardText, CardTitle ,ListGroup ,ListGroupItem,Badge
   } from "reactstrap";
import { GetColorName } from 'hex-color-to-color-name';
import { useEffect, useState } from "react";
import moment from "moment";

export default function ViewModal({openView, setOpenView, stockItem, currentOrder}) {

    const [items, setItems] = useState([])
    useEffect(() => {
      if (currentOrder) {
        setItems(currentOrder.items);
        // console.log(stockItem);
      }
    }, [currentOrder])

    useEffect(() => {
      if (stockItem) {
        console.log(stockItem);
        // console.log(stockItem);
      }
    }, [stockItem])


    return(
        <Modal size='lg' isOpen={openView}>
        <ModalHeader toggle={() => setOpenView(false)}>Order details</ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={12} align='right'>
            <table width="95%" align="center">
                        <tr>
                          <td>
                            <div
                              class="card"
                              style={{
                                width: "100%",
                                //   backgroundColor: "blue",
                                color: "#555",
                              }}
                            >
                              <div class="card-body">
                                <table width="100%">
                                  <tr>
                                    <td>
                                      <hr />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table width="100%">
                                      
                                        <tr>
                                          <td>
                                          <h5 className="text-left">Order Id</h5>
                                          {currentOrder.orderId}</td>
                                          <td align="right">
                                            <h5>Date</h5>
                                           {moment(currentOrder.createdAt).format('LLL')}</td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <hr />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table width="100%">
                                        <tr className="bg-light border rounded">
                                          <th>#</th>
                                          <th><b>Code</b></th>
                                          <th><b>Desc</b></th>
                                          <th><b>U Price</b></th>
                                          <th><b>Qty</b></th>
                                          <th className="text-center"><b>Amount</b></th>
                                        </tr>

                                        {items && items.map((data, index) => {
                                          return (
                                            <tr>
                                              <td align="center" width="5%">
                                                {index + 1}
                                              </td>
                                              <td>{data.itemCode}</td>
                                              <td aling="center">{data.description}</td>
              
                                              <td aling="center">{data.unitPrice}</td>
                                              <td aling="center">{data.quantity}</td>
                                              <td align="right" className="pr-2">{Math.round(data.amount).toFixed(2)}</td>
                                            </tr>
                                          );
                                        })}
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <hr />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table width="100%">
                                        <tr>
                                          <td>Total</td>
                                          <td align="right">
                                            {Math.round(currentOrder.amount).toFixed(2) } LKR
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Discount</td>
                                          <td align="right">
                                            {Math.round(currentOrder.amount * 1 - currentOrder.subTotal).toFixed(2)} LKR
                                          </td>
                                        </tr>
                                        <tr className="h5">
                                          <td>
                                            Sub total</td>
                                          <td align="right">
                                            {Math.round(currentOrder.subTotal).toFixed(2)} LKR
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Balance</td>
                                          <td align="right">
                                            {Math.round(currentOrder.subTotal * 1 - currentOrder.advance * 1).toFixed(2)} LKR
                                          </td>
                                        </tr>
                                        {/* <tr>
                                          <td>Balance</td>
                                          <td align="right">
                                            {currentOrder.balance} LKR
                                          </td>
                                        </tr> */}
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <hr />
                                    </td>
                                  </tr>
                                 
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>&nbsp;</td>
                        </tr>

                        <tr>
                          <td align="right">
                           <Button color="secondary" onClick={() => setOpenView(false)}> Cancel</Button>
                          </td>
                        </tr>
                      </table>
                
              
              </Col>
            </Row>
        </ModalBody>
      
      </Modal>
    );
};
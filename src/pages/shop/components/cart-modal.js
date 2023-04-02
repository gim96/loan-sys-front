import { Card,
  Col, Input, Row, Modal,
   ModalHeader, ModalBody, ModalFooter, Button, CardHeader, CardBody,
    CardFooter, CardText, CardTitle ,ListGroup ,ListGroupItem,Badge,
   } from "reactstrap";
import { GetColorName } from 'hex-color-to-color-name';
import { useEffect, useState } from "react";
import moment from "moment";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import { getSource } from "../../db/server";

export default function ViewModal({openView, setOpenView }) {

    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [productIds, setProductIds] = useState([])

    async function getCartData() {
      const userId = JSON.parse(localStorage.getItem('user')).id
      axios.get(`${getSource()}/carts/get-cart-by-userId/${userId}`)
      .then((resp) => {
          let amount = 0
          resp.data.map((data) => {
            amount = amount + data.price
          })
          let arr = []
          resp.data.map((product) => {
            arr.push(product.product_id)
          })
          setCart(resp.data)
          setTotal(amount)
          setProductIds(arr)
      })
      .catch((err) => {
          console.log(err)
      })
  }

    useEffect(() => {
      getCartData()
    }, [openView])

    const removeProduct = (i) => {

      if (cart) {
        const id = cart[i].cart_id
        axios.delete(`${getSource()}/carts/${id}`)
        .then((resp) => {
          console.log(resp)
          getCartData()
        })
        .catch((err) => {
          console.log(err)
        })
      }
     
    }

    const handlePay = () => {
        const _data = {   
          status:1,
          user_id:JSON.parse(localStorage.getItem('user')).id,
        }

        axios.post(`${getSource()}/orders/create-with-items/${JSON.stringify(productIds)}`, _data)
        .then((resp) => {
          alert('order created successfully.!')
          setOpenView(false)
        })
        .catch((err) => {
          alert('something went wrong.!')
          // console.log(err)
        })
    }


    return(
        <Modal size='lg' isOpen={openView}>
        <ModalHeader toggle={() => setOpenView(false)}>Cart </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={12} align='right'>
            <table width="95%" align="center">
              <tr>
                <td>
                  Item Details <br />
                  <table className="table">
                  <tr>
                      <td>item code</td>
                      <td></td>
                      <td>description</td>
                      <td>category</td>
                      <td>price</td>
                      <td></td>
                  </tr>
                  {
                    cart && cart.map((data, i) => (
                      <tr key={i}>
                        <td>{data.product_id}</td>
                        <td><img src={data.thumbnail} width='50px' height='50px' style={{objectFit:'cover'}} /></td>
                        <td>{data.title}</td>
                        <td>{data.category}</td>
                        <td align="right">{data.price}.00</td>
                        <td>
                          <button className="btn btn-warning" onClick={() => removeProduct(i)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                  </table>
                  <hr />
                  <Row className="h5">
                    <Col>Total</Col>
                    <Col className="text-right">{total}.00 LKR</Col>
                  </Row>
                  {/* <Row className="h5 text-danger">
                    <Col>Loan Balance</Col>
                    <Col className="text-right">{total}.00 LKR</Col>
                  </Row> */}
                </td>
              </tr>
              <hr />
              <tr>
                  <td align="right">
                      <Button color="primary" onClick={handlePay}>Pay</Button>
                        &nbsp;&nbsp;<Button color="secondary" onClick={() => setOpenView(false)}> Cancel</Button>
                      </td>
                    </tr>
                  </table>
              </Col>
            </Row>
        </ModalBody>
      
      </Modal>
    );
};
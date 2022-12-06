import React from "react";
import {  Col, Input, Row, Modal,
   Button, CardBody,
  ListGroup ,ListGroupItem,Badge, CardText, Card,  ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import moment from "moment";
import { getSource } from "../../pages/db/server";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "./print.css";
import {token_header} from "../../utils/tokenHeader";
import axios from "axios";
import $ from "jquery";
import { GetColorName } from 'hex-color-to-color-name';
import avatar from "../../assets/tables/avatar.png";
import logo from "../../assets/logo.png"


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 160,
  },
}));

class Typography extends React.Component {
  // const classes = useStyles();

  constructor(props) {
    super(props);

    this.state = {
      customerCode: "",
      date: "",
      itemCodes:[],
      itemName: "",

      customerPhone:[],
      phone:'',
      currentCustomer:[],
      // unitPrice: "",
      total: 0,

      description: "",
      brand: "",
      unitPrice: "",
      quantity: "1",
      amount: "",
      // user: [],

      itemCode: "",
      currentItem: [],
      currentStock:[],
      stock: [],
      currentOrder: 0,
      orderId: 0,
      //
      advance: 0,
      discount: 0,
      subTotal: 0,
      cash: 0,
      balance: 0,
      user:'',
      items: [],
      loading: false,
      showPhoto: false,
      show:false,
      orderNo:0,
      orderType:'',
    };
  }


  componentDidMount() {
    axios.get(`${getSource()}/users/me`, token_header)
    .then((resp) => {
      this.setState({user:resp.data.payload[0].name});
    })  
    .catch((err) => {
        console.log(err);
    })
    axios.get(`${getSource()}/orders/count`, token_header)
    .then((resp) => {
      this.setState({orderNo:(resp.data.payload.count + 1000 + 1)});
    })  
    .catch((err) => {
        console.log(err);
    })
    

    axios.get(`${getSource()}/customers/active-phone`, token_header)
    .then((resp) => {
    
        // customerPhone(resp);
        this.setState({customerPhone:resp.data.payload});
        // console.log(arr);
    })  
    .catch((err) => {
        console.log(err);
    })
    axios.get(`${getSource()}/items/itemCodes`, token_header)
    .then((resp) => {
        const arr = [];
        const items = resp.data.payload; 
        items.map((item) => {
            arr.push(item.itemCode);
        })
        this.setState({itemCodes:arr});
        // console.log(arr);
    })  
    .catch((err) => {
        console.log(err);
    })
  
    $("#free-solo-demo").focus();
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () =>{
    this.setState({ show: true });
    // window.print();
    
   
  } 

  _handleTextFieldItemCode = (e) => {
    // this.setState({ loading: true });
    console.log(e.target.value);
    this.setState({ itemCode: e.target.value });
    const _itemCode = e.target.value;
    if (e.target.value !== "") {
      axios.get(`${getSource()}/items/byItemCode?itemCode=${_itemCode}`, token_header)
      .then((resp) => {
          console.log(resp)
          this.setState({currentItem:resp.data.payload[0]});

          // console.log(arr);
      })  
      .catch((err) => {
          console.log(err);
      })
      axios.get(`${getSource()}/stocks/byItemCode?itemCode=${_itemCode}`, token_header)
      .then((resp) => {
          console.log(resp)
          this.setState({currentStock:resp.data.payload});
          // console.log(arr);
      })  
      .catch((err) => {
          console.log(err);
      })
    }
  };

  _handleTextFieldCustomerPhone = (e) => {
    this.setState({phone:e.target.value});
    if (e.target.value !== '') {
      axios.get(`${getSource()}/customers/customerByPhone?phone=${e.target.value}`, token_header)
      .then((resp) => {
          console.log(resp)
          this.setState({currentCustomer:resp.data.payload[0]});

          // console.log(arr);
      })  
      .catch((err) => {
          console.log(err);
      })
    }
    
  };

  addItem = () => {
      // console.log(this.state);

      if (this.state.itemCode !== "" && this.state.quantity !== "") {

        const enterItem = this.state.items.filter((item) => item.itemCode === this.state.itemCode)
        if (enterItem.length > 0) {
            alert('this item already added.!')
        } else {
          let items = this.state.items;

          items.push({
            itemCode:this.state.itemCode,
            description:this.state.currentItem.name,
            unit_price:this.state.currentItem.price,
            quantity:this.state.quantity,
            amount:this.state.currentItem.price * this.state.quantity
          });
  
          let tot = 0;
          items.map((item, i) => {
            tot = tot + item.unit_price *  item.quantity
          })
          
         
          this.setState({items:items, total:tot})
        }
       
         
      }
  }; 

  deleteItem = (index) => {
    // if(this.state.items.length===1){
    //    this.state({discount:0,cash:0});
    // }
    var currTot = this.state.total - this.state.items[index].amount * 1;
    this.state.items.splice(index, 1);
    this.setState({
      items: this.state.items,
      total: currTot,
    });
  };

  saveOrder = () => {
    const curr_Status =  this.state.orderType === 'rent' ? 2 : 1
    const data = {
      orderId:this.state.orderNo,
      customerPhone: this.state.phone,
      orderType:this.state.orderType,
      status:curr_Status,
      items:this.state.items,
      amount:this.state.total,
      advance:this.state.cash,
      subTotal:this.state.total * 1 - this.state.discount * 1, 
    };
    
    if (data.orderId !== "" && data.customerPhone !== "" && data.items.length > 0 && data.cash !== "") {
       
      axios.post(`${getSource()}/orders`, data, token_header)
        .then((resp) => {
          console.log(resp);
          // getData();
          // setOpenCreate(false); 
        })
        .catch((err) => { 
          console.log(err);
       });
    } else {
      alert('Required fields.!')
    }
    
      
  };

  goNextInput = (event) => {
    if (event.code === "Enter") {
      $("#quantity").focus();
    }
  };
  goNextUnitPrice = (event) => {
    if (event.key === "Enter") {
      $("#unitprice").focus();
    }
  };
  goNextAddBtn = (event) => {
    if (event.key === "Enter") {
      $("#addbtn").focus();
    }

    if (event.key === "Arrow Left") {
      $("#free-solo-demo").focus();
    }
  };
  goNextUpCode = (event) => {
    if (event.key.code === 56) {
      $("#free-solo-demo").focus();
    }
  };

  


  handleAmount = () => {
    if (this.state.unitPrice !== "" && this.state.quantity !== "") {
      this.setState({
        amount: this.state.unitPrice * this.state.quantity,
      });
    }
  };

  handleDiscount = (e) => {
    var currSubtotal = this.state.total - e.target.value;
    this.setState({
      discount: e.target.value,
      subTotal: currSubtotal,
    });
    // console.log(currSubtotal);
  };

  handleCash = (e) => {
    var currBal = e.target.value - this.state.subTotal;
    if (this.state.subTotal === 0) {
      this.setState({
        subTotal: this.state.total,
        cash: e.target.value,
        balance: currBal,
      });
    } else {
      this.setState({
        cash: e.target.value,
        balance: currBal,
      });
    }
  };

  render() {
    if (this.state.loading === true) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      );
    } else {
      return (
        <div>
          <body>
            <Row>
              <Col className="mb-4" xs={12}>
                <Widget className="widget-p-lg">
                  <Row>
                    <Col lg={4} md={4} xs={12} className="mb-5 mb-sm-0 ">
                      <Card className="p-4 pb" style={{height:'calc(100% - 2.2rem)'}}> 

                      <label className="form-label">Bill no</label>
                      <p>{this.state.orderNo}</p>
                  
                      <br />
                      <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={this.state.customerPhone.map((option) => option)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Cutomer Phone"
                            margin="normal"
                            variant="outlined"
                            placeholder="Search by Phone no"
                            onSelect={this._handleTextFieldCustomerPhone}
                            onChange={(e) => this.setState({itemCode:e.target.value})}
                            on
                          />
                        )}
                      />
                      <hr />
                      <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={this.state.itemCodes.map((option) => option)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Item Code"
                            margin="normal"
                            variant="outlined"
                            placeholder="Search by Phone no"
                            onSelect={this._handleTextFieldItemCode}
                            onChange={(e) => this.setState({itemCode:e.target.value})}
                            on
                          />
                        )}
                      />
                      
                      <br />
                      <TextField 
                        hidden={true}
                        
                        className="w-100"
                        id="outlined-basic" 
                        // variant="standard"  
                        type="number" 
                        label="Quantity" 
                      
                        // onKeyPress={this.goNextAddBtn}
                        value={this.state.quantity}
                        onChange={(e) =>
                          this.setState({ quantity: e.target.value })
                        }
                        // onKeyUp={this.handleAmount}
                      />
                        <br />
                        <select className="form-control" onChange={(e) => this.setState({orderType:e.target.value})}>
                          <option value=''>--select---</option>
                          <option value='rent'>Rent</option>
                          <option value='booking'>Booking</option>
                        </select>
                        <br />
                        <br />
                        <Button
                          className="btn btn-lg pt-3 pb-3"
                          color='primary'
                          size='lg'
                          id="addbtn"
                          onKeyPress={this.goNextUpCode}
                          onClick={this.addItem}
                        >
                          add item
                        </Button>
                        
                        <br />
                        <br />
                        </Card>
                    </Col>
                    <Col lg={8}>
                      <Card className="pt-2 pl-4 pr-4 pb-2" style={{height:'calc(100% - 2.2rem)'}}>
                        
                      <ListGroup flush>
                    <ListGroupItem>
                      <Row>
                          <Col lg={1} md={1}>
                            <img width='32px' height='32px' src={avatar} alt="User"/>
                          </Col>
                          <Col  lg={6}>
                            <p className="h6"> {this.state.currentCustomer.name}</p>
                            <p/>{this.state.currentCustomer.address}
                          </Col>
                          <Col align='right' lg={5}>
                            {
                              this.state.currentCustomer.name && 
                              <img 
                                width='150px' 
                                height='75px' 
                                src={this.state.currentCustomer.idPhoto} 
                                onClick={() => this.setState({showPhoto:true})} 
                                alt="User"
                              />
                            }
                          
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <br />
                      </ListGroup>
                      {/*  */}
                    <ListGroup flush>
                    <ListGroupItem>
                      <Row>
                          <Col>Item Code</Col>
                          <Col align='right'>{this.state.currentItem.itemCode && this.state.currentItem.itemCode}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                      <Row>
                          <Col>Description</Col>
                          <Col align='right'>{this.state.currentItem.name}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                      <Row>
                          <Col>Type</Col>
                          <Col align='right'>{this.state.currentItem.type}</Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                      <Row>
                          <Col>Size</Col>
                          <Col align='right'>{this.state.currentItem.type}</Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>

                    
                    <CardBody>
                     
                    <Row>
                          <Col>
                            Color <br />
                          <small>{GetColorName(`${this.state.currentItem.color}`)}</small>
                          </Col>
                          <Col align='right'>
                          <Badge className="p-4" style={{backgroundColor:this.state.currentItem.color}} pill> </Badge>

                          </Col>
                          
                        </Row>
                    </CardBody>
           
                      <ListGroup flush>
                    <ListGroupItem>
                      <Row>
                          <Col>Stock</Col>
                          {/* <Col align='right'>{this.state.currentStock.quantity}</Col> */}
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                      <Row>
                          <Col>Rental Price</Col>
                          {/* <Col align='right'>{this.state.currentStock.rentalPrice}.00 LKR</Col> */}
                        </Row>
                      </ListGroupItem>
                      </ListGroup>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={12} xl={12}>
                      <hr />
                    </Col>
                  </Row>
                
                  <Row>
                    <Col xs={12} sm={12} xl={12}>
                    

                      <table width="100%" border="0" className="table">
                        <thead>
                          <tr style={{ backgroundColor: "#f5f5f5" }}>
                            <th>#</th>
                            <th>Code</th>
                            <th>Desc</th>
                            <th>U Price</th>
                            <th>Qty</th>
                            <th>Amount</th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.items.map((data, index) => {
                            return (
                              <tr>
                                <td align="center" width="5%">
                                  {index + 1}
                                </td>
                                <td>{data.itemCode}</td>
                                <td aling="center">{data.description}</td>
                                <td aling="center">{data.unit_price}</td>
                                <td aling="center">{data.quantity}</td>
                                <td aling="center">{data.amount}</td>
                                <td align="center" width="10%">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    fill="currentColor"
                                    class="bi bi-x-circle-fill"
                                    viewBox="0 0 16 16"
                                    onClick={() => this.deleteItem(index)}
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                  </svg>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <br />
                      <table width="100%">
                        <tr>
                          <td width="45%">Discount</td>
                          <td width="10%">&nbsp;</td>
                          <td width="45%" align="right">
                            Cash
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              onChange={(e) =>
                                this.setState({ discount: e.target.value })
                              }
                              onKeyUp={this.handleDiscount}
                            />
                          </td>
                          <td>&nbsp;</td>
                          <td align="right">
                            <input
                              type="number"
                              className="form-control"
                              onChange={(e) =>
                                this.setState({ cash: e.target.value })
                              }
                              onKeyUp={this.handleCash}
                            />
                          </td>
                        </tr>
                      </table>
                      <br />
                      <div class="card">
                        <div class="card-body">
                          <table width="100%">
                            <tbody>
                              <tr className="border-bottom pb-50">
                                <td>
                                  <h5>Total</h5>
                                </td>
                                <td align="right">
                                  <h5>
                                    
                                    {(Math.round(this.state.total)).toFixed(2)} LKR
                                  </h5>
                                 
                                </td>
                              </tr>
                              {/* <hr  /> */}
                              <tr>
                                <td width="50%">
                                  <h5>Discount</h5>
                                </td>
                                <td align="right">
                                  <h5>
                                    {Math.round(this.state.discount).toFixed(2)} LKR
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td width="50%">
                                  <h5>Sub total</h5>
                                </td>
                                <td align="right">
                                  <h5>

                                    {(
                                      Math.round(this.state.total * 1 - this.state.discount * 1) 
                                    ).toFixed(2)} LKR
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5>cash</h5>
                                </td>
                                <td align="right">
                                  <h5>
                                    
                                    { Math.round(this.state.cash).toFixed(2)} LKR
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5>Balance</h5>
                                </td>
                                <td align="right">
                                  <h5>
                                  
                                    { Math.round(this.state.cash * 1 - (this.state.total * 1 - this.state.discount * 1)).toFixed(2)} LKR
                                  </h5>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <br />
                      <hr />
                      <br />
                      <table align="right">
                        <tbody>
                          <tr>
                            <td>
                              <button
                                className="btn btn-lg btn-warning"
                                onClick={() => this.setState({show:true})}
                              >
                                View print
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-lg btn-warning"
                                onClick={() => window.print()}
                              >
                                print
                              </button>
                              &nbsp;
                              <button
                                className="btn btn-lg btn-primary"
                                onClick={this.saveOrder}
                                
                              >
                                Create order
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                  <Modal isOpen={this.state.show} toggle={() => this.setState({show:false})} >
                   
                    <ModalBody>
                      {/* <section id="my_section"> */}
                      <table width="95%" align="left">
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
                                    <td className="text-center">
                                      <img src={logo} width='80%' alt='logo' />
                                      <br />
                                      No 14 , galle rad colombo.
                                      <br />
                                      phone:077X XXX XXX
                                      <br />
                                      <b>Salse invoice</b>
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
                                          <td>
                                            {" "}
                                            user : {this.state.user}
                                          </td>
                                          <td align="right">
                                            {this.state.date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            Invoice no :{" "}
                                            {this.state.orderId * 1 + 1}
                                          </td>
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
                                        <tr>
                                          <th>#</th>
                                          <th><b>Code</b></th>
                                          <th><b>Desc</b></th>
                                          <th><b>U Price</b></th>
                                          <th><b>Qty</b></th>
                                          <th><b>Amount</b></th>
                                        </tr>
                                        {this.state.items.map((data, index) => {
                                          return (
                                            <tr>
                                              <td align="center" width="5%">
                                                {index + 1}
                                              </td>
                                              <td>{data.itemCode}</td>
                                              <td aling="center">{data.description}</td>
                                              <td aling="center">{data.unit_price}</td>
                                              <td aling="center">{data.quantity}</td>
                                              <td aling="center">{data.amount}</td>
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
                                            {this.state.total} LKR
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Discount</td>
                                          <td align="right">
                                            {this.state.discount} LKR
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="text-bold">Sub total</td>
                                          <td align="right">
                                            {this.state.subTotal} LKR
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Cash</td>
                                          <td align="right">
                                            {this.state.cash} LKR
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Balance</td>
                                          <td align="right">
                                            {this.state.balance} LKR
                                          </td>
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
                                    <td align="center" className="small">
                                      Thank you come again.!
                                      <br />
                                      Powered by Inivac | Tel : 0771432944
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
                          <td align="right"></td>
                        </tr>
                      </table>
                      {/* </section> */}
                    </ModalBody>

                    {/* <Modal.Footer>
                      <Button variant="primary" onClick={() => window.print()}>
                        print
                      </Button>
                      <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                      </Button>
                    </Modal.Footer> */}
                  </Modal>
                  <table width="100%" align="left" id="prt">
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
                                <td className="text-center">
                                      <img src={logo} width='50%' alt='logo' />
                                      <br />
                                      No 14 , galle rad colombo.
                                      <br />
                                      phone:077X XXX XXX
                                      <br />
                                      <b>Salse invoice</b>
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
                                      <td> user : {this.state.user.name}</td>
                                      <td align="right">{this.state.date}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Invoice no :{" "}
                                        {this.state.orderId * 1 + 1}
                                      </td>
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
                                    <tr>
                                      <td style={{ fontWeight: "bold" }}>
                                        Item
                                      </td>
                                      <td style={{ fontWeight: "bold" }}>
                                        Brand
                                      </td>
                                      <td
                                        style={{ fontWeight: "bold" }}
                                        align="right"
                                      >
                                        Price
                                      </td>
                                      <td
                                        style={{ fontWeight: "bold" }}
                                        align="center"
                                      >
                                        Qty
                                      </td>
                                      <td
                                        style={{ fontWeight: "bold" }}
                                        align="right"
                                      >
                                        Amount
                                      </td>
                                    </tr>
                                    {this.state.items.map((data, index) => {
                                      return (
                                        <tr>
                                          <td>{data.name}</td>
                                          <td>{data.brand}</td>
                                          <td align="right">
                                            {data.unit_price}
                                          </td>
                                          <td align="center">
                                            {data.quantity}
                                          </td>
                                          <td align="right">{data.amount}</td>
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
                                      <td align="right">{this.state.total}</td>
                                    </tr>
                                    <tr>
                                      <td>Discount</td>
                                      <td align="right">
                                        {this.state.discount}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Sub total</td>
                                      <td align="right">
                                        {this.state.subTotal}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Cash</td>
                                      <td align="right">{this.state.cash}</td>
                                    </tr>
                                    <tr>
                                      <td>Balance</td>
                                      <td align="right">
                                        {this.state.balance}
                                      </td>
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
                              <td align="center" className="small">
                                      Thank you come again.!
                                      <br />
                                      Powered by Inivac | Tel : 0771432944
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
                      <td align="right"></td>
                    </tr>
                  </table>
                </Widget>
              </Col>
            </Row>
          </body>
          {/* NIC modal */}

      <Modal isOpen={this.state.showPhoto} toggle={() => this.setState({showPhoto:false})} >
        <ModalHeader>NIC</ModalHeader>
        <ModalBody>
              <Col align="center">
                <img src={this.state.currentCustomer.idPhoto} width='100%' alt='NIC' />
              </Col>
        </ModalBody>
        <ModalFooter>
        
        </ModalFooter>
      </Modal>
        </div>
      );
    }
  }
}

export default Typography;

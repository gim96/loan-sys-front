import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
// import DatePicker from "react-datepicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { getSource } from "../db/server.js";
import {token_header} from "../../utils/tokenHeader.js";
import Skeleton from '@mui/material/Skeleton';
import axios from "axios";
import { Grid } from "@material-ui/core";
import Table from "./Table.js";
import CartModal from "./components/cart-modal.js";
import EditModal from "./components/edit-modal.js";
import DeleteModal from "./components/delete-modal.js";
import CreateModal from "./components/create-modal.js";
import { Stack } from "@mui/material";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Calendar from "../../components/DateRange/Calendar.js";

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

const OngoingOrders = function () {


  const[orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  const [codeSearch, setCodeSearch] = useState('');
  const [itemCodes, setItemCodes] = useState([]);

  const [allOrders, setAllOrders] = useState([]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [currentOrder, setCurrentOrder] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [activePhone, setActivePhone] = useState([]);
  const [orderIds, setOrderIds] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [customerData, setCustomerData] = useState([])

  const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD')) 
  const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  
  const [products, setProducts] = useState([])


const [stockItem, setStockItem] = useState([]);

  async function getData() {

    axios.get(`${getSource()}/products`, token_header)
    .then((resp) => {
        setProducts(resp.data)
        setLoading(false)
    })  
    .catch((err) => {
        console.log(err);
    })


  };

  useEffect(() => {
    getData();
  }, []);



const getCustomersData = (phone) => {

    axios.get(`${getSource()}/customers/customerByPhone?phone=${phone}`, token_header)
    .then((resp) => {
        setCustomerData(resp.data.payload[0]);
    })  
    .catch((err) => {
        console.log(err);
    })

};

const handleCurrentItem = (item) => {
    setCurrentOrder(item)
    setOpenEdit(true);
   
};

const handleView = () => {
    setOpenView(true);
    // getItems(item.itemCode);
};
const handleCurrentItemDelete = (item) => {
    setCurrentOrder(item)
    setOpenDelete(true);
   
};


const handleCreate = (item) => {

    const data = {
      itemCode:item.itemCode,
      quantity: item.quantity,
      rentalPrice:item.rentalPrice,

    };
    axios.post(`${getSource()}/stocks`, data, token_header)
    .then((resp) => {
        getData();
        setOpenCreate(false); 
    })
    .catch((err) => { 
      console.log(err);
    });
};

const handleUpdate = (item) => {

    // console.log(currentItem._id);
    const data = {
      status:2,
      orderType:'rent'
    };
    axios.patch(`${getSource()}/orders?id=${currentOrder._id}`, data, token_header)
    .then((resp) => {
        getData();
        setOpenEdit(false); 
    })
    .catch((err) => { 
      console.log(err);
    });
};

const handleDelete = () => {

    const data = { status: 0};

    axios.delete(`${getSource()}/orders?id=${currentOrder._id}`, token_header)
    .then((resp) => {
        getData();
        setOpenDelete(false); 
    })
    .catch((err) => { 
      console.log(err);
    });
};

const getItems = async(id) => {
    console.log(id)
    await axios.get(`https://dummyjson.com/products`)
    .then((resp) => {
        // setStockItem(resp.data.payload);
        console.log(resp.data.payload);
   
        setOpenView(true);
    })  
    .catch((err) => {
        console.log(err);
    })
};

const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen((prevState) => !prevState);


    return (
        <div>
             <Row>
                <Col lg={12} md={12} xs={12} className="pl-4">
                    <button className="btn btn-warning" onClick={handleView}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                    </svg> &nbsp; Cart
                    </button>
                </Col>
            </Row>  
            <br />    
            <Row>
                <Col>
                  
                        {
                            isLoading ? <Skeleton height={250} /> : (
                                <div>
                                     <div className="p-1" style={{ width: '100%' }}>
                                        {
                                              (products && products.length > 0 &&
                                                <Table 
                                                    products={products} 
                                                    setOrders={setOrders}
                                                    setLoading={setLoading}
                                                    handleCurrentItem={handleCurrentItem}
                                                    handleCurrentItemDelete={handleCurrentItemDelete}
                                                    activeCount={activeCount}
                                                    setOpenCreate={setOpenCreate}
                                                    setOpenView={setOpenView}
                                                    handleView={handleView}
                                            />)

                                            ||

                                            <Card className="p-5 text-center" >No data available.!</Card>
                                        }
                                       
                                    </div>
                                    <br />
                                </div>
                            )
                        }
                   
                </Col>
            </Row>
            <CreateModal
                openCreate={openCreate}
                setOpenCreate={setOpenCreate}
                handleCreate={handleCreate}
                itemCodes={itemCodes}
                getItems={getItems}
                
                // stockItem={stockItem && stockItem}
            />
            <CartModal 
                openView={openView} 
                setOpenView={setOpenView} 
                handleView={handleView}
                stockItem={stockItem && stockItem}
                currentOrder={currentOrder}
                customerData={customerData}
                setOpenEdit={setOpenEdit}
            />
            <EditModal 
                openEdit={openEdit} 
                setOpenEdit={setOpenEdit}
                currentItem={currentOrder}
                handleUpdate={handleUpdate}
                itemCodes={itemCodes}
            />
            <DeleteModal 
                openDelete={openDelete} 
                setOpenDelete={setOpenDelete}
                currentItem={currentOrder}
                handleDelete={handleDelete}
            />
         </div>

    );
};

export default OngoingOrders;

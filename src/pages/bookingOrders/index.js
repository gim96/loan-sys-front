import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
// import DatePicker from "react-datepicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { getSource } from "../../pages/db/server";
import {token_header} from "../../utils/tokenHeader";
import Skeleton from '@mui/material/Skeleton';
import axios from "axios";
import { Grid } from "@material-ui/core";
import Table from "./Table";
import ViewModal from "./components/view-modal.js";
import EditModal from "./components/edit-modal.js";
import DeleteModal from "./components/delete-modal.js";
import CreateModal from "./components/create-modal.js";

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

    const [stockItem, setStockItem] = useState([]);

  async function getData() {

    axios.get(`${getSource()}/orders/booking?page=1&limit=20`, token_header)
    .then((resp) => {
        setOrders(resp.data.payload);
        setAllOrders(resp.data.payload);
    })  
    .catch((err) => {
        console.log(err);
    })

    axios.get(`${getSource()}/orders/booking-ids`, token_header)
    .then((resp) => {
        let arr = []
        resp.data.payload.map((data) => {
            arr.push(data.orderId)
        })
        setOrderIds(arr);
        setLoading(false);
    })  
    .catch((err) => {
        console.log(err);
    })
   
  };

  useEffect(() => {
    getData();
  }, []);

// const _handleTextFieldItems = (e) => {
//     const currCode = e.target.value;
//     const selItem =  allOrders.filter((order) => order.orderId === currCode);
//     setSelectedItem(selItem);
//     setCodeSearch(currCode);
// };

const handleCurrentItem = (item) => {
    setCurrentOrder(item)
    setOpenEdit(true);
   
};

const handleView = (item) => {
    console.log(item);
    setCurrentOrder(item);
    setOpenView(true);
    // getItems(item.itemCode);
};
const handleCurrentItemDelete = (item) => {
    setCurrentOrder(item)
    setOpenDelete(true);
   
};

const handleSearch = () => {

    if (codeSearch !== "") {

        axios.get(`${getSource()}/orders/search?orderId=${selectedId}`, token_header)
        .then((resp) => {
            console.log(resp)
            if (resp.data.payload.length > 0) {
                setOrders(resp.data.payload);
            } else {
                setOrders([]);
            }
           
        })  
        .catch((err) => {
            console.log(err);
        })

    } else {
        setOrders(allOrders);
    }
    
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
    await axios.get(`${getSource()}/items/byItemCode?itemCode=${id}`, token_header)
    .then((resp) => {
        setStockItem(resp.data.payload);
        console.log(resp.data.payload);
   
        setOpenView(true);
    })  
    .catch((err) => {
        console.log(err);
    })
};

    return (
        <div>
             <Row>
                <Col lg={12} md={12} xs={12}>
                    <Card className="p-3 pl-3">
                        <Row>
                            <Col lg={4} md={4} xs={12} className="pt-4">Filter</Col>
                            <Col lg={2} md={2} xs={2}></Col>
                            <Col lg={4} md={4} xs={12} align='right'>
                                <Autocomplete
                                    id="free-solo-demo"
                                    freeSolo
                                    options={orderIds.map((option) => option)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search by Order Id"
                                            margin="normal"
                                            variant="outlined"
                                            placeholder="Search by Phone no"
                                            onChange={(e) => setSelectedId(e.target.value)}
                                            onSelect={(e) => setSelectedId(e.target.value)}
                                        />
                                    )}
                                />
                            </Col>
                            <Col lg={2} md={2} xs={2} className="pt-3">
                                <Button className='p-3 float-center' color='primary' onClick={handleSearch}>
                                    search
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>  
            <br />    
            <Row>
                <Col>
                    <Card className="p-1 pl-3 pr-3">
                        {
                            isLoading ? <Skeleton height={250} /> : (
                                <div>
                                     <div className="p-1" style={{ width: '100%' }}>
                                        <Table 
                                            orders={orders} 
                                            setOrders={setOrders}
                                            setLoading={setLoading}
                                            handleCurrentItem={handleCurrentItem}
                                            handleCurrentItemDelete={handleCurrentItemDelete}
                                            activeCount={activeCount}
                                            setOpenCreate={setOpenCreate}
                                            setOpenView={setOpenView}
                                            handleView={handleView}
                                        />
                                    </div>
                                    <br />
                                </div>
                            )
                        }
                    </Card>
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
            <ViewModal 
                openView={openView} 
                setOpenView={setOpenView} 
                handleView={handleView}
                stockItem={stockItem && stockItem}
                currentOrder={currentOrder}
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

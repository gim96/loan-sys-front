import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody,
     ModalFooter, Button,    Dropdown,
     DropdownToggle,
     DropdownMenu,
     DropdownItem, } from "reactstrap";
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
import { Stack } from "@mui/material";
import Table from "./Table";
import ViewModal from "./components/view-modal.js";
import EditModal from "./components/edit-modal.js";
import DeleteModal from "./components/delete-modal.js";
import CreateModal from "./components/create-modal.js";
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

    const [stockItem, setStockItem] = useState([]);
    const [orderIds, setOrderIds] = useState([]);
    const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD')) 
  const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD')) 
  const [customerData, setCustomerData] = useState([])


  async function getData() {

    axios.get(`${getSource()}/orders/closed?page=1&limit=20`, token_header)
    .then((resp) => {
        setOrders(resp.data.payload);
        setAllOrders(resp.data.payload);
        setLoading(false);
    })  
    .catch((err) => {
        console.log(err);
    })

    axios.get(`${getSource()}/orders/ids?type=closed`, token_header)
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

const getCustomersData = (phone) => {

    axios.get(`${getSource()}/customers/customerByPhone?phone=${phone}`, token_header)
    .then((resp) => {
        console.log(resp)
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

const handleView = (item) => {
    getCustomersData(item.customerPhone)
    setCurrentOrder(item);
    setOpenView(true);
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
      itemCode:item.itemCode,
      name: item.name,
      color:item.color,
      size:item.size,
      type:item.type
    };
    axios.patch(`${getSource()}/items?id=${currentOrder._id}`, data, token_header)
    .then((resp) => {
        getData();
        setOpenEdit(false); 
    })
    .catch((err) => { 
      console.log(err);
    });
};

const handleDelete = () => {
    axios.delete(`${getSource()}/items?id=${currentOrder._id}`, token_header)
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

const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen((prevState) => !prevState);

const handleDate = (date) => {

    setStartDate(moment(date.startDate).format('YYYY-MM-DD'))
    setEndDate(moment(date.endDate).format('YYYY-MM-DD'))

    
};

const handleSearch = (selected_id) => {

    if (selected_id !== "") {

        axios.get(`${getSource()}/orders/search?type=pending&orderId=${selected_id}`, token_header)
        .then((resp) => {
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

const handleSearchByDate = () => {

    const data = {
        startDate:startDate,
        endDate:endDate,
    };

    axios.post(`${getSource()}/orders/byDate?type=booking&page=1&limit=20`, data, token_header)
    .then((resp) => {
        setOrders(resp.data.payload);
        // setAllOrders(resp.data.payload);
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
                            <Col lg={4} md={4} xs={12}>
                            <Stack direction='row' spacing={1} className='pt-3' align='right'>
                                 <div>
                                 <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='down'>
                                    <DropdownToggle caret className='pl-4 pr-4 pt-3 pb-3'>{startDate} - {endDate} </DropdownToggle>
                                    <DropdownMenu>
                                    <DropdownItem header>
                                        <Calendar onChange={(date) => handleDate(date)} />
                                    </DropdownItem>
                                </DropdownMenu>
                                </Dropdown>
                                 </div>
                                <div>
                                <Button className='p-3 float-center' color='primary' onClick={handleSearchByDate}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                            </svg>
                                        </Button>
                                </div>
                                </Stack>
                            </Col>
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
                                            placeholder=" &#128269;"
                                            onChange={(e) => handleSearch(e.target.value)}
                                            onSelect={(e) => handleSearch(e.target.value)}
                                        />
                                    )}
                                />
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
                                         {
                                             (orders && orders.length > 0 &&
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
                                            />)

                                            ||

                                            <Card className="p-5 text-center" >No data available.!</Card>
                                         }
                                       
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
                customerData={customerData}
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

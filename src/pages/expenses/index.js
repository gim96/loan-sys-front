import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button,  Dropdown,
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
import { Grid } from "@material-ui/core";
import Table from "./Table";
import ViewModal from "./components/view-modal.js";
import EditModal from "./components/edit-modal.js";
import DeleteModal from "./components/delete-modal.js";
import CreateModal from "./components/create-modal.js";
import Calendar from "../../components/DateRange/Calendar.js";
import { Stack } from "@mui/material";

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

const Expenses = function () {


  const[items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  const [codeSearch, setCodeSearch] = useState('');
  const [itemCodes, setItemCodes] = useState([]);

  const [allItems, setAllItems] = useState([]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [currentItem, setCurrentItem] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [activePhone, setActivePhone] = useState([]);
  const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD')) 
  const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD')) 
  const [amount, setAmount] = useState('')
  const [suppliers, setSuppliers] = useState([])


  async function getData() {
    

    axios.get(`${getSource()}/items/itemCodes`, token_header)
    .then((resp) => {
        const arr = [];
        const items = resp.data.payload; 
        items.map((item) => {
            
            arr.push(item.itemCode);
        })
        setItemCodes(arr);
    })  
    .catch((err) => {
        console.log(err);
    })

    axios.get(`${getSource()}/suppliers/all`, token_header)
    .then((resp) => {
        
        const arr = [];
        const items = resp.data.payload; 
        items.map((item) => {
            arr.push(item.name);
        })
        console.log(arr)
        setSuppliers(arr);
    })  
    .catch((err) => {
        console.log(err);
    })

    axios.get(`${getSource()}/expenses?page=1&limit=20`, token_header)
    .then((resp) => {
        console.log(resp);
        setItems(resp.data.payload);
        setAllItems(resp.data.payload);
        setLoading(false);
    })  
    .catch((err) => {
        console.log(err);
    })
   
  };

  useEffect(() => {
    getData();
  }, []);

const _handleTextFieldItems = (e) => {
    const currCode = e.target.value;
    const selItem =  allItems.filter((item) => item.itemCode === currCode);
    setSelectedItem(selItem);
    setCodeSearch(currCode);
};

const handleCurrentItem = (item) => {
    setCurrentItem(item)
    setOpenEdit(true);
};
const handleCurrentItemDelete = (item) => {
    setCurrentItem(item)
    setOpenDelete(true);
};

const handleSearch = () => {

    if (codeSearch !== "") {
        setItems(selectedItem);
    } else {
        setItems(allItems);
    }
    
};

const handleCreate = (data) => {

    axios.post(`${getSource()}/expenses`, data, token_header)
    .then((resp) => {

        getData();
        setOpenCreate(false); 
    })
    .catch((err) => { 
    
      console.log(err);
    });
};

const handleUpdate = (data) => {

    axios.patch(`${getSource()}/expenses?id=${currentItem._id}`, data, token_header)
    .then((resp) => {
        getData();
        setOpenEdit(false); 
    })
    .catch((err) => { 
      console.log(err);
    });
};

const handleDelete = () => {
    axios.delete(`${getSource()}/expenses?id=${currentItem._id}`, token_header)
    .then((resp) => {
        getData();
        setOpenDelete(false); 
    })
    .catch((err) => { 
      console.log(err);
    });
};

const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen((prevState) => !prevState);

const handleDate = (date) => {

    setStartDate(moment(date.startDate).format('YYYY-MM-DD'))
    setEndDate(moment(date.endDate).format('YYYY-MM-DD'))
    
};

const handleSearchByDate = () => {

    const data = {
        startDate:startDate,
        endDate:endDate,
    };

    axios.post(`${getSource()}/expenses/byDate?page=1&limit=20`, data, token_header)
    .then((resp) => {
        setItems(resp.data.payload);
        // setAllOrders(resp.data.payload);
    })  
    .catch((err) => {
        console.log(err);
    })
};

const handleView = (i) => {
    setCurrentItem(allItems[i])
    setOpenView(true)
}

    return (
        <div>
             <Row>
                <Col lg={12} md={12} xs={12}>
                    <Card className="p-3 pl-3">
                        <Row>
                            <Col lg={4} md={4} xs={12} className="pt-4">Filter</Col>
                            
                            <Col lg={4} md={4} xs={12} align='right' className="pt-3">
                            <Stack direction='row' spacing={1}>
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
                            <Col lg={4} md={4} xs={12}>
                                <Stack direction='row' spacing={1}>
                                    <div>
                                        <TextField
                                            label="Search by Order Id"
                                            margin="normal"
                                            variant="outlined"
                                            onChange={(e) => setAmount(e.target.value)}
                                            // onSelect={(e) => handleSearch(e.target.value)}
                                        />
                                    </div>
                                    <div className='pt-3'>
                                        <Button className='p-3 float-center' color='primary' onClick={handleSearch}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                            </svg>
                                        </Button>
                                    </div>
                                </Stack>
                                
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
                                            customers={items} 
                                            setCustomers={setItems}
                                            setLoading={setLoading}
                                            handleCurrentItem={handleCurrentItem}
                                            handleCurrentItemDelete={handleCurrentItemDelete}
                                            activeCount={activeCount}
                                            setOpenCreate={setOpenCreate}
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
                suppliers={suppliers}
            />
            <ViewModal 
                openView={openView} 
                setOpenView={setOpenView} 
                currentItem={currentItem}
            />
            <EditModal 
                openEdit={openEdit} 
                setOpenEdit={setOpenEdit}
                currentItem={currentItem}
                handleUpdate={handleUpdate}
                suppliers={suppliers}
            />
            <DeleteModal 
                openDelete={openDelete} 
                setOpenDelete={setOpenDelete}
                currentItem={currentItem}
                handleDelete={handleDelete}
            />
         </div>

    );
};

export default Expenses;

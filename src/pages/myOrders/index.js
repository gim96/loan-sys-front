import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, 
    ModalFooter, Button ,     Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,} from "reactstrap";
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
import Table from "./Table";
import { Stack } from "@mui/material";
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

const MyOrders = function () {



  const [selectedItem, setSelectedItem] = useState([]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [currentOrder, setCurrentOrder] = useState([]);

    const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD')) 
const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD')) 
const [stockItem, setStockItem] = useState([]);


const handleCurrentItem = (item) => {
    setSelectedItem(item)
    if (type === 'view') {
        setOpenView(true)
    }
    if (type === 'edit') {
       
        setOpenEdit(true);
    }
    if (type === 'delete') {
       
        setOpenDelete(true);
    }
   
};

const handleView = (item) => {
    getCustomersData(item.customerPhone)
    setCurrentOrder(item);
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
      status:0,
      orderType:'rent',
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

const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen((prevState) => !prevState);

const handleDate = (date) => {

    setStartDate(moment(date.startDate).format('YYYY-MM-DD'))
    setEndDate(moment(date.endDate).format('YYYY-MM-DD'))
    
};


    return (
        <div>
           
            <br />    
            <Row>
                <Col>
                    <Card className="p-1 pl-3 pr-3">
                        <Table 
                            setOpenCreate={setOpenCreate}
                            setOpenView={setOpenView}
                            handleCurrentItem={handleCurrentItem}
                        />

                    </Card>
                </Col>
            </Row>
            <CreateModal
                openCreate={openCreate}
                setOpenCreate={setOpenCreate}
                handleCreate={handleCreate}
            />
            <ViewModal 
                openView={openView} 
                setOpenView={setOpenView} 
                selectedItem={selectedItem}
            />
            <EditModal 
                openEdit={openEdit} 
                setOpenEdit={setOpenEdit}
                selectedItem={selectedItem}
            />
            <DeleteModal 
                openDelete={openDelete} 
                setOpenDelete={setOpenDelete}
                selectedItem={selectedItem}
            />
           
         </div>

    );
};

export default MyOrders;

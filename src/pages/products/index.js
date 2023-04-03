import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
// import DatePicker from "react-datepicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { getSource } from "../../pages/db/server";
import {token_header, token_header_withFile} from "../../utils/tokenHeader";
import Skeleton from '@mui/material/Skeleton';
import axios from "axios";
import { Grid } from "@material-ui/core";
import Table from "./Table";
import ViewModal from "./components/view-modal.js";
import EditModal from "./components/edit-modal.js";
import DeleteModal from "./components/delete-modal.js";
import CreateModal from "./components/create-modal.js";
import firebase from "firebase";
import fileUrl from 'file-url';
import { Base64 } from 'js-base64';
import { Stack } from "@mui/material";
import Select from 'react-select';

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

const Items = function () {


  const[items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState([])


  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [currentItem, setCurrentItem] = useState([]);


  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState([])


  const handleView = () => {
      setOpenView(true)
  }


  useEffect(() => {
    axios.get(`${getSource()}/products`)
    .then((resp) => {
        setProducts(resp.data)
    })
    .catch((err) => {
      alert('something went wrong when retreving data')
    })
  }, [])


const handleCurrentItem = (item, type) => {
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

const handleCreate = (item) => {

    const data = {
      itemCode:item.itemCode,
      name: item.name,
      color:item.color,
      type:item.type,
      size:item.size, 
      price:item.price,
      status:1,  
      images:images
    };

    // console.log(data)
    // console.log(images)
    // console.log(data)
    axios.post(`${getSource()}/items`, data, token_header)
    .then((resp) => {
        if (resp.status === 200 || resp.status === 201) {
            getData();
            setOpenCreate(false); 
        } 
       
    })
    .catch((err) => { 
        console.log(err)
        alert('This item already added.!')
    });
};

    return (
        <div>  
            <Row>
                <Col>
                   
                    <Card className="p-1 pl-3 pr-3">
                        <div className="pt-3 pl-2">
                            <button className="btn btn-warning" onClick={() => setOpenCreate(true)}>Add Product</button>
                        </div>
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

export default Items;

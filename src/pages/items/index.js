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
  const [selectedItem, setSelectedItem] = useState([]);
  const [codeSearch, setCodeSearch] = useState('');
  const [itemCodes, setItemCodes] = useState([]);
  const [images, setImages] = useState([])

  const [allItems, setAllItems] = useState([]);

  const [openCreate, setOpenCreate] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [currentItem, setCurrentItem] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [activePhone, setActivePhone] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([])
  const [imgLoading, setImgLoading] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])



  async function getData() {
    

    axios.get(`${getSource()}/items`, token_header)
    .then((resp) => {
        setActivePhone(resp.data.payload);
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
        setItemCodes(arr);
    })  
    .catch((err) => {
        console.log(err);
    })

    axios.get(`${getSource()}/items?page=1&limit=20`, token_header)
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
    const imgg = fileUrl('196468021_5771315759606282_1398966008318955929_n (1) (1).jpg');
    console.log(imgg)
    getData();
  }, []);

  const handleView = () => {
      setOpenView(true)
  }

  const removeImage = async() => {

    await firebase.storage().ref('url').delete()
  }


  const uploadItemsImages = async (image) => {
    let arr = images
    const uploadTask = await firebase
        .storage()
        .ref(`items/${new Date()}`)
        .put(image)
        .then((resp) => {

            resp.ref.getDownloadURL().then((url) => {
                arr.push(url)
                setImages([...arr])
                console.log(arr)
                setImgLoading(false)
            })
        })
        .catch((err) => {
            console.log(err)
            setImgLoading(false)
        })
  };

  const onHandleImages =  (e) => {

        if (e.target.files[0].size < 500000) {
            setImgLoading(true)
            uploadItemsImages(e.target.files[0])
        } else {

            alert('minimum file size exeeded.!')
        }
  }


const _handleTextFieldItems = (e) => {
    const currCode = e.target.value;
    const selItem =  allItems.filter((item) => item.itemCode === currCode);
    setSelectedItem(selItem);
    setCodeSearch(currCode);
};

const handleCurrentItem = (item, type) => {
    console.log(item.images)
    setCurrentItem(item)
    if (type === 'view') {
        setOpenView(true)
    }
    if (type === 'edit') {
        setImages(item.images)
        setOpenEdit(true);
    }
    
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
    console.log(data)
    console.log(images)
    // console.log(data)
    axios.post(`${getSource()}/items`, data, token_header)
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
      type:item.type,
      price:item.price,
      status:item.status,
      images:item.images
    };

    axios.patch(`${getSource()}/items?id=${currentItem._id}`, data, token_header)
    .then((resp) => {
        getData();
        setOpenEdit(false); 
    })
    .catch((err) => { 
      console.log(err);
    });
};

const handleDelete = () => {
    axios.delete(`${getSource()}/items?id=${currentItem._id}`, token_header)
    .then((resp) => {
        getData();
        setOpenDelete(false); 
    })
    .catch((err) => { 
      console.log(err);
    });
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
                                    options={itemCodes.map((option) => option)}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Item Code"
                                        margin="normal"
                                        variant="outlined"
                                        placeholder="Search by Phone no"
                                        onSelect={_handleTextFieldItems}
                                        on
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
                                            customers={items} 
                                            setCustomers={setItems}
                                            setLoading={setLoading}
                                            handleCurrentItem={handleCurrentItem}
                                            handleCurrentItemDelete={handleCurrentItemDelete}
                                            activeCount={activeCount}
                                            setOpenCreate={setOpenCreate}
                                            setOpenView={setOpenView}
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
                onHandleImages={onHandleImages}
                images={images}
                setImages={setImages}
                imgLoading={imgLoading}
                // setCurrentItem={}
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
                onHandleImages={onHandleImages}
                handleUpdate={handleUpdate}
                setCurrentItem={setCurrentItem}
                images={images}
                setImages={setImages}
                imgLoading={imgLoading}
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

export default Items;

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
  const [searchParams, setSearchParams] = useState([]) 

  const [description, setDescription] = useState('')
  const [clothType, setClothType] = useState('')
  const [color, setColor] = useState('')
  const [itemCode, setItemCode] = useState('')

  const [itemCodeList, setItemCodeList] = useState([])
  const [descriptionList, setDescriptionList] = useState([])
  const [clothTypeList, setClothTypeList] = useState([])
  const [colorList, setColorList] = useState([])

  const [isClearable, setIsClearable] = useState(true);

  async function getData() {
    

    axios.get(`${getSource()}/items`, token_header)
    .then((resp) => {
        setActivePhone(resp.data.payload);
    })  
    .catch((err) => {
        console.log(err);
    })

    axios.get(`${getSource()}/items/searchParams`, token_header)
    .then((resp) => {
        // const arr = [];
        const items = resp.data.payload; 
        // console.log(items)
        setSearchParams(items);
        setActiveCount(items.length)
        const arrCodes = items.map((data) => ({label:data.itemCode,value:data.itemCode}))
        const arrDescription = items.map((data) => ({label:data.name,value:data.name}))
        setItemCodeList(arrCodes)
        setDescriptionList(arrDescription)
        
    })  
    .catch((err) => {
        console.log(err);
    })

    axios.get(`${getSource()}/items?page=1&limit=20`, token_header)
    .then((resp) => {
        // console.log(resp);
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
    // console.log(imgg)
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
    console.log(allItems)
    const currCode = e.target.value;
    const selItem =  allItems.filter((item) => item.itemCode === currCode);
    if (selItem.length > 0) {
        setSelectedItem(selItem);
    } else {

        axios.get(`${getSource()}/items/byItemCode?itemCode=${currCode}`, token_header)
        .then((resp) => {
            setSelectedItem(resp.data.payload);
        })  
        .catch((err) => {
            console.log(err);
        })
    }
    // console.log(selItem)
    setCodeSearch(currCode);
};

const _handleTextFieldDescriptions = (e) => {
  
    const currCode = e.target.value;
    // const selItem =  allItems.filter((item) => item.itemCode === currCode);
    // if (selItem.length > 0) {
    //     setSelectedItem(selItem);
    // } else {

    //     axios.get(`${getSource()}/items/byItemCode?itemCode=${currCode}`, token_header)
    //     .then((resp) => {
    //         setSelectedItem(resp.data.payload);
    //     })  
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }
    // // console.log(selItem)
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

const handleUpdate = (item, removedImages) => {

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

    const imgUrls = removedImages
    // var fileRef = storage.refFromURL(fileUrl);
    console.log(data)
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
        if (resp.data.success === true) {
            getData();
            setOpenDelete(false); 
        } else {
            setOpenDelete(false); 
            alert(resp.data.message);
        }
        
    })
    .catch((err) => { 
      console.log(err);
    });
};


    const colors = [
        {label:'black',value:'black'},
        {label:'white', value:'white'} ,
        {label:'green', value:'green'},
        {label:'light', value:'light'},
        {label:'Dark green', value:'Dark green'},
        {label:'blue', value:'blue'},
        {label:'light blue', value:'light blue'},
        {label:'dark blue', value:'dark blue'} ,
        {label:'red', value:'red'},
        {label:'dark red', value:'dark red'}, 
        {label:'light red', value:'light red'}, 
        {label:'yellow', value:'yellow'},
        {label:'purple', value:'purple'},
        {label:'cream', value:'cream'},
        {label:'gray' , value:'gray'},
        {label:'ash', value:'ash'},
        {label:'light gray', value:'light gray'},  
        {label:'dark gray', value:'dark gray'},
        {label:'pink',value:'pink'},
        {label:'light pink', value:'light pink'},  
        {label:'dark pink', value:'dark pink'},
        {label:'gold', value:'gold'},
        {label:'maroon', value:'maroon'}, 
        {label:'brown', value:'brown'},
        {label:'light brown', value:'light brown'},  
        {label:'dark brown', value:'dark brown'} 
    ]

    const types = [
        {label:'Sarong', value:'Sarong'},
        {label:'Blazer', value:'Blazer'},
        {label:'Shirt', value:'Shirt'},
        {label:'Trouser', value:'Trouser'},
        {label:'Waistcoat', value:'Waistcoat'},
        {label:'Accessory', value:'Accessory'}
    ]

    const handleSearch = () => {

        const data = {
            itemCode:itemCode ? itemCode.value : '',
            description:description ? description.value : '',
            clothType:clothType ? clothType.value : '',
            color:color ? color.value : ''
        }
        console.log(data)
        axios.post(`${getSource()}/items/search`, {data}, token_header)
        .then((resp) => {
            const data = resp.data.payload
            setItems(data);
            setAllItems(data);
            setActiveCount(data)
            // console.log(resp.data)
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
                            <Col lg={2} md={2} xs={12} className='pt-1'>Filter</Col>
                            <Col lg={10} md={10} xs={12} align='right'>
                                <Stack direction='row' spacing={1}>
                                    <div className='w-100'>
                                        <Select
                                            value={description}
                                            defaultValue={{label:'', value:''}}
                                            onChange={(value) => setDescription(value)}
                                            options={descriptionList}
                                            className='text-left'
                                            placeholder='Description'
                                            isClearable={true}
                                        />
                                    </div>
                                    <div className='w-100'>
                                        <Select
                                            value={clothType}
                                            defaultValue={{label:'', value:''}}
                                            onChange={(value) => setClothType(value)}
                                            options={types}
                                            className='text-left'
                                            placeholder='Cloth type'
                                            isClearable={true}
                                        />
                                    </div>
                                    <div className='w-100'>
                                        
                                        <Select
                                            value={color}
                                            defaultValue={{label:'', value:''}}
                                            onChange={(value) => setColor(value)}
                                            options={colors}
                                            className='text-left'
                                            placeholder='Color'
                                            isClearable={true}
                                        />
                                    </div>
                                    <div className='w-100'>
                                        <Select
                                            value={itemCode}
                                            defaultValue={{label:'', value:''}}
                                            onChange={(value) => setItemCode(value)}
                                            options={itemCodeList}
                                            className='text-left'
                                            placeholder='Item Code'
                                            isClearable={true}
                                        />
                                    </div>
                                    <div>
                                        <Button color='primary' className='pl-3 pr-3' onClick={handleSearch}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                            </svg>
                                        </Button>
                                    </div>
                                    <div>
                                        <Button color='secondary' className='pl-3 pr-3' onClick={getData}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
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
                                        {
                                            items && items.length > 0 &&
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

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardBody
} from "reactstrap";

import cloudIcon from "../../assets/tables/cloudIcon.svg";
import funnelIcon from "../../assets/tables/funnelIcon.svg";
import optionsIcon from "../../assets/tables/optionsIcon.svg";
import printerIcon from "../../assets/tables/printerIcon.svg";
import searchIcon from "../../assets/tables/searchIcon.svg";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import avatar from "../../assets/tables/avatar.png";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import s from "./Tables.module.scss";
import mock from "./mock.js";
import axios from "axios";
import { getSource } from "../db/server";
import {token_header} from "../../utils/tokenHeader";
import moment from "moment";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Tables = function ({
  products, setOrders, setLoading, 
  handleCurrentItem, handleCurrentItemDelete, activeCount, setOpenCreate, setOpenView, handleView}) {

const [selectedItem, setSelectedItem] = useState([]); 

useEffect(() => {
    if (products) {
      console.log(products)
    }
}, [products])

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [firstTable] = useState(mock.firstTable);
  const [secondTable] = useState(mock.secondTable);
  const [transactions, setTransactions] = useState(mock.transactionsWidget);
  const [tasks, setTasks] = useState(mock.tasksWidget);
  const [firstTableCurrentPage, setFirstTableCurrentPage] = useState(0);
  const [secondTableCurrentPage, setSecondTableCurrentPage] = useState(0);
  const [tableDropdownOpen, setTableMenuOpen] = useState(false);

  // const pageSize = 10;
  // const firstTablePagesCount = Math.ceil(activeCount / pageSize);
  // const secondTablePagesCount = Math.ceil(secondTable.length / pageSize);

  const [currentPage, setCurrentPage] = useState(1);

  const setFirstTablePage = (e, index) => {
    e.preventDefault();
    setFirstTableCurrentPage(index);
  }

  const handleEdit = (i) => {
     const currItem = orders[i];
     handleCurrentItem(currItem);
  }; 
  
  const handleDelete = (i) => {
    const currItem = orders[i];
    handleCurrentItemDelete(currItem);
 };    

 const addToCart = (i) => {
  const productId = products[i].product_id
  const userId = JSON.parse(localStorage.getItem('user')).id

  axios.post(`${getSource()}/carts/`, {product_id:productId, user_id:userId})
  .then((resp) => {
    console.log(resp)
  })
  .catch((err) => {
    console.log(err)
  })
 }


  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            
              {
                products && products.map((item, i) => (
                  <Col lg={4}>
                  <Card className="p-1 pt-3 pl-3 pr-3" style={{height:'calc(100% - 2.2rem)'}}>
                    <img width='100%' height='100px' style={{objectFit:'cover'}} src={item.thumbnail} />
                    <br />
                    {item.title}
                    <hr />
                    <small>{item.category}</small>
                    <h6>{item.price} LKR</h6>
                    <button type='button' className='btn btn-warning' onClick={() => addToCart(i)}>Add to cart</button>
                    <br />
                    <br />
                    <br />
                    </Card>
                  </Col>
                ))
              }
            
          </Row>
          <br />
        </Col>
      </Row>
    </div>
  )
}

export default Tables;

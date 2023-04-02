import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
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

const Tables = function ({
  customers, setCustomers, setLoading, handleCurrentItem, handleCurrentItemDelete, activeCount, setOpenCreate, handleView}) {

const [selectedItem, setSelectedItem] = useState([]); 

useEffect(() => {
    if (customers) {
      console.log(customers)
    }
}, [customers])

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
     const currItem = customers[i];
     handleCurrentItem(currItem);
  }; 
  
  const handleDelete = (i) => {
    const currItem = customers[i];
    handleCurrentItemDelete(currItem);
 };    

 const handleShow = (i) => {
    handleView(i)
 };


// 

var pages = activeCount / 20;

var actualPages = parseInt(pages) + 1;
var pageCount = [];

for (var i = 1; i < actualPages + 1; i++) {
  pageCount.push(i);
}

const prePage = () => {
  if (currentPage > 1) {
    getPageData(currentPage - 1);
  }
};

const nextPage = () => {
  if (currentPage < pageCount.length) {
    getPageData(currentPage + 1);
  }
};


const getPageData = (number) => {
  setCurrentPage(number);
  axios
    .get(
      `${getSource()}/customers/active?page=${number}&limit=20`,token_header)
    .then((resp) => {
      setCustomers(resp.data.payload);
      setLoading(false);
    });
};

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              {/* <Widget> */}
                <div className={s.tableTitle}>
                  <div className="headline-2">Customers details</div>
                  <div className="d-flex">
                    <IconButton aria-label="delete" size="large" onClick={() => setOpenCreate(true)}>
                        <AddCircleIcon fontSize="inherit" />
                    </IconButton>
                   
                  </div>
                </div>
                <div className="widget-table-overflow">
                  <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                    <thead>
                    <tr>
                      <th className={s.checkboxCol}>
                        <div className="checkbox checkbox-primary">
                          <input
                            className="styled"
                            id="checkbox100"
                            type="checkbox"
                          />
                          <label for="checkbox100"/>
                        </div>
                      </th>
                      {/* <th className="w-5">Name</th> */}
                      <th className="w-15">user ID</th>
                      <th className="w-25">Username</th>
                      <th className="w-25">dob</th>
                      <th className="w-20">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers
                      .map((item, i) => (
                       
                        <tr key={uuidv4()}>
                          <td>
                            <div className="checkbox checkbox-primary">
                              {i+1}
                            </div>
                          </td>
                          <td >
                              {item.user_id}
                          </td>
                          <td>{item.username}</td>
                          <td>{item.dob}</td>
                          <td>
                            <IconButton aria-label="delete" size="large" onClick={() => handleShow(i)}>
                                <VisibilityIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="delete" size="large" onClick={() => handleEdit(i)}>
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="delete" size="large" onClick={() => handleDelete(i)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                 
                
                </div>
              {/* </Widget> */}
            </Col>
          </Row>
          <br />
        </Col>
      </Row>
    </div>
  )
}

export default Tables;

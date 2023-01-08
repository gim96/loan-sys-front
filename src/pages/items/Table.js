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
  Badge,
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
import Items from ".";

const Tables = function ({
  customers, setCustomers, setLoading,
   handleCurrentItem, handleCurrentItemDelete,
    activeCount, setOpenCreate, setOpenView
  }) {

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

  const handleView = (i) => {
    const currItem = customers[i];
    handleCurrentItem(currItem, 'view');
  }

  const handleEdit = (i) => {
     const currItem = customers[i];
     handleCurrentItem(currItem, 'edit');
  }; 
  
  const handleDelete = (i) => {
    const currItem = customers[i];
    handleCurrentItemDelete(currItem);
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
      `${getSource()}/items?page=${number}&limit=20`,token_header)
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
                  <div className="headline-2">Items details</div>
                  <div className="d-flex">
                    <IconButton aria-label="delete" size="large" onClick={() => setOpenCreate(true)}>
                        <AddCircleIcon fontSize="inherit" />
                    </IconButton>
                   
                  </div>
                </div>
                <div className="widget-table-overflow">
                  <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                    <thead className='border'>
                    <tr>
                      <th className={`${s.checkboxCol}`}>
                        <div className="checkbox checkbox-primary">
                          <input
                            className="styled"
                            id="checkbox100"
                            type="checkbox"
                          />
                          <label for="checkbox100"/>
                        </div>
                      </th>
                      <th className="w-10">Item Code</th>
                      <th className="w-25">Description</th>
                      <th className="w-20">Cloth Type</th>
                      <th className="w-10">Size</th>
                      <th className="w-10">Color</th>
                      <th className="w-5">Photo</th>
                      <th className="w-5">Price</th>
                      <td className="w-5">Status</td>
                      <th className="w-10">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers
                      .map((item, i) => (
                       
                        <tr key={uuidv4()}>
                          <td>
                            <div className="checkbox checkbox-primary">
                              {currentPage < 2 ? i+1 : (i + 1 + 20 * currentPage - 20)}
                            </div>
                          </td>
                          <td>
                            {item.itemCode}
                          </td>
                          <td>{item.name}</td>
                          <td>{item.type}</td>
                          <td>{item.size}</td>
                          <td>
                            <span>{item.color}</span>
                          {/* <span class="badge badge-secondary pl-3 pr-3" style={{backgroundColor:`${item.color}`}}>&nbsp; </span> */}
                          </td>
                          <td>{item.images.length ? (<img src={item.images[0]} width='25px' height='25px' style={{objectFit:'cover', borderRadius:'5px'}} />) : ''}</td>
                          <td>{item.price}.00</td>
                          <td>
                            {item.status === 0 ? (<Badge color='danger'>Out of Stock</Badge>) : (item.status === 1 ? <Badge color='success'>In Stock</Badge> : <Badge color='warning'>Booked</Badge>)}
                          </td>
                          <td>
                            <IconButton aria-label="delete" size="large" onClick={() => handleView(i)}>
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
                  <table width="100%" className='float-right'>
                    <tr>
                      <td width="50%">
                        {currentPage} Page(s) of {pageCount.length}
                      </td>
                      <td width="40%" align="right">
                        {/* <nav aria-label="Page navigation example"> */}
                        <ul class="pagination">
                          <li>
                            <button
                              class="page-link"
                              aria-label="Previous"
                              onClick={prePage}
                            >
                              <span aria-hidden="true">&laquo;</span>
                              <span class="sr-only">Previous</span>
                            </button>
                          </li>
                        
                          {pageCount.map((data) => (
                            <li > 
                              <button
                                class={"page-link"}
                                onClick={() => getPageData(data)}
                              >
                                {data}
                              </button>
                            </li>
                          ))}

                          <li>
                            <button
                              class="page-link"
                              onClick={nextPage}
                              aria-label="Next"
                            >
                              <span aria-hidden="true">&raquo;</span>
                              <span class="sr-only">Next</span>
                            </button>
                          </li>
                        </ul>
                        {/* </nav> */}
                      </td>
                    </tr>
                  </table>
                  {/* <Pagination className="pagination-borderless" aria-label="Page navigation example">
                    <PaginationItem disabled={firstTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={e => setFirstTablePage(e, firstTableCurrentPage - 1)}
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(firstTablePagesCount)].map((page, i) =>
                      <PaginationItem active={i === firstTableCurrentPage} key={i}>
                        <PaginationLink onClick={e => setFirstTablePage(e, i)} href="#top">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem disabled={firstTableCurrentPage >= firstTablePagesCount - 1}>
                      <PaginationLink
                        onClick={e => setFirstTablePage(e, firstTableCurrentPage + 1)}
                        next
                        href="#top"
                      />
                    </PaginationItem>
                  </Pagination> */}
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

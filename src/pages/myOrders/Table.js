import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
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

const Tables = function ({handleCurrentItem, setOpenCreate, setOpenView}) {

  const [orders, setOrders] = useState([])

async function getData() {

  axios.get(`${getSource()}/orders/get-orders-data-with-user-data`)
  .then((resp) => {
      console.log(resp.data)
      setOrders(resp.data);

  })  
  .catch((err) => {
      console.log(err);
  })
 
};

useEffect(() => {
  getData();
}, []);



const handleView = (i) => {

}

  const handleEdit = (i) => {
    handleCurrentItem(orders[i], 'edit')
  }; 
  
  const handleDelete = (i) => {
    handleCurrentItem(orders[i], 'edit')
 };    

  return (
    <div className="pt-3">
      <Row >
        <Col>
          <Row className="mb-4">
            <Col>
                <div className="widget-table-overflow">
                  <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                    <thead className='border'>
                    <tr>
                      <th className={`${s.checkboxCol}`}></th>
                      <th className="w-5">P_ID</th>
                      
                    </tr>
                    </thead>
                    <tbody>
                    {orders && orders.length > 0 && orders
                      .map((order, i) => (
                       
                        <tr key={uuidv4()}>
                          <td>
                            <div className="checkbox checkbox-primary">{i + 1}</div>
                          </td>
                          <td>{order.order_id}</td>
                          <td>{order.user_id}</td>
                          <td className="text-right">{order.price}</td>
                          <td className="text-right">{order.username}</td>
                          <td>
                            <IconButton aria-label="delete" size="large" onClick={() => handleView(i)}>
                                <VisibilityIcon fontSize="inherit" />
                            </IconButton>
                            {/* <IconButton aria-label="delete" size="large" onClick={() => handleEdit(i)}>
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="delete" size="large" onClick={() => handleDelete(i)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton> */}
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

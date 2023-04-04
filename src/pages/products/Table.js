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
import { Skeleton } from "@mui/material";

const Tables = function ({ setOpenCreate, setOpenView, handleCurrentItem }) {

const [products, setProducts] = useState([]); 
const [selectedProduct, setSelectedProduct] = useState([])

  const handleView = (i) => {
    handleCurrentItem(products[i], 'view')
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

  const handleEdit = (i) => {
    handleCurrentItem(products[i], 'edit')
  }; 
  
  const handleDelete = (i) => {
    handleCurrentItem(products[i], 'delete')
 };    


  return (
    <div>
      { products &&
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              {/* <Widget> */}
                <div className={s.tableTitle}>
                 
                 
                </div>
                <div className="widget-table-overflow">
                  <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                    <thead className='border'>
                    <tr>
                      <th className={`${s.checkboxCol}`}></th>
                      <th className="w-5">P_ID</th>
                      <th className="w-10">Title</th>
                      <th className="w-5"> </th>
                      <th className="w-5">Category</th>
                      <td className="w-10">Price</td>
                      <th className="w-5"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products && products.length > 0 && products
                      .map((product, i) => (
                       
                        <tr key={uuidv4()}>
                          <td>
                            <div className="checkbox checkbox-primary">{i + 1}</div>
                          </td>
                          <td>{product.product_id}</td>
                          <td>{product.title && product.title.length > 10 ? `${product.title.substring(0,10)}...` : product.title }</td>
                          <td>
                          <img src={product.thumbnail} width='50px' height='50px' style={{objectFit:'cover'}} />
                          </td>
                          <td>{product.category}</td>
                          <td className="text-right">{product.price}.00</td>
                       
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
                </div>
              {/* </Widget> */}
            </Col>
          </Row>
          <br />
        </Col>
      </Row>
      
      ||

       <Skeleton height={250} />
      }
    </div>
  )
}

export default Tables;

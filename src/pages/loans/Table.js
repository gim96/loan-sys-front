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

const [loans, setLoans] = useState([]); 
const [selectedLoan, setSelectedLoan] = useState([])

  const handleView = (i) => {
    handleCurrentItem(loans[i], 'view')
  }

  useEffect(() => {
    axios.get(`${getSource()}/loans`)
    .then((resp) => {
      console.log(resp.data)
      setLoans(resp.data)
    })
    .catch((err) => {
      alert('something went wrong when retreving data')
    })
  }, [])

  const handleEdit = (i) => {
    handleCurrentItem(loans[i], 'edit')
  }; 
  
  const handleDelete = (i) => {
    handleCurrentItem(loans[i], 'delete')
 };    


  return (
    <div>
      { loans &&
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
                      <th className="w-5">Loan ID</th>
                      <th className="w-10">Loan Amount</th>
                      <th className="w-5">Customer ID</th>
                      <th className="w-5">Used Amount</th>
                      <td className="w-10">Balance</td>
                      <th className="w-5">Installments</th>
                      <th className="w-5"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {loans && loans.length > 0 && loans
                      .map((loan, i) => (
                       
                        <tr key={uuidv4()}>
                          <td>
                            <div className="checkbox checkbox-primary">{i + 1}</div>
                          </td>
                          <td>{loan.loan_id}</td>
                          <td className="text-right">{loan.loan_amount}.00</td>
                          <td>{loan.user_id} </td>
                          <td className="text-right">{loan.used_amount}.00</td>
                         
                          <td className="text-right">{loan.loan_amount * 1 - loan.used_amount * 1}.00</td>
                          <td className="text-right">{loan.loan_installment_type}</td>
                          <td>
                            <IconButton aria-label="delete" size="large" onClick={() => handleView(i)}>
                                <VisibilityIcon fontSize="inherit" />
                            </IconButton>
                            {/* <IconButton aria-label="delete" size="large" onClick={() => handleEdit(i)}>
                                <EditIcon fontSize="inherit" />
                            </IconButton> */}
                            {/* <IconButton aria-label="delete" size="large" onClick={() => handleDelete(i)}>
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
      
      ||

       <Skeleton height={250} />
      }
    </div>
  )
}

export default Tables;

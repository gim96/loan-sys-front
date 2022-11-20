import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
// import DatePicker from "react-datepicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { getSource } from "../../pages/db/server";
import { Modal, Button } from "react-bootstrap";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

import axios from "axios";

// import { buttonUnstyledClasses } from "@mui/core";

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

const Suppliers = function () {
  const classes = useStyles();
  const [customerCode, setCustomerCode] = useState("");
  const [date, setDate] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const [show, setShow] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(0);

  const [cusCode, setCusCode] = useState("");
  const [description, setDescription] = useState("");
  const [packSize, setPackSize] = useState("");
  const [company, setCompany] = useState("");
  const [brand, setBrand] = useState("");
  const [companyPrice, setCompanyPrice] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [exDate, setExDate] = useState("");
  // dfdf
  const [cCode, setCCode] = useState("");
  const [cDescription, setCDescription] = useState("");
  const [cCompany, setCCompany] = useState("");

  const [itemCodes, setItemCodes] = useState([]);
  const [itemDescriptions, setItemDescriptions] = useState([]);
  const [itemCompany, setItemCompany] = useState([]);
  const [itemsCount, setItemsCount] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [expireDate, setExpireDate] = useState("");
  const [actualQuantity, setActualQuantity] = useState("");

  const [goodQuantity, setGoodQuantity] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // getData();
    setDate(moment(new Date()).format("YYYY-MM-DD"));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setCusCode("");
    setDescription("");
    setPackSize("");
    setCompany("");
    setQuantity("");
    setBrand("");
    setCompanyPrice("");
    setUnitPrice("");
    setExpireDate("");
  };
  //
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleCloseChange = () => setShowChange(false);

  const handleShowUpdate = (index) => {
    setCurrentId(items[index].id);
    setCurrentItem(items[index]);
    setCusCode(items[index].code);
    setDescription(items[index].description);
    setPackSize(items[index].pack_size);
    setCompany(items[index].company);
    setQuantity(items[index].quantity);
    setBrand(items[index].brand);
    setCompanyPrice(items[index].company_price);
    setUnitPrice(items[index].unit_price);
    setExpireDate(items[index].expire_date);
    setCurrentIndex(index);
    setShowUpdate(true);
  };

  const handleShowChange = (index) => {
    setCurrentId(items[index].id);
    setCurrentItem(items[index]);
    setCusCode(items[index].code);
    setDescription(items[index].description);
    setPackSize(items[index].pack_size);
    setCompany(items[index].company);
    setQuantity(items[index].quantity);
    setBrand(items[index].brand);
    setCompanyPrice(items[index].company_price);
    setUnitPrice(items[index].unit_price);
    setExpireDate(items[index].expire_date);
    setCurrentIndex(index);
    setShowChange(true);
    axios
      .post(
        getSource() + "/api/goods/findActiveGoodsTotalQuantityByCode",
        {
          code: items[index].code,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          setGoodQuantity(response.data[0].quantity);
          setActualQuantity(items[index].quantity);
          setQuantity(
            items[index].quantity * 1 - response.data[0].quantity * 1
          );
        }
      });
  };

  const handleCloseDelete = () => setShowDelete(false);
  //delete item show
  const handleShowDelete = (id) => {
    setCurrentId(id);
    setShowDelete(true);
  };

  const _handleTextFieldItemCode = (e) => {
    setCCode(e.target.value);
  };
  const _handleTextFieldDescription = (e) => {
    setCDescription(e.target.value);
  };
  const _handleTextFieldCompany = (e) => {
    setCCompany(e.target.value);
  };

  const _handleTextFieldCusCode = (e) => {
    setCusCode(e.target.value);
    // setLoading(true);
    if (e.target.value !== "") {
      axios
        .post(
          getSource() + "/api/items/getItemByCode",
          {
            code: e.target.value,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then((response) => {
          // setItemCodes(response.data[0].code);
          // console.log(response.data[0].pack_size);
          if (response.data.length > 0) {
            setPackSize(response.data[0].pack_size);
            setCompany(response.data[0].company);
            setBrand(response.data[0].brand);
          }

          // setLoading(false);
        });
    }
  };

  const deleteItem = () => {
    axios
      .put(
        getSource() + `/api/stocks/putActiveStocksDiactivate/${currentId}`,
        {
          state: 0,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      )
      .then((response) => {
        // getData();
        handleCloseDelete();
      });
    // this.setState({ showUpdate: true, loading: false });
  };

  const updateItem = () => {
    if (
      cusCode !== "" &&
      quantity !== "" &&
      companyPrice !== "" &&
      unitPrice !== "" &&
      expireDate !== ""
    ) {
      axios
        .put(
          `${getSource()}/api/stocks/${currentId}`,
          {
            code: cusCode,
            pack_size: packSize,
            company: company,
            brand: brand,
            quantity: quantity * 1 + items[currentIndex].quantity * 1,
            company_price: companyPrice,
            unit_price: unitPrice,
            expire_date: expireDate,
            state: 1,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then(() => {
        //   getData();
          handleCloseUpdate();
        });
    } else {
      alert("Required Fields.!");
    }
  };

  const changeStock = () => {
    if (
      cusCode !== "" &&
      quantity !== "" &&
      companyPrice !== "" &&
      unitPrice !== "" &&
      expireDate !== ""
    ) {
      axios
        .put(
          `${getSource()}/api/stocks/${currentId}`,
          {
            code: cusCode,
            pack_size: packSize,
            company: company,
            brand: brand,
            quantity: quantity * 1 + actualQuantity * 1,
            company_price: companyPrice,
            unit_price: unitPrice,
            expire_date: expireDate,
            state: 1,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then(() => {
        //   getData();
          handleCloseUpdate();
        });
    } else {
      alert("Required Field.!");
    }
  };

  // deleteItem = (index) => {
  //   this.state.items.splice(index, 1);
  //   this.setState({ items: this.state.items });
  // };

  const saveItem = () => {
    if (
      cusCode !== "" &&
      quantity !== "" &&
      companyPrice !== "" &&
      unitPrice !== "" &&
      expireDate !== ""
    ) {
      axios
        .post(
          getSource() + "/api/stocks/getStocksByCode",
          {
            code: cusCode,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then((res) => {
          if (res.data.length > 0) {
            axios
              .post(
                getSource() + "/api/stocks/",
                {
                  code: cusCode,
                  pack_size: packSize,
                  company: company,
                  brand: brand,
                  quantity: quantity,
                  company_price: companyPrice,
                  unit_price: unitPrice,
                  expire_date: expireDate,
                  state: 1,
                },
                {
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("user_token"),
                  },
                }
              )
              .then((response) => {
                // console.log(response.data);
              })
              .catch((err) => {
                alert("something went wrong.!");
              })
              .finally(() => {
                alert("Stock added.!");
                // getData();
                handleClose();
              });
          } else {
            alert("Unknown item.!");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong.!");
        });
    } else {
      alert("required fields.");
    }
  };

  const searchItem = () => {
    // console.log("gey");
    if (cCode === "" && cDescription === "" && cCompany === "") {
      axios
        .get(getSource() + "/api/stocks/getActiveStocks?page=1&limit=150", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        })
        .then((response) => {
          setItems(response.data);
        });
    }
    if (cCode !== "" && cDescription === "" && cCompany === "") {
      axios
        .post(
          getSource() + "/api/stocks/getStocksByCode",
          {
            code: cCode,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then((response) => {
          setItems(response.data);
        });
    }
    if (cCode === "" && cDescription !== "" && cCompany === "") {
      axios
        .post(
          getSource() + "/api/stocks/getItemsByDescription",
          {
            description: cDescription,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then((response) => {
          setItems(response.data);
        });
    }
    if (cCode === "" && cDescription === "" && cCompany !== "") {
      axios
        .post(
          getSource() + "/api/stocks/getItemsByCompany",
          {
            company: cCompany,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then((response) => {
          setItems(response.data);
        });
    }
    if (cCode !== "" && cDescription !== "" && cCompany === "") {
      axios
        .post(
          getSource() + "/api/items/getItemsByCodeAndDescription",
          {
            company: cCompany,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then((response) => {
          setItems(response.data);
        });
    }
    if (cCode !== "" && cDescription === "" && cCompany !== "") {
      axios
        .post(
          getSource() + "/api/items/getItemsByCodeAndCompany",
          {
            company: cCompany,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then((response) => {
          setItems(response.data);
        });
    }
    if (cCode === "" && cDescription !== "" && cCompany !== "") {
      axios
        .post(
          getSource() + "/api/items/getItemsByDescriptionAndCompany",
          {
            company: cCompany,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then((response) => {
          setItems(response.data);
        });
    }
    if (cCode !== "" && cDescription !== "" && cCompany !== "") {
      axios
        .post(
          getSource() + "/api/items/getItemsByCodeAndDescriptionAndCompany",
          {
            company: cCompany,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("user_token"),
            },
          }
        )
        .then((response) => {
          setItems(response.data);
        });
    }
  };

  var pages = itemsCount / 150;

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
        getSource() + `/api/stocks/getActiveStocks?page=${number}&limit=150`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      )
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      });
  };

  if (loading === true) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  } else {
    return (
      <div>
        <Row>
          <Col className="mb-4" xs={12}>
            <Widget className="widget-p-lg">
              <Row>
                <Col xs={12} sm={12} xl={12}>
                  <hr />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} xl={3}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={itemCodes.map((option) => option.code)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="item code"
                        margin="normal"
                        variant="outlined"
                        placeholder="Search by Job title"
                        onSelect={_handleTextFieldItemCode}
                        on
                      />
                    )}
                  />
                  <br />
                </Col>
                <Col xs={12} sm={12} xl={3}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={itemDescriptions.map(
                      (option) => option.description
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="description"
                        margin="normal"
                        variant="outlined"
                        placeholder="Search by Job title"
                        onSelect={_handleTextFieldDescription}
                      />
                    )}
                  />
                  <br />
                </Col>
                <Col xs={12} sm={12} xl={3}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={itemCompany.map((option) => option.company)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Company"
                        margin="normal"
                        variant="outlined"
                        placeholder="Search by Job title"
                        onSelect={_handleTextFieldCompany}
                      />
                    )}
                  />
                  <br />
                </Col>
                <Col xs={12} sm={6} xl={1}>
                  <br />
                  <button className="btn btn-light" onClick={searchItem}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </Col>
                <Col xs={12} sm={6} xl={2}>
                  <br />
                  <table width="100%" align="right">
                    <tbody>
                      <tr>
                        <td align="right">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleShow("save")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-plus-circle-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <br />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} xl={12}>
                  {/* <span class="badge badge-primary">&nbsp;</span> less than 25
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="badge badge-success">&nbsp;</span> less than 10
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="badge badge-danger">&nbsp;</span> less than 5 */}
                  <hr />
                  <table width="100%" className="table">
                    <thead>
                      <tr style={{ backgroundColor: "#f5f5f5" }}>
                        <th>#</th>
                        <th>Code</th>

                        <th>P Size</th>
                        <th>Company</th>
                        <th>Brand</th>
                        {/* <th>Qty</th> */}
                        <th>Com price</th>
                        <th>Expire date</th>
                        <th>({itemsCount}) </th>
                        {/* <th>&nbsp;</th> */}
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((data, index) => {
                        if (currentPage < 2) {
                          return (
                            <tr>
                              <td align="center" width="5%">
                                {index + 1}
                              </td>
                              <td>{data.code}</td>

                              <td aling="center">{data.pack_size}</td>
                              <td aling="center">{data.company}</td>
                              <td aling="center">{data.brand}</td>
                              {/* <td aling="center">{data.quantity}</td> */}
                              <td aling="center">
                                Rs.
                                {Math.round(data.company_price).toFixed(2)}
                              </td>
                              <td aling="center">{data.expire_date}</td>
                              <td width="4%">
                                <button
                                  className="btn btn-light"
                                  style={{
                                    paddingLeft: "20%",
                                    paddingRight: "20%",
                                  }}
                                  onClick={() => handleShowChange(index)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    class="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                  </svg>
                                </button>
                              </td>
                              {/* <td width="4%">
                                <button
                                  className="btn btn-light"
                                  style={{
                                    paddingLeft: "20%",
                                    paddingRight: "20%",
                                  }}
                                  onClick={() => handleShowUpdate(index)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    class="bi bi-file-earmark-arrow-up-fill"
                                    viewBox="0 0 16 16"
                                    // onClick={() => handleShowUpdate(index)}
                                  >
                                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z" />
                                  </svg>
                                </button>
                              </td> */}
                              <td align="center" width="4%">
                                <button
                                  className="btn btn-light"
                                  style={{
                                    paddingLeft: "20%",
                                    paddingRight: "20%",
                                  }}
                                  onClick={() => handleShowDelete(data.id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    class="bi bi-x-circle-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr>
                              <td align="center" width="5%">
                                {index + 1 + 150 * currentPage - 150}
                              </td>
                              <td>{data.code}</td>

                              <td aling="center">{data.pack_size}</td>
                              <td aling="center">{data.company}</td>
                              <td aling="center">{data.brand}</td>
                              {/* <td width="5%">
                                <button
                                  className="btn btn-light"
                                  style={{
                                    paddingLeft: "20%",
                                    paddingRight: "20%",
                                  }}
                                  onClick={() => handleShowUpdate(index)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    class="bi bi-file-earmark-arrow-up-fill"
                                    viewBox="0 0 16 16"
                                    // onClick={() => handleShowUpdate(index)}
                                  >
                                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z" />
                                  </svg>
                                </button>
                              </td> */}
                              <td align="center" width="5%">
                                <button
                                  className="btn btn-light"
                                  style={{
                                    paddingLeft: "20%",
                                    paddingRight: "20%",
                                  }}
                                  onClick={() => handleShowDelete(data.id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="currentColor"
                                    class="bi bi-x-circle-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                  <br />
                  <hr />
                  <br />
                  <table width="100%">
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
                            <li>
                              <button
                                class="page-link"
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
                  <br />
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <table width="95%" align="center">
                        <tr>
                          <td>
                            <div
                              class="card"
                              style={{
                                width: "100%",
                                //   backgroundColor: "blue",
                                color: "#555",
                              }}
                            >
                              <div class="card-body">
                                <table width="100%">
                                  <tr>
                                    <td width="60%">
                                      {/* <lable className="form-label">Code</lable> */}
                                      <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        options={itemCodes.map(
                                          (option) => option.code
                                        )}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="code"
                                            margin="normal"
                                            variant="outlined"
                                            placeholder="Search by Job title"
                                            onSelect={_handleTextFieldCusCode}
                                          />
                                        )}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <TextField
                                        id="outlined-required"
                                        label="Pack size"
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                          setPackSize(e.target.value)
                                        }
                                        value={packSize}
                                      />
                                      {/* <input type="text" /> */}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <TextField
                                        id="outlined-required"
                                        label="Company"
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                          setCompany(e.target.value)
                                        }
                                        value={company}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <TextField
                                        id="outlined-required"
                                        label="Brand"
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                          setBrand(e.target.value)
                                        }
                                        value={brand}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <TextField
                                        id="outlined-required"
                                        label="Quantity"
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                          setQuantity(e.target.value)
                                        }
                                        value={quantity}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <TextField
                                        id="outlined-required"
                                        label="Company price"
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                          setCompanyPrice(e.target.value)
                                        }
                                        value={companyPrice}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <TextField
                                        id="outlined-required"
                                        label="Unit price"
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                          setUnitPrice(e.target.value)
                                        }
                                        value={unitPrice}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <label className="label-control">
                                        Expire date
                                      </label>
                                      <input
                                        type="date"
                                        onChange={(e) =>
                                          setExpireDate(e.target.value)
                                        }
                                        className="form-control"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td align="right">
                                      <button
                                        className="btn btn-primary"
                                        onClick={saveItem}
                                      >
                                        add
                                      </button>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>&nbsp;</td>
                        </tr>

                        <tr>
                          <td align="right"></td>
                        </tr>
                      </table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* change stock */}
                  <Modal show={showChange} onHide={handleCloseChange}>
                    <Modal.Header closeButton>
                      <Modal.Title>Change Stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <table width="95%" align="center">
                        <tr>
                          <td>
                            <div
                              class="card"
                              style={{
                                width: "100%",
                                //   backgroundColor: "blue",
                                color: "#555",
                              }}
                            >
                              <div class="card-body">
                                <table width="100%">
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">Code</lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setCusCode(e.target.value)
                                        }
                                        value={cusCode}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Pack size
                                      </lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setPackSize(e.target.value)
                                        }
                                        value={packSize}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Company
                                      </lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setCompany(e.target.value)
                                        }
                                        value={company}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Brand
                                      </lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setBrand(e.target.value)
                                        }
                                        value={brand}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Current quantity
                                      </lable>
                                      <input
                                        type="number"
                                        className="form-control"
                                        onChange={(e) =>
                                          setQuantity(e.target.value)
                                        }
                                        value={quantity}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Company price
                                      </lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setCompanyPrice(e.target.value)
                                        }
                                        value={companyPrice}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Unit price
                                      </lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setUnitPrice(e.target.value)
                                        }
                                        value={unitPrice}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        expire date
                                      </lable>
                                      <input
                                        type="date"
                                        className="form-control"
                                        onChange={(e) =>
                                          setExpireDate(e.target.value)
                                        }
                                        value={expireDate}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td align="right">
                                      <button
                                        className="btn btn-primary"
                                        onClick={changeStock}
                                      >
                                        change
                                      </button>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>&nbsp;</td>
                        </tr>

                        <tr>
                          <td align="right"></td>
                        </tr>
                      </table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseUpdate}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* update item */}
                  <Modal show={showUpdate} onHide={handleCloseUpdate}>
                    <Modal.Header closeButton>
                      <Modal.Title>Update Stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <table width="95%" align="center">
                        <tr>
                          <td>
                            <div
                              class="card"
                              style={{
                                width: "100%",
                                //   backgroundColor: "blue",
                                color: "#555",
                              }}
                            >
                              <div class="card-body">
                                <table width="100%">
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">Code</lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setCusCode(e.target.value)
                                        }
                                        value={cusCode}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Pack size
                                      </lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setPackSize(e.target.value)
                                        }
                                        // value={packSize}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Company
                                      </lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setCompany(e.target.value)
                                        }
                                        // value={company}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Brand
                                      </lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setBrand(e.target.value)
                                        }
                                        // value={brand}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Quantity
                                      </lable>
                                      <input
                                        type="number"
                                        className="form-control"
                                        onChange={(e) =>
                                          setQuantity(e.target.value)
                                        }
                                        value={quantity}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Company price
                                      </lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setCompanyPrice(e.target.value)
                                        }
                                        value={companyPrice}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        Unit price
                                      </lable>
                                      <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                          setUnitPrice(e.target.value)
                                        }
                                        value={unitPrice}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td width="60%">
                                      <lable className="form-label">
                                        expire date
                                      </lable>
                                      <input
                                        type="date"
                                        className="form-control"
                                        onChange={(e) =>
                                          setExpireDate(e.target.value)
                                        }
                                        value={expireDate}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td align="right">
                                      <button
                                        className="btn btn-primary"
                                        onClick={updateItem}
                                      >
                                        update
                                      </button>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>&nbsp;</td>
                        </tr>

                        <tr>
                          <td align="right"></td>
                        </tr>
                      </table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseUpdate}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* delete model */}
                  <Modal show={showDelete} onHide={handleCloseDelete}>
                    <Modal.Header closeButton>
                      <Modal.Title> Attention.!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <table width="95%" align="center">
                        <tr>
                          <td align="left">
                            Do you want to delete this stock?
                          </td>
                        </tr>
                      </table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={deleteItem}>
                        yes
                      </Button>
                      <Button variant="secondary" onClick={handleCloseDelete}>
                        No
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
};

export default Suppliers;

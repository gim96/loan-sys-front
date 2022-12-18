import { useEffect, useState } from "react";
import { Col, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button,Spinner } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import firebase from "firebase";

export default function EditModal({openEdit, setOpenEdit, currentItem, handleUpdate, suppliers}) {

    const [company, setCompany] = useState("");
    const [billPhoto, setBillPhoto] = useState(null);
    const [amount, setAmount] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        if (currentItem) {
            setCompany(currentItem.company)
            setBillPhoto(currentItem.billPhoto);
            setAmount(currentItem.amount);
        }
    }, [currentItem])

    useEffect(() => {

    }, [suppliers])

    const handleSave = () => {
      const item = {
        company:company,
        billPhoto:billPhoto,
        amount:amount,
      };
      handleUpdate(item);
    };


    const getUrl = async (backUrl) => {
  
      const ref_logo = await firebase.storage().ref(backUrl);
      await ref_logo
      .getDownloadURL()
      .then((url) => {
        setBillPhoto(url);
        setImageLoading(false);
      })
      .catch((errr) => {
          console.log(errr);
      });
    };

    const  handlePhoto = async (e) => {
      setImageLoading(true);
        const imgName = new Date();
        if (e.target.files[0]) {
          const uploadTask = firebase
            .storage()
            .ref(`bills/${imgName}`)
            .put(e.target.files[0]);
          uploadTask.on(
            "state_change",
            (snapshot) => {
              console.log(snapshot.ref.fullPath);
              getUrl(snapshot.ref.fullPath);
      
    
            },
            (error) => {
              console.log(error);
            }
          );
         
        } else {
          alert("Invalid dimentions.!");
        }


    };


    return(
        <Modal size='md' isOpen={openEdit}>
         {
           imageLoading ? (
           <div style={{padding:150, paddingLeft:'230px'}}>
             <Spinner />
           </div>
           ) : (
            <div> 
            <ModalHeader toggle={() => setOpenEdit(false)}><EditIcon />&nbsp; Add Expense details</ModalHeader>
            <ModalBody className="p-5" > 
            <Row>
                <Col>
                Supplier
                 <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={suppliers && suppliers.map((option) => option)}
                    value={company}
                    renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Supplier"
                          margin="normal"
                          variant="outlined"
                          placeholder="Search by Phone no"
                          onSelect={(e) => setCompany(e.target.value)}
                          value={company}
                          on
                         />
                       )}
                    />
                  <br />
                    Bill Photo
                    <Input type="file" className="form-control" style={{cursor:'pointer'}} onChange={handlePhoto} />
                    <br />
                    <img src={billPhoto} width='150px' height='80px'/>
                    <br />
                    <br />
                    Amount
                    <Input type="text" onChange={(e) => setAmount(e.target.value)} value={amount} />
                    <br />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col lg={12} align='right'>
                  <Button color="primary" onClick={handleSave}>
                    Save
                  </Button>{' '}
                
                  <Button color="secondary" onClick={() => setOpenEdit(false)}>
                    Cancel
                  </Button>
                </Col>
            </Row>
          </ModalBody>
        </div>)
        }
      </Modal>
    );
};
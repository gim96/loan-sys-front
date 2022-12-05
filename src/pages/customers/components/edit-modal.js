import { useEffect, useState } from "react";
import { Card, Col, Input, Row, Modal, ModalHeader, ModalBody, Spinner, Button } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { getSource } from "../../db/server";
import { token_header } from "../../../utils/tokenHeader";
import firebase from "firebase";

export default function EditModal({openEdit, setOpenEdit, currentItem, handleUpdate}) {

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [idPhoto, setIdPhoto] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        if (currentItem) {
            setPhone(currentItem.phone);
            setName(currentItem.name);
            setAddress(currentItem.address);
            setIdPhoto(currentItem.idPhoto)
        }
    }, [currentItem])

    // const handleSave = () => {
    //   const item = {
    //     phone:phone,
    //     name:name,
    //     address:address
    //   };
    //   handleUpdate(item);
    // };

    const handleSave = () => {
     
      const item = {
        phone:phone,
        name:name,
        address:address,
        idPhoto:idPhoto,
      };
      handleUpdate(item);
    };

    const getUrl = async (backUrl) => {
  
      const ref_logo = await firebase.storage().ref(backUrl);
      await ref_logo
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setIdPhoto(url);
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
            .ref(`NIC/${imgName}`)
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
            <ModalHeader toggle={() => setOpenEdit(false)}><EditIcon />&nbsp; Add Customer details</ModalHeader>
            <ModalBody className="p-5" > 
            <Row>
                <Col >
                  Phone
                  <Input type="text" onChange={(e) => setPhone(e.target.value)} value={phone} />
                  <br />
                  Name
                  <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                  <br />
                  Address
                  <Input type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
                  <br />
                  NIC Photo
                  <Input type="file" onChange={handlePhoto} />
                  <br />
                  <img src={idPhoto} width='150px' height='80px' />
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
          </div>
           )
        } 
      </Modal>
    );
};
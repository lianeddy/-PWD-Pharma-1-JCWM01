import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../constants/API";

const CheckoutModal = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="info" onClick={toggle}>
        Lihat Detail
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Daftar Belanja</ModalHeader>
        <ModalBody>test</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CheckoutModal;

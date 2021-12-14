import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../constants/API";

class CheckoutModal extends React.Component {
  state = {
    isOpen: false,
    prescriptionData: [],
    drugsData: [],
    payment_proof: "",
  };

  fetchPrescription = () => {
    Axios.get(`${API_URL}/cart/prescription-checkout`, {
      params: {
        idcheckout: this.props.idcheckout,
      },
    })
      .then((result) => {
        if (result.data.length) {
          return this.setState({ prescriptionData: result.data });
        } else {
        }
      })
      .catch((err) => {
        alert("Gagal mengambil data resep");
        console.log(err);
      });
  };

  fetchDrugs = () => {
    Axios.get(`${API_URL}/cart/drug-checkout`, {
      params: {
        idcheckout: this.props.idcheckout,
      },
    })
      .then((result) => {
        if (result.data.length) {
          return this.setState({
            drugsData: result.data,
            payment_proof: result.data[0].payment_proof,
          });
        } else {
        }
      })
      .catch((err) => {
        alert("Gagal mengambil data resep");
        console.log(err);
      });
  };

  userPrescription = () => {
    return this.state.prescriptionData.map((val) => {
      if (val.nama_bahan_obat !== null) {
        let total = val.kandungan * val.harga_per_mg;
        return (
          <div className="d-flex justify-content-between my-3">
            <div className="d-flex flex-row">
              <strong>
                {val.nama_bahan_obat} ({val.kandungan} mg)
              </strong>
            </div>

            <strong>Rp {total.toLocaleString("id")}</strong>
          </div>
        );
      }
    });
  };

  prescriptionTotal = () => {
    let total = 0;
    this.state.prescriptionData.forEach((val) => {
      total += val.kandungan * val.harga_per_mg;
    });
    return total.toLocaleString("id");
  };

  renderCart = () => {
    return this.state.drugsData.map((val) => {
      if (val.nama_obat !== null) {
        let total = val.harga * val.qty_obat;
        return (
          <div className="d-flex justify-content-between my-3">
            <div className="d-flex flex-row">
              <strong>
                {val.nama_obat} ({val.qty_obat} {val.satuan_jual})
              </strong>
            </div>

            <strong>Rp {total.toLocaleString("id")}</strong>
          </div>
        );
      }
    });
  };

  renderTotal = () => {
    let total = 0;
    this.state.drugsData.forEach((val) => {
      total += val.harga * val.qty_obat;
    });
    return total.toLocaleString("id");
  };

  grandTotal = () => {
    let total = 0;
    let total1 = 0;
    let total2 = 0;
    this.state.drugsData.forEach((val) => {
      total1 += val.harga * val.qty_obat;
    });

    this.state.prescriptionData.forEach((val) => {
      total2 += val.kandungan * val.harga_per_mg;
    });

    return (total = total1 + total2);
  };

  renderModal = () => {
    return (
      <>
        <div className="card-body">
          <h6 className="font-weight-semi-bold m-0 text-uppercase">
            Belanja Obat
          </h6>
          <hr className="mt-0" />
          {this.renderCart()}
          <hr className="mt-0" />
          <div className="d-flex justify-content-between mb-3 pt-1">
            <strong className="font-weight-medium">Subtotal</strong>
            <strong className="font-weight-medium">
              Rp {this.renderTotal()}
            </strong>
          </div>

          <h6 className="font-weight-semi-bold m-0 text-uppercase">
            Belanja Obat Resep
          </h6>
          <hr className="mt-0" />
          {this.userPrescription()}
          <hr className="mt-0" />
          <div className="d-flex justify-content-between mb-3 pt-1">
            <strong className="font-weight-medium">Subtotal</strong>
            <strong className="font-weight-medium">
              Rp {this.prescriptionTotal()}
            </strong>
          </div>

          <hr className="mt-0" />
          <div className="d-flex justify-content-between mb-3 pt-1">
            <strong className="font-weight-medium">Total Belanja</strong>
            <strong className="font-weight-medium">
              Rp {this.grandTotal().toLocaleString("id")}
            </strong>
          </div>
        </div>
        <h6 className="font-weight-semi-bold m-0 text-uppercase text-center">
          Bukti Pembayaran
        </h6>
        <hr className="mt-0" />
        <div className="text-center">
          <img
            className="img-fluid"
            src={`${API_URL}/${this.state.payment_proof}`}
            alt="Image"
            style={{ width: "500px" }}
          />
        </div>
      </>
    );
  };

  componentDidMount() {
    this.fetchDrugs();
    this.fetchPrescription();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      return this.fetchDrugs(), this.fetchPrescription();
    }
  }

  render() {
    return (
      <div>
        <Button color="info" onClick={() => this.setState({ isOpen: true })}>
          Lihat Detail
        </Button>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader>
            <h4>Detail Belanja</h4>
            <div className="d-flex flex-row">
              <strong>ID CHECKOUT: {this.props.idcheckout}</strong>
            </div>
          </ModalHeader>
          <ModalBody>{this.renderModal()}</ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={() => this.setState({ isOpen: false })}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CheckoutModal;

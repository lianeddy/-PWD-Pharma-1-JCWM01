import React from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Redirect } from "react-router-dom";
import moment from "moment";

class RequestDetail extends React.Component {
  state = {
    requestData: {},
    substanceServed: [{ substance: "", content: 0 }],
    executed: false,
    served: false,
    rejected: false,
    reason: "",
  };

  inputHandler = (index, event) => {
    const values = [...this.state.substanceServed];
    values[index][event.target.name] = event.target.value;
    this.setState({ substance: values, content: values });

    console.log(this.state.substanceServed);
  };

  fetchRequest = () => {
    Axios.get(`${API_URL}/prescription/get-prescriptions`, {
      params: {
        id_prescriptions: this.props.match.params.id,
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({ requestData: result.data[0] });
        } else {
          alert(`Prescription Request Not Found`);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`Gagal mengambil data resep`);
      });
  };

  addSubstance = () => {
    const addSubstance = { substance: "", content: 0 };
    this.setState({
      substanceServed: [...this.state.substanceServed, addSubstance],
    });
  };

  removeSubstance = (idx) => {
    const values = [...this.state.substanceServed];
    values.splice(idx, 1);
    this.setState({ substanceServed: values });
  };

  serveHandler = () => {
    Axios.delete(
      `${API_URL}/prescription/delete-prescription/${this.state.requestData.id_prescriptions}`
    )
      .then(() => {
        this.state.substanceServed.map((val) => {
          const id_bahan_obat = parseInt(val.substance);
          const kandungan = parseInt(val.content);

          return Axios.post(`${API_URL}/prescription/post-prescriptions`, {
            id_user: this.state.requestData.id_user,
            id_bahan_obat,
            kandungan,
            tanggal: moment().format("YYYY-MM-DD"),
          })
            .then(() => {
              this.setState({ executed: true });
            })
            .catch((err) => {
              console.log(err);
            });
        });
        alert("Persetujuan resep telah dikirim");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  rejectHandler = () => {
    Axios.post(`${API_URL}/prescription/reject-prescription`, {
      id_user: this.state.requestData.id_user,
      tanggal: moment().format("YYYY-MM-DD"),
      reason: this.state.reason,
    })

      .then(() => {
        Axios.delete(
          `${API_URL}/prescription/delete-prescription/${this.state.requestData.id_prescriptions}`
        )
          .then(() => {
            alert("Berhasil menolak permintaan resep");
            this.setState({ executed: true });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  servedButton = () => {
    this.setState({ served: true });
  };

  rejectedButton = () => {
    this.setState({ rejected: true });
  };

  cancelServingButton = () => {
    this.setState({ served: false });
  };

  cancelRejectButton = () => {
    this.setState({ rejected: false });
  };

  reasonInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  servingPage = () => {
    if (this.state.served === true) {
      return this.state.substanceServed.map((val, idx) => {
        return (
          <>
            {idx === 0 ? (
              <div className="mb-2">
                <button
                  onClick={this.serveHandler}
                  className="btn btn-success mr-2"
                  style={{ marginRight: "5px" }}
                >
                  PROCEED
                </button>
                <button
                  onClick={this.cancelServingButton}
                  className="btn btn-danger"
                >
                  CANCEL
                </button>
              </div>
            ) : null}
            <div
              key={idx}
              className="d-flex flex-row form-inline form-group col-md-4 mb-2"
            >
              <select
                onChange={(event) => this.inputHandler(idx, event)}
                value={val.substance}
                name="substance"
                className="form-select"
                style={{ marginRight: "5px" }}
              >
                <option selected>Bahan {idx + 1}</option>
                <option value="195">Allopourinol</option>
                <option value="189">Amlodipin</option>
                <option value="177">Amoxicilin</option>
                <option value="178">Ampicillin</option>
                <option value="197">Atorvastatin</option>
                <option value="190">Candesartan</option>
                <option value="187">Captopril</option>
                <option value="179">Ciprofloxacin</option>
                <option value="193">Dexamethason</option>
                <option value="198">Gemfibrozil</option>
                <option value="191">Glibenklamid</option>
                <option value="180">Kloramfenicol</option>
                <option value="199">Lipitor</option>
                <option value="185">Meloksikam</option>
                <option value="192">Metformin</option>
                <option value="194">Metilprednison</option>
                <option value="183">Metronidazol</option>
                <option value="188">Nifedipin</option>
                <option value="186">Phenylbutazon</option>
                <option value="184">Piroksikam</option>
                <option value="182">Sefadroxil</option>
                <option value="196">Simvastatin</option>
                <option value="181">Tetracyclin</option>
              </select>
              <input
                value={val.content}
                name="content"
                onChange={(event) => this.inputHandler(idx, event)}
                placeholder="mg"
                type="number"
                className="form-control"
                style={{ marginRight: "5px", width: "80px" }}
              />
              {idx === 0 ? (
                <button
                  onClick={this.addSubstance}
                  className="btn btn-primary text-center"
                >
                  <i className="fa fa-plus-circle"></i>
                </button>
              ) : (
                <button
                  onClick={() => this.removeSubstance(idx)}
                  className="btn btn-danger text-center ml-2"
                >
                  <i className="fa fa-minus-circle"></i>
                </button>
              )}
            </div>
          </>
        );
      });
    } else if (this.state.rejected === true) {
      return (
        <>
          <div className="col-md-4 mt-3">
            <label className="labels">Alasan Penolakan</label>
            <select
              className="form-select"
              name="reason"
              onChange={this.reasonInput}
            >
              <option value="Foto Resep Tidak Jelas">
                Foto Resep Tidak Jelas
              </option>
              <option value="Stok Bahan Obat Habis">
                Stok Bahan Obat Habis
              </option>
              <option value="Bahan Obat Tidak Tersedia">
                Bahan Obat Tidak Tersedia
              </option>
              <option value="Alasan lain">Alasan lain</option>
            </select>
          </div>
          <div className="mt-5">
            <button
              onClick={this.rejectHandler}
              className="btn btn-primary mr-2"
              style={{ marginRight: "5px" }}
            >
              REJECT
            </button>
            <button
              onClick={this.cancelRejectButton}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </>
      );
    } else {
      return (
        <div>
          <button
            onClick={this.servedButton}
            className="btn btn-primary mr-2"
            style={{ marginRight: "5px" }}
          >
            SERVE
          </button>
          <button onClick={this.rejectedButton} className="btn btn-danger">
            REJECT
          </button>
        </div>
      );
    }
  };

  componentDidMount() {
    this.fetchRequest();
  }

  render() {
    if (this.state.executed === true) {
      return <Redirect to="/admin" />;
    }
    return (
      <div>
        <div className="container-fluid bg-light mb-1">
          <h1 className="font-weight-semi-bold text-uppercase text-center mb-1">
            Prescription Request
          </h1>
        </div>
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-4 pb-5">
              <img
                className="img-fluid"
                src={`${API_URL}/${this.state.requestData.foto_prescription}`}
                alt="Image"
              />
            </div>
            <div className="col-lg-8 pb-5">
              <p>
                <strong className="text-uppercase">Applicant:</strong>
                <span>
                  <strong>
                    {" "}
                    {this.state.requestData.nama_depan}{" "}
                    {this.state.requestData.nama_belakang}
                  </strong>
                </span>
              </p>
              <p>
                <strong className="text-uppercase">E-mail:</strong>
                <span>
                  <strong> {this.state.requestData.email}</strong>
                </span>
              </p>
              <p>
                <strong className="text-uppercase">Request Date:</strong>
                <span>
                  <strong>
                    {" "}
                    {moment(this.state.requestData.tanggal).format(
                      "DD MMMM YYYY"
                    )}
                  </strong>
                </span>
              </p>
              {this.servingPage()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestDetail;

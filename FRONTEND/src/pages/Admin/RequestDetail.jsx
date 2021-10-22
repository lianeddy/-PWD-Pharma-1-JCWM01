import React from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Redirect } from "react-router-dom";

class RequestDetail extends React.Component {
  state = {
    requestData: {},
    substanceServed: [{ substance: "", content: 0 }],
    executed: false,
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
    this.state.substanceServed.map((val) => {
      const id_bahan_obat = parseInt(val.substance);
      const kandungan = parseInt(val.content);

      return Axios.post(`${API_URL}/prescription/post-prescriptions`, {
        id_user: this.state.requestData.id_user,
        id_bahan_obat,
        kandungan,
      })
        .then(() => {
          Axios.delete(
            `${API_URL}/prescription/delete-prescription/${this.state.requestData.id_prescriptions}`
          )
            .then(() => {
              alert("Prescription Proceed");
              this.setState({ executed: true });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          alert("Gagal menambah resep ke cart");
        });
    });
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
                className="w-100 h-100"
                src={this.state.requestData.foto_prescription}
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
                  <strong> Perlu tanggal</strong>
                </span>
              </p>
              {this.state.substanceServed.map((val, idx) => {
                return (
                  <div
                    key={idx}
                    className="d-flex form-inline form-group col-md-4"
                  >
                    <select
                      onChange={(event) => this.inputHandler(idx, event)}
                      value={val.substance}
                      name="substance"
                      className="form-select mr-2"
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
                      className="form-control col-lg-1"
                    />
                    {idx === 0 ? (
                      <button
                        onClick={this.addSubstance}
                        className="btn btn-primary text-center ml-2"
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
                );
              })}
              <div className="mb-4">
                <button
                  onClick={this.serveHandler}
                  className="btn btn-primary mr-2"
                >
                  SERVE
                </button>
                <button className="btn btn-danger">REJECT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestDetail;
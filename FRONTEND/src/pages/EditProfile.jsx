import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../constants/API";

class EditProfile extends React.Component {
  state = {
    userData: {},
    userNotFound: false,
  };
  fetchUserData = () => {
    Axios.get(`${API_URL}/user/get`, {
      params: {
        username: this.props.userGlobal.username,
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({ userData: result.data[0] });
        } else {
          this.setState({ userNotFound: true });
        }
      })
      .catch(() => {
        alert(`Kesalahan saat mengambil data user`);
      });
  };

  componentDidMount() {
    this.fetchUserData();
  }

  render() {
    return (
      <div className="container rounded bg-light">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle"
                width="150px"
                src={this.state.userData.foto_profil}
              />
              <span>
                {" "}
                <button className="btn btn-sm btn-secondary mt-2" type="button">
                  <Link
                    to="/edit-profile"
                    style={{ textDecoration: "none" }}
                    className="text-light"
                  >
                    Ganti Foto
                  </Link>
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Edit Profil</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Nama Depan</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={this.state.userData.nama_depan}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Nama Belakang</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={this.state.userData.nama_belakang}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={this.state.userData.username}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">E-mail</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={this.state.userData.email}
                  />
                </div>

                <div className="col-md-6 mt-3">
                  <label className="labels">Jenis Kelamin</label>
                  <select
                    className="form-control"
                    placeholder={this.state.userData.jenis_kelamin}
                  >
                    <option value="">Pria</option>
                    <option value="">Wanita</option>
                  </select>
                </div>
                <div className="col-md-6 mt-3">
                  <label className="labels">Tanggal Lahir</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={this.state.userData.tanggal_lahir}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Alamat Pengiriman</label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder={this.state.userData.alamat}
                  ></textarea>
                </div>
                <div className="col-md-3 mt-2">
                  <label className="labels">Kode Pos</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="12780"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <button
                  className="btn btn-primary profile-button mx-2"
                  type="button"
                >
                  Simpan
                </button>
                <button className="btn btn-danger profile-button" type="button">
                  <Link
                    to={`/profile-page/${this.props.userGlobal.username}`}
                    style={{ textDecoration: "none" }}
                    className="text-white"
                  >
                    Batal
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(EditProfile);

import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../constants/API";

class EditProfile extends React.Component {
  state = {
    userData: {},
    userNotFound: false,

    editUser: 0,

    edit_nama_depan: "",
    edit_nama_belakang: "",
    edit_username: "",
    edit_email: "",
    edit_jenis_kelamin: "",
    edit_tanggal_lahir: "",
    edit_alamat: "",
  };
  fetchUserData = () => {
    Axios.get(`${API_URL}/user/get`, {
      params: {
        username: this.props.userGlobal.username,
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({
            userData: result.data[0],
            editUser: result.data[0].id_user,
            edit_nama_depan: result.data[0].nama_depan,
            edit_nama_belakang: result.data[0].nama_belakang,
            edit_username: result.data[0].username,
            edit_email: result.data[0].email,
            edit_jenis_kelamin: result.data[0].jenis_kelamin,
            edit_tanggal_lahir: result.data[0].tanggal_lahir,
            edit_alamat: result.data[0].alamat,
          });
        } else {
          this.setState({ userNotFound: true });
        }
      })
      .catch(() => {
        alert(`Kesalahan saat mengambil data user`);
      });
  };

  saveBtnHandler = () => {
    Axios.patch(`${API_URL}/user/edit-profile/${this.state.editUser}`, {
      nama_depan: this.state.edit_nama_depan,
      nama_belakang: this.state.edit_nama_belakang,
      username: this.state.edit_username,
      email: this.state.edit_email,
      jenis_kelamin: this.state.edit_jenis_kelamin,
      alamat: this.state.edit_alamat,
    })
      .then(() => {
        alert("Pembaharuan data berhasil");
      })
      .catch((err) => {
        console.log(err);
        alert("Pembaharuan data gagal");
      });
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
                    onChange={this.inputHandler}
                    name="edit_nama_depan"
                    type="text"
                    className="form-control"
                    value={this.state.edit_nama_depan}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Nama Belakang</label>
                  <input
                    onChange={this.inputHandler}
                    name="edit_nama_belakang"
                    type="text"
                    className="form-control"
                    value={this.state.edit_nama_belakang}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Username</label>
                  <input
                    onChange={this.inputHandler}
                    name="edit_username"
                    type="text"
                    className="form-control"
                    value={this.state.edit_username}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">E-mail</label>
                  <input
                    onChange={this.inputHandler}
                    name="edit_email"
                    type="text"
                    className="form-control"
                    value={this.state.edit_email}
                  />
                </div>

                <div className="col-md-6 mt-3">
                  <label className="labels">Jenis Kelamin</label>
                  <select
                    onChange={this.inputHandler}
                    className="form-select"
                    name="edit_jenis_kelamin"
                    value={this.state.edit_jenis_kelamin}
                  >
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                  </select>
                </div>
                <div className="col-md-6 mt-3">
                  <label className="labels">Tanggal Lahir</label>
                  <input
                    onChange={this.inputHandler}
                    name="edit_tanggal_lahir"
                    type="text"
                    className="form-control"
                    value={this.state.edit_tanggal_lahir}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <label className="labels">Alamat Pengiriman</label>
                  <textarea
                    onChange={this.inputHandler}
                    name="edit_alamat"
                    type="text"
                    className="form-control"
                    value={this.state.edit_alamat}
                  ></textarea>
                </div>
                <div className="col-md-3 mt-2">
                  <label className="labels">Kode Pos</label>
                  <input
                    name="edit_kode_pos"
                    type="text"
                    className="form-control"
                    placeholder="12780"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={this.saveBtnHandler}
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

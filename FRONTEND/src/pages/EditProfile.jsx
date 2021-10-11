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
    edit_email: "",
    edit_jenis_kelamin: "",
    edit_tanggal_lahir: "",
    edit_alamat: "",
    edit_foto_profil: "",
    edit_kode_pos: "",
  };
  fetchUserData = () => {
    Axios.get(`${API_URL}/user/get`, {
      params: {
        id_user: this.props.userGlobal.id_user,
      },
    })
      .then((result) => {
        if (result.data.length) {
          this.setState({
            userData: result.data[0],
            editUser: result.data[0].id_user,
            edit_nama_depan: result.data[0].nama_depan,
            edit_nama_belakang: result.data[0].nama_belakang,
            edit_email: result.data[0].email,
            edit_jenis_kelamin: result.data[0].jenis_kelamin,
            edit_tanggal_lahir: result.data[0].tanggal_lahir,
            edit_kode_pos: result.data[0].kode_pos,
            edit_alamat: result.data[0].alamat,
            edit_foto_profil: result.data[0].foto_profil,
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
      email: this.state.edit_email,
      jenis_kelamin: this.state.edit_jenis_kelamin,
      tanggal_lahir: this.state.edit_tanggal_lahir,
      alamat: this.state.edit_alamat,
      kode_pos: this.state.edit_kode_pos,
      foto_profil: this.state.edit_foto_profil,
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

  onBtAddFile = (e) => {
    if (e.target.files[0]) {
      this.setState({
        addFileName: e.target.files[0].name,
        addFile: e.target.files[0],
      });
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  // saveBtn = () => {
  //   if (this.state.addFile) {
  //     let formData = new FormData();

  //     let obj = {
  //       nama_depan: this.state.edit_nama_depan,
  //       nama_belakang: this.state.edit_nama_belakang,
  //       username: this.state.edit_username,
  //       email: this.state.edit_email,
  //       jenis_kelamin: this.state.edit_jenis_kelamin,
  //       tanggal_lahir: this.state.edit_tanggal_lahir,
  //       alamat: this.state.edit_alamat,
  //     };
  //     formData.append("data", JSON.stringify(obj));
  //     formData.append("file", this.state.addFile);
  //     Axios.patch(`${API_URL}/picture/upload/${this.state.editUser}`, formData)
  //       .then((res) => {
  //         alert(res.data.message);
  //       })
  //       .catch((err) => {
  //         alert("Gagal upload foto");
  //         console.log(err);
  //       });
  //   }
  // };

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
                id="imgpreview"
                className="rounded-circle img-fluid"
                width="150px"
                src={this.state.edit_foto_profil}
              />
              <div class="form-group mx-auto text-center align-items-center">
                <label>Ganti foto profil?</label>
                <input
                  type="file"
                  className="form-control"
                  id="img"
                  onChange={this.onBtAddFile}
                />
              </div>
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
                  <label className="labels">E-mail</label>
                  <input
                    onChange={this.inputHandler}
                    name="edit_email"
                    type="text"
                    className="form-control"
                    value={this.state.edit_email}
                  />
                </div>

                <div className="col-md-6">
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
                    onChange={this.inputHandler}
                    name="edit_kode_pos"
                    type="text"
                    className="form-control"
                    value={this.state.edit_kode_pos}
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

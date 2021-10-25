import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { userKeepLogin } from "../redux/actions/user";
import { API_URL } from "../constants/API";
import Axios from "axios";
import moment from "moment";

class ProfilePage extends React.Component {
  state = {
    userData: {},
    userNotFound: false,
    edit: false,
    edit_nama_depan: "",
    edit_nama_belakang: "",
    edit_email: "",
    edit_jenis_kelamin: "",
    edit_tanggal_lahir: "",
    edit_alamat: "",
    edit_foto_profil: "",
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
            edit_nama_depan: result.data[0].nama_depan,
            edit_nama_belakang: result.data[0].nama_belakang,
            edit_email: result.data[0].email,
            edit_jenis_kelamin: result.data[0].jenis_kelamin,
            edit_tanggal_lahir: result.data[0].tanggal_lahir,
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
    if (this.state.edit_tanggal_lahir) {
      Axios.patch(
        `${API_URL}/user/edit-profile/${this.state.userData.id_user}`,
        {
          nama_depan: this.state.edit_nama_depan,
          nama_belakang: this.state.edit_nama_belakang,
          email: this.state.edit_email,
          jenis_kelamin: this.state.edit_jenis_kelamin,
          tanggal_lahir: moment(this.state.edit_tanggal_lahir).format(
            "YYYY-MM-DD"
          ),
          alamat: this.state.edit_alamat,
          foto_profil: this.state.edit_foto_profil,
        }
      )
        .then(() => {
          alert("Pembaruan data berhasil");
          this.fetchUserData();
          this.setState({ edit: false });
          this.props.userKeepLogin(this.state.userData);
        })
        .catch((err) => {
          console.log(err);
          alert("Pembaruan data gagal");
        });
    } else {
      alert("Mohon isi tanggal kelahiran anda untuk menyimpan profil");
    }
  };

  inputHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  editedProfile = () => {
    this.setState({ edit: true });
  };

  cancelEdit = () => {
    this.setState({ edit: false });
  };

  editToggle = () => {
    if (this.state.edit === true) {
      return (
        <div className="row">
          <div className="col-md-5 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                id="imgpreview"
                className="rounded-circle img-fluid"
                width="400px"
                src={`${API_URL}/${this.state.userData.foto_profil}`}
                alt=""
              />
              <div class="form-group mx-auto text-center align-items-center">
                <Link
                  to={`/edit-profile-picture/${this.state.userData.id_user}`}
                >
                  <button className="btn btn-info mt-3">
                    Ganti Foto Profil
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right display-5">Edit Profil</h4>
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
                  <label className="labels" for="birthday">
                    Tanggal Lahir
                  </label>
                  <input
                    onChange={this.inputHandler}
                    name="edit_tanggal_lahir"
                    type="date"
                    id="birthday"
                    className="form-control"
                    value={moment(this.state.edit_tanggal_lahir).format(
                      "YYYY-MM-DD"
                    )}
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
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={this.saveBtnHandler}
                  className="btn btn-primary profile-button mx-2"
                  type="button"
                >
                  Simpan
                </button>
                <button
                  onClick={this.cancelEdit}
                  className="btn btn-danger profile-button"
                  type="button"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-md-5 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle"
                width="400px"
                src={`${API_URL}/${this.state.userData.foto_profil}`}
                alt={this.state.userData.id_user}
              />
              <span className="font-weight-bold">
                {this.state.userData.nama_depan}{" "}
                {this.state.userData.nama_belakang}
              </span>
              <span className="text-black-50">{this.state.userData.email}</span>
            </div>
          </div>
          <div className="col-md-6 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right display-6">Profil Anda</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <h6 className="labels">Nama Depan</h6>
                  <p>{this.state.userData.nama_depan}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="labels">Nama Belakang</h6>
                  <p>{this.state.userData.nama_belakang}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h6 className="labels">E-mail</h6>
                  <p>{this.state.userData.email}</p>
                </div>
                <div className="col-md-6">
                  <h6 className="labels">Jenis Kelamin</h6>
                  <p>{this.state.userData.jenis_kelamin}</p>
                </div>

                {this.state.userData.tanggal_lahir ? (
                  <>
                    <div className="col-md-6">
                      <h6 className="labels">Tanggal Lahir</h6>
                      <p>
                        {moment(this.state.userData.tanggal_lahir).format(
                          "DD MMM YYYY"
                        )}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="labels">Usia</h6>
                      <p>
                        {moment().diff(
                          this.state.userData.tanggal_lahir,
                          "years"
                        )}{" "}
                        tahun
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-6">
                      <h6 className="labels">Tanggal Lahir</h6>
                      <p>-</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="labels">Usia</h6>
                      <p>-</p>
                    </div>
                  </>
                )}

                <div className="col-md-12 mt-2">
                  <h6 className="labels">Alamat Pengiriman</h6>
                  <p>{this.state.userData.alamat}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={this.editedProfile}
                    className="btn btn-warning mx-3"
                    type="button"
                  >
                    Edit Profil
                  </button>
                  <button className="btn btn-primary">Kembali ke Home</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  componentDidMount() {
    this.fetchUserData();
  }

  render() {
    if (this.props.userGlobal.id_user) {
      return (
        <div className="container rounded bg-light">{this.editToggle()}</div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

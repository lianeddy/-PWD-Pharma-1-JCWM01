import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { registerUser } from "../../redux/actions/user";
import { connect } from "react-redux";

class Register extends React.Component {
  state = {
    nama_depan: "",
    nama_belakang: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    email: "",
    password: "",
    konfirmasi_password: "",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  registerHandler = () => {
    const {
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      username,
      email,
      password,
    } = this.state;
    Axios.post(`${API_URL}/user/add-user`, {
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      username,
      email,
      password,
    })
      .then(() => {
        alert("Berhasil Mendaftar");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Daftarkan diri anda!</h1>
            <p className="lead">
              Daftar sekarang dan dapatkan pilihan obat yang lengkap serta
              terjangkau
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            {this.props.userGlobal.errMsg ? (
              <div className="alert alert-danger">
                {this.props.userGlobal.errMsg}
              </div>
            ) : null}
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-2">Register</h5>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      name="nama_depan"
                      onChange={this.inputHandler}
                      placeholder="Nama Depan"
                      type="text"
                      className="form-control my-2"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      name="nama_belakang"
                      onChange={this.inputHandler}
                      placeholder="Nama Belakang"
                      type="text"
                      className="form-control my-2"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-2">
                    <select
                      onChange={this.inputHandler}
                      className="form-select"
                      name="jenis_kelamin"
                    >
                      <option value="" selected disabled>
                        Jenis Kelamin
                      </option>
                      <option value="Pria">Pria</option>
                      <option value="Wanita">Wanita</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <input
                      name="tanggal_lahir"
                      onChange={this.inputHandler}
                      placeholder="Tanggal Lahir"
                      type="text"
                      className="form-control my-2"
                    />
                  </div>
                </div>
                <input
                  name="email"
                  onChange={this.inputHandler}
                  placeholder="E-mail"
                  type="text"
                  className="form-control my-2"
                />

                <input
                  name="password"
                  onChange={this.inputHandler}
                  placeholder="Password"
                  type="password"
                  className="form-control my-2"
                />
                <input
                  name="konfirmasi_password"
                  onChange={this.inputHandler}
                  placeholder="Konfirmasi Password"
                  type="password"
                  className="form-control my-2"
                />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button
                    onClick={() => this.props.registerUser(this.state)}
                    className="btn btn-primary mt-2"
                  >
                    Daftar
                  </button>
                  <Link to="/login" className="text-decoration-none">
                    Atau Masuk
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userGlobal: state.user };
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

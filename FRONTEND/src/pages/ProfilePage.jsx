import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { API_URL } from "../constants/API";
import Axios from "axios";

class ProfilePage extends React.Component {
  state = {
    userData: {},
    userNotFound: false,
  };

  fetchUserData = () => {
    Axios.get(`${API_URL}/user/get`, {
      params: {
        email: this.props.userGlobal.email,
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
    if (this.props.userGlobal.id_user) {
      return (
        <div className="container rounded bg-light">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle"
                  width="150px"
                  src={this.state.userData.foto_profil}
                  alt={this.state.userData.email}
                />
                <span className="font-weight-bold">
                  {this.state.userData.nama_depan}{" "}
                  {this.state.userData.nama_belakang}
                </span>
                <span className="text-black-50">
                  {this.state.userData.email}
                </span>
                <span>
                  <button className="btn btn-sm btn-warning mt-2" type="button">
                    <Link
                      to={`/edit-profile/${this.state.userData.email}`}
                      style={{ textDecoration: "none" }}
                      className="text-dark"
                    >
                      Edit Profil
                    </Link>
                  </button>
                </span>
              </div>
            </div>
            <div className="col-md-6 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profil Anda</h4>
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
                  <div className="col-md-6">
                    <h6 className="labels">Tanggal Lahir</h6>
                    <p>{this.state.userData.tanggal_lahir}</p>
                  </div>
                  <div className="col-md-12 mt-2">
                    <h6 className="labels">Alamat Pengiriman</h6>
                    <p>{this.state.userData.alamat}</p>
                  </div>
                  <div className="mt-4">
                    <h6 className="text-center">
                      <a
                        href="/"
                        className="text-dark"
                        style={{ textDecoration: "none" }}
                      >
                        Kembali ke Home
                      </a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps)(ProfilePage);

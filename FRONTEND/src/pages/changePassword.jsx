import React from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";


class changePassword extends React.Component {
  state={
    currentPassword:"",
    newPassword:"",
    
  }

changePasswordBtn=()=>{
  console.log(this.props.userGlobal.email);
  const {
    currentPassword,
    newPassword,
  } = this.state;
  Axios.post(`${API_URL}/user/change-password`,{
    currentPassword,
    newPassword,
    email: this.props.userGlobal.email
  }).then(()=>{
    alert("berhasil ganti password")
  })
  .catch((err)=>{
    console.log(err);
  })
}




inputHandler = (event) => {
  const value = event.target.value;
  const name = event.target.name;

  this.setState({ [name]: value });
};


  render() {
    return (
        <div>
        <div className="container mt-3">
          <div className="row mb-5 mt-5 d-flex justify-content-center">
              <div className="card">  
              <div className="card-body">
                     <h1>Change Password</h1>
              <div className="card">
                <div className="card-body">
                  <h5 className="mb-3">Current password</h5>
                  <input
                    onChange={this.inputHandler}
                    name="currentPassword"
                    placeholder="Enter Current password"
                    type="password"
                    className="form-control my-2"
                  />
                  <h5 className="mb-3">New password</h5>
                  <input
                  onChange={this.inputHandler}
                    name="newPassword"
                    placeholder="Enter New Password"
                    type="password"
                    className="form-control my-2"
                  />
                  <button onClick={this.changePasswordBtn} className="btn btn-primary mt-1">Save Changes</button>
                </div>
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

export default connect(mapStateToProps)(changePassword);

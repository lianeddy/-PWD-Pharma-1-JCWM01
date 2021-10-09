import React from "react";


class changePassword extends React.Component {
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
                    name="password"
                    placeholder="Enter Current password"
                    type="password"
                    className="form-control my-2"
                  />
                  <h5 className="mb-3">New password</h5>
                  <input
                    name="password"
                    placeholder="Enter New Password"
                    type="password"
                    className="form-control my-2"
                  />
                  <button className="btn btn-primary mt-1">Save Changes</button>
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

export default changePassword;

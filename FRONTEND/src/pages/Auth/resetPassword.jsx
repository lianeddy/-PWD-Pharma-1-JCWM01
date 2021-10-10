import React from "react";
import { connect } from "react-redux";
import  {btnResetPassword} from "../../redux/actions/user"





class resetPassword extends React.Component {
  state={
    email:""
  }



  // resetdBtn=()=>{
  //   console.log(this.props.userGlobal.email);
  //   const {
  //     email,
  //   } = this.state;
  //   Axios.post(`${API_URL}/user/reset-password`,{
  //     email,
  //     email: this.props.userGlobal.email
  //   }).then(()=>{
  //     alert("berhasil reset password")
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
  // }
  

  inputHandler=(event)=>{
    const value = event.target.value
    const name = event.target.name
    this.setState({[name]:value})
  }


  render() {
    return (
      <div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-12 text-center ">
              <h1>Find your account</h1>
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col-4 offset-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="font-weight-bold mb-3">Enter your email</h5>
                  <input
                    onChange={this.inputHandler} 
                    name="email"
                    placeholder="E-mail"
                    type="text"
                    className="form-control my-2"
                  />
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <button onClick={()=>this.props.btnResetPassword(this.state)} className="btn btn-primary mt-2">Submit</button>
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

const mapDispatchToProps = {
  btnResetPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(resetPassword)

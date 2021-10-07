import Axios from "axios";
import React from "react";
import { API_URL } from "../../constants/API";

class Verification extends React.Component {
  state = {
    message: "Loading...",
  };

  componentDidMount() {
    Axios.patch(
      `${API_URL}/user/verified`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.props.match.params.token}`,
        },
      }
    )
      .then((res) => {
        this.setState({
          message: "Your Account is verified",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return <h2 className="text-center text-uppercase">{this.state.message}</h2>;
  }
}

export default Verification;

import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-dark text-center text-lg-start">
        <div className="text-center text-white p-3">
          Final Project Purwadhika JC Web Development by
          <a className="text-white" href="https://mdbootstrap.com/">
            {" "}
            Alif, Muslim, & Ryan
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;

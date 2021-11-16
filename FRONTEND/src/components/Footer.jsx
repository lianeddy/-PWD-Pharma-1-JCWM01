import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-dark text-center text-lg-start sticky-bottom footer">
        <div className="text-center text-white p-3 container">
          Final Project Purwadhika JC Web Development by
          <a className="text-white text-decoration-none" href="">
            {" "}
            Alif, Muslim, & Ryan
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;

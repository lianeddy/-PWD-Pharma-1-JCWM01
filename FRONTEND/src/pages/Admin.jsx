import React from "react";
import { Redirect } from "react-router";
import ListDataProduct from "./Admin/ListDataProduct";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import AdminUploadProduct from "./Admin/AdminUploadProduct";
import RawDrugList from "../components/RawDrugList";
import PrescriptionRequestPage from "../components/PrescriptionRequestPage";
import SubstanceUsage from "../components/SubstanceUsage";
import Rejected from "./Admin/Rejected";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }
  componentDidMount() {
    console.log("role", this.props.userGlobal.role);
  }
  render() {
    if (this.props.userGlobal.role !== "ADMIN") {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Nav tabs className="justify-content-center bg-secondary">
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <h5 className="text-dark">Admin Products Upload</h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <h5 className="text-dark">Drug List</h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <h5 className="text-dark">Prescription Request</h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              <h5 className="text-dark">Substance List</h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "5" })}
              onClick={() => {
                this.toggle("5");
              }}
            >
              <h5 className="text-dark">Substance Usage</h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "6" })}
              onClick={() => {
                this.toggle("6");
              }}
            >
              <h5 className="text-dark">Rejected Prescriptions</h5>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.state.activeTab == 1 ? <AdminUploadProduct /> : null}
          </TabPane>
          <TabPane tabId="2">
            {this.state.activeTab == 2 ? <ListDataProduct /> : null}
          </TabPane>
          <TabPane tabId="3">
            {this.state.activeTab == 3 ? <PrescriptionRequestPage /> : null}
          </TabPane>
          <TabPane tabId="4">
            {this.state.activeTab == 4 ? <RawDrugList /> : null}
          </TabPane>
          <TabPane tabId="5">
            {this.state.activeTab == 5 ? <SubstanceUsage /> : null}
          </TabPane>
          <TabPane tabId="6">
            {this.state.activeTab == 6 ? <Rejected /> : null}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userGlobal: state.user };
};

export default connect(mapStateToProps)(Admin);

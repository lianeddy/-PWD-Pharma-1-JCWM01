import React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import AdminUploadProduct from "./Admin/AdminUploadProduct";
import ListDataProduct from "./Admin/ListDataProduct";
import RawDrugList from "../components/RawDrugList";
import PrescriptionRequestPage from "../components/PrescriptionRequestPage";

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

  render() {
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
              <h5 className="text-dark">Raw Drug List</h5>
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
        </TabContent>
      </div>
    );
  }
}

export default Admin;
// <div className=" row h-auto w-100 border-bottom">
//   <div className="col-2 border-right ">
//     <h4 className="mb-5">ADMIN PAGE</h4>

//     <div className="d-flex flex-column">

//       <Link to={'/admin-upload-product'}><button type="button" class="btn btn-success mb-2 w-100"> <i class="fa fa-upload" aria-hidden="true"></i> Upload data</button></Link>
//       <Link to={'/admin/list-data-product'}> <button type="button" class="btn btn-success w-100"><i class="fa fa-database" aria-hidden="true"></i> List</button></Link>

//     </div>
//   </div>

//   <div className="col-10 ">
//     <Switch>
//       <Route path='/admin/list-data-product' component={ListDataProduct} />
//     </Switch>
//   </div>

// </div >

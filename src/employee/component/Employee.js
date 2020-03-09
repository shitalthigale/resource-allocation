import React from "react";
import { Link, withRouter } from "react-router-dom";

import { Redirect, Route } from "react-router";
class Employee extends React.Component {
  employeeDetails = {};
  constructor(props) {
    super(props);

    this.state = {
      projectAllocation: 0,
      startDate: "",
      endDate: "",
      projectId: "",
      redirect: 0
    };

    this.onChangeOfEmployeeForm = this.onChangeOfEmployeeForm.bind(this);
    this.onSubmitOfEmployeeForm = this.onSubmitOfEmployeeForm.bind(this);
  }

  componentWillMount() {
    this.getEmployeDetails();
  }

  /**
   * This function is used to get selected employee
   * @param {Number} projectId
   * @param {Number} employeeId
   */
  getEmployeDetails() {
    this.employeeDetails = this.props.employeeDetails;
    this.setState({
      startDate: this.employeeDetails.startDate,
      endDate: this.employeeDetails.endDate,
      projectAllocation: this.employeeDetails.projectAllocation,
      projectName: this.props.ProjectName
    });
  }
  /**
   *
   * @param {* } event  used for fetch input value and ID
   * this method is use to validate allocation filed in input and update state value
   */

  onChangeOfEmployeeForm(event) {
    let propertyName = event.target.name;
    let propertyValue = event.target.value;
    if (propertyName === "projectAllocation") {
      const allocation = parseInt(propertyValue, 10);
      const freeAllocation = 100 - this.employeeDetails.allocation;
      if (
        allocation >
        freeAllocation + this.employeeDetails.projectAllocation
      ) {
        return;
      } else {
      }
    }
    this.setState({
      [propertyName]: propertyValue
    });
  }

  /**
   *
   * @param {*} event used for form value should be display after page refresh
   * this method submit updated data and update value in project and employee database
   */
  onSubmitOfEmployeeForm(event) {
    event.preventDefault();
    this.employeeDetails.projectAllocation = this.state.projectAllocation;
    this.employeeDetails.startDate = this.state.startDate;
    this.employeeDetails.endDate = this.state.endDate;
    this.props.updateEmployee(this.employeeDetails);
    this.setState({
      redirect: 1
    });
  }
  goBack() {
    this.props.history.push("/");
  }

  render() {
    if (this.state.redirect == 1)
      return (
        <Redirect
          to={{
            pathname: "/component/EmployeeList"
          }}
        />
      );
    return (
      <div className="">
        <div className="card-header text-center font-weight-bold">
          Update Employee
        </div>
        <div className="empBody">
          <form
            name="my-form"
            onSubmit={this.onSubmitOfEmployeeForm}
            action="success.php"
            method=""
          >
            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Employee Id :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="emp_id"
                  className="form-control"
                  name="id"
                  value={this.employeeDetails.id}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                project Name :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="emp_id"
                  className="form-control"
                  name="id"
                  value={this.state.projectName}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Employee Name :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="emp_id"
                  className="form-control"
                  name="id"
                  value={this.employeeDetails.fullName}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                E-Mail Address :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="email_address"
                  className="form-control"
                  name="emailId"
                  value={this.employeeDetails.emailId}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Job Level :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="job_level"
                  className="form-control"
                  name="jobLevel"
                  value={this.employeeDetails.jobLevel}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Designation :
              </label>
              <div className="col-md-6">
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  className="form-control"
                  value={this.employeeDetails.designation}
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Start Date :
              </label>
              <div className="col-md-6">
                <input
                  id="employee_start_date"
                  name="startDate"
                  type="date"
                  className="form-control"
                  value={this.employeeDetails.startDate}
                  onChange={this.onChangeOfEmployeeForm}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                End Date :
              </label>
              <div className="col-md-6">
                <input
                  id="employee_end_date"
                  name="endDate"
                  type="date"
                  className="form-control"
                  value={this.state.endDate}
                  onChange={this.onChangeOfEmployeeForm}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-4 col-form-label text-md-right">
                Allocation :
              </label>
              <div className="col-md-6">
                <input
                  id="employee_allocation"
                  name="projectAllocation"
                  type="number"
                  className="form-control"
                  value={this.state.projectAllocation}
                  onChange={this.onChangeOfEmployeeForm}
                />
                <span className="text ">
                  {" "}
                  Note *: Employee can be allocated up to{" "}
                  {this.employeeDetails.projectAllocation +
                    (100 - this.employeeDetails.allocation)}{" "}
                </span>
              </div>
            </div>

            <div className="col-md-6 offset-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ margin: "5px" }}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ margin: "5px" }}
              >
                <Link to={`/component/EmployeeList`}>Cancel</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Employee;

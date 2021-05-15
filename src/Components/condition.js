import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "../Styles/PostButtons.css";

// Dropdown from which the user can select a book condition.
// The conditions are: New, Slightly Used, Old
class DropdownExampleSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Select Condition",
    };
  }

  //change the title of the dropdown to replicate the currently selected condition
  handleSelect = (e) => {
    this.props.handleConditionSubmit(e);
    this.setState({ title: e });
  };

  render() {
    return (
      <DropdownButton
        title={this.state.title}
        onSelect={this.handleSelect}
        id="dropdown-menu-align-center"
      >
        <Dropdown.Item eventKey="Old">Old</Dropdown.Item>
        <Dropdown.Item eventKey="Slightly Used">Slightly Used</Dropdown.Item>
        <Dropdown.Item eventKey="New">New</Dropdown.Item>
      </DropdownButton>
    );
  }
}
export default DropdownExampleSelection;

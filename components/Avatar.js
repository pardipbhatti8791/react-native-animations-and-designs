import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class Avatar extends React.Component {
  state = {
    photo: "https://cl.ly/c2077ba6f3de/download/avatar-default.jpg"
  };
  componentDidMount() {
    fetch("https://uinames.com/api/?ext&region=india&gender=female", {
      headers: new Headers({})
    })
      .then(response => response.json())
      .then(resp => {
        this.setState({
          photo: resp.photo
        });
        this.props.updateName(resp.name);
      });
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

const mapStateToProps = state => {
  return {
    name: state.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name: name
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;

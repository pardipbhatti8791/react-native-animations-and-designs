import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";

class Avatar extends React.Component {
  componentDidMount() {
    this.loadState();
  }

  loadState = () => {
    AsyncStorage.getItem("state").then(serializedState => {
      alert(serializedState);
      const state = JSON.parse(serializedState);
      if (state) {
        this.props.updateName(state.name);
        this.props.updateAvatar(state.avatar);
      }
    });
  };

  render() {
    return <Image source={{ uri: this.props.avatar }} />;
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
    avatar: state.avatar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name: name
      }),
    updateAvatar: avatar =>
      dispatch({
        type: "UPDATE_AVATAR",
        avatar
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

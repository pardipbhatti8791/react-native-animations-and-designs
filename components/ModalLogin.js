import React from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Animated,
  Dimensions,
  AsyncStorage
} from "react-native";
import { BlurView } from "react-native-blur";
import { connect } from "react-redux";
import Success from "./success";
import Loading from "./Loading";

import firebase from "./Firebase";
import { saveState } from "./AsyncStorage";

const screenHeight = Dimensions.get("window").height;

class ModalLogin extends React.Component {
  state = {
    email: "",
    password: "",
    isSuccessfull: false,
    isLoading: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.3),
    translateY: new Animated.Value(0)
  };

  componentDidMount() {
    this.retrieveName();
  }

  componentDidUpdate() {
    if (this.props.action === "openLogin") {
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 0
      }).start();
      Animated.spring(this.state.scale, {
        toValue: 1
      }).start();
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 200
      }).start();
    }

    if (this.props.action === "closeLogin") {
      setTimeout(() => {
        Animated.timing(this.state.top, {
          toValue: screenHeight,
          duration: 0
        }).start();
        Animated.spring(this.state.scale, {
          toValue: 1.3
        }).start();
      }, 500);

      Animated.timing(this.state.translateY, {
        toValue: 1000,
        duration: 200
      }).start();
    }
  }

  storeName = async email => {
    try {
      await AsyncStorage.setItem("email", email);
      this.props.updateName(email);
    } catch (err) {}
  };

  retrieveName = async () => {
    try {
      const name = await AsyncStorage.getItem("email");
      this.props.updateName(name);
    } catch (error) {}
  };

  handleLogin = () => {
    this.setState({ isLoading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        this.setState({ isLoading: false });
        this.setState({ isSuccessfull: true });
        // this.storeName(response.user.email);
        this.fetchUser();

        setTimeout(() => {
          this.props.closeLogin();
          this.setState({ isSuccessfull: false });
        }, 1000);
      })
      .catch(error => {
        // AsyncStorage.clear();
        Alert.alert("Error", error.message);
        this.setState({ isLoading: false });
      });
  };

  fetchUser = () => {
    fetch("https://uinames.com/api/?ext&region=india&gender=female", {
      headers: new Headers({})
    })
      .then(response => response.json())
      .then(resp => {
        const name = resp.name;
        const avatar = resp.photo;
        saveState({ name, avatar });
      });
  };

  tappedBackground = () => {
    Keyboard.dismiss();
    this.props.closeLogin();
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <TouchableWithoutFeedback onPress={this.tappedBackground}>
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
            blurType="light"
            blurAmount={10}
          />
        </TouchableWithoutFeedback>

        <AnimatedModal
          style={{
            transform: [
              {
                scale: this.state.scale
              },
              {
                translateY: this.state.translateY
              }
            ]
          }}
        >
          <Logo source={require("../assets/logo-xd.png")} />
          <Text>GBCODERS, Web & Mobile Development</Text>
          <TextInput
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            keyboardType="email-address"
            value={this.state.email}
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.password}
          />
          <IconEmail source={require("../assets/email.png")} />
          <IconPassword source={require("../assets/password.png")} />
          <TouchableOpacity onPress={this.handleLogin}>
            <Button>
              <ButtonText>Login</ButtonText>
            </Button>
          </TouchableOpacity>
        </AnimatedModal>
        <Success isActive={this.state.isSuccessfull} />
        <Loading isActive={this.state.isLoading} />
      </AnimatedContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    action: state.action
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeLogin: () =>
      dispatch({
        type: "CLOSE_LOGIN"
      }),
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalLogin);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
  z-index: 5;
`;
const AnimatedModal = Animated.createAnimatedComponent(Modal);
const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;
const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`;
const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #364560;
  margin-top: 20px;
  padding-left: 44px;
`;

const Button = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;

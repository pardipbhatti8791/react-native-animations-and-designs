import React from "react";
import styled from "styled-components";
import {
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const tabBarHeight = 83;
class Project extends React.Component {
  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    titleTop: new Animated.Value(20),
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  openCard = () => {
    if (!this.props.canOpen) return;
    Animated.spring(this.state.cardWidth, {
      toValue: width
    }).start();
    Animated.spring(this.state.cardHeight, {
      toValue: height - tabBarHeight
    }).start();
    Animated.spring(this.state.titleTop, {
      toValue: 40
    }).start();
    StatusBar.setHidden(true);

    Animated.timing(this.state.opacity, {
      toValue: 1
    }).start();
  };

  closeCard = () => {
    Animated.spring(this.state.cardWidth, {
      toValue: 315
    }).start();
    Animated.spring(this.state.cardHeight, {
      toValue: 460
    }).start();
    Animated.spring(this.state.titleTop, {
      toValue: 20
    }).start();
    StatusBar.setHidden(false);
    Animated.timing(this.state.opacity, {
      toValue: 0
    }).start();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.openCard}>
        <AnimatedContainer
          style={{
            width: this.state.cardWidth,
            height: this.state.cardHeight
          }}
        >
          <Cover>
            <Image source={this.props.image} />
            <AnimatedTitle style={{ top: this.state.titleTop }}>
              {this.props.title}
            </AnimatedTitle>
            <Author>{this.props.author}</Author>
          </Cover>
          <Text>{this.props.text}</Text>
          <TouchableOpacity
            style={{ position: "absolute", top: 20, right: 20 }}
            onPress={this.closeCard}
          >
            <AnimatedCloseView style={{ opacity: this.state.opacity }}>
              <Icon name="ios-close" size={32} color="#546bfb" />
            </AnimatedCloseView>
          </TouchableOpacity>
        </AnimatedContainer>
      </TouchableWithoutFeedback>
    );
  }
}

export default Project;

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;
const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  width: 300px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);
const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;
const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24;
  color: #3c4560;
`;
const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

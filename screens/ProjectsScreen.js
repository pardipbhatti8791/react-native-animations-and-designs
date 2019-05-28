import React from "react";
import styled from "styled-components";
import { PanResponder, Animated } from "react-native";
import Project from "../components/Project";
import gql from "graphql-tag";

const projectsQuery = gql`
  query {
    mobileappprojects {
      title
      author
      description
      image {
        url
      }
    }
  }
`;

const getNextIndex = index => {
  var nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }

  return nextIndex;
};

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thridScale: new Animated.Value(0.8),
    thridTranslateY: new Animated.Value(-50),
    index: 0
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, {
          toValue: 1
        }).start();
        Animated.spring(this.state.translateY, {
          toValue: 0
        }).start();
        Animated.spring(this.state.thridScale, {
          toValue: 0.9
        }).start();
        Animated.spring(this.state.thridTranslateY, {
          toValue: 44
        }).start();
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();
        if (positionY > 200) {
          Animated.timing(this.state.pan, {
            toValue: {
              x: 0,
              y: 1000
            }
          }).start(() => {
            this.state.pan.setValue({
              x: 0,
              y: 0
            });
          });
          this.state.scale.setValue(0.9);
          this.state.translateY.setValue(44);
          this.state.thridScale.setValue(0.8);
          this.state.thridTranslateY.setValue(-50);
          this.setState({ index: getNextIndex(this.state.index) });
        } else {
          Animated.spring(this.state.pan, {
            toValue: {
              x: 0,
              y: 0
            }
          }).start();

          Animated.spring(this.state.scale, {
            toValue: 0.9
          }).start();
          Animated.spring(this.state.translateY, {
            toValue: 44
          }).start();

          Animated.spring(this.state.thridScale, {
            toValue: 0.8
          }).start();
          Animated.spring(this.state.thridTranslateY, {
            toValue: -50
          }).start();
        }
      }
    });
  }

  render() {
    return (
      <Container>
        <Animated.View
          style={{
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          }}
          {...this._panResponder.panHandlers}
        >
          <Project
            title={projects[this.state.index].title}
            author={projects[this.state.index].author}
            text={projects[this.state.index].text}
            image={projects[this.state.index].image}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
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
          <Project
            title={projects[getNextIndex(this.state.index)].title}
            author={projects[getNextIndex(this.state.index)].author}
            text={projects[getNextIndex(this.state.index)].text}
            image={projects[getNextIndex(this.state.index)].image}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              {
                scale: this.state.thridScale
              },
              {
                translateY: this.state.thridTranslateY
              }
            ]
          }}
        >
          <Project
            title={projects[getNextIndex(this.state.index + 1)].title}
            author={projects[getNextIndex(this.state.index + 1)].author}
            text={projects[getNextIndex(this.state.index + 1)].text}
            image={projects[getNextIndex(this.state.index + 1)].image}
          />
        </Animated.View>
      </Container>
    );
  }
}

export default ProjectsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: white;
`;

const Text = styled.Text``;

const projects = [
  {
    title: "Price Tag",
    image: require("../assets/background5.jpg"),
    author: "Liu Yi",
    text:
      "Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China."
  },
  {
    title: "The DM App - Ananoumous Chat",
    image: require("../assets/background6.jpg"),
    author: "Chad Goodman",
    text:
      "Design+Code was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. "
  },
  {
    title: "Nikhiljay",
    image: require("../assets/background7.jpg"),
    author: "Nikhil D'Souza",
    text:
      "Recently finished the React course by @Mengto, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I'm very excited with it."
  }
];

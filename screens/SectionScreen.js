import React from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity, StatusBar, ScrollView } from "react-native";
import Markdown from "react-native-showdown";

class SectionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    return (
      <ScrollView>
        <Container>
          <StatusBar hidden />
          <Cover>
            <Image source={section.image} />
            <Wrapper>
              <Logo source={section.logo} />
              <SubTitle>{section.subtitle}</SubTitle>
            </Wrapper>
            <Title>{section.title}</Title>
            <Caption>{section.caption}</Caption>
          </Cover>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <CloseView>
              <Icon
                name="ios-close"
                size={36}
                color="#4775f2"
                style={{ marginTop: -2 }}
              />
            </CloseView>
          </TouchableOpacity>
          <Content>
            {/* <WebView
            source={{ html: htmlContent + htmlStyle }}
            scalesPageToFit={false}
            scrollEnabled={false}
            ref="webView"
            onNavigationStateChange={event => {
              if (event.url != "about:blank") {
                this.refs.webView.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          /> */}
            <Markdown
              body={htmlContent}
              pureCss={htmlStyle}
              scalesPageToFit={false}
              scrollEnabled={false}
            />
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default SectionScreen;

const htmlContent = `
  <h2>This is a title</h2>
  <p>This is a paragraph</p>
  <p>Visit website <strong><a href="http://www.google.com"/>Click</a></strong></p>
  <img src="https://cl.ly/42fb2998a355/download/Image%2525202019-05-19%252520at%2525203.36.04%252520AM.png" />
`;

const htmlStyle = `
  <style>
    * {
      font-family: -apple-system, Roboto;
    }

    img {
      width: 100%;
      margint-tp: 20px;
    }
  </style>
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;
const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;
const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;
const SubTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

const Content = styled.View`
  height: 1000px;
  padding: 12px;
`;

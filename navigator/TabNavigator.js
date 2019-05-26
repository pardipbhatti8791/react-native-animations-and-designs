import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";

const activeColor = "#4775F2";
const inActiveColor = "#b8bece";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen
  },
  {
    mode: "modal"
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;

  const routeName = navigation.state.routes[navigation.state.index].routeName;
  if (routeName == "Section") {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Icon
        name="ios-home"
        size={26}
        color={focused ? activeColor : inActiveColor}
      />
    )
  };
};

const CoursesStack = createStackNavigator({
  Courses: CoursesScreen
});

CoursesStack.navigationOptions = {
  tabBarLabel: "Courses",
  tabBarIcon: ({ focused }) => (
    <Icon
      name="ios-albums"
      size={26}
      color={focused ? activeColor : inActiveColor}
    />
  )
};

const ProjectStack = createStackNavigator({
  Projects: ProjectsScreen
});

ProjectStack.navigationOptions = {
  tabBarLabel: "Projects",
  tabBarIcon: ({ focused }) => (
    <Icon
      name="ios-folder"
      size={26}
      color={focused ? activeColor : inActiveColor}
    />
  )
};

const TabNavigator = createBottomTabNavigator({
  ProjectStack,
  HomeStack,
  CoursesStack
});

export default TabNavigator;

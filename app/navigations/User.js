import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Icon } from "react-native-elements";

//Sreens
import HomeScreen from "../screens/Home";
import TopFiveScreen from "../screens/TopFive";
import SearchScreen from "../screens/Search";
//Screens myaccount
import MyAccountScreen from "../screens/MyAccount/MyAccount";
import RegisterScreen from "../screens/MyAccount/Register";
import LoginScreen from "../screens/MyAccount/Login";

const homeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home"
    })
  }
});
const topFiveScreenStack = createStackNavigator({
  TopFive: {
    screen: TopFiveScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Top 5"
    })
  }
});
const searchScreenStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Buscar"
    })
  }
});
const myAccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Mi Cuenta"
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Registro"
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Login"
    })
  }
});

const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: homeScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="compass-outline"
            type="material-community"
            size={24}
            color={tintColor}
          />
        )
      })
    },
    TopFive: {
      screen: topFiveScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Top 5",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="star-outline"
            type="material-community"
            size={24}
            color={tintColor}
          />
        )
      })
    },
    Search: {
      screen: searchScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tinColor }) => (
          <Icon
            name="magnify"
            type="material-community"
            size={24}
            color={tinColor}
          />
        )
      })
    },
    MyAccount: {
      screen: myAccountScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Mi Cuenta",
        tabBarIcon: ({ tinColor }) => (
          <Icon
            name="home-outline"
            type="material-community"
            size={24}
            color={tinColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: "MyAccount",
    order: ["Home", "TopFive", "Search", "MyAccount"],
    tabBarOptions: { inactiveTintColor: "#646464", activeTintColor: "#00a680" }
  }
);

export default createAppContainer(RootStack);

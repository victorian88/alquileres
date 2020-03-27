import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import RestaurantsScreenStacks from "./RestaurantsStacks";
import SearchScreenStacks from "./SearchStacks";
import LoginScreenStacks from "./LoginStacks";
//import AccountScreenStacks from "./AccountStacks";
//import FavoritesScreenSatcks from "./FavoritesStacks";

const NavigationStacks = createBottomTabNavigator({
  Login: {
    screen: LoginScreenStacks,
    navigationOptions: () => ({
      tabBarLabel: "Login",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="compass-outline"
          size={22}
          color={tintColor}
        />
      )
    })
  },
  Restaurants: {
    screen: RestaurantsScreenStacks,
    navigationOptions: () => ({
      tabBarLabel: "Propiedades",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="compass-outline"
          size={22}
          color={tintColor}
        />
      )
    })
  },
  Search: {
    screen: SearchScreenStacks,
    navigationOptions: () => ({
      tabBarLabel: "Buscar",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="magnify"
          size={22}
          color={tintColor}
        />
      )
    })
  }
});

export default createAppContainer(NavigationStacks);

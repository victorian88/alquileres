import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import RestaurantsScreenStacks from "./RestaurantsStacks";
import SearchScreenStacks from "./SearchStacks";
//import SearchScreenStacks from "./SearchStacks";
//import AccountScreenStacks from "./AccountStacks";
//import FavoritesScreenSatcks from "./FavoritesStacks";

const NavigationStacks = createBottomTabNavigator({
  Restaurants: {
    screen: RestaurantsScreenStacks,
    navigationOptions: () => ({
      tabBarLabel: "Restaurantes",
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

import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "./Restaurants";
import AddRestaurantScreen from "./AddRestaurant";
//import RestaurantScreen from "../screens/Restaurants/Restaurant";
//import AddReviewRestaurantScreen from "../screens/Restaurants/AddReviewRestaurant";

const RestaurantsScreenStacks = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: () => ({
      title: "Restaurants"
    })
  },
  AddRestaurant: {
    screen: AddRestaurantScreen,
    navigationOptions: () => ({
      title: "Nuevo Restaurante"
    })
  }
});

export default RestaurantsScreenStacks;

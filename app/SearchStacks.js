import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "./screens/Search";
//import AddRestaurantScreen from "./AddRestaurant";
//import RestaurantScreen from "../screens/Restaurants/Restaurant";
//import AddReviewRestaurantScreen from "../screens/Restaurants/AddReviewRestaurant";

const SearchScreenStacks = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Buscador"
    })
  }
});

export default SearchScreenStacks;

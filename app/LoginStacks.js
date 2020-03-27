import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./components/Account/LoginForm";
//import AddRestaurantScreen from "./AddRestaurant";
//import RestaurantScreen from "../screens/Restaurants/Restaurant";
//import AddReviewRestaurantScreen from "../screens/Restaurants/AddReviewRestaurant";

const LoginScreenStacks = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Ingresar"
    })
  }
});

export default LoginScreenStacks;

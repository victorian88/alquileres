import { createStackNavigator } from "react-navigation-stack";
import RestaurantsScreen from "./Restaurants";
import AddRestaurantScreen from "./AddRestaurant";
import EditAlquilerScreen from "./screens/EditComentario";
import RestaurantScreen from "./screens/Restaurant";
import AddComentarioScreen from "./screens/AddComentario";
//import RestaurantScreen from "../screens/Restaurants/Restaurant";
//import AddReviewRestaurantScreen from "../screens/Restaurants/AddReviewRestaurant";

const RestaurantsScreenStacks = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: () => ({
      title: "Propiedades"
    })
  },
  AddRestaurant: {
    screen: AddRestaurantScreen,
    navigationOptions: () => ({
      title: "Nuevo Propiedad"
    })
  },
  Restaurant: {
    screen: RestaurantScreen,
    navigationOptions: props => ({
      title: props.navigation.state.params.restaurant.name
    })
  },
  AddComentario: {
    screen: AddComentarioScreen,
    navigationOptions: props => ({
      title: "Nuevo Alquiler"
    })
  },
  EditAlquiler: {
    screen: EditAlquilerScreen,
    navigationOptions: props => ({
      title: "Editar Alquiler"
    })
  }
});

export default RestaurantsScreenStacks;

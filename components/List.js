import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Image } from "react-native-elements";
import * as firebase from "firebase";
//import firebase from "react-native-firebase";

export default function List(props) {
  firebase.database().goOffline();
  const { restaurants, isLoading, handleLoadMore, navigation } = props;

  return (
    <View>
      {restaurants ? (
        <FlatList
          data={restaurants}
          renderItem={restaurant => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando restaurantes</Text>
        </View>
      )}
    </View>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { name, direccion } = restaurant.item.restaurant;
  //const [imageRestaurant, setImageRestaurant] = useState(null);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Restaurant", {
          restaurant: restaurant.item.restaurant
        })
      }
    >
      <View style={styles.viewRestaurant}>
        <View>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.restaurantAddress}>{direccion}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loadingRestaurants}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundRestuants}>
        <Text>No quedan restaurantes por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingRestaurants: {
    marginTop: 20,
    alignItems: "center"
  },
  viewRestaurant: {
    flexDirection: "row",
    margin: 10
  },
  viewRestaurantImage: {
    marginRight: 15
  },
  imageRestaurant: {
    width: 80,
    height: 80
  },
  restaurantName: {
    fontWeight: "bold"
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey"
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10
  },
  notFoundRestuants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center"
  }
});

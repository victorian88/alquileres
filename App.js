import React from "react";
import Navigation from "./app/Navigation";

import { firebaseApp } from "./app/utils/FireBase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);
export default function App() {
  return <Navigation />;
}

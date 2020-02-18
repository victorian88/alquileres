import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, AppRegistry } from "react-native";
import { Button, Input } from "react-native-elements";
import Calendar from "react-native-calendar-select";
//import Dates from "react-native-dates";
import moment from "moment";
import Toast from "react-native-easy-toast";
import Loading from "../components/Loading";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
export default function addComentario(props) {
  const { navigation } = props;
  const { idRestaurant } = navigation.state.params;
  const [inquilino, setInquilino] = useState("");
  const [fechaIni, setFechaini] = useState(new Date());
  const [fechaFin, setFechafin] = useState("");
  const [senia, setSenia] = useState("0.0");
  const [pago, setPago] = useState("0.0");
  const [numero, setNumero] = useState("");
  const [comentario, setComentario] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();
  const localNotification = { title: "done", body: "done!" };
  const handleNotification = () => {
    console.warn("ok! got your notif");
  };

  const askNotification = async () => {
    // We need to ask for Notification permissions for ios devices
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && status === "granted")
      console.log("Notification permissions granted.");
  };

  useEffect(() => {
    askNotification();
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener = Notifications.addListener(handleNotification);
    return () => listener.remove();
  }, []);
  const addComentario = () => {
    if (!inquilino) {
      toastRef.current.show("Debe cargar inquilino");
    } else if (!fechaIni || !fechaFin) {
      toastRef.current.show("Debe cargar Fechas");
    } else {
      setIsLoading(true);
      const user = firebase.auth.currentUser;
      const payload = {
        idRestaurant: idRestaurant,
        inquilino: inquilino,
        numero: numero,
        senia: senia,
        pago: pago,
        fechaIni: fechaIni,
        fechaFin: fechaFin,
        comentario: comentario,
        createAt: new Date()
      };

      //Keyboard.dismiss();
      const schedulingOptions = {
        time: new Date().getTime() + Number(20000)
      };
      // Notifications show only when app is not active.
      // (ie. another app being used or device's screen is locked)
      Notifications.scheduleLocalNotificationAsync(
        localNotification,
        schedulingOptions
      );

      db.collection("reservas")
        .add(payload)
        .then(() => {
          setIsLoading(false);
          navigation.goBack();
        })
        .catch(() => {
          toastRef.current.show("error al enviar la reserva");
          setIsLoading(false);
        });
    }
  };
  confirmDate = ({ startDate, endDate, startMoment, endMoment }) => {
    setFechaini(startDate), setFechafin(endDate);
  };
  openCalendar = () => {
    this.calendar && this.calendar.open();
  };
  let customI18n = {
    w: ["", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
    weekday: [
      "",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    text: {
      start: "Check in",
      end: "Check out",
      date: "Date",
      save: "Confirm",
      clear: "Reset"
    },
    date: "DD / MM" // date format
  };
  let color = {
    subColor: "#f0f0f0"
  };
  return (
    <View style={styles.viewBody}>
      <ScrollView>
        <View style={styles.formComentario}>
          <Input
            style={styles.input}
            label="Inquilino"
            containerStyle={styles.input}
            onChange={e => setInquilino(e.nativeEvent.text)}
          />
          <Input
            style={styles.input}
            label="Teléfono"
            containerStyle={styles.input}
            onChange={e => setNumero(e.nativeEvent.text)}
          />

          <Input
            label="Seña"
            //placeholder="Seña"
            value={senia}
            keyboardType="numeric"
            type="number"
            containerStyle={styles.input}
            onChange={e => setSenia(e.nativeEvent.text)}
          />
          <Input
            label="Pago"
            //placeholder="Seña"
            value={pago}
            keyboardType="numeric"
            type="number"
            containerStyle={styles.input}
            onChange={e => setPago(e.nativeEvent.text)}
          />
          <Input
            //  style={styles.comentario}
            label="Comentario"
            multiline={true}
            containerStyle={styles.input}
            onChange={e => setComentario(e.nativeEvent.text)}
          />

          <Button
            style={{ marginBottom: 10 }}
            title="Seleccionar Fecha"
            onPress={openCalendar}
          />
          {fechaIni.length != 0 ? (
            <Text
              style={{
                fontSize: 18,
                color: "blue",
                fontWeight: "bold",
                marginBottom: 15
              }}
            >
              {moment(fechaIni)
                .format("DD/MM/YYYY")
                .toString()}
            </Text>
          ) : (
            <Text> </Text>
          )}
          <Button
            style={{ marginTop: 10 }}
            title="Guardar"
            onPress={addComentario}
          />
        </View>

        <Calendar
          i18n="en"
          ref={calendar => {
            this.calendar = calendar;
          }}
          customI18n={customI18n}
          color={color}
          format="YYYYMMDD"
          minDate="20200201"
          maxDate="20400312"
          startDate={fechaIni}
          endDate={fechaFin}
          onConfirm={({ startDate, endDate }) => {
            setFechaini(startDate), setFechafin(endDate);
          }}
        />
      </ScrollView>
      <Toast
        ref={toastRef}
        //  position="center"
        positionValue={300}
        opacity={0.5}
      />
      <Loading isVisible={isLoading} text="Guardando Reserva" />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  formComentario: {
    margin: 10,
    marginTop: 5,
    //flex: 1,
    alignItems: "center"
  },
  input: {
    marginBottom: 2
  },
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 20
  },
  date: {
    marginTop: 50
  },
  focused: {
    color: "blue"
  }
});

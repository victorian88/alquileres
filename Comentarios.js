import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button } from "react-native-elements";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
export default function Reservas(props) {
  const { navigation, idRestaurant } = props;
  const [comentarios, setComentarios] = useState([]);
  const [recargarComentario, setRecargarComentario] = useState(false);
  useEffect(() => {
    (async () => {
      const resultComentarios = [];
      db.collection("reservas")
        .where("idRestaurant", "==", idRestaurant)
        .get()
        .then(response => {
          response.forEach(doc => {
            resultComentarios.push(doc.data());
          });

          setComentarios(resultComentarios);
        });

      setRecargarComentario(false);
    })();
  }, [recargarComentario]);
  return (
    <View>
      <FlatList
        data={comentarios}
        renderItem={comentario => <FunctComentario comentario={comentario} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        buttonStyle={styles.btnAddComentario}
        titleStyle={styles.btnTitleAddComentario}
        title="Añadir reserva"
        icon={{
          type: "material-community",
          name: "square-edit-outline",
          color: "#00a680"
        }}
        onPress={() =>
          navigation.navigate("AddComentario", {
            idRestaurant: idRestaurant
          })
        }
      />

      <Calendar
        // Initially visible month. Default = Date()
        current={"2020-02-07"}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={"2019-01-10"}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={"2030-05-30"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log("selected day", day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => <Arrow />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={true}
        // Show week numbers to the left. Default = false
        showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={substractMonth => substractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={true}
        // Disable right arrow. Default = false
        disableArrowRight={true}
        // Collection of dates that have to be colored in a special way. Default = {}
        markedDates={{
          "2020-02-20": { textColor: "green" },
          "2020-02-22": { startingDay: true, color: "green" },
          "2020-02-23": {
            selected: true,
            endingDay: true,
            color: "green",
            textColor: "gray"
          },
          "2020-02-04": {
            disabled: true,
            startingDay: true,
            color: "green",
            endingDay: true
          }
        }}
        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
        markingType={"period"}
      />
    </View>
  );
}

function FunctComentario(props) {
  const {
    inquilino,
    fechaIni,
    fechaFin,
    senia,
    pago,
    numero,
    comentario
  } = props.comentario.item;
  const fechaDesde = new Date(fechaIni.seconds * 1000);
  const fechaHasta = new Date(fechaFin.seconds * 1000);
  return (
    <View style={styles.viewReview}>
      <View style={styles.viewInfo}>
        <Text style={styles.fecha}>
          {fechaDesde.getDate()}/{fechaDesde.getMonth() + 1}/
          {fechaDesde.getFullYear()} -- {fechaHasta.getDate()}/
          {fechaHasta.getMonth() + 1}/{fechaHasta.getFullYear()}
        </Text>
        <Text style={styles.senia}>
          Seña: ${senia} ***** Pago: $ {pago}
        </Text>
      </View>
      <View style={styles.viewInfo2}>
        <Text style={styles.inquilino}>{inquilino}</Text>
        <Text style={styles.pago}> Tel: {numero}</Text>
      </View>
      <View style={styles.coment}>
        <Text style={styles.comentario}>{comentario}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  btnAddComentario: {
    backgroundColor: "transparent"
  },
  btnTitleAddComentario: {
    color: "#00a680"
  },
  viewReview: {
    flexDirection: "row",
    margin: 10,
    paddingBottom: 10,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1
  },
  viewInfo: {
    //flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  viewInfo2: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center"
  },
  inquilino: {
    fontWeight: "bold",
    paddingLeft: 5
  },
  senia: {
    // fontWeight: "bold",
    paddingLeft: 5
  },
  fecha: {
    fontWeight: "bold",
    color: "red"
  },
  comentario: {
    // fontWeight: "bold",
    alignItems: "center"
  },
  coment: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  }
});

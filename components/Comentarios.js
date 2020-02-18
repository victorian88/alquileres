import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button } from "react-native-elements";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { firebaseApp } from "../utils/FireBase";
import TimerNotification from "../components/Notification";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
const db = firebase.firestore(firebaseApp);
export default function Reservas(props) {
  const { navigation, idRestaurant } = props;
  const [comentarios, setComentarios] = useState([]);
  const [m, setM] = useState({});
  const [recargarComentario, setRecargarComentario] = useState(false);
  const getDateForCalendar = date => {
    const dt = new Date(date);
    const yr = dt.getFullYear();
    const month = `${dt.getMonth() + 1 < 10 ? 0 : ""}${dt.getMonth() + 1}`;
    const d = `${dt.getDate() < 10 ? 0 : ""}${dt.getDate()}`;
    // console.log(`${yr}-${month}-${d}`);
    return `${yr}-${month}-${d}`;
  };
  const getAllDatesBetween = (fromDate, toDate) => {
    let curDate = fromDate;

    const datesForCalendar = {};
    datesForCalendar[getDateForCalendar(fromDate)] = {
      startingDay: true,
      color: "#FD2F40",
      textColor: "white"
    };

    while (moment(curDate) < moment(toDate)) {
      // if (curDate === fromDate) {
      curDate = new Date(curDate);
      //}
      curDate = new Date(curDate.setDate(curDate.getDate() + 1));
      // console.log(curDate);
      datesForCalendar[getDateForCalendar(curDate)] = {
        color: "#969696",
        textColor: "white"
      };
    }
    datesForCalendar[getDateForCalendar(toDate)] = {
      // selected: true,
      endingDay: true,
      color: "#FD2F40",
      textColor: "white"
    };

    /*   console.log(
      "[MANews][getAllDatesBetween]datesForCalendar",
      JSON.stringify(datesForCalendar)
    ); */

    return datesForCalendar;
  };
  useEffect(() => {
    (async () => {
      const resultComentarios = [];
      let fi = "";
      let ff = "";
      const m2 = [];
      let i = 0;
      let m3 = {};
      db.collection("reservas")
        .where("idRestaurant", "==", idRestaurant)
        .get()
        .then(response => {
          response.forEach(doc => {
            resultComentarios.push(doc.data());
            fi = doc.data().fechaIni;
            fi = new Date(fi.seconds * 1000);
            ff = doc.data().fechaFin;
            ff = new Date(ff.seconds * 1000);
            m2[i] = getAllDatesBetween(fi, ff);
            m2[i] = JSON.stringify(m2[i]);
            m2[i] = m2[i].slice(1, -1);
            //  m2[i] = m2[i].slice(2, -2);
            // m3 += m2[i];
            i++;
          });
          m3 = m2.join();
          m3 = "{" + m3 + "}";
          setM(JSON.parse(m3));
          console.log(m3);

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
        markingType={"period"}
        // Collection of dates that have to be colored in a special way. Default = {}
        markedDates={m}
        //  markedDates={getAllDatesBetween("2020-02-18", "2020-02-20")}
        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
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
        <Text style={styles.coment}>{comentario}</Text>
      </View>
      <View style={styles.viewInfo2}>
        <Text style={styles.inquilino}>{inquilino}</Text>
        <Text style={styles.pago}> Tel: {numero}</Text>
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
    margin: 5,
    paddingBottom: -1,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
    marginBottom: 1
  },
  viewInfo: {
    //flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginBottom: -1
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
    paddingLeft: 5,
    paddingBottom: -1,
    color: "grey"
  }
});

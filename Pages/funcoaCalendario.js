import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const FcCalendario = ({ month, year }) => {
  // Função para obter o número de dias em um mês específico
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  // Cria uma matriz com o número de dias no mês
  const daysInMonth = getDaysInMonth(month, year);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Cria uma grade de dias do mês
  const renderCalendar = () => {
    return daysArray.map((day) => (
      <View key={day} style={styles.dayContainer}>
        <Text style={styles.dayText}>{day}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{`${month}/${year}`}</Text>
      <View style={styles.calendarContainer}>
        {renderCalendar()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dayContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
  },
  dayText: {
    fontSize: 16,
  },
});

export default FcCalendario;


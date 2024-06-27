import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { collection, onSnapshot, addDoc } from "firebase/firestore"; 
import { firestore } from "../Firebase"; 
import { getAuth } from 'firebase/auth';

interface State {
  items?: AgendaSchedule;
  markedDates?: { [key: string]: any };
  loading: boolean;
}

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  today: "hoje"
};
LocaleConfig.defaultLocale = 'br';

export default class AgendaScreen extends Component<{}, State> {
  state: State = {
    items: {},
    markedDates: {},
    loading: true,
  };

  componentDidMount() {
    this.loadItems();
  }

  loadItems = () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error('Usuário não autenticado');
      return;
    }

    const unsubscribeLembretesPessoais = onSnapshot(collection(firestore, 'LembretePessoais'), (querySnapshot) => {
      this.processSnapshot(querySnapshot, userId);
    });

    return () => {
      unsubscribeLembretesPessoais();
    };
  };

  processSnapshot = (querySnapshot, userId) => {
    const items = { ...this.state.items };
    const markedDates = { ...this.state.markedDates };

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Data do documento:", data);

      if (data.userId === userId) {
        const timestamp = data.data;
        const date = timestamp.toDate();
        console.log("Data convertida:", date);

        const formattedDate = this.formatDate(date);
        console.log("Data formatada:", formattedDate);
        
        if (!items[formattedDate]) {
          items[formattedDate] = [];
        }

        // Evita duplicação de lembretes
        const existingItem = items[formattedDate].find(item => item.name === data.titulo && item.texto === data.texto);
        if (!existingItem) {
          items[formattedDate].push({
            name: data.titulo,
            texto: data.texto,
            cor: data.cor,
          });
          markedDates[formattedDate] = { marked: true, dotColor: data.cor };
        }
      }
    });

    console.log("Itens:", items);

    this.setState({
      items: items,
      markedDates: markedDates,
      loading: false
    });
  };

  formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  adicionarLembrete = async (titulo, texto, data, cor) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error('Usuário não autenticado');
      return;
    }

    try {
      const docRef = await addDoc(collection(firestore, 'LembretePessoais'), {
        userId: userId,
        titulo: titulo,
        texto: texto,
        data: data,
        cor: cor
      });
      console.log("Documento escrito com ID: ", docRef.id);
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
    }
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#318B70" />;
    }

    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={(r1, r2) => r1.name !== r2.name}
        showClosingKnob={true}
        markingType={'period'}
        markedDates={this.state.markedDates}
        monthNames={'yyyy'}
        theme={{
          calendarBackground: '#318B70',
          agendaDayTextColor:'#318B70',
          textMonthFontSize: 15,
          monthTextColor: '#ffff',
          dayTextColor: 'black', 
          textMonthFontFamily:'BrunoAce-Regular',
          textDayHeaderFontFamily:'BrunoAce-Regular',
          agendaKnobColor: 'black',
          selectedDotColor: 'white', 
          dotStyle: { width: 25, height: 5, borderRadius: 5, marginTop: 1 },
        }}
        renderDay={this.renderDay}
        hideExtraDays={false}
        showOnlySelectedDayItems
        reservationsKeyExtractor={this.reservationsKeyExtractor}
      />
    );
  }

  reservationsKeyExtractor = (item, index) => {
    return `${item?.day}${index}`;
  };

  renderDay = (day) => {
    if (day) {
      return <View style={styles.customDay} />;
    }
    return <View style={styles.dayItem}/>;
  };

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 18 : 14;
    const color = isFirst ? 'white' : 'white';

    console.log("Item de reserva:", reservation);

    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={styles.titulo}>{reservation.name}</Text>
        <Text style={styles.label}>{reservation.texto}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={{ color: 'black' }}>Sem lembretes salvos</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#E4D5C7',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green'
  },
  dayItem: {
    marginLeft: 34
  },
  label: {
    fontSize: 13,
    fontFamily: 'BrunoAce-Regular',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'BrunoAce-Regular',
    marginBottom: 10,
  }
});

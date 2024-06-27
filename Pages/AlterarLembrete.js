import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firestore } from "../Firebase"; // Verifique se a importação do Firestore está correta
import { collection, updateDoc, doc } from "firebase/firestore";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AlterarLembrete({ route }) {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'BrunoAce-Regular': require('../assets/fonts/BrunoAce-Regular.ttf'),
  });

  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [data, setData] = useState(new Date());
  const [modo, setModo] = useState('date');
  const [show, setShow] = useState(false);
  const [textodata, setTextodata] = useState('Escolha uma data');
  const [selectedColor, setSelectedColor] = useState({
    image: require('../assets/tomate.png'),
    text: 'Tomate',
    cor: '#FF6347',
  });
  const [mostrarCores, setMostrarCores] = useState(false);

  useEffect(() => {
    if (route.params) {
      const { titulo, texto, data } = route.params;
      setTitulo(titulo || '');
      setTexto(texto || '');
      // Verifica se data é um objeto Timestamp do Firestore
      setData(validateTimestamp(data) ? data.toDate() : new Date());
    }
  }, [route.params]);

  const validateTimestamp = (timestamp) => {
    return timestamp && typeof timestamp.toDate === 'function';
  };

  if (!fontsLoaded) {
    return null;
  }

  const mudar = (event, selecionaData) => {
    if (event.type === 'set') {
      const atualData = selecionaData || data;
      setData(atualData);

      let tempData = new Date(atualData);
      let fData = tempData.getDate() + '/' + (tempData.getMonth() + 1) + '/' + tempData.getFullYear();
      setTextodata(fData);
    } else {
      setShow(false);
    }
  };

  const showModo = (currentMode) => {
    setShow(true);
    setModo(currentMode);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setMostrarCores(false);
  };

  const colors = [
    { text: 'Tomate', image: require('../assets/tomate.png'), cor: '#FF6347' },
    { text: 'Azul', image: require('../assets/azul.png'), cor: '#72A6E3' },
    { text: 'Banana', image: require('../assets/banana.png'), cor: '#FFE866' },
    { text: 'Uva', image: require('../assets/uva.png'), cor: '#8145E3' },
    { text: 'Tangerina', image: require('../assets/tangerina.png'), cor: '#DD4124' },
    { text: 'Manjericão', image: require('../assets/manjericao.png'), cor: '#4A8740' },
    { text: 'Lavanda', image: require('../assets/lavanda.png'), cor: '#9889F4' },
  ];

  const alterarLembrete = async () => {
    try {
      const docRef = doc(firestore, "LembretePessoais", route.params.id);
      await updateDoc(docRef, {
        titulo: titulo,
        texto: texto,
        cor: selectedColor.cor,
        data: validateTimestamp(data) ? data.toDate() : data, // Verifique a disponibilidade e importação correta de firestore
      });
      Alert.alert(":)", "Lembrete Alterado");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao alterar Lembrete: ", error);
      Alert.alert("Erro", "Erro ao alterar Lembrete. Por favor, tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.closeButton}>
        <MaterialCommunityIcons name="close-thick" size={50} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lembretes</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          placeholder="Título do lembrete"
          onChangeText={setTitulo}
          value={titulo}
        />

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          placeholder="Texto do lembrete"
          onChangeText={setTexto}
          value={texto}
        />

        <Text style={styles.label}>Data:</Text>
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.dateTimeButton} onPress={() => showModo('date')}>
            <Text>{textodata}</Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID='dateTime'
              value={data}
              mode={modo}
              is24Hour={true}
              display='default'
              onChange={mudar}
            />
          )}
        </View>

        <Text style={styles.label}>Cor:</Text>
        <TouchableOpacity style={styles.colorButton} onPress={() => setMostrarCores(true)}>
          <View style={styles.colorSelect}>
            <Image source={selectedColor.image} style={{ width: 30, height: 35 }} />
            <Text style={styles.colorText}>{selectedColor.text}</Text>
          </View>
        </TouchableOpacity>
        {mostrarCores && (
          <View style={styles.colorPicker}>
            {colors.map((color, index) => (
              <TouchableOpacity key={index} onPress={() => handleColorSelect(color)}>
                <View style={styles.colorSelect}>
                  <Image source={color.image} style={{ width: 30, height: 35, marginBottom: 20 }} />
                  <Text style={styles.colorText}>{color.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={alterarLembrete}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>Alterar Lembrete</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#236E57',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    alignItems: 'flex-end',
    width: 350,
  },
  headerText: {
    fontSize: 35,
    fontFamily: 'BrunoAce-Regular',
    color: '#FFFFFF',
  },
  form: {},
  label: {
    fontSize: 16,
    color: '#E4D5C7',
    fontFamily: 'BrunoAce-Regular',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#E4D5C7',
    fontFamily: 'BrunoAce-Regular',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateTimeButton: {
    backgroundColor: '#E4D5C7',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  colorButton: {
    marginBottom: 20,
  },
  colorSelect: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorText: {
    marginLeft: 10,
    fontFamily: 'BrunoAce-Regular',
    color: '#E4D5C7',
  },
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  submitButton: {
    width: 300,
    height: 50,
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: '#174738',
    backgroundColor: '#236E57',
    transform: [{ translateY: -5 }],
  },
  submitText: {
    fontSize: 17,
    fontFamily: 'BrunoAce-Regular',
    color: '#E4D5C7',
  },
});

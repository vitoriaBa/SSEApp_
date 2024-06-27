import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Alert, Dimensions, ImageBackground } from 'react-native';
import { firestore } from "../Firebase";
import { collection, onSnapshot, deleteDoc, doc, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const navigation = useNavigation();
  const [lembretesPessoais, setLembretesPessoais] = useState([]);
  const [lembretesSecretaria, setLembretesSecretaria] = useState([]);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [userId, setUserId] = useState(null);
  const auth = getAuth();

  async function deletarPessoal(id) {
    try {
      await deleteDoc(doc(firestore, "LembretePessoais", id));
      Alert.alert("Seu lembrete pessoal foi deletado com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar Lembrete Pessoal:", error);
    }
  }

 /* async function deletarSecretaria(id) {
    try {
      await deleteDoc(doc(firestore, "LembreteSecretaria", id));
      Alert.alert("O lembrete da secretaria foi deletado com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar Lembrete da Secretaria:", error);
    }
  }*/

  const alertDeletar = (id, titulo, texto, data, tipo) => {
    Alert.alert('Deseja excluir ou alterar esse lembrete?', '', [
      { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'Deletar', onPress: () => tipo === 'pessoal' ? deletarPessoal(id) : deletarSecretaria(id), color: 'red' },
      { text: 'Alterar', onPress: () => navigation.navigate('AlterarLembrete', { id, titulo, texto, data }), style: 'default', color: 'green' },
    ]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setAuthInitialized(true);
      } else {
        setUserId(null);
        setAuthInitialized(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authInitialized || !userId) return;

    const qPessoais = query(collection(firestore, 'LembretePessoais'), where('userId', '==', userId));
  //  const qSecretaria = query(collection(firestore, 'LembreteSecretaria'), where('userId', '==', userId));

    const unsubscribePessoais = onSnapshot(qPessoais, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setLembretesPessoais(data);
    });

    const unsubscribeSecretaria = onSnapshot(collection(firestore, 'LembreteSecretaria'), (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setLembretesSecretaria(data);
    });

    return () => {
      unsubscribePessoais();
      unsubscribeSecretaria();
    };
  }, [authInitialized, userId]);

  return (
    <View style={[styles.fundo, { width: windowWidth, height: windowHeight }]}>
      <View style={[styles.container, { width: windowWidth, height: windowHeight }]}>
        <ImageBackground source={require('../assets/fundousuario.png')} style={styles.usuarioContainer}>
          <View style={styles.header}>
            <Image style={styles.img} source={require('../assets/LogoBranca.png')} />
            <TouchableOpacity onPress={() => navigation.navigate('Usuario')}>
              <Image style={styles.img} source={require('../assets/usuario.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textoususario}>Olá</Text>
        </ImageBackground>

        <View style={styles.Avisos}>
        

         <FlatList
         
            data={lembretesSecretaria}
            renderItem={({ item }) => {
           //   const data = item.data ? new Date(item.data.seconds * 1000) : null;

              return (
                <View style={styles.contSecretaria }>
                <Text style={[styles.TituloA, { backgroundColor: item.color }]}>Aviso Principal</Text>
                <View style={[styles.AvisoContainer, { borderColor: item.color }]}>
                  
                  <View style={styles.Titulocontainer}>
                    <Text style={styles.Titulo}>{item.title}</Text>
                    {/*{data && (
                      <Text><Text style={styles.data}>{data ? `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}` : ''}</Text></Text>
                    )}*/}
                   
                  </View>
                  <Text style={styles.texto}><Text style={styles.texto}>{item.descrição}</Text></Text>
                </View>
                </View>
              );
            }}
          />

          <FlatList
       
            data={lembretesPessoais}
            renderItem={({ item }) => {
              const data = item.data ? new Date(item.data.seconds * 1000) : null;

              return (
                <View style={[styles.AvisoContainer, { borderColor: item.cor }]}>
                  <View style={styles.Titulocontainer}>
                    <Text style={styles.Titulo}>{item.titulo}</Text>
                    {data && (
                      <Text> <Text style={styles.data}>{data ? `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}` : ''}</Text></Text>
                    )}
                    <TouchableOpacity onPress={() => alertDeletar(item.id, item.titulo, item.texto, data, 'pessoal')}>
                      <MaterialCommunityIcons name="dots-vertical" size={30} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.texto}> <Text style={styles.texto}>{item.texto}</Text></Text>
                </View>
              );
            }}
          />
          
          
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  fundo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#206550',
    padding: 0,
    margin: 0,
   
  },
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  
    borderRadius: 30,
    borderBottomRadius: 50,
    padding: 0,
    borderWidth: 10,
    borderColor: '#206550',
    margin: 0,
  },
  Titulocontainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily: 'BrunoAce-Regular',
  },
  Avisos: {
     flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  },
  usuarioContainer: {
    width: 350,
    height: 150,
    margin: 20,
    padding: 20,
  },
  textoususario: {
    fontSize: 16,
    margin: 4,
    fontFamily: 'BrunoAce-Regular',
    color: '#FFFFFF',
  },
  AvisoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    width: 350,
    padding: 20,
    height: 150,
    borderWidth: 3,
    borderBottomWidth: 10,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  contSecretaria:{
    alignItems:'center',
    //backgroundColor: '#555',
  },
  Titulo: {
    fontSize: 18,
    marginRight: 30,
    fontFamily: 'BrunoAce-Regular',
  },
  TituloA:{
    justifyContent: 'center',
  alignItems:'center',
  textAlign:'center',
  color:'#FFFFFF',
 backgroundColor: '#010',
width:200,
borderTopLeftRadius:100,
borderTopRightRadius:100,
fontFamily: 'BrunoAce-Regular',
  },
  data: {
    fontSize: 13,
    color: '#555',
    fontFamily: 'BrunoAce-Regular',
    marginRight: 35,
  },
  texto: {
    fontSize: 15,
    fontFamily: 'BrunoAce-Regular',
  },
  img: {
    width: 50,
    height: 50,
  },
});
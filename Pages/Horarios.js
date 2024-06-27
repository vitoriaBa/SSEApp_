import React from 'react'; 
import  { useState,useEffect } from 'react';
import {Text,View, SafeAreaView, FlatList,StyleSheet,TextInput,Image,TouchableOpacity,Dimensions, } from 'react-native';
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"; 
import { firestore } from "../Firebase"; 
import { useNavigation} from '@react-navigation/native';


 export default function Horarios({route}){
  const navi = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [horas, setHoras] = useState([]);
  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'horarios'), (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setHoras(data);
    });

    return () => unsubscribe();
  }, []);


  return (
    <View  style={[styles.fundo, { width: windowWidth, height:windowHeight }]}>
    <View  style={[styles.container ,{ width: windowWidth,  height:windowHeight }]}>
      
      <View style={styles.containerTitulo}>
      <View style={styles.inline}>
        <TouchableOpacity style={styles.butonTitulo}
       onPress={() => navi.navigate('Home')}
        >
          <Image style={styles.img} source={require('../assets/setaE.png')}></Image>
        </TouchableOpacity>

        <Text style={styles.Titulo}>Horários</Text>

        <TouchableOpacity style={styles.butonTitulo}
        onPress={() => navi.navigate('Usuario')}>
        <Image style={styles.img} source={require('../assets/usuario.png')}></Image>
         </TouchableOpacity>
         </View>
      </View>


    
        
            <Text style={styles.texto}>Curso:</Text>
            <View style={styles.form}>
            
        
           
            <TextInput
              style={styles.input}
              value='Desenvolvimento de sistemas'
            
            />


<View style={styles.inline}>


            <View style={styles.sob}>
              <Text style={styles.texto}>Horario:</Text>
              <TextInput
                style={styles.inputmed}
                value='Noite'
              />
            </View>
            <View style={styles.sob}>


              <Text style={styles.texto}>Modulo:</Text>
              <TextInput
                style={styles.inputmed}
                value='3'
              />
            </View>
          </View>
          <View style={styles.inline}>
          <TouchableOpacity style={styles.dias} ><Text style={styles.txt}>Seg</Text></TouchableOpacity>
          <TouchableOpacity style={styles.dias} ><Text style={styles.txt}>Ter</Text></TouchableOpacity>
          <TouchableOpacity style={styles.dias} ><Text style={styles.txt}>Qua</Text></TouchableOpacity>
          <TouchableOpacity style={styles.dias} ><Text style={styles.txt}>Qui</Text></TouchableOpacity>
          <TouchableOpacity style={styles.dias} ><Text style={styles.txt}>Sex</Text></TouchableOpacity>

            </View>


        {/*tabela*/}

          <View style={styles.tabelahorarios}> 

        
            <View style={styles.column}>
            <Text style={styles.Titulo}> 19h00 - 19h45 </Text>
            <Text style={styles.Titulo}> 19h45 - 20h30 </Text>
            <Text style={styles.Titulo}> 20h30 - 20h45</Text>
            <Text style={styles.Titulo}> 20h45 - 21h30 </Text>
            <Text style={styles.Titulo}> 21h30 - 22h15 </Text>
            <Text style={styles.Titulo}> 22h15 - 23h00 </Text>
       </View>
       <View style={styles.column}>
            <Text style={styles.texto}>{item.aula1}</Text>    
           <Text style={styles.texto}>{item.aula2}</Text> 
           <Text style={styles.Titulo}> Intervalo </Text>
           <Text style={styles.texto}>{item.aula3}</Text>
           <Text style={styles.texto}>{item.aula4}</Text>
           <Text style={styles.texto}>{item.aula5}</Text>
          </View>            
          <View style={styles.column}>
           <Text style={styles.texto}>{item.professor}</Text>    
           <Text style={styles.texto}>{item.professor}</Text> 
           <Text style={styles.Titulo}> 15min </Text>
           <Text style={styles.texto}>{item.professor}</Text>
           <Text style={styles.texto}>{item.professor}</Text>
           <Text style={styles.texto}>{item.professor}</Text>
       
                       </View>
 
          </View>
   
     </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fundo:{
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#206550',
    padding: 0,
    margin:0,
    position:'absolute',
  },
  
    container: {
      display:'flex',
      justifyContent: 'center',
      alignItems:'center',
      flexDirection:'column',
      backgroundColor:'#FFFFFF',
   
      height:750,
      borderRadius:30,
      borderBottomRadius:50,
      
      padding: 0,
      borderWidth:10,
      borderColor:'#206550',
      margin:0,
  
    },
img:{
  width:50,
  height:50,
},
  form:{
    marginBottom:50,
    justifyContent: 'center',
    alignItems:'center',
  },
 
  usuarioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    position:'relative',
  },

 Titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
 
  texto: {
    fontSize: 14,
    marginTop:12,
    marginLeft:12,
  },

  input: {
    textAlign: 'center',
    borderRadius: 5,
    margin: 5,
    width: 300,
    height: 50,
    borderBottomWidth:5,
    borderColor:'#174738',
    backgroundColor:'#206550',
    borderWidth: 0,
  },
  inputmed: {
    textAlign: 'center',
    borderRadius: 5,
    margin: 5,
    width: 130,
    height: 50,
    borderColor:'#174738',
    backgroundColor:'#206550',
    borderWidth: 0,
    borderBottomWidth:5,
  },
  tabelahorarios:{
    borderRadius: 10,
    margin: 5,
    width: 330,
    height: 300,
    borderBottomWidth:10,
    borderColor:'#95877A',
    backgroundColor:'#E4D5C7',
    borderWidth: 0,
  },
  dias:{
    marginTop:10,
    display:'flex',
    alignItems: 'center',
    justifyContent:'center',
    width: 50,
    height: 50,
    borderColor:'#95877A',
    backgroundColor:'#E4D5C7',
    borderWidth: 0,
    borderBottomWidth:5,
  },
  inline: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: '#236E57',
    width: 300,
    height: 70,
  
  },
  containerTitulo:{
    display:'flex',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#236E57',
    borderRadius: 20,
    width: 340,
    height: 80,
   
  },
  butonTitulo:{
    display:'flex',
    alignItems: 'center',
    justifyContent:'center',
    width: 30,
    height: 30,
    borderColor:'#174738',
    backgroundColor:'#236E57',
    borderWidth: 0,
    borderBottomWidth:5,
  }
});


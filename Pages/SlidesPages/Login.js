import React from 'react'; 

import { Text, SafeAreaView, StyleSheet,View,Image,TouchableOpacity,ImageBackground, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useState, useEffect } from 'react';

import { getAuth,onAuthStateChanged,signInWithEmailAndPassword} from 'firebase/auth';
import { Initializing} from 'firebase/app';
import Firebase from '../../Firebase';
import { useFonts} from 'expo-font';




export default function Login() {
  const auth = getAuth();
    const[email, setEmail]= useState('');
    const[senha, setSenha] = useState('');
    const[user, setUser]= useState('');
    const [initializing, setInitializing] = useState(true);
  
    const navi = useNavigation();
 
    function login() {
      signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          const user = userCredential.user;
          // Login bem-sucedido, redirecionar para a tela inicial, por exemplo
          navi.navigate('Home');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert('Usuário não encontrado','Senha ou Email incorretos');
        });
    }
    /*eu mudei essa parte do function login() */
    

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        if (Initializing) setInitializing(false);
    
        if (user) {
          const userId = user.uid;
          
          navi.navigate('Home', userId);
        } else {
          // Usuário não está autenticado, fazer o que for necessário
        }
      });
    
      return () => unsubscribe();
    }, [user]); // user deve ser uma dependência válida para useEffect
    
    
   

  let [fontsLoaded, fontError] = useFonts({
    'BrunoAce-Regular': require('../../assets/fonts/BrunoAce-Regular.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
<ImageBackground source={require('../../assets/fundoLogin.png')} style={styles.image}>

<View style={styles.cima}>
 
 
</View>


<View style={styles.containertexto}>

<Text style={styles.titulo}>Login</Text> 


<View style={styles.opicoes}>
 
</View>

    <TextInput
    style={styles.input}
    placeholder="email"
    onChangeText={(email) => setEmail(email)}
    value={email}
    />

 
      <TextInput
    style={styles.input}
    placeholder="Senha"
    onChangeText={(senha) => setSenha(senha)}
    secureTextEntry={true}
    value={senha}
    />

 <View>
 <View style={styles.containerbutton}>
 <TouchableOpacity  style={styles.buttonTop && styles.buttonHover}
     
        onPress={()=>{
          login();
        //navi.navigate('Home');
      }}
      underlayColor={styles.buttonHover.backgroundColor} // Cor de fundo quando pressionado
    >
      <View style={styles.buttonTop}>
        <Text style={styles.txt}>Entrar</Text>
      </View>
    </TouchableOpacity>
</View>
    </View>

</View>

   </ImageBackground>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
   
  },
   image: {
    flex: 1,
    resizeMode: 'cover',

  },
  img:{
    marginTop:50,
    width:200,
    height:210,
  },
  titulo: {
    marginTop: 15,
    fontSize: 50,
    textAlign: 'center',
    color:'#174738',
    fontFamily:'BrunoAce-Regular',
  },
  input:{
    textAlign:'center',
    borderRadius:10,
    margin:5,
    width:300,
    height:50,
     backgroundColor:'#FFFFFF',
     borderColor:'#BBBBBB',
     borderWidth: 5,
  },
   texto: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily:'BrunoAce-Regular',
  },
  txt:{
    fontSize: 20,
fontFamily:'BrunoAce-Regular',
color:'#e8e8e8',

  },
  containertexto:{
      flex: 1,
      //marginTop:80,
      //position:'absolute',
    justifyContent: 'center',
       alignItems:'center',
    width:400,
margin:5,
     marginBottom:0
  },
  cima:{
       flex: 1,
    alignItems:'center',
  justifyContent: 'center',
  },

  buttonTop: {
    fontSize: 17,
    fontFamily:'BrunoAce-Regular',
    width:250,
    height:50,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 12, 
    borderWidth: 2,
    borderColor: '#174738', 
    backgroundColor: '#236E57', 
    color: '#000000',
    transform: [{ translateY: -5 }], 
  },
  buttonHover: {
    borderRadius: 12, 
    transform: [{ translateY: -9 }],
  },
 containerbutton:{
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  marginTop:20,
  width:350,
    height:70,
   // backgroundColor: '#e8e8e8', 
 },
  opicoes:{
    textAlign:'center',
   
    margin:5,
    width:300,
    height:50,
    
   
  }
  
});
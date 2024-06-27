import React from 'react'; 
import {useCallback} from 'react'; 
import { Text, SafeAreaView, StyleSheet, View, Image, ImageBackground, TouchableHighlight } from 'react-native';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useFonts } from 'expo-font';




//esse seria o pai
export default function Tela3() {
  const navi = useNavigation();
 
  const [fontsLoaded, fontError] = useFonts({
    'BrunoAce-Regular': require('../../assets/fonts/BrunoAce-Regular.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

 // animacao da bolinha
  /*const larguraAnimada = useSharedValue(10);

 const animatedStyle = useAnimatedStyle(() => {
   return {
     width: larguraAnimada.value, 
     height: 20,
     backgroundColor: '#174738',
     borderRadius: 50,
   };
 });

const iniciarAnimacao = useCallback(() => {
  larguraAnimada.value = withTiming(70, { duration: 500 });
}, [larguraAnimada]);


useFocusEffect(
  useCallback(() => {
    larguraAnimada.value = 20;
    iniciarAnimacao();
  }, [iniciarAnimacao, larguraAnimada])
);
*/

  return (
    <SafeAreaView style={styles.container}>
<ImageBackground source={require('../../assets/fundo3.png')} style={styles.image}>
<View style={styles.cima}>
 
    <Image style={styles.img} source={require('../../assets/frame3.png')}></Image>
      
</View>


<View style={styles.containertexto}>

<Text style={styles.titulo}>
Acessibilidade e comunicação
      </Text> 

       <Text style={styles.texto}>
       Tenha Uma maior Acessibilidade ao conversar com diversos usuários.
      </Text>

 <View>


 <View style={styles.bolinhasContainer}>

<View style={styles.Bolinha}></View>
<View style={styles.Bolinha}></View>
<View style={styles.Bolinha1}></View>



</View>

<View style={styles.containerbutton}>
 <TouchableHighlight style={styles.button && styles.buttonHover}
       onPress={() => {
       
        navi.navigate('Login');
      }}
      underlayColor={styles.buttonHover.backgroundColor} 
    >
      <View style={styles.buttonTop}>
        <Text  style={styles.txt}>Próximo</Text>
      </View>
    </TouchableHighlight>


    <TouchableHighlight style={styles.button && styles.buttonHover}
       onPress={() => {
       
        navi.navigate('Tela2Screen');
      }}
      underlayColor={styles.buttonHover.backgroundColor} 
    >
      <View style={styles.buttonTop2}>
        <Text  style={styles.txt2}>Voltar</Text>
      </View>
    </TouchableHighlight>
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
    width:400,
    height:400,
  },
  titulo: {
    margin: 24,
    fontSize: 32,
    textAlign: 'center',
    fontFamily:'BrunoAce-Regular',
  },
   texto: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily:'BrunoAce-Regular',
  },
  txt:{
marginLeft:45,
    fontSize: 16,
fontFamily:'BrunoAce-Regular',

  },
  containertexto:{
      flex: 1,
    justifyContent: 'center',
       alignItems:'center',
    width:400,
    marginTop:150,
     marginBottom:0
  },
  cima:{
       flex: 1,
    alignItems:'center',
    marginTop:20,
  justifyContent: 'center',
  },

 button: {
    borderRadius: 12, 
    backgroundColor: '#236E57',
    borderColor: '#174738',
    fontSize: 17,
    fontFamily:'BrunoAce-Regular',
  },
  buttonTop: {
    width:150,
    height:50,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 12, 
    borderWidth: 2,
    borderBottomWidth:5,
    borderColor: '#174738', 
    backgroundColor: '#236E57', 
    color: '#000000',
    transform: [{ translateY: -5 }], 
  },
  buttonTop2: {
    width:150,
    height:50,
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign:'center', 
    borderRadius: 12, 
    borderWidth: 2,
    borderBottomWidth:5,
    borderColor: '#174738', 
    backgroundColor: '#FFFFFF', 
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
  flexDirection:'row-reverse',
  justifyContent:'space-around',
  marginTop:20,
  width:350,
    height:70, 
 },
 bolinhasContainer:{
  flexDirection:'row',
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  justifyContent:'space-evenly',
  marginTop:20,
  width:350,
    height:40,
},
txt:{
  fontSize: 15,
fontFamily:'BrunoAce-Regular',
color:'#FFFFFF',

},
txt2:{
  fontSize: 15,
fontFamily:'BrunoAce-Regular',
color:'#174738',

},

 Bolinha:{
  width:20,
  borderRadius:50,
  height:20,
  backgroundColor:'#bbbb',
},
Bolinha1:{
  width:20,
  borderRadius:50,
  height:20,
  backgroundColor:'#174738',
}
 
  
});
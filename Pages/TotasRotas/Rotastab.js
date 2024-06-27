import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../Home';
import Chat from '../Chat';
import Calendario from '../Calendario';
import Horarios from '../Horarios';
import CriarLembrete from '../CriarLembrete';



const Tab = createBottomTabNavigator();

export default function Rotastab() {
  return (

    <Tab.Navigator   screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#206550',
        borderTopWidth: 0,
     
      }, 
      }}
      >



<Tab.Screen name="Home" component={Home}
options={{
  tabBarIcon: ({ color, size }) => (
    <MaterialCommunityIcons name="home-variant" color={'#FFFFFF'} size={40} />
  ),
}}
/>

      <Tab.Screen name="Calendario" component={Calendario}
     options={{
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="calendar-blank-outline" color={'#FFFFFF'} size={40} />
      ),
    }}
    />
     



    { /* <Tab.Screen name="Chat" component={Chat}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="chat-processing-outline" color={'#FFFFFF'} size={40} />
        ),
      }}
    
    />*/}


   {/*   <Tab.Screen name="Horarios" component={Horarios}
   options={{
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="clock-time-four-outline" color={'#FFFFFF'} size={30} />
    ),
  }}
/>*/}
 


 <Tab.Screen name=" " component={CriarLembrete} options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require('./imagenIcons/addbuton.png')}
              style={{
                width: 60,
                height: 71,
                boderColor:'#174738',
                borderEndWidth:10,
                bottom:20 
              }}
            />
          ),
        }}
      />

    </Tab.Navigator>

  );
}

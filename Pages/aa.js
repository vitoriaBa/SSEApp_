


import React from 'react';
import { useState } from 'react';
import { Calendar,Agenda } from 'react-native-calendars';
import { Text, SafeAreaView, StyleSheet, View,TextInput,TouchableOpacity} from 'react-native';

import { Card } from 'react-native-paper';


export default function Calendario() {
  const [items,setItems] = useState([]);
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }


// dia : DateData day
const loadItems = (dia) => {

  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = dia.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);

      if (!items[strTime]) {
        items[strTime] = [];
        
        const numItems = Math.floor(Math.random() * 3 + 1);
        for (let j = 0; j < numItems; j++) {
          items[strTime].push({
            name: 'Item for ',
            height:( Math.floor(Math.random() * 150)),
            dia: strTime
          });
        }
      }
    }
    const newItems = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  }, 1000);
};

const renderItem = (item) => {
  return (
    //<Text>{item}</Text>
   <TouchableOpacity>
      <View>
        <Card>
        <Text></Text>
        </Card>
      
      </View>
   </TouchableOpacity>
  );


}

  return (

      <View style={{flex:1,}} > 
    <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2017-05-16'}
        renderItem={renderItem}
        style={{ backgroundColor:'#174738',}}
        horizontal
      />
      </View>
 
  );
}

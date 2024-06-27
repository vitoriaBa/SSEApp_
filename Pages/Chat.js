import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    setMessages(prevMessages => [...prevMessages, { id: messages.length.toString(), text: message }]);
    setMessage('');
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesContainer}
        inverted
      />


      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Digite sua mensagem..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor:'#FFFFFF'
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#206550',
    marginBottom: 10,
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#206550',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Chat;

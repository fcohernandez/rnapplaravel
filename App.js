import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, Button, Alert } from 'react-native';

export default function App() {

  const [users, setUsers] = useState('')
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    fetch("http://192.168.18.169:8000/api/users")
      .then((response) => response.json())
      .then((json) => {
        setUsers(json)
        setLoading(false)
        console.log(json)
      })
  }

  const createUser = () => {
    fetch("http://192.168.18.169:8000/api/users", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
    .then(response => response.json())
    .then(json => {
      Alert.alert('usuario creado con éxito!!')
      getUsers()
    })
  }

  return (
    <View style={styles.container}>
      {loading ? 
        <ActivityIndicator size="large" color="#072cc1" /> :
        users.map(user => {
          return <Text key = {user.id}> Nombre: {user.name} Correo: {user.email}</Text>
        })
      }

      <Text style={{marginTop: 30, fontWeight: 'bold', fontSize: 18}}>Crear usuario</Text>
      
      <View style={{marginTop: 20}}>
        <Text>Nombre: </Text>
        <TextInput 
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}/>
        <Text>Correo: </Text>
        <TextInput 
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}/>
        <Text>Contraseña: </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}/>
        <Button
          title="Enviar"
          onPress={() => createUser()}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edecdc',
    alignItems: 'center',
    marginTop: 80
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: '#fff',
    marginTop: 15,
    width: 200,
    padding: 10
  }
});

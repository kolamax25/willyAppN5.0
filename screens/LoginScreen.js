import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import * as firebase from 'firebase';


export default class LoginScreen extends React.Component {

    constructor() {
        super();
        this.state = {
          username: "",
          password: "",
        };
      }

  login = async (username, password) => {
      if (username && password){
          try{
              const response = await await firebase.auth().signInWithEmailAndPassword(username,password)
              if (response){
                  this.props.navigation.navigate("Transaction")
              }
          }catch(error){
              switch(error.code){
                  case "auth/user-not-found":
                      Alert.alert("user is not found")
                      break;

                  case "auth/invalid-email":
                      Alert.alert("Something isn't right")
                      break;
              }
          }
      }
      else {
          Alert.alert("Enter something. Please.")
      }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

          <View>
            <Image
              source={require('../assets/booklogo.jpg')}
              style={{ width: 400, height: 400, }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 35,
                textDecorationLine: 'underline',
              }}>
              {' '}
              Willy App{' '}
            </Text>
          </View>

        <TextInput
              style={styles.InputBox}
              placeholder=" abc123@examplemail.com"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({
                  username: text,
                });
              }}
            />

            <TextInput
              style = {styles.InputBox}
              placeholder = " Password"
              secureTextEntry = {true}
              onChangeText = {(text) => {
                this.setState({
                  password: text,
                });
              }}
            />

            <TouchableOpacity
                style={styles.scanButton}
                onPress={() => {
                 this.login(this.state.username,this.state.password);
                }}>
                <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
    },
    displayText: {
      fontSize: 15,
      textDecorationLine: 'underline',
    },
    scanButton: {
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10,
      borderRadius: 15,
      height: 50,
      width: 75,
    },
    buttonText: {
      fontSize: 21,
    },
    InputView: {
      flexDirection: 'row',
    },
    InputBox: {
      borderWidth: 1.5,
      width: 250,
      height: 50,
      fontSize: 20,
      marginTop: 10,
    },
  
    submitButton: {
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10,
      borderRadius: 15,
    },
  });
  
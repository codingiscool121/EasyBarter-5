import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export default class settings extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }

  

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Changes password...
  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      var email = firebase.auth().currentUser;
      console.log(firebase.auth().currentUser)
      user.updatePassword(this.state.newPassword).then(() => {
        alert("Your password was updated, " + firebase.auth().currentUser.email +".");
      }).catch((error) => { alert("Something went wrong. Here are the specifics: " + error.message) });
    })
  }

  // Changes user's email...
  onChangeEmailPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(this.state.newEmail).then(() => {
        alert("Your email was changed, " + firebase.auth().currentUser.email + ".")
        this.props.navigation.navigate('login');
      }).catch((error) => { console.log(error.message); alert("Your email was not changed. Here's why: " + error.message) });
    })
  }
  
  
  signOut=()=>{
    const signout=firebase.auth().signOut()
    if(signout){
      this.props.navigation.navigate('login');
    }else{
        alert("We could not sign you out.");
    }
}
  render() {
    return (

      <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10,}}>
         <Text style={styles.text}>{"Account Settings for " + firebase.auth().currentUser.email + "⚙️"}</Text>
         <Text style={styles.text}>{"To change any account settings, you must enter your current password first."}</Text>
        <TextInput style={styles.textInput} value={this.state.currentPassword}
          placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({currentPassword: text}) }}
        />

        <TextInput style={styles.textInput} value={this.state.newPassword}
          placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({newPassword: text}) }}
        />

        <Button title="Change Password" onPress={this.onChangePasswordPress} />

        <TextInput style={styles.textInput} value={this.state.newEmail}
          placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
          onChangeText={(text) => { this.setState({newEmail: text}) }}
        />

        <Button title="Change Email" onPress={this.onChangeEmailPress} />
        
        <TouchableOpacity
        onPress={()=>{
            this.props.navigation.navigate('Drawer')
        }}
        >
            
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: { color: "black", fontWeight: "bold", textAlign: "center", fontSize: 20, },
  
  signOut:{
      justifyContent: 'center',
      alignSelf:'center',
      backgroundColor:'#ffcccb',
      fontWeight:'bold',
      color:'black',
      width:80,
      height:40, color:'black',
      marginTop: 1000,
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    color:'black',
},

  textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
});

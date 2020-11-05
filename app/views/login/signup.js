import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import firebase from "firebase";
import { db } from "../database/firebase";
import { Input } from "react-native-elements";
import styles from "../styleSheet/styleSheet";
import { darkGreen } from "../styleSheet/styleSheet";

export default class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
    dob: "",
    isPetShop: false,
    isNewUser: true,
  };

  submit = async () => {
    const {
      dob,
      password,
      phoneNumber,
      email,
      name,
      confirmPassword,
    } = this.state;

    if (
      dob == "" ||
      phoneNumber == "" ||
      password == "" ||
      email == "" ||
      name == "" ||
      confirmPassword == "" ||
      password != confirmPassword
    ) {
      if (
        !/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/i.test(
          name
        )
      ) {
        alert("Name field is invalid.");
        return false;
      }
      if (
        !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(
          dob
        )
      ) {
        alert("Date of birth is invalid.");
        return false;
      }
      if (new Date().getFullYear() - dob.substr(dob.length - 4) < 18) {
        alert("You must be over 18.");
        return false;
      }
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          email
        )
      ) {
        alert("Email is invalid.");
        return false;
      }
      alert("Password fields must be valid.");
      return false;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((e) => {
          const user = firebase.auth().currentUser;
          user
            .updateProfile({
              displayName: name,
            })
            .then((e) => {
              db.collection("users").doc(user.uid).set({
                name: this.state.name,
                dob: this.state.dob,
                email: this.state.email,
                isPetShop: this.state.isPetShop,
                isNewUser: this.state.isNewUser,
                uuid: user.uid,
              });
              user.sendEmailVerification();
              alert(
                `An email has been sent, please verify your account at ${email}`
              );
              this.props.navigation.navigate("Login");
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  render() {
    return (
      <View style={styles.signupLogoContainer}>
        <Image
          style={styles.logo2}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=ac29597a-9268-419f-8769-fa44ac76a5df",
          }}
        />
        <View style={styles.signupInputContainer}>
          <Input
            placeholder="NAME"
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            leftIcon={{
              type: "ionicons",
              name: "person-outline",
              size: 25,
              color: darkGreen,
              paddingRight: 10,
              paddingLeft: 5,
            }}
            errorStyle={{
              height: 0,
            }}
          />
          <Input
            placeholder="DD/MM/YYYY"
            value={this.state.dob}
            onChangeText={(dob) => this.setState({ dob })}
            leftIcon={{
              type: "font-awesome",
              name: "calendar",
              size: 20,
              color: darkGreen,
              paddingRight: 12,
              paddingLeft: 8,
            }}
            errorStyle={{
              height: 0,
            }}
          />
          <Input
            placeholder="EMAIL"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            leftIcon={{
              type: "ionicons",
              name: "mail-outline",
              size: 25,
              color: darkGreen,
              paddingRight: 10,
              paddingLeft: 5,
            }}
            errorStyle={{
              height: 0,
            }}
          />
          <Input
            placeholder="PASSWORD"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            leftIcon={{
              type: "ionicons",
              name: "lock-outline",
              size: 25,
              color: darkGreen,
              paddingRight: 10,
              paddingLeft: 5,
            }}
            errorStyle={{
              height: 0,
            }}
          />
          <Input
            placeholder="CONFIRM PASSWORD"
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
            leftIcon={{
              type: "ionicons",
              name: "lock-outline",
              size: 25,
              color: darkGreen,
              paddingRight: 10,
              paddingLeft: 5,
            }}
            errorStyle={{
              height: 0,
            }}
          />
        </View>

        <CheckBox
          title="Are you a pet shop?"
          checked={this.state.isPetShop}
          checkedColor={darkGreen}
          onPress={() => this.setState({ isPetShop: !this.state.isPetShop })}
          size={20}
          styles={{ marginBottom: 0 }}
        />

        <TouchableOpacity style={styles.landingButtons} onPress={this.submit}>
          <Text style={styles.landingButtonsText}>SIGN UP</Text>
        </TouchableOpacity>
        <Text
          style={styles.loginTitle}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          ALREADY HAVE AN ACCOUNT?{" "}
          <Text style={{ fontWeight: "bold" }}>{"LOGIN"}</Text>
        </Text>
      </View>
    );
  }
}

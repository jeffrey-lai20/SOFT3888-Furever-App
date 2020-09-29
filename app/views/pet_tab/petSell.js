import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { SearchBar } from "react-native-elements";
import firebase from "firebase";
import { AppLoading } from "expo";

const db = firebase.firestore();

let customFonts = {
  Roboto_400Regular,
  //   Roboto_700Bold,
};

export default class petSell extends React.Component {
  state = {
    lists: null,
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    db.collection("pet-sell-list")
      .get()
      .then((snapshot) => {
        const lists = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          lists.push(data);
        });
        this.setState({ lists: lists });
      });
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <View style={styles.buySellContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
              }}
              onPress={() => this.props.navigation.replace("petBuy")}>
              <Text style={{ fontFamily: "Roboto_400Regular" }}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#d7e5f7",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
              }}
              onPress={() => this.props.navigation.replace("petSell")}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Roboto_400Regular",
                }}>
                {" "}
                Sell{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 60, padding: 10, flexDirection: "row" }}>
            <Text
              style={{ textAlign: "center", padding: 10, fontWeight: "bold" }}>
              Current Listings
            </Text>

            <TouchableOpacity
              // style={styles.viewApplication}
              style={{
                backgroundColor: "#447ECB",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 34,
                width: 200,
              }}
              onPress={() => this.props.navigation.navigate("petSell1")}>
              <Text
                style={{
                  textAlign: "center",
                  padding: 10,
                  color: "#FFFFFF",
                  fontWeight: "bold",
                }}>
                Add New Listing
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categories}>
            {this.state.lists &&
              this.state.lists.map((doc) => {
                console.log(doc.uuid);
                return (
                  <Text>
                    {doc.name} - {doc.age} //
                  </Text>
                );
              })}
          </View>

          <View style={{ height: 50 }}>
            <TouchableOpacity
              style={styles.viewApplication}
              onPress={() => this.props.navigation.navigate("petSell3")}>
              <Text style={{ textAlign: "center", padding: 10 }}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
        return <AppLoading/>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buySellContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  categories: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  iconContainer: {
    padding: 20,
  },
  viewApplication: {
    backgroundColor: "#447ECB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,
  },
  listBox: {
    // width: 50,
    // height: 1,
    alignSelf: "stretch",
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#000",
    padding: 10,
    margin: 20,
  },
});

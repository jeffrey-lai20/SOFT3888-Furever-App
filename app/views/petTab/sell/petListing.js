import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import firebase from "firebase";
import { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../../styleSheet/styleSheet";
console.disableYellowBox = true;

// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
// https://picsum.photos/700
const db = firebase.firestore();

const deletePost = (doc_id) => {
  const deleteItemId = doc_id;
  db.collection("pet_listings").doc(deleteItemId).delete().then(function() {
       alert("deleted")
   }).catch(function(error) {
       alert("Error removing document: ", error);
   });

}

const SelfPetListing = (props) => {
  return (
    <View style={styles.cardContainer}>
      <Card elevation={5} styles={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 2,
              // aspectRatio: 1,
              paddingLeft: 10,
              paddingBottom: 10,
              paddingTop: 10,
              justifyContent: "center",
              // alignItems: "center",
              // aspectRatio: 1,
              // borderWidth: 1,
              // borderColor: "red"
            }}>
            <Image
              source={{ uri: props.photo }}
              style={{ aspectRatio: 1, borderRadius: 5 }}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 10,
            }}>
            <Card.Content>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Name: </Text>
                <Text>{props.petName}</Text>
              </Text>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Category: </Text>
                <Text>{props.category}</Text>
              </Text>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Breed: </Text>
                <Text>{props.breed}</Text>
              </Text>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Colour: </Text>
                <Text>{props.colour}</Text>
              </Text>
            </Card.Content>

            <View style={{ marginLeft: 10 }}>
              <Card.Actions style={styles.actionCard}>
                <Button style={styles.smallButtons}
                  onPress={() => props.navigation.navigate("sellPetProfile", {props})}>
                  <Text style={styles.smallButtonText}>View</Text>
                </Button>
                <Button style={styles.smallButtons}
                  onPress={() => props.navigation.navigate("updateSellApplication", {doc_id: props.doc_id})}>
                  <Text style={styles.smallButtonText}>Update</Text>
                </Button>
                <Button
                  style={styles.smallButtons}
                  // refresh page after deleted
                  onPress={() => deletePost(props.doc_id)}> 
                  <Text style={styles.smallButtonText}>Delete</Text>
                </Button>
              </Card.Actions>
              <Card.Actions style={styles.actionCard}>
                <Button style={styles.bigButton}
                onPress={() => props.navigation.navigate("offerApplications", {doc_id: props.doc_id})}>
                  <Text style={styles.bigButtonText}>View Offers</Text>
                </Button>
              </Card.Actions>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 10,
    // flexDirection: "row"
  },
  card: {
    //   margin: 5,
    // flexDirection: "row",
  },
  smallButtons: {
    flex: 1,
    borderColor: darkGreen,
    borderWidth: 1,
    marginLeft: 1.5,
    marginRight: 1.5,
    marginTop: 5,
    height: 25,
    // alignItems: "center",
    justifyContent: "center",
  },
  bigButton: {
    flex: 1,
    backgroundColor: darkGreen,
    // borderColor: "#447ECB",
    // borderWidth: 1,
    marginLeft: 1.5,
    marginRight: 1.5,
    marginTop: 5,
    height: 25,
    justifyContent: "center",
  },
  smallButtonText: {
    fontSize: 8,
    color: "black",
    // fontWeight: "bold",
  },
  bigButtonText: {
    fontSize: 8,
    color: "white",
    fontWeight: "bold",
  },
  actionCard: {
    // borderColor: "blue",
    // borderWidth: 1,
    margin: 0,
    padding: 0,
  },
});

export default SelfPetListing;

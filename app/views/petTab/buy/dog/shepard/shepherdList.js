import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  Avatar,
  ActivityIndicator,
  Card,
  Button,
  Searchbar,
  Portal,
  Modal,
  Provider,
  Paragraph,
} from "react-native-paper";
import { db } from "../../../../database/firebase";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import {onBuyTab} from "../../../../components/petTabComponents" 
import globalStyles, { darkGreen } from "../../../../styleSheet/styleSheet";

export default class shepherdList extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    visible: false,
    pullToRefresh: false,
  };

  async fetchData() {
    const dataArray = [];
    const seller = {};

    db.collection("pet_listings")
      .where("breed", "==", "German Shepherd")
      .get()
      .then((doc) => {
        doc.forEach(async (listingDoc) => {
          var uuid = listingDoc.data().uuid;
          await db
            .collection("users")
            .doc(uuid)
            .get()
            .then((user_doc) => {
              seller["name"] = user_doc.data().name;
              seller["photo"] = user_doc.data().photo;      
              seller["info"] = user_doc.data().profileText;      
            });
          dataArray.push({
            sellerName: seller.name,
            sellerPhoto: seller.photo,
            sellerInfo: seller.info,
            petName: listingDoc.data().name,
            category: listingDoc.data().category,
            breed: listingDoc.data().breed,
            colour: listingDoc.data().colour,
            age: listingDoc.data().age,
            gender: listingDoc.data().gender,
            size: listingDoc.data().size,
            location: listingDoc.data().location,
            price: listingDoc.data().price,
            behaviour: listingDoc.data().behaviour,
            health: listingDoc.data().health,
            training: listingDoc.data().training,
            additional: listingDoc.data().additionalInfo,
            photo: listingDoc.data().photo_link,
            doc_id: listingDoc.id,
          });
          this.setState({
            isLoading: false,
            data: [...dataArray],
          });
          delete seller.name;
          delete seller.photo;
          delete seller.info;
        });
      });
  }

  async componentDidMount() {
    this.fetchData();
  }

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.petName.toLowerCase().includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

  render() {
    return (
      <Provider>
          {onBuyTab(this.props.navigation)}
          <View style={styles.container}>
          <Searchbar
            style={globalStyles.searchBarSingle}
            placeholder="Search"
            onChangeText={this.searchFunction}
            value={this.state.searchText}
          />
          <Portal>
            <Modal
              style={{ backgroundColor: "transparent" }}
              visible={this.state.visible}
              onDismiss={() => {
                this.setState({ visible: false });
              }}
            >
              <Card elevation={5} style={{ margin: 10 }}>
                <Card.Cover
                  resizeMode={`cover`}
                  source={{
                    uri:
                      "https://www.blackmores.com.au/-/media/paw/articles/talking-breeds-german-shepherds-main.jpg?db=web",
                  }}
                />
                <Card.Title title="German Shepherd" />
                <Card.Content>
                  <Paragraph>
                    The German shepherd dog is a herding breed known for its
                    courage, loyalty and guarding instincts. This breed makes an
                    excellent guard dog, police dog, military dog, guide dog for
                    the blind and search and rescue dog. For many families, the
                    German shepherd is also a treasured family pet.
                  </Paragraph>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "flex-end" }}>
                  <Button
                    color={darkGreen}
                    onPress={() =>
                      this.props.navigation.navigate("shepherdInfo")
                    }
                  >
                    More info
                  </Button>
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>German Shepherd</Text>
            <Button
              color={darkGreen}
              onPress={() => {
                this.setState({ visible: true });
              }}
              mode="contained"
            >
              Information
            </Button>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              style={{ paddingBottom: 10 }}
              onRefresh={async () => {
                this.setState({
                  pullToRefresh: true,
                });
                await this.fetchData();
                this.setState({
                  pullToRefresh: false,
                });
              }}
              refreshing={this.state.pullToRefresh}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Card elevation={5} style={styles.card}>
                  <Card.Title
                    title={item.petName}
                    subtitle={item.sellerName}
                    left={(props) => (
                      <Avatar.Image
                        {...props}
                        size={40}
                        source={{
                          uri: item.sellerPhoto,
                        }}
                      />
                    )}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        paddingLeft: 10,
                        paddingBottom: 10,
                        paddingTop: 10,
                        paddingRight: 10,
                        width: 170,
                        height: 170,
                      }}
                    >
                      <Image
                        source={{ uri: item.photo }}
                        style={{ aspectRatio: 1, borderRadius: 5 }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 3,
                        justifyContent: "center",
                      }}
                    >
                      <Card.Content>
                        <Text numberOfLines={1} style={{ flex: 1 }}>
                          <Text style={{ fontWeight: "bold" }}>Age: </Text>
                          <Text>{item.age}</Text>
                        </Text>
                        <Text numberOfLines={1} style={{ flex: 1 }}>
                          <Text style={{ fontWeight: "bold" }}>Gender: </Text>
                          <Text>{item.gender}</Text>
                        </Text>
                        <Text numberOfLines={1} style={{ flex: 1 }}>
                          <Text style={{ fontWeight: "bold" }}>Location: </Text>
                          <Text>{item.location}</Text>
                        </Text>
                      </Card.Content>

                      <Card.Actions style={styles.actionCard}>
                        <Button
                          style={styles.bigButton}
                          mode="contained"
                          onPress={() =>
                            this.props.navigation.navigate("buyPetProfile", {
                              item,
                            })
                          }
                        >
                          <Text style={styles.bigButtonText}>More Info</Text>
                        </Button>
                      </Card.Actions>
                    </View>
                  </View>
                </Card>
              )}
              keyExtractor={(item, index) => index.toString()}
              data={
                this.state.filteredData && this.state.filteredData.length > 0
                  ? this.state.filteredData
                  : this.state.data
              }
            />
          </View>
          </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
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
  searchBar: {
    height: 50,
    width: 350,
    margin: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 25,
  },
  cardContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  card: {
    margin: 5,
    width: 340,
  },
  bigButton: {
    flex: 1,
    backgroundColor: darkGreen,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    height: 35,
    justifyContent: "center",
  },
  actionCard: {
    margin: 0,
    padding: 0,
  },
  bigButtonText: {
    fontSize: 14,
    color: "white",
  },
});

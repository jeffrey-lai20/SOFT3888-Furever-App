import React from "react";
import { Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { darkGreen } from "../styleSheet/styleSheet";

const GooglePlacesInput = (props) => {
  return (
    <View style={{ marginHorizontal: 10, marginBottom: 25 }}>
      <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 16 }}>
        {" "}
        Address{" "}
      </Text>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 2,
        //   height: 42,
          borderBottomColor: "#D3D3D3",
        }}>
        <View style={{ flex: 0.08}}>
          <Icon
            name="ios-pin"
            type="ionicon"
            color={darkGreen}
            style={{ paddingVertical: 8, paddingLeft: 0, marginLeft: 1 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <GooglePlacesAutocomplete
            placeholder="Please enter location"
            //   onPress={(data, details = null) => {
            //     // 'details' is provided when fetchDetails = true
            //     console.log(data, details);
            //   }}
            onPress={(data) => props.set(data.description)}
            query={{
              key: "AIzaSyC-6ifFUYzIIgUf1uhbmJ_BU6VQyre4bRw",
              language: "en",
              components: "country:au",
            }}
            styles={{
              textInput: {
                backgroundColor: "backgroundColor: 'rgba(52, 52, 52, 0.0)'",
                paddingVertical: 0,
                marginVertical: 0,
                height: 40,
                //   borderBottomWidth: 2,
                //   borderBottomColor: "#D3D3D3",
                fontSize: 17,
              },
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default GooglePlacesInput;

import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";
import { Searchbar, Card } from "react-native-paper";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import styles from "../styleSheet/styleSheet";
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from "../styleSheet/styleSheet";
import { getItemList } from "../components/shopComponents";


export const cartTab = (navigation) => {
    const items = getItemList();
    return (
        <View>
			<TouchableOpacity onPress={() => navigation.navigate("Cart", {items})}>
                <Image 
                    style={{width: 30, height: 30}}
                    source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fshop%2Fcart.png?alt=media&token=472ae7b3-7888-443c-b27b-9a37b39b4405"
                    }}>
                </Image>
			</TouchableOpacity>
		</View>
    );
}

export const cartCard = (navigation) => {
    const items = getItemList();
    return(
        <Card
            elevation={5}
            containerStyle={{ borderRadius: 10 }}
            onPress={() => navigation.navigate("Cart", {items})}
            >
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                <Text numberOfLines={1} style={[globalStyles.pageTitle, {padding: 10}]}>
                    View Shopping Cart
                </Text>
                <Image 
                style={{width: 30, height: 30}}
                source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fshop%2Fcart.png?alt=media&token=472ae7b3-7888-443c-b27b-9a37b39b4405"
                }}>
                </Image>
            </View>
        </Card>
    )
}
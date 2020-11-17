import React from "react";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import { db } from "../database/firebase";
import {
    View,
    ScrollView,
    Text,
    BackHandler,
  } from "react-native";
console.disableYellowBox = true;
import {profileInfo, addToCartButton, sellerInfo} from "../components/accessoryProfileComponent";

export default class shopListingProfile extends React.Component {
    state = {
        name: "",
        email: "",
        profileText: "",
        photo: "",
        sellerId: "",
    };
    
    async fetchData() {
        const uuid = this.props.route.params.item.uuid;
        db.collection("users")
            .doc(uuid)
            .get()
            .then((doc) => {
                this.setState({
                    name: doc.data().name,
                    email: doc.data().email,
                    profileText: doc.data().profileText,
                    photo: doc.data().photo,
                    sellerId: uuid,
                });
            });
    };
    
    async componentDidMount() {
        this.fetchData();
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    };

    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    }
    
    handleBackButtonClick = () => {
        this.props.navigation.goBack();
        return true;
    }
    
    render() {
        const item = this.props.route.params.item;
        return (
            <ScrollView>
                {profileInfo(item)}
                {sellerInfo(this.state, this.props.navigation)}
                {addToCartButton(item)}
            </ScrollView>
        );
    }
}
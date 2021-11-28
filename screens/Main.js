import React, { useEffect, useState } from "react";
import { Text, View, Image, Touchable } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import logo from "../assets/img/Instagram_logo_800.png";
import { useDispatch, useSelector } from "react-redux";
import { userStateChange } from "../redux/actions";

const Main = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => {
    return { currentUser: state.userState.currentUser };
  });
  const handleSignOut = async () => {
    console.log("signout");
    try {
      const userCredentials = await signOut(auth);
      //   console.log(userCredentials.user);
      dispatch(userStateChange(null));
    } catch (e) {
      console.log("signOutMainErr", e.message);
    }
  };
  console.log("Main currentUser", currentUser);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <ContentContainer>
        <Text>Landing</Text>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => handleSignOut()}
        >
          <Text>로그아웃</Text>
        </TouchableHighlight>
      </ContentContainer>
    </SafeAreaView>
  );
};

const ContentContainer = styled.View`
  padding: 0 30px;
`;
export default Main;

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
import { auth } from "../../firebase";

import logo from "../../assets/img/Instagram_logo_800.png";

const Landing = ({ navigation }) => {
  const [inputs, setInputs] = useState({ nameOrEmail: "", password: "" });

  const handleInputChange = (name, text) => {
    setInputs((t) => ({ ...t, [name]: text }));
  };
  const handleSignOut = async () => {
    console.log("signout");
    try {
      const userCredentials = await signOut(auth);
      console.log(userCredentials.user);
    } catch (e) {
      console.log(e.message);
    }
  };

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
const LogoImageView = styled.View`
  margin: 50px 0 20px;
  width: 100%;
  align-items: center;
`;
const LogoImage = styled.Image`
  width: 200px;
  height: 80px;
`;
const HeaderMention = styled.Text`
  font-size: 16px;
  color: #999;
  text-align: center;
`;

const FormView = styled.View`
  padding: 30px 0;
  width: 100%;
`;

const JoinInput = styled.TextInput`
  margin-bottom: 15px;
  padding: 10px;
  background: #ececec;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
`;
const EmailInput = styled(JoinInput)``;
const NameInput = styled(JoinInput)``;
const PasswordInput = styled(JoinInput)``;

const SignInBtn = styled.TouchableHighlight`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  align-items: center;
  background: #0095f6;
  border-radius: 4px;
`;
const SignInText = styled.Text`
  font-size: 14px;
  color: #fff;
`;

const ForgotAccountsView = styled.View`
  margin: 10px 0;
  width: 100%;
  align-items: flex-end;
`;
const ForgotAccountsText = styled.Text`
  font-size: 14px;
  color: #999;
`;

const GoToSignUpView = styled.View`
  padding: 15px 0;
  width: 100%;
  align-items: center;
  background: #ececec;
  border-top-width: 1px;
  border-color: #e3e3e3;
`;
const JoinText = styled.Text`
  font-size: 14px;
  color: #999;
`;
export default Landing;

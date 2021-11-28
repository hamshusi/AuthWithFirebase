import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../../firebase";

import logo from "../../assets/img/Instagram_logo_800.png";

const Login = ({ navigation }) => {
  const [inputs, setInputs] = useState({ nameOrEmail: "", password: "" });

  const handleInputChange = (name, text) => {
    setInputs((t) => ({ ...t, [name]: text }));
  };

  const handleSignIn = async () => {
    let res = vaildInput();
    if (res.isValid === false) {
      alert("게정정보가 올바르지 않습니다.");
      return false;
    }

    const db = getFirestore();
    res = await checkUsers(db, res);
    if (res.isValid === false) return false;

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        res.email,
        res.password
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  const vaildInput = () => {
    const { nameOrEmail, password } = inputs;

    let lowerText = nameOrEmail.toLowerCase().trim();
    let res = {
      accounts: null,
      password: null,
      isValid: false,
      accountsType: null,
    };
    if (lowerText.length === 0) return res;
    else if (password.length === 0) return res;

    if (/@[a-z0-9_-]+\.[a-z0-9_-]+$/.test(lowerText)) {
      //email이면
      res.accounts = lowerText;
      res.accountsType = "email";
      res.isValid = true;
    } else {
      res.accounts = lowerText;
      res.accountsType = "name";
      res.isValid = true;
    }
    res.password = password;

    return res;
  };
  const checkUsers = async (db, validResponse) => {
    let qData = [];
    try {
      const q = query(
        collection(db, "users"),
        where(validResponse.accountsType, "==", validResponse.accounts)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        return qData.push(doc.data());
      });

      if (qData.length === 0) {
        alert("게정정보가 올바르지 않습니다.");
        validResponse.isValid = false;
        return validResponse;
      }

      validResponse.email = qData[0].email;
      return validResponse;
    } catch (e) {
      alert("로그인중 오류가 발생했습니다.");
      validResponse.isValid = false;
      return validResponse;
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
        <LogoImageView>
          <LogoImage style={{ resizeMode: "contain" }} source={logo} />
        </LogoImageView>
        {/* <HeaderMention>친구들의 사진과 동영상을 보려면 가입하세요.</HeaderMention> */}
        <FormView>
          <EmailInput
            placeholder={"사용자 이름 또는 이메일 주소"}
            onChangeText={(text) => handleInputChange("nameOrEmail", text)}
            value={inputs.email}
          />
          <PasswordInput
            placeholder={"비밀번호"}
            secureTextEntry
            onChangeText={(text) => handleInputChange("password", text)}
            value={inputs.password}
          />
          <ForgotAccountsView>
            <ForgotAccountsText
              style={{
                paddingHorizontal: 5,
                color: "#0095f6",
              }}
            >
              비밀번호를 잊으셨나요?
            </ForgotAccountsText>
          </ForgotAccountsView>
          <SignInBtn
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => handleSignIn()}
          >
            <SignInText>로그인</SignInText>
          </SignInBtn>
        </FormView>
      </ContentContainer>
      <GoToSignUpView>
        <JoinText>
          계정이 없으신가요?&nbsp;
          <JoinText
            style={{
              paddingHorizontal: 5,
              fontWeight: "bold",
              color: "#0095f6",
            }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            가입하기
          </JoinText>
        </JoinText>
      </GoToSignUpView>
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
export default Login;

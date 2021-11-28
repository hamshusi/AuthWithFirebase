import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { Provider, useDispatch } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { composeWithDevTools } from "remote-redux-devtools";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

import Landing from "./components/auth/Landing";
import Resigster from "./components/auth/Resigster";
import Login from "./components/auth/Login";
import { userStateChange } from "./redux/actions";
import Main from "./screens/Main";
//https://github.com/jhen0409/remotedev-rn-debugger 참고해서 수정필요
const composeEnhancers = composeWithDevTools({ realtime: true, port: 19002 });
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoggedIn(true);
        setLoaded(true);
      }
      // dispatch(userStateChange(user));
    });
    return unsubscribe;
  }, []);

  if (loaded === false) {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <View>
            <Text>loading</Text>
          </View>
        </SafeAreaProvider>
      </Provider>
    );
  }

  if (loggedIn === false) {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Resigster}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

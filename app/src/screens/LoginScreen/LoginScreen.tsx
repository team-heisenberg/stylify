import { KeyboardAvoidingView, View } from "react-native";
import InputComponent from "../../components/InputComponent/InputComponent";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Try to sync user
        const docRef = doc(db, "users", `${user.email}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { isCustomer, ...usr } = docSnap.data();
          console.log("Document data:", usr);

          await axios
            .post(
              `http://localhost:8080/${isCustomer ? "customer" : "business"}`,
              {
                ...usr,
                avatarURL: isCustomer ? user.photoURL || "" : undefined,
              }
            )
            .catch((error) => console.log(error));
        } else {
          console.log("No such document!");
        }

        const { data, error } = (await axios
          .post("http://localhost:8080/auth", {
            ...user,
          })
          .catch((error) => ({ error }))) as any;

        if (error) {
          console.error(error)
          return;
        }

        const { accessToken, userData } = data;
        if (accessToken) {
          await AsyncStorage.setItem("@stylify:token", accessToken);
          await AsyncStorage.setItem("@stylify:user", JSON.stringify(userData));
          navigation.replace("Home", { user: userData });
        }
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    navigation.navigate("SignUp", {});
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        padding: 15,
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <InputComponent
        inputLabel="Email"
        showText={true}
        error={false}
        labelBgColor="white"
        inputBgColor="white"
        onChangeText={setEmail}
        value={email}
      />

      <InputComponent
        inputLabel="Password"
        showText={false}
        error={false}
        labelBgColor="white"
        inputBgColor="white"
        onChangeText={setPassword}
        value={password}
      />

      <View
        style={{
          width: "100%",
          marginTop: 25,
        }}
      >
        <ButtonComponent buttonText="Login" onPress={handleLogin} />

        <ButtonComponent buttonText="SignUp" onPress={handleSignUp} />

        {process.env.NODE_ENV === "development" && (
          <ButtonComponent
            backgroundColor="red"
            buttonText="Storybook"
            onPress={() => navigation.navigate("StoryBook")}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

import axios from "axios";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import PhoneInput from "react-native-phone-input";
import { ScrollView } from "native-base";
import InputComponent from "../../components/InputComponent/InputComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, setDoc } from "firebase/firestore";
import NormalText from "../../components/NormalText/NormalText";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import { Heading4 } from "../../components/NormalText/FontTypes";

const SignUpCustomer: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfrim] = useState("");
  const [error, setError] = useState(false);
  const phoneRef = useRef(undefined);
  const newCustomer = {
    firstName: firstName,
    lastName: lastName,
    // phoneNumber: phoneNumber,
    email: email,
    password: "",
  };

  const handleSignUp = () => {
    if (password !== passwordConfirm) {
      return setError(true);
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        setError(false);
        const user = userCredentials.user;
        console.log("Registered with: ", user.email);

        await setDoc(doc(db, "users", `${user.email}`), {
          ...newCustomer,
          isCustomer: true,
        });

        const customer = await axios
          .post("http://localhost:8080/customer", {
            ...newCustomer,
            avatarURL: user.photoURL || "",
          })
          .catch((error) => console.log(error));
        navigation.navigate("Login");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={{ width: "90%", alignSelf: "center", gap: 3 }}>
          <View style={styles.navContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowLeftBig width={24} height={20} fill="black" />
            </TouchableOpacity>
            <NormalText normalText="Sign up" fontType={Heading4} />
          </View>
          <InputComponent
            inputLabel="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <InputComponent
            inputLabel="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          {/* @ts-ignore */}
          {/* <PhoneInput
            style={styles.input}
            ref={phoneRef}
            value={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
          /> */}
          <InputComponent
            inputLabel="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <InputComponent
            inputLabel="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <InputComponent
            inputLabel="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            showText={false}
          />
          <InputComponent
            inputLabel="Confirm Password"
            value={passwordConfirm}
            onChangeText={(text) => setPasswordConfrim(text)}
            showText={false}
          />
          <View style={styles.error}>
            {error && (
              <NormalText
                normalText="Password do not match"
                textColor="red"
                textAlign="left"
              />
            )}
          </View>
        </View>

        <View style={{ width: "80%", alignSelf: "center" }}>
          <ButtonComponent buttonText="Sign up" onPress={handleSignUp} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpCustomer;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F9F5EE",
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  input: {
    height: 50,
    margin: 0,
    borderWidth: 2,
    padding: 10,
    marginTop: 8,
    borderRadius: 50,
  },
  error: { height: 30, width: "100%", marginTop: 5, marginLeft: 20 },
});

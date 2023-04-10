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
import InputComponent from "../../components/InputComponent/InputComponent";
import { ScrollView } from "native-base";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, setDoc } from "firebase/firestore";
import { ArrowLeftBig } from "../../components/IconsComponent/IconsComponent";
import NormalText from "../../components/NormalText/NormalText";
import { Heading4 } from "../../components/NormalText/FontTypes";

const SignUpBusiness: React.FC<NativeStackScreenProps<any>> = ({
  navigation,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [businessType, setBusinessType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfrim] = useState("");
  const [error, setError] = useState(false);
  const phoneRef = useRef(undefined);
  const newBusiness = {
    businessName: businessName,
    businessType: businessType,
    description: "",
    location: businessAddress,
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
          ...newBusiness,
          isCustomer: false,
        });

        const business = await axios
          .post("http://localhost:8080/business", {
            ...newBusiness,
          })
          .catch((error) => console.log(error));
        navigation.replace("Login");
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
          <InputComponent
            inputLabel="Business Name"
            value={businessName}
            onChangeText={(text) => setBusinessName(text)}
          />
          <InputComponent
            inputLabel="Business Address"
            value={businessAddress}
            onChangeText={(text) => setBusinessAddress(text)}
          />
          {/* @ts-ignore */}
          <PhoneInput
            style={styles.input}
            ref={phoneRef}
            value={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
          />
          <InputComponent
            inputLabel="Business Type"
            value={businessType}
            onChangeText={(text) => setBusinessType(text)}
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
            inputLabel="Password"
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
          <ButtonComponent buttonText="SignUp" onPress={handleSignUp} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpBusiness;

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

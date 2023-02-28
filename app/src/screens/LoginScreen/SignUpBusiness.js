import axios from "axios";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../firebase";
import PhoneInput from "react-native-phone-input";

const SignUpBusiness = () => {
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

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    if (password !== passwordConfirm) {
      return setError(true);
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        setError(false);
        const user = userCredentials.user;
        console.log("Registered with: ", user.email);

        const business = await axios
          .post("http://localhost:8080/business", {
            ...newBusiness,
          })
          .catch((error) => console.log(error));

        await axios
          .post("http://localhost:8080/auth", {
            ...business,
          })
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error.message));
  };
 
  return (
    <KeyboardAvoidingView behavior="padding" style={{ padding: 100 }}>
      <View>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          placeholder="Business Name"
          value={businessName}
          onChangeText={(text) => setBusinessName(text)}
        />
        <TextInput
          placeholder="Business Address"
          value={businessAddress}
          onChangeText={(text) => setBusinessAddress(text)}
        />
        <PhoneInput
          style={styles.input}
          ref={phoneRef}
          value={phoneNumber}
          onChangePhoneNumber={setPhoneNumber}
        />
        <TextInput
          placeholder="Business Type"
          value={businessType}
          onChangeText={(text) => setBusinessType(text)}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          placeholder="Password"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfrim(text)}
          secureTextEntry
        />
        {error && <Text>Password do not match</Text>}
      </View>

      <View>
        <TouchableOpacity onPress={handleSignUp}>
          <Text>SignUp</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpBusiness;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

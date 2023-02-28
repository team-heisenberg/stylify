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

const SignUpCustomer = () => {
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

        const customer = await axios
          .post("http://localhost:8080/customer", {
            ...newCustomer,
            avatarURL: user.photoURL || "",
          })
          .catch((error) => console.log(error));

        await axios
          .post("http://localhost:8080/auth", {
            ...customer,
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
        <PhoneInput
          style={styles.input}
          ref={phoneRef}
          value={phoneNumber}
          onChangePhoneNumber={setPhoneNumber}
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

export default SignUpCustomer;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

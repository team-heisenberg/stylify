import axios from "axios";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import PhoneInput from "react-native-phone-input";
import { ScrollView } from "native-base";
import InputComponent from "../../components/InputComponent/InputComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, setDoc } from "firebase/firestore";

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
    <KeyboardAvoidingView behavior="padding" style={{ padding: 15 }}>
      <ScrollView>
        <InputComponent
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <InputComponent
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        {/* @ts-ignore */}
        <PhoneInput
          style={styles.input}
          ref={phoneRef}
          value={phoneNumber}
          onChangePhoneNumber={setPhoneNumber}
        />
        <InputComponent
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <InputComponent
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          showText={false}
        />
        <InputComponent
          placeholder="Password"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfrim(text)}
          showText={false}
        />
        {error && <Text>Password do not match</Text>}

        <View style={{ marginVertical: 15 }}>
          <ButtonComponent buttonText="SignUp" onPress={handleSignUp} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpCustomer;

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 0,
    borderWidth: 2,
    padding: 10,
    marginTop: 8,
    borderRadius: 50,
  },
});

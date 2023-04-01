import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import InputComponent from "../../components/InputComponent/InputComponent";
import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider } from "firebase/auth/react-native";
import { GoogleIcon } from "../../components/IconsComponent/IconsComponent";
import { createAxiosClient } from "../../api";

WebBrowser.maybeCompleteAuthSession();

let googleUserInfo: any = {};

const LoginScreen: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOauthForm, setShowOauthForm] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "626592737693-ngplfmavld7qcsv9qaml6h33t6p6q027.apps.googleusercontent.com",
    expoClientId:
      "626592737693-fc8ghl8561rutqhmgbiurln8g5kd2umn.apps.googleusercontent.com",
  });

  const getGoogleUserInfo = async () => {
    try {
      // @ts-ignore
      const { accessToken, idToken } = response?.authentication;
      // @ts-ignore
      console.log(response?.authentication);

      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const { given_name, family_name, picture, email } = await res.json();
      googleUserInfo = { given_name, family_name, picture, email };

      const docRef = doc(db, "users", `${email}`);
      const docSnap = await getDoc(docRef);

      console.log(docSnap.exists());
      if (!docSnap.exists()) {
        setShowOauthForm(true);
        // return;
        // const { isCustomer, ...usr } = docSnap.data();
        // console.log("Document data:", usr);
      } else {
        // @ts-ignore
        const credentials = GoogleAuthProvider.credential(idToken, accessToken);
  
        await signInWithCredential(auth, credentials);
      }

    } catch (error) {
      console.log('<<<<<<', error)
    }
  };

  useEffect(() => {
    getGoogleUserInfo()
  }, [response])

  const createGoogleUserFirestore = async (isCustomer: boolean) => {
    if (isCustomer) {
      await setDoc(doc(db, "users", `${googleUserInfo.email}`), {
        firstName: googleUserInfo.given_name,
        lastName: googleUserInfo.family_name,
        email: googleUserInfo.email,
        password: "",
        isCustomer: true,
        avatarURL: googleUserInfo.picture,
      }).catch(console.log);
    } else {
      await setDoc(doc(db, "users", `${googleUserInfo.email}`), {
        businessName: googleUserInfo.given_name,
        businessType: "",
        description: "",
        location: "",
        email: googleUserInfo.email,
        password: "",
        isCustomer: false,
        avatarURL: googleUserInfo.picture,
      }).catch(console.log);
    }

    await getGoogleUserInfo()
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const { axiosClient } = await createAxiosClient();
      if (user) {
        // Try to sync user
        const docRef = doc(db, "users", `${user.email}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { isCustomer, photoURL, ...usr } = docSnap.data();
          console.log("Document data:", usr);

          await axiosClient
            .post(
              `/${isCustomer ? "customer" : "business"}`,
              {
                ...usr,
                avatarURL: isCustomer
                  ? user.photoURL || usr.avatarURL || photoURL ||  ""
                  : undefined,
              }
            )
            .catch((error) => console.log(error));
        } else {
          console.log("No such document!");
        }

        const { data, error } = (await axiosClient
          .post("/auth", {
            ...user,
          })
          .catch((error) => ({ error }))) as any;

        if (error) {
          console.error(error);
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
    <>
      {showOauthForm ? (
        <View>
          <TouchableOpacity
            onPress={async () => {
              await createGoogleUserFirestore(false)
              setShowOauthForm(false);
            }}
          >
            <Text>Business</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await createGoogleUserFirestore(true);
              setShowOauthForm(false);
            }}
          >
            <Text>Customer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            padding: 15,
            flex: 1,
            backgroundColor: "#F9F5EE",
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

            <ButtonComponent backgroundColor="#F9F5EE" textColor="#000" buttonText="SignUp" onPress={handleSignUp} />

            <ButtonComponent
              backgroundColor="#F9F5EE" textColor="#000"
              buttonText="Google"
              icon={<GoogleIcon width={32} height={32} fill="#000"/>}              
              onPress={async () => {
                await promptAsync();
              }}
            />

            {process.env.NODE_ENV === "development" && (
              <ButtonComponent
                backgroundColor="red"
                buttonText="Storybook"
                onPress={() => navigation.navigate("StoryBook")}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default LoginScreen;

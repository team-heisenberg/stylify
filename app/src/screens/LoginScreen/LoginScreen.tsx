import {
  KeyboardAvoidingView,
  StyleSheet,
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
import {
  GoogleIcon,
  Logo,
} from "../../components/IconsComponent/IconsComponent";
import { createAxiosClient } from "../../api";
import {
  REACT_APP_DEV_IOS_GOOGLE_CLIENT_ID,
  REACT_APP_DEV_EXPO_GOOGLE_CLIENT_ID,
  REACT_APP_PROD_IOS_GOOGLE_CLIENT_ID,
  REACT_APP_PROD_EXPO_GOOGLE_CLIENT_ID,
} from "@env";
import NormalText from "../../components/NormalText/NormalText";
import { BodyBold, BodyRegular } from "../../components/NormalText/FontTypes";
import { useRoute } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

let googleUserInfo: any = {};

const LoginScreen: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOauthForm, setShowOauthForm] = useState(false);
  const route = useRoute<any>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      process.env.NODE_ENV === "development"
        ? REACT_APP_DEV_IOS_GOOGLE_CLIENT_ID
        : REACT_APP_PROD_IOS_GOOGLE_CLIENT_ID,
    expoClientId:
      process.env.NODE_ENV === "development"
        ? REACT_APP_DEV_EXPO_GOOGLE_CLIENT_ID
        : REACT_APP_PROD_EXPO_GOOGLE_CLIENT_ID,
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
      console.log("<<<<<<", error);
    }
  };

  useEffect(() => {
    getGoogleUserInfo();
  }, [response]);

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

    await getGoogleUserInfo();
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
            .post(`/${isCustomer ? "customer" : "business"}`, {
              ...usr,
              avatarURL: isCustomer
                ? user.photoURL || usr.avatarURL || photoURL || ""
                : undefined,
            })
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
    if (route.params.account === "customer") {
      navigation.navigate("SignUpCustomer");
    } else {
      navigation.navigate("SignUpBusiness");
    }
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
              await createGoogleUserFirestore(false);
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
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Logo />
          <View
            style={{
              width: "100%",
              marginBottom: 10,
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
            <TouchableOpacity>
              <NormalText
                normalText="Forgot password?"
                fontType={BodyRegular}
                textAlign="left"
                marginLeft={20}
              />
            </TouchableOpacity>
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              <ButtonComponent buttonText="Sign in" onPress={handleLogin} />
            </View>
          </View>

          <View
            style={{
              width: "100%",
            }}
          >
            {/* <ButtonComponent buttonText="Login" onPress={handleLogin} /> */}

            {/* <ButtonComponent
              backgroundColor="#F9F5EE"
              textColor="#000"
              buttonText="SignUp"
              onPress={handleSignUp}
            /> */}
            {/* 
            <ButtonComponent
              backgroundColor="#F9F5EE"
              textColor="#000"
              buttonText="Google"
              icon={<GoogleIcon width={32} height={32} fill="#000" />}
              onPress={async () => {
                await promptAsync();
              }}
            /> */}
            <View style={styles.borderContainer}>
              <View style={styles.border} />
              <View style={styles.borderTextContainer}>
                <NormalText
                  normalText="Or sign in with"
                  fontType={BodyRegular}
                />
              </View>
            </View>
            <View
              style={{
                width: "90%",
                alignSelf: "center",
              }}
            >
              <ButtonComponent
                backgroundColor="#F9F5EE"
                textColor="#000"
                buttonText="Google"
                icon={<GoogleIcon width={32} height={32} fill="#000" />}
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
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            <NormalText
              normalText="Don't have an account?"
              fontType={BodyRegular}
              textColor="#24313A"
            />
            <TouchableOpacity onPress={handleSignUp}>
              <NormalText
                normalText="Sign up"
                fontType={BodyBold}
                textColor="#822848"
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 30,
    paddingTop: 20,
    height: "100%",
    backgroundColor: "#F9F5EE",
    alignItems: "center",
    justifyContent: "center",
  },
  borderContainer: {
    width: "100%",
    position: "relative",
    marginTop: 30,
  },
  border: { borderBottomWidth: 1, borderColor: "#24313A" },
  borderTextContainer: {
    backgroundColor: "#F9F5EE",
    alignSelf: "center",
    justifyContent: "center",
    bottom: 15,
    width: 130,
  },
});

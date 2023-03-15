import React from 'react'
import { Heading3 } from '../../components/NormalText/FontTypes'
import NormalText from '../../components/NormalText/NormalText'
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const HomeCustomer: React.FC<NativeStackScreenProps<any>>  = ({ navigation }) => {

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <>
      <NormalText normalText="Home Customer Screen" fontType={Heading3} textAlign="left" />
      <ButtonComponent onPress={handleSignOut} buttonText="Sign Out" />
    </>
  )
}

export default HomeCustomer
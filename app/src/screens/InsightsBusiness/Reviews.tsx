import { StyleSheet } from "react-native";
import React from "react";
import NormalText from "../../components/NormalText/NormalText";
import Card from "../../components/Card/Card";
import { Heading5 } from "../../components/NormalText/FontTypes";

const Reviews = ({}) => {
  return (
    <>
      <NormalText normalText="Ratings" fontType={Heading5} textAlign="left" />
      <Card></Card>
    </>
  );
};

export default Reviews;

const styles = StyleSheet.create({});

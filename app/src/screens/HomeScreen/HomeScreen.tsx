import React, { Fragment } from "react";
import TabNavigatorClient from "../../stacks/TabNavigatorClient";
import TabNavigatorBusiness from "../../stacks/TabNavigatorBusiness";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const HomeScreen: React.FC<NativeStackScreenProps<any>>  = ({ route }) => {
  return (
    <Fragment>
      {route.params?.user?.IsCustomer == 1 ? <TabNavigatorClient /> : <TabNavigatorBusiness />}
    </Fragment>
  );
};

export default HomeScreen;

import { Box, Pressable, useColorModeValue } from "native-base";
import * as React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Link } from "../NormalText/FontTypes";
import NormalText from "../NormalText/NormalText";

type IScene = {
  key: string;
  title: string;
  Component: React.ReactElement | React.FC<any>;
};

const TabViewComponent: React.FC<{ routes: IScene[] }> = ({ routes }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const renderScene = SceneMap(
    routes.reduce((a, v) => ({ ...a, [v.key]: v.Component }), {})
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={() => {
        return (
          <>
            <Box
              flexDirection="row"
              borderWidth="2"
              borderRadius="50"
              borderColor="#105535"
              backgroundColor="#F9F5EE"
              width="89%"
              height="31"
              margin="auto"
              zIndex="100"
            >
              {routes.map((route, i) => {
                const color =
                  index === i
                    ? useColorModeValue("white", "#e5e5e5")
                    : useColorModeValue("#24313A", "#a1a1aa");
                const backgroundColor =
                  index === i
                    ? "#105535"
                    : useColorModeValue("#F9F5EE", "#F9F5EE");
                return (
                  <Box
                    borderRadius="50"
                    borderWidth="1"
                    backgroundColor={backgroundColor}
                    borderColor="#F9F5EE"
                    flex={1}
                  >
                    <Pressable
                      onPress={() => {
                        setIndex(i);
                      }}
                    >
                      <NormalText
                        normalText={route.title}
                        textColor={color}
                        fontType={Link}
                      />
                    </Pressable>
                  </Box>
                );
              })}
            </Box>
            <Box
              width="89%"
              height="30"
              margin="auto"
              backgroundColor="black"
              borderRadius="50"
              position="absolute"
              top={1}
              right={4}
            />
          </>
        );
      }}
    />
  );
};

export default TabViewComponent;

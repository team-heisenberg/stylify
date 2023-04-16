import { TouchableOpacity, View } from "react-native";
import NormalText from "../../components/NormalText/NormalText";
import { ScrollView } from "native-base";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { createAxiosClient } from "../../api";

const BookingSpecialists = ({ businessID }: any) => {
  const [professionals, setProfessionals] = useState<any[]>([]);

  const getProfessionals = async () => {
    const { axiosClient } = await createAxiosClient();
    console.log("<><><><><><><><><", businessID);
    await axiosClient
      .get(`/professional/byBusinessId/${businessID}`)
      .then((res) => {
        setProfessionals(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    getProfessionals();
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.specialistContainer}
    >
      {professionals?.map((specialist, index) => (
        <TouchableOpacity style={styles.specialistImageText} key={index}>
          <ImageComponent
            width={100}
            height={100}
            imageURL={specialist.photoURL}
            borderRadius={4}
          />

          <View style={styles.specialistTextMargin}>
            <NormalText
              normalText={`${specialist.firstName} ${specialist.lastName}`}
              textAlign="center"
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5EE",
    margin: 6
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  arrow: {
    paddingRight: 15,
  },
  specialistContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  specialistImageText: {
    alignItems: "center",
    alignSelf: "flex-start",
    marginRight: 16,
  },
  specialistTextMargin: { marginTop: 8 },
  checkIcon: {
    backgroundColor: "#105535",
    borderRadius: 50,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 5,
  },
  timeSlotContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 8,
  },
  buttonContainer: { paddingLeft: 16 },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 29,
    marginRight: 29,
    marginBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default BookingSpecialists;

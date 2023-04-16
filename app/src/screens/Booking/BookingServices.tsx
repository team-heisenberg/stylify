import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import BookingServiceContainer from "../../containers/BookingServiceContainer/BookingServiceContainer";
import { createAxiosClient } from "../../api";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

// Props will be the businessId to get the info of services

const BookingServices = ({ businessID }: any) => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [servicesSelected, setServicesSelected] = useState<any[]>([])
 

  const searchServices = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(`serviceType/servicetypebybusiness/${businessID}`)
      .then((res) => {
        console.log("JOKER", JSON.stringify(res.data));
        setServiceTypes(res.data);
      })
      .catch((error) => {
        console.log(error), setServiceTypes([]);
      });
  };

  useEffect(() => {
    searchServices();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ backgroundColor: "#F9F5EE", height: "100%", marginTop: 5 }}
      >
        {serviceTypes?.map((s) => (
          <BookingServiceContainer
            serviceCategory={s["serviceType"]}
            services={s?.services}
            servicesSelected={servicesSelected} 
            setServicesSelected={setServicesSelected}
          />
        ))}
      </ScrollView>

      <View style={styles.button}>
        <ButtonComponent
          buttonText="Select Professional"
          onPress={() => navigation.navigate("Select Professional Business", {
            titleProfessional: "Select Professional",
            servicesSelected: servicesSelected,
            appointmentDetails: servicesSelected,
            businessID: businessID,
            isCustomer: true,
            ...route.params,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5EE",
    marginTop: 4,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 29,
    marginRight: 29,
    marginBottom: 70,
    marginTop: 16,
    backgroundColor: "#F9F5EE",
  },
});

export default BookingServices;

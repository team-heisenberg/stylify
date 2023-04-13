import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import BookingServiceContainer from "../../containers/BookingServiceContainer/BookingServiceContainer";
import { createAxiosClient } from "../../api";

// Props will be the businessId to get the info of services

const BookingServices = ({ businessID }: any) => {
  const [services, setServices] = useState([]);
  // /servicetypebybusiness/:businessID

  const searchServices = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(`serviceType/servicetypebybusiness/1`)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        setServices(res.data);
      })
      .catch((error) => {
        console.log(error), setServices([]);
      });
  };

  useEffect(() => {
    searchServices();
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: "#F9F5EE", height: "100%", marginTop: 5 }}
    >
      {services?.map((s) => (
        <BookingServiceContainer
          serviceCategory={s["serviceType"]}
          businessID={businessID}
          serviceTypeID={s["serviceTypeID"]}
        />
      ))}
    </ScrollView>
  );
};

export default BookingServices;

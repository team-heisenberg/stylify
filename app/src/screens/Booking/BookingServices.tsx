import { ScrollView } from "react-native";
import BookingServiceContainer from "../../containers/BookingServiceContainer/BookingServiceContainer";

// Props will be the businessId to get the info of services

const BookingServices = ({ businessID }: any) => {
  
  return (
    <ScrollView style={{ backgroundColor: "#F9F5EE", height: "100%" }}>
      <BookingServiceContainer serviceCategory={businessID} />
    </ScrollView>
  );
};

export default BookingServices;

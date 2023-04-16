import { View } from "react-native";
import NormalText from "../../components/NormalText/NormalText";
import CardService from "../../components/CardService/CardService";
import { Heading5, Heading7 } from "../../components/NormalText/FontTypes";
import { useState } from "react";

interface BookingServiceContainer {
  serviceCategory: string;
  services: any[];
  servicesSelected: any[];
  setServicesSelected: Function;
}

const BookingServiceContainer = ({
  serviceCategory,
  services,
  servicesSelected,
  setServicesSelected,
}: BookingServiceContainer) => {
  const addService = (selectedService: any) => {
    let arr = Array.from(servicesSelected || []);
    const itemIndex = arr.findIndex((a) => selectedService.name === a.name);
    if (itemIndex > -1) {
      const { price } = selectedService;
      let { amount } = arr[itemIndex];
      amount = amount + 1;
      arr[itemIndex] = {
        ...arr[itemIndex],
        price: price * amount,
        amount,
      };
      setServicesSelected(arr);
    } else {
      arr.push(selectedService);
      setServicesSelected(arr);
    }
  };

  const removeService = (selectedService: any) => {
    let arr = Array.from(servicesSelected || []);
    const itemIndex = arr.findIndex((a) => selectedService.name === a.name);
    if (itemIndex > -1) {
      const { price } = selectedService;
      let { amount } = arr[itemIndex];
      amount = amount - 1;
      arr[itemIndex] = {
        ...arr[itemIndex],
        price: price * amount,
        amount,
      };
      if (amount === 0) {
        arr.splice(itemIndex, 1);
      }

      setServicesSelected(arr);
    } else {
      arr.splice(itemIndex, 1);
      setServicesSelected(arr);
    }
  };

  console.log("AQUAMAN", servicesSelected);

  return (
    <View style={{ marginTop: 15, width: "100%" }}>
      <View style={{ width: "93%", alignSelf: "center" }}>
        <NormalText
          normalText={serviceCategory}
          textAlign="left"
          fontType={Heading7}
        />
        <View style={{ marginTop: 10 }}>
          {services?.map((s) => (
            <CardService
              photoURL={s["photoURL"]}
              serviceDuration={s?.durationInMinutes}
              serviceName={s["serviceName"]}
              servicePrice={s["servicePrice"]}
              serviceID={s["serviceID"]}
              addService={addService}
              removeService={removeService}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default BookingServiceContainer;

import { View } from "react-native";
import NormalText from "../../components/NormalText/NormalText";
import CardService from "../../components/CardService/CardService";
import { Heading5 } from "../../components/NormalText/FontTypes";
import { createAxiosClient } from "../../api";
import { useState, useEffect } from "react";

interface BookingServiceContainer {
  serviceCategory: string;
  businessID: any;
  serviceTypeID: number;
}

const BookingServiceContainer = ({
  serviceCategory,
  businessID,
  serviceTypeID,
}: BookingServiceContainer) => {
  const [services, setServices] = useState([]);
  const servicesArray: any = [];

  const testServiceTypeID = serviceTypeID;

  class Service {
    serviceName: string;
    serviceID: number;
    serviceTypeID: number;
    servicePrice: number;
    businessID: number;
    constructor(
      serviceName: string,
      serviceID: number,
      serviceTypeID: number,
      servicePrice: number,
      businessID: number
    ) {
      this.serviceName = serviceName;
      this.serviceID = serviceID;
      this.serviceTypeID = serviceTypeID;
      this.servicePrice = servicePrice;
      this.businessID = businessID;
    }
  }

  const searchServices = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(`serviceType/servicetypebybusiness/1`)
      .then((res) => {
        const response = res.data;
        // console.log(response[0]["services"]);

        for (let i of response) {
          for (let b of i["services"]) {
            if (b["serviceTypeID"] === testServiceTypeID) {
              let serviceName = b["serviceName"];
              let serviceID = b["serviceID"];
              let serviceTypeID = b["serviceTypeID"];
              let servicePrice = b["servicePrice"];
              let businessID = b["businessID"];

              const service = new Service(
                serviceName,
                serviceID,
                serviceTypeID,
                servicePrice,
                businessID
              );

              servicesArray.push(service);
            }
          }
        }
        setServices(servicesArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    searchServices();
  }, []);

  return (
    <View style={{ margin: 16 }}>
      <NormalText
        normalText={serviceCategory}
        textAlign="left"
        fontType={Heading5}
      />
      {}
      <View style={{ marginTop: 12 }}>
        {services?.map((s) => (
          <CardService
            serviceDuration={45}
            serviceName={s["serviceName"]}
            servicePrice={s["servicePrice"]}
            serviceID={s["serviceID"]}
            serviceTypeID={s["serviceTypeID"]}
            businessID={s["businessID"]}
          />
        ))}
      </View>
    </View>
  );
};

export default BookingServiceContainer;

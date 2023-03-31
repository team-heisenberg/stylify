import React, { useEffect, useState } from "react";
import PieChartContainer from "../../containers/PieChartContainer/PieChartContainer";
import { createAxiosClient } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppointmentsInsightsInterface {
  initialDate: string;
  finalDate: string;
}

const AppointmentsInsights = ({
  initialDate,
  finalDate,
}: AppointmentsInsightsInterface) => {
  const [online, setOnline] = useState(0);
  const [call, setCall] = useState(0);
  const [walkin, setWalkin] = useState(0);

  // Get Appointment types
  const getAppointments = async (businessID: string | number) => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get(
        `/insights/bytype/?initialDate=${initialDate}&finalDate=${finalDate}&businessID=${businessID}`
      )
      .then((res) => {
        // Online Appointment
        const onlineArray = res.data.filter(
          (a: { appointmentType: string | string[] }) => {
            return a.appointmentType.includes("ONLINE");
          }
        );
        const online = onlineArray.map(
          (item: { TotalAppointments: any }) => item.TotalAppointments
        );
        setOnline(online[0]);

        // Call Appointment
        const callArray = res.data.filter(
          (a: { appointmentType: string | string[] }) => {
            return a.appointmentType.includes("CALL");
          }
        );
        const call = callArray.map(
          (item: { TotalAppointments: any }) => item.TotalAppointments
        );
        setCall(call[0]);

        // Walk-in Appointment
        const walkinArray = res.data.filter(
          (a: { appointmentType: string | string[] }) => {
            return a.appointmentType.includes("WALKIN");
          }
        );
        const walkin = walkinArray.map(
          (item: { TotalAppointments: any }) => item.TotalAppointments
        );
        setWalkin(walkin[0]);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    (async () => {
      const rawUserData = await AsyncStorage.getItem("@stylify:user");
      const userData = JSON.parse(rawUserData || "{}");
      getAppointments(userData?.ID);
    })();
  }, []);

  return (
    <PieChartContainer
      onlineAmount={online}
      callAmount={call}
      walkinAmount={walkin}
    />
  );
};

export default AppointmentsInsights;

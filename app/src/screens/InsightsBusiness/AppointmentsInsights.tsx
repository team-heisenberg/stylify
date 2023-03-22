import React, { useEffect, useState } from "react";
import PieChartContainer from "../../containers/PieChartContainer/PieChartContainer";
import { createAxiosClient } from "../../api";

const AppointmentsInsights = () => {
  const [online, setOnline] = useState(0);
  const [call, setCall] = useState(0);
  const [walkin, setWalkin] = useState(0);

  // Get Appointments
  const getAppointments = async () => {
    const { axiosClient } = await createAxiosClient();
    await axiosClient
      .get("/appointment")
      .then((res) => {
        // setAppointments(res.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return <PieChartContainer onlineAmount={3} callAmount={3} walkinAmount={1} />;
};

export default AppointmentsInsights;

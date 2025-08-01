// context/DashboardContext.js
import { createContext, useContext, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPath";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
  const fetchDashboardData = useCallback(async () => {
  setLoading(true);
  try {
    const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
    if (response.data) {
      setDashboardData(response.data);
    }
  } catch (err) {
    console.error("Failed to fetch dashboard data", err);
  } finally {
    setLoading(false);
  }
}, []);

  return (
    <DashboardContext.Provider
      value={{ dashboardData, fetchDashboardData }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);

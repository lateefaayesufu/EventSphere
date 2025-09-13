import { useContext } from "react";
import { DashboardContext } from "./DashboardContext";

export const useDashboard = () => useContext(DashboardContext);

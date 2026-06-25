import api from "./api";

export const getDashboardSummary = () =>
    api.get("/dashboard/summary");

export const getRecentBills = () =>
    api.get("/dashboard/recent-bills");

export const getLowStock = () =>
    api.get("/dashboard/low-stock");

export const getTopProducts = () =>
    api.get("/dashboard/top-products");
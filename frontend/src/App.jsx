import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";
import Alerts from "./pages/Alerts.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Inventory from "./pages/Inventory.jsx";
import AddProduct from "./components/InventoryComp/AddProduct.jsx";
import Step1 from "./components/InventoryComp/Step1.jsx";
import Step2 from "./components/InventoryComp/Step2.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import PurchaseOrder from "./pages/PurchaseOrder.jsx";
import Reports from "./pages/Reports.jsx";
import Warehouses from "./pages/Warehouses.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-product/step-1" element={<Step1 />} />
        <Route path="/add-product/step-2" element={<Step2 />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/warehouses" element={<Warehouses />} />
        <Route path="/purchase-orders" element={<PurchaseOrder />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

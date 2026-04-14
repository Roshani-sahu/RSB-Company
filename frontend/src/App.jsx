import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import Alerts from './pages/Alerts.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Inventory from './pages/Inventory.jsx'
import AddProduct from './pages/AddProduct.jsx'
import Step1 from './components/InventoryComp/Step1.jsx'
import Step2 from './components/InventoryComp/Step2.jsx'
import Reports from './pages/Reports.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-product/step-1" element={<Step1 />} />
        <Route path="/add-product/step-2" element={<Step2 />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App

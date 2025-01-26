import { useLocation, useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import WaterLogPage from "./pages/WaterLogPage";
import EnergyLogPage from "./pages/EnergyLogPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LogoutPage from "./pages/LogoutPage"

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div
      className={
        isAuthPage
          ? ""
          : "flex h-screen bg-gray-500 text-gray-100 overflow-hidden"
      }
    >
      {/* Conditionally render the background */}
      {!isAuthPage && (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
      )}
      {!isAuthPage && (
        <Routes>
          {/* Wrap components needing username */}
          <Route
            path="/dashboard/:username"
            element={<RouteWithSidebar component={DashboardPage} />}
          />
          <Route
            path="/water-logs/:username"
            element={<RouteWithSidebar component={WaterLogPage} />}
          />
          <Route
            path="/energy-logs/:username"
            element={<RouteWithSidebar component={EnergyLogPage} />}
          />

          {/* Catch-all route to suppress warnings */}
          <Route path="*" element={<div></div>} />
        </Routes>
      )}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<LogoutPage />}
          />
        {/* Catch-all route to suppress warnings */}
        <Route path="*" element={<div></div>} />
      </Routes>
    </div>
  );
}

function RouteWithSidebar({ component: Component }) {
  const { username } = useParams();

  return (
    <>
      <Sidebar username={username} />
      <Component />
    </>
  );
}

export default App;

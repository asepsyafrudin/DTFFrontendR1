import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login";
import SignUp from "../SignUp";
import { Loader, Placeholder } from "rsuite";

const Dashboard = React.lazy(() => import("../Dashboard"));
const AgvControl = React.lazy(() => import("../AgvControl"));
const Ekanban = React.lazy(() => import("../Ekanban"));
const EnergyControl = React.lazy(() => import("../EnergyControl"));
const ERO = React.lazy(() => import("../ERO"));
const EReceiving = React.lazy(() => import("../EReceiving"));
const EStaging = React.lazy(() => import("../EStaging"));
const LeaderControl = React.lazy(() => import("../LeaderControl"));
const SOPDX = React.lazy(() => import("../SOPDX"));
const Traceability = React.lazy(() => import("../Traceability"));
const Inventory = React.lazy(() => import("../Inventory"));
const Storaging = React.lazy(() => import("../Storaging"));
const EPM = React.lazy(() => import("../EPM"));

function Layout() {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <Placeholder.Paragraph rows={8} />
            <Loader backdrop content="loading..." vertical />
          </div>
        }
      >
        <Routes>
          <Route index element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agvcontrol" element={<AgvControl />} />
          <Route path="/e-kanban" element={<Ekanban />} />
          <Route path="/e-energy" element={<EnergyControl />} />
          <Route path="/e-receiving" element={<EReceiving />} />
          <Route path="/e-ro" element={<ERO />} />
          <Route path="/e-inventory" element={<Inventory />} />
          <Route path="/e-storaging" element={<Storaging />} />
          <Route path="/e-staging" element={<EStaging />} />
          <Route path="/leadercontrol" element={<LeaderControl />} />
          <Route path="/sopdx" element={<SOPDX />} />
          <Route path="/e-tracability" element={<Traceability />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/e-pm" element={<EPM />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Layout;

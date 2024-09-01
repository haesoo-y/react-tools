import { Navigate, Route, Routes as ReactRouterRoutes } from "react-router-dom";

import ListPage from "./ListPage";
import MainPage from "./MainPage";

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/todos" element={<ListPage />} />
      <Route path="*" element={<Navigate replace to="/main" />} />
    </ReactRouterRoutes>
  );
};

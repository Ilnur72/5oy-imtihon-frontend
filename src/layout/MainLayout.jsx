import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAxios } from "../hooks/useAxios";
import { userTodoGuide } from "../store/userDataSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const url = ["/login"];
  const shouldHidePage = url.includes(location.pathname);
  const { data, refetch } = useAxios({ url: "/users/me", method: "get" });
  React.useEffect(() => {
    dispatch(userTodoGuide(data.data?.todo_guides));
    refetch();
  }, [data]);
  return (
    <div>
      {shouldHidePage ? null : <Header />}
      <main className="container mx-auto flex ">
        {shouldHidePage ? null : <Sidebar />}
        <div className="w-full mx-auto pl-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

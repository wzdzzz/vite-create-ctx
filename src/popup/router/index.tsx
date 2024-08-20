import { Navigate, createHashRouter } from "react-router-dom";
import Layout from "@/popup/layout";
import Home from "@/popup/pages/home";
import CRXAPI from "@/popup/pages/crx-api";

export const routes = [
  {
    path: "/",
    element: <Layout/>,
    title: '个人',
    children: [
      {
        path: "/",
        title: "主页",
        element: <Home/>
      },
      {
        path: "/api",
        title: "API",
        element: <CRXAPI/>
      },
      {
        // 如果URL没有"#路由"，跳转Home页面
        path: '/',
        element: <Navigate to="/home"/>,
      },
      {
        // 未匹配，跳转Login页面
        path: '*',
        element: <Navigate to="/home"/>,
      },
    ]
  }
]

export const routers = createHashRouter(routes)
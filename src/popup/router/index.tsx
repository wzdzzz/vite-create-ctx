import Layout from "@/popup/layout"
import CRXAPI from "@/popup/pages/crx-api"
import Home from "@/popup/pages/home"
import { createHashRouter, Navigate } from "react-router-dom"

export const routes = [
  {
    path: "/",
    element: <Layout />,
    title: "个人",
    children: [
      {
        path: "/",
        title: "主页",
        element: <Home />,
      },
      {
        path: "/api",
        title: "API",
        element: <CRXAPI />,
      },
      {
        // 如果URL没有"#路由"，跳转Home页面
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        // 未匹配，跳转Login页面
        path: "*",
        element: <Navigate to="/home" />,
      },
    ],
  },
]

export const routers = createHashRouter(routes)

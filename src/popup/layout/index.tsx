import SideBar from "@/popup/components/side-bar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <SideBar />
      <div className="">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

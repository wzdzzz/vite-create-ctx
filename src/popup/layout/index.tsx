import { Outlet, } from "react-router-dom";
import SideBar from "@/popup/components/side-bar";

const Layout = () => {
  return (
    <div>
      <SideBar/>
      <div className="">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
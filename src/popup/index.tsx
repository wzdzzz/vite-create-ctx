import { routers } from "@/popup/router"
import { RouterProvider } from "react-router-dom"

import "./index.less"

const Popup = () => {
  return <RouterProvider router={routers} />
}

export default Popup

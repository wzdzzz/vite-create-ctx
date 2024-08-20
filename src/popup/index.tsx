import { RouterProvider } from 'react-router-dom'
import { routers } from "@/popup/router";
import './index.less'

const Popup = () => {
  return (
    <RouterProvider router={routers}/>
  )
}


export default Popup
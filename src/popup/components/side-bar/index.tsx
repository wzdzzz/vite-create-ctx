import { useLocation, Link } from "react-router-dom";
import { routes } from "@/popup/router";
import './index.less'

const SideBar = () => {
  const location = useLocation();
  
  return (
    <div className='side-bar'>
      {
        routes.map((item, index) => {
          return (
            <div key={item.path + index} className='side-bar-list'>
              {
                item.children && item.children.map((subItem, subIndex) => {
                  return (
                    
                    <div key={subItem.path + subIndex} className='side-bar-item'>
                      <Link to={subItem.path}
                            className={location.pathname === subItem.path ? "side-bar-active" : "side-bar-default"}>{subItem.title}</Link>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }</div>
  )
}

export default SideBar
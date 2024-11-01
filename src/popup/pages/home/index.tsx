import { SetStateAction, useEffect, useState } from "react"

import "./index.less"

type EventItem = { name: string; time: string }

const Home = () => {
  const [list, setList] = useState<EventItem[]>([])
  const [params, setParams] = useState({ name: "" })

  const handleGetData = () => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get(
        ["list"],
        (result: { list: SetStateAction<EventItem[]> }) => {
          if (result.list) {
            setList([...(result.list as EventItem[])])
          }
        }
      )
    } else {
      const data = localStorage.getItem("list") || "[]"
      setList([...JSON.parse(data)])
    }
  }

  const handleDelete = (index: number) => {
    const tempList = list.filter((_item, i) => i !== index)
    if (chrome?.storage?.local) {
      chrome.storage.local.set({ list: tempList })
    } else {
      localStorage.setItem("list", JSON.stringify(tempList))
    }
    setList(tempList)
  }

  const handleAdd = () => {
    const { name } = params
    const time = new Date().toLocaleString()
    if (!name) return
    if (chrome?.storage?.local) {
      chrome.storage.local.set({ list: [...list, { name, time }] })
    } else {
      localStorage.setItem("list", JSON.stringify([...list, { name, time }]))
    }
    setList([...list, { name, time }])
    setParams({ name: "" })
  }

  useEffect(() => {
    handleGetData()
  }, [])
  return (
    <div className="home">
      <div className="home-list">
        {list.map((item, index) => {
          return (
            <div className="home-list-item" key={item.name}>
              <div className="home-list-item-name">{item.name}</div>
              <div className="home-list-item-time">{item.time}</div>

              <div className="home-list-item-btn">
                <div
                  className="home-list-item-btn-delete"
                  onClick={() => {
                    handleDelete(index)
                  }}
                >
                  删除
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="home-bottom">
        <input
          type="text"
          placeholder="新增事件"
          value={params.name}
          onChange={(e) => setParams({ ...params, name: e.target.value })}
        />
        <div className="home-bottom-btn" onClick={handleAdd}>
          新增
        </div>
      </div>

      <div className="text-red-500">footer</div>
    </div>
  )
}

export default Home

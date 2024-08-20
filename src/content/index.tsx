import './index.less'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from "react";

const CRXDialog = ({onClose, popupMsg}) => {
  const [text, setText] = useState('')
  
  const handleSubmit = () => {
    const config = {
      data: {
        text,
      },
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        alert(res)
      },
    }
    chrome.runtime.sendMessage(
      {
        // 带上标识，让background script接收消息时知道此消息是用于请求API
        contentRequest: 'apiRequest',
        config: config,
      },
      (result) => {
        console.log(result)
      }
    )
  }
  
  return <div className="CRX-dialog" id="CRX-dialog" onClick={onClose}>
    <div id="CRX-dialog-content" className="CRX-dialog-content">
      <p>这是一个弹窗</p>
      <input
        placeholder="请输入内容"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div onClick={handleSubmit}>提交</div>
      
      <div>
        来自popup的消息：{popupMsg}
      </div>
    </div>
  </div>
}

const Content = () => {
  const [open, setOpen] = useState(false)
  
  const [popupMsg, setPopupMsg] = useState('')
  
  useEffect(() => {
    console.log('开启监听')
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('收到消息', request)
      const {contentRequest} = request
      console.log(JSON.stringify(request))
      setPopupMsg(JSON.stringify(request))
      if (contentRequest === 'popup') {
        sendResponse({content: 'content'});
      }
    })
  }, [])
  
  return <div className='CRX-content'>
    <div className="CRX-entry" onClick={() => (setOpen(true))}>助手</div>
    
    {/*实现弹窗*/}
    {open && <CRXDialog popupMsg={popupMsg} onClose={() => setOpen(false)}/>}
  </div>
}

const app = document.createElement('div')
app.id = 'CRX-container'

document.body.appendChild(app)
const crxContainer = ReactDOM.createRoot(
  document.getElementById('CRX-container')
)

crxContainer.render(<Content/>)

try {
  const insertScript = document.createElement('script')
  insertScript.setAttribute('type', 'text/javascript')
  insertScript.src = window.chrome.runtime.getURL('insert.js')
  document.body.appendChild(insertScript)
} catch (err) {
  console.error(err)
}

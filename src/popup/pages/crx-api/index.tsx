import './index.less'

const CRXAPI = () => {
  const handleGetInfo = () => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      const activeTab = tabs[0]
      console.log(activeTab)
    })
  }
  
  const handleOpenWindow = () => {
    chrome.tabs.create({
      url: 'https://www.baidu.com'
    })
  }
  
  const handleSendMessage = () => {
    chrome.runtime.sendMessage({contentRequest: 'popup', val1: 'val1', val2: 'val2'}, (response) => {
      console.log(response)
    });
  }
  
  const handleSetStorageLocal = () => {
    chrome.storage.local.set({
      key: 'value'
    })
  }
  
  const handleGetStorageLocal = () => {
    chrome.storage.local.get(['key'], function (result) {
      console.log(result)
    })
  }
  
  const handleSetStorageSync = () => {
    chrome.storage.sync.set({
      key: 'syncValue'
    })
  }
  
  const handleGetStorageSync = () => {
    chrome.storage.sync.get(['key'], function (result) {
      console.log(result)
    })
  }
  
  const handleSendMessageToContent = () => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      const activeTab = tabs[0]
      chrome.tabs.sendMessage(activeTab.id, {contentRequest: 'popup', val1: 'val1', val2: 'val2'}, (response) => {
        console.log(response)
      });
    })
  }
  return (
    <div className='crx-api'>
      <div className="crx-api-decs">
        <a href="https://developer.chrome.com/docs/extensions/reference/api/tabs?hl=zh-cn"
           target='_blank'>chrome官方文档地址</a>
      </div>
      <div className='crx-api-btn' onClick={handleGetInfo}>获取当前窗口信息</div>
      <div className='crx-api-btn' onClick={handleOpenWindow}>打开新窗口</div>
      <div className='crx-api-btn' onClick={handleSetStorageLocal}>本地存储</div>
      <div className='crx-api-btn' onClick={handleGetStorageLocal}>读取本地存储</div>
      <div className='crx-api-btn' onClick={handleSetStorageSync}>远程存储</div>
      <div className='crx-api-btn' onClick={handleGetStorageSync}>访问远程存储</div>
      <div className='crx-api-btn' onClick={handleSendMessage}>向service worker通信</div>
      <div className='crx-api-btn' onClick={handleSendMessageToContent}>向content script通信</div>
    </div>
  )
}

export default CRXAPI
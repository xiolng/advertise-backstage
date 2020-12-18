import React, {useEffect, useState} from "react"

import './PhoneList.less'

const PhoneList = (props: any) => {
  const [dates, setDates] = useState(new Date())
  useEffect(() => {
    let timer: any = setInterval(() => {
      setDates(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })
  return (
    <div className="phone-box">
      <div className="title">
        <div className="left-box">{dates.toLocaleDateString()}</div>
        <div className="right-box">{dates.toLocaleTimeString()}</div>
      </div>
      <div className="phone-content">
        list
      </div>
    </div>
  )
}
export default PhoneList

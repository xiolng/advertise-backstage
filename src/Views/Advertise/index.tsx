import React, {useEffect, useState} from "react"
import {Col, Row} from "antd"
import './Advertise.less'
import PhoneList from "../../Components/PhoneList"
import UploadImg from "../../Components/UploadImg"

const Advertise = () => {

  const [dates, setDates] = useState(new Date())
  useEffect(() => {
    let timer: any = setInterval(() => {
      setDates(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })
  return(
    <div className='advertise-box'>
      <Row justify={'center'}>
        <Col span={16}>
          <UploadImg/>
        </Col>
        <Col span={8}>
          <PhoneList/>
        </Col>
      </Row>
    </div>
  )
}
export default Advertise

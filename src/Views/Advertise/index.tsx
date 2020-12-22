import React, {useEffect, useState} from "react"
import {Col, Row} from "antd"
import './Advertise.less'
import PhoneList from "../../Components/PhoneList"
import UploadImg from "../../Components/UploadImg"

const Advertise = () => {

  const getImg = (val: []) => {
    console.log(333, val)
    setList(val)
  }
  const [list, setList] = useState([])
  return (
    <div className='advertise-box'>
      <Row justify={'center'}>
        <Col span={16}>
          <UploadImg
            onChange={(val: []) => getImg(val)}
          />
        </Col>
        <Col span={8}>
          <PhoneList
            {...{
              list
            }}
          />
        </Col>
      </Row>
    </div>
  )
}
export default Advertise

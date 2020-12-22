import { Carousel } from "antd/es"
import Button from "antd/es/button"
import React, {useEffect, useRef, useState} from "react"
// @ts-ignore
import QRCode from 'qrcode-react'

import html2canvas from "html2canvas"

import './PhoneList.less'

const PhoneList = (props: any) => {
  const [dates, setDates] = useState(new Date())
  const [listImg, setListImg] = useState([])
  const [showType, setShowType] = useState(1)
  const phoneContent: any = useRef(null)
  const phoneBanner: any = useRef(null)
  useEffect(() => {
    setListImg(props.list)
    showType === 1 && (phoneContent.current.scrollTop += 1)
    let timer: any = setInterval(() => {
      setDates(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
      setListImg([])
    }
  }, [props, showType])
  const [stTop, setStTop] = useState(0)
  const handleScroll = (event: any) => {
    console.log(event.target.scrollTop)
    setStTop(event.target.scrollTop + 200)
  }
  return (
    <div className="phone-box">
      <div className="title">
        <div className="left-box">
          {/*{dates.toLocaleDateString()}*/}
          <Button
            type={showType === 1 ? 'primary':'default'}
            size='small'
            shape='round'
            style={{marginRight: 4}}
            onClick={() => setShowType(1)}
          >lb</Button>
          <Button
            type={showType === 2 ? 'primary':'default'}
            size='small'
            shape='round'
            onClick={() => setShowType(2)}
          >banner</Button>
        </div>
        <div className="right-box">{dates.toLocaleTimeString()}</div>
      </div>
      {
        showType === 1 ? (
          <div
            className="phone-content"
            onScroll={(event: any) => handleScroll(event)}
            ref={phoneContent}
          >
            {
              listImg && listImg.map((v: any, index: number) => (
                <div
                  className={((stTop / 200) > index) || (index <= 4) ? 'anima-box active' : 'anima-box'}
                  key={index}
                >
                  <img
                    alt={v.name}
                    src={v.thumbUrl}
                  />
                </div>
              ))
            }
          </div>
        ): (
          <div
            className="phone-banner"
          >
            <Carousel
              autoplay
              dots={{className: 'itemDots'}}
            >
              {
                listImg && listImg.map((v: any, index: number) => (
                  <div
                    className='banner-box'
                    key={index}
                    ref={phoneBanner}
                    onClick={() => {
                      // e.stopPropagation()
                      // e.preventDefault()
                      console.log('val', phoneBanner.current)
                      html2canvas(phoneBanner.current).then(canvas => {
                        console.log('canvas', canvas.toDataURL('base64', 1))
                        // document.body.appendChild(canvas)
                        const a = document.createElement('a')
                        a.href = canvas.toDataURL('base64', 1)
                        a.download = 'base123'
                        a.click()
                      })
                    }}
                  >
                    <img
                      alt={v.name}
                      src={v.thumbUrl}
                    />
                    <div className="banner-name">{v.name}</div>
                    <div className="address-box">
                      <div className="shop-address">
                        长春市朝阳区工农大街1122号长春大饭店2楼
                      </div>
                      <div className="shop-qr">
                        <QRCode
                          value={'www.baidu.com'}
                          size={100}
                        />
                      </div>
                    </div>
                  </div>
                ))
              }
            </Carousel>
          </div>
        )
      }
    </div>
  )
}
export default PhoneList

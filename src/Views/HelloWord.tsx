import React, {Suspense, useEffect, useState} from "react"
import {Col, Row} from "antd"
import {Editor} from "@tinymce/tinymce-react/lib/es2015/main/ts"
import './HelloWord.less'

const HelloWord = (props: any) => {
  const [editVal, setEditVal] = useState('')
  const [dates, setDates] = useState(new Date())
  const images_upload_handler = (blobInfo: any, success: any, failure: any, progress: any) => {
    const {uploadImgUrl} = {uploadImgUrl: ''}

    const xhr = new XMLHttpRequest()
    xhr.withCredentials = false
    xhr.open('POST', uploadImgUrl)
    xhr.setRequestHeader('Authorization', '')

    xhr.upload.onprogress = function (e) {
      progress(e.loaded / e.total * 100)
    }

    xhr.onload = function () {
      var json

      if (xhr.status < 200 || xhr.status >= 300) {
        failure('HTTP Error: ' + xhr.status)
        return
      }

      json = JSON.parse(xhr.responseText)

      if (!json || typeof json.data != 'string') {
        failure('Invalid JSON: ' + xhr.responseText)
        return
      }

      success(`/fileLoad/files/${json.data}`)
    }

    xhr.onerror = function () {
      failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status)
    }

    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())

    xhr.send(formData)
  }
  const initEdit: any = {
    height: 730,
    menubar: false,
    language: 'zh_CN', // 语言
    // menu: {
    //   insert: {}
    // },
    plugins: ['image', 'media'],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image',
    images_upload_handler: images_upload_handler,
    statusbar: false
  }

  useEffect(() => {
    let timer: any = setInterval(() => {
      setDates(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })
  return (
    <div className='hell-word'>
      <Row justify={'center'}>
        <Col span={16}>
          <Editor
            initialValue={'list'}
            init={initEdit}
            api-key="gf46svjcnfs4nsmfno7jba0cfl3vqoifgew1opw1xf6ammd4"
            onEditorChange={val => setEditVal(val)}
          />
        </Col>
        <Col span={8}>
          <div className="phone-box">
            <div className="title">
              <div className="left-box">{dates.toLocaleDateString()}</div>
              <div className="right-box">{dates.toLocaleTimeString()}</div>
            </div>
            <div className="phone-content" dangerouslySetInnerHTML={{
              __html: editVal
            }}>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default HelloWord

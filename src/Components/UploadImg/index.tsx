import {Upload, Modal} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import React, {useCallback, useRef, useState} from "react"
import {createDndContext, DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import DragableUploadListItem from './DragableUploadListItem'
import Context from 'immutability-helper'

const UploadImg = (props: any) => {

  // 图片转base64
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/')))
  }

  // 拖拽

  const RNDContext = createDndContext(HTML5Backend)
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = fileList[dragIndex]
      setFileList(
        Context(fileList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow]
          ]
        })
      )
    },
    [fileList]
  )
  const manager:any = useRef(RNDContext)
  const onChange = ({fileList: newFileList}: any) => {
    setFileList(newFileList)
    props.onChange(newFileList)
  }

  return (
    <div className="upload-box">
      <DndProvider
        manager={manager.current.dragDropManager}
      >
        <Upload
          action={'http://www.mocky.io/v2/5cc8019d300000980a055e76'}
          listType='picture-card'
          fileList={fileList}
          multiple
          onPreview={(file) => handlePreview(file)}
          onChange={(fileList) => onChange(fileList)}
          itemRender={(originNode, file, currFileList) => (
            <DragableUploadListItem
              originNode={originNode}
              file={file}
              fileList={currFileList}
              moveRow={moveRow}
            />
          )}
        >
          {
            fileList.length >= 8 ? null : (
              <div>
                <PlusOutlined />
                <div style={{marginTop: 8}}>Upload</div>
              </div>
            )
          }
        </Upload>
      </DndProvider>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img src={previewImage} alt="example" style={{width: '100%'}} />
      </Modal>
    </div>
  )
}
export default UploadImg

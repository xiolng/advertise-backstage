import {Tooltip} from 'antd'
import React from 'react'
import {DndProvider, useDrag, useDrop, createDndContext} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'


// 拖拽
const RNDContext = createDndContext(HTML5Backend)
const type = 'DragableUploadList'

const DragableUploadListItem = ({originNode, moveRow, file, fileList}: any) => {
  const ref: any = React.useRef()
  const index = fileList.indexOf(file)
  const [{isOver, dropClassName}, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const {index: dragIndex} = monitor.getItem() || {}
      if (dragIndex === index) {
        return {}
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? 'drop-over-downward' : 'drop-over-upward',
      }
    },
    drop: (item: any) => {
      moveRow(item.index, index)
    }
  })
  const [, drag] = useDrag({
    item: {type, index},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  drop(drag(ref))
  const errorNode = (
    <Tooltip
      title='Upload Error'
      getPopupContainer={() => document.body}
    >
      {originNode.props.children}
    </Tooltip>
  )
  return (
    <div
      ref={ref}
      className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
      style={{cursor: 'move'}}
    >
      {file.status === 'error' ? errorNode : originNode}
    </div>
  )
}

export default DragableUploadListItem

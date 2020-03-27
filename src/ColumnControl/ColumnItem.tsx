import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ColumnInstance } from 'react-table'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'

interface IconProps {
  active: boolean,
  toggle: React.MouseEventHandler<any>
}

/**
 * Visibility Icon displays the current visible/hidden state using the `acitve`
 * prop.
 * 
 * @private
 * 
 * @param props 
 */
const Icons: React.FC<IconProps> = (props) => { 
  const iconProps = {
    fixedWidth: true,
    className: 'mr-1',
    style: { cursor: 'pointer' },
    onClick: props.toggle
  }
  if (props.active) {
    return <FontAwesomeIcon data-testid='column-visibility-icon-visible' icon={faEye} {...iconProps} />
  } else {
    return <FontAwesomeIcon data-testid='column-visibility-icon-hidden' icon={faEyeSlash} {...iconProps} />
  }
}

interface ItemProps {
  column: ColumnInstance
  provided?: DraggableProvided
}

/**
 * Table Column item in a list group. An Icon is displayed next to the column
 * header that toggles the visiblity of the column.
 * 
 * @private
 * 
 * @param props 
 */
const Item: React.FC<ItemProps> = (props) => {
  const active = props.column.isVisible
  const { provided } = props
  let itemProps = {}
  if (provided) {
    itemProps = {
      ...itemProps,
      ...provided.draggableProps,
      ...provided.dragHandleProps,
      ref: provided.innerRef
    }
  }
  return (
    <li 
      data-testid='column-control-item'
      className={`list-group-item ${!active ? 'bg-light' : ''}`}
      {...itemProps}
    >
      <Icons active={active} toggle={() => props.column.toggleHidden()} />
      {props.column.Header}
    </li>
  )
}
interface ColumnItemProps {
  column: ColumnInstance
  index: number
  draggable?: boolean
}

/**
 * Table Column item in a list group. An Icon is displayed next to the column
 * header that toggles the visiblity of the column.
 * 
 * @private
 * 
 * @param props 
 */
const ColumnItem: React.FC<ColumnItemProps> = (props) => {
  const { column, index, draggable } = props
  return (
    <>
      { draggable
        ? (
          <Draggable key={column.id} draggableId={column.id} index={index}>
            {provided => (
              <Item column={column} provided={provided} />
            )}
          </Draggable>
        ) : (
          <Item column={column} />
        )
      }
    </>
  )
}

export default ColumnItem
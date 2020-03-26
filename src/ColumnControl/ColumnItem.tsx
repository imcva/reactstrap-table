import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ColumnInstance } from 'react-table'

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

interface ColumnItemProps {
  column: ColumnInstance
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
  const active = props.column.isVisible
  return (
    <li className={`list-group-item ${!active ? 'bg-light' : ''}`} >
      <Icons active={active} toggle={() => props.column.toggleHidden()} />
      {props.column.Header}
    </li>
  )
}

export default ColumnItem
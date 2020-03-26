import React from 'react'
import { 
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button
} from 'reactstrap'
import ColumnList from './ColumnList'
import useTableContext from '../useTableContext'

interface ColumnControlProps {
  open: boolean
  toggle: React.MouseEventHandler<any>
}

/**
 * Reactstrap Modal for Column Visibility Settings. Control the modal visibility
 * through the `open` and `toggle` props.
 * 
 * @param props 
 */
const ColumnControl: React.FC<ColumnControlProps> = (props) => {
  const { allColumns } = useTableContext()

  return (
    <Modal data-testid='column-control' isOpen={props.open}>
      <ModalHeader toggle={props.toggle}>Column Controls</ModalHeader>
      <ModalBody>
          <ColumnList columns={allColumns} />
      </ModalBody>
      <ModalFooter>
        <Button color='danger'>Reset Columns</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ColumnControl

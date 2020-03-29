import React from 'react'
import { 
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button
} from 'reactstrap'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
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
 * Add `useColumnOrder` plugin from react-table to enable 
 * 
 * @param props 
 */
const ColumnControl: React.FC<ColumnControlProps> = (props) => {
  const { allColumns, setHiddenColumns, setColumnOrder, initialState, state } = useTableContext()

  const canOrderColumns = !!state.columnOrder

  const columnOrder = state.columnOrder || []

  const columns = allColumns.sort((a, b) => {
    return columnOrder.indexOf(a.id) - columnOrder.indexOf(b.id)
  })

  const reset = () => {
    setHiddenColumns(initialState.hiddenColumns || [])
    if (canOrderColumns) {
      setColumnOrder(initialState.columnOrder || [])
    }
  }

  const reorder = (current: number, next: number) => {
    const columns = state.columnOrder.length ? state.columnOrder : allColumns.map(c => c.id)
    const updated = Array.from(columns)
    const [ column ] = updated.splice(current, 1)
    updated.splice(next, 0, column)
    return updated
  }

  const dnd = {
    onDragEnd: (results: DropResult) => {
      const { source, destination } = results
      if (!destination || (destination.index === source.index)) {
        return
      }
      const newColumns = reorder(source.index, destination.index)
      setColumnOrder(newColumns)
    },
  }

  return (
    <Modal data-testid='column-control' isOpen={props.open}>
      <ModalHeader toggle={props.toggle}>Column Controls</ModalHeader>
      <ModalBody>
        {canOrderColumns
          ? (
            <DragDropContext onDragEnd={dnd.onDragEnd}>
              <ColumnList columns={columns} draggable={true} />
            </DragDropContext>
          ) : (
              <ColumnList columns={columns} />
          )
        }
      </ModalBody>
      <ModalFooter>
        <Button color='danger' data-testid='reset-columns' onClick={reset}>Reset Columns</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ColumnControl

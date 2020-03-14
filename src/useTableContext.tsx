import React from 'react'

import { Context } from './TableContext'
import { TableInstance } from 'react-table'

const useTableContext = () => {
  const state = React.useContext(Context) 
  if (state === null) {
    throw new Error('Table state not setup. Please use within TableContext!')
  }
  return state as TableInstance
}

export default useTableContext
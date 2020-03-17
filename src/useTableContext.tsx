import React from 'react'

import { TableInstance } from 'react-table'

import { Context } from './TableContext'

const useTableContext = (): TableInstance => {
  const state = React.useContext(Context) 
  if (state === null) {
    throw new Error('Table state not setup. Please use within TableContext!')
  }
  return state as TableInstance
}

export default useTableContext
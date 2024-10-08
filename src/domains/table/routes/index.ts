import express from 'express'
import type { Express } from 'express'
import TableController from '../controllers/table-controller'

// TODO Type the Request Handler
const TableRouting = (app: Express) => {
  const tableRouter = express.Router()

  tableRouter.post('/', TableController.createTable as any)
  tableRouter.get('/', TableController.getAllTables as any)
  tableRouter.patch('/:tableId', TableController.updateTable as any)
  tableRouter.get('/:tableId', TableController.getTable as any)
  tableRouter.post('/:tableId/invite', TableController.updateTableInvite)
  tableRouter.put('/:tableId/seat', TableController.joinTable as any)
  tableRouter.patch('/:tableId/seat', TableController.updateSeat)

  app.use(`${process.env.API_VERSION}/tables`, tableRouter)
}

export default TableRouting

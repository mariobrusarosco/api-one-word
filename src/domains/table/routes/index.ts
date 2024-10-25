import express from 'express'
import type { Express } from 'express'
import TableController from '../controllers/table-controller'
import { AuthMiddleware } from '@/domains/auth/middleware'

const TableRouting = (app: Express) => {
  const tableRouter = express.Router()

  tableRouter.post('/', TableController.createTable)
  tableRouter.get('/', TableController.getAllTables)
  tableRouter.get('/:tableId', TableController.getTable)
  tableRouter.patch('/:tableId', TableController.updateTable)
  tableRouter.post('/:tableId/invite', TableController.updateTableInvite)
  tableRouter.put('/:tableId/join', TableController.joinTable)
  tableRouter.patch('/:tableId/seat', TableController.updateSeat)

  app.use(`${process.env.API_VERSION}/tables`, AuthMiddleware, tableRouter)
}

export default TableRouting

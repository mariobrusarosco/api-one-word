import express from 'express'
import type { Express } from 'express'
import TableController from '../controllers/table-controller'

const TableRouting = (app: Express) => {
  const tableRouter = express.Router()

  tableRouter.post('/', TableController.createTable)
  tableRouter.get('/', TableController.getAllTables)
  tableRouter.patch('/:tableId', TableController.updateTable)
  tableRouter.get('/:tableId', TableController.getTable)
  tableRouter.post('/:tableId/invite', TableController.updateTableInvite)
  tableRouter.post('/join/:inviteCode', TableController.joinTable)
  tableRouter.patch('/:tableId/profile', TableController.updateProfile)

  app.use(`${process.env.API_VERSION}/tables`, tableRouter)
}

export default TableRouting

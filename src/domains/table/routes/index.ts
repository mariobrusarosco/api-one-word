import express from 'express'
import type { Express } from 'express'
import LeagueController from '../controllers/table-controller'
import TableController from '../controllers/table-controller'

const TableRouting = (app: Express) => {
  const tableRouter = express.Router()

  // tableRouter.post('/', LeagueController.createLeague)
  tableRouter.get('/', TableController.getAllTables)
  // tableRouter.get('/:leagueId', LeagueController.getLeague)
  // tableRouter.patch('/:leagueId', LeagueController.updateLeague)

  app.use(`${process.env.API_VERSION}/tables`, tableRouter)
}

export default TableRouting

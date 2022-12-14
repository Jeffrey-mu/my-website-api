import { Sequelize } from 'sequelize'
import config from 'config'
import logger from './logger'
interface MysqlConfig {
  database: string
  username: string
  password: string
  host: string
  port: number
}
const mysqlConfig = config.get<MysqlConfig>('mysqlConfig')

const sequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.username,
  mysqlConfig.password,
  {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: 'mysql',
  }
)
// 测试连接
sequelize
  .authenticate()
  .then(() => {
    logger.info('MySQL client connected')
  })
  .catch((e) => {
    logger.error('Unable to connect to MySQL', e)
  })

export default sequelize

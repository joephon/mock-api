import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const uploadPath = path.join(__dirname, '../uploads');

const koaBodyConfig = {
  formLimit: '5mb',
  jsonLimit: '5mb',
  textLimit: '5mb',
  uploadDir: uploadPath,
  multipart: true,
}

const config = {
  wxMinaAppId: process.env.WX_MINA_APP_ID || '',
  wxMinaAppSecret: process.env.WX_MINA_APP_SECRET || '',
  port: process.env.PORT || 9999,
  productionHost: process.env.PRODUCTION_HOST || '',
  developmentHost: process.env.DEVELOPMENT_HOST || '',
  env: process.env,
  uploadPath,
  koaBodyConfig
};

export default config
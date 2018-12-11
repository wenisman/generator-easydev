const convict: any = require('convict')

if (process.env.DOTENV) {
  require('dotenv').config({ path: process.env.DOTENV })
} 

const definitions = {
  LOG_LEVEL: {
    env: 'LOG_LEVEL',
    format: '*',
    default: 'info',
  },
  LOG_FILE: {
    env: 'LOG_FILE',
    format: '*',
    default: null
  },
  HTTP_PORT: {
    env: 'HTTP_PORT',
    format: 'port',
    default: 3000,
  },
  ENV: {
    env: 'ENV',
    format: '*',
    default: 'DEV',
  }
}

const schema = convict(definitions)
schema.validate({ allowed: 'strict' })

const config = (name: string): any => {
  if (!schema.has(name)) {
    throw new Error(`unknown config ${name}`)
  }

  
  return schema.get(name)
}

export default config

const isProd = process.env.NODE_ENV === 'production'

export const config = {
  isProd,
  serverUrlPrefix: isProd ? 'https://wd01.cloud-workshop.online/api' : 'http://localhost:1337/api',
  serverReceipt: isProd ? 'https://wd01-admin.cloud-workshop.online' : 'http://localhost:1337',
  windowlocateHome: isProd ? 'https://wd01.cloud-workshop.online' : 'http://localhost:3000'
}
export const config2 = {
  isProd,
  serverUrlPrefix: isProd ? 'https://wd01-admin.cloud-workshop.online/api' : 'http://localhost:1337/api',}


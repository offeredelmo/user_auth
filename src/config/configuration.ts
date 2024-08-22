
export default () => ({
    port: parseInt(process.env.PORT) || 8000,
    mongo_url_db: process.env.MONGO_URL_DB,
    email_host: process.env.EMAIL_HOST,
    email_port: parseInt(process.env.EMAIL_PORT),
    auth_user: process.env.AUTH_USER,
    auth_pass: process.env.AUTH_PASS,
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOEKN 
  });
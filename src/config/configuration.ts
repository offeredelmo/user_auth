
export default () => ({
    port: parseInt(process.env.PORT) || 8000,
    mongo_url_db: (process.env.MONGO_URL_DB) 

  });
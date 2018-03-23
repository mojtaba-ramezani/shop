class Constants {
    public static DB_CONNECTION_STRING: string =
      process.env.NODE_ENV === 'production' ? process.env.dbURI : 'mongodb://localhost:27017/shop';     
}
Object.seal(Constants);
export = Constants;

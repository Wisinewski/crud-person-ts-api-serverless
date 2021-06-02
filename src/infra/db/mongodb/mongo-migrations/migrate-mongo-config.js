const config = {
  mongodb: {
    url: "mongodb://localhost:27017",
    databaseName: "crud-person-ts-api",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false
};

module.exports = config;

import { DataSource } from "typeorm";

const myConnection = new DataSource({
    type: "sqlite",
    database: "src/database/database.sqlite",
})

myConnection.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
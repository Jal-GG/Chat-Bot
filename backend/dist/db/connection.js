import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        throw new error("cannot connect to Database");
        console.log(error);
    }
}
async function DisconnectDB() {
    try {
        await disconnect();
    }
    catch (error) {
        throw new error("cannot disconnect");
        console.log(error);
    }
}
export { connectToDatabase, DisconnectDB };
//# sourceMappingURL=connection.js.map
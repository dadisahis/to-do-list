import { defaultState } from "./defaultState";
import { connectDB } from "./Connect-db";

async function initialize_db() {
  let db = await connectDB();
  for (let collectionName in defaultState) {
    let collection = db.collection(collectionName);
    await collection.insertMany(defaultState[collectionName]);
  }
}

initialize_db();

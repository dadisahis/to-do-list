import { defaultState } from "./defaultState";
import { connectDB } from "./Connect-db";

async function initialize_db() {
  let db = await connectDB();
  let user = await db.collection(`users`).findOne({ id: "U1" });
  if (!user) {
    for (let collectionName in defaultState) {
      let collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);
    }
  }
}

initialize_db();

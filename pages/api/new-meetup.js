import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://admin:DHKTPM14@cluster0.lxnwb.mongodb.net/meetups?authSource=admin&replicaSet=atlas-7iqx95-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
    );
    const db = client.db();
    const meetupCollections = db.collection("meetups");
    const result = await meetupCollections.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({
      message: "Message inserted!",
    });
  }
}
export default handler;

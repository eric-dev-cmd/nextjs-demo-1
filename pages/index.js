import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react/cjs/react.production.min";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/3/37/Hanoi_skyline_at_night.jpg",
//     address: "Some address 5, 123456 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Hanoi_Opera_House%2C_24_December_2016.jpg/800px-Hanoi_Opera_House%2C_24_December_2016.jpg",
//     address: "Some address 10, 123456 Some City",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Header Meet Up</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:DHKTPM14@cluster0.lxnwb.mongodb.net/meetups?authSource=admin&replicaSet=atlas-7iqx95-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const meetups = await meetupCollections.find().toArray();
  console.log(meetups);
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
      revalidate: 1,
    },
  };
}
export default HomePage;

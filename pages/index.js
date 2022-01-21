import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";

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
  const response = await fetch(
    "https://60fa76bc7ae59c0017166164.mockapi.io/api/products",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const meetups = await response.json();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup.id,
      })),
      revalidate: 1,
    },
  };
}
export default HomePage;

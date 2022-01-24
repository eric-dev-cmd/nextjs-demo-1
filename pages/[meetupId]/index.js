import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
function NewMeeupDetails(props) {
  if (!props.meetupData) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
export async function getStaticPaths() {
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
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup.id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const response = await fetch(
    "https://60fa76bc7ae59c0017166164.mockapi.io/api/products/" + meetupId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const selectedMeetup = await response.json();
  if (!selectedMeetup) {
    return { notFound: true };
  }
  return {
    props: {
      meetupData: {
        id: selectedMeetup.id,
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
      revalidate: 10,
    },
  };
}
export default NewMeeupDetails;

import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeeupPage() {
  const router = useRouter();
  const onHandlerAddMeetup = async (dataEntered) => {

    const response = await fetch(
      "https://60fa76bc7ae59c0017166164.mockapi.io/api/products",
      {
        method: "POST",
        body: JSON.stringify(dataEntered),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    router.push("/");
  };
  return <NewMeetupForm onAddMeetup={onHandlerAddMeetup} />;
}
export default NewMeeupPage;

import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeeupPage() {
  const router = useRouter();
  console.log(router);
  const onHandlerAddMeetup = async (dataEntered) => {
    console.log(dataEntered);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(dataEntered),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Thanh cong");
    const data = await response.json();
    console.log(data);
    router.push("/");
  };
  return <NewMeetupForm onAddMeetup={onHandlerAddMeetup} />;
}
export default NewMeeupPage;

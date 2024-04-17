import Link from "next/link";

export default function Welcome() {
  return (
    <div>
      <h1> Welcome to Livewell </h1> <p> Are you a doctor or a patient ? </p>{" "}
      <Link href="/selection?type=patient">
        <button
          style={{
            backgroundColor: "#2F9132",
          }}
        >
          {" "}
          Doctor{" "}
        </button>{" "}
      </Link>{" "}
      <Link href="/selection?type=doctor">
        <button> Patient </button>{" "}
      </Link>{" "}
    </div>
  );
}

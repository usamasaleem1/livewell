import Link from "next/link";

export default function Welcome() {
  return (
    <div>
      <h1> Welcome to Livewell </h1> <p> Are you a Doctor or a Patient ? </p>{" "}
      <Link href="/selection?type=Patient">
        <button
          style={{
            backgroundColor: "#2F9132",
          }}
        >
          {" "}
          Doctor{" "}
        </button>{" "}
      </Link>{" "}
      <Link href="/selection?type=Doctor">
        <button> Patient </button>{" "}
      </Link>{" "}
    </div>
  );
}

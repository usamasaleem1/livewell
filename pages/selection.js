import { useRouter } from "next/router";

export default function Selection() {
  const router = useRouter();
  const { type } = router.query;

  // Generate random names for doctors and patients
  const users =
    type === "doctor"
      ? [
          "Dr. Smith",
          "Dr. Johnson",
          "Dr. Lee",
          "Dr. Brown",
          "Dr. White",
          "Dr. Anderson",
          "Dr. Wilson",
          "Dr. Harris",
        ]
      : [
          "Michael Smith",
          "David Johnson",
          "Christopher Lee",
          "Matthew Brown",
          "Andrew White",
          "Daniel Anderson",
          "James Wilson",
          "Robert Harris",
        ];
  // Generate an image for each user
  const getImageUrl = (index, gender) =>
    `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;

  return (
    <div>
      <h1> Select a {type} </h1>{" "}
      <ul>
        {" "}
        {users.map((user, index) => (
          <li key={index}>
            <img
              src={getImageUrl(index + 1, type === "doctor" ? "men" : "men")}
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
            />{" "}
            <a href={`/chat?user=${encodeURIComponent(user)}`}> {user} </a>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
}

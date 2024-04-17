import { useRouter } from "next/router";

export default function Selection() {
  const router = useRouter();
  const { type } = router.query;

  // Generate random names for Doctors and Patients
  const users =
    type === "Doctor"
      ? [
          "Dr. John Smith",
          "Dr. Michael Johnson",
          "Dr. Sarah Lee",
          "Dr. Emily Brown",
          "Dr. Alex White",
          "Dr. Samantha Anderson",
          "Dr. David Wilson",
          "Dr. Olivia Harris",
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
          <a
            className="hover-grow-shadow other-classes"
            key={index}
            href={`/chat?user=${encodeURIComponent(user)}`}
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            <li
              style={{
                padding: "20px",
                marginBottom: "20px",
                borderBottom: "2px solid #444",
                borderRadius: "25px",
                background: "#444",
                display: "flex",
                alignItems: "center",
                width: "100%",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
              }}
            >
              <img
                src={getImageUrl(index + 1, type === "Doctor" ? "men" : "men")}
                style={{
                  borderRadius: "50%",
                  maxHeight: "60px",
                  marginRight: "20px",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                }}
              />{" "}
              <span style={{ fontSize: "20px", fontWeight: "light" }}>
                {" "}
                {user}{" "}
              </span>{" "}
            </li>{" "}
          </a>
        ))}{" "}
      </ul>{" "}
    </div>
  );
}

import Link from "next/link";
import styles from "../styles/Welcome.module.css"; // Assuming you create a CSS module

export default function Welcome() {
  return (
    <div className={styles.container}>
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        Welcome to Livewell
      </h1>{" "}
      <img
        src="https://img.icons8.com/?size=512&id=M2I2DdwQf1gB&format=png"
        alt="Doctor"
        style={{
          marginBottom: "20px",
          boxShadow: "0 2px 15px 5px #00000000",
        }}
      />{" "}
      <p style={{ textAlign: "center", fontWeight: "bold", lineHeight: "1.5" }}>
        Connect seamlessly with healthcare professionals or manage your patients
        more efficiently. Are you a doctor or a patient? Choose your path below!
      </p>{" "}
      <div className={styles.buttonContainer}>
        <Link href="/selection?type=Patient">
          <button className={styles.doctorButton}>👨‍⚕️ I'm a Doctor</button>{" "}
        </Link>{" "}
        <Link href="/selection?type=Doctor">
          <button className={styles.patientButton}>👱 I'm a Patient</button>{" "}
        </Link>{" "}
      </div>{" "}
    </div>
  );
}

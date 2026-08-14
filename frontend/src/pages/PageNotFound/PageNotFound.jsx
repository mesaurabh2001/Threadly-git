import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.code}>404</h1>

        <h2 className={styles.title}>Oops! Page Not Found</h2>

        <p className={styles.description}>
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to somewhere familiar.
        </p>

        <Link to="/" className={styles.button}>
          ⬅ Back to Home
        </Link>
      </div>

      <div className={styles.circleOne}></div>
      <div className={styles.circleTwo}></div>
    </section>
  );
}

export default PageNotFound;
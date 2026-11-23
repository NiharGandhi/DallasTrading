import { Component, ReactNode } from "react";
import styles from "./tribute.module.scss";
import drRobertEhrlich from "../../tribute/dr_robert_ehrlich.jpeg";

class Tribute extends Component {
  render(): ReactNode {
    return (
      <div className={styles.tributeContainer}>
        <div className={styles.inner}>
          <img
            className={styles.photo}
            src={drRobertEhrlich}
            alt="Dr. Robert Ehrlich"
          />
          <div className={styles.content}>
            <h2 className={styles.heading}>A TRIBUTE OF RESPECT</h2>
            <p className={styles.text}>
              We deeply mourn the passing of Dr. Robert Ehrlich.
            </p>
            <p className={styles.text}>
              Our heartfelt condolences to his family and everyone at PCE. May
              they find strength and courage during this difficult time.
            </p>
            <p className={styles.text}>
              We honour his significant contributions to PCE and the electrical
              industry, recognising the lasting legacy of his work and
              leadership.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Tribute;

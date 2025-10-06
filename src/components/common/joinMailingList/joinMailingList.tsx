import { Component, ReactNode } from "react";
import styles from "./joinMailingList.module.scss";
import {
  IJoinMailingListProps,
  IJoinMailingListStates,
} from "./joinMailingList.constants";

class JoinMailingList extends Component<
  IJoinMailingListProps,
  IJoinMailingListStates
> {
  render(): ReactNode {
    return (
      <div className={styles.container}>
        <h3 className={styles.text}>Join Our Mailing List</h3>
        <input
          className={styles.input}
          type="email"
          placeholder="Your Email Address"
        />
      </div>
    );
  }
}

export default JoinMailingList;

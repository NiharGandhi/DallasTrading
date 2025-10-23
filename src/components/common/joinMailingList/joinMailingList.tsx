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
  constructor(props: IJoinMailingListProps) {
    super(props);
    this.state = {
      email: "",
      isSubmitted: false,
      error: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: e.target.value, error: "" });
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.state.email) {
      this.setState({ error: "Please enter your email address" });
      return;
    }

    if (!emailRegex.test(this.state.email)) {
      this.setState({ error: "Please enter a valid email address" });
      return;
    }

    // Simulate submission
    this.setState({ isSubmitted: true, email: "", error: "" });

    // Reset success message after 5 seconds
    setTimeout(() => {
      this.setState({ isSubmitted: false });
    }, 5000);
  }

  render(): ReactNode {
    return (
      <div className={styles.container}>
        <h3 className={styles.text}>Join Our Mailing List</h3>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="email"
              placeholder="Your Email Address"
              value={this.state.email}
              onChange={this.handleEmailChange}
              aria-label="Email address"
            />
            <button
              type="submit"
              className={styles.submitBtn}
              aria-label="Subscribe to mailing list"
            >
              Subscribe
            </button>
          </div>
          {this.state.error && (
            <p className={styles.errorMessage} role="alert">
              {this.state.error}
            </p>
          )}
          {this.state.isSubmitted && (
            <p className={styles.successMessage} role="status">
              Thank you — subscription confirmed!
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default JoinMailingList;

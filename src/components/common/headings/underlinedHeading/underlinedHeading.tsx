import { Component, ReactNode } from "react";
import styles from "./underlinedHeading.module.scss";
import {
  IUnderlinedHeadingProps,
  IUnderlinedHeadingStates,
} from "./underlinedHeading.constants";

class UnderlinedHeading extends Component<
  IUnderlinedHeadingProps,
  IUnderlinedHeadingStates
> {
  render(): ReactNode {
    return (
      <div className={styles.headingBox}>
        <h1 className={styles.heading}>{this.props.headingText}</h1>
        <div className={styles.underline}></div>
      </div>
    );
  }
}

export default UnderlinedHeading;

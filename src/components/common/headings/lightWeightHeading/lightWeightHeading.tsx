import { Component, ReactNode } from "react";
import styles from "./lightWeightHeading.module.scss";
import {
  ILightWeightHeadingProps,
  ILightWeightHeadingStates,
} from "./lightWeightHeading.constants";

class LightWeightHeading extends Component<
  ILightWeightHeadingProps,
  ILightWeightHeadingStates
> {
  render(): ReactNode {
    return (
      <div className={styles.headingBox}>
        <h1 className={styles.heading}>
          <span className={styles.headingText1}>{this.props.headingText1}</span>{" "}
          <span className={styles.headingText2}>{this.props.headingText2}</span>
        </h1>
      </div>
    );
  }
}
export default LightWeightHeading;

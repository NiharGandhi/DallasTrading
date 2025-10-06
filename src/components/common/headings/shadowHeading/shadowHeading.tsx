import { Component, ReactNode } from "react";
import styles from "./shadowHeading.module.scss";
import {
  IShadowHeadingProps,
  IShadowHeadingStates,
} from "./shadowHeading.constants";

class ShadowHeading extends Component<
  IShadowHeadingProps,
  IShadowHeadingStates
> {
  render(): ReactNode {
    return (
      <div className={styles.headingBox}>
        <h1 className={styles.heading}>
          <span className={styles.headingText1}>{this.props.headingText1}</span>{" "}
          <span className={styles.headingText2}>{this.props.headingText2}</span>
        </h1>
        {this.props.backShadowHeading === false ? null : (
          <h1 className={styles.shadowHeading}>
            {this.props.headingText1} {this.props.headingText2}
          </h1>
        )}
      </div>
    );
  }
}

export default ShadowHeading;

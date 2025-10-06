import { Component, ReactNode } from "react";
import styles from "./stylishUpDownCard.module.scss";
import {
  IStylishUpDownCardProps,
  IStylishUpDownCardStates,
} from "./stylishUpDownCard.constants";
import Aos from "aos";
import "aos/dist/aos.css";

class StylishUpDownCard extends Component<
  IStylishUpDownCardProps,
  IStylishUpDownCardStates
> {
  componentDidMount(): void {
    Aos.init();
  }
  render(): ReactNode {
    const { altText, image, info } = this.props;
    return (
      <div
        className={styles.card}
        data-aos="zoom-in-up"
        data-aos-delay="20"
        data-aos-offset="100"
        data-aos-duration="1000"
        data-aos-once="true"
        onClick={this.props.handleClick}
      >
        <div className={styles.left}>
          <img className={styles.img} src={image} alt={altText} />
        </div>
        <div className={styles.right}>
          <p>{info}</p>
        </div>
      </div>
    );
  }
}

export default StylishUpDownCard;

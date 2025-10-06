import { Component, ReactNode } from "react";
import styles from "./display-slider.module.scss";
import {
  IDisplaySliderProps,
  IDisplaySliderStates,
} from "./display-slider.constants";
import { motion } from "framer-motion";
import DisplayImage from "./display-image/display-image";

class DisplaySlider extends Component<
  IDisplaySliderProps,
  IDisplaySliderStates
> {
  constructor(props: IDisplaySliderProps) {
    super(props);
    this.state = {
      imageToShow: 0,
    };
  }
  componentDidMount(): void {
    setInterval(() => {
      this.setState({
        imageToShow:
          this.state.imageToShow !== 3 ? this.state.imageToShow + 1 : 0,
      });
    }, 4000);
  }

  render(): ReactNode {
    const { slider, isActive } = this.props;
    return isActive ? (
      <motion.div
        className={styles.display}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        exit={{ opacity: 0 }}
      >
        <div className={styles.slider}>
          <div className={styles.displayHeading}>
            <h1 className={styles.rank}>{slider.rank}</h1>
            <h3 className={styles.company}>{slider.comapny}</h3>
            <h4 className={styles.info}>{slider.info}</h4>
            <h5 className={styles.extraText}>{slider.extraText}</h5>
          </div>
          <DisplayImage image={slider.image} isActive={isActive} />
        </div>
      </motion.div>
    ) : null;
  }
}

export default DisplaySlider;

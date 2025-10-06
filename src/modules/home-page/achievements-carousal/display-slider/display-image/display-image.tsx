import { Component, ReactNode } from "react";
import styles from "./display-image.module.scss";
import {
  IDisplayImageProps,
  IDisplayImageStates,
} from "./display-image.constants";
import { motion } from "framer-motion";

class DisplayImage extends Component<IDisplayImageProps, IDisplayImageStates> {
  constructor(props: IDisplayImageProps) {
    super(props);
    this.state = {
      isInView: false,
      isLoaded: false,
    };
  }
  componentDidUpdate(
    prevProps: Readonly<IDisplayImageProps>,
    prevState: Readonly<IDisplayImageStates>
  ): void {
    if (prevProps.isActive !== this.props.isActive) {
      this.setState({ isInView: false, isLoaded: false });
    }
  }
  render(): ReactNode {
    const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 40px, rgba(0,0,0,1) 40px, rgba(0,0,0,1) 40px)`;
    const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 40px)`;
    const { image, isActive } = this.props;
    return isActive ? (
      <motion.img
        className={styles.displayImg}
        src={image}
        initial={false}
        animate={
          this.state.isInView && this.state.isLoaded
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        exit={
          this.state.isInView && this.state.isLoaded
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        onViewportEnter={() => this.setState({ isInView: true })}
        onLoad={() => this.setState({ isLoaded: true })}
      />
    ) : null;
  }
}

export default DisplayImage;

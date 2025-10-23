import { Component, ReactNode } from "react";
import styles from "./display-slider.module.scss";
import {
  IDisplaySliderProps,
  IDisplaySliderStates,
} from "./display-slider.constants";
import { motion } from "framer-motion";
import DisplayImage from "./display-image/display-image";
import { useNavigate } from "react-router-dom";
import withRouter from "../../../../components/common/withRouterComponent/withRouter";

class DisplaySlider extends Component<
  IDisplaySliderProps,
  IDisplaySliderStates
> {
  constructor(props: IDisplaySliderProps) {
    super(props);
    this.state = {
      imageToShow: 0,
    };
    this.handleGetQuote = this.handleGetQuote.bind(this);
    this.handleDownloadCatalogue = this.handleDownloadCatalogue.bind(this);
  }
  componentDidMount(): void {
    setInterval(() => {
      this.setState({
        imageToShow:
          this.state.imageToShow !== 3 ? this.state.imageToShow + 1 : 0,
      });
    }, 4000);
  }

  handleGetQuote() {
    this.props.router?.navigate("/contact-us");
  }

  handleDownloadCatalogue() {
    const fileUrl = "DALLAS CATALOGUE & COMPANY PROFILE.pdf";
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = "DALLAS CATALOGUE & COMPANY PROFILE.pdf";
    a.click();
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
            {slider.rank && <h1 className={styles.rank}>{slider.rank}</h1>}
            <h3 className={styles.company}>{slider.comapny}</h3>
            <h4 className={styles.info}>{slider.info}</h4>
            <h5 className={styles.extraText}>{slider.extraText}</h5>
            <div className={styles.ctaButtons}>
              <button
                className={styles.primaryCta}
                onClick={this.handleGetQuote}
                aria-label="Get a quote"
              >
                Get a Quote
              </button>
              <button
                className={styles.secondaryCta}
                onClick={this.handleDownloadCatalogue}
                aria-label="Download catalogue"
              >
                Download Catalogue
              </button>
            </div>
          </div>
          <DisplayImage image={slider.image} isActive={isActive} />
        </div>
      </motion.div>
    ) : null;
  }
}

export default withRouter(DisplaySlider);

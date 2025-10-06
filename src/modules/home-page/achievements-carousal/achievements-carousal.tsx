import { Component, ReactNode, RefObject, createRef } from "react";
import styles from "./achievements-carousal.module.scss";
import {
  IAchievementCarousalProps,
  IAchievementCarousalStates,
} from "./achievements-carousal.constants";
import img1 from "./../../../images/carousel1.jpg";
import img2 from "./../../../images/carousel2.webp";
import img3 from "./../../../images/carousel3.jpg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DisplaySlider from "./display-slider/display-slider";

interface CustomDivElement extends HTMLDivElement {
  startX?: number;
}

class AchievementCarousal extends Component<
  IAchievementCarousalProps,
  IAchievementCarousalStates
> {
  displaySliders = [
    {
      rank: "1st",
      comapny: "Electrical Trading Company",
      info: "in U.A.E to get ISO 9001:2008 Certification.",
      extraText: "28 Years of Excellence in Electrical Industrial Solutions",
      image: img1,
      img_info: "display_img1",
    },
    {
      rank: "23",
      comapny: "High caliber",
      info: "techno-commercial professionals.",
      extraText: "28 Years of Excellence in Electrical Industrial Solutions",
      image: img2,
      img_info: "display_img2",
    },
    {
      rank: "1st",
      comapny: "Electrical Trading Company",
      info: "in U.A.E to get ISO 9001:2008 Certification.",
      extraText: "28 Years of Excellence in Electrical Industrial Solutions",
      image: img3,
      img_info: "display_img3",
    },
  ];
  private containerRef?: RefObject<CustomDivElement>;
  constructor(props: IAchievementCarousalProps) {
    super(props);
    this.state = { currentSlide: 0, waitAgain: false, touchStarts: false };
    this.buttonNext = this.buttonNext.bind(this);
    this.buttonPrev = this.buttonPrev.bind(this);
    this.handleClickOnDot = this.handleClickOnDot.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.containerRef = createRef<HTMLDivElement>();
  }
  componentDidMount(): void {
    setInterval(() => {
      if (!this.state.waitAgain) {
        this.buttonNext();
      } else {
        this.setState({ waitAgain: false });
      }
    }, 8000);
  }
  buttonNext() {
    if (this.state.currentSlide === this.displaySliders.length - 1) {
      this.setState({ currentSlide: 0 });
    } else {
      this.setState({ currentSlide: this.state.currentSlide + 1 });
    }
  }
  buttonPrev() {
    if (this.state.currentSlide === 0) {
      this.setState({ currentSlide: this.displaySliders.length - 1 });
      return;
    }
    this.setState({ currentSlide: this.state.currentSlide - 1 });
  }
  handleClickOnDot(index: number) {
    this.setState({ currentSlide: index, waitAgain: true });
  }
  handleTouchStart(event: any) {
    const touch = event.touches[0];
    if (this.containerRef?.current) {
      this.containerRef.current.startX = touch.clientX;
    }
    this.setState({ touchStarts: true });
    console.log("yooo");
  }
  handleTouchMove(event: any) {
    if (!this.state.touchStarts) return;
    const touch = event.touches[0];
    const diffX = touch.clientX - (this.containerRef?.current?.startX || 0);
    console.log("I'm moving woahh..", diffX);
  }
  handleTouchEnd() {
    this.setState({ touchStarts: false });
    console.log("it ends :(");
  }
  render(): ReactNode {
    return (
      <div className={styles.parent}>
        <button
          className={styles.btnPrev}
          onClick={() => {
            this.setState({ waitAgain: true });
            this.buttonPrev();
          }}
        >
          <ArrowBackIosIcon />
        </button>
        <button
          className={styles.btnNext}
          onClick={() => {
            this.setState({ waitAgain: true });
            this.buttonNext();
          }}
        >
          <ArrowForwardIosIcon />
        </button>
        <div
          id="cont"
          className={styles.achievements}
          ref={this.containerRef}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          style={{ cursor: this.state.touchStarts ? "grab" : "default" }}
        >
          {this.displaySliders.map((slider, index) => (
            <DisplaySlider
              key={index}
              slider={slider}
              isActive={this.state.currentSlide === index}
            />
          ))}
        </div>
        <div className={styles.carouselDots}>
          {this.displaySliders.map((d, i) =>
            this.state.currentSlide === i ? (
              <div key={i} className={styles.highlightedDot}></div>
            ) : (
              <div
                key={i}
                className={styles.dot}
                onClick={() => this.handleClickOnDot(i)}
              ></div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default AchievementCarousal;

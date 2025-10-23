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
  startY?: number;
}

class AchievementCarousal extends Component<
  IAchievementCarousalProps,
  IAchievementCarousalStates
> {
  displaySliders = [
    {
      rank: "",
      comapny: "Electrical Products & Industrial Solutions",
      info: "for Commercial Projects — Powering UAE's Infrastructure Since 1995",
      extraText: "28 Years of Excellence in Electrical Industrial Solutions",
      image: img1,
      img_info: "display_img1",
    },
    {
      rank: "23",
      comapny: "High Caliber Professionals",
      info: "delivering techno-commercial excellence across the region.",
      extraText: "Trusted by 1,000+ Customers Across 10+ Countries",
      image: img2,
      img_info: "display_img2",
    },
    {
      rank: "1st",
      comapny: "ISO 9001:2008 Certified",
      info: "Electrical Trading Company in U.A.E",
      extraText: "Quality Assured Products from 150+ Global Suppliers",
      image: img3,
      img_info: "display_img3",
    },
  ];
  private containerRef?: RefObject<CustomDivElement>;
  private touchStartX = 0;
  private touchStartY = 0;
  private swipeThreshold = 50;

  constructor(props: IAchievementCarousalProps) {
    super(props);
    this.state = { currentSlide: 0, waitAgain: false, touchStarts: false };
    this.buttonNext = this.buttonNext.bind(this);
    this.buttonPrev = this.buttonPrev.bind(this);
    this.handleClickOnDot = this.handleClickOnDot.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.setState({ touchStarts: true });
  }
  handleTouchMove(event: any) {
    if (!this.state.touchStarts) return;

    const touch = event.touches[0];
    const diffX = touch.clientX - this.touchStartX;
    const diffY = touch.clientY - this.touchStartY;

    // Prevent vertical scroll if primarily horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
      event.preventDefault();
    }
  }
  handleTouchEnd(event: any) {
    const touch = event.changedTouches[0];
    const diffX = touch.clientX - this.touchStartX;
    const diffY = touch.clientY - this.touchStartY;

    // Check if it's a horizontal swipe (not vertical scroll)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > this.swipeThreshold) {
      if (diffX > 0) {
        this.buttonPrev();
      } else {
        this.buttonNext();
      }
      this.setState({ waitAgain: true });
    }

    this.setState({ touchStarts: false });
  }
  handleKeyDown(event: any) {
    if (event.key === "ArrowLeft") {
      this.buttonPrev();
      this.setState({ waitAgain: true });
    } else if (event.key === "ArrowRight") {
      this.buttonNext();
      this.setState({ waitAgain: true });
    } else if (event.key >= "1" && event.key <= "3") {
      const index = parseInt(event.key) - 1;
      this.handleClickOnDot(index);
    }
  }
  render(): ReactNode {
    return (
      <div
        className={styles.parent}
        role="region"
        aria-label="Achievements carousel"
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
      >
        <button
          className={styles.btnPrev}
          onClick={() => {
            this.setState({ waitAgain: true });
            this.buttonPrev();
          }}
          aria-label="Previous slide"
        >
          <ArrowBackIosIcon />
        </button>
        <button
          className={styles.btnNext}
          onClick={() => {
            this.setState({ waitAgain: true });
            this.buttonNext();
          }}
          aria-label="Next slide"
        >
          <ArrowForwardIosIcon />
        </button>
        <div
          className={styles.achievements}
          ref={this.containerRef}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          style={{ cursor: this.state.touchStarts ? "grabbing" : "grab" }}
          aria-live="polite"
        >
          {this.displaySliders.map((slider, index) => (
            <DisplaySlider
              key={index}
              slider={slider}
              isActive={this.state.currentSlide === index}
            />
          ))}
        </div>
        <div className={styles.carouselDots} role="tablist" aria-label="Slide controls">
          {this.displaySliders.map((_, index) => (
            <button
              key={index}
              className={this.state.currentSlide === index ? styles.highlightedDot : styles.dot}
              onClick={() => this.handleClickOnDot(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={this.state.currentSlide === index}
              role="tab"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AchievementCarousal;

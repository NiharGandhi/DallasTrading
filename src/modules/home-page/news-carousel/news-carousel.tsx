import { Component, ReactNode } from "react";
import styles from "./news-carousel.module.scss";
import { INewsCarouselProps, INewsCarouselStates, INewsHeadline } from "./news-carousel.constants";
import { NewspaperRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

class NewsCarousel extends Component<INewsCarouselProps, INewsCarouselStates> {
  newsHeadlines: INewsHeadline[] = [
    {
      id: 1,
      reference: "PCE",
      title: "Strengthening Partnerships at Middle East Energy (MEE) 2025 – Dubai",
    },
    {
      id: 2,
      reference: "3M",
      title: "Dallas Trading Co. LLC Honored with the 3M Best Award",
    },
    {
      id: 3,
      reference: "Barton",
      title: "Strengthening Partnerships Through Knowledge | Barton Engineering x Dallas Trading Co. LLC",
    }
  ];

  constructor(props: INewsCarouselProps) {
    super(props);
    this.state = { currentSlide: 0, waitAgain: false };
    this.nextSlide = this.nextSlide.bind(this);
  }

  componentDidMount(): void {
    setInterval(() => {
      if (!this.state.waitAgain) {
        this.nextSlide();
      } else {
        this.setState({ waitAgain: false });
      }
    }, 5000);
  }

  nextSlide() {
    if (this.state.currentSlide === this.newsHeadlines.length - 1) {
      this.setState({ currentSlide: 0 });
    } else {
      this.setState({ currentSlide: this.state.currentSlide + 1 });
    }
  }

  render(): ReactNode {
    return (
      <div className={styles.newsCarousel}>
        <div className={styles.carouselContainer}>
          <div className={styles.newsIcon}>
            <NewspaperRounded />
          </div>
          <div className={styles.headlinesWrapper}>
            <div className={styles.headlines}>
              {this.newsHeadlines.map((headline, index) => (
                <Link
                  to="/news"
                  key={headline.id}
                  className={`${styles.headline} ${
                    this.state.currentSlide === index ? styles.active : ""
                  }`}
                >
                  <span className={styles.headlineText}>{headline.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link to="/news" className={styles.viewAllBtn}>
            View All News
          </Link>
        </div>
      </div>
    );
  }
}

export default NewsCarousel;

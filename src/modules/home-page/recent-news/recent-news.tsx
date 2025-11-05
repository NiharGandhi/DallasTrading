import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./recent-news.module.scss";
import { IRecentNewsProps, IRecentNewsStates } from "./recent-news.constants";
import ShadowHeading from "../../../components/common/headings/shadowHeading/shadowHeading";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IStore } from "../../../utils/models/store.model";
import { getRecentNews } from "../../../store/news/newsActions";
import { fetchAsyncNewsData } from "../../../store/news/newsSlice";

class RecentNews extends Component<IRecentNewsProps, IRecentNewsStates> {
  private imageIntervals: { [key: string]: NodeJS.Timeout | null } = {};

  constructor(props: IRecentNewsProps) {
    super(props);
    this.state = {
      currentNewsIndex: 0,
      currentImageIndex: 0,
      imageIndices: {},
    };
  }

  componentDidMount(): void {
    if (!this.props.newsData || this.props.newsData.length === 0) {
      (this.props as any).fetchAsyncNewsData();
    }
    this.startAllCarousels();
  }

  componentWillUnmount(): void {
    Object.values(this.imageIntervals).forEach((interval) => {
      if (interval) clearInterval(interval);
    });
  }

  startAllCarousels() {
    this.props.newsData.forEach((news) => {
      this.imageIntervals[news.id] = setInterval(() => {
        this.nextImage(news.id);
      }, 4000);
    });
  }

  nextImage(newsId: string) {
    const news = this.props.newsData.find((n) => n.id === newsId);
    if (news && news.images) {
      this.setState((prevState) => {
        const currentIndex = prevState.imageIndices[newsId] || 0;
        return {
          imageIndices: {
            ...prevState.imageIndices,
            [newsId]: currentIndex === news.images.length - 1 ? 0 : currentIndex + 1,
          },
        };
      });
    }
  }

  prevImage(newsId: string) {
    const news = this.props.newsData.find((n) => n.id === newsId);
    if (news && news.images) {
      this.setState((prevState) => {
        const currentIndex = prevState.imageIndices[newsId] || 0;
        return {
          imageIndices: {
            ...prevState.imageIndices,
            [newsId]: currentIndex === 0 ? news.images.length - 1 : currentIndex - 1,
          },
        };
      });
      // Restart interval
      if (this.imageIntervals[newsId]) {
        clearInterval(this.imageIntervals[newsId]!);
        this.imageIntervals[newsId] = setInterval(() => {
          this.nextImage(newsId);
        }, 4000);
      }
    }
  }

  render(): ReactNode {
    if (!this.props.newsData || this.props.newsData.length === 0) {
      return null;
    }

    return (
      <section className={styles.recentNews}>
        <div className={styles.container}>
          <div className={styles.header}>
            <ShadowHeading headingText1="Recent" headingText2="News" />
            <p className={styles.subtitle}>
              Stay Updated with Our Latest Announcements and Partnerships
            </p>
          </div>

          <div className={styles.newsGrid}>
            {this.props.newsData.map((news) => {
              const currentImageIndex = this.state.imageIndices[news.id] || 0;
              return (
                <div key={news.id} className={styles.newsCard}>
                  <div className={styles.carouselContainer}>
                    <img
                      src={news.images[currentImageIndex]}
                      alt={news.title}
                      className={styles.carouselImage}
                    />
                    {news.images.length > 1 && (
                      <>
                        <button
                          className={`${styles.carouselButton} ${styles.prev}`}
                          onClick={() => this.prevImage(news.id)}
                        >
                          <ChevronLeft />
                        </button>
                        <button
                          className={`${styles.carouselButton} ${styles.next}`}
                          onClick={() => this.nextImage(news.id)}
                        >
                          <ChevronRight />
                        </button>
                        <div className={styles.imageIndicators}>
                          {news.images.map((_, index) => (
                            <span
                              key={index}
                              className={`${styles.indicator} ${
                                currentImageIndex === index ? styles.active : ""
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles.newsContent}>
                    <p className={styles.newsTagline}>{news.tagline}</p>
                    <p className={styles.newsDate}>
                      {new Date(news.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <Link to={`/news/${news.id}`} className={styles.readMoreBtn}>
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  newsData: getRecentNews(state, 3),
});

const mapDispatchToProps = {
  fetchAsyncNewsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentNews);

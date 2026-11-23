import { Component, ReactNode } from "react";
import styles from "./news-carousel.module.scss";
import { INewsCarouselProps, INewsCarouselStates } from "./news-carousel.constants";
import { NewspaperRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { IStore } from "../../../utils/models/store.model";
import { getRecentNews } from "../../../store/news/newsActions";
import { fetchAsyncNewsData } from "../../../store/news/newsSlice";

class NewsCarousel extends Component<INewsCarouselProps, INewsCarouselStates> {
  constructor(props: INewsCarouselProps) {
    super(props);
    this.state = { currentSlide: 0, waitAgain: false };
    this.nextSlide = this.nextSlide.bind(this);
  }

  componentDidMount(): void {
    this.props.fetchAsyncNewsData();
    setInterval(() => {
      if (!this.state.waitAgain) {
        this.nextSlide();
      } else {
        this.setState({ waitAgain: false });
      }
    }, 5000);
  }

  nextSlide() {
    const count = this.props.newsData.length || 1;
    if (this.state.currentSlide === count - 1) {
      this.setState({ currentSlide: 0 });
    } else {
      this.setState({ currentSlide: this.state.currentSlide + 1 });
    }
  }

  render(): ReactNode {
    const { newsData } = this.props;
    return (
      <div className={styles.newsCarousel}>
        <div className={styles.carouselContainer}>
          <div className={styles.newsIcon}>
            <NewspaperRounded />
          </div>
          <div className={styles.headlinesWrapper}>
            <div className={styles.headlines}>
              {newsData.map((article, index) => (
                <Link
                  to={`/news/${article.id}`}
                  key={article.id}
                  className={`${styles.headline} ${
                    this.state.currentSlide === index ? styles.active : ""
                  }`}
                >
                  <span className={styles.headlineText}>{article.title}</span>
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

const mapStateToProps = (state: IStore) => ({
  newsData: getRecentNews(state, 3),
  loader: state.news.loader,
});

export default connect(mapStateToProps, { fetchAsyncNewsData })(NewsCarousel);

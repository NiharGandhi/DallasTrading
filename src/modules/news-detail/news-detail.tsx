import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./news-detail.module.scss";
import { INewsDetailProps, INewsDetailStates } from "./news-detail.constants";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IStore } from "../../utils/models/store.model";
import { getNewsData } from "../../store/news/newsActions";
import { fetchAsyncNewsData } from "../../store/news/newsSlice";
import withRouter from "../../components/common/withRouterComponent/withRouter";

class NewsDetail extends Component<INewsDetailProps, INewsDetailStates> {
  private imageInterval: NodeJS.Timeout | null = null;

  constructor(props: INewsDetailProps) {
    super(props);
    this.state = {
      currentImageIndex: 0,
      newsId: "",
    };
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
  }

  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const newsId = this.props.router.params.newsId;
    if (newsId) {
      this.setState({ newsId });
    }
    // Only fetch if we don't have data yet
    if (!this.props.allNews || this.props.allNews.length === 0) {
      this.props.fetchAsyncNewsData();
    }
    this.startImageCarousel();
  }

  componentDidUpdate(prevProps: Readonly<INewsDetailProps>): void {
    // Check if the news ID in the URL has changed
    const prevNewsId = prevProps.router.params.newsId;
    const currentNewsId = this.props.router.params.newsId;

    if (prevNewsId !== currentNewsId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.setState({ newsId: currentNewsId, currentImageIndex: 0 });
    }
  }

  componentWillUnmount(): void {
    if (this.imageInterval) {
      clearInterval(this.imageInterval);
    }
  }

  startImageCarousel() {
    this.imageInterval = setInterval(() => {
      this.nextImage();
    }, 4000);
  }

  nextImage() {
    const newsId = this.props.router.params.newsId;
    const currentNews = this.props.allNews.find((news) => news.id === newsId);

    if (currentNews && currentNews.images) {
      this.setState((prevState) => ({
        currentImageIndex:
          prevState.currentImageIndex === currentNews.images.length - 1
            ? 0
            : prevState.currentImageIndex + 1,
      }));
    }
  }

  prevImage() {
    const newsId = this.props.router.params.newsId;
    const currentNews = this.props.allNews.find((news) => news.id === newsId);

    if (currentNews && currentNews.images) {
      this.setState((prevState) => ({
        currentImageIndex:
          prevState.currentImageIndex === 0
            ? currentNews.images.length - 1
            : prevState.currentImageIndex - 1,
      }));
    }
    if (this.imageInterval) {
      clearInterval(this.imageInterval);
      this.startImageCarousel();
    }
  }

  render(): ReactNode {
    // Show loading state while fetching data
    if (this.props.loader) {
      return (
        <section className={styles.newsDetail}>
          <BreadCrumb
            items={[
              { moduleName: "Home", link: "/home" },
              { moduleName: "News", link: "/news" },
              { moduleName: "Loading...", link: "" },
            ]}
          />
          <div className={styles.container}>
            <p>Loading news article...</p>
          </div>
        </section>
      );
    }

    // Get current news based on URL parameter
    const newsId = this.props.router.params.newsId;
    const currentNews = this.props.allNews.find((news) => news.id === newsId);

    if (!currentNews) {
      return (
        <section className={styles.newsDetail}>
          <BreadCrumb
            items={[
              { moduleName: "Home", link: "/home" },
              { moduleName: "News", link: "/news" },
              { moduleName: "Not Found", link: "" },
            ]}
          />
          <div className={styles.container}>
            <p>News article not found.</p>
          </div>
        </section>
      );
    }

    const otherNews = this.props.allNews.filter((news) => news.id !== currentNews.id);

    return (
      <section className={styles.newsDetail}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "News", link: "/news" },
            { moduleName: currentNews.title, link: "" },
          ]}
        />

        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.mainContent}>
              <div className={styles.header}>
                <h1 className={styles.title}>{currentNews.title}</h1>
                <p className={styles.date}>
                  {new Date(currentNews.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className={styles.carouselSection}>
                <div className={styles.mainCarousel}>
                  {currentNews.images && currentNews.images.length > 0 && (
                    <>
                      <img
                        src={currentNews.images[this.state.currentImageIndex]}
                        alt={`${currentNews.title} ${this.state.currentImageIndex + 1}`}
                        className={styles.mainImage}
                      />
                      {currentNews.images.length > 1 && (
                        <>
                          <button
                            className={`${styles.carouselButton} ${styles.prev}`}
                            onClick={() => this.prevImage()}
                          >
                            <ChevronLeft />
                          </button>
                          <button
                            className={`${styles.carouselButton} ${styles.next}`}
                            onClick={() => this.nextImage()}
                          >
                            <ChevronRight />
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className={styles.thumbnailGrid}>
                  {currentNews.images &&
                    currentNews.images.map((image, index) => (
                      <div
                        key={index}
                        className={`${styles.thumbnail} ${
                          this.state.currentImageIndex === index ? styles.active : ""
                        }`}
                        onClick={() => {
                          this.setState({ currentImageIndex: index });
                          if (this.imageInterval) {
                            clearInterval(this.imageInterval);
                            this.startImageCarousel();
                          }
                        }}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    ))}
                </div>
              </div>

              <div className={styles.contentSection}>
                <p className={styles.tagline}>{currentNews.tagline}</p>
                <div className={styles.content}>
                  <p>{currentNews.content}</p>
                </div>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <h3 className={styles.sidebarTitle}>Other News</h3>
              <div className={styles.newsList}>
                {otherNews.map((news) => (
                  <Link
                    to={`/news/${news.id}`}
                    key={news.id}
                    className={styles.newsCard}
                  >
                    <img
                      src={news.mainImage}
                      alt={news.title}
                      className={styles.newsCardImage}
                    />
                    <div className={styles.newsCardContent}>
                      <h4 className={styles.newsCardTitle}>{news.title}</h4>
                      <p className={styles.newsCardDate}>
                        {new Date(news.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  allNews: getNewsData(state),
  loader: state.news.loader,
});

const mapDispatchToProps = {
  fetchAsyncNewsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewsDetail));

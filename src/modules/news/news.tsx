import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./news.module.scss";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import { INewsProps, INewsStates } from "./news.constants";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";
import { IStore } from "../../utils/models/store.model";
import { getNewsData } from "../../store/news/newsActions";
import { fetchAsyncNewsData } from "../../store/news/newsSlice";

class News extends Component<INewsProps, INewsStates> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!this.props.newsData || this.props.newsData.length === 0) {
      this.props.fetchAsyncNewsData();
    }
  }

  render(): ReactNode {
    return (
      <section className={styles.newsContainer}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "News", link: "" },
          ]}
        />

        <div className={styles.container}>
          <div className={styles.header}>
            <ShadowHeading
              headingText1="Latest"
              headingText2="News"
              backShadowHeading={false}
            />
            <p className={styles.subtitle}>
              Stay updated with our latest partnerships, achievements, and industry insights
            </p>
          </div>

          <div className={styles.newsGrid}>
            {this.props.newsData && this.props.newsData.length > 0 ? (
              this.props.newsData.map((news, index) => (
                <Link
                  to={`/news/${news.id}`}
                  key={news.id}
                  className={styles.newsCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={news.mainImage}
                      alt={news.title}
                      className={styles.newsImage}
                      loading="lazy"
                    />
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
                  </div>
                </Link>
              ))
            ) : (
              <p className={styles.emptyMessage}>No news articles available.</p>
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  newsData: getNewsData(state),
});

const mapDispatchToProps = {
  fetchAsyncNewsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(News);

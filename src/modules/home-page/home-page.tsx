import { Component, ReactNode } from "react";
import styles from "./home-page.module.scss";
import { IHomePageProps, IHomePageStates } from "./home-page.constants";
import NewsCarousel from "./news-carousel/news-carousel";
import AchievementCarousal from "./achievements-carousal/achievements-carousal";
import OurProducts from "./our-products/our-products";
import OurPartners from "./our-partners/our-partners";
import AboutUs from "./about-us/about-us";
import RecentNews from "./recent-news/recent-news";

class HomePage extends Component<IHomePageProps, IHomePageStates> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  render(): ReactNode {
    return (
      <div className={styles.homePage}>
        <AchievementCarousal />
        {/* <div
          style={{ width: "100%", height: "40vh", backgroundColor: "#DCF0F7" }}
        ></div> */}
        <OurProducts />
        <AboutUs />
        <OurPartners />
        <RecentNews />
      </div>
    );
  }
}

export default HomePage;

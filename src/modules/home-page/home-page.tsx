import { Component, ReactNode } from "react";
import styles from "./home-page.module.scss";
import { IHomePageProps, IHomePageStates } from "./home-page.constants";
import AchievementCarousal from "./achievements-carousal/achievements-carousal";
import OurProducts from "./our-products/our-products";
import JoinMailingList from "../../components/common/joinMailingList/joinMailingList";
import OurPartners from "./our-partners/our-partners";
import AboutUs from "./about-us/about-us";

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
        <JoinMailingList />
      </div>
    );
  }
}

export default HomePage;

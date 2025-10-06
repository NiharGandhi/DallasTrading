import { Component, ReactNode } from "react";
import styles from "./about-us.module.scss";
import { IAboutUsProps, IAboutUsStates } from "./about-us.constants";
import UnderlinedHeading from "../../../components/common/headings/underlinedHeading/underlinedHeading";
import CountUp from "react-countup";

class AboutUs extends Component<IAboutUsProps, IAboutUsStates> {
  render(): ReactNode {
    return (
      <div className={styles.aboutUsContainer}>
        <UnderlinedHeading headingText="About Us" />
        <div className={styles.aboutData}>
          <div className={styles.col1}>
            <div className={styles.data}>
              <h1 className={styles.numbers}>
                <CountUp
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                  end={1000}
                  duration={5}
                ></CountUp>
                +
              </h1>
              <h3 className={styles.info}>Customers Served</h3>
            </div>
            <div className={styles.data}>
              <h1 className={styles.numbers}>
                <CountUp
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                  end={10}
                  duration={5}
                ></CountUp>
                +
              </h1>
              <h3 className={styles.info}>Countires Operation</h3>
            </div>
          </div>
          <div className={styles.col2}>
            <div className={styles.data}>
              <h1 className={styles.numbers}>
                <CountUp
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                  end={200}
                  duration={5}
                ></CountUp>
                +
              </h1>
              <h3 className={styles.info}>Products Catalogue</h3>
            </div>
            <div className={styles.data}>
              <h1 className={styles.numbers}>
                <CountUp
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                  end={150}
                  duration={5}
                ></CountUp>
                +
              </h1>
              <h3 className={styles.info}>Supplliers across</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;

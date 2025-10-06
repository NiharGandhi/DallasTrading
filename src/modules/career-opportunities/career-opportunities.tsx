import { Component, ReactNode } from "react";
import styles from "./career-opportunities.module.scss";
import {
  ICareerOpportunitiesProps,
  ICareerOpportunitiesStates,
} from "./career-opportunities.constants";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";
import dallas_group_po_box_img from "./dallas_group_po_box.png";

class CareerOpportunities extends Component<
  ICareerOpportunitiesProps,
  ICareerOpportunitiesStates
> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  render(): ReactNode {
    return (
      <div className={styles.careerOpportunitiesContainer}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "Career Opportunities", link: "" },
          ]}
        />
        <ShadowHeading
          headingText1="Career"
          headingText2="Opportunities"
          backShadowHeading={false}
        />
        <div className={styles.infoSection}>
          <img
            className={styles.img}
            src={dallas_group_po_box_img}
            alt="dallas_group_po_box_img"
          />
          <div className={styles.textCont}>
            <p className={styles.text}>
              Dallas requires a dynamic Sales Head for its newly formed Oil &
              Gas Division. The ideal candidate should have about 10 year
              experience in Sales of electrical in Gulf region including a
              minimum of 4 to 5 years of sales experience to Oil & Gas sector.
            </p>
            <p className={styles.text}>Key responsibilities would include</p>
            <ul className={styles.text}>
              <li>
                Product portfolio & Customer development in Oil & Gas Segment.
              </li>
              <li>Strategic Relationship Management.</li>
              <li>Design and implement Sales strategies.</li>
              <li>Implementing and Supervising Sales process.</li>
            </ul>
            <p className={styles.text}>
              To apply for one of the above positions, email or post to the
              below addresses.Should you have questions, please do not hesitate
              to contact the HR Department on the specified email address.
            </p>
            <p className={styles.text}>
              Dallas GroupPO Box; 2028, Dubai,United Arab Emirates Email :
              <strong className={styles.highlight}>
                {" "}
                info@dallastrading.net
              </strong>
            </p>
            <p className={styles.text}>
              We have a working environment in which all individuals are able to
              make the best use of their skills, free from discrimination or
              harassment, and in which all decisions are based on merit.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CareerOpportunities;

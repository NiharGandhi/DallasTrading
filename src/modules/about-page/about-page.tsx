import { Component, ReactNode } from "react";
import styles from "./about-page.module.scss";
import { IAboutPageProps, IAboutPageStates } from "./about-page.constants";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import companyLogo from "./../../images/Dallas_logo.png";
import OurPartners from "../home-page/our-partners/our-partners";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";
import { connect } from "react-redux";
import { IStore } from "../../utils/models/store.model";
import { fetchAsyncPage } from "../../store/pages/pagesSlice";

const ABOUT_FALLBACK = [
  {
    heading: "Our Story",
    content: "Founded in 1995 under the visionary leadership of Mr. Prakash Ahuja, Dallas Group has evolved from its roots in Dubai into a multi-regional enterprise with a strong presence in the UAE, Oman, and Bahrain, and a growing footprint through an associated company in Dammam, Saudi Arabia.",
  },
  {
    heading: "Our Excellence",
    content: "Over the years, Dallas has built a reputation for reliability, efficiency, and customer-focused service. Guided by a well-structured management framework - with Mr. Prakash Ahuja at the helm and each division led by experienced General Managers and Directors - the Group ensures streamlined operations and consistent excellence across all regions.",
  },
  {
    heading: "Our Approach",
    content: "At Dallas, we believe in partnership-driven growth. Our customers are our collaborators, and we go beyond supplying products by offering technical expertise, cost-effective solutions, and end-to-end support. Our centralized sales coordination and sourcing teams based in Dubai, Oman, and Bahrain work closely to ensure timely deliveries, technical assistance, and superior after-sales service.",
  },
  {
    heading: "Our Commitment",
    content: "We are deeply committed to innovation, sustainability, and alignment with government initiatives aimed at building a more energy-efficient and sustainable future. Through continuous research, collaboration with consultants, and a focus on operational efficiency, Dallas Group continues to expand its capabilities — delivering value, fostering trust, and driving long-term success across the Middle East.",
  },
];

const CARD_CLASSES = ["storyCard", "valuesCard", "approachCard", "commitmentCard"] as const;

class AboutPage extends Component<IAboutPageProps, IAboutPageStates> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.props.fetchAsyncPage("about-us");
  }

  render(): ReactNode {
    const { page } = this.props;

    return (
      <div className={styles.aboutPageContainer}>
        <div className={styles.backgroundAccent}></div>

        <div className={styles.contentWrapper}>
          <BreadCrumb
            items={[
              { moduleName: "Home", link: "/home" },
              { moduleName: "About Us", link: "" },
            ]}
          />

          <div className={styles.heroSection}>
            <div className={styles.heading}>
              <ShadowHeading
                headingText1="About"
                headingText2="Us"
                backShadowHeading={false}
              />
            </div>
            <div className={styles.logoContainer}>
              <img className={styles.logo} src={companyLogo} alt="dallas_logo" />
            </div>
          </div>

          <div className={styles.introCard}>
            <p className={styles.introText}>
              Welcome to <span className={styles.highlight}>Dallas Group of Companies</span> - a trusted name in the trading
              and distribution of high-quality electrical products and industrial
              solutions across the GCC.
            </p>
          </div>

          {page?.sections?.length ? (
            <div
              className={styles.cmsContent}
              dangerouslySetInnerHTML={{ __html: page.sections.map(s => s.content ?? "").join("") }}
            />
          ) : (
            <div className={styles.contentSection}>
              {ABOUT_FALLBACK.map((item, index) => (
                <div key={index} className={styles[CARD_CLASSES[index] ?? "storyCard"]}>
                  {index === 0 ? (
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{item.heading}</h3>
                      <div className={styles.yearBadge}>Since 1995</div>
                    </div>
                  ) : (
                    <h3 className={styles.cardTitle}>{item.heading}</h3>
                  )}
                  <p className={styles.cardText}>{item.content}</p>
                </div>
              ))}
            </div>
          )}

          <div className={styles.partnersSection}>
            <OurPartners isSidePaddingNeeded={false} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IStore) => ({ page: state.pages.pages["about-us"] ?? null }),
  { fetchAsyncPage }
)(AboutPage);

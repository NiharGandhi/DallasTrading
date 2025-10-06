import { Component, ReactNode } from "react";
import styles from "./about-page.module.scss";
import { IAboutPageProps, IAboutPageStates } from "./about-page.constants";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import companyLogo from "./../../images/Dallas_logo.png";
import OurPartners from "../home-page/our-partners/our-partners";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";

class AboutPage extends Component<IAboutPageProps, IAboutPageStates> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  render(): ReactNode {
    return (
      <div className={styles.aboutPageContainer}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "About Us", link: "" },
          ]}
        />
        <div className={styles.heading}>
          <ShadowHeading
            headingText1="About"
            headingText2="Us"
            backShadowHeading={false}
          />
          <img className={styles.logo} src={companyLogo} alt="dallas_logo" />
        </div>
        <p className={styles.aboutText}>
          Welcome to Dallas Group your dependable source for electrical products
          for trade & industry, dedicated to provide genuine products with
          prompt customer service.
        </p>
        <p className={styles.aboutText}>
          Dallas was founded by Mr. Prakash Ahuja about twenty three years back
          with one division in Dubai and in pursuit of his passion he expanded
          to serve entire United Arab Emirates, followed by adding divisions in
          Qatar and Oman. Mr. Prakash Ahuja is assisted by his operations team
          headed by Chief Executive Officer at Head office and each division is
          headed by General Managers.
        </p>
        <p className={styles.aboutText}>
          Dallas serves to its customers from GCC countries and African region
          too. Dallas network of branches provides excellent service, technical
          support and optimum stocks to meet customer requirements in time.
          Dallas group has over 20,000 sqft of storage space and manned by sixty
          staff. We are proud of our centralized skilled sales coordination cum
          sourcing team based in Dubai and Europe to support our partners in the
          Middle East and Africa region. Dallas treats its customers as partners
          and strives continually in their growth and development. This has been
          possible due to its trained staff, who also imparts technical advice
          to buy and install electrical products to save on costs and to get
          best results. Dallas team works closely with consultants, suggesting
          efficient & economical products, does R&D for them, which in turn adds
          to our product profile. We strongly believe in contributing to
          environment in line with Governments strategy of sustainability.
        </p>
        <OurPartners isSidePaddingNeeded={false} />
      </div>
    );
  }
}

export default AboutPage;

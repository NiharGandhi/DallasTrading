import { Component, ReactNode } from "react";
import styles from "./our-partners.module.scss";
import {
  IOurPartnersProps,
  IOurPartnersStates,
} from "./our-partners.constants";
import Aos from "aos";
import "aos/dist/aos.css";
import ShadowHeading from "../../../components/common/headings/shadowHeading/shadowHeading";
import Partner1 from "./../../../store/our-companies/ourCompaniesImages/pce.jpeg";
import Partner2 from "./../../../store/our-companies/ourCompaniesImages/3M.png";
import Partner3 from "./../../../store/our-companies/ourCompaniesImages/raychem-logo.png";
import Partner4 from "./../../../store/our-companies/ourCompaniesImages/barton.png";
import Partner5 from "./../../../store/our-companies/ourCompaniesImages/oxford.png";
import Partner6 from "./../../../store/our-companies/ourCompaniesImages/mk-logo.jpg";
import Partner7 from "./../../../store/our-companies/ourCompaniesImages/legrand-logo.png";
import Partner8 from "./../../../store/our-companies/ourCompaniesImages/hex.png";
import Partner9 from "./../../../store/our-companies/ourCompaniesImages/breeze.png";
import Partner10 from "./../../../store/our-companies/ourCompaniesImages/Ashfield.png";
import Partner11 from "./../../../store/our-companies/ourCompaniesImages/elite.svg";
import Partner12 from "./../../../store/our-companies/ourCompaniesImages/MESC.jpg";
import Partner13 from "./../../../store/our-companies/ourCompaniesImages/schneider-logo.png";
import Partner14 from "./../../../store/our-companies/ourCompaniesImages/marechal_electric.jpg";
import Partner15 from "./../../../store/our-companies/ourCompaniesImages/hager.png";
import Partner16 from "./../../../store/our-companies/ourCompaniesImages/simplex.png";
import Partner17 from "./../../../store/our-companies/ourCompaniesImages/Katko.jpeg";
import Partner18 from "./../../../store/our-companies/ourCompaniesImages/Braco.png";


class OurPartners extends Component<IOurPartnersProps, IOurPartnersStates> {
  constructor(props: IOurPartnersProps) {
    super(props);
    this.state = {
      isMobileWidth: window.innerWidth <= 640,
      isDesktopWidth: window.innerWidth <= 1400,
    };
    this.handleResize = this.handleResize.bind(this);
  }
  partnersList = [
    { image: Partner1, altText: "PCE", name: "PCE" },
    { image: Partner2, altText: "3M", name: "3M" },
    { image: Partner3, altText: "Raychem", name: "Raychem" },
    { image: Partner4, altText: "Barton", name: "Barton" },
    { image: Partner5, altText: "Oxford", name: "Oxford" },
    { image: Partner6, altText: "MK", name: "MK" },
    { image: Partner7, altText: "Legrand", name: "Legrand" },
    { image: Partner8, altText: "Hex", name: "Hex" },
    { image: Partner9, altText: "Breeze", name: "Breeze" },
    { image: Partner10, altText: "Ashfield", name: "Ashfield" },
    { image: Partner11, altText: "Elite", name: "Elite" },
    { image: Partner12, altText: "MESC", name: "MESC" },
    { image: Partner13, altText: "Schneider", name: "Schneider" },
    { image: Partner14, altText: "Marechal Electric", name: "Marechal Electric" },
    { image: Partner15, altText: "Hager", name: "Hager" },
    { image: Partner16, altText: "Simplex", name: "Simplex" },
    { image: Partner17, altText: "Katko", name: "Katko" },
    { image: Partner18, altText: "Braco", name: "Braco" },
  ];
  componentDidMount(): void {
    Aos.init();
    window.addEventListener("resize", this.handleResize);
  }
  handleResize() {
    this.setState({
      isMobileWidth: window.innerWidth <= 640,
      isDesktopWidth: window.innerWidth <= 1400,
    });
  }
  componentWillUnmount(): void {
    window.removeEventListener("resize", this.handleResize);
  }
  render(): ReactNode {
    return (
      <section
        className={styles.ourPartners}
        style={{
          paddingRight: this.props.isSidePaddingNeeded === false ? "0" : "",
          paddingLeft: this.props.isSidePaddingNeeded === false ? "0" : "",
        }}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <ShadowHeading headingText1="Our" headingText2="Partners" />
            <p className={styles.subtitle}>
              Authorized Distributors of Leading Global Brands
            </p>
          </div>
          
          <div className={styles.partnersGrid}>
            {this.partnersList.map((partner, index) => (
              <div
                key={index}
                className={styles.partnerCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.partnerImageContainer}>
                  <img
                    className={styles.partnerImage}
                    src={partner.image}
                    alt={partner.altText}
                    loading="lazy"
                  />
                </div>
                <div className={styles.partnerName}>
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default OurPartners;

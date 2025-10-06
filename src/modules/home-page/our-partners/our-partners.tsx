import { Component, ReactNode } from "react";
import styles from "./our-partners.module.scss";
import {
  IOurPartnersProps,
  IOurPartnersStates,
} from "./our-partners.constants";
import Aos from "aos";
import "aos/dist/aos.css";
import ShadowHeading from "../../../components/common/headings/shadowHeading/shadowHeading";
import Partner1 from "./../../../store/our-companies/ourCompaniesImages/pce.png";
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
    [
      { image: Partner1, altText: "partner_1", delay: 0, customWidth: "8rem" },
      {
        image: Partner2,
        altText: "partner_2",
        delay: 100,
        customWidth: "8rem",
      },
      {
        image: Partner3,
        altText: "partner_3",
        delay: 200,
        customWidth: "10rem",
      },
      {
        image: Partner4,
        altText: "partner_4",
        delay: 300,
        customWidth: "10rem",
      },
    ],
    [
      {
        image: Partner5,
        altText: "partner_5",
        delay: 100,
        customWidth: "10rem",
      },
      {
        image: Partner6,
        altText: "partner_6",
        delay: 200,
        customWidth: "6rem",
        marginLeft: "-0.8rem",
      },
      {
        image: Partner7,
        altText: "partner_7",
        delay: 300,
        customWidth: "10rem",
        marginLeft: "1rem",
      },
      {
        image: Partner8,
        altText: "partner_8",
        delay: 200,
        customWidth: "6rem",
        marginLeft: "0.8rem",
      },
    ],
    [
      {
        image: Partner9,
        altText: "partner_9",
        delay: 300,
        customWidth: "10rem",
        marginLeft: "-0.4rem",
      },
      {
        image: Partner10,
        altText: "partner_10",
        delay: 400,
        customWidth: "10rem",
        marginLeft: "-1.4rem",
      },
      {
        image: Partner11,
        altText: "partner_11",
        delay: 500,
        customWidth: "10rem",
        marginLeft: "-2rem",
      },
      {
        image: Partner12,
        altText: "partner_12",
        delay: 200,
        customWidth: "10rem",
      },
    ],
    [
      {
        image: Partner13,
        altText: "partner_13",
        delay: 300,
        customWidth: "10rem",
      },
      {
        image: Partner14,
        altText: "partner_14",
        delay: 300,
        customWidth: "10rem",
        marginLeft: "-1rem",
      },
    ],
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
      <div
        className={styles.ourPartners}
        style={{
          paddingRight: this.props.isSidePaddingNeeded === false ? "0" : "",
          paddingLeft: this.props.isSidePaddingNeeded === false ? "0" : "",
        }}
      >
        <div className={styles.heading}>
          <ShadowHeading headingText1="Our" headingText2="Partners" />
        </div>
        <table className={styles.partners}>
          <tbody>
            {this.partnersList.map((list, i) => (
              <tr key={i} className={styles.row}>
                {list.map((item, j) => {
                  return (
                    <td
                      key={j}
                      data-aos="fade-left"
                      data-aos-delay={item.delay}
                      data-aos-offset="100"
                      data-aos-duration="1500"
                      data-aos-once="true"
                    >
                      <img
                        className={styles.partnerImg}
                        style={{
                          marginLeft: item?.marginLeft ? item.marginLeft : "",
                          width: this.state.isMobileWidth
                            ? ""
                            : this.state.isDesktopWidth
                            ? ""
                            : item.customWidth,
                        }}
                        src={item.image}
                        alt={item.altText}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OurPartners;

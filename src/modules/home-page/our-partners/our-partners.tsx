import { Component, ReactNode } from "react";
import styles from "./our-partners.module.scss";
import {
  IOurPartnersProps,
  IOurPartnersStates,
} from "./our-partners.constants";
import Aos from "aos";
import "aos/dist/aos.css";
import ShadowHeading from "../../../components/common/headings/shadowHeading/shadowHeading";
import { connect } from "react-redux";
import { IStore } from "../../../utils/models/store.model";
import { fetchAsyncPartnersData } from "../../../store/partners/partnersSlice";
import CustomLoader from "../../../components/common/loader/loader";

class OurPartners extends Component<IOurPartnersProps, IOurPartnersStates> {
  constructor(props: IOurPartnersProps) {
    super(props);
    this.state = {
      isMobileWidth: window.innerWidth <= 640,
      isDesktopWidth: window.innerWidth <= 1400,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount(): void {
    Aos.init();
    window.addEventListener("resize", this.handleResize);
    if (!this.props.partnersData.length) {
      this.props.fetchAsyncPartnersData();
    }
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
    const { partnersData, loader } = this.props;

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

          {loader ? (
            <CustomLoader />
          ) : (
            <div className={styles.partnersGrid}>
              {partnersData.map((partner, index) => (
                <div
                  key={partner.id}
                  className={styles.partnerCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.partnerImageContainer}>
                    {partner.logoUrl ? (
                      <img
                        className={styles.partnerImage}
                        src={partner.logoUrl}
                        alt={partner.name}
                        loading="lazy"
                      />
                    ) : (
                      <span className={styles.partnerName}>{partner.name}</span>
                    )}
                  </div>
                  <div className={styles.partnerName}>{partner.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default connect(
  (state: IStore) => ({
    partnersData: state.partners.partnersData,
    loader: state.partners.loader,
  }),
  { fetchAsyncPartnersData }
)(OurPartners);

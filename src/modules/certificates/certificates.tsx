import { Component, ReactNode } from "react";
import styles from "./centificates.module.scss";
import certificate_img1 from "./images/ISO Certificate - DUBAI 2023.jpg";
import certificate_img2 from "./images/ISO - OMAN 2023.jpg";
import {
  ICertificatesProps,
  ICertificatesStates,
} from "./certificates.constants";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";
import { VerifiedUserRounded, WorkspacePremiumRounded } from "@mui/icons-material";
import { connect } from "react-redux";
import { IStore } from "../../utils/models/store.model";
import { fetchAsyncPage } from "../../store/pages/pagesSlice";

const FALLBACK_HEADER = "Our commitment to quality is demonstrated through internationally recognized certifications, ensuring excellence in every aspect of our operations.";
const FALLBACK_INFO = "Our ISO 9001:2015 certifications demonstrate our dedication to maintaining the highest standards in quality management systems across all our regional operations.";

class Certificates extends Component<ICertificatesProps, ICertificatesStates> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.props.fetchAsyncPage("certificates");
  }

  render(): ReactNode {
    const { page } = this.props;
    const sections = page?.sections ?? [];
    const headerText = sections[0]?.content ?? FALLBACK_HEADER;
    const infoText = sections[1]?.content ?? FALLBACK_INFO;

    return (
      <div className={styles.certificatesContainer}>
        <div className={styles.backgroundAccent}></div>

        <div className={styles.contentWrapper}>
          <BreadCrumb
            items={[
              { moduleName: "Home", link: "/home" },
              { moduleName: "Certificates", link: "" },
            ]}
          />

          <div className={styles.headerSection}>
            <ShadowHeading
              headingText1="Certificates"
              headingText2=""
              backShadowHeading={false}
            />
            <div
              className={styles.headerDescription}
              dangerouslySetInnerHTML={{ __html: headerText }}
            />
          </div>

          <div className={styles.certificatesGrid}>
            <div className={styles.certificateCard}>
              <div className={styles.certificateBadge}>
                <WorkspacePremiumRounded className={styles.badgeIcon} />
              </div>
              <div className={styles.certificateImageWrapper}>
                <img
                  className={styles.certificateImage}
                  src={certificate_img1}
                  alt="ISO 9001:2015 Certificate - UAE"
                />
                <div className={styles.certificateOverlay}>
                  <VerifiedUserRounded className={styles.overlayIcon} />
                  <span className={styles.overlayText}>Click to view</span>
                </div>
              </div>
              <div className={styles.certificateInfo}>
                <h3 className={styles.certificateTitle}>ISO 9001:2015</h3>
                <p className={styles.certificateLocation}>United Arab Emirates</p>
              </div>
            </div>

            <div className={styles.certificateCard}>
              <div className={styles.certificateBadge}>
                <WorkspacePremiumRounded className={styles.badgeIcon} />
              </div>
              <div className={styles.certificateImageWrapper}>
                <img
                  className={styles.certificateImage}
                  src={certificate_img2}
                  alt="ISO 9001:2015 Certificate - Oman"
                />
                <div className={styles.certificateOverlay}>
                  <VerifiedUserRounded className={styles.overlayIcon} />
                  <span className={styles.overlayText}>Click to view</span>
                </div>
              </div>
              <div className={styles.certificateInfo}>
                <h3 className={styles.certificateTitle}>ISO 9001:2015</h3>
                <p className={styles.certificateLocation}>Oman</p>
              </div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <VerifiedUserRounded className={styles.infoIcon} />
              <h3 className={styles.infoTitle}>Quality Assurance</h3>
              <div
                className={styles.infoText}
                dangerouslySetInnerHTML={{ __html: infoText }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IStore) => ({ page: state.pages.pages["certificates"] ?? null }),
  { fetchAsyncPage }
)(Certificates);

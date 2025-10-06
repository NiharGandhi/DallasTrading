import { Component, ReactNode } from "react";
import styles from "./centificates.module.scss";
import certificate_img1 from "./images/ISO Certificate - DUBAI 2023.jpg";
import certificate_img2 from "./images/ISO - OMAN 2023.jpg";
import certificate_img3 from "./images/ISO CERIFICATE - QATAR 2023.jpg";
import {
  ICertificatesProps,
  ICertificatesStates,
} from "./certificates.constants";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";

class Certificates extends Component<ICertificatesProps, ICertificatesStates> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  render(): ReactNode {
    return (
      <div className={styles.certificatesContainer}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "Certificates", link: "" },
          ]}
        />
        <ShadowHeading
          headingText1="Certificates"
          headingText2=""
          backShadowHeading={false}
        />
        <div className={styles.certificates}>
          <div className={styles.certificateDiv}>
            <img
              className={styles.certificate}
              src={certificate_img1}
              alt="certificate_img1"
            />
            <p className={styles.pTag}>
              ISO 9001:2015 <br />
              UAE
            </p>
          </div>
          <div className={styles.certificateDiv}>
            <img
              className={styles.certificate}
              src={certificate_img2}
              alt="certificate_img2"
            />
            <p className={styles.pTag}>
              ISO 9001:2015 <br />
              OMAN
            </p>
          </div>
          <div className={styles.certificateDiv}>
            <img
              className={styles.certificate}
              src={certificate_img3}
              alt="certificate_img3"
            />
            <p className={styles.pTag}>
              ISO 9001:2015 <br />
              QATAR
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Certificates;

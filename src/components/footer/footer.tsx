import { Component, ReactNode } from "react";
import { IFooterProps, IFooterStates } from "./footer.constants";
import styles from "./footer.module.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

class Footer extends Component<IFooterProps, IFooterStates> {
  render(): ReactNode {
    const contacts = [
      {
        icon: <LocationOnIcon />,
        infoText: "DUBAI INDUSTRIAL CITY, PHASE 1 , BLOCK J-08, P.O.BOX 2028",
      },
      {
        icon: <CallIcon />,
        infoText: "+971 4 363 5500",
      },
      {
        icon: <LocalPrintshopIcon />,
        infoText: "+971 4 429 0088",
      },
      {
        icon: <EmailIcon />,
        infoText: "info@dallastrading.net",
      },
    ];
    const socials = [
      {
        icon: <LinkedInIcon />,
        infoText: "LinkedIn",
      },
    ];
    return (
      <div className={styles.footer}>
        <div className={styles.infoList}>
          <div className={styles.contacts}>
            <h3 className={styles.heading}>Contacts</h3>
            <table className={styles.table}>
              <tbody>
                {contacts.map((contact, ind) => (
                  <tr key={ind} className={styles.row}>
                    <td className={styles.icon}>{contact.icon}</td>
                    <td className={styles.text}>{contact.infoText}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.socials}>
            <h3 className={styles.heading}>Socials</h3>
            <table className={styles.table}>
              <tbody>
                {socials.map((contact, ind) => (
                  <tr key={ind} className={styles.row}>
                    <td className={styles.icon}>{contact.icon}</td>
                    <td className={styles.text}>
                      <a
                        className={styles.link}
                        href="https://linkedin.com/in/dallas-trading-co-llc-723306217"
                      >
                        {contact.infoText}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.locate}>
            <h3 className={styles.heading}>Locate Us</h3>
            <iframe
              title="DUBAI INDUSTRIAL CITY, PHASE 1 , BLOCK J-08, P.O.BOX 2028"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3620.105210625898!2d55.06092531500273!3d24.860255984054014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDUxJzM2LjkiTiA1NcKwMDMnNDcuMiJF!5e0!3m2!1sen!2sae!4v1690217954086!5m2!1sen!2sae"
              className={styles.gMap}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className={styles.rights}>
          © 2023 All Rights Reserved. Designed & Developed by MVP.
        </div>
      </div>
    );
  }
}

export default Footer;

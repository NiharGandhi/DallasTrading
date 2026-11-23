import { Component, Fragment, ReactNode } from "react";
import { IHomeProps, IHomeStates } from "./home.constants";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app-routes";
import styles from "./home.module.scss";
import Header from "../header/header";
import Footer from "../footer/footer";
import Chatbot from "../common/chatbot/chatbot";
import { connect } from "react-redux";
import { fetchAsyncSiteSettings } from "../../store/site-settings/siteSettingsSlice";

class Home extends Component<IHomeProps & { fetchAsyncSiteSettings: () => void }, IHomeStates> {
  componentDidMount(): void {
    this.props.fetchAsyncSiteSettings();
  }

  handleDownload() {
    const fileUrl = "/DALLAS CATALOGUE & COMPANY PROFILE.pdf";
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = "DALLAS CATALOGUE & COMPANY PROFILE.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  render(): ReactNode {
    return (
      <Fragment>
        <div className={styles.home}>
          <BrowserRouter>
            <Header />
            <div className={styles.homeBody}>
              <div className={styles.spaceHeader}></div>
              <button
                className={styles.downloadBtn}
                onClick={this.handleDownload}
              >
                Download Brochure
              </button>
              <AppRoutes />
            </div>
            <Footer />
            <Chatbot />
          </BrowserRouter>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { fetchAsyncSiteSettings })(Home);

import { Component, Fragment, ReactNode } from "react";
import { IHomeProps, IHomeStates } from "./home.constants";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app-routes";
import styles from "./home.module.scss";
import Header from "../header/header";
import Footer from "../footer/footer";
import { connect } from "react-redux";
import { IStore } from "../../utils/models/store.model";
import { getSearchValue } from "../../store/searchResults/searchResultsActions";
import SearchPage from "../../modules/search-page/search-page";

class Home extends Component<IHomeProps, IHomeStates> {
  handleDownload() {
    const fileUrl = "DALLAS CATALOGUE & COMPANY PROFILE.pdf";
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = "DALLAS CATALOGUE & COMPANY PROFILE.pdf";
    a.click();
  }
  render(): ReactNode {
    return (
      <Fragment>
        <div className={styles.home}>
          {/* Hash router (starts with # value)  */}
          <BrowserRouter>
            {/* Header remains same for entire web page */}
            <Header />
            {/* Main body of web app */}
            <div className={styles.homeBody}>
              <div className={styles.spaceHeader}></div>
              <button
                className={styles.downloadBtn}
                onClick={this.handleDownload}
              >
                Download Brochure
              </button>
              {/* All your modules goes here this section is dynamic (it change when path changes) */}
              {this.props.searchVal ? <SearchPage /> : <AppRoutes />}
            </div>
            {/* Footer remains same for entire web page */}
            <Footer />
          </BrowserRouter>
        </div>
      </Fragment>
    );
  }
}

export default connect((state: IStore) => ({
  searchVal: getSearchValue(state),
}))(Home);

import { Component, Fragment, ReactNode } from "react";
import { IHeaderProps, IHeaderStates } from "./header.constants";
import styles from "./header.module.scss";
import headerLogo from "./../../images/Dallas_logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import Menu from "../menu/menu";
import SearchModal from "../common/searchModal";
import withRouter from "../common/withRouterComponent/withRouter";
import { connect } from "react-redux";
import { handleSearchValueChange, setSearchResultsDataToInitial, fetchAsyncSearchResultsData } from "../../store/searchResults/searchResultsSlice";
import { IStore } from "../../utils/models/store.model";
import { getSearchValue, getSearchResultsFilterData, getSearchResultsLoader } from "../../store/searchResults/searchResultsActions";
import clipboardCopy from "clipboard-copy";
import { Tooltip } from "@mui/material";

class Header extends Component<IHeaderProps, IHeaderStates> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      width: window.innerWidth,
      isMobileWidth: window.innerWidth <= 576,
      isLargeDevice: window.innerWidth > 1024,
      openMenu: false,
      openSearchModal: false,
      isCopied: false,
    };
    this.handleResize = this.handleResize.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }
  handleResize() {
    this.setState({
      width: window.innerWidth,
      isMobileWidth: window.innerWidth <= 576,
      isLargeDevice: window.innerWidth > 1024,
    });
  }
  componentDidMount(): void {
    window.addEventListener("resize", this.handleResize);
  }
  componentDidUpdate(
    prevProps: Readonly<IHeaderProps>,
    prevState: Readonly<IHeaderStates>
  ): void {
    if (prevState.width !== this.state.width) {
      this.setState({ 
        isMobileWidth: this.state.width <= 576,
        isLargeDevice: this.state.width > 1024
      });
    }
  }
  componentWillUnmount(): void {
    window.removeEventListener("resize", this.handleResize);
  }
  copyToClipboard() {
    clipboardCopy("+97143635500")
      .then(() => {
        this.setState({ isCopied: true });
        setTimeout(() => {
          this.setState({ isCopied: false });
        }, 3000);
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
      });
  }
  render(): ReactNode {
    const currentPath = this.props.router.location.pathname;
    
    return (
      <Fragment>
        <Menu
          open={this.state.openMenu}
          onClose={() => this.setState({ openMenu: false })}
        />
        <SearchModal
          open={this.state.openSearchModal}
          onClose={() => this.setState({ openSearchModal: false })}
          searchVal={this.props.searchVal}
          searchResults={this.props.searchResults}
          loader={this.props.searchLoader}
          handleSearchValueChange={this.props.handleSearchValueChange}
          setSearchResultsDataToInitial={this.props.setSearchResultsDataToInitial}
          fetchAsyncSearchResultsData={this.props.fetchAsyncSearchResultsData}
          router={this.props.router}
        />
        <div className={styles.header}>
          <img
            className={styles.logo}
            src={headerLogo}
            alt="Dallas logo"
            onClick={() => this.props.router.navigate("/home")}
          />
          
          {this.state.isLargeDevice && (
            <nav className={styles.navLinks}>
              <a
                className={`${styles.navLink} ${
                  currentPath.includes("/home") ? styles.active : ""
                }`}
                onClick={() => this.props.router.navigate("/home")}
              >
                Home
              </a>
              <a
                className={`${styles.navLink} ${
                  currentPath.includes("/about") ? styles.active : ""
                }`}
                onClick={() => this.props.router.navigate("/about")}
              >
                About Us
              </a>
              <a
                className={`${styles.navLink} ${
                  currentPath.includes("/management") ? styles.active : ""
                }`}
                onClick={() => this.props.router.navigate("/management")}
              >
                Management
              </a>
              <a
                className={`${styles.navLink} ${
                  currentPath.includes("/certificates") ? styles.active : ""
                }`}
                onClick={() => this.props.router.navigate("/certificates")}
              >
                Certificates
              </a>
              <a
                className={`${styles.navLink} ${
                  currentPath.includes("/our-products") ? styles.active : ""
                }`}
                onClick={() => this.props.router.navigate("/our-products")}
              >
                Products
              </a>
              <a
                className={`${styles.navLink} ${
                  currentPath.includes("/our-projects") ? styles.active : ""
                }`}
                onClick={() => this.props.router.navigate("/our-projects")}
              >
                Projects
              </a>
              <a
                className={`${styles.navLink} ${
                  currentPath.includes("/news") ? styles.active : ""
                }`}
                onClick={() => this.props.router.navigate("/news")}
              >
                News
              </a>
              <a
                className={`${styles.navLink} ${
                  currentPath.includes("/contact-us") ? styles.active : ""
                }`}
                onClick={() => this.props.router.navigate("/contact-us")}
              >
                Contact
              </a>
            </nav>
          )}
          
          <div className={styles.rightSection}>
            <Tooltip title="Search" arrow>
              <button
                className={styles.searchButton}
                onClick={() => this.setState({ openSearchModal: true })}
                aria-label="Open search"
              >
                <SearchIcon />
              </button>
            </Tooltip>
            
            <Tooltip
              title={
                <p style={{ fontSize: "0.8rem" }}>
                  {this.state.isCopied
                    ? "Copied"
                    : "Copy to clipboard +97143635500"}
                </p>
              }
              arrow
            >
              <button
                className={styles.callUsBtn}
                onClick={() =>
                  this.state.isMobileWidth
                    ? window.open("tel:+97143635500")
                    : this.copyToClipboard()
                }
              >
                {this.state.isMobileWidth ? (
                  <CallOutlinedIcon fontSize="small" />
                ) : (
                  "Call Us"
                )}
              </button>
            </Tooltip>
            {!this.state.isLargeDevice && (
              this.state.isMobileWidth ? (
                <MenuIcon
                  className={styles.menuIconMobile}
                  onClick={() =>
                    this.setState({ openMenu: !this.state.openMenu })
                  }
                />
              ) : (
                <div
                  className={styles.menuButton}
                  onClick={() =>
                    this.setState({ openMenu: !this.state.openMenu })
                  }
                >
                  <MenuIcon className={styles.menuIcon} />
                </div>
              )
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  (state: IStore) => ({
    searchVal: getSearchValue(state),
    searchResults: getSearchResultsFilterData(state),
    searchLoader: getSearchResultsLoader(state),
  }),
  { handleSearchValueChange, setSearchResultsDataToInitial, fetchAsyncSearchResultsData }
)(withRouter(Header));

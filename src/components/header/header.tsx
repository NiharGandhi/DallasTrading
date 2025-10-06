import { Component, Fragment, ReactNode } from "react";
import { IHeaderProps, IHeaderStates } from "./header.constants";
import styles from "./header.module.scss";
import headerLogo from "./../../images/Dallas_logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import Menu from "../menu/menu";
import withRouter from "../common/withRouterComponent/withRouter";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { connect } from "react-redux";
import { handleSearchValueChange } from "../../store/searchResults/searchResultsSlice";
import { IStore } from "../../utils/models/store.model";
import { getSearchValue } from "../../store/searchResults/searchResultsActions";
import clipboardCopy from "clipboard-copy";
import { Tooltip } from "@mui/material";

class Header extends Component<IHeaderProps, IHeaderStates> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      width: 0,
      isMobileWidth: window.innerWidth <= 576,
      openMenu: false,
      toggleSearch: false,
      isCopied: false,
    };
    this.handleResize = this.handleResize.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }
  handleResize() {
    this.setState({
      width: window.innerWidth,
      isMobileWidth: window.innerWidth <= 576,
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
      this.setState({ isMobileWidth: this.state.width <= 576 });
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
    return (
      <Fragment>
        <Menu
          open={this.state.openMenu}
          onClose={() => this.setState({ openMenu: false })}
        />
        <div className={styles.header}>
          <img
            className={styles.logo}
            src={headerLogo}
            alt="Dallas logo"
            onClick={() => this.props.router.navigate("/home")}
          />
          <div className={styles.rightSection}>
            {this.state.isMobileWidth ? (
              <ClickAwayListener
                onClickAway={() => this.setState({ toggleSearch: false })}
              >
                <div className={styles.searchBarMobile}>
                  {this.state.toggleSearch ? (
                    <input
                      type="text"
                      placeholder="Search"
                      value={this.props.searchVal}
                      onChange={(e) => {
                        this.props.handleSearchValueChange(e.target.value);
                      }}
                      className={styles.inputSearchMobile}
                    />
                  ) : null}
                  {this.props.searchVal ? (
                    <HighlightOffIcon
                      className={styles.searchIconMobile}
                      onClick={() => {
                        this.props.handleSearchValueChange("");
                        this.setState({
                          toggleSearch: !this.state.toggleSearch,
                        });
                      }}
                    />
                  ) : (
                    <SearchIcon
                      className={styles.searchIconMobile}
                      onClick={() =>
                        this.setState({
                          toggleSearch: !this.state.toggleSearch,
                        })
                      }
                    />
                  )}
                </div>
              </ClickAwayListener>
            ) : (
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search"
                  value={this.props.searchVal}
                  onChange={(e) => {
                    this.props.handleSearchValueChange(e.target.value);
                  }}
                  className={styles.inputSearch}
                />
                {this.props.searchVal ? (
                  <HighlightOffIcon
                    className={styles.searchIcon}
                    onClick={() => {
                      this.props.handleSearchValueChange("");
                    }}
                  />
                ) : (
                  <SearchIcon className={styles.searchIcon} />
                )}
              </div>
            )}
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
            {this.state.isMobileWidth ? (
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
  }),
  { handleSearchValueChange }
)(withRouter(Header));

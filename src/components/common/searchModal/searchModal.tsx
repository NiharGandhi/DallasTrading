import React, { Component, ReactNode } from "react";
import { ISearchModalProps, ISearchModalStates } from "./searchModal.constants";
import styles from "./searchModal.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import { ISearchResultsData } from "../../../utils/models/search-results.model";

class SearchModal extends Component<ISearchModalProps, ISearchModalStates> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: ISearchModalProps) {
    super(props);
    this.state = {};
    this.inputRef = React.createRef();
  }

  componentDidMount(): void {
    // Fetch search data on mount if not already loaded
    this.props.fetchAsyncSearchResultsData();
  }

  componentDidUpdate(prevProps: Readonly<ISearchModalProps>): void {
    if (!prevProps.open && this.props.open) {
      // Focus input when modal opens
      setTimeout(() => {
        this.inputRef.current?.focus();
      }, 100);
    }
  }

  handleClose = () => {
    this.props.onClose();
  };

  handleClear = () => {
    this.props.handleSearchValueChange("");
  };

  handleResultClick = (item: ISearchResultsData) => {
    this.props.router.navigate(
      "/our-products/" + item.productCategoryId + "/" + item.id
    );
    this.props.setSearchResultsDataToInitial();
    this.handleClose();
  };

  render(): ReactNode {
    const { open, searchVal, handleSearchValueChange, searchResults, loader } = this.props;

    return (
      <Modal
        open={open}
        onClose={this.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            className: styles.backdrop,
          },
        }}
        className={styles.modal}
      >
        <Fade in={open}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <h2 className={styles.title}>Search</h2>
              <button className={styles.closeButton} onClick={this.handleClose}>
                <CloseIcon />
              </button>
            </div>
            
            <div className={styles.searchContainer}>
              <div className={styles.searchBar}>
                <SearchIcon className={styles.searchIcon} />
                <input
                  ref={this.inputRef}
                  type="text"
                  placeholder="Search for products, categories..."
                  value={searchVal}
                  onChange={(e) => handleSearchValueChange(e.target.value)}
                  className={styles.searchInput}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      this.handleClose();
                    }
                  }}
                />
                {searchVal && (
                  <button className={styles.clearButton} onClick={this.handleClear}>
                    <HighlightOffIcon />
                  </button>
                )}
              </div>
            </div>

            {searchVal && (
              <div className={styles.resultsSection}>
                {loader ? (
                  <div className={styles.loaderContainer}>
                    <CircularProgress size={40} />
                    <p className={styles.loadingText}>Loading results...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    <div className={styles.resultsHeader}>
                      <p className={styles.resultsCount}>
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                      </p>
                    </div>
                    <div className={styles.resultsContainer}>
                      {searchResults.map((item, index) => (
                        <div
                          key={index}
                          className={styles.resultItem}
                          onClick={() => this.handleResultClick(item)}
                        >
                          <img
                            className={styles.resultImage}
                            src={item.image}
                            alt={item.title}
                          />
                          <div className={styles.resultContent}>
                            <h4 className={styles.resultTitle}>{item.title}</h4>
                            <p className={styles.resultCategory}>
                              <span className={styles.categoryName}>{item.productCategory}</span>
                              <span className={styles.separator}>·</span>
                              <span className={styles.companyName}>{item.company}</span>
                            </p>
                          </div>
                          <ArrowForwardIcon className={styles.resultArrow} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={styles.noResults}>
                    <div className={styles.noResultsIcon}>
                      <SearchIcon />
                    </div>
                    <p className={styles.noResultsText}>
                      No results found for "<span className={styles.query}>{searchVal}</span>"
                    </p>
                    <p className={styles.noResultsHint}>
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )}
              </div>
            )}

            {!searchVal && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <SearchIcon />
                </div>
                <p className={styles.emptyText}>Start typing to search</p>
                <p className={styles.emptyHint}>
                  Search for products, categories, or companies
                </p>
              </div>
            )}

            <div className={styles.footer}>
              <div className={styles.tips}>
                <p className={styles.tipText}>
                  <kbd className={styles.kbd}>ESC</kbd> to close
                  {searchVal && searchResults.length > 0 && (
                    <>
                      <span className={styles.separator}>·</span>
                      <kbd className={styles.kbd}>↑</kbd>
                      <kbd className={styles.kbd}>↓</kbd> to navigate
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    );
  }
}

export default SearchModal;


import { Component, ReactNode } from "react";
import styles from "./search-page.module.scss";
import { ISearchPageProps, ISearchPageStates } from "./search-page.constants";
import LightWeightHeading from "../../components/common/headings/lightWeightHeading/lightWeightHeading";
import { MenuItem, Select } from "@mui/material";
import SearchResults from "./search-results/search-results";
import { connect } from "react-redux";
import { IStore } from "../../utils/models/store.model";
import {
  getSearchResultsFilterData,
  getSearchResultsLoader,
} from "../../store/searchResults/searchResultsActions";
import { fetchAsyncSearchResultsData } from "../../store/searchResults/searchResultsSlice";
import CustomLoader from "../../components/common/loader/loader";

class SearchPage extends Component<ISearchPageProps, ISearchPageStates> {
  constructor(props: ISearchPageProps) {
    super(props);
    this.state = {
      selectVal: 1,
    };
  }
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.props.fetchAsyncSearchResultsData();
  }
  render(): ReactNode {
    const { loader, data } = this.props;
    return (
      <div className={styles.searchPageContainer}>
        <div className={styles.headDiv}>
          <div className={styles.leftText}>
            <LightWeightHeading
              headingText1="Search Results "
              headingText2=""
            />
            <p className={styles.showingRes}>Showing {data.length} results</p>
          </div>
          <Select
            className={styles.selectBox}
            value={this.state.selectVal}
            onChange={(e) => this.setState({ selectVal: +e.target.value })}
          >
            <MenuItem key={`text_item_${1}`} value={1}>
              Default Sorting
            </MenuItem>
            <MenuItem key={`text_item_${2}`} value={2}>
              Sort by popularity
            </MenuItem>
            <MenuItem key={`text_item_${3}`} value={3}>
              Sort by average rating
            </MenuItem>
            <MenuItem key={`text_item_${4}`} value={4}>
              Sort by newness
            </MenuItem>
            <MenuItem key={`text_item_${5}`} value={5}>
              Sort by price: low to high
            </MenuItem>
            <MenuItem key={`text_item_${6}`} value={6}>
              Sort by price: high to low
            </MenuItem>
          </Select>
        </div>
        {loader ? (
          <div className={styles.loader}>
            <CustomLoader />{" "}
          </div>
        ) : (
          <SearchResults data={data} />
        )}
      </div>
    );
  }
}

export default connect(
  (state: IStore) => ({
    loader: getSearchResultsLoader(state),
    data: getSearchResultsFilterData(state),
  }),
  { fetchAsyncSearchResultsData }
)(SearchPage);

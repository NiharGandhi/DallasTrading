import { Component, ReactNode } from "react";
import styles from "./search-results.module.scss";
import {
  ISearchResultsProps,
  ISearchResultsStates,
} from "./search-results.constants";
import Aos from "aos";
import "aos/dist/aos.css";
import { connect } from "react-redux";
import withRouter from "../../../components/common/withRouterComponent/withRouter";
import { setSearchResultsDataToInitial } from "../../../store/searchResults/searchResultsSlice";

class SearchResults extends Component<
  ISearchResultsProps,
  ISearchResultsStates
> {
  componentDidMount(): void {
    Aos.init();
  }
  render(): ReactNode {
    return (
      <div
        className={styles.searchResultsContainer}
        data-aos="fade-up"
        data-aos-delay="20"
        data-aos-offset="50"
        data-aos-duration="1000"
        data-aos-once="true"
      >
        {this.props.data?.map((item, i) => (
          <div
            key={i}
            className={styles.resultItem}
            onClick={() => {
              this.props.router.navigate(
                "/our-products/" + item.productCategoryId + "/" + item.id
              );
              this.props.setSearchResultsDataToInitial();
            }}
          >
            <img className={styles.itemImage} src={item.image} alt={item.id} />
            <div>
              <h4 className={styles.itemText}>{item.title}</h4>
              <h5 className={styles.itemCat}>
                <span>{item.productCategory}</span>, {item.company}
              </h5>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(null, { setSearchResultsDataToInitial })(
  withRouter(SearchResults)
);

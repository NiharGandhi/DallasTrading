import { Component, ReactNode } from "react";
import styles from "./display-product-categories.module.scss";
import {
  IDisplayProductCategoriesProps,
  IDisplayProductCategoriesStates,
} from "./display-product-categories.constants";
import ProducCard from "../../../components/common/cards/productCard/productCard";
import withRouter from "../../../components/common/withRouterComponent/withRouter";
import { connect } from "react-redux";
import { IStore } from "../../../utils/models/store.model";
import { getProductsCategoryData } from "../../../store/products-category/productsCategoryActions";

class DisplayProductCategories extends Component<
  IDisplayProductCategoriesProps,
  IDisplayProductCategoriesStates
> {
  render(): ReactNode {
    return (
      <div className={styles.displayContainer}>
        <div className={styles.displayRow}>
          {this.props.productsCategoryData.map((item) => (
            <ProducCard
              key={item.id}
              data={item}
              handleClick={() => this.props.router.navigate("./" + item.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default connect((state: IStore) => ({
  productsCategoryData: getProductsCategoryData(state),
}))(withRouter(DisplayProductCategories));

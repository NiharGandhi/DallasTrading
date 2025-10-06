import { Component, ReactNode } from "react";
import styles from "./products-category-list.module.scss";
import {
  IProductsCategoryListProps,
  IProductsCategoryListStates,
} from "./products-category-list.constants";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import DisplayProductCategories from "./display-product-categories/display-product-categories";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";
import { connect } from "react-redux";
import { fetchAsyncProductsCategoryData } from "../../store/products-category/productsCategorySlice";
import { IStore } from "../../utils/models/store.model";
import { getProductsCategoryLoader } from "../../store/products-category/productsCategoryActions";
import CustomLoader from "../../components/common/loader/loader";

class ProductsCategoryList extends Component<
  IProductsCategoryListProps,
  IProductsCategoryListStates
> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.props.fetchAsyncProductsCategoryData();
  }
  render(): ReactNode {
    return (
      <div className={styles.productsPage}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "Our Products", link: "" },
          ]}
        />
        <ShadowHeading
          headingText1="Our"
          headingText2="Products"
          backShadowHeading={false}
        />
        {this.props.loader ? (
          <div className={styles.loader}>
            <CustomLoader />
          </div>
        ) : (
          <DisplayProductCategories />
        )}
      </div>
    );
  }
}

export default connect(
  (state: IStore) => ({ loader: getProductsCategoryLoader(state) }),
  { fetchAsyncProductsCategoryData }
)(ProductsCategoryList);

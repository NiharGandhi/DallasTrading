import { Component, ReactNode } from "react";
import styles from "./product-list.module.scss";
import {
  IProductListProps,
  IProductListStates,
} from "./product-list.constants";
import DisplayProducts from "./display-products/display-products";
import LightWeightHeading from "../../components/common/headings/lightWeightHeading/lightWeightHeading";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";
import { Select, MenuItem } from "@mui/material";
import { connect } from "react-redux";
import { IStore } from "../../utils/models/store.model";
import {
  getProductCategoryName,
  getProductsLoader,
} from "../../store/products/productsActions";
import { fetchAsyncProductsData } from "../../store/products/productsSlice";
import CustomLoader from "../../components/common/loader/loader";
import withRouter from "../../components/common/withRouterComponent/withRouter";

class ProductList extends Component<IProductListProps, IProductListStates> {
  constructor(props: IProductListProps) {
    super(props);
    this.state = {
      selectVal: 1,
      noOfItems: 0,
    };
  }
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const productCategoryId = this.props.router.location.pathname.split("/")[2];
    this.props.fetchAsyncProductsData({
      productCategoryId: productCategoryId,
      productCategory: productCategoryId,
    });
  }
  render(): ReactNode {
    const { productCategoryName } = this.props;
    const productsCatName = productCategoryName?.split(" ");
    return (
      <div className={styles.productListContainer}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "Our Products", link: "./../" },
            { moduleName: productCategoryName, link: "" },
          ]}
        />
        <div className={styles.headDiv}>
          <div className={styles.leftText}>
            <LightWeightHeading
              headingText1={productsCatName[0]}
              headingText2={productsCatName.slice(1).join(" ")}
            />
            <p className={styles.showingRes}>
              Showing {this.state.noOfItems} results
            </p>
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
        {this.props.loader ? (
          <div className={styles.loaderDiv}>
            <CustomLoader />
          </div>
        ) : (
          <DisplayProducts
            setNoOfItems={(noOfItems: number) =>
              this.setState({ noOfItems: noOfItems })
            }
          />
        )}
      </div>
    );
  }
}

export default connect(
  (state: IStore) => ({
    loader: getProductsLoader(state),
    productCategoryName: getProductCategoryName(state),
  }),
  { fetchAsyncProductsData }
)(withRouter(ProductList));

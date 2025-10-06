import { Component, ReactNode } from "react";
import styles from "./display-products.module.scss";
import {
  IDisplayProductsProps,
  IDisplayProductsStates,
} from "./display-products.constants";
import ProducCard from "../../../components/common/cards/productCard/productCard";
import withRouter from "../../../components/common/withRouterComponent/withRouter";
import { connect } from "react-redux";
import { IStore } from "../../../utils/models/store.model";
import { getProductsData } from "../../../store/products/productsActions";

class DisplayProducts extends Component<
  IDisplayProductsProps,
  IDisplayProductsStates
> {
  componentDidMount(): void {
    this.props.setNoOfItems(this.props.productsData.length);
  }
  componentDidUpdate(
    prevProps: Readonly<IDisplayProductsProps>,
    prevState: Readonly<IDisplayProductsStates>
  ): void {
    if (prevProps.productsData !== this.props.productsData) {
      this.props.setNoOfItems(this.props.productsData.length);
    }
  }
  render(): ReactNode {
    return (
      <div className={styles.displayContainer}>
        <div className={styles.displayRow}>
          {this.props.productsData.length ? (
            this.props.productsData.map((item) => (
              <ProducCard
                key={item.id}
                data={item}
                handleClick={() => this.props.router.navigate("./" + item.id)}
              />
            ))
          ) : (
            <div className={styles.noProducts}>No Products were found.</div>
          )}
        </div>
      </div>
    );
  }
}

export default connect((state: IStore) => ({
  productsData: getProductsData(state),
}))(withRouter(DisplayProducts));

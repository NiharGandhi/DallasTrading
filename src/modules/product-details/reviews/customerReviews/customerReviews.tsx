import { Component, ReactNode } from "react";
import styles from "./customerReviews.module.scss";
import {
  ICustomerReviewsProps,
  ICustomerReviewsStates,
} from "./customerReviews.constants";
import { connect } from "react-redux";
import { IStore } from "../../../../utils/models/store.model";
import StarRateIcon from "@mui/icons-material/StarRate";
import { getProductDetailReviews } from "../../../../store/product-detail/productDetailActions";
import Aos from "aos";
import "aos/dist/aos.css";

class CustomerReviews extends Component<
  ICustomerReviewsProps,
  ICustomerReviewsStates
> {
  componentDidMount(): void {
    Aos.init();
  }
  render(): ReactNode {
    return (
      <div className={styles.customerReviewsContainer}>
        <h2 className={styles.heading2}>Customer Reviews</h2>
        {this.props.customerReviewsData?.length ? (
          this.props.customerReviewsData.map((item, ind) => (
            <div
              key={ind}
              className={styles.review}
              data-aos="fade-up"
              data-aos-delay="20"
              data-aos-offset="70"
              data-aos-duration="1000"
            >
              <h2 className={styles.reviewer}>{item.customerName}</h2>
              <div className={styles.rating}>
                {/* <h4 className={styles.email}>{item.emailId}</h4> */}
                <div className={styles.stars}>
                  {new Array(item.stars).fill(1).map((i, ind) => (
                    <StarRateIcon key={ind} className={styles.starIcon} />
                  ))}
                </div>
              </div>
              <p className={styles.comment}>{item.comment}</p>
            </div>
          ))
        ) : (
          <div className={styles.review}>
            <p className={styles.reviewer}>No Reviews Yet.</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect((state: IStore) => ({
  customerReviewsData: getProductDetailReviews(state),
}))(CustomerReviews);

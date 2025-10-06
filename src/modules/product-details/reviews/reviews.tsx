import { Component, Fragment, ReactNode } from "react";
import styles from "./reviews.module.scss";
import { IReviewsProps, IReviewsStates } from "./reviews.constants";
import WriteAReview from "./writeAReview/writeAReview";
import CustomerReviews from "./customerReviews/customerReviews";

class Reviews extends Component<IReviewsProps, IReviewsStates> {
  render(): ReactNode {
    return (
      <Fragment>
        <h1 className={styles.headingReviews}>Reviews</h1>
        <div className={styles.reviewsContainer}>
          <CustomerReviews />
          <WriteAReview />
        </div>
      </Fragment>
    );
  }
}

export default Reviews;

import { Component, ReactNode } from "react";
import styles from "./writeAReview.module.scss";
import {
  IwriteAReviewProps,
  IwriteAReviewStates,
} from "./writeAReview.constants";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { connect } from "react-redux";
import { addComment } from "../../../../store/product-detail/productDetailSlice";
import { IStore } from "../../../../utils/models/store.model";
import {
  getProductDetailName,
  getProductDetailReviews,
} from "../../../../store/product-detail/productDetailActions";

class WriteAReview extends Component<IwriteAReviewProps, IwriteAReviewStates> {
  constructor(props: IwriteAReviewProps) {
    super(props);
    this.state = {
      rating: "",
      customerName: "",
      email: "",
      comment: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event: SelectChangeEvent<typeof this.state.rating>) {
    this.setState({ rating: event.target.value });
  }
  async handleSubmit() {
    await this.props.addComment({
      customerName: this.state.customerName,
      emailId: this.state.email,
      comment: this.state.comment,
      stars: +this.state.rating,
    });
    this.setState({ rating: "", customerName: "", email: "", comment: "" });
  }
  render(): ReactNode {
    return (
      <div className={styles.writeAReviewContainer}>
        <h2 className={styles.heading2}>Write a Review</h2>
        {this.props.customerReviewsData?.length ? (
          ""
        ) : (
          <h2 className={styles.heading3}>
            Be the first to review “{this.props.productName.productName}”
          </h2>
        )}
        <p className={styles.info}>
          Your email address will not be published. Required fields are marked*
        </p>
        <div className={styles.reviewForm}>
          <TextField
            key={`text_${0}`}
            className={styles.textField}
            id="custom-css-outlined-input"
            fullWidth
            value={this.state.customerName}
            label="Name"
            onChange={(e) => this.setState({ customerName: e.target.value })}
          />
          <TextField
            key={`text_${1}`}
            className={styles.textField}
            id="custom-css-outlined-input"
            fullWidth
            label="Email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <TextField
            key={`text_${2}`}
            className={styles.textField}
            id="outlined-multiline-static"
            label="Write Your Review"
            fullWidth
            multiline
            rows={4}
            value={this.state.comment}
            onChange={(e) => this.setState({ comment: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-controlled-open-select-label">
              Select Rating
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={this.state.rating}
              label="Select Rating"
              onChange={this.handleChange}
            >
              <MenuItem key={`text_item_${1}`} value={1}>
                One
              </MenuItem>
              <MenuItem key={`text_item_${2}`} value={2}>
                Two
              </MenuItem>
              <MenuItem key={`text_item_${3}`} value={3}>
                Three
              </MenuItem>
              <MenuItem key={`text_item_${4}`} value={4}>
                Four
              </MenuItem>
              <MenuItem key={`text_item_${5}`} value={5}>
                Five
              </MenuItem>
            </Select>
          </FormControl>
          <button className={styles.submitBtn} onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IStore) => ({
    customerReviewsData: getProductDetailReviews(state),
    productName: getProductDetailName(state),
  }),
  { addComment }
)(WriteAReview);

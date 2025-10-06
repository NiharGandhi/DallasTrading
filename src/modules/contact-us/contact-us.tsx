import { Component, ReactNode } from "react";
import styles from "./contact-us.module.scss";
import { IContactUsProps, IContactUsStates } from "./contact-us.constants";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";
import { Select, MenuItem, TextField } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FaxIcon from "@mui/icons-material/Fax";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { connect } from "react-redux";
import { IStore } from "../../utils/models/store.model";
import { getContactUsData } from "../../store/contact-us/contactUsSlice";
import CustomLoader from "../../components/common/loader/loader";

class ContactUs extends Component<IContactUsProps, IContactUsStates> {
  constructor(props: IContactUsProps) {
    super(props);
    this.state = {
      selectVal: 1,
      name: "",
      email: "",
      phone: "",
      message: "",
      answer: "",
      loader: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  componentDidUpdate(
    prevProps: Readonly<IContactUsProps>,
    prevState: Readonly<IContactUsStates>
  ): void {
    if (prevState.selectVal !== this.state.selectVal) {
      this.setState({ loader: true });
      setTimeout(() => {
        this.setState({ loader: false });
      }, 500);
    }
  }
  handleSubmit() {}
  render(): ReactNode {
    const { contactUsData } = this.props;
    return (
      <div className={styles.contactUsContainer}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "Contact Us", link: "" },
          ]}
        />
        <ShadowHeading
          headingText1="Contact"
          headingText2="Us"
          backShadowHeading={false}
        />
        <div className={styles.contactDetailsCont}>
          <div className={styles.contactInfo}>
            <h2>Contact Information</h2>
            <Select
              className={styles.selectBox}
              value={this.state.selectVal}
              fullWidth
              onChange={(e) => this.setState({ selectVal: +e.target.value })}
            >
              <MenuItem key={`text_item_${1}`} value={1}>
                Dubai
              </MenuItem>
              <MenuItem key={`text_item_${2}`} value={2}>
                Qatar (Doha Office)
              </MenuItem>
              <MenuItem key={`text_item_${3}`} value={3}>
                Qatar (Doha Showroom)
              </MenuItem>
              <MenuItem key={`text_item_${4}`} value={4}>
                Oman (Muscat Office)
              </MenuItem>
            </Select>
            {this.state.loader ? (
              <div className={styles.emptyBox}>
                <CustomLoader />
              </div>
            ) : (
              <>
                <div className={styles.table}>
                  <div className={styles.trow}>
                    <LocationOnIcon className={styles.tdIcon} />
                    <p className={styles.tdText}>
                      {contactUsData[this.state.selectVal - 1]?.address}
                    </p>
                  </div>
                  <div className={styles.trow}>
                    <LocalPhoneIcon className={styles.tdIcon} />
                    <p className={styles.tdText}>
                      {contactUsData[this.state.selectVal - 1]?.mobileNo}
                    </p>
                  </div>
                  {contactUsData[this.state.selectVal - 1]?.fax ? (
                    <div className={styles.trow}>
                      <FaxIcon className={styles.tdIcon} />
                      <p className={styles.tdText}>
                        {contactUsData[this.state.selectVal - 1]?.fax}
                      </p>
                    </div>
                  ) : null}
                  <div className={styles.trow}>
                    <MailOutlineIcon className={styles.tdIcon} />
                    <p className={styles.tdText}>
                      {contactUsData[this.state.selectVal - 1]?.email}
                    </p>
                  </div>
                </div>
                <iframe
                  title={contactUsData[this.state.selectVal - 1].name}
                  src={contactUsData[this.state.selectVal - 1].location}
                  className={styles.gMap}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </>
            )}
          </div>
          <div className={styles.sendAMessage}>
            <h2 className={styles.heading}>Send us a message</h2>

            <div className={styles.reviewForm}>
              <h4 className={styles.text1}>
                For general enquiries please contact us using the form below:
              </h4>
              <TextField
                key={`text_${0}`}
                className={styles.textField}
                id="custom-css-outlined-input"
                type="text"
                fullWidth
                value={this.state.name}
                label="Name"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <TextField
                key={`text_${1}`}
                className={styles.textField}
                id="custom-css-outlined-input"
                type="email"
                fullWidth
                label="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <TextField
                key={`text_${2}`}
                className={styles.textField}
                id="custom-css-outlined-input"
                type="tel"
                fullWidth
                label="Phone"
                value={this.state.phone}
                onChange={(e) => this.setState({ phone: e.target.value })}
              />
              <TextField
                key={`text_${3}`}
                className={styles.textField}
                id="outlined-multiline-static"
                label="Message"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={this.state.message}
                onChange={(e) => this.setState({ message: e.target.value })}
              />
              <h4 className={styles.text1} style={{ marginTop: "0.5em" }}>
                Just to prove you are a human, please solve the equation: 23 -
                14 = ?
              </h4>
              <TextField
                key={`text_${4}`}
                className={styles.textField}
                id="custom-css-outlined-input"
                type="number"
                fullWidth
                label="Your answer"
                value={this.state.answer}
                onChange={(e) =>
                  this.setState({
                    answer: +e.target.value,
                  })
                }
              />
              <button className={styles.submitBtn} onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state: IStore) => ({
  contactUsData: getContactUsData(state),
}))(ContactUs);

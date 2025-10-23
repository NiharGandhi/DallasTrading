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
      submitStatus: "",
      submitMessage: "",
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
  async handleSubmit() {
    const { name, email, phone, message, answer, selectVal } = this.state;
    const { contactUsData } = this.props;

    // Validate form
    if (!name || !email || !message) {
      this.setState({
        submitStatus: "error",
        submitMessage: "Please fill in all required fields (Name, Email, Message)"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setState({
        submitStatus: "error",
        submitMessage: "Please enter a valid email address"
      });
      return;
    }

    // Validate captcha
    if (answer !== 9 && answer !== "9") {
      this.setState({
        submitStatus: "error",
        submitMessage: "Incorrect answer to the equation. Please try again."
      });
      return;
    }

    // Get selected country from contactUsData
    const selectedLocation = contactUsData[selectVal - 1];
    const country = selectedLocation?.name || "Dubai";

    this.setState({ loader: true, submitStatus: "", submitMessage: "" });

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/send-contact-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          country
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to send contact form email:', data.error);
        this.setState({
          submitStatus: "error",
          submitMessage: "Failed to send message. Please try again or contact us directly at info@dallastrading.net",
          loader: false
        });
      } else {
        console.log('Contact form email sent successfully');
        this.setState({
          submitStatus: "success",
          submitMessage: "Thank you for your message! We'll get back to you within 24 hours.",
          loader: false,
          name: "",
          email: "",
          phone: "",
          message: "",
          answer: ""
        });
      }
    } catch (error) {
      console.error('Error sending contact form email:', error);
      this.setState({
        submitStatus: "error",
        submitMessage: "Failed to send message. Please try again or contact us directly at info@dallastrading.net",
        loader: false
      });
    }
  }
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
                Oman (Muscat Office)
              </MenuItem>
              <MenuItem key={`text_item_${3}`} value={3}>
                Bahrain (Warehouse)
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
              {this.state.submitMessage && (
                <div
                  style={{
                    padding: "12px",
                    marginBottom: "16px",
                    borderRadius: "4px",
                    backgroundColor: this.state.submitStatus === "success" ? "#d4edda" : "#f8d7da",
                    color: this.state.submitStatus === "success" ? "#155724" : "#721c24",
                    border: `1px solid ${this.state.submitStatus === "success" ? "#c3e6cb" : "#f5c6cb"}`
                  }}
                >
                  {this.state.submitMessage}
                </div>
              )}
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

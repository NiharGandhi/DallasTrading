import { Component, ReactNode, createRef } from "react";
import styles from "./chatbot.module.scss";
import {
  IChatbotProps,
  IChatbotStates,
  IMessage,
  COUNTRIES,
} from "./chatbot.constants";
import { getChatResponse } from "../../../services/geminiService";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import withRouter from "../withRouterComponent/withRouter";

class Chatbot extends Component<IChatbotProps, IChatbotStates> {
  private messagesEndRef: React.RefObject<HTMLDivElement>;

  constructor(props: IChatbotProps) {
    super(props);
    this.state = {
      isOpen: true, // Open by default
      isMinimized: false,
      messages: [],
      userInput: "",
      userName: "",
      userEmail: "",
      userCountry: "",
      currentStep: "welcome",
      isTyping: false,
      conversationHistory: [],
      showInquiryForm: false,
      inquiryMessage: "",
      inquiryPhone: "",
    };
    this.messagesEndRef = createRef();
    this.handleToggle = this.handleToggle.bind(this);
    this.handleMinimize = this.handleMinimize.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCountrySelect = this.handleCountrySelect.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleContactHuman = this.handleContactHuman.bind(this);
    this.renderMessageWithLinks = this.renderMessageWithLinks.bind(this);
    this.handleOpenInquiryForm = this.handleOpenInquiryForm.bind(this);
    this.handleCloseInquiryForm = this.handleCloseInquiryForm.bind(this);
    this.handleInquirySubmit = this.handleInquirySubmit.bind(this);
  }

  componentDidMount() {
    // Check if user details exist in localStorage
    const savedUserData = localStorage.getItem('dallasUserData');

    if (savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        this.setState({
          userName: userData.userName || "",
          userEmail: userData.userEmail || "",
          userCountry: userData.userCountry || "",
          currentStep: "chat",
        });

        // Show welcome back message
        setTimeout(() => {
          this.addBotMessage(
            `Welcome back, ${userData.userName}! 👋 How can I assist you today?`
          );
        }, 500);
      } catch (e) {
        // If parsing fails, show normal welcome
        this.showInitialWelcome();
      }
    } else {
      // First time visitor
      this.showInitialWelcome();
    }
  }

  showInitialWelcome() {
    setTimeout(() => {
      this.addBotMessage(
        "Hello! 👋 Welcome to Dallas Group of Companies. I'm here to help you with any questions about our electrical products and industrial solutions."
      );
    }, 500);
  }

  componentDidUpdate(
    _prevProps: IChatbotProps,
    prevState: IChatbotStates
  ) {
    if (prevState.messages.length !== this.state.messages.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this.messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  addBotMessage(text: string, options?: string[]) {
    const message: IMessage = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
      type: options ? "options" : "text",
      options,
    };

    this.setState((prevState) => ({
      messages: [...prevState.messages, message],
      isTyping: false,
    }));
  }

  addUserMessage(text: string) {
    const message: IMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    this.setState((prevState) => ({
      messages: [...prevState.messages, message],
      userInput: "",
    }));
  }

  simulateTyping(callback: () => void, delay: number = 1000) {
    this.setState({ isTyping: true });
    setTimeout(callback, delay);
  }

  handleToggle() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
      isMinimized: false,
    }));
  }

  handleMinimize() {
    this.setState({ isMinimized: true });
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ userInput: e.target.value });
  }

  handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      this.handleSend();
    }
  }

  handleCountrySelect(country: string) {
    this.addUserMessage(country);
    this.setState({ userCountry: country });

    this.simulateTyping(() => {
      this.addBotMessage(
        `Perfect! Thank you ${this.state.userName}. I'm all set to assist you. How can I help you today? You can ask me about our products, services, locations, or anything else about Dallas Group!`
      );
      this.setState({ currentStep: "chat" });
    });
  }

  handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ userName: e.target.value });
  }

  handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ userEmail: e.target.value });
  }

  handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ userCountry: e.target.value });
  }

  handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { userName, userEmail, userCountry } = this.state;

    if (!userName || !userEmail || !userCountry) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return;
    }

    // Save user data to localStorage
    const userData = {
      userName,
      userEmail,
      userCountry,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('dallasUserData', JSON.stringify(userData));

    // Send email notification to appropriate office
    this.sendUserDetailsEmail(userName, userEmail, userCountry);

    // Add a system message about the user
    this.addBotMessage(
      `Thank you ${userName}! I've noted your details. How can I assist you today? You can ask me about our products, services, locations, or anything else about Dallas Group!`
    );

    this.setState({ currentStep: "chat" });
  }

  sendUserDetailsEmail(name: string, email: string, country: string) {
    // Determine which office email to send to based on country
    let officeEmail = "info@dallastrading.net"; // Default to Dubai
    let officeLocation = "Dubai";

    if (country === "Oman") {
      officeEmail = "vijay@dallastrading.net";
      officeLocation = "Oman";
    } else if (country === "Bahrain") {
      officeEmail = "info@dallastrading.net";
      officeLocation = "Bahrain";
    } else if (country === "Saudi Arabia") {
      officeEmail = "info@dallastrading.net";
      officeLocation = "Saudi Arabia";
    }

    // Create email body
    const subject = encodeURIComponent("New Chatbot User Registration");
    const body = encodeURIComponent(
      `New user has registered on the Dallas Group chatbot:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Country: ${country}\n` +
      `Office: ${officeLocation}\n` +
      `Timestamp: ${new Date().toLocaleString()}\n\n` +
      `Please follow up if needed.`
    );

    // Send to both info@ and country-specific email
    const emails = officeEmail === "info@dallastrading.net"
      ? "info@dallastrading.net"
      : `info@dallastrading.net,${officeEmail}`;

    // Open mailto link (this will use the user's default email client)
    // In production, you'd want to use a backend API to send emails
    console.log("User details captured:", { name, email, country, officeEmail });

    // For now, just log it. In production, you'd make an API call like:
    // fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, country, officeEmail })
    // });
  }

  handleContactHuman() {
    this.addBotMessage(
      `I'll connect you with our team! 👋\n\nYou can reach us at:\n\n📞 Dubai: +971 4 3635500\n📞 Oman: +968 2 459 3041\n📞 Bahrain: +973 1770 2277\n📧 Email: info@dallastrading.net\n\nOr visit our [Contact Page](/contact-us) to send us a message and we'll get back to you shortly!`
    );
  }

  handleOpenInquiryForm() {
    this.setState({ showInquiryForm: true });
  }

  handleCloseInquiryForm() {
    this.setState({
      showInquiryForm: false,
      inquiryMessage: "",
      inquiryPhone: ""
    });
  }

  handleInquirySubmit(e: React.FormEvent) {
    e.preventDefault();
    const { userName, userEmail, userCountry, inquiryMessage, inquiryPhone } = this.state;

    // Create email body for inquiry
    const subject = encodeURIComponent("Product Inquiry from Dallas Chatbot");
    const body = encodeURIComponent(
      `New product inquiry received:\n\n` +
      `Name: ${userName}\n` +
      `Email: ${userEmail}\n` +
      `Phone: ${inquiryPhone || "Not provided"}\n` +
      `Country: ${userCountry}\n\n` +
      `Inquiry:\n${inquiryMessage}\n\n` +
      `Timestamp: ${new Date().toLocaleString()}`
    );

    // Log inquiry (in production, send to backend API)
    console.log("Inquiry submitted:", {
      userName,
      userEmail,
      userCountry,
      inquiryPhone,
      inquiryMessage
    });

    // Show success message
    this.addBotMessage(
      `Thank you ${userName}! Your inquiry has been sent to our team. We'll get back to you at ${userEmail} within 24 hours. 📧\n\nIs there anything else I can help you with?`
    );

    // Close form and reset
    this.handleCloseInquiryForm();

    // In production, make API call:
    // fetch('/api/send-inquiry', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userName, userEmail, userCountry, inquiryPhone, inquiryMessage })
    // });
  }

  renderMessageWithLinks(text: string): ReactNode {
    // Parse markdown-style formatting: links [text](url) and bold **text**
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)|(\*\*[^*]+\*\*)/g;
    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        const textBeforeMatch = text.substring(lastIndex, match.index);
        parts.push(textBeforeMatch);
      }

      if (match[1] && match[2]) {
        // This is a link [text](url)
        const linkText = match[1];
        const linkPath = match[2];
        parts.push(
          <a
            key={`link-${key++}`}
            href={linkPath}
            className={styles.messageLink}
            onClick={(e) => {
              e.preventDefault();
              (this.props as any).router?.navigate(linkPath);
            }}
          >
            {linkText}
          </a>
        );
      } else if (match[3]) {
        // This is bold **text**
        const boldText = match[3].substring(2, match[3].length - 2);
        parts.push(<strong key={`bold-${key++}`}>{boldText}</strong>);
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  }

  async handleSend() {
    const { userInput, currentStep } = this.state;

    if (!userInput.trim()) return;

    this.addUserMessage(userInput);

    // Handle different conversation steps
    if (currentStep === "welcome") {
      this.setState({ userName: userInput });
      this.simulateTyping(() => {
        this.addBotMessage(
          `Nice to meet you, ${userInput}! 😊 Could you please share your email address?`
        );
        this.setState({ currentStep: "email" });
      });
    } else if (currentStep === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInput)) {
        this.simulateTyping(() => {
          this.addBotMessage(
            "Please enter a valid email address so I can assist you better."
          );
        }, 500);
        return;
      }

      this.setState({ userEmail: userInput });
      this.simulateTyping(() => {
        this.addBotMessage(
          "Great! And which country are you contacting us from?",
          COUNTRIES
        );
        this.setState({ currentStep: "country" });
      });
    } else if (currentStep === "chat") {
      // Get response from Gemini API with RAG
      this.setState({ isTyping: true });

      try {
        const response = await getChatResponse(userInput, this.state.conversationHistory);

        // Update conversation history
        this.setState((prevState) => ({
          conversationHistory: [
            ...prevState.conversationHistory,
            { role: "user", parts: userInput },
            { role: "model", parts: response },
          ],
        }));

        this.simulateTyping(() => {
          this.addBotMessage(response);
        }, 500);
      } catch (error) {
        console.error("Error getting response:", error);
        this.simulateTyping(() => {
          this.addBotMessage(
            "I apologize, but I'm having trouble processing your request right now. Please try again or contact us directly at +971 4 3635500."
          );
        }, 500);
      }
    }
  }

  render(): ReactNode {
    const { isOpen, isMinimized, messages, userInput, currentStep, isTyping, userName, userEmail, userCountry, showInquiryForm, inquiryMessage, inquiryPhone } =
      this.state;

    if (!isOpen) {
      return (
        <button
          className={styles.chatbotButton}
          onClick={this.handleToggle}
          aria-label="Open chat"
        >
          <ChatIcon />
        </button>
      );
    }

    if (isMinimized) {
      return (
        <div className={styles.minimizedChat} onClick={() => this.setState({ isMinimized: false })}>
          <ChatIcon />
          <span>Dallas Assistant</span>
        </div>
      );
    }

    return (
      <>
        {showInquiryForm && (
          <div className={styles.inquiryModal} onClick={this.handleCloseInquiryForm}>
            <div className={styles.inquiryModalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.inquiryModalHeader}>
                <h3>Send Inquiry</h3>
                <button
                  onClick={this.handleCloseInquiryForm}
                  className={styles.closeModalButton}
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
              </div>
              <form onSubmit={this.handleInquirySubmit} className={styles.inquiryForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="inquiryName">Full Name *</label>
                  <input
                    type="text"
                    id="inquiryName"
                    value={userName}
                    onChange={(e) => this.setState({ userName: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="inquiryEmail">Email Address *</label>
                  <input
                    type="email"
                    id="inquiryEmail"
                    value={userEmail}
                    onChange={(e) => this.setState({ userEmail: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="inquiryPhone">Phone Number</label>
                  <input
                    type="tel"
                    id="inquiryPhone"
                    value={inquiryPhone}
                    onChange={(e) => this.setState({ inquiryPhone: e.target.value })}
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="inquiryCountry">Country *</label>
                  <select
                    id="inquiryCountry"
                    value={userCountry}
                    onChange={(e) => this.setState({ userCountry: e.target.value })}
                    required
                  >
                    <option value="">Select your country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="inquiryMessage">Your Inquiry *</label>
                  <textarea
                    id="inquiryMessage"
                    value={inquiryMessage}
                    onChange={(e) => this.setState({ inquiryMessage: e.target.value })}
                    placeholder="Please describe your requirements, product inquiries, or questions..."
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitInquiryButton}>
                  <SendIcon />
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        )}

        <div className={styles.chatbotContainer}>
          <div className={styles.chatbotHeader}>
          <div className={styles.headerInfo}>
            <ChatIcon />
            <div className={styles.headerText}>
              <h3>Dallas Assistant</h3>
              <span className={styles.status}>
                <span className={styles.onlineDot}></span> Online
              </span>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={this.handleMinimize}
              className={styles.iconButton}
              aria-label="Minimize chat"
            >
              <MinimizeIcon />
            </button>
            <button
              onClick={this.handleToggle}
              className={styles.iconButton}
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {currentStep === "welcome" && (
          <div className={styles.userFormContainer}>
            <div className={styles.formWelcome}>
              <h3>👋 Welcome to Dallas Group!</h3>
              <p>Please share your details so we can assist you better</p>
            </div>
            <form className={styles.userForm} onSubmit={this.handleFormSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="userName">Full Name *</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={this.handleNameChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="userEmail">Email Address *</label>
                <input
                  type="email"
                  id="userEmail"
                  value={userEmail}
                  onChange={this.handleEmailChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="userCountry">Country *</label>
                <select
                  id="userCountry"
                  value={userCountry}
                  onChange={this.handleCountryChange}
                  required
                >
                  <option value="">Select your country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className={styles.formSubmitButton}>
                Start Chatting
              </button>
            </form>
          </div>
        )}

        {currentStep === "chat" && (
          <>
            <div className={styles.chatbotMessages}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.message} ${
                    message.sender === "bot" ? styles.botMessage : styles.userMessage
                  }`}
                >
                  <div className={styles.messageContent}>
                    <p>{this.renderMessageWithLinks(message.text)}</p>
                    {message.options && (
                      <div className={styles.optionsContainer}>
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            className={styles.optionButton}
                            onClick={() => this.handleCountrySelect(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className={`${styles.message} ${styles.botMessage}`}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={this.messagesEndRef} />
            </div>

            <div className={styles.chatbotFooter}>
              <button
                className={styles.contactHumanButton}
                onClick={this.handleOpenInquiryForm}
                aria-label="Send inquiry"
              >
                <EmailIcon />
                <span>Send Inquiry</span>
              </button>
            </div>

            <div className={styles.chatbotInput}>
              <input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyPress}
                aria-label="Message input"
              />
              <button
                onClick={this.handleSend}
                className={styles.sendButton}
                disabled={!userInput.trim()}
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
          </>
        )}
        </div>
      </>
    );
  }
}

export default withRouter(Chatbot);

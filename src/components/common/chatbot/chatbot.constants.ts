export interface IChatbotProps {}

export interface IChatbotStates {
  isOpen: boolean;
  isMinimized: boolean;
  messages: IMessage[];
  userInput: string;
  userName: string;
  userEmail: string;
  userCountry: string;
  currentStep: "welcome" | "name" | "email" | "country" | "chat";
  isTyping: boolean;
  conversationHistory: Array<{ role: string; parts: string }>;
  showInquiryForm: boolean;
  inquiryMessage: string;
  inquiryPhone: string;
  companyName: string;
  companyLocation: string;
}

export interface IMessage {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  type?: "text" | "options";
  options?: string[];
}

export const COUNTRIES = [
  "United Arab Emirates",
  "Oman",
  "Bahrain",
  "Saudi Arabia",
];

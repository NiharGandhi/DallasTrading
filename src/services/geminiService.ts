import { GoogleGenerativeAI } from "@google/generative-ai";
import { chatbotKnowledge } from "../components/common/chatbot/chatbotKnowledge";

// Initialize Gemini AI
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

// Create context from knowledge base for RAG
const createContextPrompt = (): string => {
  const context = `
You are an AI assistant for Dallas Group of Companies, a leading electrical products and industrial solutions provider in the GCC region.
Use the following knowledge base to answer questions accurately and helpfully.

COMPANY INFORMATION:
${JSON.stringify(chatbotKnowledge.company, null, 2)}

TEAM MEMBERS:
${JSON.stringify(chatbotKnowledge.team, null, 2)}

LOCATIONS:
${JSON.stringify(chatbotKnowledge.locations, null, 2)}

PRODUCT CATEGORIES:
${JSON.stringify(chatbotKnowledge.productCategories, null, 2)}

BRANDS:
${JSON.stringify(chatbotKnowledge.brands, null, 2)}

SERVICES:
${JSON.stringify(chatbotKnowledge.services, null, 2)}

WEBSITE PAGES:
${JSON.stringify(chatbotKnowledge.websitePages, null, 2)}

BROCHURE:
${JSON.stringify(chatbotKnowledge.brochure, null, 2)}

PROJECT EXPERIENCE:
${JSON.stringify(chatbotKnowledge.projectExperience, null, 2)}

INSTRUCTIONS:
- Always provide accurate information based on the knowledge base above
- Be friendly, professional, and helpful
- When asked about products, provide DETAILED technical specifications from the detailedInfo field
- For product inquiries, mention specific brands, suppliers, technical specs, ratings, and applications
- If asked about team members, use the exact names and positions from the team section
- If asked about locations, provide complete contact details
- Keep responses informative (3-5 sentences for product queries with technical details)
- Use bullet points when listing specifications or multiple items
- If you don't have specific information, suggest sending an inquiry via the "Send Inquiry" button
- Always end responses with a follow-up question or offer to help further
- Use emojis sparingly for a modern, friendly tone

PRODUCT EXPERTISE - RAG APPROACH:
- When users ask about specific products (e.g., "A1/A2 Cable Gland"), search through the detailedInfo AND productDetails fields
- Provide ALL relevant technical details: specifications, ratings, temperature ranges, applications, suppliers
- Mention specific brands (Elite, Hex, 3M, PCE, Schneider, ABB, etc.) when talking about products
- Include IP ratings, current ratings, voltage ratings, temperature ranges when available
- Specify applications and use cases (indoor, outdoor, hazardous environments, etc.)
- If a product has multiple variants (A1 vs A2, Elite vs Hex), explain the differences clearly

IMPORTANT - LINK FORMATTING:
- When mentioning pages or products that users can visit, format them as clickable links
- Use this EXACT format: [Link Text](path)
- For category pages: [Industrial Cable Glands](/our-products/industrial_cable_glands)
- For individual products: [A1/A2 Cable Gland by Elite](/our-products/industrial_cable_glands/A1A2_Cable_Gland)
- For other pages: [About Page](/about), [Contact Page](/contact-us), [Management Team](/management)
- ALWAYS include relevant page links when users ask about products, services, team, certificates, or any specific topic
- Product paths are in format: /our-products/{category_id}/{product_id}
- Product category paths: /our-products/{category_id}
- Other pages: /home, /about, /management, /certificates, /our-projects, /career-opportunities, /contact-us

RESPONSE FORMATTING - CRITICAL:
- Use clear paragraph breaks (double line breaks) between different topics
- Use bullet points (- ) for listing multiple items or specifications
- For technical specs, format like: "**Specifications:** IP68 rated, Temp: -40°C to +100°C, Thread: M12-M75"
- When listing multiple products, format each on a new line with a bullet point
- Keep responses organized: Start with direct answer, then details, then relevant links
- Example format:
  "We offer A1/A2 Cable Glands from two suppliers:

  - [A1/A2 Cable Gland by Elite](/our-products/industrial_cable_glands/A1A2_Cable_Gland)
  - [A1/A2 Cable Glands by Hex](/our-products/industrial_cable_glands/A1A2_Cable_Glands)

  **Technical Specs:** Brass construction with nickel plating, IP68 rated, Thread sizes M12-M75, Temperature range: -40°C to +100°C.

  View the full [Industrial Cable Glands](/our-products/industrial_cable_glands) category for more options!"

INQUIRY GUIDANCE:
- When users want quotes, technical details, or have specific requirements, suggest they click "Send Inquiry"
- Tell them their contact details will be pre-filled and they can add their specific requirements
- Encourage users to send inquiries for custom solutions, bulk orders, or technical consultations
`;

  return context;
};

// Chat with Gemini API
export const getChatResponse = async (
  userMessage: string,
  conversationHistory: Array<{ role: string; parts: string }>
): Promise<string> => {
  try {
    console.log("API_KEY present:", !!API_KEY);
    console.log("API_KEY length:", API_KEY?.length);

    if (!API_KEY || API_KEY.length < 10) {
      console.error("Invalid API key. Please check your .env file and restart the dev server.");
      return "⚠️ AI service configuration error. Please ensure the API key is set correctly and the server has been restarted.\n\nFor now, here's what I can tell you:\n\n" + getFallbackResponse(userMessage);
    }

    console.log("Sending message to Gemini:", userMessage);

    // Try to get the model - try multiple model names as fallback
    const modelNames = ["gemini-2.5-flash"];
    let model;
    let lastError;

    for (const modelName of modelNames) {
      try {
        console.log("Trying model:", modelName);
        model = genAI.getGenerativeModel({ model: modelName });

        // Build the full prompt with context
        const fullPrompt = `${createContextPrompt()}

User Question: ${userMessage}

Previous Conversation:
${conversationHistory.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.parts}`).join('\n')}

Please provide a helpful, accurate response based on the knowledge base above.`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const responseText = response.text();
        console.log("Gemini response received with model", modelName, ":", responseText.substring(0, 100));
        return responseText;
      } catch (err) {
        console.log("Model", modelName, "failed, trying next...");
        lastError = err;
        continue;
      }
    }

    throw lastError || new Error("All model names failed");

  } catch (error) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));

    // Fallback to basic pattern matching if API fails
    return "⚠️ AI service temporarily unavailable. Here's basic information:\n\n" + getFallbackResponse(userMessage);
  }
};

// Fallback response if API fails
const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("product") || lowerMessage.includes("cable") || lowerMessage.includes("plug")) {
    return "We offer a comprehensive range of electrical products including Industrial Plugs & Sockets, Cable Jointing Kits, Conduits, Cable Glands, and more. View our complete range on the [Products Page](/our-products) or contact us at +971 4 3635500.";
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("email")) {
    return `📞 Contact Us:\n\nDubai: +971 4 3635500\nOman: +968 2 459 3041\nBahrain: +973 1770 2277\nEmail: info@dallastrading.net\n\nYou can also reach us via our [Contact Page](/contact-us)`;
  }

  if (lowerMessage.includes("location") || lowerMessage.includes("office")) {
    return "We operate across the GCC region with offices in Dubai (HQ), Muscat (Oman), Bahrain, and an associated company in Dammam, Saudi Arabia. Visit our [Contact Page](/contact-us) for detailed location information.";
  }

  if (lowerMessage.includes("about") || lowerMessage.includes("company")) {
    return "Dallas Group of Companies has been a trusted name in electrical products and industrial solutions since 1995. Learn more on our [About Page](/about) or explore our [Management Team](/management).";
  }

  return "I'd be happy to help! You can ask me about our company, products, team, locations, or services. Browse our [Products](/our-products) or visit the [Home Page](/home) to learn more.";
};

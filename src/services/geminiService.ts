import { chatbotKnowledge } from "../components/common/chatbot/chatbotKnowledge";
import { STRAPI_URL } from "./strapiService";

// Fetches live product and company data from Strapi to build the chatbot context.
// Falls back to the static chatbotKnowledge if Strapi is unreachable.
async function buildContextFromStrapi(): Promise<string> {
  try {
    const [catsRes, prodsRes, teamRes, settingsRes] = await Promise.all([
      fetch(`${STRAPI_URL}/api/product-categories?pagination[pageSize]=50`),
      fetch(`${STRAPI_URL}/api/products?pagination[pageSize]=200&populate=category`),
      fetch(`${STRAPI_URL}/api/team-members?pagination[pageSize]=20`),
      fetch(`${STRAPI_URL}/api/site-setting`),
    ]);

    const [cats, prods, team, settings] = await Promise.all([
      catsRes.json(),
      prodsRes.json(),
      teamRes.json(),
      settingsRes.json(),
    ]);

    const categoryList = (cats.data || [])
      .map((c: any) => `- ${c.attributes.title}: ${c.attributes.info || ""}`)
      .join("\n");

    const productList = (prods.data || [])
      .map((p: any) => {
        const cat = p.attributes.category?.data?.attributes?.title ?? "";
        return `- ${p.attributes.name} (${cat})${p.attributes.company ? " — " + (p.attributes.company.name || p.attributes.company) : ""}`;
      })
      .join("\n");

    const teamList = (team.data || [])
      .map((t: any) => `- ${t.attributes.name}, ${t.attributes.position}: ${t.attributes.bio || ""}`)
      .join("\n");

    const s = settings.data?.attributes ?? {};
    const companyInfo = `Company: ${s.companyName || "Dallas Trading Co. LLC"}
Tagline: ${s.tagline || ""}
Dubai: ${s.dubaiPhone || ""} | Oman: ${s.omanPhone || ""} | Bahrain: ${s.bahrainPhone || ""}
Email: ${s.email || "info@dallastrading.net"}`;

    return `COMPANY INFORMATION (live from CMS):
${companyInfo}

PRODUCT CATEGORIES:
${categoryList}

PRODUCTS:
${productList}

TEAM MEMBERS:
${teamList}

LOCATIONS:
${JSON.stringify(chatbotKnowledge.locations, null, 2)}

SERVICES:
${JSON.stringify(chatbotKnowledge.services, null, 2)}

PROJECT EXPERIENCE:
${JSON.stringify(chatbotKnowledge.projectExperience, null, 2)}`;
  } catch {
    // Fall back to static knowledge base
    return `COMPANY INFORMATION:
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

PROJECT EXPERIENCE:
${JSON.stringify(chatbotKnowledge.projectExperience, null, 2)}`;
  }
}

let _cachedContext: string | null = null;
let _cacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function getCachedContext(): Promise<string> {
  if (_cachedContext && Date.now() - _cacheTime < CACHE_TTL_MS) {
    return _cachedContext;
  }
  _cachedContext = await buildContextFromStrapi();
  _cacheTime = Date.now();
  return _cachedContext;
}

const INSTRUCTIONS = `
You are an AI assistant for Dallas Group of Companies, a leading electrical products and industrial solutions provider in the GCC region.
Use the following knowledge base to answer questions accurately and helpfully.

INSTRUCTIONS:
- Always provide accurate information based on the knowledge base above
- Be friendly, professional, and helpful
- When asked about products, provide DETAILED technical specifications
- For product inquiries, mention specific brands, suppliers, technical specs, ratings, and applications
- If asked about team members, use the exact names and positions from the team section
- If asked about locations, provide complete contact details
- Keep responses informative (3-5 sentences for product queries with technical details)
- Use bullet points when listing specifications or multiple items
- If you don't have specific information, suggest sending an inquiry via the "Send Inquiry" button
- Always end responses with a follow-up question or offer to help further

IMPORTANT - LINK FORMATTING:
- When mentioning pages or products that users can visit, format them as clickable links
- Use this EXACT format: [Link Text](path)
- For category pages: [Industrial Cable Glands](/our-products/industrial-cable-glands)
- For individual products: [A1/A2 Cable Gland by Elite](/our-products/industrial-cable-glands/a1a2-cable-gland)
- For other pages: [About Page](/about), [Contact Page](/contact-us), [Management Team](/management)
- Product paths are in format: /our-products/{category-slug}/{product-slug}

INQUIRY GUIDANCE:
- When users want quotes, suggest they click "Send Inquiry"
- Encourage users to send inquiries for custom solutions, bulk orders, or technical consultations
`;

export const getChatResponse = async (
  userMessage: string,
  conversationHistory: Array<{ role: string; parts: string }>
): Promise<string> => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
  const context = await getCachedContext();

  const fullPrompt = `${INSTRUCTIONS}

KNOWLEDGE BASE:
${context}

WEBSITE PAGES:
${JSON.stringify(chatbotKnowledge.websitePages, null, 2)}

BROCHURE:
${JSON.stringify(chatbotKnowledge.brochure, null, 2)}

User Question: ${userMessage}

Previous Conversation:
${conversationHistory.map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.parts}`).join("\n")}

Please provide a helpful, accurate response based on the knowledge base above.`;

  const response = await fetch(`${apiUrl}/api/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: fullPrompt }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as any).error || `Server error ${response.status}`);
  }

  const data = await response.json();
  return data.text;
};

export const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("product") ||
    lowerMessage.includes("cable") ||
    lowerMessage.includes("plug")
  ) {
    return "We offer a comprehensive range of electrical products including Industrial Plugs & Sockets, Cable Jointing Kits, Conduits, Cable Glands, and more. View our complete range on the [Products Page](/our-products) or contact us at +971 4 3635500.";
  }

  if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("phone") ||
    lowerMessage.includes("email")
  ) {
    return `📞 Contact Us:\n\nDubai: +971 4 3635500\nOman: +968 2 459 3041\nBahrain: +973 3398 8702\nEmail: info@dallastrading.net\n\nYou can also reach us via our [Contact Page](/contact-us)`;
  }

  if (
    lowerMessage.includes("location") ||
    lowerMessage.includes("office")
  ) {
    return "We operate across the GCC region with offices in Dubai (HQ), Muscat (Oman), Bahrain, and an associated company in Dammam, Saudi Arabia. Visit our [Contact Page](/contact-us) for detailed location information.";
  }

  if (lowerMessage.includes("about") || lowerMessage.includes("company")) {
    return "Dallas Group of Companies has been a trusted name in electrical products and industrial solutions since 1995. Learn more on our [About Page](/about) or explore our [Management Team](/management).";
  }

  return "I'd be happy to help! You can ask me about our company, products, team, locations, or services. Browse our [Products](/our-products) or visit the [Home Page](/home) to learn more.";
};

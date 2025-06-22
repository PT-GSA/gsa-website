import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// GSA Knowledge Base (simplified version for the API)
const gsaKnowledgeBase = {
  companyOverview: {
    name: "Gemerlang Sejahtera Abadi (GSA)",
    tagline: "Leading digital strategic partner with seamless IT solutions, efficient management support, integrated virtual ecosystems, and impactful digital marketing",
    stats: {
      integratedSoftware: "100+",
      dedicatedTeam: "350+",
      globalNetwork: "11+",
      engineers: "60%",
      softwareMastered: "35+"
    },
    location: "Sampoerna Strategic Square, South Tower 18th Floor, Jakarta, Indonesia",
    contact: {
      email: "info@gsagroup.id",
      phone: "+62 878-5421-7963",
      website: "gsagroup.id"
    }
  },
  services: {
    virtualEcosystem: "AR/VR Implementation with clients like Disney Indonesia, Marvel, BTS x Tokopedia",
    itSystemSupport: "ERP Software, Gaming & Web3, Website & Apps Development",
    digitalMarketing: "Marketplace Optimization (956.70% improvement), Performance Marketing"
  },
  technologies: [
    "Unity", "Blender", "Figma", "Laravel", "Angular", "Flutter", 
    "React.js", "JavaScript", "Python", "PHP", "WordPress", "AI & ML"
  ]
};

class GSAKnowledgeRetriever {
  searchRelevantInfo(query: string): string {
    const lowerQuery = query.toLowerCase();
    let relevantInfo: string[] = [];

    // Company overview queries
    if (this.matchesAny(lowerQuery, ['company', 'about', 'gsa', 'overview', 'who are you', 'what is gsa'])) {
      relevantInfo.push(`Company: ${gsaKnowledgeBase.companyOverview.name}`);
      relevantInfo.push(`Description: ${gsaKnowledgeBase.companyOverview.tagline}`);
      relevantInfo.push(`Team: ${gsaKnowledgeBase.companyOverview.stats.dedicatedTeam} people with ${gsaKnowledgeBase.companyOverview.stats.engineers} engineers`);
      relevantInfo.push(`Global Network: ${gsaKnowledgeBase.companyOverview.stats.globalNetwork} countries`);
    }

    // Services queries
    if (this.matchesAny(lowerQuery, ['services', 'what do you do', 'capabilities', 'ar', 'vr', 'marketing', 'development'])) {
      relevantInfo.push("Key Services:");
      relevantInfo.push(`- ${gsaKnowledgeBase.services.virtualEcosystem}`);
      relevantInfo.push(`- ${gsaKnowledgeBase.services.itSystemSupport}`);
      relevantInfo.push(`- ${gsaKnowledgeBase.services.digitalMarketing}`);
    }

    // Technology queries
    if (this.matchesAny(lowerQuery, ['technology', 'tech', 'software', 'programming', 'development', 'tools'])) {
      relevantInfo.push(`Technologies: ${gsaKnowledgeBase.technologies.slice(0, 8).join(', ')} and more`);
      relevantInfo.push(`Software Mastered: ${gsaKnowledgeBase.companyOverview.stats.softwareMastered}+ technologies`);
    }

    // Contact queries
    if (this.matchesAny(lowerQuery, ['contact', 'reach', 'phone', 'email', 'location', 'address'])) {
      relevantInfo.push("Contact Information:");
      relevantInfo.push(`Email: ${gsaKnowledgeBase.companyOverview.contact.email}`);
      relevantInfo.push(`Phone: ${gsaKnowledgeBase.companyOverview.contact.phone}`);
      relevantInfo.push(`Location: ${gsaKnowledgeBase.companyOverview.location}`);
    }

    return relevantInfo.length > 0 ? relevantInfo.join('\n') : '';
  }

  private matchesAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  getContextualPrompt(query: string): string {
    const relevantInfo = this.searchRelevantInfo(query);
    
    return `
You are an AI assistant for GSA (Gemerlang Sejahtera Abadi), a leading digital strategic partner company in Indonesia.

RELEVANT COMPANY INFORMATION:
${relevantInfo}

COMPANY OVERVIEW:
- Name: Gemerlang Sejahtera Abadi (GSA)
- Tagline: Leading digital strategic partner with seamless IT solutions
- Team: 350+ people with 60% engineers
- Global Network: 11+ countries
- Location: Jakarta, Indonesia

KEY SERVICES:
1. Virtual Ecosystem (AR/VR Implementation) - Clients: Disney, Marvel, BTS x Tokopedia
2. IT System Support (ERP, Gaming, Web3, Website/Apps)  
3. Digital Marketing (Marketplace Optimization with 956.70% improvement results)

INSTRUCTIONS:
- Be helpful, professional, and conversational
- Always relate responses back to GSA's actual capabilities
- If you don't have specific information, direct users to contact GSA directly
- Keep responses concise but informative
- Show enthusiasm about GSA's services and expertise

User Question: ${query}

Please provide a helpful response based on GSA's capabilities and services.
`;
  }
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const retriever = new GSAKnowledgeRetriever();

    // Get contextual prompt with relevant GSA information
    const contextualPrompt = retriever.getContextualPrompt(message);

    const result = await model.generateContent(contextualPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ 
      response: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again or contact GSA directly at info@gsagroup.id.' },
      { status: 500 }
    );
  }
} 
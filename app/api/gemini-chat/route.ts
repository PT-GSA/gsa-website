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
    const relevantInfo: string[] = [];

    // Team queries (main team/project team)
    if (this.matchesAny(lowerQuery, ['tim utama', 'tim proyek', 'key team', 'project team', 'main team'])) {
      relevantInfo.push('Main GSA Project Team:');
      relevantInfo.push('1. Boedi Moelya M. Fikih – GSA Project Director (Indonesia)\n   - Professional web developer and SEO expert with extensive experience in building efficient, results-driven digital solutions. Combines strong technical skills with a deep understanding of online strategy to create websites that are visually engaging and performance-optimized.');
      relevantInfo.push('2. M Syahrul Hidayat – GSA Digital Marketing & Branding Specialist (Indonesia)\n   - Young Innovator & Digitalization Enthusiast with a strong Business Management and IT background. Passionate about modern digital transformation, leveraging technology for innovation, efficiency, and growth to empower businesses and communities.');
      relevantInfo.push('3. Kevie Hendrix – Representative Project Manager (USA)\n   - Seasoned Project Manager & Business Development Leader with 20+ years of experience in IT solutions, digital transformation, and outsourcing management. Expert in high-value contracts, international partnerships, and vendor negotiations.');
      relevantInfo.push('4. Oliver King-Smith – AI Strategy & Innovation Specialist Representative (United Kingdom)\n   - Prolific inventor and entrepreneur in sensors, healthcare technology, and AI. Leads smartR AI, developing innovative patents for health tracking, support for vulnerable populations, and resource optimization.');
    }

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

// Tambahkan fungsi translateText menggunakan Gemini
async function translateText(text: string, from: string, to: string): Promise<string> {
  if (from === to) return text;
  // Gunakan Gemini untuk translate
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Translate the following text from ${from} to ${to} (use natural, conversational style):\n\n${text}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}

export async function POST(request: NextRequest) {
  try {
    const { message, language = 'en' } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    let userQuestion = message;
    let userLang = language;
    if (!['en', 'id', 'ja', 'zh-TW'].includes(userLang)) userLang = 'en';

    // Translate pertanyaan ke Inggris jika perlu
    if (userLang !== 'en') {
      userQuestion = await translateText(message, userLang, 'en');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const retriever = new GSAKnowledgeRetriever();
    const contextualPrompt = retriever.getContextualPrompt(userQuestion);
    const result = await model.generateContent(contextualPrompt);
    const response = await result.response;
    let text = response.text();

    // Translate jawaban ke bahasa user jika perlu
    if (userLang !== 'en') {
      text = await translateText(text, 'en', userLang);
    }

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
// lib/vectorRAG.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    section: string;
    topic: string;
    importance: number;
  };
  embedding?: number[];
}

export class VectorRAGSystem {
  private documents: DocumentChunk[] = [];
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.initializeDocuments();
  }

  private initializeDocuments() {
    // Break down GSA profile into searchable chunks
    this.documents = [
      {
        id: "company_overview",
        content: "GSA (Gemerlang Sejahtera Abadi) is a leading digital strategic partner with 350+ dedicated team members, 60% engineers, 100+ integrated software solutions, and 11+ global network presence across countries including Egypt, Japan, China, South Korea, UAE, Oman, Tanzania, USA, Malaysia, Taiwan, and Singapore.",
        metadata: { section: "overview", topic: "company_info", importance: 10 }
      },
      {
        id: "key_personnel_boedi",
        content: "Boedi Moelya M. Fikih is GSA Project Director, a professional web developer and SEO expert with extensive experience in WordPress Development, Search Engine Optimization, Front-End Development, Web Performance Optimization, UI/UX Design, and Technical SEO. Career highlights include Senior Full Stack Developer & SEO Specialist roles.",
        metadata: { section: "team", topic: "personnel", importance: 8 }
      },
      {
        id: "key_personnel_syahrul",
        content: "M Syahrul Hidayat is GSA Digital Marketing & Branding Specialist, a Young Innovator & Digitalization Enthusiast with expertise in Digital Transformation, Business & IT Integration, Creative Problem-Solving, Branding & Digital Presence, Community & Talent Management. Founded NgabuburIT, DigitalinKuy, CNL Class with 1000+ talent community.",
        metadata: { section: "team", topic: "personnel", importance: 8 }
      },
      {
        id: "key_personnel_kevie",
        content: "Kevie Hendrix is Representative Project Manager for USA with 20+ years experience in IT solutions, digital transformation, and outsourcing management. Successfully managed $210M project partnerships (Italian Air Force – Boeing), delivered $100M international offset projects (Kuwait Apache Program), led $3M+ annual government contract sales teams.",
        metadata: { section: "team", topic: "personnel", importance: 8 }
      },
      {
        id: "key_personnel_oliver",
        content: "Oliver King-Smith is AI Strategy & Innovation Specialist Representative, prolific inventor and entrepreneur in sensors, healthcare technology, and artificial intelligence. Founded smartR AI, won Gartner Cool Vendor Semiconductor 2015 award, developed first WiFi-based smart camera with CES award. Expert in SCOTi® AI solutions.",
        metadata: { section: "team", topic: "ai_expertise", importance: 9 }
      },
      {
        id: "team_composition",
        content: "GSA team composition: 35.6% Creative & Design, 23.7% Software Development, 10.2% DevOps & IT Operation, 9.3% IT Administrative & Support, 5.9% Product Management, 4.2% IT Governance & Compliance, 3.4% Game Development, 2.5% Hardware Engineers, 1.7% Quality Assurance, 1.7% Research & Innovation, 0.8% IT Cyber Security, 0.8% Technical Writing.",
        metadata: { section: "team", topic: "composition", importance: 7 }
      },
      {
        id: "technologies",
        content: "GSA masters 35+ software technologies including Unity, Blender, Figma, Laravel, Angular, Flutter, Sourcetree, Kubernetes, Go, Bash, Meta Spark, Effect House, Bootstrap, Drupal, React Native, Jenkins, WordPress, JavaScript, HTML, CSS, Python, PHP, SQL, Arduino, jQuery, Rails, React.js, GitLab, Elasticsearch.",
        metadata: { section: "capabilities", topic: "technologies", importance: 9 }
      },
      {
        id: "ar_vr_services",
        content: "GSA provides Virtual Ecosystem AR/VR Implementation services including AR platforms for promotions and events, Metaverse platform development, educational and cultural experiences, Smart Kiosk with AR and AI technology. Clients include Disney Indonesia, Marvel, BTS x Tokopedia, Billionaire Boys Club by Pharrell Williams.",
        metadata: { section: "services", topic: "ar_vr", importance: 9 }
      },
      {
        id: "case_study_disney",
        content: "Disney's Toy Story AR project: GSA collaborated with Disney Indonesia to develop AR platforms for promotions and events allowing users to become characters, interact with idols, and enjoy immersive experiences across various media and locations.",
        metadata: { section: "case_studies", topic: "ar_projects", importance: 8 }
      },
      {
        id: "case_study_nusa_borobudur",
        content: "Nusa Borobudur: GSA developed an inclusive Metaverse platform offering immersive educational and cultural experiences. This initiative showcases BINUS's commitment to using technology to advance education and tourism. Supported by the Ministry of Tourism and Creative Economy, aims to promote Indonesia's cultural diversity.",
        metadata: { section: "case_studies", topic: "metaverse", importance: 8 }
      },
      {
        id: "case_study_mindstores",
        content: "Mindstores: GSA created a remote sales partner platform for retailers to reach customers at local level. Results show 150,000+ users registered, 30% user activation, 15,000/month average transactions, 25,000+ total products, with average transaction value of 9,493,735 IDR.",
        metadata: { section: "case_studies", topic: "commerce", importance: 8 }
      },
      {
        id: "erp_software",
        content: "GSA provides comprehensive ERP Software Development including Sales & CRM, Marketing, Finance & Accounting, Manufacturing & Inventory, Services & Projects, Human Resources (HRD), and Productivity Tools modules.",
        metadata: { section: "services", topic: "erp", importance: 7 }
      },
      {
        id: "gaming_web3",
        content: "GSA offers Gaming and Web3 platform solutions providing secure, immersive experiences with full digital asset ownership through blockchain technology. Enables businesses to interact naturally with AI, enhance productivity, and uncover hidden insights from vast data pools.",
        metadata: { section: "services", topic: "gaming_web3", importance: 7 }
      },
      {
        id: "digital_marketing",
        content: "GSA Digital Marketing services include Marketplace Optimization for Shopee, Tokopedia, TikTok, Lazada with 956.70% improvement results demonstrated, and Performance Marketing using Meta Ads, Google Ads, TikTok Ads. Strategic marketing drives growth from market analysis and branding to creative campaigns and targeted promotions.",
        metadata: { section: "services", topic: "digital_marketing", importance: 8 }
      },
      {
        id: "contact_info",
        content: "GSA contact information: Email info@gsagroup.id, Phone +62 878-5421-7963, Website gsagroup.id, Instagram @gsagroup.id. Located at Sampoerna Strategic Square, South Tower 18th Floor, Jenderal Sudirman St., Karet Semanggi, Setiabudi, South Jakarta, Jakarta 12930, Indonesia.",
        metadata: { section: "contact", topic: "contact_info", importance: 6 }
      }
    ];
  }

  // Simple semantic search (in production, use proper embedding models)
  private calculateSimilarity(query: string, document: DocumentChunk): number {
    const queryWords = query.toLowerCase().split(' ');
    const docWords = document.content.toLowerCase().split(' ');
    
    let matches = 0;
    queryWords.forEach(word => {
      if (docWords.some(docWord => docWord.includes(word) || word.includes(docWord))) {
        matches++;
      }
    });

    // Boost score based on importance and section relevance
    let score = (matches / queryWords.length) * 100;
    score *= (document.metadata.importance / 10);

    return score;
  }

  async retrieveRelevantContext(query: string, maxResults: number = 5): Promise<string> {
    // Calculate similarity scores for all documents
    const scoredDocs = this.documents.map(doc => ({
      ...doc,
      score: this.calculateSimilarity(query, doc)
    }));

    // Sort by relevance and take top results
    const topDocs = scoredDocs
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .filter(doc => doc.score > 10); // Filter out very low relevance

    // Combine relevant content
    const context = topDocs
      .map(doc => `[${doc.metadata.section.toUpperCase()}] ${doc.content}`)
      .join('\n\n');

    return context;
  }

  async generateResponse(query: string): Promise<string> {
    try {
      const relevantContext = await this.retrieveRelevantContext(query);
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
You are an AI assistant for GSA (Gemerlang Sejahtera Abadi), a leading digital strategic partner company in Indonesia.

RELEVANT COMPANY INFORMATION:
${relevantContext}

INSTRUCTIONS:
- Provide accurate, helpful responses based on the relevant information above
- Always relate responses back to GSA's actual capabilities and experience
- Be conversational but professional
- If the information isn't in the context, be honest about limitations
- Focus on how GSA can help solve the user's business challenges

USER QUESTION: ${query}

RESPONSE:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();

    } catch (error) {
      console.error('RAG Generation Error:', error);
      return "I apologize, but I'm experiencing technical difficulties. Please try again or contact GSA directly at info@gsagroup.id.";
    }
  }

  // Method to add new documents (for dynamic content updates)
  addDocument(chunk: DocumentChunk) {
    this.documents.push(chunk);
  }

  // Method to update existing documents
  updateDocument(id: string, newContent: string) {
    const docIndex = this.documents.findIndex(doc => doc.id === id);
    if (docIndex !== -1) {
      this.documents[docIndex].content = newContent;
    }
  }
}

// Usage in the Hero component - update the fetch URL
// In your Hero component, change the API endpoint:
// const response = await fetch('/api/gemini-rag', {
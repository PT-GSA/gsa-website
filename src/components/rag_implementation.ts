// lib/gsaKnowledgeBase.ts
export const gsaKnowledgeBase = {
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

  globalNetwork: [
    "Egypt", "Japan", "China", "South Korea", "UAE", "Oman", 
    "Tanzania", "USA", "Malaysia", "Taiwan", "Singapore"
  ],

  keyPersonnel: [
    {
      name: "Boedi Moelya M. Fikih",
      role: "GSA Project Director",
      expertise: [
        "WordPress Development", "SEO", "Front-End Development", 
        "Web Performance Optimization", "UI/UX Design", "Technical SEO"
      ],
      experience: "Senior Full Stack Developer & SEO Specialist"
    },
    {
      name: "M Syahrul Hidayat",
      role: "GSA Digital Marketing & Branding Specialist",
      expertise: [
        "Digital Transformation", "Business & IT Integration", 
        "Creative Problem-Solving", "Branding & Digital Presence"
      ],
      experience: "Young Innovator & Digitalization Enthusiast"
    },
    {
      name: "Kevie Hendrix",
      role: "Representative Project Manager (USA)",
      expertise: [
        "Project & Program Management", "Business Development", 
        "Contract & Vendor Negotiation", "IT & Digital Solutions Consulting"
      ],
      experience: "20+ years in IT solutions and digital transformation"
    },
    {
      name: "Oliver King-Smith",
      role: "AI Strategy & Innovation Specialist Representative",
      expertise: [
        "AI Innovation", "Healthcare Technology", "Sensor Technology",
        "Patent Development", "smartR AI Solutions"
      ],
      experience: "Prolific inventor and entrepreneur, Gartner Cool Vendor 2015"
    }
  ],

  teamComposition: {
    totalEmployees: 350,
    engineerPercentage: 60,
    departments: {
      "Creative & Design": 35.6,
      "Software Development": 23.7,
      "DevOps & IT Operation": 10.2,
      "IT Administrative & Support": 9.3,
      "Product Management": 5.9,
      "IT Governance & Compliance": 4.2,
      "Game Development": 3.4,
      "Hardware Engineers": 2.5,
      "Quality Assurance": 1.7,
      "Research & Innovation": 1.7,
      "IT Cyber Security": 0.8,
      "Technical Writing": 0.8
    }
  },

  technologies: [
    "Unity", "Blender", "Figma", "Laravel", "Angular", "Flutter", 
    "Sourcetree", "Kubernetes", "Go", "Bash", "Meta Spark", 
    "Effect House", "Bootstrap", "Drupal", "React Native", "Jenkins",
    "WordPress", "JavaScript", "HTML", "CSS", "Python", "PHP", "SQL",
    "Arduino", "jQuery", "Rails", "React.js", "GitLab", "Elasticsearch"
  ],

  services: {
    virtualEcosystem: {
      description: "AR, VR Implementation",
      capabilities: [
        "AR platforms for promotions and events",
        "Metaverse platform development",
        "Educational and cultural experiences",
        "Smart Kiosk with AR and AI technology"
      ],
      clients: ["Disney Indonesia", "Marvel", "BTS x Tokopedia", "Billionaire Boys Club"]
    },
    
    itSystemSupport: {
      erpSoftware: {
        modules: [
          "Sales & CRM", "Marketing", "Finance & Accounting",
          "Manufacturing & Inventory", "Services & Projects",
          "Human Resources (HRD)", "Productivity Tools"
        ]
      },
      gamingWeb3: {
        description: "Gaming, Metaverse, and Web3 solutions with blockchain technology",
        features: ["Secure immersive experiences", "Digital asset ownership"]
      },
      websiteApps: {
        services: ["Professional Apps", "E-commerce Integration", "Frontend Development"]
      }
    },

    digitalMarketing: {
      marketplaceOptimization: {
        platforms: ["Shopee", "Tokopedia", "TikTok", "Lazada"],
        results: "956.70% improvement demonstrated"
      },
      performanceMarketing: {
        platforms: ["Meta Ads", "Google Ads", "TikTok Ads"],
        description: "Strategic marketing drives growth from market analysis to targeted promotions"
      }
    }
  },

  caseStudies: [
    {
      project: "Disney's Toy Story AR",
      type: "Virtual Ecosystem AR/VR",
      description: "AR platform for promotions allowing users to become characters and interact"
    },
    {
      project: "Marvel's Spiderman AR",
      type: "Virtual Ecosystem AR/VR", 
      description: "Interactive AR experience for Marvel promotions"
    },
    {
      project: "Nusa Borobudur Metaverse",
      type: "Educational Metaverse",
      description: "Inclusive Metaverse platform for educational and cultural experiences, supported by Ministry of Tourism"
    },
    {
      project: "Mindstores",
      type: "AR Commerce Solution",
      description: "Remote sales partner platform with 150,000+ users and 30% activation rate"
    }
  ],

  partnerships: [
    "BINUS University", "Ministry of Tourism and Creative Economy Indonesia",
    "Various international technology companies across 11+ countries"
  ]
};

// lib/ragRetrieval.ts
import { gsaKnowledgeBase } from './gsaKnowledgeBase';

export class GSAKnowledgeRetriever {
  private static instance: GSAKnowledgeRetriever;
  
  static getInstance(): GSAKnowledgeRetriever {
    if (!GSAKnowledgeRetriever.instance) {
      GSAKnowledgeRetriever.instance = new GSAKnowledgeRetriever();
    }
    return GSAKnowledgeRetriever.instance;
  }

  searchRelevantInfo(query: string): string {
    const lowerQuery = query.toLowerCase();
    let relevantInfo: string[] = [];

    // Company overview queries
    if (this.matchesAny(lowerQuery, ['company', 'about', 'gsa', 'overview', 'who are you'])) {
      relevantInfo.push(`Company: ${gsaKnowledgeBase.companyOverview.name}`);
      relevantInfo.push(`Description: ${gsaKnowledgeBase.companyOverview.tagline}`);
      relevantInfo.push(`Team: ${gsaKnowledgeBase.companyOverview.stats.dedicatedTeam} people with ${gsaKnowledgeBase.companyOverview.stats.engineers} engineers`);
      relevantInfo.push(`Global Network: ${gsaKnowledgeBase.companyOverview.stats.globalNetwork} countries`);
    }

    // Team and personnel queries
    if (this.matchesAny(lowerQuery, ['team', 'staff', 'people', 'employees', 'personnel'])) {
      relevantInfo.push(`Total Team: ${gsaKnowledgeBase.teamComposition.totalEmployees} employees`);
      relevantInfo.push(`Engineer Percentage: ${gsaKnowledgeBase.teamComposition.engineerPercentage}%`);
      
      // Add key personnel
      gsaKnowledgeBase.keyPersonnel.forEach(person => {
        relevantInfo.push(`${person.name} - ${person.role}: ${person.expertise.slice(0, 3).join(', ')}`);
      });
    }

    // Technology queries
    if (this.matchesAny(lowerQuery, ['technology', 'tech', 'software', 'programming', 'development'])) {
      relevantInfo.push(`Technologies: ${gsaKnowledgeBase.technologies.slice(0, 10).join(', ')} and more`);
      relevantInfo.push(`Software Mastered: ${gsaKnowledgeBase.companyOverview.stats.softwareMastered}+ technologies`);
    }

    // Services queries
    if (this.matchesAny(lowerQuery, ['services', 'what do you do', 'capabilities'])) {
      relevantInfo.push("Key Services:");
      relevantInfo.push("- Virtual Ecosystem (AR/VR Implementation)");
      relevantInfo.push("- IT System Support (ERP, Gaming, Web3, Website/Apps)");
      relevantInfo.push("- Digital Marketing (Marketplace Optimization, Performance Marketing)");
    }

    // AR/VR queries
    if (this.matchesAny(lowerQuery, ['ar', 'vr', 'augmented reality', 'virtual reality', 'metaverse'])) {
      relevantInfo.push("AR/VR Expertise:");
      relevantInfo.push(`Clients: ${gsaKnowledgeBase.services.virtualEcosystem.clients.join(', ')}`);
      relevantInfo.push(`Capabilities: ${gsaKnowledgeBase.services.virtualEcosystem.capabilities.join(', ')}`);
    }

    // Case studies queries
    if (this.matchesAny(lowerQuery, ['projects', 'case studies', 'examples', 'portfolio'])) {
      relevantInfo.push("Notable Projects:");
      gsaKnowledgeBase.caseStudies.forEach(study => {
        relevantInfo.push(`- ${study.project}: ${study.description}`);
      });
    }

    // Digital marketing queries
    if (this.matchesAny(lowerQuery, ['marketing', 'digital marketing', 'seo', 'ads'])) {
      relevantInfo.push("Digital Marketing Services:");
      relevantInfo.push(`Marketplace Optimization: ${gsaKnowledgeBase.services.digitalMarketing.marketplaceOptimization.platforms.join(', ')}`);
      relevantInfo.push(`Performance Marketing: ${gsaKnowledgeBase.services.digitalMarketing.performanceMarketing.platforms.join(', ')}`);
      relevantInfo.push(`Recent Results: ${gsaKnowledgeBase.services.digitalMarketing.marketplaceOptimization.results} improvement demonstrated`);
    }

    // Contact queries
    if (this.matchesAny(lowerQuery, ['contact', 'reach', 'phone', 'email', 'location'])) {
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

  // Get contextual prompt for specific queries
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
1. Virtual Ecosystem (AR/VR Implementation)
2. IT System Support (ERP, Gaming, Web3, Website/Apps)  
3. Digital Marketing (Marketplace Optimization, Performance Marketing)

Please provide helpful, accurate responses based on this information. Always relate responses back to GSA's actual capabilities and experience.

User Question: ${query}
`;
  }
}

// Updated API route with RAG integration
// app/api/gemini-chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { GSAKnowledgeRetriever } from '../../../lib/ragRetrieval';

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

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const retriever = GSAKnowledgeRetriever.getInstance();

    // Get contextual prompt with relevant GSA information
    const contextualPrompt = retriever.getContextualPrompt(message);

    const result = await model.generateContent(contextualPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
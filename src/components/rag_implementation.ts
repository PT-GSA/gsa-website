// lib/ragRetrieval.ts
import { gsaKnowledgeBase } from '../../lib/gsaKnowledgeBase';

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
    const relevantInfo: string[] = [];

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

// Usage example:
// const retriever = GSAKnowledgeRetriever.getInstance();
// const prompt = retriever.getContextualPrompt(userQuery);
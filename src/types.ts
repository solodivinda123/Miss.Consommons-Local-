export interface Ambassadrice {
  name: string;
  age: number;
  projectTitle: string;
  projectDesc: string;
  featuredProduct: string;
  imageUrl: string;
  education?: string;
  status?: string; // e.g., "Lauréate", "Dauphine", "Finaliste"
}

export interface Commune {
  id: string;
  name: string;
  district: "Lukunga" | "Funa" | "Mont-Amba" | "Tshangu";
  description: string;
  ambassadrices: {
    [year: string]: Ambassadrice;
  };
}

export interface Partner {
  name: string;
  logoUrl?: string;
  role: string;
  isOfficial?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface TimelineItem {
  phase: string;
  title: string;
  desc: string;
  period: string;
  status: "completed" | "active" | "upcoming";
}

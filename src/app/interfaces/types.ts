interface post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

interface category {
  name: string;
  count: string;
  color: string;
}

interface siteInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  social: {
    twitter: string;
    github: string;
    linkedin: string;
    youtube: string;
  };
}

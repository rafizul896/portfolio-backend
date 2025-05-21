export interface IBlog {
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  author: string;
  category: string;
  tags?: string[];
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

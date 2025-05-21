export interface ISkill {
  name: string;
  category: "technical" | "soft";
  icon?: string;
  order: number;
}

export interface ISkillFilters {
  category?: "technical" | "soft";
  page?: number;
  limit?: number;
}

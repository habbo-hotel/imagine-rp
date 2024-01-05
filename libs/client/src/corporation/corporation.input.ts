export interface CorporationFilterManyInput {
  ids?: number[];
  searchName?: string;
  skip?: number;
  limit?: number;
}

export interface CorporationFilterOneInput {
  id: number;
}

export interface CorporationCreateInput {
  name: string;
  description: string;
}

export type CorporationUpdateInput = Partial<CorporationCreateInput>;
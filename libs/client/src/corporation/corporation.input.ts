export interface CorporationFetchManyInput {
  ids?: number[];
  searchName?: string;
  skip?: number;
  limit?: number;
}

export interface CorporationFetchOneInput {
  id: number;
}

export interface CorporationCreateInput {
  name: string;
  description: string;
}

export type CorporationUpdateInput = Partial<CorporationCreateInput>;
export interface GangFetchManyInput {
  ids?: number[];
  searchName?: string;
  skip?: number;
  limit?: number;
}

export interface GangFetchOneInput {
  id: number;
}

export interface GangCreateInput {
  name: string;
  description: string;
}

export type GangUpdateInput = Partial<GangCreateInput>;
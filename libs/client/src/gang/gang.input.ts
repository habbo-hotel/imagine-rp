export interface GangFilterManyInput {
  ids?: number[];
  searchName?: string;
  skip?: number;
  limit?: number;
}

export interface GangFilterOneInput {
  id: number;
}

export interface GangCreateInput {
  name: string;
  description: string;
}

export type GangUpdateInput = Partial<GangCreateInput>;
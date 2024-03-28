export interface RPStatsFilterOneInput {
  userID: number;
}

export interface RPStatsFilterManyInput {
  userIDs?: number[];
  skip?: number;
  limit?: number;

}
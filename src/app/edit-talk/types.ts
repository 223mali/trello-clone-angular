export type Comment = {
  comment: string;
  user: string;
  createdAt: Date;
};

export type TrackListState = {
  trackId: string;
  title: string;
  isEditing: boolean;
};

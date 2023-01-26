export type Comment = {
  comment: string;
  user: string;
  createdAt: Date;
};

export type TrackListState = {
  id: string;
  title: string;
  isEditing?: boolean;
};

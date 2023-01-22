enum priorityValues {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export interface Tag {
  name: string;
  color?: string;
}
export interface ITicket {
  title: string;
  priority: priorityValues;
  storyPoints: number;
  ticketCode: string;
  assignee: string;
  description: string;
  createdAt: Date;
  image: string;
}

// export interface Issue {
//     name: IssueType;
//     color: string;
// }

export enum IssueType {
  Task = "task",
  SubTask = "sub-task",
  Bug = "bug",
  Epic = "epic",
  Story = "story",
}

export interface Track {
  title: string;
  talks: ITicket[];
  id: string;
}

export interface Board {
  title: string;
  tracks: Track[];
}

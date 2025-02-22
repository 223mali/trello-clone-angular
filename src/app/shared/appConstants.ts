import { IssueType } from "./models/schema.model";

export const appConstants = {
  /** Issue Types with ttheir hardcoded colors */
  issueTypeListWithColor: {
    [IssueType.Bug]: {
      name: IssueType.Bug,
      color: "#99333352",
    },
    [IssueType.Epic]: {
      name: IssueType.Epic,
      color: "#33996652",
    },
    [IssueType.Story]: {
      name: IssueType.Story,
      color: "#fff3d4",
    },
    [IssueType.Task]: {
      name: IssueType.Task,
      color: "#99ccff61",
    },
    [IssueType.SubTask]: {
      name: IssueType.SubTask,
      color: "#3d7e9a4d",
    },
  },

  PRIORITY_LIST: ["Urgent", "Medium", "Low"],
  STORY_POINTS_LIST: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

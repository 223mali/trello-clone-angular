import { Injectable } from "@angular/core";
import { Board, ITicket, Track } from "./shared/models/schema.model";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  private _board: Board = require("./data.json");

  initiateBoard(): void {}

  getBoards(): Board {
    const board = JSON.parse(localStorage.getItem("board"));
    if (!board) {
      localStorage.setItem(
        "board",
        JSON.stringify({ title: "My Board", tracks: [] })
      );
      return { title: "My Board", tracks: [] };
    }
    return board;
  }

  addTrack(): Board {
    let board = JSON.parse(localStorage.getItem("board")) as Board;

    board.tracks.push({
      id: String(Math.ceil(Math.random() * 10000)),
      title: "",
      talks: [],
    });
    localStorage.setItem("board", JSON.stringify(board));
    return board;
  }

  updateTrackTitle(trackId, title): Board {
    let board = JSON.parse(localStorage.getItem("board")) as Board;
    board.tracks.map((elem) => {
      if (elem.id === trackId) elem.title = title;
    });

    localStorage.setItem("board", JSON.stringify(board));

    return board;
  }

  createCard(card: ITicket, trackId): Board {
    let board = JSON.parse(localStorage.getItem("board")) as Board;
    board.tracks.map((elem) => {
      if (elem.id === trackId) elem.talks.push(card);
    });

    localStorage.setItem("board", JSON.stringify(board));

    return board;
  }
}

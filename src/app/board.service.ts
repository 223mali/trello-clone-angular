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

  addTrack(): { board: Board; track: Track } {
    let board = JSON.parse(localStorage.getItem("board")) as Board;
    const trackObj = {
      id: String(Math.ceil(Math.random() * 10000)),
      title: "",
      talks: [],
    };
    board.tracks.push(trackObj);
    localStorage.setItem("board", JSON.stringify(board));
    return { board, track: trackObj };
  }

  updateTrackTitle(trackId, title): Board {
    let board = JSON.parse(localStorage.getItem("board")) as Board;
    board.tracks.map((elem) => {
      if (elem.id === trackId) elem.title = title;
    });

    localStorage.setItem("board", JSON.stringify(board));

    return board;
  }

  updateCard(card: ITicket, trackId: string): Board {
    let board = JSON.parse(localStorage.getItem("board")) as Board;
    board.tracks.map((elem) => {
      if (elem.id === trackId) {
        elem.talks.map((ticket) => {
          if (ticket.ticketCode === card.ticketCode) ticket = card;
        });
      }
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

  deleteTrack(trackId): Board {
    let board = JSON.parse(localStorage.getItem("board")) as Board;
    board.tracks = board.tracks.filter((elem) => elem.id !== trackId);

    localStorage.setItem("board", JSON.stringify(board));

    return board;
  }

  moveTicketBetweenTracks(
    droppedTrackId: string,
    data: ITicket[],
    draggedTrackId: string,
    previousListData: ITicket[]
  ): Board {
    let board = JSON.parse(localStorage.getItem("board")) as Board;
    board.tracks.map((elem) => {
      if (elem.id === droppedTrackId) elem.talks = data;
      if (elem.id === draggedTrackId) {
        elem.talks = previousListData;
      }
    });

    localStorage.setItem("board", JSON.stringify(board));

    return board;
  }
}

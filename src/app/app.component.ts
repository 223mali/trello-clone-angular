import { Component } from "@angular/core";
import { BoardService } from "./board.service";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { EditTalkComponent } from "./edit-talk/edit-talk.component";
import { MatDialog } from "@angular/material/dialog";
import { DeleteTalkComponent } from "./delete-talk/delete-talk.component";
import { Board, ITicket, Track } from "./shared/models/schema.model";
import { CreateTicketComponent } from "./create-ticket/create-ticket.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  board: Board;
  newListName: string;

  constructor(private _boardService: BoardService, private _dialog: MatDialog) {
    this.board = this._boardService.getBoards();
    this.newListName = "";
  }

  /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
   */
  trackIds(): string[] {
    return this.board.tracks.map((track) => track.id);
  }

  onTalkDrop(event: CdkDragDrop<ITicket[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given talk to the target data array. This happens if
    // a talk has been dropped on a different track.
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onTrackDrop(event: CdkDragDrop<Track[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  addEditTalk(talk: ITicket, track: Track, edit = false) {
    // Use the injected dialog service to launch the previously created edit-talk
    // component. Once the dialog closes, we assign the updated talk data to
    // the specified talk.
    this._dialog
      .open(EditTalkComponent, { data: { talk, edit }, width: "90vw" })
      .afterClosed()
      .subscribe((newTalkData) =>
        edit
          ? Object.assign(talk, newTalkData)
          : track.talks.unshift(newTalkData)
      );
  }

  deleteTalk(talk: ITicket, track: Track) {
    // Open a dialog
    this._dialog
      .open(DeleteTalkComponent, { data: talk, width: "500px" })
      .afterClosed()
      .subscribe((response) => {
        // Wait for it to close and delete the talk if the user agreed.
        if (response) {
          track.talks.splice(track.talks.indexOf(talk), 1);
        }
      });
  }

  filterByDate(talks, asc = 1) {
    talks = [
      ...talks.sort(
        (a: any, b: any) =>
          asc *
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      ),
    ];
    console.log(talks);
  }

  onSaveTitle(track: Track) {
    this.board = this._boardService.updateTrackTitle(
      track.id,
      this.newListName
    );
  }

  createTicketModal(track: Track): void {
    this._dialog
      .open(CreateTicketComponent, { width: "50vw" })
      .afterClosed()
      .subscribe((newTicket) => {
        this.board = this._boardService.createCard(newTicket, track.id);

        console.log("Me ticket!!!!!", newTicket);
      });
  }

  onListTitleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newListName = target.value;
  }
  onTrackAdd() {
    console.log("gggg");
    this.board = this._boardService.addTrack();
  }
}

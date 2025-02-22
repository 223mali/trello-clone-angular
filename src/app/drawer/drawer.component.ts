import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BoardService } from "../board.service";
import { Board } from "../shared/models/schema.model";
import { MatDialog } from "@angular/material/dialog";
import { CreateTicketComponent } from "../create-ticket/create-ticket.component";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
  styleUrls: ["./drawer.component.scss"],
})
export class DrawerComponent {
  board: Board;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private boardService: BoardService,
    private _dialog: MatDialog
  ) {
    this.board = boardService.getBoards();
  }

  createTicketModal(): void {
    this._dialog
      .open(CreateTicketComponent, { width: "50vw" })
      .afterClosed()
      .subscribe((newTicket) => console.log("Me ticket!!!!!", newTicket));
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
}

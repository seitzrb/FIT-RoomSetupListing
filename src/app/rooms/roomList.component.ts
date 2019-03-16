import { Component, OnInit, Inject } from '@angular/core';
import { RoomService } from '../core/services/room.service';
import { Room } from '../models/room/room';
import { process, State, } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, EditService } from '@progress/kendo-angular-grid';


@Component({
  selector: 'rm-rooms',
  templateUrl: './roomList.component.html',
  styleUrls: ['./roomList.component.css']
})

export class RoomListComponent implements OnInit {
    rooms: Room[] = [];
    public multiple = false;
    public allowUnsort = true;

    private editedRowIndex: number;
    private editedRoom: Room;

    public state: State = {
      skip: 0,
      sort:  [{
        field: 'name',
        dir: 'asc'
      }]
    };

    public gridData: GridDataResult;

    constructor(private roomService: RoomService) {
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(this.rooms, this.state);
    }

    ngOnInit(): void {
      this.roomService.getRooms().subscribe((roomEntries: Room[]) => {
        this.rooms = roomEntries;
        this.gridData = process(this.rooms, this.state);
      });
    }

    createNewRoom(): Room {
      return new Room();
    }

    saveHandler({sender, rowIndex, dataItem, isNew}) {
      this.roomService.putRoom(dataItem).subscribe(
        res => {
          sender.closeRow(rowIndex);
        }
      );
    }

    editHandler({sender, rowIndex, dataItem}) {
      console.log('editHandler');
      this.closeEditor(sender);
      this.editedRowIndex = rowIndex;
      this.editedRoom = Object.assign({}, dataItem);
    }

    removeHandler({sender, rowIndex, dataItem}) {
      console.log('removeHandler');
      this.roomService.deleteRoom(dataItem).subscribe(() => {
        this.roomService.getRooms().subscribe((roomEntries: Room[]) => {
          this.rooms = roomEntries;
          this.gridData = process(this.rooms, this.state);
        });
      }
      );
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
      grid.closeRow(rowIndex);
//      this.roomService.putRoom(this.editedRoom);
      this.editedRowIndex = undefined;
      this.editedRoom = undefined;
  }
}

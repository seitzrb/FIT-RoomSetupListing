import { Component, OnInit, Inject } from '@angular/core';
import { RoomService } from '../core/services/room.service';
import { Room } from '../models/room/room';
import { process, State, } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, EditService } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';

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
    public windowOpened = false;
    public dialogOpened = false;
    public roomToDelete: Room;
    public showTrash = true;

    public state: State = {
      skip: 0,
      take: 15,
      sort:  [{
        field: 'name',
        dir: 'asc'
      }]
    };

    public gridData: GridDataResult;

    constructor(private roomService: RoomService, private notificationService: NotificationService) {
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
      if (isNew) {
        this.roomService.postRoom(dataItem).subscribe(
          res => {
            this.showTrash = true;
            sender.closeRow(rowIndex);
            this.roomService.getRooms().subscribe((roomEntries: Room[]) => {
              this.rooms = roomEntries;
              this.gridData = process(this.rooms, this.state);
            });
            this.notificationService.show({
              content: 'New room ' + dataItem.name + ' added successfully',
              hideAfter: 1600,
              position: { horizontal: 'center', vertical: 'top' },
              animation: { type: 'fade', duration: 400 },
              type: { style: 'success', icon: true }
          });

        },
        err => {
          this.showTrash = true;
          this.roomService.getRooms().subscribe((roomEntries: Room[]) => {
            this.rooms = roomEntries;
            this.gridData = process(this.rooms, this.state);
          });
          this.notificationService.show({
            content: 'Error during insert of ' + dataItem.name + '. Record not inserted',
            hideAfter: 1600,
            position: { horizontal: 'center', vertical: 'top' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'error', icon: true }
        });
        }

        );
      } else {
        this.roomService.putRoom(dataItem).subscribe(
          res => {
            sender.closeRow(rowIndex);
            this.notificationService.show({
              content: 'Room ' + dataItem.name + ' updated successfully',
              hideAfter: 1600,
              position: { horizontal: 'center', vertical: 'top' },
              animation: { type: 'fade', duration: 400 },
              type: { style: 'success', icon: true }
          });
          },
           err => {
            this.notificationService.show({
              content: 'Error during update of ' + dataItem.name + '. Record not updated',
              hideAfter: 1600,
              position: { horizontal: 'center', vertical: 'top' },
              animation: { type: 'fade', duration: 400 },
              type: { style: 'error', icon: true }
          });
           }
        );
      }
    }

    public addHandler({sender}, formInstance) {
      formInstance.reset();
      this.closeEditor(sender);
      this.showTrash = false;
      sender.addRow(new Room());
  }

    public editHandler({sender, rowIndex, dataItem}) {
      console.log('editHandler');
      this.closeEditor(sender);
      this.showTrash = false;
      this.editedRowIndex = rowIndex;
      this.editedRoom = Object.assign({}, dataItem);
    }

    public cancelHandler({sender, rowIndex}) {
      this.closeEditor(sender, rowIndex);
      this.showTrash = true;
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
      this.showTrash = true;
      this.editedRowIndex = undefined;
      this.editedRoom = undefined;
  }

  public saveRow(room: Room) {
    console.log(room);
    this.roomToDelete = room;
  }

  public deleteRoom() {
    console.log('deleteRoom');
      this.roomService.deleteRoom(this.roomToDelete).subscribe(() => {
        this.roomService.getRooms().subscribe((roomEntries: Room[]) => {
          this.rooms = roomEntries;
          this.gridData = process(this.rooms, this.state);
          this.notificationService.show({
            content: 'Room ' + this.roomToDelete.name + ' deleted successfully',
            hideAfter: 1600,
            position: { horizontal: 'center', vertical: 'top' },
            animation: { type: 'fade', duration: 400 },
            type: { style: 'success', icon: true }
          });
        });
      },
      err => {
        this.notificationService.show({
          content: 'Error during delete of ' + this.roomToDelete.name + '. Record not deleted',
          hideAfter: 1600,
          position: { horizontal: 'center', vertical: 'top' },
          animation: { type: 'fade', duration: 400 },
          type: { style: 'error', icon: true }
      });
     });
  }

  public close(component) {
    this[component + 'Opened'] = false;
  }

  public open(component) {
    this[component + 'Opened'] = true;
  }

  public action(status) {
    console.log(`Dialog result: ${status}`);
    this.dialogOpened = false;
  }
}

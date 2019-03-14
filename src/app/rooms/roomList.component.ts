import { Component, OnInit } from '@angular/core';
import { RoomService } from '../core/services/room.service';
import { Room } from '../models/room/room';
import {
  process,
  State,
  SortDescriptor,
  orderBy } from '@progress/kendo-data-query';

import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';


@Component({
  selector: 'rm-rooms',
  templateUrl: './roomList.component.html',
  styleUrls: ['./roomList.component.css']
})

export class RoomListComponent implements OnInit {
    rooms: Room[] = [];
    public multiple = false;
    public allowUnsort = true;
    public state: State = {
      skip: 0,
      sort:  [{
        field: 'name',
        dir: 'asc'
      }]
    };

    public gridData: GridDataResult;

    constructor( public roomService: RoomService) {
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
}

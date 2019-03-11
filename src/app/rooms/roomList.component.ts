import {Component, OnInit} from '@angular/core';
import { RoomService } from '../core/services/room.service';
import { Room } from '../models/room/room';

@Component({
  selector: 'rm-rooms',
  templateUrl: './roomList.component.html',
  styleUrls: ['./roomList.component.css']
})

export class RoomListComponent implements OnInit {
    rooms: Room[] = [];

    constructor( public roomService: RoomService) {
  }


  ngOnInit(): void {
     this.roomService.getRooms().subscribe((roomEntries: Room[]) => {
      this.rooms = roomEntries;
     });


  }
}

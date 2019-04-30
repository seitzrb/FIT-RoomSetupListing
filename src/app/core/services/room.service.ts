import { Room } from './../../models/room/room';
import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  // api/products/products.json
    roomUrly = 'https://vard12.lc.gov/dataservices/WebApi/RoomSetup/api/Room';
    roomUrlx = 'src/api/roomdata/rooms.json';
    roomUrl = 'http://5cc8a05e2dcd9d0014769122.mockapi.io/brendenRoom/rooms';
    constructor(private http: HttpClient) {  }

    getRooms(): Observable<Room[]> {
      const roomUrl = this.roomUrl;
      return this.http.get<Room[]>(roomUrl)
         .pipe (
             catchError((err) =>
                  throwError(err.Message)
             )
         );
    }

    putRoom(room: Room): Observable<Room> {
      const roomUrl = this.roomUrl + '/' + room.roomId;
      console.log('UpdateCall');
      console.log(room);
      console.log(roomUrl);

      return this.http.put<Room>(roomUrl, room)
        .pipe(
          catchError((err) => {
            return throwError(err.message);
          })
        );
    }

    postRoom(room: Room): Observable<Room> {
      const roomUrl = this.roomUrl;
      console.log('InsertCall');
      console.log(room);

      return this.http.post<Room>(roomUrl, room)
        .pipe(
          catchError((err) => {
            return throwError(err.message);
          })
        );
    }

    deleteRoom(room: Room): Observable<Room> {
      const roomUrl = this.roomUrl + '/' + room.roomId;
      return this.http.delete<Room>(roomUrl)
        .pipe(
          catchError((err) => {
            return throwError(err.message);
          })
        );
    }
}

import { Room } from './../../models/room/room';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  // api/products/products.json
    roomUrl = 'https://vard12.lc.gov/dataservices/WebApi/RoomSetup/api/Room';
    roomUrlx = 'src/api/roomdata/rooms.json';

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

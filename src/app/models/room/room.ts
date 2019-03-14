import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class Room {
  roomId: number;
  name: string;
  email: string;
  capacity: number;
}



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatroomComponent } from './component/chatroom/chatroom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialHomeComponent } from './container/social-home/social-home.component';
import { SocialRoomComponent } from './container/social-room/social-room.component';
import { StreamVideoComponent } from './component/stream-video/stream-video.component';
import { ChatRoomComponent } from './component/chat-room/chat-room.component';
import { StreamListComponent } from './container/stream-list/stream-list.component';
import { StreamItemComponent } from './component/stream-item/stream-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { StreamDialogComponent } from './component/stream-dialog/stream-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    SocialHomeComponent,
    SocialRoomComponent,
    StreamVideoComponent,
    ChatRoomComponent,
    StreamListComponent,
    StreamItemComponent,
    StreamDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StreamDialogComponent]
})
export class AppModule { }

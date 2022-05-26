import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export interface DialogData {
  comment: string;
}

@Component({
  selector: 'app-lyric-info',
  templateUrl: './lyric-info.component.html'
})
export class LyricInfoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {}
}

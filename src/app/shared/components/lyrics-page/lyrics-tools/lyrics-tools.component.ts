import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ThemeService} from "../../../services/settings/theme.service";
import {LyricInfoComponent} from "../../lyrics-info/lyric-info.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'lyrics-tools',
  templateUrl: 'lyrics-tools.component.html',
  styleUrls: ['lyrics-tools.component.scss']
})

export class LyricsToolsComponent implements OnInit{
  @Input() public tonality: string | undefined;
  @Input() public comment: string | undefined;
  @Output() public changeShowChords = new EventEmitter<boolean>();
  @Output() public changeTonPosition = new EventEmitter<number>();
  public theme: string = 'light';
  public showChords = false;
  public cordPosition = 0;

  constructor(private themeService: ThemeService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe( theme => this.theme = theme);
  }

  public openDialog() {
    this.dialog.open(LyricInfoComponent, { data: {comment: this.comment}});
  }

  public toggle() {
    this.showChords = !this.showChords;
    this.changeShowChords.emit(this.showChords);
  }

  public changeTon(value: number){
    this.cordPosition = this.cordPosition + value;
    this.changeTonPosition.emit(this.cordPosition);
  }

}

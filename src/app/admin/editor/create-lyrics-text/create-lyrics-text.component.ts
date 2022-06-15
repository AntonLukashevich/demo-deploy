import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditorService} from "../../editor.service";
import {ThemeService} from "../../../shared/services/settings/theme.service";
import {GENRES, ITEMS_LIST} from "../../../shared/mock-genres";


@Component({
  selector: 'app-create-lyrics-text',
  templateUrl: './create-lyrics-text.component.html',
  styleUrls: ['./../editor.scss']
})
export class CreateLyricsTextComponent implements OnInit {
  public textForm: FormGroup = new FormGroup({});
  public genreList = GENRES;
  public itemNameList = ITEMS_LIST;
  public theme: string | undefined;

  constructor( private editorService: EditorService,
               private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe( theme => this.theme = theme);
    this.textForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      tonality:new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required),
      tags:  new FormControl(null, Validators.required),
      items: new FormArray([
        new FormGroup({
          name: new FormControl(null, Validators.required),
          iText: new FormControl(null, Validators.required)
        })
      ])
    })
  }

  public selectLyricsText(){
    console.log(this.textForm.value);
    this.editorService.selectLyricsText(this.textForm.value);
  }

  public addItemControl() {
    (this.textForm.get('items') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        iText: new FormControl(null, Validators.required)
        }
      )
    )
  }

  public removeItemControl(index: number){
    (this.textForm.get('items') as FormArray).controls.splice(index, 1);
  }

  public getItems(): any{
    return (this.textForm.get('items') as FormArray).controls;
  }
}

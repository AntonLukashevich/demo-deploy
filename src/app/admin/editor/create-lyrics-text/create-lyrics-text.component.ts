import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditorService} from "../../editor.service";
import {ThemeService} from "../../../shared/services/settings/theme.service";

@Component({
  selector: 'app-create-lyrics-text',
  templateUrl: './create-lyrics-text.component.html',
  styleUrls: ['./../editor.scss']
})
export class CreateLyricsTextComponent implements OnInit {
  textForm: FormGroup = new FormGroup({});
  genreList: string[];
  itemNameList: string[];
  theme: string | undefined;

  constructor( private editorService: EditorService,
               private themeService: ThemeService) {
    this.genreList = editorService.genreList;
    this.itemNameList = editorService.itemNameList;
  }

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

  selectLyricsText(){
    this.editorService.selectLyricsText(this.textForm.value);
  }

  addItemControl() {
    (this.textForm.get('items') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        iText: new FormControl(null, Validators.required)
        }
      )
    )
  }

  removeItemControl(index: number){
    (this.textForm.get('items') as FormArray).controls.splice(index, 1);
  }

  getItems(): any{
    return (this.textForm.get('items') as FormArray).controls;
  }
}

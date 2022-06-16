import {Component, EventEmitter, Output} from "@angular/core";
import {GENRES} from "../../mock-genres";

@Component({
  selector: 'app-search-home',
  templateUrl: './searchForm.component.html',
  styleUrls: ['./searchForm.component.scss']
})
export class SearchFormComponent{
  @Output() changeSearch = new EventEmitter<string>();
  @Output() changeTagFilter = new EventEmitter<string[]>();
  search: string = '';
  public tagFilter: string[] = [];
  public genreList = GENRES;

  getSearch(searchValue: string | any): void{
    this.changeSearch.emit(searchValue.value);
  }

  getTags(tagValue: string | any): void{
    this.changeTagFilter.emit(this.tagFilter);
  }
}

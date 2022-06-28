import {ComponentFixture, TestBed} from "@angular/core/testing";
import {SearchFormComponent} from "./searchForm.component";
import {MatMenuModule} from "@angular/material/menu";


describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [SearchFormComponent]
    })
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should #getSearch', () => {
    spyOn(component.changeSearch, 'emit');
    component.getSearch('qwe');
    expect(component.changeSearch.emit).toHaveBeenCalled();
  })

  it('should #getTags', () => {
    spyOn(component.changeTagFilter, 'emit');
    component.getTags([]);
    expect(component.changeTagFilter.emit).toHaveBeenCalled();
  })
})

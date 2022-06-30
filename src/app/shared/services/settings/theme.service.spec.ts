import {ThemeService} from "./theme.service";
import {TestBed} from "@angular/core/testing";

describe('ThemeService', () => {
  let service: ThemeService;
  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return #currentTheme', () =>{
    service.setCurrentTheme('dark');
    expect(service.getCurrentTheme().value).toBe('dark');
  })
})

import {LyricsService} from "../lyrics.service";
import {TestBed} from "@angular/core/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {NotificationService} from "./notification.service";
import {CommonModule} from "@angular/common";

describe('NotificationService', () => {
  let service: NotificationService;
  let toastrService: jasmine.SpyObj<ToastrService>

  beforeEach( () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService',
      ['error', 'success', 'info', 'warning']);
    TestBed.configureTestingModule({
      imports: [CommonModule, ToastrModule.forRoot()],
      providers: [
        NotificationService,
        {provide: ToastrService, useValue: toastrService}]
    });
    service = TestBed.inject(NotificationService);
    // @ts-ignore
    toastrService = TestBed.inject(ToastrService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test "showSuccess" method', () => {
    service.showSuccess('hello world', 'hello');
    expect(toastrService.success).toHaveBeenCalledWith('hello world', 'hello');
  });

  it('should test "showError" method', () => {
    service.showError('hello world', 'hello');
    expect(toastrService.error).toHaveBeenCalledWith('hello world', 'hello');
  });

  it('should test "showInfo" method', () => {
    service.showInfo('hello world', 'hello');
    expect(toastrService.info).toHaveBeenCalledWith('hello world', 'hello');
  });

  it('should test "showInfo" method', () => {
    service.showWarning('hello world', 'hello');
    expect(toastrService.warning).toHaveBeenCalledWith('hello world', 'hello');
  });

})

import {SettingsPanelComponent} from "./settings-panel.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {NotificationService} from "../../../shared/services/notification/notification.service";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

describe('SettingsPanelComponent', () => {
  let component: SettingsPanelComponent;
  let fixture: ComponentFixture<SettingsPanelComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [SettingsPanelComponent],
      providers: [
        {provide: NotificationService, useValue: {
          showInfo:  () => {}
          }},
        {provide: Router, useValue: {
          navigate: () => {}
          }},
        {provide: AuthService,
          useValue: {
            logout: () => {},
            getAuthTokenExp: () => {}
          }},
      ]
    })
    fixture = TestBed.createComponent(SettingsPanelComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'preventDefault');
    component.logout(event);
    expect(event.preventDefault).toHaveBeenCalled();
  })

  it( 'should set #endSession after called OnInit', fakeAsync ( () => {
    component.ngOnInit();
    tick();
    expect(component.endSession).not.toBeUndefined();
  }))
})

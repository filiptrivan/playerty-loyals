
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, KeyValueDiffers } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from 'src/app/business/services/api/api.service';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { UserDetailsComponent } from './user-details.component';
import { MessageService } from 'primeng/api';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      params: of({ id: 1 })
    };

    await TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        KeyValueDiffers,
        ChangeDetectorRef,
        SoftMessageService,
        MessageService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: ApiService, useValue: mockApiService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to route params and fetch user if id is greater than 0', () => {
      const userResponse = { id: 1, name: 'John Doe' };
      mockApiService.getUser.and.returnValue(of(userResponse));

      component.ngOnInit();

      expect(component.modelId).toBe(1);
      expect(mockApiService.getUser).toHaveBeenCalledWith(1);
    });

    it('should initialize with a new User if id is not greater than 0', () => {
      mockActivatedRoute.params = of({ id: 0 });

      component.ngOnInit();

      expect(component.modelId).toBe(0);
    });
  });

});
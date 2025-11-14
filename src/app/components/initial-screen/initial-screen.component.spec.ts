import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialScreenComponent } from './initial-screen.component';
import { GameSyncService } from '../../services/game-sync/game-sync.service';

describe('InitialScreenComponent', () => {
  let component: InitialScreenComponent;
  let fixture: ComponentFixture<InitialScreenComponent>;
  let mockSyncSvc: jasmine.SpyObj<GameSyncService>;

  beforeEach(async () => {
    mockSyncSvc = jasmine.createSpyObj('GameSyncService', ['sendSessionData']);
    await TestBed.configureTestingModule({
      imports: [InitialScreenComponent],
      providers: [
        {
          provide: GameSyncService,
          useValue: mockSyncSvc,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InitialScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

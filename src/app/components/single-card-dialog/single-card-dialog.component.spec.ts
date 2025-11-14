import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardDialogComponent } from './single-card-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameSyncService } from '../../services/game-sync/game-sync.service';
import { SessionIdentityService } from '../../services/session-identity/session-identity.service';
import { PlayerEnum } from '../../models/enums';
import { mockData, mockPlayer } from '../../models/mocks/mocks';

describe('SingleCardDialogComponent', () => {
  let component: SingleCardDialogComponent;
  let fixture: ComponentFixture<SingleCardDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<SingleCardDialogComponent>>;
  let mockGameSyncSvc: jasmine.SpyObj<GameSyncService>;
  let mockSessionIdentitySvc: jasmine.SpyObj<SessionIdentityService>;

  let mockDialogData = { data: mockData, player: mockPlayer };

  let mockSession = { sessionId: 'testId', player: PlayerEnum.Player1 };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockGameSyncSvc = jasmine.createSpyObj('GameSyncService', ['playCard']);
    mockSessionIdentitySvc = jasmine.createSpyObj('SessionIdentityService', [
      'get',
    ]);
    mockSessionIdentitySvc.get.and.returnValue(mockSession);

    mockDialogData;
    await TestBed.configureTestingModule({
      imports: [SingleCardDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: GameSyncService, useValue: mockGameSyncSvc },
        { provide: SessionIdentityService, useValue: mockSessionIdentitySvc },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

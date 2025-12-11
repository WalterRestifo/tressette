import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardDialogComponent } from './single-card-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameSyncService } from '../../services/game-sync/game-sync.service';
import { SessionIdentityService } from '../../services/session-identity/session-identity.service';
import { PlayerEnum } from '../../models/enums';
import {
  mockCard,
  mockPlayer,
  mockSessionData,
} from '../../models/mocks/mocks';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('SingleCardDialogComponent', () => {
  let component: SingleCardDialogComponent;
  let fixture: ComponentFixture<SingleCardDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<SingleCardDialogComponent>>;
  let mockGameSyncSvc: jasmine.SpyObj<GameSyncService>;
  let mockSessionIdentitySvc: jasmine.SpyObj<SessionIdentityService>;
  let loader: HarnessLoader;

  let mockDialogData = { data: mockCard, player: mockPlayer };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockGameSyncSvc = jasmine.createSpyObj('GameSyncService', ['playCard']);
    mockSessionIdentitySvc = jasmine.createSpyObj('SessionIdentityService', [
      'get',
    ]);
    mockSessionIdentitySvc.get.and.returnValue(mockSessionData);

    mockDialogData;
    await TestBed.configureTestingModule({
      imports: [SingleCardDialogComponent, TranslateModule.forRoot()],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: GameSyncService, useValue: mockGameSyncSvc },
        { provide: SessionIdentityService, useValue: mockSessionIdentitySvc },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleCardDialogComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the correct data', async () => {
    const playBtn = await loader.getHarness(
      MatButtonHarness.with({ text: 'singleCardDialog.playCard' })
    );

    await playBtn.click();
    expect(mockGameSyncSvc.playCard).toHaveBeenCalledOnceWith(
      mockDialogData.data,
      mockDialogData.player,
      mockSessionIdentitySvc.get()
    );
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});

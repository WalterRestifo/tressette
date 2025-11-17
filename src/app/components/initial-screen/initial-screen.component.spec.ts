import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialScreenComponent } from './initial-screen.component';
import { GameSyncService } from '../../services/game-sync/game-sync.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatRadioGroupHarness } from '@angular/material/radio/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { PlayerEnum, SessionTypeEnum } from '../../models/enums';

describe('InitialScreenComponent', () => {
  let component: InitialScreenComponent;
  let fixture: ComponentFixture<InitialScreenComponent>;
  let mockSyncSvc: jasmine.SpyObj<GameSyncService>;
  let loader: HarnessLoader;

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
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit correctly when creating a new game', async () => {
    const newSessionId = 'testNewSession';
    const radioGroup = await loader.getHarness(MatRadioGroupHarness);
    await radioGroup.checkRadioButton({ selector: '#new-game' });
    fixture.detectChanges();
    await fixture.whenStable();
    const newSessionTextField = await loader.getHarness(
      MatInputHarness.with({ selector: '#new-session-input' })
    );
    await newSessionTextField.setValue(newSessionId);
    const submitButton = await loader.getHarness(MatButtonHarness);
    await submitButton.click();

    expect(mockSyncSvc.sendSessionData).toHaveBeenCalledWith({
      sessionId: newSessionId,
      sessionType: SessionTypeEnum.New,
      player: PlayerEnum.Player1,
    });
  });

  it('should submit correctly when joining an existing game', async () => {
    const existingSessionId = 'testExistingSession';
    const radioGroup = await loader.getHarness(MatRadioGroupHarness);
    await radioGroup.checkRadioButton({ selector: '#join-game' });
    fixture.detectChanges();
    await fixture.whenStable();
    const joinSessionTextField = await loader.getHarness(
      MatInputHarness.with({ selector: '#join-session-input' })
    );
    await joinSessionTextField.setValue(existingSessionId);
    const submitButton = await loader.getHarness(MatButtonHarness);
    await submitButton.click();

    expect(mockSyncSvc.sendSessionData).toHaveBeenCalledWith({
      sessionId: existingSessionId,
      sessionType: SessionTypeEnum.Join,
      player: PlayerEnum.Player2,
    });
  });
});

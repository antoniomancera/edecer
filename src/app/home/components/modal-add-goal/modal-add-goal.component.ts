import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { TranslocoService } from '@jsverse/transloco';

import { HomeService } from '../../services/home.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Goal } from '../../models/goal.interface';

@Component({
  selector: 'app-modal-add-goal',
  templateUrl: './modal-add-goal.component.html',
})
export class ModalAddGoalComponent implements OnInit {
  @Input() goal: Goal;

  addGoalForm!: FormGroup;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService,
    private toastService: ToastService,
    private translocoService: TranslocoService
  ) {
    this.addGoalForm = new FormGroup({
      attempts: new FormControl(null, [Validators.required]),
      successesAccuracy: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.goal != null) {
      if (this.goal.attempts != null) {
        this.addGoalForm.controls.attempts.setValue(this.goal.attempts);
      }
      if (this.goal.successesAccuracy != null) {
        this.addGoalForm.controls.successesAccuracy.setValue(
          this.goal.successesAccuracy
        );
      }
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null);
  }

  createGoal() {
    this.isLoading = true;
    this.homeService.createGoal(this.addGoalForm.getRawValue()).subscribe({
      next: (goal) => {
        this.isLoading = false;
        this.toastService.showSuccessToast(
          this.translocoService.translate('home.add-goal-modal.goal-created', {
            attempts: goal.attempts,
            accuracy: goal.successesAccuracy,
          })
        ),
          this.cancel();
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.showDangerToast(err.error.message);
      },
    });
  }
}

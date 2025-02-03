import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { HomeService } from '../../services/home.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Goal } from '../../models/goal.interface';

@Component({
  selector: 'app-modal-add-goal',
  templateUrl: './modal-add-goal.component.html',
})
export class ModalAddGoalComponent implements OnInit {
  addGoalForm!: FormGroup;
  goal: Goal;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.addGoalForm = new FormGroup({
      attempts: new FormControl(null, [Validators.required]),
      successesAccuracy: new FormControl(null, [Validators.required]),
    });
    this;

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
        this.toastService.showSuccessToast(`objetivo ${goal} creado`),
          this.cancel();
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.showDangerToast(err.error.message);
      },
    });
  }
}

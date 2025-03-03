import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IonModal } from '@ionic/angular';

import { TranslocoService } from '@jsverse/transloco';
import { UserInfo } from 'src/app/home/models/user-info.interface';
import { UserRequest } from 'src/app/home/models/user-request.interface';
import { MenuService } from 'src/app/home/services/menu.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
})
export class ContactModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  @Input() userInfo: UserInfo;

  contactForm!: FormGroup;
  isLoading = false;
  customCharactersRemaining = '';

  constructor(
    private menuService: MenuService,
    private translocoService: TranslocoService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.translocoService
      .selectTranslate('global.characters-remaining')
      .subscribe((translation) => {
        this.customCharactersRemaining = translation;
      });

    this.contactForm = new FormGroup({
      subject: new FormControl<string>(null, [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
      message: new FormControl<string>(null, [
        Validators.required,
        this.noWhitespaceValidator,
      ]),
    });
  }

  noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }

  closeModal() {
    this.modal.dismiss(null);
  }

  addUserRequest() {
    let userRequest: UserRequest = this.contactForm.getRawValue();
    userRequest.email = this.userInfo.email;
    if (this.contactForm.valid) {
      this.menuService.addUserRequest(userRequest).subscribe({
        next: (userRequest) => {
          this.toastService.showSuccessToast(
            this.translocoService.translate('menu.contact.user-request-created')
          );
          console.log(userRequest);
          this.closeModal();
        },
        error: (err) => {
          if (err.error.errorCode === 'USER_REQUEST_LAST_WEEK_NOT_ANSWERED') {
            this.toastService.showDangerToast(
              this.translocoService.translate(
                'menu.contact.user-request-last-week-not-answered'
              )
            );
          } else {
            this.toastService.showDangerToast(
              this.translocoService.translate('global.unknown-error')
            );
          }
        },
      });
    }
  }

  customCharactersRemainingFormatter = (
    inputLength: number,
    maxLength: number
  ) => {
    return `${maxLength - inputLength} ` + this.customCharactersRemaining;
  };
}

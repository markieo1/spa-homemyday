import { Injectable } from '@angular/core';
import swal, { SweetAlertInputType, SweetAlertOptions } from 'sweetalert2';

@Injectable()
export class AlertService {
  /**
    * Displays a confirmation message to the user
    */
  showConfirm() {
    return swal({
      title: 'Are you sure?',
      text: 'You will not be able to undo this action!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }

  /**
    * Displays a approveing message to the admin
    */
  showApprove() {
    return swal({
      title: 'Are you sure?',
      text: 'Please enter a reason!',
      type: 'question',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      // validator is optional
      inputValidator: function (result) {
        return new Promise(function (resolve, reject) {
          if (result) {
            resolve();
          } else {
            swal('Cancelled',
              'Please enter a reason!',
              'warning');
          }
        });
      }
    }).then((result) => {
      if (result.value) {
        return result.value;
      } else {
        return false;
      }
    });
  }

  /**
    * Displays a succesfull message to the user
    * @param text The text of the success message
    */
  showSuccess(text: string) {
    return swal({
      title: 'Succesfull',
      text,
      type: 'success'
    });
  }

  /**
    * Displays a failed message to the user
    * @param text The text of the error message
    */
  showError(text: string) {
    return swal({
      title: 'Error',
      text,
      type: 'error'
    });
  }

  /**
   * Shows an input alert
   * @param title The title of the alert
   * @param text The text of the alert
   * @param inputType The input type of the alert
   */
  showInputAlert(title: string, text: string, inputType: SweetAlertInputType) {
    return swal({
      title: title,
      text: text,
      type: 'question',
      input: inputType,
      showCancelButton: true,
      inputValidator: function (result) {
        return new Promise(function (resolve, reject) {
          if (result) {
            resolve();
          } else {
            reject();
          }
        });
      }
    }).then((result) => {
      return new Promise(function (resolve, reject) {
        if (result.value) {
          resolve(result.value);
        } else {
          reject();
        }
      });
    });
  }

  /**
   * Determines if the swal is shown
   */
  isShown() {
    return swal.isVisible();
  }
}

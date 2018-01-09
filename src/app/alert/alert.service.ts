import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

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
     * Displays a succesfull message to the user
     * @param text The text of the success message
     */
    showSuccess(text: string) {
        return swal({
            title: 'Succesfull',
            text: `${text}`,
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
            text: `${text}`,
            type: 'error'
        });
    }
}

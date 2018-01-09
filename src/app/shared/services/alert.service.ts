import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class AlertService {
    confirmAlert() {
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

    showSuccessAlert(title: string, text: string) {
        return swal({
            title: `${title}`,
            text: `${text}`,
            type: 'success'
        });
    }

    showErrorAlert(title: string, text: string) {
        return swal({
            title: `${title}`,
            text: `${text}`,
            type: 'error'
        });
    }
}

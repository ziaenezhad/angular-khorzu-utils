import { Dialog } from '.';

export abstract class FormDialog extends Dialog {
	private errors_inputs: {} = {};
	protected form: ng.IFormController;

	protected validate() {
		this.form.$setSubmitted();
		if (this.form.$valid) {
			return true;
		} else {
			angular.element('.ng-invalid').first().focus();
			return false;
		}
	}

	protected bindError(error: string | number, inputName: string) {
		this.errors_inputs[error] = inputName;
	}

	protected assignInputsToMessages(messages?: {}) {
		messages = messages ? messages : {};
		Object.keys(this.errors_inputs).forEach(value => {
			messages[value] = this.form[this.errors_inputs[value]]
		});
		return messages;
	}
}
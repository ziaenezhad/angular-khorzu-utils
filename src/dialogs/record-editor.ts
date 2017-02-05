import { Resource, Model, IModelClass } from '../';
import { Dialog } from '.';

export abstract class RecordEditor<M extends Model, R extends Resource> extends Dialog {
	static locals: any = {
		readOnly: false,
		entity: null
	};
	private errors_inputs: {} = {};
	protected form: ng.IFormController;
	protected createMod: boolean;

	constructor(
		protected $mdDialog: ng.material.IDialogService,
		protected resource: R,
		protected model: IModelClass,
		protected entity: M
	) {
		super($mdDialog);
		this.createMod = !(entity && entity.$$id);
		this.entity = this.entity ? this.entity : <any>{};
	}

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

	protected save(messages?: {}): ng.IPromise<M> {
		if (this.validate()) {
			messages = messages ? messages : {};
			Object.keys(this.errors_inputs).forEach(value => {
				messages[value] = this.form[this.errors_inputs[value]]
			});
			return (
				this.createMod ?
					this.model.create<M>(this.resource, this.entity, messages) :
					this.entity.save(messages)
			).then(record => {
				this.$mdDialog.hide(record);
				return record;
			});
		}
	}
}
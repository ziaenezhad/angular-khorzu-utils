import { Resource, Model, IModelClass } from '../../';
import { FormDialog } from '.';

export abstract class RecordEditor<M extends Model<any>, R extends Resource> extends FormDialog {
	static locals: any = {
		readOnly: false,
		entity: null
	};
	protected createMod: boolean;

	constructor($mdDialog,
		protected resource: R,
		protected model: IModelClass,
		protected entity: M
	) {
		super($mdDialog);
		this.createMod = !(entity && entity.$$id);
		this.entity = this.entity ? this.entity : <any>{};
	}

	protected save(messages?: {}, thenClose: boolean = true): ng.IPromise<M> {
		if (this.validate()) {
			messages = this.assignInputsToMessages(messages);
			this.entity.$$processing = true;
			return (
				this.createMod ?
					this.model.create<M>(this.resource, this.entity, messages) :
					this.entity.save(messages)
			).then(record => {
				thenClose && this.$mdDialog.hide(record);
				this.entity.$$processing = false;
				return record;
			});
		}
	}
}
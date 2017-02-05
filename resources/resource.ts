/// <reference path="../../../typings/index.d.ts" />

import { Model, IModelClass } from './model';


export abstract class Resource {
	protected messages = {};

	constructor(
		public $mdToast: ng.material.IToastService,
		public $q: ng.IQService
	) {
	}

	protected resolveMessage(key: string, overalMessages: {} = {}) {
		return overalMessages.hasOwnProperty(key) ? overalMessages[key] : this.messages[key];
	}

	public showMessage(message: string, css_class: string = '', delay: number = 2000) {
		if (angular.isDefined(message)) {
			setTimeout(() => this.$mdToast.show({
				template: '<md-toast class="' + css_class + '"><span flex>' + message + '</span></md-toast>',
				position: 'top left',
				hideDelay: delay
			}), 500);
		}
	}

	public showSuccessMessage(message: string, delay?: number) {
		this.showMessage(message, 'success', delay);
		message && console.info(message);
	}
	public showErrorMessage(message: string, delay?: number) {
		this.showMessage(message, 'error', delay);
		message && console.warn(message);
	}

	/*protected $$newModel(model: IModelClass, data: Model) {
		var record = new (<any>model)(this);
		angular.extend(record, data);
		return record;
	}*/

	//C
	public create<T>(query: string, newRecord: {}, messages?: {}): ng.IPromise<T> {
		return null;
	}
	//R
	public read<T>(query: string, params: {}, messages?: {}): ng.IPromise<T> {
		return null;
	}
	//U
	public update<T>(query: string, record: {}, messages?: {}): ng.IPromise<T> {
		return null;
	}
	//D
	public delete(query: string, messages?: {}): ng.IPromise<void> {
		return null;
	}
	//Action
	public action<T>(query: string, params: {}, messages?: {}): ng.IPromise<T> {
		return null;
	}
}
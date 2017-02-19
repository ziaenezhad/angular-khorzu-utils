export abstract class Dialog {
	static controllerAs = 'vm';
	static parent = angular.element(document.body);
	static clickOutsideToClose = false;
	static fullscreen = false;
	static locals: any = {};

	constructor(
		protected $mdDialog: ng.material.IDialogService
	) { }

	protected cancel() {
		this.$mdDialog.cancel();
	}
}

export * from './form-dialog';
export * from './record-editor';
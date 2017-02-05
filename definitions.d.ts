declare namespace objang{
	interface IObject{
		module: ng.IModule;	
	}
	interface IModule extends IObject{
		name: string;
		services:any[];
		directives:any[];
		dependencies:any[];
		run(...args);
		config(...args);
	}

	interface IMultiStateModule extends IModule{
		states:any[];
	}

	interface IComponent extends IObject{
		$services:any;
		template:string;
		templateUrl:string;
		controllerAs:string;
		controller(...arg);	
	}

	interface IDirective extends IComponent{
		name: string;
	    scope: any;
	    restrict: string;
	}

	interface IState extends IComponent{
		url:string;
		abstract:boolean;
		resolve:any;
	}
}
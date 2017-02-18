import { name } from '../utils';

export function initializeModule(module_name: string, target, element: Document | Element): ng.IModule {
	target._name = module_name;
	var module = angular.module(module_name, target.dependencies ? target.dependencies.map(dependency => {
		return angular.isString(dependency) ? dependency : name(dependency);
	}) : []);
	target.config && module.config(target.config);
	target.run && module.run(target.run);
	target.services && target.services.forEach(service => {
		module.service(name(service), service);
	});
	target.directives && target.directives.forEach(directive => {
		directive.config.controller = directive;
		module.directive(name(directive), () => directive.config);
	});
	var instance = new target(module);
	return module;
}

export function Module(name: string, element?: Document | Element) {
	return (target: any) => {
		var module = initializeModule(name, target, element);
	}
}


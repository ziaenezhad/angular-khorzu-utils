import { initializeModule } from './module';

export function MultiStateModule(module_name: string, element?: Document | Element) {
	return (target: any) => {
		var module = initializeModule(module_name, target, element);
		module.config(function($stateProvider) {
			angular.forEach(target.states, state => {
				state.config.controller = state;
				$stateProvider.state(state.config);
			});
		});
	}
}
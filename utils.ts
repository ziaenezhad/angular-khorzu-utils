export function name(object: any): string {
	var object = angular.isFunction(object) ? (object.config && object.config.name ? object.config : object) : object.constructor;
	var name: string = object._name ? object._name : object.name;
	return name.charAt(0).toLowerCase() + name.slice(1);
}

export function Name(value) {
	return function(target) {
		target._name = value;
	};
}
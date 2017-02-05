import { Resource } from './resource';
import { Model, IModelClass } from './model';

export abstract class HttpErrorEvent extends CustomEvent {
	error: {
		status: string,
		message: string
	};
}

export abstract class HttpResource extends Resource {
	constructor(
		protected api_url: string,
		$mdToast,
		$q,
		protected $http: ng.IHttpService
	) {
		super($mdToast, $q);
		angular.extend(this.messages, {
			//successes
			200: 'درخواست شما انجام شد.',
			201: 'درخواست ایجاد انجام شد.',
			//errors
			'-1': 'متاسفانه تلاش برای اتصال به سرور موفقیت آمیز نبود !',
			422: 'لطفا اطلاعات درخواست شده را به صورت صحیح وارد کنید.',
			401: 'دسترسی شما به این قسمت مورد تایید نمی باشد.',
			500: 'متاسفانه سرور دچار اشکال شده !',
		});
	}

	private injectErrorToInput(input: ng.INgModelController, status: string) {
		input.$setValidity(status, false);
		input.$viewChangeListeners.push(() => {
			input.$viewChangeListeners.pop();
			input.$setValidity(status, true);
		});
		angular.element('.ng-invalid').first().focus();
	}

	protected dispatchHttpErrorEvent(status: string, message: string) {
		document.dispatchEvent(new CustomEvent('http-error', <any>{
			error: { status: status, message: message }
		}));
	}

	private handleResponce<T>(responce: ng.IHttpPromiseCallbackArg<{}>, defer: ng.IDeferred<T>, messages?: {}) {
		var status = responce.status.toString();
		var message = this.resolveMessage(status, messages);
		if (/2\d+/.test(status)) {
			this.showSuccessMessage(message);
			defer.resolve(<T>responce.data);
		} else {
			this.dispatchHttpErrorEvent(status, message);
			if (angular.isObject(message)) {
				this.injectErrorToInput(message, status);
			} else {
				this.showErrorMessage(message ? message : 'خطای ' + status);
			}
			defer.reject();
		}
	}

	protected request<T>(query: string, method: string = 'GET', data?, messages?: {}, headers = {}): ng.IPromise<T> {
		if (angular.isObject(data)) {
			data.$$processing = true;
		}
		var defer = this.$q.defer<T>();
		var options = {
			method: method,
			data: data,
			url: [
				this.api_url,
				query
			].join('/'),
			headers: angular.extend({
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}, headers),
			uploadEventHandlers: {
				progress: (e: ProgressEvent) => {
					defer.notify(e.loaded * 100 / e.total);
				}
			}
		};
		this.$http(options).then((responce: ng.IHttpPromiseCallbackArg<{}>) => {
			this.handleResponce(responce, defer, messages);
		}, (responce: ng.IHttpPromiseCallbackArg<{}>) => {
			this.handleResponce(responce, defer, messages);
		}).finally(() => {
			if (angular.isObject(data)) {
				delete data.$$processing;
			}
		});
		return defer.promise;
	}

	public $get<T>(query: string, data?: {}, messages?: {}) {
		return this.request<T>(query, 'GET', data, messages);
	}

	public $post<T>(query: string, data: {}, messages?: {}) {
		var data_contains_file = Object.keys(data).filter(key => {
			return angular.isObject(data[key]) && data[key].constructor.name == 'File';
		}).length > 0;
		return data_contains_file ?
			this.$upload<T>(query, data, messages) :
			this.request<T>(query, 'POST', data, messages);
	}

	public $upload<T>(query: string, data: {}, messages?: {}) {
		var formData = new FormData();
		Object.keys(data).forEach(key => {
			formData.append(key, data[key]);
		})
		return this.request<T>(query, 'POST', formData, messages, {
			'Content-Type': undefined
		});
	}

	public $put<T>(query: string, data: {}, messages?: {}) {
		return this.request<T>(query, 'PUT', data, messages);
	}

	public $delete<T>(query: string, data?: {}, messages?: {}) {
		return this.request<T>(query, 'DELETE', data, messages);
	}
	//Action
	public action<T>(query: string, params: {}, messages?: {}): ng.IPromise<T> {
		return this.$post(query, params, messages);
	}
}
import { RestfullResource } from './restfull-resource';
import { Model, IModelClass } from './model';

export abstract class JwtRestfullResource extends RestfullResource {
	constructor(api_url, $mdToast, $q, $http,
		protected storage: ng.localStorage.ILocalStorageService,
		protected jwtHelper: ng.jwt.IJwtHelper
	) {
		super(api_url, $mdToast, $q, $http);
	}

	public get token(): string {
		return this.storage.get('token');
	}

	public set token(value: string) {
		this.storage.set('token', value);
	}

	public get tokenPayload(): any {
		return this.jwtHelper.decodeToken(this.token);
	}

	public currentUser<T extends Model>(model: IModelClass): T {
		var payload = this.tokenPayload.data4j;
		return payload ? new (<any>model)(this, { username: angular.fromJson(payload).username }) : null;
	}

	protected request(route: string, method: string = 'GET', data?, messages?: {}, headers?: {}) {
		return super.request(route, method, data, messages, angular.extend({
			'Authorization': this.token
		}, headers));
	}
}
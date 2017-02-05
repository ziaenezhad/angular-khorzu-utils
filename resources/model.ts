import { Resource } from './resource';

export interface IModelClass {
	resourceName: string;
	primaryKey: string;

	queryPath(routes: (string | number)[]): string;
	get<M extends Model<Resource>>(resource: Resource, id: string | number, messages?: {}): ng.IPromise<M>;
	all<M extends Model<Resource>>(resource: Resource, messages?: {}): ng.IPromise<M[]>;
	create<M extends Model<Resource>>(resource: Resource, newRecord: M, messages?: {}): ng.IPromise<M>;
}

export abstract class Model<R extends Resource> {
	public static resourceName: string;
	public static primaryKey: string = 'id';
	public $$processing: boolean;

	public static queryPath(routes: (string | number)[] = []): string {
		return [<string | number>this.resourceName].concat(routes).join('/');
	}

	public static get<M extends Model<Resource>>(resource: Resource, id: string | number, messages?: {}): ng.IPromise<M> {
		return resource.read(this.queryPath([id]), null, messages).then(response => {
			return new (<any>this)(resource, response);
		});
	}

	public static all<M extends Model<Resource>>(resource: Resource, messages?: {}): ng.IPromise<M[]> {
		return resource.read(this.resourceName, null, messages).then((response: M[]) => {
			return response.map(record => new (<any>this)(resource, record));
		});
	}

	public static create<M extends Model<Resource>>(resource: Resource, newRecord: M, messages?: {}): ng.IPromise<M> {
		return resource.create(this.resourceName, newRecord, messages).then(response => {
			return new (<any>this)(resource, response);
		});
	}

	constructor(
		protected $$resource: R,
		record: Model<R>
	) {
		angular.extend(this, record);
	}

	protected get $$class() {
		return (<IModelClass><any>this.constructor);
	}

	public get $$id(): string | number {
		return this[this.$$class.primaryKey];
	}

	public $$queryPath(routes: string[] = []): string {
		return this.$$class.queryPath([this.$$id].concat(routes));
	}

	protected belongsTo<M>(modelClass: IModelClass, foreignKey: string, messages?: {}): ng.IPromise<M> {
		return this.$$resource.read(modelClass.queryPath([this[foreignKey]]), null, messages).then(responce => {
			return new (<any>modelClass)(this.$$resource, responce);
		});
	}

	protected hasOne<M>(modelClass: IModelClass, messages?: {}): ng.IPromise<M> {
		return this.$$resource.read(this.$$queryPath([modelClass.resourceName]), null, messages).then(responce => {
			return new (<any>modelClass)(this.$$resource, responce);
		});
	}

	protected hasMany<M>(modelClass: IModelClass, messages?: {}): ng.IPromise<M[]> {
		return this.$$resource.read<M[]>(this.$$queryPath([modelClass.resourceName]), null, messages).then(responce => {
			return responce.map(record => new (<any>modelClass)(this.$$resource, record));
		});
	}

	public save(messages?: {}) {
		return <any>this.$$resource.update(this.$$queryPath(), this, messages);
	}

	public delete(messages?: {}) {
		this.$$processing = true;
		return this.$$resource.delete(this.$$queryPath(), messages).finally(() => {
			this.$$processing = false;
		});
	}
}
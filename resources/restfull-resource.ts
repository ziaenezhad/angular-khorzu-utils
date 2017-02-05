import { HttpResource } from './http-resource';
import { Model, IModelClass } from './model';

export abstract class RestfullResource extends HttpResource {
	/**
	 * CRUD
	 */
	public read<T>(query: string, params: {}, messages?: {}) {
		return this.$get<T>(query, params, messages);
	}

	public create<T>(query: string, newRecord: { $$processing }, messages?: {}) {
		var defer = this.$q.defer<T>();
		var created = false;
		this.$post(query, newRecord, angular.extend({}, messages, { 201: undefined })).then(id => {
			created = true;
			this.read([query, id].join('/'), null, { 200: messages && messages['201'] ? messages['201'] : this.messages['201'] }).then(
				defer.resolve.bind(defer),
				defer.reject.bind(defer)
			).finally(() => {
				newRecord.$$processing = false;
			});
		}, defer.reject.bind(defer), defer.notify.bind(defer)).finally(() => {
			newRecord.$$processing = created;
		});
		return defer.promise;
	}

	public update<T>(query: string, record: { $$processing }, messages?: {}) {
		var defer = this.$q.defer<T>();
		var updated = false;
		this.$put(query, record, angular.extend({}, messages, { 200: undefined })).then(() => {
			this.read(query, null, messages).then(
				defer.resolve.bind(defer),
				defer.reject.bind(defer)
			).finally(() => {
				record.$$processing = false;
			});
		}, defer.reject.bind(defer)).finally(() => {
			record.$$processing = updated;
		});
		return defer.promise;
	}

	public delete(query: string, messages?: {}) {
		return this.$delete<void>(query, null, messages);
	}
}
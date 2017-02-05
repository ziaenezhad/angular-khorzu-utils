/** @ngInject */
export abstract class LocalResource {
  private name;
  constructor(
    protected $rootScope,
    protected $q,
    protected uuid,
    protected khorzu
  ) { }

  protected addEntity(entity, type, message?) {
    this.$rootScope.user[type].push(this.initEntity(entity, message));
    return entity;
  }

  protected initEntity(entity, message?) {
    entity.id = this.uuid.v4();
    entity.created_at = this.now();
    entity.updated_at = this.now();
    if (message) {
      this.khorzu.toast(message);
    }
    return entity;
  }

  protected babakizeEntity(entity) {
    //return _.omit(entity, 'id', 'created_at', 'updated_at');
    return _.pick(entity, 'host', 'port', 'user', 'pass', 'dbName', 'type', 'tableName');
  }

  protected removeEntity(entity, type) {
    this.$rootScope.user[type].splice(_.findIndex(this.$rootScope.user[type], function(item) { return item.id == entity.id; }), 1);
  }

  protected now() {
    return moment().format('jD jMMMM jYYYY ساعت HH:mm:ss');
  }
}
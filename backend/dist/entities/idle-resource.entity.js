"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdleResource = exports.ResourceSource = exports.IdleResourceStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var IdleResourceStatus;
(function (IdleResourceStatus) {
    IdleResourceStatus["OPEN"] = "Open";
    IdleResourceStatus["IN_PROGRESS"] = "In Progress";
    IdleResourceStatus["CLOSED"] = "Closed";
})(IdleResourceStatus || (exports.IdleResourceStatus = IdleResourceStatus = {}));
var ResourceSource;
(function (ResourceSource) {
    ResourceSource["INTERNAL"] = "Internal";
    ResourceSource["EXTERNAL"] = "External";
    ResourceSource["REFERRAL"] = "Referral";
})(ResourceSource || (exports.ResourceSource = ResourceSource = {}));
let IdleResource = class IdleResource {
};
exports.IdleResource = IdleResource;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IdleResource.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], IdleResource.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], IdleResource.prototype, "employeeName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], IdleResource.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], IdleResource.prototype, "idleFromDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: IdleResourceStatus,
        default: IdleResourceStatus.OPEN,
    }),
    __metadata("design:type", String)
], IdleResource.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], IdleResource.prototype, "processNote", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], IdleResource.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], IdleResource.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ResourceSource,
        default: ResourceSource.INTERNAL,
    }),
    __metadata("design:type", String)
], IdleResource.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], IdleResource.prototype, "isUrgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IdleResource.prototype, "cvFilePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IdleResource.prototype, "cvFileName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], IdleResource.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], IdleResource.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'updatedById' }),
    __metadata("design:type", user_entity_1.User)
], IdleResource.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], IdleResource.prototype, "updatedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], IdleResource.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], IdleResource.prototype, "updatedAt", void 0);
exports.IdleResource = IdleResource = __decorate([
    (0, typeorm_1.Entity)('idle_resources')
], IdleResource);
//# sourceMappingURL=idle-resource.entity.js.map
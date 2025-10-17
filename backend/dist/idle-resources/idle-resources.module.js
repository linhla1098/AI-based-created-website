"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdleResourcesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const idle_resources_service_1 = require("./idle-resources.service");
const idle_resources_controller_1 = require("./idle-resources.controller");
const idle_resource_entity_1 = require("../entities/idle-resource.entity");
const user_entity_1 = require("../entities/user.entity");
let IdleResourcesModule = class IdleResourcesModule {
};
exports.IdleResourcesModule = IdleResourcesModule;
exports.IdleResourcesModule = IdleResourcesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([idle_resource_entity_1.IdleResource, user_entity_1.User])],
        controllers: [idle_resources_controller_1.IdleResourcesController],
        providers: [idle_resources_service_1.IdleResourcesService],
    })
], IdleResourcesModule);
//# sourceMappingURL=idle-resources.module.js.map
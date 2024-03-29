"use strict";
/* tslint:disable */
/* eslint-disable */
/**
 * PostgREST API
 * This is a dynamic API generated by PostgREST
 *
 * The version of the OpenAPI document: 7.0.1 (UNKNOWN)
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersPostPreferEnum = exports.UsersPatchPreferEnum = exports.UsersGetPreferEnum = exports.UsersDeletePreferEnum = exports.UsersApi = void 0;
const runtime = __importStar(require("../runtime"));
const models_1 = require("../models");
/**
 *
 */
class UsersApi extends runtime.BaseAPI {
    /**
     */
    usersDeleteRaw(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {};
            if (requestParameters.id !== undefined) {
                queryParameters['id'] = requestParameters.id;
            }
            if (requestParameters.providerId !== undefined) {
                queryParameters['provider_id'] = requestParameters.providerId;
            }
            if (requestParameters.email !== undefined) {
                queryParameters['email'] = requestParameters.email;
            }
            if (requestParameters.firstName !== undefined) {
                queryParameters['first_name'] = requestParameters.firstName;
            }
            if (requestParameters.lastName !== undefined) {
                queryParameters['last_name'] = requestParameters.lastName;
            }
            if (requestParameters.profileImgUrl !== undefined) {
                queryParameters['profile_img_url'] = requestParameters.profileImgUrl;
            }
            if (requestParameters.scannedAt !== undefined) {
                queryParameters['scanned_at'] = requestParameters.scannedAt;
            }
            if (requestParameters.modifiedAt !== undefined) {
                queryParameters['modified_at'] = requestParameters.modifiedAt;
            }
            if (requestParameters.createdAt !== undefined) {
                queryParameters['created_at'] = requestParameters.createdAt;
            }
            const headerParameters = {};
            if (requestParameters.prefer !== undefined && requestParameters.prefer !== null) {
                headerParameters['Prefer'] = String(requestParameters.prefer);
            }
            const response = yield this.request({
                path: `/users`,
                method: 'DELETE',
                headers: headerParameters,
                query: queryParameters,
            });
            return new runtime.VoidApiResponse(response);
        });
    }
    /**
     */
    usersDelete(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersDeleteRaw(requestParameters);
        });
    }
    /**
     */
    usersGetRaw(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {};
            if (requestParameters.id !== undefined) {
                queryParameters['id'] = requestParameters.id;
            }
            if (requestParameters.providerId !== undefined) {
                queryParameters['provider_id'] = requestParameters.providerId;
            }
            if (requestParameters.email !== undefined) {
                queryParameters['email'] = requestParameters.email;
            }
            if (requestParameters.firstName !== undefined) {
                queryParameters['first_name'] = requestParameters.firstName;
            }
            if (requestParameters.lastName !== undefined) {
                queryParameters['last_name'] = requestParameters.lastName;
            }
            if (requestParameters.profileImgUrl !== undefined) {
                queryParameters['profile_img_url'] = requestParameters.profileImgUrl;
            }
            if (requestParameters.scannedAt !== undefined) {
                queryParameters['scanned_at'] = requestParameters.scannedAt;
            }
            if (requestParameters.modifiedAt !== undefined) {
                queryParameters['modified_at'] = requestParameters.modifiedAt;
            }
            if (requestParameters.createdAt !== undefined) {
                queryParameters['created_at'] = requestParameters.createdAt;
            }
            if (requestParameters.select !== undefined) {
                queryParameters['select'] = requestParameters.select;
            }
            if (requestParameters.order !== undefined) {
                queryParameters['order'] = requestParameters.order;
            }
            if (requestParameters.offset !== undefined) {
                queryParameters['offset'] = requestParameters.offset;
            }
            if (requestParameters.limit !== undefined) {
                queryParameters['limit'] = requestParameters.limit;
            }
            const headerParameters = {};
            if (requestParameters.range !== undefined && requestParameters.range !== null) {
                headerParameters['Range'] = String(requestParameters.range);
            }
            if (requestParameters.rangeUnit !== undefined && requestParameters.rangeUnit !== null) {
                headerParameters['Range-Unit'] = String(requestParameters.rangeUnit);
            }
            if (requestParameters.prefer !== undefined && requestParameters.prefer !== null) {
                headerParameters['Prefer'] = String(requestParameters.prefer);
            }
            const response = yield this.request({
                path: `/users`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            });
            return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(models_1.UsersFromJSON));
        });
    }
    /**
     */
    usersGet(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.usersGetRaw(requestParameters);
            return yield response.value();
        });
    }
    /**
     */
    usersPatchRaw(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {};
            if (requestParameters.id !== undefined) {
                queryParameters['id'] = requestParameters.id;
            }
            if (requestParameters.providerId !== undefined) {
                queryParameters['provider_id'] = requestParameters.providerId;
            }
            if (requestParameters.email !== undefined) {
                queryParameters['email'] = requestParameters.email;
            }
            if (requestParameters.firstName !== undefined) {
                queryParameters['first_name'] = requestParameters.firstName;
            }
            if (requestParameters.lastName !== undefined) {
                queryParameters['last_name'] = requestParameters.lastName;
            }
            if (requestParameters.profileImgUrl !== undefined) {
                queryParameters['profile_img_url'] = requestParameters.profileImgUrl;
            }
            if (requestParameters.scannedAt !== undefined) {
                queryParameters['scanned_at'] = requestParameters.scannedAt;
            }
            if (requestParameters.modifiedAt !== undefined) {
                queryParameters['modified_at'] = requestParameters.modifiedAt;
            }
            if (requestParameters.createdAt !== undefined) {
                queryParameters['created_at'] = requestParameters.createdAt;
            }
            const headerParameters = {};
            headerParameters['Content-Type'] = 'application/json';
            if (requestParameters.prefer !== undefined && requestParameters.prefer !== null) {
                headerParameters['Prefer'] = String(requestParameters.prefer);
            }
            const response = yield this.request({
                path: `/users`,
                method: 'PATCH',
                headers: headerParameters,
                query: queryParameters,
                body: models_1.UsersToJSON(requestParameters.users),
            });
            return new runtime.VoidApiResponse(response);
        });
    }
    /**
     */
    usersPatch(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersPatchRaw(requestParameters);
        });
    }
    /**
     */
    usersPostRaw(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {};
            if (requestParameters.select !== undefined) {
                queryParameters['select'] = requestParameters.select;
            }
            const headerParameters = {};
            headerParameters['Content-Type'] = 'application/json';
            if (requestParameters.prefer !== undefined && requestParameters.prefer !== null) {
                headerParameters['Prefer'] = String(requestParameters.prefer);
            }
            const response = yield this.request({
                path: `/users`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: models_1.UsersToJSON(requestParameters.users),
            });
            return new runtime.VoidApiResponse(response);
        });
    }
    /**
     */
    usersPost(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersPostRaw(requestParameters);
        });
    }
}
exports.UsersApi = UsersApi;
/**
    * @export
    * @enum {string}
    */
var UsersDeletePreferEnum;
(function (UsersDeletePreferEnum) {
    UsersDeletePreferEnum["Representation"] = "return=representation";
    UsersDeletePreferEnum["Minimal"] = "return=minimal";
    UsersDeletePreferEnum["None"] = "return=none";
})(UsersDeletePreferEnum = exports.UsersDeletePreferEnum || (exports.UsersDeletePreferEnum = {}));
/**
    * @export
    * @enum {string}
    */
var UsersGetPreferEnum;
(function (UsersGetPreferEnum) {
    UsersGetPreferEnum["Countnone"] = "count=none";
})(UsersGetPreferEnum = exports.UsersGetPreferEnum || (exports.UsersGetPreferEnum = {}));
/**
    * @export
    * @enum {string}
    */
var UsersPatchPreferEnum;
(function (UsersPatchPreferEnum) {
    UsersPatchPreferEnum["Representation"] = "return=representation";
    UsersPatchPreferEnum["Minimal"] = "return=minimal";
    UsersPatchPreferEnum["None"] = "return=none";
})(UsersPatchPreferEnum = exports.UsersPatchPreferEnum || (exports.UsersPatchPreferEnum = {}));
/**
    * @export
    * @enum {string}
    */
var UsersPostPreferEnum;
(function (UsersPostPreferEnum) {
    UsersPostPreferEnum["Representation"] = "return=representation";
    UsersPostPreferEnum["Minimal"] = "return=minimal";
    UsersPostPreferEnum["None"] = "return=none";
})(UsersPostPreferEnum = exports.UsersPostPreferEnum || (exports.UsersPostPreferEnum = {}));

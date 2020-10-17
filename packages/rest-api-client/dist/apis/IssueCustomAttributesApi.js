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
exports.IssueCustomAttributesPostPreferEnum = exports.IssueCustomAttributesPatchPreferEnum = exports.IssueCustomAttributesGetPreferEnum = exports.IssueCustomAttributesDeletePreferEnum = exports.IssueCustomAttributesApi = void 0;
const runtime = __importStar(require("../runtime"));
const models_1 = require("../models");
/**
 *
 */
class IssueCustomAttributesApi extends runtime.BaseAPI {
    /**
     */
    issueCustomAttributesDeleteRaw(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {};
            if (requestParameters.id !== undefined) {
                queryParameters['id'] = requestParameters.id;
            }
            if (requestParameters.issueProviderId !== undefined) {
                queryParameters['issue_provider_id'] = requestParameters.issueProviderId;
            }
            if (requestParameters.customAttributeProviderId !== undefined) {
                queryParameters['custom_attribute_provider_id'] = requestParameters.customAttributeProviderId;
            }
            if (requestParameters.type !== undefined) {
                queryParameters['type'] = requestParameters.type;
            }
            if (requestParameters.value !== undefined) {
                queryParameters['value'] = requestParameters.value;
            }
            if (requestParameters.scannedAt !== undefined) {
                queryParameters['scanned_at'] = requestParameters.scannedAt;
            }
            const headerParameters = {};
            if (requestParameters.prefer !== undefined && requestParameters.prefer !== null) {
                headerParameters['Prefer'] = String(requestParameters.prefer);
            }
            const response = yield this.request({
                path: `/issue_custom_attributes`,
                method: 'DELETE',
                headers: headerParameters,
                query: queryParameters,
            });
            return new runtime.VoidApiResponse(response);
        });
    }
    /**
     */
    issueCustomAttributesDelete(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.issueCustomAttributesDeleteRaw(requestParameters);
        });
    }
    /**
     */
    issueCustomAttributesGetRaw(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {};
            if (requestParameters.id !== undefined) {
                queryParameters['id'] = requestParameters.id;
            }
            if (requestParameters.issueProviderId !== undefined) {
                queryParameters['issue_provider_id'] = requestParameters.issueProviderId;
            }
            if (requestParameters.customAttributeProviderId !== undefined) {
                queryParameters['custom_attribute_provider_id'] = requestParameters.customAttributeProviderId;
            }
            if (requestParameters.type !== undefined) {
                queryParameters['type'] = requestParameters.type;
            }
            if (requestParameters.value !== undefined) {
                queryParameters['value'] = requestParameters.value;
            }
            if (requestParameters.scannedAt !== undefined) {
                queryParameters['scanned_at'] = requestParameters.scannedAt;
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
                path: `/issue_custom_attributes`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            });
            return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(models_1.IssueCustomAttributesFromJSON));
        });
    }
    /**
     */
    issueCustomAttributesGet(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.issueCustomAttributesGetRaw(requestParameters);
            return yield response.value();
        });
    }
    /**
     */
    issueCustomAttributesPatchRaw(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {};
            if (requestParameters.id !== undefined) {
                queryParameters['id'] = requestParameters.id;
            }
            if (requestParameters.issueProviderId !== undefined) {
                queryParameters['issue_provider_id'] = requestParameters.issueProviderId;
            }
            if (requestParameters.customAttributeProviderId !== undefined) {
                queryParameters['custom_attribute_provider_id'] = requestParameters.customAttributeProviderId;
            }
            if (requestParameters.type !== undefined) {
                queryParameters['type'] = requestParameters.type;
            }
            if (requestParameters.value !== undefined) {
                queryParameters['value'] = requestParameters.value;
            }
            if (requestParameters.scannedAt !== undefined) {
                queryParameters['scanned_at'] = requestParameters.scannedAt;
            }
            const headerParameters = {};
            headerParameters['Content-Type'] = 'application/json';
            if (requestParameters.prefer !== undefined && requestParameters.prefer !== null) {
                headerParameters['Prefer'] = String(requestParameters.prefer);
            }
            const response = yield this.request({
                path: `/issue_custom_attributes`,
                method: 'PATCH',
                headers: headerParameters,
                query: queryParameters,
                body: models_1.IssueCustomAttributesToJSON(requestParameters.issueCustomAttributes),
            });
            return new runtime.VoidApiResponse(response);
        });
    }
    /**
     */
    issueCustomAttributesPatch(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.issueCustomAttributesPatchRaw(requestParameters);
        });
    }
    /**
     */
    issueCustomAttributesPostRaw(requestParameters) {
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
                path: `/issue_custom_attributes`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: models_1.IssueCustomAttributesToJSON(requestParameters.issueCustomAttributes),
            });
            return new runtime.VoidApiResponse(response);
        });
    }
    /**
     */
    issueCustomAttributesPost(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.issueCustomAttributesPostRaw(requestParameters);
        });
    }
}
exports.IssueCustomAttributesApi = IssueCustomAttributesApi;
/**
    * @export
    * @enum {string}
    */
var IssueCustomAttributesDeletePreferEnum;
(function (IssueCustomAttributesDeletePreferEnum) {
    IssueCustomAttributesDeletePreferEnum["Representation"] = "return=representation";
    IssueCustomAttributesDeletePreferEnum["Minimal"] = "return=minimal";
    IssueCustomAttributesDeletePreferEnum["None"] = "return=none";
})(IssueCustomAttributesDeletePreferEnum = exports.IssueCustomAttributesDeletePreferEnum || (exports.IssueCustomAttributesDeletePreferEnum = {}));
/**
    * @export
    * @enum {string}
    */
var IssueCustomAttributesGetPreferEnum;
(function (IssueCustomAttributesGetPreferEnum) {
    IssueCustomAttributesGetPreferEnum["Countnone"] = "count=none";
})(IssueCustomAttributesGetPreferEnum = exports.IssueCustomAttributesGetPreferEnum || (exports.IssueCustomAttributesGetPreferEnum = {}));
/**
    * @export
    * @enum {string}
    */
var IssueCustomAttributesPatchPreferEnum;
(function (IssueCustomAttributesPatchPreferEnum) {
    IssueCustomAttributesPatchPreferEnum["Representation"] = "return=representation";
    IssueCustomAttributesPatchPreferEnum["Minimal"] = "return=minimal";
    IssueCustomAttributesPatchPreferEnum["None"] = "return=none";
})(IssueCustomAttributesPatchPreferEnum = exports.IssueCustomAttributesPatchPreferEnum || (exports.IssueCustomAttributesPatchPreferEnum = {}));
/**
    * @export
    * @enum {string}
    */
var IssueCustomAttributesPostPreferEnum;
(function (IssueCustomAttributesPostPreferEnum) {
    IssueCustomAttributesPostPreferEnum["Representation"] = "return=representation";
    IssueCustomAttributesPostPreferEnum["Minimal"] = "return=minimal";
    IssueCustomAttributesPostPreferEnum["None"] = "return=none";
})(IssueCustomAttributesPostPreferEnum = exports.IssueCustomAttributesPostPreferEnum || (exports.IssueCustomAttributesPostPreferEnum = {}));
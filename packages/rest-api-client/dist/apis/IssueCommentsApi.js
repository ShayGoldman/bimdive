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
exports.IssueCommentsPostPreferEnum = exports.IssueCommentsPatchPreferEnum = exports.IssueCommentsGetPreferEnum = exports.IssueCommentsDeletePreferEnum = exports.IssueCommentsApi = void 0;
const runtime = __importStar(require("../runtime"));
const models_1 = require("../models");
/**
 *
 */
class IssueCommentsApi extends runtime.BaseAPI {
    /**
     */
    issueCommentsDeleteRaw(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {};
            if (requestParameters.id !== undefined) {
                queryParameters['id'] = requestParameters.id;
            }
            if (requestParameters.issueProviderId !== undefined) {
                queryParameters['issue_provider_id'] = requestParameters.issueProviderId;
            }
            if (requestParameters.commentProviderId !== undefined) {
                queryParameters['comment_provider_id'] = requestParameters.commentProviderId;
            }
            if (requestParameters.createdBy !== undefined) {
                queryParameters['created_by'] = requestParameters.createdBy;
            }
            if (requestParameters.body !== undefined) {
                queryParameters['body'] = requestParameters.body;
            }
            if (requestParameters.createdAt !== undefined) {
                queryParameters['created_at'] = requestParameters.createdAt;
            }
            if (requestParameters.updatedAt !== undefined) {
                queryParameters['updated_at'] = requestParameters.updatedAt;
            }
            if (requestParameters.scannedAt !== undefined) {
                queryParameters['scanned_at'] = requestParameters.scannedAt;
            }
            const headerParameters = {};
            if (requestParameters.prefer !== undefined && requestParameters.prefer !== null) {
                headerParameters['Prefer'] = String(requestParameters.prefer);
            }
            const response = yield this.request({
                path: `/issue_comments`,
                method: 'DELETE',
                headers: headerParameters,
                query: queryParameters,
            });
            return new runtime.VoidApiResponse(response);
        });
    }
    /**
     */
    issueCommentsDelete(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.issueCommentsDeleteRaw(requestParameters);
        });
    }
    /**
     */
    issueCommentsGetRaw(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {};
            if (requestParameters.id !== undefined) {
                queryParameters['id'] = requestParameters.id;
            }
            if (requestParameters.issueProviderId !== undefined) {
                queryParameters['issue_provider_id'] = requestParameters.issueProviderId;
            }
            if (requestParameters.commentProviderId !== undefined) {
                queryParameters['comment_provider_id'] = requestParameters.commentProviderId;
            }
            if (requestParameters.createdBy !== undefined) {
                queryParameters['created_by'] = requestParameters.createdBy;
            }
            if (requestParameters.body !== undefined) {
                queryParameters['body'] = requestParameters.body;
            }
            if (requestParameters.createdAt !== undefined) {
                queryParameters['created_at'] = requestParameters.createdAt;
            }
            if (requestParameters.updatedAt !== undefined) {
                queryParameters['updated_at'] = requestParameters.updatedAt;
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
                path: `/issue_comments`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            });
            return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(models_1.IssueCommentsFromJSON));
        });
    }
    /**
     */
    issueCommentsGet(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.issueCommentsGetRaw(requestParameters);
            return yield response.value();
        });
    }
    /**
     */
    issueCommentsPatchRaw(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParameters = {};
            if (requestParameters.id !== undefined) {
                queryParameters['id'] = requestParameters.id;
            }
            if (requestParameters.issueProviderId !== undefined) {
                queryParameters['issue_provider_id'] = requestParameters.issueProviderId;
            }
            if (requestParameters.commentProviderId !== undefined) {
                queryParameters['comment_provider_id'] = requestParameters.commentProviderId;
            }
            if (requestParameters.createdBy !== undefined) {
                queryParameters['created_by'] = requestParameters.createdBy;
            }
            if (requestParameters.body !== undefined) {
                queryParameters['body'] = requestParameters.body;
            }
            if (requestParameters.createdAt !== undefined) {
                queryParameters['created_at'] = requestParameters.createdAt;
            }
            if (requestParameters.updatedAt !== undefined) {
                queryParameters['updated_at'] = requestParameters.updatedAt;
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
                path: `/issue_comments`,
                method: 'PATCH',
                headers: headerParameters,
                query: queryParameters,
                body: models_1.IssueCommentsToJSON(requestParameters.issueComments),
            });
            return new runtime.VoidApiResponse(response);
        });
    }
    /**
     */
    issueCommentsPatch(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.issueCommentsPatchRaw(requestParameters);
        });
    }
    /**
     */
    issueCommentsPostRaw(requestParameters) {
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
                path: `/issue_comments`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: models_1.IssueCommentsToJSON(requestParameters.issueComments),
            });
            return new runtime.VoidApiResponse(response);
        });
    }
    /**
     */
    issueCommentsPost(requestParameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.issueCommentsPostRaw(requestParameters);
        });
    }
}
exports.IssueCommentsApi = IssueCommentsApi;
/**
    * @export
    * @enum {string}
    */
var IssueCommentsDeletePreferEnum;
(function (IssueCommentsDeletePreferEnum) {
    IssueCommentsDeletePreferEnum["Representation"] = "return=representation";
    IssueCommentsDeletePreferEnum["Minimal"] = "return=minimal";
    IssueCommentsDeletePreferEnum["None"] = "return=none";
})(IssueCommentsDeletePreferEnum = exports.IssueCommentsDeletePreferEnum || (exports.IssueCommentsDeletePreferEnum = {}));
/**
    * @export
    * @enum {string}
    */
var IssueCommentsGetPreferEnum;
(function (IssueCommentsGetPreferEnum) {
    IssueCommentsGetPreferEnum["Countnone"] = "count=none";
})(IssueCommentsGetPreferEnum = exports.IssueCommentsGetPreferEnum || (exports.IssueCommentsGetPreferEnum = {}));
/**
    * @export
    * @enum {string}
    */
var IssueCommentsPatchPreferEnum;
(function (IssueCommentsPatchPreferEnum) {
    IssueCommentsPatchPreferEnum["Representation"] = "return=representation";
    IssueCommentsPatchPreferEnum["Minimal"] = "return=minimal";
    IssueCommentsPatchPreferEnum["None"] = "return=none";
})(IssueCommentsPatchPreferEnum = exports.IssueCommentsPatchPreferEnum || (exports.IssueCommentsPatchPreferEnum = {}));
/**
    * @export
    * @enum {string}
    */
var IssueCommentsPostPreferEnum;
(function (IssueCommentsPostPreferEnum) {
    IssueCommentsPostPreferEnum["Representation"] = "return=representation";
    IssueCommentsPostPreferEnum["Minimal"] = "return=minimal";
    IssueCommentsPostPreferEnum["None"] = "return=none";
})(IssueCommentsPostPreferEnum = exports.IssueCommentsPostPreferEnum || (exports.IssueCommentsPostPreferEnum = {}));
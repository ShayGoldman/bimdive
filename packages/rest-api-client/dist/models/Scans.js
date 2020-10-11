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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScansToJSON = exports.ScansFromJSONTyped = exports.ScansFromJSON = void 0;
function ScansFromJSON(json) {
    return ScansFromJSONTyped(json, false);
}
exports.ScansFromJSON = ScansFromJSON;
function ScansFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': json['id'],
        'initiatingUserId': json['initiating_user_id'],
        'createdAt': json['created_at'],
    };
}
exports.ScansFromJSONTyped = ScansFromJSONTyped;
function ScansToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
        'initiating_user_id': value.initiatingUserId,
        'created_at': value.createdAt,
    };
}
exports.ScansToJSON = ScansToJSON;

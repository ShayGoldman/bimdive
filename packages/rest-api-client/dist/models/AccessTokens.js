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
exports.AccessTokensToJSON = exports.AccessTokensFromJSONTyped = exports.AccessTokensFromJSON = void 0;
function AccessTokensFromJSON(json) {
    return AccessTokensFromJSONTyped(json, false);
}
exports.AccessTokensFromJSON = AccessTokensFromJSON;
function AccessTokensFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'userProviderId': json['user_provider_id'],
        'accessToken': json['access_token'],
        'refreshToken': json['refresh_token'],
        'issuedAt': json['issued_at'],
        'expiresAt': json['expires_at'],
    };
}
exports.AccessTokensFromJSONTyped = AccessTokensFromJSONTyped;
function AccessTokensToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'user_provider_id': value.userProviderId,
        'access_token': value.accessToken,
        'refresh_token': value.refreshToken,
        'issued_at': value.issuedAt,
        'expires_at': value.expiresAt,
    };
}
exports.AccessTokensToJSON = AccessTokensToJSON;
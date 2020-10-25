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
exports.IssueCustomAttributesToJSON = exports.IssueCustomAttributesFromJSONTyped = exports.IssueCustomAttributesFromJSON = void 0;
const runtime_1 = require("../runtime");
function IssueCustomAttributesFromJSON(json) {
    return IssueCustomAttributesFromJSONTyped(json, false);
}
exports.IssueCustomAttributesFromJSON = IssueCustomAttributesFromJSON;
function IssueCustomAttributesFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': json['id'],
        'issueProviderId': json['issue_provider_id'],
        'customAttributeProviderId': json['custom_attribute_provider_id'],
        'type': json['type'],
        'value': !runtime_1.exists(json, 'value') ? undefined : json['value'],
        'scannedAt': json['scanned_at'],
    };
}
exports.IssueCustomAttributesFromJSONTyped = IssueCustomAttributesFromJSONTyped;
function IssueCustomAttributesToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
        'issue_provider_id': value.issueProviderId,
        'custom_attribute_provider_id': value.customAttributeProviderId,
        'type': value.type,
        'value': value.value,
        'scanned_at': value.scannedAt,
    };
}
exports.IssueCustomAttributesToJSON = IssueCustomAttributesToJSON;

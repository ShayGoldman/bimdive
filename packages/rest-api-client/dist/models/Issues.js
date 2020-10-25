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
exports.IssuesToJSON = exports.IssuesFromJSONTyped = exports.IssuesFromJSON = void 0;
const runtime_1 = require("../runtime");
function IssuesFromJSON(json) {
    return IssuesFromJSONTyped(json, false);
}
exports.IssuesFromJSON = IssuesFromJSON;
function IssuesFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': json['id'],
        'providerId': json['provider_id'],
        'projectProviderId': json['project_provider_id'],
        'title': json['title'],
        'status': json['status'],
        'type': !runtime_1.exists(json, 'type') ? undefined : json['type'],
        'subType': !runtime_1.exists(json, 'sub_type') ? undefined : json['sub_type'],
        'ownedBy': !runtime_1.exists(json, 'owned_by') ? undefined : json['owned_by'],
        'assignedTo': !runtime_1.exists(json, 'assigned_to') ? undefined : json['assigned_to'],
        'assignedToType': !runtime_1.exists(json, 'assigned_to_type') ? undefined : json['assigned_to_type'],
        'dueDate': !runtime_1.exists(json, 'due_date') ? undefined : json['due_date'],
        'scannedAt': json['scanned_at'],
    };
}
exports.IssuesFromJSONTyped = IssuesFromJSONTyped;
function IssuesToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
        'provider_id': value.providerId,
        'project_provider_id': value.projectProviderId,
        'title': value.title,
        'status': value.status,
        'type': value.type,
        'sub_type': value.subType,
        'owned_by': value.ownedBy,
        'assigned_to': value.assignedTo,
        'assigned_to_type': value.assignedToType,
        'due_date': value.dueDate,
        'scanned_at': value.scannedAt,
    };
}
exports.IssuesToJSON = IssuesToJSON;

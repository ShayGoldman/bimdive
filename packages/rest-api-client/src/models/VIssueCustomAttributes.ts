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

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface VIssueCustomAttributes
 */
export interface VIssueCustomAttributes {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @type {string}
   * @memberof VIssueCustomAttributes
   */
  id?: string;
  /**
   *
   * @type {string}
   * @memberof VIssueCustomAttributes
   */
  providerId?: string;
  /**
   *
   * @type {string}
   * @memberof VIssueCustomAttributes
   */
  attributes?: string;
}

export function VIssueCustomAttributesFromJSON(
  json: any
): VIssueCustomAttributes {
  return VIssueCustomAttributesFromJSONTyped(json, false);
}

export function VIssueCustomAttributesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): VIssueCustomAttributes {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    providerId: !exists(json, "provider_id") ? undefined : json["provider_id"],
    attributes: !exists(json, "attributes") ? undefined : json["attributes"],
  };
}

export function VIssueCustomAttributesToJSON(
  value?: VIssueCustomAttributes | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    provider_id: value.providerId,
    attributes: value.attributes,
  };
}

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
 * @interface Scans
 */
export interface Scans {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @type {string}
   * @memberof Scans
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Scans
   */
  initiatingUserId: string;
  /**
   *
   * @type {string}
   * @memberof Scans
   */
  projectProviderId: string;
  /**
   *
   * @type {string}
   * @memberof Scans
   */
  projectName: string;
  /**
   *
   * @type {string}
   * @memberof Scans
   */
  createdAt: string;
}

export function ScansFromJSON(json: any): Scans {
  return ScansFromJSONTyped(json, false);
}

export function ScansFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Scans {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: json["id"],
    initiatingUserId: json["initiating_user_id"],
    projectProviderId: json["project_provider_id"],
    projectName: json["project_name"],
    createdAt: json["created_at"],
  };
}

export function ScansToJSON(value?: Scans | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    initiating_user_id: value.initiatingUserId,
    project_provider_id: value.projectProviderId,
    project_name: value.projectName,
    created_at: value.createdAt,
  };
}

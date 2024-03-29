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
 * @interface AccessTokens
 */
export interface AccessTokens {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @type {string}
   * @memberof AccessTokens
   */
  userProviderId: string;
  /**
   *
   * @type {string}
   * @memberof AccessTokens
   */
  accessToken: string;
  /**
   *
   * @type {string}
   * @memberof AccessTokens
   */
  refreshToken: string;
  /**
   *
   * @type {string}
   * @memberof AccessTokens
   */
  issuedAt: string;
  /**
   *
   * @type {string}
   * @memberof AccessTokens
   */
  expiresAt: string;
}

export function AccessTokensFromJSON(json: any): AccessTokens {
  return AccessTokensFromJSONTyped(json, false);
}

export function AccessTokensFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AccessTokens {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    userProviderId: json["user_provider_id"],
    accessToken: json["access_token"],
    refreshToken: json["refresh_token"],
    issuedAt: json["issued_at"],
    expiresAt: json["expires_at"],
  };
}

export function AccessTokensToJSON(value?: AccessTokens | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    user_provider_id: value.userProviderId,
    access_token: value.accessToken,
    refresh_token: value.refreshToken,
    issued_at: value.issuedAt,
    expires_at: value.expiresAt,
  };
}

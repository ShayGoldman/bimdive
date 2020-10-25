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

import * as runtime from "../runtime";
import {
  CustomAttributes,
  CustomAttributesFromJSON,
  CustomAttributesToJSON,
} from "../models";

export interface CustomAttributesDeleteRequest {
  id?: string;
  providerId?: string;
  type?: string;
  title?: string;
  description?: string;
  value?: string;
  valueId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  scannedAt?: string;
  prefer?: CustomAttributesDeletePreferEnum;
}

export interface CustomAttributesGetRequest {
  id?: string;
  providerId?: string;
  type?: string;
  title?: string;
  description?: string;
  value?: string;
  valueId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  scannedAt?: string;
  select?: string;
  order?: string;
  range?: string;
  rangeUnit?: string;
  offset?: string;
  limit?: string;
  prefer?: CustomAttributesGetPreferEnum;
}

export interface CustomAttributesPatchRequest {
  id?: string;
  providerId?: string;
  type?: string;
  title?: string;
  description?: string;
  value?: string;
  valueId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  scannedAt?: string;
  prefer?: CustomAttributesPatchPreferEnum;
  customAttributes?: CustomAttributes;
}

export interface CustomAttributesPostRequest {
  select?: string;
  prefer?: CustomAttributesPostPreferEnum;
  customAttributes?: CustomAttributes;
}

/**
 *
 */
export class CustomAttributesApi extends runtime.BaseAPI {
  /**
   */
  async customAttributesDeleteRaw(
    requestParameters: CustomAttributesDeleteRequest
  ): Promise<runtime.ApiResponse<void>> {
    const queryParameters: any = {};

    if (requestParameters.id !== undefined) {
      queryParameters["id"] = requestParameters.id;
    }

    if (requestParameters.providerId !== undefined) {
      queryParameters["provider_id"] = requestParameters.providerId;
    }

    if (requestParameters.type !== undefined) {
      queryParameters["type"] = requestParameters.type;
    }

    if (requestParameters.title !== undefined) {
      queryParameters["title"] = requestParameters.title;
    }

    if (requestParameters.description !== undefined) {
      queryParameters["description"] = requestParameters.description;
    }

    if (requestParameters.value !== undefined) {
      queryParameters["value"] = requestParameters.value;
    }

    if (requestParameters.valueId !== undefined) {
      queryParameters["value_id"] = requestParameters.valueId;
    }

    if (requestParameters.createdAt !== undefined) {
      queryParameters["created_at"] = requestParameters.createdAt;
    }

    if (requestParameters.updatedAt !== undefined) {
      queryParameters["updated_at"] = requestParameters.updatedAt;
    }

    if (requestParameters.deletedAt !== undefined) {
      queryParameters["deleted_at"] = requestParameters.deletedAt;
    }

    if (requestParameters.scannedAt !== undefined) {
      queryParameters["scanned_at"] = requestParameters.scannedAt;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (
      requestParameters.prefer !== undefined &&
      requestParameters.prefer !== null
    ) {
      headerParameters["Prefer"] = String(requestParameters.prefer);
    }

    const response = await this.request({
      path: `/custom_attributes`,
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  async customAttributesDelete(
    requestParameters: CustomAttributesDeleteRequest
  ): Promise<void> {
    await this.customAttributesDeleteRaw(requestParameters);
  }

  /**
   */
  async customAttributesGetRaw(
    requestParameters: CustomAttributesGetRequest
  ): Promise<runtime.ApiResponse<Array<CustomAttributes>>> {
    const queryParameters: any = {};

    if (requestParameters.id !== undefined) {
      queryParameters["id"] = requestParameters.id;
    }

    if (requestParameters.providerId !== undefined) {
      queryParameters["provider_id"] = requestParameters.providerId;
    }

    if (requestParameters.type !== undefined) {
      queryParameters["type"] = requestParameters.type;
    }

    if (requestParameters.title !== undefined) {
      queryParameters["title"] = requestParameters.title;
    }

    if (requestParameters.description !== undefined) {
      queryParameters["description"] = requestParameters.description;
    }

    if (requestParameters.value !== undefined) {
      queryParameters["value"] = requestParameters.value;
    }

    if (requestParameters.valueId !== undefined) {
      queryParameters["value_id"] = requestParameters.valueId;
    }

    if (requestParameters.createdAt !== undefined) {
      queryParameters["created_at"] = requestParameters.createdAt;
    }

    if (requestParameters.updatedAt !== undefined) {
      queryParameters["updated_at"] = requestParameters.updatedAt;
    }

    if (requestParameters.deletedAt !== undefined) {
      queryParameters["deleted_at"] = requestParameters.deletedAt;
    }

    if (requestParameters.scannedAt !== undefined) {
      queryParameters["scanned_at"] = requestParameters.scannedAt;
    }

    if (requestParameters.select !== undefined) {
      queryParameters["select"] = requestParameters.select;
    }

    if (requestParameters.order !== undefined) {
      queryParameters["order"] = requestParameters.order;
    }

    if (requestParameters.offset !== undefined) {
      queryParameters["offset"] = requestParameters.offset;
    }

    if (requestParameters.limit !== undefined) {
      queryParameters["limit"] = requestParameters.limit;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (
      requestParameters.range !== undefined &&
      requestParameters.range !== null
    ) {
      headerParameters["Range"] = String(requestParameters.range);
    }

    if (
      requestParameters.rangeUnit !== undefined &&
      requestParameters.rangeUnit !== null
    ) {
      headerParameters["Range-Unit"] = String(requestParameters.rangeUnit);
    }

    if (
      requestParameters.prefer !== undefined &&
      requestParameters.prefer !== null
    ) {
      headerParameters["Prefer"] = String(requestParameters.prefer);
    }

    const response = await this.request({
      path: `/custom_attributes`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(CustomAttributesFromJSON)
    );
  }

  /**
   */
  async customAttributesGet(
    requestParameters: CustomAttributesGetRequest
  ): Promise<Array<CustomAttributes>> {
    const response = await this.customAttributesGetRaw(requestParameters);
    return await response.value();
  }

  /**
   */
  async customAttributesPatchRaw(
    requestParameters: CustomAttributesPatchRequest
  ): Promise<runtime.ApiResponse<void>> {
    const queryParameters: any = {};

    if (requestParameters.id !== undefined) {
      queryParameters["id"] = requestParameters.id;
    }

    if (requestParameters.providerId !== undefined) {
      queryParameters["provider_id"] = requestParameters.providerId;
    }

    if (requestParameters.type !== undefined) {
      queryParameters["type"] = requestParameters.type;
    }

    if (requestParameters.title !== undefined) {
      queryParameters["title"] = requestParameters.title;
    }

    if (requestParameters.description !== undefined) {
      queryParameters["description"] = requestParameters.description;
    }

    if (requestParameters.value !== undefined) {
      queryParameters["value"] = requestParameters.value;
    }

    if (requestParameters.valueId !== undefined) {
      queryParameters["value_id"] = requestParameters.valueId;
    }

    if (requestParameters.createdAt !== undefined) {
      queryParameters["created_at"] = requestParameters.createdAt;
    }

    if (requestParameters.updatedAt !== undefined) {
      queryParameters["updated_at"] = requestParameters.updatedAt;
    }

    if (requestParameters.deletedAt !== undefined) {
      queryParameters["deleted_at"] = requestParameters.deletedAt;
    }

    if (requestParameters.scannedAt !== undefined) {
      queryParameters["scanned_at"] = requestParameters.scannedAt;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (
      requestParameters.prefer !== undefined &&
      requestParameters.prefer !== null
    ) {
      headerParameters["Prefer"] = String(requestParameters.prefer);
    }

    const response = await this.request({
      path: `/custom_attributes`,
      method: "PATCH",
      headers: headerParameters,
      query: queryParameters,
      body: CustomAttributesToJSON(requestParameters.customAttributes),
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  async customAttributesPatch(
    requestParameters: CustomAttributesPatchRequest
  ): Promise<void> {
    await this.customAttributesPatchRaw(requestParameters);
  }

  /**
   */
  async customAttributesPostRaw(
    requestParameters: CustomAttributesPostRequest
  ): Promise<runtime.ApiResponse<void>> {
    const queryParameters: any = {};

    if (requestParameters.select !== undefined) {
      queryParameters["select"] = requestParameters.select;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (
      requestParameters.prefer !== undefined &&
      requestParameters.prefer !== null
    ) {
      headerParameters["Prefer"] = String(requestParameters.prefer);
    }

    const response = await this.request({
      path: `/custom_attributes`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: CustomAttributesToJSON(requestParameters.customAttributes),
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  async customAttributesPost(
    requestParameters: CustomAttributesPostRequest
  ): Promise<void> {
    await this.customAttributesPostRaw(requestParameters);
  }
}

/**
 * @export
 * @enum {string}
 */
export enum CustomAttributesDeletePreferEnum {
  Representation = "return=representation",
  Minimal = "return=minimal",
  None = "return=none",
}
/**
 * @export
 * @enum {string}
 */
export enum CustomAttributesGetPreferEnum {
  Countnone = "count=none",
}
/**
 * @export
 * @enum {string}
 */
export enum CustomAttributesPatchPreferEnum {
  Representation = "return=representation",
  Minimal = "return=minimal",
  None = "return=none",
}
/**
 * @export
 * @enum {string}
 */
export enum CustomAttributesPostPreferEnum {
  Representation = "return=representation",
  Minimal = "return=minimal",
  None = "return=none",
}

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
  IssueComments,
  IssueCommentsFromJSON,
  IssueCommentsToJSON,
} from "../models";

export interface IssueCommentsDeleteRequest {
  id?: string;
  issueProviderId?: string;
  commentProviderId?: string;
  createdBy?: string;
  body?: string;
  createdAt?: string;
  updatedAt?: string;
  scannedAt?: string;
  prefer?: IssueCommentsDeletePreferEnum;
}

export interface IssueCommentsGetRequest {
  id?: string;
  issueProviderId?: string;
  commentProviderId?: string;
  createdBy?: string;
  body?: string;
  createdAt?: string;
  updatedAt?: string;
  scannedAt?: string;
  select?: string;
  order?: string;
  range?: string;
  rangeUnit?: string;
  offset?: string;
  limit?: string;
  prefer?: IssueCommentsGetPreferEnum;
}

export interface IssueCommentsPatchRequest {
  id?: string;
  issueProviderId?: string;
  commentProviderId?: string;
  createdBy?: string;
  body?: string;
  createdAt?: string;
  updatedAt?: string;
  scannedAt?: string;
  prefer?: IssueCommentsPatchPreferEnum;
  issueComments?: IssueComments;
}

export interface IssueCommentsPostRequest {
  select?: string;
  prefer?: IssueCommentsPostPreferEnum;
  issueComments?: IssueComments;
}

/**
 *
 */
export class IssueCommentsApi extends runtime.BaseAPI {
  /**
   */
  async issueCommentsDeleteRaw(
    requestParameters: IssueCommentsDeleteRequest
  ): Promise<runtime.ApiResponse<void>> {
    const queryParameters: any = {};

    if (requestParameters.id !== undefined) {
      queryParameters["id"] = requestParameters.id;
    }

    if (requestParameters.issueProviderId !== undefined) {
      queryParameters["issue_provider_id"] = requestParameters.issueProviderId;
    }

    if (requestParameters.commentProviderId !== undefined) {
      queryParameters["comment_provider_id"] =
        requestParameters.commentProviderId;
    }

    if (requestParameters.createdBy !== undefined) {
      queryParameters["created_by"] = requestParameters.createdBy;
    }

    if (requestParameters.body !== undefined) {
      queryParameters["body"] = requestParameters.body;
    }

    if (requestParameters.createdAt !== undefined) {
      queryParameters["created_at"] = requestParameters.createdAt;
    }

    if (requestParameters.updatedAt !== undefined) {
      queryParameters["updated_at"] = requestParameters.updatedAt;
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
      path: `/issue_comments`,
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  async issueCommentsDelete(
    requestParameters: IssueCommentsDeleteRequest
  ): Promise<void> {
    await this.issueCommentsDeleteRaw(requestParameters);
  }

  /**
   */
  async issueCommentsGetRaw(
    requestParameters: IssueCommentsGetRequest
  ): Promise<runtime.ApiResponse<Array<IssueComments>>> {
    const queryParameters: any = {};

    if (requestParameters.id !== undefined) {
      queryParameters["id"] = requestParameters.id;
    }

    if (requestParameters.issueProviderId !== undefined) {
      queryParameters["issue_provider_id"] = requestParameters.issueProviderId;
    }

    if (requestParameters.commentProviderId !== undefined) {
      queryParameters["comment_provider_id"] =
        requestParameters.commentProviderId;
    }

    if (requestParameters.createdBy !== undefined) {
      queryParameters["created_by"] = requestParameters.createdBy;
    }

    if (requestParameters.body !== undefined) {
      queryParameters["body"] = requestParameters.body;
    }

    if (requestParameters.createdAt !== undefined) {
      queryParameters["created_at"] = requestParameters.createdAt;
    }

    if (requestParameters.updatedAt !== undefined) {
      queryParameters["updated_at"] = requestParameters.updatedAt;
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
      path: `/issue_comments`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(IssueCommentsFromJSON)
    );
  }

  /**
   */
  async issueCommentsGet(
    requestParameters: IssueCommentsGetRequest
  ): Promise<Array<IssueComments>> {
    const response = await this.issueCommentsGetRaw(requestParameters);
    return await response.value();
  }

  /**
   */
  async issueCommentsPatchRaw(
    requestParameters: IssueCommentsPatchRequest
  ): Promise<runtime.ApiResponse<void>> {
    const queryParameters: any = {};

    if (requestParameters.id !== undefined) {
      queryParameters["id"] = requestParameters.id;
    }

    if (requestParameters.issueProviderId !== undefined) {
      queryParameters["issue_provider_id"] = requestParameters.issueProviderId;
    }

    if (requestParameters.commentProviderId !== undefined) {
      queryParameters["comment_provider_id"] =
        requestParameters.commentProviderId;
    }

    if (requestParameters.createdBy !== undefined) {
      queryParameters["created_by"] = requestParameters.createdBy;
    }

    if (requestParameters.body !== undefined) {
      queryParameters["body"] = requestParameters.body;
    }

    if (requestParameters.createdAt !== undefined) {
      queryParameters["created_at"] = requestParameters.createdAt;
    }

    if (requestParameters.updatedAt !== undefined) {
      queryParameters["updated_at"] = requestParameters.updatedAt;
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
      path: `/issue_comments`,
      method: "PATCH",
      headers: headerParameters,
      query: queryParameters,
      body: IssueCommentsToJSON(requestParameters.issueComments),
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  async issueCommentsPatch(
    requestParameters: IssueCommentsPatchRequest
  ): Promise<void> {
    await this.issueCommentsPatchRaw(requestParameters);
  }

  /**
   */
  async issueCommentsPostRaw(
    requestParameters: IssueCommentsPostRequest
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
      path: `/issue_comments`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: IssueCommentsToJSON(requestParameters.issueComments),
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  async issueCommentsPost(
    requestParameters: IssueCommentsPostRequest
  ): Promise<void> {
    await this.issueCommentsPostRaw(requestParameters);
  }
}

/**
 * @export
 * @enum {string}
 */
export enum IssueCommentsDeletePreferEnum {
  Representation = "return=representation",
  Minimal = "return=minimal",
  None = "return=none",
}
/**
 * @export
 * @enum {string}
 */
export enum IssueCommentsGetPreferEnum {
  Countnone = "count=none",
}
/**
 * @export
 * @enum {string}
 */
export enum IssueCommentsPatchPreferEnum {
  Representation = "return=representation",
  Minimal = "return=minimal",
  None = "return=none",
}
/**
 * @export
 * @enum {string}
 */
export enum IssueCommentsPostPreferEnum {
  Representation = "return=representation",
  Minimal = "return=minimal",
  None = "return=none",
}

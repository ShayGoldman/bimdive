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
/**
 *
 * @export
 * @interface IssueCustomAttributes
 */
export interface IssueCustomAttributes {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @type {string}
   * @memberof IssueCustomAttributes
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof IssueCustomAttributes
   */
  issueProviderId: string;
  /**
   *
   * @type {string}
   * @memberof IssueCustomAttributes
   */
  customAttributeProviderId: string;
  /**
   *
   * @type {string}
   * @memberof IssueCustomAttributes
   */
  type: string;
  /**
   *
   * @type {string}
   * @memberof IssueCustomAttributes
   */
  value?: string;
  /**
   *
   * @type {string}
   * @memberof IssueCustomAttributes
   */
  scannedAt: string;
}
export declare function IssueCustomAttributesFromJSON(
  json: any
): IssueCustomAttributes;
export declare function IssueCustomAttributesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): IssueCustomAttributes;
export declare function IssueCustomAttributesToJSON(
  value?: IssueCustomAttributes | null
): any;
//# sourceMappingURL=IssueCustomAttributes.d.ts.map

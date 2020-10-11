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
 * @interface CustomAttributes
 */
export interface CustomAttributes {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @type {string}
   * @memberof CustomAttributes
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  providerId: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  issueContainerProviderId: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  type: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  description?: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  value?: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  valueId?: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  createdAt?: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  updatedAt?: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  deletedAt?: string;
  /**
   *
   * @type {string}
   * @memberof CustomAttributes
   */
  scannedAt: string;
}
export declare function CustomAttributesFromJSON(json: any): CustomAttributes;
export declare function CustomAttributesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CustomAttributes;
export declare function CustomAttributesToJSON(
  value?: CustomAttributes | null
): any;
//# sourceMappingURL=CustomAttributes.d.ts.map

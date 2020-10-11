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
 * @interface Issues
 */
export interface Issues {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @type {string}
   * @memberof Issues
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  providerId: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  issueContainerProviderId: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  status: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  type?: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  subType?: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  ownedBy?: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  assignedTo?: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  assignedToType?: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  dueDate?: string;
  /**
   *
   * @type {string}
   * @memberof Issues
   */
  scannedAt: string;
}
export declare function IssuesFromJSON(json: any): Issues;
export declare function IssuesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Issues;
export declare function IssuesToJSON(value?: Issues | null): any;
//# sourceMappingURL=Issues.d.ts.map

import { Logger } from "../logger.service";
import { BIMApi } from "../bim-api.service";
import omit from "lodash/omit";
import flatten from "lodash/flatten";
import uniqBy from "lodash/uniqBy";
import { EventsEmitter } from "../../integrations/event-emitter.service";

export type ETLExtract = () => Promise<any[]>;

type Deps = {
  logger: Logger;
  bimApi: BIMApi;
};

type DataObject<T> = {
  relationships: any;
  links: any;
  attributes: any;
  id: string;
  data: T;
  [key: string]: any;
};

type ApiResponse<T> = {
  links: any;
  data: DataObject<T>[];
  meta: { warnings: any[] };
};

type PagedApiResponse<T> = {
  results: DataObject<T>[];
};

type DataManagementAPI_GetHubs = ApiResponse<any>;
type BIM360API_GetProjects = ApiResponse<any>;
type BIM360API_GetIssues = ApiResponse<any>;
type BIM360API_GetIssueTypes = PagedApiResponse<any>;

export function $ETLExtract({ logger, bimApi }: Deps): ETLExtract {
  return async function etlExtract() {
    const hubs = await bimApi.get<
      DataManagementAPI_GetHubs,
      DataManagementAPI_GetHubs
    >("/project/v1/hubs");

    let returnedArray = [];
    for (const hub of hubs.data) {
      const projects = await bimApi.get<
        BIM360API_GetProjects,
        BIM360API_GetProjects
      >(`/project/v1/hubs/${hub.id}/projects`);

      for (const project of projects.data) {
        const issueContainerId = project.relationships.issues.data.id;
        const [issues, { results: allIssueTypes }] = await Promise.all([
          await bimApi.get<BIM360API_GetIssues, BIM360API_GetIssues>(
            `/issues/v1/containers/${issueContainerId}/quality-issues`,
            {
              params: {
                "page[limit]": 100,
              },
            }
          ),
          await bimApi.get<BIM360API_GetIssueTypes, BIM360API_GetIssueTypes>(
            `/issues/v1/containers/${issueContainerId}/ng-issue-types`,
            {
              params: {
                include: "subtypes",
              },
            }
          ),
        ]);

        const issueSubtypes = uniqBy(
          flatten(allIssueTypes.map(({ subtypes }) => subtypes)),
          ({ id }) => id
        );
        const issueTypes = allIssueTypes.map((i) => omit(i, "subtypes"));

        for (const issue of issues.data) {
          logger.debug({
            msg: "Found issue",
            id: issue.id,
          });

          // events.emit({
          //   type: "IssueDiscovered",
          //   issueId: issue.id,
          //   issueContainerId,
          //   projectId: project.id,
          //   hubId: hub.id,
          // });

          const type = issueTypes.find(
            ({ id }) => id === issue.attributes.ng_issue_type_id
          );
          const subType = issueSubtypes.find(
            ({ id }) => id === issue.attributes.ng_issue_subtype_id
          );

          returnedArray.push({ issue, type, subType });
        }
      }
    }

    return returnedArray;
  };
}

import { Logger } from "../logger.service";
import { BIMApi } from "../bim-api.service";

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

type DataManagementAPI_GetHubs = ApiResponse<any>;
type BIM360API_GetProjects = ApiResponse<any>;
type BIM360API_GetIssues = ApiResponse<any>;

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
        const issues = await bimApi.get<
          BIM360API_GetIssues,
          BIM360API_GetIssues
        >(`/issues/v1/containers/${issueContainerId}/quality-issues`);

        for (const issue of issues.data) {
          logger.debug({
            msg: "Found issue",
            id: issue.id,
          });

          returnedArray.push(issue);
        }
      }
    }

    return returnedArray;
  };
}

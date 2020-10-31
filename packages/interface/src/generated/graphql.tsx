import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _text: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};


/** expression to compare columns of type _text. All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: Maybe<Scalars['_text']>;
  _gt?: Maybe<Scalars['_text']>;
  _gte?: Maybe<Scalars['_text']>;
  _in?: Maybe<Array<Scalars['_text']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['_text']>;
  _lte?: Maybe<Scalars['_text']>;
  _neq?: Maybe<Scalars['_text']>;
  _nin?: Maybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "events.access_tokens" */
export type Events_Access_Tokens = {
  __typename?: 'events_access_tokens';
  access_token: Scalars['String'];
  expires_at: Scalars['timestamptz'];
  issued_at: Scalars['timestamptz'];
  refresh_token: Scalars['String'];
  user_provider_id: Scalars['String'];
};

/** aggregated selection of "events.access_tokens" */
export type Events_Access_Tokens_Aggregate = {
  __typename?: 'events_access_tokens_aggregate';
  aggregate?: Maybe<Events_Access_Tokens_Aggregate_Fields>;
  nodes: Array<Events_Access_Tokens>;
};

/** aggregate fields of "events.access_tokens" */
export type Events_Access_Tokens_Aggregate_Fields = {
  __typename?: 'events_access_tokens_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Events_Access_Tokens_Max_Fields>;
  min?: Maybe<Events_Access_Tokens_Min_Fields>;
};


/** aggregate fields of "events.access_tokens" */
export type Events_Access_Tokens_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_Access_Tokens_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "events.access_tokens" */
export type Events_Access_Tokens_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Events_Access_Tokens_Max_Order_By>;
  min?: Maybe<Events_Access_Tokens_Min_Order_By>;
};

/** input type for inserting array relation for remote table "events.access_tokens" */
export type Events_Access_Tokens_Arr_Rel_Insert_Input = {
  data: Array<Events_Access_Tokens_Insert_Input>;
  on_conflict?: Maybe<Events_Access_Tokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "events.access_tokens". All fields are combined with a logical 'AND'. */
export type Events_Access_Tokens_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Events_Access_Tokens_Bool_Exp>>>;
  _not?: Maybe<Events_Access_Tokens_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Events_Access_Tokens_Bool_Exp>>>;
  access_token?: Maybe<String_Comparison_Exp>;
  expires_at?: Maybe<Timestamptz_Comparison_Exp>;
  issued_at?: Maybe<Timestamptz_Comparison_Exp>;
  refresh_token?: Maybe<String_Comparison_Exp>;
  user_provider_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "events.access_tokens" */
export enum Events_Access_Tokens_Constraint {
  /** unique or primary key constraint */
  AccessTokensPkey = 'access_tokens_pkey'
}

/** input type for inserting data into table "events.access_tokens" */
export type Events_Access_Tokens_Insert_Input = {
  access_token?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamptz']>;
  issued_at?: Maybe<Scalars['timestamptz']>;
  refresh_token?: Maybe<Scalars['String']>;
  user_provider_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Events_Access_Tokens_Max_Fields = {
  __typename?: 'events_access_tokens_max_fields';
  access_token?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamptz']>;
  issued_at?: Maybe<Scalars['timestamptz']>;
  refresh_token?: Maybe<Scalars['String']>;
  user_provider_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "events.access_tokens" */
export type Events_Access_Tokens_Max_Order_By = {
  access_token?: Maybe<Order_By>;
  expires_at?: Maybe<Order_By>;
  issued_at?: Maybe<Order_By>;
  refresh_token?: Maybe<Order_By>;
  user_provider_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Access_Tokens_Min_Fields = {
  __typename?: 'events_access_tokens_min_fields';
  access_token?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamptz']>;
  issued_at?: Maybe<Scalars['timestamptz']>;
  refresh_token?: Maybe<Scalars['String']>;
  user_provider_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "events.access_tokens" */
export type Events_Access_Tokens_Min_Order_By = {
  access_token?: Maybe<Order_By>;
  expires_at?: Maybe<Order_By>;
  issued_at?: Maybe<Order_By>;
  refresh_token?: Maybe<Order_By>;
  user_provider_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "events.access_tokens" */
export type Events_Access_Tokens_Mutation_Response = {
  __typename?: 'events_access_tokens_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Events_Access_Tokens>;
};

/** input type for inserting object relation for remote table "events.access_tokens" */
export type Events_Access_Tokens_Obj_Rel_Insert_Input = {
  data: Events_Access_Tokens_Insert_Input;
  on_conflict?: Maybe<Events_Access_Tokens_On_Conflict>;
};

/** on conflict condition type for table "events.access_tokens" */
export type Events_Access_Tokens_On_Conflict = {
  constraint: Events_Access_Tokens_Constraint;
  update_columns: Array<Events_Access_Tokens_Update_Column>;
  where?: Maybe<Events_Access_Tokens_Bool_Exp>;
};

/** ordering options when selecting data from "events.access_tokens" */
export type Events_Access_Tokens_Order_By = {
  access_token?: Maybe<Order_By>;
  expires_at?: Maybe<Order_By>;
  issued_at?: Maybe<Order_By>;
  refresh_token?: Maybe<Order_By>;
  user_provider_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "events.access_tokens" */
export type Events_Access_Tokens_Pk_Columns_Input = {
  user_provider_id: Scalars['String'];
};

/** select columns of table "events.access_tokens" */
export enum Events_Access_Tokens_Select_Column {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  IssuedAt = 'issued_at',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  UserProviderId = 'user_provider_id'
}

/** input type for updating data in table "events.access_tokens" */
export type Events_Access_Tokens_Set_Input = {
  access_token?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['timestamptz']>;
  issued_at?: Maybe<Scalars['timestamptz']>;
  refresh_token?: Maybe<Scalars['String']>;
  user_provider_id?: Maybe<Scalars['String']>;
};

/** update columns of table "events.access_tokens" */
export enum Events_Access_Tokens_Update_Column {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  IssuedAt = 'issued_at',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  UserProviderId = 'user_provider_id'
}

/** columns and relationships of "events.custom_attributes" */
export type Events_Custom_Attributes = {
  __typename?: 'events_custom_attributes';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  provider_id: Scalars['String'];
  scanned_at: Scalars['timestamptz'];
  title: Scalars['String'];
  type: Scalars['String'];
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['String']>;
  value_id?: Maybe<Scalars['String']>;
};

/** aggregated selection of "events.custom_attributes" */
export type Events_Custom_Attributes_Aggregate = {
  __typename?: 'events_custom_attributes_aggregate';
  aggregate?: Maybe<Events_Custom_Attributes_Aggregate_Fields>;
  nodes: Array<Events_Custom_Attributes>;
};

/** aggregate fields of "events.custom_attributes" */
export type Events_Custom_Attributes_Aggregate_Fields = {
  __typename?: 'events_custom_attributes_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Events_Custom_Attributes_Max_Fields>;
  min?: Maybe<Events_Custom_Attributes_Min_Fields>;
};


/** aggregate fields of "events.custom_attributes" */
export type Events_Custom_Attributes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_Custom_Attributes_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "events.custom_attributes" */
export type Events_Custom_Attributes_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Events_Custom_Attributes_Max_Order_By>;
  min?: Maybe<Events_Custom_Attributes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "events.custom_attributes" */
export type Events_Custom_Attributes_Arr_Rel_Insert_Input = {
  data: Array<Events_Custom_Attributes_Insert_Input>;
  on_conflict?: Maybe<Events_Custom_Attributes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "events.custom_attributes". All fields are combined with a logical 'AND'. */
export type Events_Custom_Attributes_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Events_Custom_Attributes_Bool_Exp>>>;
  _not?: Maybe<Events_Custom_Attributes_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Events_Custom_Attributes_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  deleted_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  provider_id?: Maybe<String_Comparison_Exp>;
  scanned_at?: Maybe<Timestamptz_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  value?: Maybe<String_Comparison_Exp>;
  value_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "events.custom_attributes" */
export enum Events_Custom_Attributes_Constraint {
  /** unique or primary key constraint */
  CustomAttributesPkey = 'custom_attributes_pkey',
  /** unique or primary key constraint */
  CustomAttributesProviderId = 'custom_attributes_provider_id',
  /** unique or primary key constraint */
  CustomAttributesProviderIdValueId = 'custom_attributes_provider_id_value_id'
}

/** input type for inserting data into table "events.custom_attributes" */
export type Events_Custom_Attributes_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['String']>;
  value_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Events_Custom_Attributes_Max_Fields = {
  __typename?: 'events_custom_attributes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['String']>;
  value_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "events.custom_attributes" */
export type Events_Custom_Attributes_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  deleted_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
  value_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Custom_Attributes_Min_Fields = {
  __typename?: 'events_custom_attributes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['String']>;
  value_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "events.custom_attributes" */
export type Events_Custom_Attributes_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  deleted_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
  value_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "events.custom_attributes" */
export type Events_Custom_Attributes_Mutation_Response = {
  __typename?: 'events_custom_attributes_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Events_Custom_Attributes>;
};

/** input type for inserting object relation for remote table "events.custom_attributes" */
export type Events_Custom_Attributes_Obj_Rel_Insert_Input = {
  data: Events_Custom_Attributes_Insert_Input;
  on_conflict?: Maybe<Events_Custom_Attributes_On_Conflict>;
};

/** on conflict condition type for table "events.custom_attributes" */
export type Events_Custom_Attributes_On_Conflict = {
  constraint: Events_Custom_Attributes_Constraint;
  update_columns: Array<Events_Custom_Attributes_Update_Column>;
  where?: Maybe<Events_Custom_Attributes_Bool_Exp>;
};

/** ordering options when selecting data from "events.custom_attributes" */
export type Events_Custom_Attributes_Order_By = {
  created_at?: Maybe<Order_By>;
  deleted_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
  value_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "events.custom_attributes" */
export type Events_Custom_Attributes_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "events.custom_attributes" */
export enum Events_Custom_Attributes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ScannedAt = 'scanned_at',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value',
  /** column name */
  ValueId = 'value_id'
}

/** input type for updating data in table "events.custom_attributes" */
export type Events_Custom_Attributes_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  value?: Maybe<Scalars['String']>;
  value_id?: Maybe<Scalars['String']>;
};

/** update columns of table "events.custom_attributes" */
export enum Events_Custom_Attributes_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ScannedAt = 'scanned_at',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value',
  /** column name */
  ValueId = 'value_id'
}

/** columns and relationships of "events.issue_comments" */
export type Events_Issue_Comments = {
  __typename?: 'events_issue_comments';
  body?: Maybe<Scalars['String']>;
  comment_provider_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  created_by?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  issue_provider_id: Scalars['String'];
  scanned_at: Scalars['timestamptz'];
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "events.issue_comments" */
export type Events_Issue_Comments_Aggregate = {
  __typename?: 'events_issue_comments_aggregate';
  aggregate?: Maybe<Events_Issue_Comments_Aggregate_Fields>;
  nodes: Array<Events_Issue_Comments>;
};

/** aggregate fields of "events.issue_comments" */
export type Events_Issue_Comments_Aggregate_Fields = {
  __typename?: 'events_issue_comments_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Events_Issue_Comments_Max_Fields>;
  min?: Maybe<Events_Issue_Comments_Min_Fields>;
};


/** aggregate fields of "events.issue_comments" */
export type Events_Issue_Comments_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_Issue_Comments_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "events.issue_comments" */
export type Events_Issue_Comments_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Events_Issue_Comments_Max_Order_By>;
  min?: Maybe<Events_Issue_Comments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "events.issue_comments" */
export type Events_Issue_Comments_Arr_Rel_Insert_Input = {
  data: Array<Events_Issue_Comments_Insert_Input>;
  on_conflict?: Maybe<Events_Issue_Comments_On_Conflict>;
};

/** Boolean expression to filter rows from the table "events.issue_comments". All fields are combined with a logical 'AND'. */
export type Events_Issue_Comments_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Events_Issue_Comments_Bool_Exp>>>;
  _not?: Maybe<Events_Issue_Comments_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Events_Issue_Comments_Bool_Exp>>>;
  body?: Maybe<String_Comparison_Exp>;
  comment_provider_id?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  created_by?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  issue_provider_id?: Maybe<String_Comparison_Exp>;
  scanned_at?: Maybe<Timestamptz_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "events.issue_comments" */
export enum Events_Issue_Comments_Constraint {
  /** unique or primary key constraint */
  IssueCommentsPkey = 'issue_comments_pkey'
}

/** input type for inserting data into table "events.issue_comments" */
export type Events_Issue_Comments_Insert_Input = {
  body?: Maybe<Scalars['String']>;
  comment_provider_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issue_provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Events_Issue_Comments_Max_Fields = {
  __typename?: 'events_issue_comments_max_fields';
  body?: Maybe<Scalars['String']>;
  comment_provider_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issue_provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "events.issue_comments" */
export type Events_Issue_Comments_Max_Order_By = {
  body?: Maybe<Order_By>;
  comment_provider_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue_provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Issue_Comments_Min_Fields = {
  __typename?: 'events_issue_comments_min_fields';
  body?: Maybe<Scalars['String']>;
  comment_provider_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issue_provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "events.issue_comments" */
export type Events_Issue_Comments_Min_Order_By = {
  body?: Maybe<Order_By>;
  comment_provider_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue_provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "events.issue_comments" */
export type Events_Issue_Comments_Mutation_Response = {
  __typename?: 'events_issue_comments_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Events_Issue_Comments>;
};

/** input type for inserting object relation for remote table "events.issue_comments" */
export type Events_Issue_Comments_Obj_Rel_Insert_Input = {
  data: Events_Issue_Comments_Insert_Input;
  on_conflict?: Maybe<Events_Issue_Comments_On_Conflict>;
};

/** on conflict condition type for table "events.issue_comments" */
export type Events_Issue_Comments_On_Conflict = {
  constraint: Events_Issue_Comments_Constraint;
  update_columns: Array<Events_Issue_Comments_Update_Column>;
  where?: Maybe<Events_Issue_Comments_Bool_Exp>;
};

/** ordering options when selecting data from "events.issue_comments" */
export type Events_Issue_Comments_Order_By = {
  body?: Maybe<Order_By>;
  comment_provider_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue_provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "events.issue_comments" */
export type Events_Issue_Comments_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "events.issue_comments" */
export enum Events_Issue_Comments_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  CommentProviderId = 'comment_provider_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Id = 'id',
  /** column name */
  IssueProviderId = 'issue_provider_id',
  /** column name */
  ScannedAt = 'scanned_at',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "events.issue_comments" */
export type Events_Issue_Comments_Set_Input = {
  body?: Maybe<Scalars['String']>;
  comment_provider_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issue_provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "events.issue_comments" */
export enum Events_Issue_Comments_Update_Column {
  /** column name */
  Body = 'body',
  /** column name */
  CommentProviderId = 'comment_provider_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Id = 'id',
  /** column name */
  IssueProviderId = 'issue_provider_id',
  /** column name */
  ScannedAt = 'scanned_at',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes = {
  __typename?: 'events_issue_custom_attributes';
  /** An object relationship */
  attribute_data?: Maybe<Events_Custom_Attributes>;
  custom_attribute_provider_id: Scalars['String'];
  id: Scalars['uuid'];
  issue_provider_id: Scalars['String'];
  scanned_at: Scalars['timestamptz'];
  type: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

/** aggregated selection of "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Aggregate = {
  __typename?: 'events_issue_custom_attributes_aggregate';
  aggregate?: Maybe<Events_Issue_Custom_Attributes_Aggregate_Fields>;
  nodes: Array<Events_Issue_Custom_Attributes>;
};

/** aggregate fields of "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Aggregate_Fields = {
  __typename?: 'events_issue_custom_attributes_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Events_Issue_Custom_Attributes_Max_Fields>;
  min?: Maybe<Events_Issue_Custom_Attributes_Min_Fields>;
};


/** aggregate fields of "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_Issue_Custom_Attributes_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Events_Issue_Custom_Attributes_Max_Order_By>;
  min?: Maybe<Events_Issue_Custom_Attributes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Arr_Rel_Insert_Input = {
  data: Array<Events_Issue_Custom_Attributes_Insert_Input>;
  on_conflict?: Maybe<Events_Issue_Custom_Attributes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "events.issue_custom_attributes". All fields are combined with a logical 'AND'. */
export type Events_Issue_Custom_Attributes_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Events_Issue_Custom_Attributes_Bool_Exp>>>;
  _not?: Maybe<Events_Issue_Custom_Attributes_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Events_Issue_Custom_Attributes_Bool_Exp>>>;
  attribute_data?: Maybe<Events_Custom_Attributes_Bool_Exp>;
  custom_attribute_provider_id?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  issue_provider_id?: Maybe<String_Comparison_Exp>;
  scanned_at?: Maybe<Timestamptz_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "events.issue_custom_attributes" */
export enum Events_Issue_Custom_Attributes_Constraint {
  /** unique or primary key constraint */
  IssueCustomAttributesIssueProviderIdCustomAttributeProv = 'issue_custom_attributes_issue_provider_id_custom_attribute_prov',
  /** unique or primary key constraint */
  IssueCustomAttributesPkey = 'issue_custom_attributes_pkey'
}

/** input type for inserting data into table "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Insert_Input = {
  attribute_data?: Maybe<Events_Custom_Attributes_Obj_Rel_Insert_Input>;
  custom_attribute_provider_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issue_provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Events_Issue_Custom_Attributes_Max_Fields = {
  __typename?: 'events_issue_custom_attributes_max_fields';
  custom_attribute_provider_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issue_provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Max_Order_By = {
  custom_attribute_provider_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue_provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Issue_Custom_Attributes_Min_Fields = {
  __typename?: 'events_issue_custom_attributes_min_fields';
  custom_attribute_provider_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issue_provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Min_Order_By = {
  custom_attribute_provider_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue_provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Mutation_Response = {
  __typename?: 'events_issue_custom_attributes_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Events_Issue_Custom_Attributes>;
};

/** input type for inserting object relation for remote table "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Obj_Rel_Insert_Input = {
  data: Events_Issue_Custom_Attributes_Insert_Input;
  on_conflict?: Maybe<Events_Issue_Custom_Attributes_On_Conflict>;
};

/** on conflict condition type for table "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_On_Conflict = {
  constraint: Events_Issue_Custom_Attributes_Constraint;
  update_columns: Array<Events_Issue_Custom_Attributes_Update_Column>;
  where?: Maybe<Events_Issue_Custom_Attributes_Bool_Exp>;
};

/** ordering options when selecting data from "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Order_By = {
  attribute_data?: Maybe<Events_Custom_Attributes_Order_By>;
  custom_attribute_provider_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue_provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "events.issue_custom_attributes" */
export enum Events_Issue_Custom_Attributes_Select_Column {
  /** column name */
  CustomAttributeProviderId = 'custom_attribute_provider_id',
  /** column name */
  Id = 'id',
  /** column name */
  IssueProviderId = 'issue_provider_id',
  /** column name */
  ScannedAt = 'scanned_at',
  /** column name */
  Type = 'type',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "events.issue_custom_attributes" */
export type Events_Issue_Custom_Attributes_Set_Input = {
  custom_attribute_provider_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issue_provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "events.issue_custom_attributes" */
export enum Events_Issue_Custom_Attributes_Update_Column {
  /** column name */
  CustomAttributeProviderId = 'custom_attribute_provider_id',
  /** column name */
  Id = 'id',
  /** column name */
  IssueProviderId = 'issue_provider_id',
  /** column name */
  ScannedAt = 'scanned_at',
  /** column name */
  Type = 'type',
  /** column name */
  Value = 'value'
}

/** columns and relationships of "events.issues" */
export type Events_Issues = {
  __typename?: 'events_issues';
  assigned_to?: Maybe<Scalars['String']>;
  assigned_to_type?: Maybe<Scalars['String']>;
  /** An object relationship */
  assignee?: Maybe<Events_Users>;
  due_date?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An array relationship */
  issue_custom_attributes: Array<Events_Issue_Custom_Attributes>;
  /** An aggregated array relationship */
  issue_custom_attributes_aggregate: Events_Issue_Custom_Attributes_Aggregate;
  owned_by?: Maybe<Scalars['String']>;
  /** An object relationship */
  owner?: Maybe<Events_Users>;
  project_provider_id: Scalars['String'];
  provider_id: Scalars['String'];
  scanned_at: Scalars['timestamptz'];
  status: Scalars['String'];
  sub_type?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};


/** columns and relationships of "events.issues" */
export type Events_IssuesIssue_Custom_AttributesArgs = {
  distinct_on?: Maybe<Array<Events_Issue_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issue_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_Issue_Custom_Attributes_Bool_Exp>;
};


/** columns and relationships of "events.issues" */
export type Events_IssuesIssue_Custom_Attributes_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Issue_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issue_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_Issue_Custom_Attributes_Bool_Exp>;
};

/** aggregated selection of "events.issues" */
export type Events_Issues_Aggregate = {
  __typename?: 'events_issues_aggregate';
  aggregate?: Maybe<Events_Issues_Aggregate_Fields>;
  nodes: Array<Events_Issues>;
};

/** aggregate fields of "events.issues" */
export type Events_Issues_Aggregate_Fields = {
  __typename?: 'events_issues_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Events_Issues_Max_Fields>;
  min?: Maybe<Events_Issues_Min_Fields>;
};


/** aggregate fields of "events.issues" */
export type Events_Issues_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_Issues_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "events.issues" */
export type Events_Issues_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Events_Issues_Max_Order_By>;
  min?: Maybe<Events_Issues_Min_Order_By>;
};

/** input type for inserting array relation for remote table "events.issues" */
export type Events_Issues_Arr_Rel_Insert_Input = {
  data: Array<Events_Issues_Insert_Input>;
  on_conflict?: Maybe<Events_Issues_On_Conflict>;
};

/** Boolean expression to filter rows from the table "events.issues". All fields are combined with a logical 'AND'. */
export type Events_Issues_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Events_Issues_Bool_Exp>>>;
  _not?: Maybe<Events_Issues_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Events_Issues_Bool_Exp>>>;
  assigned_to?: Maybe<String_Comparison_Exp>;
  assigned_to_type?: Maybe<String_Comparison_Exp>;
  assignee?: Maybe<Events_Users_Bool_Exp>;
  due_date?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  issue_custom_attributes?: Maybe<Events_Issue_Custom_Attributes_Bool_Exp>;
  owned_by?: Maybe<String_Comparison_Exp>;
  owner?: Maybe<Events_Users_Bool_Exp>;
  project_provider_id?: Maybe<String_Comparison_Exp>;
  provider_id?: Maybe<String_Comparison_Exp>;
  scanned_at?: Maybe<Timestamptz_Comparison_Exp>;
  status?: Maybe<String_Comparison_Exp>;
  sub_type?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "events.issues" */
export enum Events_Issues_Constraint {
  /** unique or primary key constraint */
  IssuesPkey = 'issues_pkey',
  /** unique or primary key constraint */
  IssuesProviderIdUnique = 'issues_provider_id_unique'
}

/** input type for inserting data into table "events.issues" */
export type Events_Issues_Insert_Input = {
  assigned_to?: Maybe<Scalars['String']>;
  assigned_to_type?: Maybe<Scalars['String']>;
  assignee?: Maybe<Events_Users_Obj_Rel_Insert_Input>;
  due_date?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  issue_custom_attributes?: Maybe<Events_Issue_Custom_Attributes_Arr_Rel_Insert_Input>;
  owned_by?: Maybe<Scalars['String']>;
  owner?: Maybe<Events_Users_Obj_Rel_Insert_Input>;
  project_provider_id?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Scalars['String']>;
  sub_type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Events_Issues_Max_Fields = {
  __typename?: 'events_issues_max_fields';
  assigned_to?: Maybe<Scalars['String']>;
  assigned_to_type?: Maybe<Scalars['String']>;
  due_date?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  owned_by?: Maybe<Scalars['String']>;
  project_provider_id?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Scalars['String']>;
  sub_type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "events.issues" */
export type Events_Issues_Max_Order_By = {
  assigned_to?: Maybe<Order_By>;
  assigned_to_type?: Maybe<Order_By>;
  due_date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owned_by?: Maybe<Order_By>;
  project_provider_id?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  sub_type?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Issues_Min_Fields = {
  __typename?: 'events_issues_min_fields';
  assigned_to?: Maybe<Scalars['String']>;
  assigned_to_type?: Maybe<Scalars['String']>;
  due_date?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  owned_by?: Maybe<Scalars['String']>;
  project_provider_id?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Scalars['String']>;
  sub_type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "events.issues" */
export type Events_Issues_Min_Order_By = {
  assigned_to?: Maybe<Order_By>;
  assigned_to_type?: Maybe<Order_By>;
  due_date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owned_by?: Maybe<Order_By>;
  project_provider_id?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  sub_type?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** response of any mutation on the table "events.issues" */
export type Events_Issues_Mutation_Response = {
  __typename?: 'events_issues_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Events_Issues>;
};

/** input type for inserting object relation for remote table "events.issues" */
export type Events_Issues_Obj_Rel_Insert_Input = {
  data: Events_Issues_Insert_Input;
  on_conflict?: Maybe<Events_Issues_On_Conflict>;
};

/** on conflict condition type for table "events.issues" */
export type Events_Issues_On_Conflict = {
  constraint: Events_Issues_Constraint;
  update_columns: Array<Events_Issues_Update_Column>;
  where?: Maybe<Events_Issues_Bool_Exp>;
};

/** ordering options when selecting data from "events.issues" */
export type Events_Issues_Order_By = {
  assigned_to?: Maybe<Order_By>;
  assigned_to_type?: Maybe<Order_By>;
  assignee?: Maybe<Events_Users_Order_By>;
  due_date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue_custom_attributes_aggregate?: Maybe<Events_Issue_Custom_Attributes_Aggregate_Order_By>;
  owned_by?: Maybe<Order_By>;
  owner?: Maybe<Events_Users_Order_By>;
  project_provider_id?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  sub_type?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** primary key columns input for table: "events.issues" */
export type Events_Issues_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "events.issues" */
export enum Events_Issues_Select_Column {
  /** column name */
  AssignedTo = 'assigned_to',
  /** column name */
  AssignedToType = 'assigned_to_type',
  /** column name */
  DueDate = 'due_date',
  /** column name */
  Id = 'id',
  /** column name */
  OwnedBy = 'owned_by',
  /** column name */
  ProjectProviderId = 'project_provider_id',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ScannedAt = 'scanned_at',
  /** column name */
  Status = 'status',
  /** column name */
  SubType = 'sub_type',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "events.issues" */
export type Events_Issues_Set_Input = {
  assigned_to?: Maybe<Scalars['String']>;
  assigned_to_type?: Maybe<Scalars['String']>;
  due_date?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  owned_by?: Maybe<Scalars['String']>;
  project_provider_id?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  status?: Maybe<Scalars['String']>;
  sub_type?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** update columns of table "events.issues" */
export enum Events_Issues_Update_Column {
  /** column name */
  AssignedTo = 'assigned_to',
  /** column name */
  AssignedToType = 'assigned_to_type',
  /** column name */
  DueDate = 'due_date',
  /** column name */
  Id = 'id',
  /** column name */
  OwnedBy = 'owned_by',
  /** column name */
  ProjectProviderId = 'project_provider_id',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ScannedAt = 'scanned_at',
  /** column name */
  Status = 'status',
  /** column name */
  SubType = 'sub_type',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type'
}

/** columns and relationships of "events.scans" */
export type Events_Scans = {
  __typename?: 'events_scans';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  initiating_user_id: Scalars['uuid'];
  project_name: Scalars['String'];
  project_provider_id: Scalars['String'];
  /** An object relationship */
  user: Events_Users;
};

/** aggregated selection of "events.scans" */
export type Events_Scans_Aggregate = {
  __typename?: 'events_scans_aggregate';
  aggregate?: Maybe<Events_Scans_Aggregate_Fields>;
  nodes: Array<Events_Scans>;
};

/** aggregate fields of "events.scans" */
export type Events_Scans_Aggregate_Fields = {
  __typename?: 'events_scans_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Events_Scans_Max_Fields>;
  min?: Maybe<Events_Scans_Min_Fields>;
};


/** aggregate fields of "events.scans" */
export type Events_Scans_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_Scans_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "events.scans" */
export type Events_Scans_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Events_Scans_Max_Order_By>;
  min?: Maybe<Events_Scans_Min_Order_By>;
};

/** input type for inserting array relation for remote table "events.scans" */
export type Events_Scans_Arr_Rel_Insert_Input = {
  data: Array<Events_Scans_Insert_Input>;
  on_conflict?: Maybe<Events_Scans_On_Conflict>;
};

/** Boolean expression to filter rows from the table "events.scans". All fields are combined with a logical 'AND'. */
export type Events_Scans_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Events_Scans_Bool_Exp>>>;
  _not?: Maybe<Events_Scans_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Events_Scans_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  initiating_user_id?: Maybe<Uuid_Comparison_Exp>;
  project_name?: Maybe<String_Comparison_Exp>;
  project_provider_id?: Maybe<String_Comparison_Exp>;
  user?: Maybe<Events_Users_Bool_Exp>;
};

/** unique or primary key constraints on table "events.scans" */
export enum Events_Scans_Constraint {
  /** unique or primary key constraint */
  ScansPkey = 'scans_pkey'
}

/** input type for inserting data into table "events.scans" */
export type Events_Scans_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initiating_user_id?: Maybe<Scalars['uuid']>;
  project_name?: Maybe<Scalars['String']>;
  project_provider_id?: Maybe<Scalars['String']>;
  user?: Maybe<Events_Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Events_Scans_Max_Fields = {
  __typename?: 'events_scans_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initiating_user_id?: Maybe<Scalars['uuid']>;
  project_name?: Maybe<Scalars['String']>;
  project_provider_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "events.scans" */
export type Events_Scans_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiating_user_id?: Maybe<Order_By>;
  project_name?: Maybe<Order_By>;
  project_provider_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Scans_Min_Fields = {
  __typename?: 'events_scans_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initiating_user_id?: Maybe<Scalars['uuid']>;
  project_name?: Maybe<Scalars['String']>;
  project_provider_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "events.scans" */
export type Events_Scans_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiating_user_id?: Maybe<Order_By>;
  project_name?: Maybe<Order_By>;
  project_provider_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "events.scans" */
export type Events_Scans_Mutation_Response = {
  __typename?: 'events_scans_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Events_Scans>;
};

/** input type for inserting object relation for remote table "events.scans" */
export type Events_Scans_Obj_Rel_Insert_Input = {
  data: Events_Scans_Insert_Input;
  on_conflict?: Maybe<Events_Scans_On_Conflict>;
};

/** on conflict condition type for table "events.scans" */
export type Events_Scans_On_Conflict = {
  constraint: Events_Scans_Constraint;
  update_columns: Array<Events_Scans_Update_Column>;
  where?: Maybe<Events_Scans_Bool_Exp>;
};

/** ordering options when selecting data from "events.scans" */
export type Events_Scans_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initiating_user_id?: Maybe<Order_By>;
  project_name?: Maybe<Order_By>;
  project_provider_id?: Maybe<Order_By>;
  user?: Maybe<Events_Users_Order_By>;
};

/** primary key columns input for table: "events.scans" */
export type Events_Scans_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "events.scans" */
export enum Events_Scans_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InitiatingUserId = 'initiating_user_id',
  /** column name */
  ProjectName = 'project_name',
  /** column name */
  ProjectProviderId = 'project_provider_id'
}

/** input type for updating data in table "events.scans" */
export type Events_Scans_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initiating_user_id?: Maybe<Scalars['uuid']>;
  project_name?: Maybe<Scalars['String']>;
  project_provider_id?: Maybe<Scalars['String']>;
};

/** update columns of table "events.scans" */
export enum Events_Scans_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InitiatingUserId = 'initiating_user_id',
  /** column name */
  ProjectName = 'project_name',
  /** column name */
  ProjectProviderId = 'project_provider_id'
}

/** columns and relationships of "events.users" */
export type Events_Users = {
  __typename?: 'events_users';
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  last_name?: Maybe<Scalars['String']>;
  modified_at: Scalars['timestamptz'];
  profile_img_url?: Maybe<Scalars['String']>;
  provider_id: Scalars['String'];
  scanned_at?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  scans: Array<Events_Scans>;
  /** An aggregated array relationship */
  scans_aggregate: Events_Scans_Aggregate;
};


/** columns and relationships of "events.users" */
export type Events_UsersScansArgs = {
  distinct_on?: Maybe<Array<Events_Scans_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Scans_Order_By>>;
  where?: Maybe<Events_Scans_Bool_Exp>;
};


/** columns and relationships of "events.users" */
export type Events_UsersScans_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Scans_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Scans_Order_By>>;
  where?: Maybe<Events_Scans_Bool_Exp>;
};

/** aggregated selection of "events.users" */
export type Events_Users_Aggregate = {
  __typename?: 'events_users_aggregate';
  aggregate?: Maybe<Events_Users_Aggregate_Fields>;
  nodes: Array<Events_Users>;
};

/** aggregate fields of "events.users" */
export type Events_Users_Aggregate_Fields = {
  __typename?: 'events_users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Events_Users_Max_Fields>;
  min?: Maybe<Events_Users_Min_Fields>;
};


/** aggregate fields of "events.users" */
export type Events_Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "events.users" */
export type Events_Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Events_Users_Max_Order_By>;
  min?: Maybe<Events_Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "events.users" */
export type Events_Users_Arr_Rel_Insert_Input = {
  data: Array<Events_Users_Insert_Input>;
  on_conflict?: Maybe<Events_Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "events.users". All fields are combined with a logical 'AND'. */
export type Events_Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Events_Users_Bool_Exp>>>;
  _not?: Maybe<Events_Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Events_Users_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  first_name?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  last_name?: Maybe<String_Comparison_Exp>;
  modified_at?: Maybe<Timestamptz_Comparison_Exp>;
  profile_img_url?: Maybe<String_Comparison_Exp>;
  provider_id?: Maybe<String_Comparison_Exp>;
  scanned_at?: Maybe<Timestamptz_Comparison_Exp>;
  scans?: Maybe<Events_Scans_Bool_Exp>;
};

/** unique or primary key constraints on table "events.users" */
export enum Events_Users_Constraint {
  /** unique or primary key constraint */
  UsersEmailUnique = 'users_email_unique',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint */
  UsersProviderIdUnique = 'users_provider_id_unique'
}

/** input type for inserting data into table "events.users" */
export type Events_Users_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  modified_at?: Maybe<Scalars['timestamptz']>;
  profile_img_url?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
  scans?: Maybe<Events_Scans_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Events_Users_Max_Fields = {
  __typename?: 'events_users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  modified_at?: Maybe<Scalars['timestamptz']>;
  profile_img_url?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "events.users" */
export type Events_Users_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  modified_at?: Maybe<Order_By>;
  profile_img_url?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Users_Min_Fields = {
  __typename?: 'events_users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  modified_at?: Maybe<Scalars['timestamptz']>;
  profile_img_url?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "events.users" */
export type Events_Users_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  modified_at?: Maybe<Order_By>;
  profile_img_url?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "events.users" */
export type Events_Users_Mutation_Response = {
  __typename?: 'events_users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Events_Users>;
};

/** input type for inserting object relation for remote table "events.users" */
export type Events_Users_Obj_Rel_Insert_Input = {
  data: Events_Users_Insert_Input;
  on_conflict?: Maybe<Events_Users_On_Conflict>;
};

/** on conflict condition type for table "events.users" */
export type Events_Users_On_Conflict = {
  constraint: Events_Users_Constraint;
  update_columns: Array<Events_Users_Update_Column>;
  where?: Maybe<Events_Users_Bool_Exp>;
};

/** ordering options when selecting data from "events.users" */
export type Events_Users_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  modified_at?: Maybe<Order_By>;
  profile_img_url?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
  scanned_at?: Maybe<Order_By>;
  scans_aggregate?: Maybe<Events_Scans_Aggregate_Order_By>;
};

/** primary key columns input for table: "events.users" */
export type Events_Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "events.users" */
export enum Events_Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  ModifiedAt = 'modified_at',
  /** column name */
  ProfileImgUrl = 'profile_img_url',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ScannedAt = 'scanned_at'
}

/** input type for updating data in table "events.users" */
export type Events_Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  last_name?: Maybe<Scalars['String']>;
  modified_at?: Maybe<Scalars['timestamptz']>;
  profile_img_url?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  scanned_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "events.users" */
export enum Events_Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  ModifiedAt = 'modified_at',
  /** column name */
  ProfileImgUrl = 'profile_img_url',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  ScannedAt = 'scanned_at'
}

/** columns and relationships of "events.v_issue_custom_attributes" */
export type Events_V_Issue_Custom_Attributes = {
  __typename?: 'events_v_issue_custom_attributes';
  attributes?: Maybe<Scalars['_text']>;
  id?: Maybe<Scalars['uuid']>;
  provider_id?: Maybe<Scalars['String']>;
};

/** aggregated selection of "events.v_issue_custom_attributes" */
export type Events_V_Issue_Custom_Attributes_Aggregate = {
  __typename?: 'events_v_issue_custom_attributes_aggregate';
  aggregate?: Maybe<Events_V_Issue_Custom_Attributes_Aggregate_Fields>;
  nodes: Array<Events_V_Issue_Custom_Attributes>;
};

/** aggregate fields of "events.v_issue_custom_attributes" */
export type Events_V_Issue_Custom_Attributes_Aggregate_Fields = {
  __typename?: 'events_v_issue_custom_attributes_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Events_V_Issue_Custom_Attributes_Max_Fields>;
  min?: Maybe<Events_V_Issue_Custom_Attributes_Min_Fields>;
};


/** aggregate fields of "events.v_issue_custom_attributes" */
export type Events_V_Issue_Custom_Attributes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Events_V_Issue_Custom_Attributes_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "events.v_issue_custom_attributes" */
export type Events_V_Issue_Custom_Attributes_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Events_V_Issue_Custom_Attributes_Max_Order_By>;
  min?: Maybe<Events_V_Issue_Custom_Attributes_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "events.v_issue_custom_attributes". All fields are combined with a logical 'AND'. */
export type Events_V_Issue_Custom_Attributes_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Events_V_Issue_Custom_Attributes_Bool_Exp>>>;
  _not?: Maybe<Events_V_Issue_Custom_Attributes_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Events_V_Issue_Custom_Attributes_Bool_Exp>>>;
  attributes?: Maybe<_Text_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  provider_id?: Maybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Events_V_Issue_Custom_Attributes_Max_Fields = {
  __typename?: 'events_v_issue_custom_attributes_max_fields';
  id?: Maybe<Scalars['uuid']>;
  provider_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "events.v_issue_custom_attributes" */
export type Events_V_Issue_Custom_Attributes_Max_Order_By = {
  id?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Events_V_Issue_Custom_Attributes_Min_Fields = {
  __typename?: 'events_v_issue_custom_attributes_min_fields';
  id?: Maybe<Scalars['uuid']>;
  provider_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "events.v_issue_custom_attributes" */
export type Events_V_Issue_Custom_Attributes_Min_Order_By = {
  id?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
};

/** ordering options when selecting data from "events.v_issue_custom_attributes" */
export type Events_V_Issue_Custom_Attributes_Order_By = {
  attributes?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  provider_id?: Maybe<Order_By>;
};

/** select columns of table "events.v_issue_custom_attributes" */
export enum Events_V_Issue_Custom_Attributes_Select_Column {
  /** column name */
  Attributes = 'attributes',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'provider_id'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "events.access_tokens" */
  delete_events_access_tokens?: Maybe<Events_Access_Tokens_Mutation_Response>;
  /** delete single row from the table: "events.access_tokens" */
  delete_events_access_tokens_by_pk?: Maybe<Events_Access_Tokens>;
  /** delete data from the table: "events.custom_attributes" */
  delete_events_custom_attributes?: Maybe<Events_Custom_Attributes_Mutation_Response>;
  /** delete single row from the table: "events.custom_attributes" */
  delete_events_custom_attributes_by_pk?: Maybe<Events_Custom_Attributes>;
  /** delete data from the table: "events.issue_comments" */
  delete_events_issue_comments?: Maybe<Events_Issue_Comments_Mutation_Response>;
  /** delete single row from the table: "events.issue_comments" */
  delete_events_issue_comments_by_pk?: Maybe<Events_Issue_Comments>;
  /** delete data from the table: "events.issue_custom_attributes" */
  delete_events_issue_custom_attributes?: Maybe<Events_Issue_Custom_Attributes_Mutation_Response>;
  /** delete single row from the table: "events.issue_custom_attributes" */
  delete_events_issue_custom_attributes_by_pk?: Maybe<Events_Issue_Custom_Attributes>;
  /** delete data from the table: "events.issues" */
  delete_events_issues?: Maybe<Events_Issues_Mutation_Response>;
  /** delete single row from the table: "events.issues" */
  delete_events_issues_by_pk?: Maybe<Events_Issues>;
  /** delete data from the table: "events.scans" */
  delete_events_scans?: Maybe<Events_Scans_Mutation_Response>;
  /** delete single row from the table: "events.scans" */
  delete_events_scans_by_pk?: Maybe<Events_Scans>;
  /** delete data from the table: "events.users" */
  delete_events_users?: Maybe<Events_Users_Mutation_Response>;
  /** delete single row from the table: "events.users" */
  delete_events_users_by_pk?: Maybe<Events_Users>;
  /** insert data into the table: "events.access_tokens" */
  insert_events_access_tokens?: Maybe<Events_Access_Tokens_Mutation_Response>;
  /** insert a single row into the table: "events.access_tokens" */
  insert_events_access_tokens_one?: Maybe<Events_Access_Tokens>;
  /** insert data into the table: "events.custom_attributes" */
  insert_events_custom_attributes?: Maybe<Events_Custom_Attributes_Mutation_Response>;
  /** insert a single row into the table: "events.custom_attributes" */
  insert_events_custom_attributes_one?: Maybe<Events_Custom_Attributes>;
  /** insert data into the table: "events.issue_comments" */
  insert_events_issue_comments?: Maybe<Events_Issue_Comments_Mutation_Response>;
  /** insert a single row into the table: "events.issue_comments" */
  insert_events_issue_comments_one?: Maybe<Events_Issue_Comments>;
  /** insert data into the table: "events.issue_custom_attributes" */
  insert_events_issue_custom_attributes?: Maybe<Events_Issue_Custom_Attributes_Mutation_Response>;
  /** insert a single row into the table: "events.issue_custom_attributes" */
  insert_events_issue_custom_attributes_one?: Maybe<Events_Issue_Custom_Attributes>;
  /** insert data into the table: "events.issues" */
  insert_events_issues?: Maybe<Events_Issues_Mutation_Response>;
  /** insert a single row into the table: "events.issues" */
  insert_events_issues_one?: Maybe<Events_Issues>;
  /** insert data into the table: "events.scans" */
  insert_events_scans?: Maybe<Events_Scans_Mutation_Response>;
  /** insert a single row into the table: "events.scans" */
  insert_events_scans_one?: Maybe<Events_Scans>;
  /** insert data into the table: "events.users" */
  insert_events_users?: Maybe<Events_Users_Mutation_Response>;
  /** insert a single row into the table: "events.users" */
  insert_events_users_one?: Maybe<Events_Users>;
  /** update data of the table: "events.access_tokens" */
  update_events_access_tokens?: Maybe<Events_Access_Tokens_Mutation_Response>;
  /** update single row of the table: "events.access_tokens" */
  update_events_access_tokens_by_pk?: Maybe<Events_Access_Tokens>;
  /** update data of the table: "events.custom_attributes" */
  update_events_custom_attributes?: Maybe<Events_Custom_Attributes_Mutation_Response>;
  /** update single row of the table: "events.custom_attributes" */
  update_events_custom_attributes_by_pk?: Maybe<Events_Custom_Attributes>;
  /** update data of the table: "events.issue_comments" */
  update_events_issue_comments?: Maybe<Events_Issue_Comments_Mutation_Response>;
  /** update single row of the table: "events.issue_comments" */
  update_events_issue_comments_by_pk?: Maybe<Events_Issue_Comments>;
  /** update data of the table: "events.issue_custom_attributes" */
  update_events_issue_custom_attributes?: Maybe<Events_Issue_Custom_Attributes_Mutation_Response>;
  /** update single row of the table: "events.issue_custom_attributes" */
  update_events_issue_custom_attributes_by_pk?: Maybe<Events_Issue_Custom_Attributes>;
  /** update data of the table: "events.issues" */
  update_events_issues?: Maybe<Events_Issues_Mutation_Response>;
  /** update single row of the table: "events.issues" */
  update_events_issues_by_pk?: Maybe<Events_Issues>;
  /** update data of the table: "events.scans" */
  update_events_scans?: Maybe<Events_Scans_Mutation_Response>;
  /** update single row of the table: "events.scans" */
  update_events_scans_by_pk?: Maybe<Events_Scans>;
  /** update data of the table: "events.users" */
  update_events_users?: Maybe<Events_Users_Mutation_Response>;
  /** update single row of the table: "events.users" */
  update_events_users_by_pk?: Maybe<Events_Users>;
};


/** mutation root */
export type Mutation_RootDelete_Events_Access_TokensArgs = {
  where: Events_Access_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_Access_Tokens_By_PkArgs = {
  user_provider_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Events_Custom_AttributesArgs = {
  where: Events_Custom_Attributes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_Custom_Attributes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Events_Issue_CommentsArgs = {
  where: Events_Issue_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_Issue_Comments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Events_Issue_Custom_AttributesArgs = {
  where: Events_Issue_Custom_Attributes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_Issue_Custom_Attributes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Events_IssuesArgs = {
  where: Events_Issues_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_Issues_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Events_ScansArgs = {
  where: Events_Scans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_Scans_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Events_UsersArgs = {
  where: Events_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_Events_Access_TokensArgs = {
  objects: Array<Events_Access_Tokens_Insert_Input>;
  on_conflict?: Maybe<Events_Access_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_Access_Tokens_OneArgs = {
  object: Events_Access_Tokens_Insert_Input;
  on_conflict?: Maybe<Events_Access_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_Custom_AttributesArgs = {
  objects: Array<Events_Custom_Attributes_Insert_Input>;
  on_conflict?: Maybe<Events_Custom_Attributes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_Custom_Attributes_OneArgs = {
  object: Events_Custom_Attributes_Insert_Input;
  on_conflict?: Maybe<Events_Custom_Attributes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_Issue_CommentsArgs = {
  objects: Array<Events_Issue_Comments_Insert_Input>;
  on_conflict?: Maybe<Events_Issue_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_Issue_Comments_OneArgs = {
  object: Events_Issue_Comments_Insert_Input;
  on_conflict?: Maybe<Events_Issue_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_Issue_Custom_AttributesArgs = {
  objects: Array<Events_Issue_Custom_Attributes_Insert_Input>;
  on_conflict?: Maybe<Events_Issue_Custom_Attributes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_Issue_Custom_Attributes_OneArgs = {
  object: Events_Issue_Custom_Attributes_Insert_Input;
  on_conflict?: Maybe<Events_Issue_Custom_Attributes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_IssuesArgs = {
  objects: Array<Events_Issues_Insert_Input>;
  on_conflict?: Maybe<Events_Issues_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_Issues_OneArgs = {
  object: Events_Issues_Insert_Input;
  on_conflict?: Maybe<Events_Issues_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_ScansArgs = {
  objects: Array<Events_Scans_Insert_Input>;
  on_conflict?: Maybe<Events_Scans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_Scans_OneArgs = {
  object: Events_Scans_Insert_Input;
  on_conflict?: Maybe<Events_Scans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_UsersArgs = {
  objects: Array<Events_Users_Insert_Input>;
  on_conflict?: Maybe<Events_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_Users_OneArgs = {
  object: Events_Users_Insert_Input;
  on_conflict?: Maybe<Events_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Access_TokensArgs = {
  _set?: Maybe<Events_Access_Tokens_Set_Input>;
  where: Events_Access_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Access_Tokens_By_PkArgs = {
  _set?: Maybe<Events_Access_Tokens_Set_Input>;
  pk_columns: Events_Access_Tokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Custom_AttributesArgs = {
  _set?: Maybe<Events_Custom_Attributes_Set_Input>;
  where: Events_Custom_Attributes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Custom_Attributes_By_PkArgs = {
  _set?: Maybe<Events_Custom_Attributes_Set_Input>;
  pk_columns: Events_Custom_Attributes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Issue_CommentsArgs = {
  _set?: Maybe<Events_Issue_Comments_Set_Input>;
  where: Events_Issue_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Issue_Comments_By_PkArgs = {
  _set?: Maybe<Events_Issue_Comments_Set_Input>;
  pk_columns: Events_Issue_Comments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Issue_Custom_AttributesArgs = {
  _set?: Maybe<Events_Issue_Custom_Attributes_Set_Input>;
  where: Events_Issue_Custom_Attributes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Issue_Custom_Attributes_By_PkArgs = {
  _set?: Maybe<Events_Issue_Custom_Attributes_Set_Input>;
  pk_columns: Events_Issue_Custom_Attributes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Events_IssuesArgs = {
  _set?: Maybe<Events_Issues_Set_Input>;
  where: Events_Issues_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Issues_By_PkArgs = {
  _set?: Maybe<Events_Issues_Set_Input>;
  pk_columns: Events_Issues_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Events_ScansArgs = {
  _set?: Maybe<Events_Scans_Set_Input>;
  where: Events_Scans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Scans_By_PkArgs = {
  _set?: Maybe<Events_Scans_Set_Input>;
  pk_columns: Events_Scans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Events_UsersArgs = {
  _set?: Maybe<Events_Users_Set_Input>;
  where: Events_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_Users_By_PkArgs = {
  _set?: Maybe<Events_Users_Set_Input>;
  pk_columns: Events_Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "events.access_tokens" */
  events_access_tokens: Array<Events_Access_Tokens>;
  /** fetch aggregated fields from the table: "events.access_tokens" */
  events_access_tokens_aggregate: Events_Access_Tokens_Aggregate;
  /** fetch data from the table: "events.access_tokens" using primary key columns */
  events_access_tokens_by_pk?: Maybe<Events_Access_Tokens>;
  /** fetch data from the table: "events.custom_attributes" */
  events_custom_attributes: Array<Events_Custom_Attributes>;
  /** fetch aggregated fields from the table: "events.custom_attributes" */
  events_custom_attributes_aggregate: Events_Custom_Attributes_Aggregate;
  /** fetch data from the table: "events.custom_attributes" using primary key columns */
  events_custom_attributes_by_pk?: Maybe<Events_Custom_Attributes>;
  /** fetch data from the table: "events.issue_comments" */
  events_issue_comments: Array<Events_Issue_Comments>;
  /** fetch aggregated fields from the table: "events.issue_comments" */
  events_issue_comments_aggregate: Events_Issue_Comments_Aggregate;
  /** fetch data from the table: "events.issue_comments" using primary key columns */
  events_issue_comments_by_pk?: Maybe<Events_Issue_Comments>;
  /** fetch data from the table: "events.issue_custom_attributes" */
  events_issue_custom_attributes: Array<Events_Issue_Custom_Attributes>;
  /** fetch aggregated fields from the table: "events.issue_custom_attributes" */
  events_issue_custom_attributes_aggregate: Events_Issue_Custom_Attributes_Aggregate;
  /** fetch data from the table: "events.issue_custom_attributes" using primary key columns */
  events_issue_custom_attributes_by_pk?: Maybe<Events_Issue_Custom_Attributes>;
  /** fetch data from the table: "events.issues" */
  events_issues: Array<Events_Issues>;
  /** fetch aggregated fields from the table: "events.issues" */
  events_issues_aggregate: Events_Issues_Aggregate;
  /** fetch data from the table: "events.issues" using primary key columns */
  events_issues_by_pk?: Maybe<Events_Issues>;
  /** fetch data from the table: "events.scans" */
  events_scans: Array<Events_Scans>;
  /** fetch aggregated fields from the table: "events.scans" */
  events_scans_aggregate: Events_Scans_Aggregate;
  /** fetch data from the table: "events.scans" using primary key columns */
  events_scans_by_pk?: Maybe<Events_Scans>;
  /** fetch data from the table: "events.users" */
  events_users: Array<Events_Users>;
  /** fetch aggregated fields from the table: "events.users" */
  events_users_aggregate: Events_Users_Aggregate;
  /** fetch data from the table: "events.users" using primary key columns */
  events_users_by_pk?: Maybe<Events_Users>;
  /** fetch data from the table: "events.v_issue_custom_attributes" */
  events_v_issue_custom_attributes: Array<Events_V_Issue_Custom_Attributes>;
  /** fetch aggregated fields from the table: "events.v_issue_custom_attributes" */
  events_v_issue_custom_attributes_aggregate: Events_V_Issue_Custom_Attributes_Aggregate;
};


/** query root */
export type Query_RootEvents_Access_TokensArgs = {
  distinct_on?: Maybe<Array<Events_Access_Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Access_Tokens_Order_By>>;
  where?: Maybe<Events_Access_Tokens_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Access_Tokens_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Access_Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Access_Tokens_Order_By>>;
  where?: Maybe<Events_Access_Tokens_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Access_Tokens_By_PkArgs = {
  user_provider_id: Scalars['String'];
};


/** query root */
export type Query_RootEvents_Custom_AttributesArgs = {
  distinct_on?: Maybe<Array<Events_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_Custom_Attributes_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Custom_Attributes_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_Custom_Attributes_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Custom_Attributes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootEvents_Issue_CommentsArgs = {
  distinct_on?: Maybe<Array<Events_Issue_Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issue_Comments_Order_By>>;
  where?: Maybe<Events_Issue_Comments_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Issue_Comments_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Issue_Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issue_Comments_Order_By>>;
  where?: Maybe<Events_Issue_Comments_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Issue_Comments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootEvents_Issue_Custom_AttributesArgs = {
  distinct_on?: Maybe<Array<Events_Issue_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issue_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_Issue_Custom_Attributes_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Issue_Custom_Attributes_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Issue_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issue_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_Issue_Custom_Attributes_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Issue_Custom_Attributes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootEvents_IssuesArgs = {
  distinct_on?: Maybe<Array<Events_Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issues_Order_By>>;
  where?: Maybe<Events_Issues_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Issues_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issues_Order_By>>;
  where?: Maybe<Events_Issues_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Issues_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootEvents_ScansArgs = {
  distinct_on?: Maybe<Array<Events_Scans_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Scans_Order_By>>;
  where?: Maybe<Events_Scans_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Scans_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Scans_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Scans_Order_By>>;
  where?: Maybe<Events_Scans_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Scans_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootEvents_UsersArgs = {
  distinct_on?: Maybe<Array<Events_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Users_Order_By>>;
  where?: Maybe<Events_Users_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Users_Order_By>>;
  where?: Maybe<Events_Users_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootEvents_V_Issue_Custom_AttributesArgs = {
  distinct_on?: Maybe<Array<Events_V_Issue_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_V_Issue_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_V_Issue_Custom_Attributes_Bool_Exp>;
};


/** query root */
export type Query_RootEvents_V_Issue_Custom_Attributes_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_V_Issue_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_V_Issue_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_V_Issue_Custom_Attributes_Bool_Exp>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "events.access_tokens" */
  events_access_tokens: Array<Events_Access_Tokens>;
  /** fetch aggregated fields from the table: "events.access_tokens" */
  events_access_tokens_aggregate: Events_Access_Tokens_Aggregate;
  /** fetch data from the table: "events.access_tokens" using primary key columns */
  events_access_tokens_by_pk?: Maybe<Events_Access_Tokens>;
  /** fetch data from the table: "events.custom_attributes" */
  events_custom_attributes: Array<Events_Custom_Attributes>;
  /** fetch aggregated fields from the table: "events.custom_attributes" */
  events_custom_attributes_aggregate: Events_Custom_Attributes_Aggregate;
  /** fetch data from the table: "events.custom_attributes" using primary key columns */
  events_custom_attributes_by_pk?: Maybe<Events_Custom_Attributes>;
  /** fetch data from the table: "events.issue_comments" */
  events_issue_comments: Array<Events_Issue_Comments>;
  /** fetch aggregated fields from the table: "events.issue_comments" */
  events_issue_comments_aggregate: Events_Issue_Comments_Aggregate;
  /** fetch data from the table: "events.issue_comments" using primary key columns */
  events_issue_comments_by_pk?: Maybe<Events_Issue_Comments>;
  /** fetch data from the table: "events.issue_custom_attributes" */
  events_issue_custom_attributes: Array<Events_Issue_Custom_Attributes>;
  /** fetch aggregated fields from the table: "events.issue_custom_attributes" */
  events_issue_custom_attributes_aggregate: Events_Issue_Custom_Attributes_Aggregate;
  /** fetch data from the table: "events.issue_custom_attributes" using primary key columns */
  events_issue_custom_attributes_by_pk?: Maybe<Events_Issue_Custom_Attributes>;
  /** fetch data from the table: "events.issues" */
  events_issues: Array<Events_Issues>;
  /** fetch aggregated fields from the table: "events.issues" */
  events_issues_aggregate: Events_Issues_Aggregate;
  /** fetch data from the table: "events.issues" using primary key columns */
  events_issues_by_pk?: Maybe<Events_Issues>;
  /** fetch data from the table: "events.scans" */
  events_scans: Array<Events_Scans>;
  /** fetch aggregated fields from the table: "events.scans" */
  events_scans_aggregate: Events_Scans_Aggregate;
  /** fetch data from the table: "events.scans" using primary key columns */
  events_scans_by_pk?: Maybe<Events_Scans>;
  /** fetch data from the table: "events.users" */
  events_users: Array<Events_Users>;
  /** fetch aggregated fields from the table: "events.users" */
  events_users_aggregate: Events_Users_Aggregate;
  /** fetch data from the table: "events.users" using primary key columns */
  events_users_by_pk?: Maybe<Events_Users>;
  /** fetch data from the table: "events.v_issue_custom_attributes" */
  events_v_issue_custom_attributes: Array<Events_V_Issue_Custom_Attributes>;
  /** fetch aggregated fields from the table: "events.v_issue_custom_attributes" */
  events_v_issue_custom_attributes_aggregate: Events_V_Issue_Custom_Attributes_Aggregate;
};


/** subscription root */
export type Subscription_RootEvents_Access_TokensArgs = {
  distinct_on?: Maybe<Array<Events_Access_Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Access_Tokens_Order_By>>;
  where?: Maybe<Events_Access_Tokens_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Access_Tokens_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Access_Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Access_Tokens_Order_By>>;
  where?: Maybe<Events_Access_Tokens_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Access_Tokens_By_PkArgs = {
  user_provider_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootEvents_Custom_AttributesArgs = {
  distinct_on?: Maybe<Array<Events_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_Custom_Attributes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Custom_Attributes_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_Custom_Attributes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Custom_Attributes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootEvents_Issue_CommentsArgs = {
  distinct_on?: Maybe<Array<Events_Issue_Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issue_Comments_Order_By>>;
  where?: Maybe<Events_Issue_Comments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Issue_Comments_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Issue_Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issue_Comments_Order_By>>;
  where?: Maybe<Events_Issue_Comments_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Issue_Comments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootEvents_Issue_Custom_AttributesArgs = {
  distinct_on?: Maybe<Array<Events_Issue_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issue_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_Issue_Custom_Attributes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Issue_Custom_Attributes_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Issue_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issue_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_Issue_Custom_Attributes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Issue_Custom_Attributes_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootEvents_IssuesArgs = {
  distinct_on?: Maybe<Array<Events_Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issues_Order_By>>;
  where?: Maybe<Events_Issues_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Issues_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Issues_Order_By>>;
  where?: Maybe<Events_Issues_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Issues_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootEvents_ScansArgs = {
  distinct_on?: Maybe<Array<Events_Scans_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Scans_Order_By>>;
  where?: Maybe<Events_Scans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Scans_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Scans_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Scans_Order_By>>;
  where?: Maybe<Events_Scans_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Scans_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootEvents_UsersArgs = {
  distinct_on?: Maybe<Array<Events_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Users_Order_By>>;
  where?: Maybe<Events_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_Users_Order_By>>;
  where?: Maybe<Events_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootEvents_V_Issue_Custom_AttributesArgs = {
  distinct_on?: Maybe<Array<Events_V_Issue_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_V_Issue_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_V_Issue_Custom_Attributes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootEvents_V_Issue_Custom_Attributes_AggregateArgs = {
  distinct_on?: Maybe<Array<Events_V_Issue_Custom_Attributes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Events_V_Issue_Custom_Attributes_Order_By>>;
  where?: Maybe<Events_V_Issue_Custom_Attributes_Bool_Exp>;
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type EventsScansQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsScansQuery = (
  { __typename?: 'query_root' }
  & { events_scans: Array<(
    { __typename?: 'events_scans' }
    & Pick<Events_Scans, 'id' | 'project_name'>
  )> }
);


export const EventsScansDocument = gql`
    query EventsScans {
  events_scans(distinct_on: project_provider_id) {
    id
    project_name
  }
}
    `;

/**
 * __useEventsScansQuery__
 *
 * To run a query within a React component, call `useEventsScansQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsScansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsScansQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsScansQuery(baseOptions?: Apollo.QueryHookOptions<EventsScansQuery, EventsScansQueryVariables>) {
        return Apollo.useQuery<EventsScansQuery, EventsScansQueryVariables>(EventsScansDocument, baseOptions);
      }
export function useEventsScansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsScansQuery, EventsScansQueryVariables>) {
          return Apollo.useLazyQuery<EventsScansQuery, EventsScansQueryVariables>(EventsScansDocument, baseOptions);
        }
export type EventsScansQueryHookResult = ReturnType<typeof useEventsScansQuery>;
export type EventsScansLazyQueryHookResult = ReturnType<typeof useEventsScansLazyQuery>;
export type EventsScansQueryResult = Apollo.QueryResult<EventsScansQuery, EventsScansQueryVariables>;
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _text: any;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
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
export type TextComparisonExp = {
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

/** columns and relationships of "cases" */
export type Cases = {
   __typename?: 'cases';
  /** The action of this case */
  action: Scalars['Int'];
  /** The duration of this case */
  action_duration?: Maybe<Scalars['timestamptz']>;
  /** Whether this case has been processed or not */
  action_processed?: Maybe<Scalars['Boolean']>;
  /** The case id */
  case_id: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  /** The id of the guild this case belongs to */
  guild: Scalars['String'];
  id: Scalars['uuid'];
  /** The id of the message this case belongs to */
  message?: Maybe<Scalars['String']>;
  /** The id of the moderator this case belongs to */
  mod_id?: Maybe<Scalars['String']>;
  /** The tag of the moderator this case belongs to */
  mod_tag?: Maybe<Scalars['String']>;
  /** The reason of this case */
  reason?: Maybe<Scalars['String']>;
  /** The id of the case this case references */
  ref_id?: Maybe<Scalars['Int']>;
  /** The id of the target this case belongs to */
  target_id: Scalars['String'];
  /** The tag of the target this case belongs to */
  target_tag: Scalars['String'];
};

/** aggregated selection of "cases" */
export type CasesAggregate = {
   __typename?: 'cases_aggregate';
  aggregate?: Maybe<CasesAggregateFields>;
  nodes: Array<Cases>;
};

/** aggregate fields of "cases" */
export type CasesAggregateFields = {
   __typename?: 'cases_aggregate_fields';
  avg?: Maybe<CasesAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<CasesMaxFields>;
  min?: Maybe<CasesMinFields>;
  stddev?: Maybe<CasesStddevFields>;
  stddev_pop?: Maybe<CasesStddevPopFields>;
  stddev_samp?: Maybe<CasesStddevSampFields>;
  sum?: Maybe<CasesSumFields>;
  var_pop?: Maybe<CasesVarPopFields>;
  var_samp?: Maybe<CasesVarSampFields>;
  variance?: Maybe<CasesVarianceFields>;
};


/** aggregate fields of "cases" */
export type CasesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<CasesSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "cases" */
export type CasesAggregateOrderBy = {
  avg?: Maybe<CasesAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<CasesMaxOrderBy>;
  min?: Maybe<CasesMinOrderBy>;
  stddev?: Maybe<CasesStddevOrderBy>;
  stddev_pop?: Maybe<CasesStddevPopOrderBy>;
  stddev_samp?: Maybe<CasesStddevSampOrderBy>;
  sum?: Maybe<CasesSumOrderBy>;
  var_pop?: Maybe<CasesVarPopOrderBy>;
  var_samp?: Maybe<CasesVarSampOrderBy>;
  variance?: Maybe<CasesVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "cases" */
export type CasesArrRelInsertInput = {
  data: Array<CasesInsertInput>;
  on_conflict?: Maybe<CasesOnConflict>;
};

/** aggregate avg on columns */
export type CasesAvgFields = {
   __typename?: 'cases_avg_fields';
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "cases" */
export type CasesAvgOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "cases". All fields are combined with a logical 'AND'. */
export type CasesBoolExp = {
  _and?: Maybe<Array<Maybe<CasesBoolExp>>>;
  _not?: Maybe<CasesBoolExp>;
  _or?: Maybe<Array<Maybe<CasesBoolExp>>>;
  action?: Maybe<IntComparisonExp>;
  action_duration?: Maybe<TimestamptzComparisonExp>;
  action_processed?: Maybe<BooleanComparisonExp>;
  case_id?: Maybe<IntComparisonExp>;
  created_at?: Maybe<TimestamptzComparisonExp>;
  guild?: Maybe<StringComparisonExp>;
  id?: Maybe<UuidComparisonExp>;
  message?: Maybe<StringComparisonExp>;
  mod_id?: Maybe<StringComparisonExp>;
  mod_tag?: Maybe<StringComparisonExp>;
  reason?: Maybe<StringComparisonExp>;
  ref_id?: Maybe<IntComparisonExp>;
  target_id?: Maybe<StringComparisonExp>;
  target_tag?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "cases" */
export enum CasesConstraint {
  /** unique or primary key constraint */
  CasesPkey = 'cases_pkey'
}

/** input type for incrementing integer columne in table "cases" */
export type CasesIncInput = {
  action?: Maybe<Scalars['Int']>;
  case_id?: Maybe<Scalars['Int']>;
  ref_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "cases" */
export type CasesInsertInput = {
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  action_processed?: Maybe<Scalars['Boolean']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type CasesMaxFields = {
   __typename?: 'cases_max_fields';
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "cases" */
export type CasesMaxOrderBy = {
  action?: Maybe<OrderBy>;
  action_duration?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  created_at?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  mod_id?: Maybe<OrderBy>;
  mod_tag?: Maybe<OrderBy>;
  reason?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
  target_id?: Maybe<OrderBy>;
  target_tag?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type CasesMinFields = {
   __typename?: 'cases_min_fields';
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "cases" */
export type CasesMinOrderBy = {
  action?: Maybe<OrderBy>;
  action_duration?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  created_at?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  mod_id?: Maybe<OrderBy>;
  mod_tag?: Maybe<OrderBy>;
  reason?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
  target_id?: Maybe<OrderBy>;
  target_tag?: Maybe<OrderBy>;
};

/** response of any mutation on the table "cases" */
export type CasesMutationResponse = {
   __typename?: 'cases_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Cases>;
};

/** input type for inserting object relation for remote table "cases" */
export type CasesObjRelInsertInput = {
  data: CasesInsertInput;
  on_conflict?: Maybe<CasesOnConflict>;
};

/** on conflict condition type for table "cases" */
export type CasesOnConflict = {
  constraint: CasesConstraint;
  update_columns: Array<CasesUpdateColumn>;
  where?: Maybe<CasesBoolExp>;
};

/** ordering options when selecting data from "cases" */
export type CasesOrderBy = {
  action?: Maybe<OrderBy>;
  action_duration?: Maybe<OrderBy>;
  action_processed?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  created_at?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  mod_id?: Maybe<OrderBy>;
  mod_tag?: Maybe<OrderBy>;
  reason?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
  target_id?: Maybe<OrderBy>;
  target_tag?: Maybe<OrderBy>;
};

/** select columns of table "cases" */
export enum CasesSelectColumn {
  /** column name */
  Action = 'action',
  /** column name */
  ActionDuration = 'action_duration',
  /** column name */
  ActionProcessed = 'action_processed',
  /** column name */
  CaseId = 'case_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  ModId = 'mod_id',
  /** column name */
  ModTag = 'mod_tag',
  /** column name */
  Reason = 'reason',
  /** column name */
  RefId = 'ref_id',
  /** column name */
  TargetId = 'target_id',
  /** column name */
  TargetTag = 'target_tag'
}

/** input type for updating data in table "cases" */
export type CasesSetInput = {
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  action_processed?: Maybe<Scalars['Boolean']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type CasesStddevFields = {
   __typename?: 'cases_stddev_fields';
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "cases" */
export type CasesStddevOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type CasesStddevPopFields = {
   __typename?: 'cases_stddev_pop_fields';
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "cases" */
export type CasesStddevPopOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type CasesStddevSampFields = {
   __typename?: 'cases_stddev_samp_fields';
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "cases" */
export type CasesStddevSampOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type CasesSumFields = {
   __typename?: 'cases_sum_fields';
  action?: Maybe<Scalars['Int']>;
  case_id?: Maybe<Scalars['Int']>;
  ref_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "cases" */
export type CasesSumOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** update columns of table "cases" */
export enum CasesUpdateColumn {
  /** column name */
  Action = 'action',
  /** column name */
  ActionDuration = 'action_duration',
  /** column name */
  ActionProcessed = 'action_processed',
  /** column name */
  CaseId = 'case_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  ModId = 'mod_id',
  /** column name */
  ModTag = 'mod_tag',
  /** column name */
  Reason = 'reason',
  /** column name */
  RefId = 'ref_id',
  /** column name */
  TargetId = 'target_id',
  /** column name */
  TargetTag = 'target_tag'
}

/** aggregate var_pop on columns */
export type CasesVarPopFields = {
   __typename?: 'cases_var_pop_fields';
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "cases" */
export type CasesVarPopOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type CasesVarSampFields = {
   __typename?: 'cases_var_samp_fields';
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "cases" */
export type CasesVarSampOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type CasesVarianceFields = {
   __typename?: 'cases_variance_fields';
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "cases" */
export type CasesVarianceOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "lockdowns" */
export type Lockdowns = {
   __typename?: 'lockdowns';
  /** The id of the channel this lockdown belongs to */
  channel: Scalars['String'];
  /** The duration of the lockdown */
  duration: Scalars['timestamptz'];
  /** The id of the guild this lockdown belongs to */
  guild: Scalars['String'];
  id: Scalars['uuid'];
};

/** aggregated selection of "lockdowns" */
export type LockdownsAggregate = {
   __typename?: 'lockdowns_aggregate';
  aggregate?: Maybe<LockdownsAggregateFields>;
  nodes: Array<Lockdowns>;
};

/** aggregate fields of "lockdowns" */
export type LockdownsAggregateFields = {
   __typename?: 'lockdowns_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<LockdownsMaxFields>;
  min?: Maybe<LockdownsMinFields>;
};


/** aggregate fields of "lockdowns" */
export type LockdownsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<LockdownsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "lockdowns" */
export type LockdownsAggregateOrderBy = {
  count?: Maybe<OrderBy>;
  max?: Maybe<LockdownsMaxOrderBy>;
  min?: Maybe<LockdownsMinOrderBy>;
};

/** input type for inserting array relation for remote table "lockdowns" */
export type LockdownsArrRelInsertInput = {
  data: Array<LockdownsInsertInput>;
  on_conflict?: Maybe<LockdownsOnConflict>;
};

/** Boolean expression to filter rows from the table "lockdowns". All fields are combined with a logical 'AND'. */
export type LockdownsBoolExp = {
  _and?: Maybe<Array<Maybe<LockdownsBoolExp>>>;
  _not?: Maybe<LockdownsBoolExp>;
  _or?: Maybe<Array<Maybe<LockdownsBoolExp>>>;
  channel?: Maybe<StringComparisonExp>;
  duration?: Maybe<TimestamptzComparisonExp>;
  guild?: Maybe<StringComparisonExp>;
  id?: Maybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "lockdowns" */
export enum LockdownsConstraint {
  /** unique or primary key constraint */
  LockdownsGuildChannelKey = 'lockdowns_guild_channel_key',
  /** unique or primary key constraint */
  LockdownsPkey = 'lockdowns_pkey'
}

/** input type for inserting data into table "lockdowns" */
export type LockdownsInsertInput = {
  channel?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type LockdownsMaxFields = {
   __typename?: 'lockdowns_max_fields';
  channel?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "lockdowns" */
export type LockdownsMaxOrderBy = {
  channel?: Maybe<OrderBy>;
  duration?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type LockdownsMinFields = {
   __typename?: 'lockdowns_min_fields';
  channel?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "lockdowns" */
export type LockdownsMinOrderBy = {
  channel?: Maybe<OrderBy>;
  duration?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
};

/** response of any mutation on the table "lockdowns" */
export type LockdownsMutationResponse = {
   __typename?: 'lockdowns_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Lockdowns>;
};

/** input type for inserting object relation for remote table "lockdowns" */
export type LockdownsObjRelInsertInput = {
  data: LockdownsInsertInput;
  on_conflict?: Maybe<LockdownsOnConflict>;
};

/** on conflict condition type for table "lockdowns" */
export type LockdownsOnConflict = {
  constraint: LockdownsConstraint;
  update_columns: Array<LockdownsUpdateColumn>;
  where?: Maybe<LockdownsBoolExp>;
};

/** ordering options when selecting data from "lockdowns" */
export type LockdownsOrderBy = {
  channel?: Maybe<OrderBy>;
  duration?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** select columns of table "lockdowns" */
export enum LockdownsSelectColumn {
  /** column name */
  Channel = 'channel',
  /** column name */
  Duration = 'duration',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "lockdowns" */
export type LockdownsSetInput = {
  channel?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "lockdowns" */
export enum LockdownsUpdateColumn {
  /** column name */
  Channel = 'channel',
  /** column name */
  Duration = 'duration',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id'
}

/** mutation root */
export type MutationRoot = {
   __typename?: 'mutation_root';
  /** delete data from the table: "cases" */
  deleteCases?: Maybe<CasesMutationResponse>;
  /** delete data from the table: "lockdowns" */
  deleteLockdowns?: Maybe<LockdownsMutationResponse>;
  /** delete data from the table: "reactionroles" */
  deleteReactionroles?: Maybe<ReactionrolesMutationResponse>;
  /** delete data from the table: "remindmes" */
  deleteRemindmes?: Maybe<RemindmesMutationResponse>;
  /** delete data from the table: "role_states" */
  deleteRoleStates?: Maybe<RoleStatesMutationResponse>;
  /** delete data from the table: "settings" */
  deleteSettings?: Maybe<SettingsMutationResponse>;
  /** delete data from the table: "tags" */
  deleteTags?: Maybe<TagsMutationResponse>;
  /** insert data into the table: "cases" */
  insertCases?: Maybe<CasesMutationResponse>;
  /** insert data into the table: "lockdowns" */
  insertLockdowns?: Maybe<LockdownsMutationResponse>;
  /** insert data into the table: "reactionroles" */
  insertReactionroles?: Maybe<ReactionrolesMutationResponse>;
  /** insert data into the table: "remindmes" */
  insertRemindmes?: Maybe<RemindmesMutationResponse>;
  /** insert data into the table: "role_states" */
  insertRoleStates?: Maybe<RoleStatesMutationResponse>;
  /** insert data into the table: "settings" */
  insertSettings?: Maybe<SettingsMutationResponse>;
  /** insert data into the table: "tags" */
  insertTags?: Maybe<TagsMutationResponse>;
  /** update data of the table: "cases" */
  updateCases?: Maybe<CasesMutationResponse>;
  /** update data of the table: "lockdowns" */
  updateLockdowns?: Maybe<LockdownsMutationResponse>;
  /** update data of the table: "reactionroles" */
  updateReactionroles?: Maybe<ReactionrolesMutationResponse>;
  /** update data of the table: "remindmes" */
  updateRemindmes?: Maybe<RemindmesMutationResponse>;
  /** update data of the table: "role_states" */
  updateRoleStates?: Maybe<RoleStatesMutationResponse>;
  /** update data of the table: "settings" */
  updateSettings?: Maybe<SettingsMutationResponse>;
  /** update data of the table: "tags" */
  updateTags?: Maybe<TagsMutationResponse>;
};


/** mutation root */
export type MutationRootDeleteCasesArgs = {
  where: CasesBoolExp;
};


/** mutation root */
export type MutationRootDeleteLockdownsArgs = {
  where: LockdownsBoolExp;
};


/** mutation root */
export type MutationRootDeleteReactionrolesArgs = {
  where: ReactionrolesBoolExp;
};


/** mutation root */
export type MutationRootDeleteRemindmesArgs = {
  where: RemindmesBoolExp;
};


/** mutation root */
export type MutationRootDeleteRoleStatesArgs = {
  where: RoleStatesBoolExp;
};


/** mutation root */
export type MutationRootDeleteSettingsArgs = {
  where: SettingsBoolExp;
};


/** mutation root */
export type MutationRootDeleteTagsArgs = {
  where: TagsBoolExp;
};


/** mutation root */
export type MutationRootInsertCasesArgs = {
  objects: Array<CasesInsertInput>;
  on_conflict?: Maybe<CasesOnConflict>;
};


/** mutation root */
export type MutationRootInsertLockdownsArgs = {
  objects: Array<LockdownsInsertInput>;
  on_conflict?: Maybe<LockdownsOnConflict>;
};


/** mutation root */
export type MutationRootInsertReactionrolesArgs = {
  objects: Array<ReactionrolesInsertInput>;
  on_conflict?: Maybe<ReactionrolesOnConflict>;
};


/** mutation root */
export type MutationRootInsertRemindmesArgs = {
  objects: Array<RemindmesInsertInput>;
  on_conflict?: Maybe<RemindmesOnConflict>;
};


/** mutation root */
export type MutationRootInsertRoleStatesArgs = {
  objects: Array<RoleStatesInsertInput>;
  on_conflict?: Maybe<RoleStatesOnConflict>;
};


/** mutation root */
export type MutationRootInsertSettingsArgs = {
  objects: Array<SettingsInsertInput>;
  on_conflict?: Maybe<SettingsOnConflict>;
};


/** mutation root */
export type MutationRootInsertTagsArgs = {
  objects: Array<TagsInsertInput>;
  on_conflict?: Maybe<TagsOnConflict>;
};


/** mutation root */
export type MutationRootUpdateCasesArgs = {
  _inc?: Maybe<CasesIncInput>;
  _set?: Maybe<CasesSetInput>;
  where: CasesBoolExp;
};


/** mutation root */
export type MutationRootUpdateLockdownsArgs = {
  _set?: Maybe<LockdownsSetInput>;
  where: LockdownsBoolExp;
};


/** mutation root */
export type MutationRootUpdateReactionrolesArgs = {
  _append?: Maybe<ReactionrolesAppendInput>;
  _delete_at_path?: Maybe<ReactionrolesDeleteAtPathInput>;
  _delete_elem?: Maybe<ReactionrolesDeleteElemInput>;
  _delete_key?: Maybe<ReactionrolesDeleteKeyInput>;
  _inc?: Maybe<ReactionrolesIncInput>;
  _prepend?: Maybe<ReactionrolesPrependInput>;
  _set?: Maybe<ReactionrolesSetInput>;
  where: ReactionrolesBoolExp;
};


/** mutation root */
export type MutationRootUpdateRemindmesArgs = {
  _inc?: Maybe<RemindmesIncInput>;
  _set?: Maybe<RemindmesSetInput>;
  where: RemindmesBoolExp;
};


/** mutation root */
export type MutationRootUpdateRoleStatesArgs = {
  _set?: Maybe<RoleStatesSetInput>;
  where: RoleStatesBoolExp;
};


/** mutation root */
export type MutationRootUpdateSettingsArgs = {
  _append?: Maybe<SettingsAppendInput>;
  _delete_at_path?: Maybe<SettingsDeleteAtPathInput>;
  _delete_elem?: Maybe<SettingsDeleteElemInput>;
  _delete_key?: Maybe<SettingsDeleteKeyInput>;
  _prepend?: Maybe<SettingsPrependInput>;
  _set?: Maybe<SettingsSetInput>;
  where: SettingsBoolExp;
};


/** mutation root */
export type MutationRootUpdateTagsArgs = {
  _inc?: Maybe<TagsIncInput>;
  _set?: Maybe<TagsSetInput>;
  where: TagsBoolExp;
};

/** column ordering options */
export enum OrderBy {
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
export type QueryRoot = {
   __typename?: 'query_root';
  /** fetch data from the table: "cases" */
  cases: Array<Cases>;
  /** fetch aggregated fields from the table: "cases" */
  casesAggregate: CasesAggregate;
  /** fetch data from the table: "cases" using primary key columns */
  casesByPk?: Maybe<Cases>;
  /** fetch data from the table: "lockdowns" */
  lockdowns: Array<Lockdowns>;
  /** fetch aggregated fields from the table: "lockdowns" */
  lockdownsAggregate: LockdownsAggregate;
  /** fetch data from the table: "lockdowns" using primary key columns */
  lockdownsByPk?: Maybe<Lockdowns>;
  /** fetch data from the table: "reactionroles" */
  reactionroles: Array<Reactionroles>;
  /** fetch aggregated fields from the table: "reactionroles" */
  reactionrolesAggregate: ReactionrolesAggregate;
  /** fetch data from the table: "reactionroles" using primary key columns */
  reactionrolesByPk?: Maybe<Reactionroles>;
  /** fetch data from the table: "remindmes" */
  remindmes: Array<Remindmes>;
  /** fetch aggregated fields from the table: "remindmes" */
  remindmesAggregate: RemindmesAggregate;
  /** fetch data from the table: "remindmes" using primary key columns */
  remindmesByPk?: Maybe<Remindmes>;
  /** fetch data from the table: "role_states" */
  roleStates: Array<RoleStates>;
  /** fetch aggregated fields from the table: "role_states" */
  roleStatesAggregate: RoleStatesAggregate;
  /** fetch data from the table: "role_states" using primary key columns */
  roleStatesByPk?: Maybe<RoleStates>;
  /** fetch data from the table: "settings" */
  settings: Array<Settings>;
  /** fetch aggregated fields from the table: "settings" */
  settingsAggregate: SettingsAggregate;
  /** fetch data from the table: "settings" using primary key columns */
  settingsByPk?: Maybe<Settings>;
  /** fetch data from the table: "tags" */
  tags: Array<Tags>;
  /** fetch aggregated fields from the table: "tags" */
  tagsAggregate: TagsAggregate;
  /** fetch data from the table: "tags" using primary key columns */
  tagsByPk?: Maybe<Tags>;
};


/** query root */
export type QueryRootCasesArgs = {
  distinct_on?: Maybe<Array<CasesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesOrderBy>>;
  where?: Maybe<CasesBoolExp>;
};


/** query root */
export type QueryRootCasesAggregateArgs = {
  distinct_on?: Maybe<Array<CasesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesOrderBy>>;
  where?: Maybe<CasesBoolExp>;
};


/** query root */
export type QueryRootCasesByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type QueryRootLockdownsArgs = {
  distinct_on?: Maybe<Array<LockdownsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LockdownsOrderBy>>;
  where?: Maybe<LockdownsBoolExp>;
};


/** query root */
export type QueryRootLockdownsAggregateArgs = {
  distinct_on?: Maybe<Array<LockdownsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LockdownsOrderBy>>;
  where?: Maybe<LockdownsBoolExp>;
};


/** query root */
export type QueryRootLockdownsByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type QueryRootReactionrolesArgs = {
  distinct_on?: Maybe<Array<ReactionrolesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ReactionrolesOrderBy>>;
  where?: Maybe<ReactionrolesBoolExp>;
};


/** query root */
export type QueryRootReactionrolesAggregateArgs = {
  distinct_on?: Maybe<Array<ReactionrolesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ReactionrolesOrderBy>>;
  where?: Maybe<ReactionrolesBoolExp>;
};


/** query root */
export type QueryRootReactionrolesByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootRemindmesArgs = {
  distinct_on?: Maybe<Array<RemindmesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RemindmesOrderBy>>;
  where?: Maybe<RemindmesBoolExp>;
};


/** query root */
export type QueryRootRemindmesAggregateArgs = {
  distinct_on?: Maybe<Array<RemindmesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RemindmesOrderBy>>;
  where?: Maybe<RemindmesBoolExp>;
};


/** query root */
export type QueryRootRemindmesByPkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type QueryRootRoleStatesArgs = {
  distinct_on?: Maybe<Array<RoleStatesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RoleStatesOrderBy>>;
  where?: Maybe<RoleStatesBoolExp>;
};


/** query root */
export type QueryRootRoleStatesAggregateArgs = {
  distinct_on?: Maybe<Array<RoleStatesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RoleStatesOrderBy>>;
  where?: Maybe<RoleStatesBoolExp>;
};


/** query root */
export type QueryRootRoleStatesByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type QueryRootSettingsArgs = {
  distinct_on?: Maybe<Array<SettingsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsOrderBy>>;
  where?: Maybe<SettingsBoolExp>;
};


/** query root */
export type QueryRootSettingsAggregateArgs = {
  distinct_on?: Maybe<Array<SettingsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsOrderBy>>;
  where?: Maybe<SettingsBoolExp>;
};


/** query root */
export type QueryRootSettingsByPkArgs = {
  guild: Scalars['String'];
};


/** query root */
export type QueryRootTagsArgs = {
  distinct_on?: Maybe<Array<TagsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TagsOrderBy>>;
  where?: Maybe<TagsBoolExp>;
};


/** query root */
export type QueryRootTagsAggregateArgs = {
  distinct_on?: Maybe<Array<TagsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TagsOrderBy>>;
  where?: Maybe<TagsBoolExp>;
};


/** query root */
export type QueryRootTagsByPkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "reactionroles" */
export type Reactionroles = {
   __typename?: 'reactionroles';
  channel: Scalars['String'];
  guild: Scalars['String'];
  id: Scalars['Int'];
  message: Scalars['String'];
  roles: Scalars['jsonb'];
};


/** columns and relationships of "reactionroles" */
export type ReactionrolesRolesArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "reactionroles" */
export type ReactionrolesAggregate = {
   __typename?: 'reactionroles_aggregate';
  aggregate?: Maybe<ReactionrolesAggregateFields>;
  nodes: Array<Reactionroles>;
};

/** aggregate fields of "reactionroles" */
export type ReactionrolesAggregateFields = {
   __typename?: 'reactionroles_aggregate_fields';
  avg?: Maybe<ReactionrolesAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<ReactionrolesMaxFields>;
  min?: Maybe<ReactionrolesMinFields>;
  stddev?: Maybe<ReactionrolesStddevFields>;
  stddev_pop?: Maybe<ReactionrolesStddevPopFields>;
  stddev_samp?: Maybe<ReactionrolesStddevSampFields>;
  sum?: Maybe<ReactionrolesSumFields>;
  var_pop?: Maybe<ReactionrolesVarPopFields>;
  var_samp?: Maybe<ReactionrolesVarSampFields>;
  variance?: Maybe<ReactionrolesVarianceFields>;
};


/** aggregate fields of "reactionroles" */
export type ReactionrolesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ReactionrolesSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "reactionroles" */
export type ReactionrolesAggregateOrderBy = {
  avg?: Maybe<ReactionrolesAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ReactionrolesMaxOrderBy>;
  min?: Maybe<ReactionrolesMinOrderBy>;
  stddev?: Maybe<ReactionrolesStddevOrderBy>;
  stddev_pop?: Maybe<ReactionrolesStddevPopOrderBy>;
  stddev_samp?: Maybe<ReactionrolesStddevSampOrderBy>;
  sum?: Maybe<ReactionrolesSumOrderBy>;
  var_pop?: Maybe<ReactionrolesVarPopOrderBy>;
  var_samp?: Maybe<ReactionrolesVarSampOrderBy>;
  variance?: Maybe<ReactionrolesVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ReactionrolesAppendInput = {
  roles?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "reactionroles" */
export type ReactionrolesArrRelInsertInput = {
  data: Array<ReactionrolesInsertInput>;
  on_conflict?: Maybe<ReactionrolesOnConflict>;
};

/** aggregate avg on columns */
export type ReactionrolesAvgFields = {
   __typename?: 'reactionroles_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "reactionroles" */
export type ReactionrolesAvgOrderBy = {
  id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "reactionroles". All fields are combined with a logical 'AND'. */
export type ReactionrolesBoolExp = {
  _and?: Maybe<Array<Maybe<ReactionrolesBoolExp>>>;
  _not?: Maybe<ReactionrolesBoolExp>;
  _or?: Maybe<Array<Maybe<ReactionrolesBoolExp>>>;
  channel?: Maybe<StringComparisonExp>;
  guild?: Maybe<StringComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  message?: Maybe<StringComparisonExp>;
  roles?: Maybe<JsonbComparisonExp>;
};

/** unique or primary key constraints on table "reactionroles" */
export enum ReactionrolesConstraint {
  /** unique or primary key constraint */
  ReactionrolesPkey = 'reactionroles_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ReactionrolesDeleteAtPathInput = {
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ReactionrolesDeleteElemInput = {
  roles?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ReactionrolesDeleteKeyInput = {
  roles?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer columne in table "reactionroles" */
export type ReactionrolesIncInput = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "reactionroles" */
export type ReactionrolesInsertInput = {
  channel?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  roles?: Maybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type ReactionrolesMaxFields = {
   __typename?: 'reactionroles_max_fields';
  channel?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "reactionroles" */
export type ReactionrolesMaxOrderBy = {
  channel?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type ReactionrolesMinFields = {
   __typename?: 'reactionroles_min_fields';
  channel?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "reactionroles" */
export type ReactionrolesMinOrderBy = {
  channel?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
};

/** response of any mutation on the table "reactionroles" */
export type ReactionrolesMutationResponse = {
   __typename?: 'reactionroles_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Reactionroles>;
};

/** input type for inserting object relation for remote table "reactionroles" */
export type ReactionrolesObjRelInsertInput = {
  data: ReactionrolesInsertInput;
  on_conflict?: Maybe<ReactionrolesOnConflict>;
};

/** on conflict condition type for table "reactionroles" */
export type ReactionrolesOnConflict = {
  constraint: ReactionrolesConstraint;
  update_columns: Array<ReactionrolesUpdateColumn>;
  where?: Maybe<ReactionrolesBoolExp>;
};

/** ordering options when selecting data from "reactionroles" */
export type ReactionrolesOrderBy = {
  channel?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  roles?: Maybe<OrderBy>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ReactionrolesPrependInput = {
  roles?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "reactionroles" */
export enum ReactionrolesSelectColumn {
  /** column name */
  Channel = 'channel',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  Roles = 'roles'
}

/** input type for updating data in table "reactionroles" */
export type ReactionrolesSetInput = {
  channel?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  roles?: Maybe<Scalars['jsonb']>;
};

/** aggregate stddev on columns */
export type ReactionrolesStddevFields = {
   __typename?: 'reactionroles_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "reactionroles" */
export type ReactionrolesStddevOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ReactionrolesStddevPopFields = {
   __typename?: 'reactionroles_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "reactionroles" */
export type ReactionrolesStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ReactionrolesStddevSampFields = {
   __typename?: 'reactionroles_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "reactionroles" */
export type ReactionrolesStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type ReactionrolesSumFields = {
   __typename?: 'reactionroles_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "reactionroles" */
export type ReactionrolesSumOrderBy = {
  id?: Maybe<OrderBy>;
};

/** update columns of table "reactionroles" */
export enum ReactionrolesUpdateColumn {
  /** column name */
  Channel = 'channel',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  Roles = 'roles'
}

/** aggregate var_pop on columns */
export type ReactionrolesVarPopFields = {
   __typename?: 'reactionroles_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "reactionroles" */
export type ReactionrolesVarPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ReactionrolesVarSampFields = {
   __typename?: 'reactionroles_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "reactionroles" */
export type ReactionrolesVarSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type ReactionrolesVarianceFields = {
   __typename?: 'reactionroles_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "reactionroles" */
export type ReactionrolesVarianceOrderBy = {
  id?: Maybe<OrderBy>;
};

/** columns and relationships of "remindmes" */
export type Remindmes = {
   __typename?: 'remindmes';
  author: Scalars['String'];
  channel: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  duration: Scalars['timestamptz'];
  guild: Scalars['String'];
  id: Scalars['Int'];
  message: Scalars['String'];
  text: Scalars['String'];
};

/** aggregated selection of "remindmes" */
export type RemindmesAggregate = {
   __typename?: 'remindmes_aggregate';
  aggregate?: Maybe<RemindmesAggregateFields>;
  nodes: Array<Remindmes>;
};

/** aggregate fields of "remindmes" */
export type RemindmesAggregateFields = {
   __typename?: 'remindmes_aggregate_fields';
  avg?: Maybe<RemindmesAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<RemindmesMaxFields>;
  min?: Maybe<RemindmesMinFields>;
  stddev?: Maybe<RemindmesStddevFields>;
  stddev_pop?: Maybe<RemindmesStddevPopFields>;
  stddev_samp?: Maybe<RemindmesStddevSampFields>;
  sum?: Maybe<RemindmesSumFields>;
  var_pop?: Maybe<RemindmesVarPopFields>;
  var_samp?: Maybe<RemindmesVarSampFields>;
  variance?: Maybe<RemindmesVarianceFields>;
};


/** aggregate fields of "remindmes" */
export type RemindmesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<RemindmesSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "remindmes" */
export type RemindmesAggregateOrderBy = {
  avg?: Maybe<RemindmesAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<RemindmesMaxOrderBy>;
  min?: Maybe<RemindmesMinOrderBy>;
  stddev?: Maybe<RemindmesStddevOrderBy>;
  stddev_pop?: Maybe<RemindmesStddevPopOrderBy>;
  stddev_samp?: Maybe<RemindmesStddevSampOrderBy>;
  sum?: Maybe<RemindmesSumOrderBy>;
  var_pop?: Maybe<RemindmesVarPopOrderBy>;
  var_samp?: Maybe<RemindmesVarSampOrderBy>;
  variance?: Maybe<RemindmesVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "remindmes" */
export type RemindmesArrRelInsertInput = {
  data: Array<RemindmesInsertInput>;
  on_conflict?: Maybe<RemindmesOnConflict>;
};

/** aggregate avg on columns */
export type RemindmesAvgFields = {
   __typename?: 'remindmes_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "remindmes" */
export type RemindmesAvgOrderBy = {
  id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "remindmes". All fields are combined with a logical 'AND'. */
export type RemindmesBoolExp = {
  _and?: Maybe<Array<Maybe<RemindmesBoolExp>>>;
  _not?: Maybe<RemindmesBoolExp>;
  _or?: Maybe<Array<Maybe<RemindmesBoolExp>>>;
  author?: Maybe<StringComparisonExp>;
  channel?: Maybe<StringComparisonExp>;
  createdAt?: Maybe<TimestamptzComparisonExp>;
  duration?: Maybe<TimestamptzComparisonExp>;
  guild?: Maybe<StringComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  message?: Maybe<StringComparisonExp>;
  text?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "remindmes" */
export enum RemindmesConstraint {
  /** unique or primary key constraint */
  RemindmesIdKey = 'remindmes_id_key',
  /** unique or primary key constraint */
  RemindmesPkey = 'remindmes_pkey'
}

/** input type for incrementing integer columne in table "remindmes" */
export type RemindmesIncInput = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "remindmes" */
export type RemindmesInsertInput = {
  author?: Maybe<Scalars['String']>;
  channel?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  duration?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type RemindmesMaxFields = {
   __typename?: 'remindmes_max_fields';
  author?: Maybe<Scalars['String']>;
  channel?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  duration?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "remindmes" */
export type RemindmesMaxOrderBy = {
  author?: Maybe<OrderBy>;
  channel?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  duration?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  text?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type RemindmesMinFields = {
   __typename?: 'remindmes_min_fields';
  author?: Maybe<Scalars['String']>;
  channel?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  duration?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "remindmes" */
export type RemindmesMinOrderBy = {
  author?: Maybe<OrderBy>;
  channel?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  duration?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  text?: Maybe<OrderBy>;
};

/** response of any mutation on the table "remindmes" */
export type RemindmesMutationResponse = {
   __typename?: 'remindmes_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Remindmes>;
};

/** input type for inserting object relation for remote table "remindmes" */
export type RemindmesObjRelInsertInput = {
  data: RemindmesInsertInput;
  on_conflict?: Maybe<RemindmesOnConflict>;
};

/** on conflict condition type for table "remindmes" */
export type RemindmesOnConflict = {
  constraint: RemindmesConstraint;
  update_columns: Array<RemindmesUpdateColumn>;
  where?: Maybe<RemindmesBoolExp>;
};

/** ordering options when selecting data from "remindmes" */
export type RemindmesOrderBy = {
  author?: Maybe<OrderBy>;
  channel?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  duration?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  text?: Maybe<OrderBy>;
};

/** select columns of table "remindmes" */
export enum RemindmesSelectColumn {
  /** column name */
  Author = 'author',
  /** column name */
  Channel = 'channel',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Duration = 'duration',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  Text = 'text'
}

/** input type for updating data in table "remindmes" */
export type RemindmesSetInput = {
  author?: Maybe<Scalars['String']>;
  channel?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  duration?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type RemindmesStddevFields = {
   __typename?: 'remindmes_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "remindmes" */
export type RemindmesStddevOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type RemindmesStddevPopFields = {
   __typename?: 'remindmes_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "remindmes" */
export type RemindmesStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type RemindmesStddevSampFields = {
   __typename?: 'remindmes_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "remindmes" */
export type RemindmesStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type RemindmesSumFields = {
   __typename?: 'remindmes_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "remindmes" */
export type RemindmesSumOrderBy = {
  id?: Maybe<OrderBy>;
};

/** update columns of table "remindmes" */
export enum RemindmesUpdateColumn {
  /** column name */
  Author = 'author',
  /** column name */
  Channel = 'channel',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Duration = 'duration',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  Text = 'text'
}

/** aggregate var_pop on columns */
export type RemindmesVarPopFields = {
   __typename?: 'remindmes_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "remindmes" */
export type RemindmesVarPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type RemindmesVarSampFields = {
   __typename?: 'remindmes_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "remindmes" */
export type RemindmesVarSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type RemindmesVarianceFields = {
   __typename?: 'remindmes_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "remindmes" */
export type RemindmesVarianceOrderBy = {
  id?: Maybe<OrderBy>;
};

/** columns and relationships of "role_states" */
export type RoleStates = {
   __typename?: 'role_states';
  /** The id of the guild this role state belongs to */
  guild: Scalars['String'];
  id: Scalars['uuid'];
  /** The id of the member this role state belongs to */
  member: Scalars['String'];
  /** The roles of this role state */
  roles: Scalars['_text'];
};

/** aggregated selection of "role_states" */
export type RoleStatesAggregate = {
   __typename?: 'role_states_aggregate';
  aggregate?: Maybe<RoleStatesAggregateFields>;
  nodes: Array<RoleStates>;
};

/** aggregate fields of "role_states" */
export type RoleStatesAggregateFields = {
   __typename?: 'role_states_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<RoleStatesMaxFields>;
  min?: Maybe<RoleStatesMinFields>;
};


/** aggregate fields of "role_states" */
export type RoleStatesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<RoleStatesSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "role_states" */
export type RoleStatesAggregateOrderBy = {
  count?: Maybe<OrderBy>;
  max?: Maybe<RoleStatesMaxOrderBy>;
  min?: Maybe<RoleStatesMinOrderBy>;
};

/** input type for inserting array relation for remote table "role_states" */
export type RoleStatesArrRelInsertInput = {
  data: Array<RoleStatesInsertInput>;
  on_conflict?: Maybe<RoleStatesOnConflict>;
};

/** Boolean expression to filter rows from the table "role_states". All fields are combined with a logical 'AND'. */
export type RoleStatesBoolExp = {
  _and?: Maybe<Array<Maybe<RoleStatesBoolExp>>>;
  _not?: Maybe<RoleStatesBoolExp>;
  _or?: Maybe<Array<Maybe<RoleStatesBoolExp>>>;
  guild?: Maybe<StringComparisonExp>;
  id?: Maybe<UuidComparisonExp>;
  member?: Maybe<StringComparisonExp>;
  roles?: Maybe<TextComparisonExp>;
};

/** unique or primary key constraints on table "role_states" */
export enum RoleStatesConstraint {
  /** unique or primary key constraint */
  RoleStatesGuildMemberKey = 'role_states_guild_member_key',
  /** unique or primary key constraint */
  RoleStatesPkey = 'role_states_pkey'
}

/** input type for inserting data into table "role_states" */
export type RoleStatesInsertInput = {
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  member?: Maybe<Scalars['String']>;
  roles?: Maybe<Scalars['_text']>;
};

/** aggregate max on columns */
export type RoleStatesMaxFields = {
   __typename?: 'role_states_max_fields';
  guild?: Maybe<Scalars['String']>;
  member?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "role_states" */
export type RoleStatesMaxOrderBy = {
  guild?: Maybe<OrderBy>;
  member?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type RoleStatesMinFields = {
   __typename?: 'role_states_min_fields';
  guild?: Maybe<Scalars['String']>;
  member?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "role_states" */
export type RoleStatesMinOrderBy = {
  guild?: Maybe<OrderBy>;
  member?: Maybe<OrderBy>;
};

/** response of any mutation on the table "role_states" */
export type RoleStatesMutationResponse = {
   __typename?: 'role_states_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<RoleStates>;
};

/** input type for inserting object relation for remote table "role_states" */
export type RoleStatesObjRelInsertInput = {
  data: RoleStatesInsertInput;
  on_conflict?: Maybe<RoleStatesOnConflict>;
};

/** on conflict condition type for table "role_states" */
export type RoleStatesOnConflict = {
  constraint: RoleStatesConstraint;
  update_columns: Array<RoleStatesUpdateColumn>;
  where?: Maybe<RoleStatesBoolExp>;
};

/** ordering options when selecting data from "role_states" */
export type RoleStatesOrderBy = {
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  member?: Maybe<OrderBy>;
  roles?: Maybe<OrderBy>;
};

/** select columns of table "role_states" */
export enum RoleStatesSelectColumn {
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Member = 'member',
  /** column name */
  Roles = 'roles'
}

/** input type for updating data in table "role_states" */
export type RoleStatesSetInput = {
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  member?: Maybe<Scalars['String']>;
  roles?: Maybe<Scalars['_text']>;
};

/** update columns of table "role_states" */
export enum RoleStatesUpdateColumn {
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Member = 'member',
  /** column name */
  Roles = 'roles'
}

/** columns and relationships of "settings" */
export type Settings = {
   __typename?: 'settings';
  /** The id of the guild this setting belongs to */
  guild: Scalars['String'];
  settings: Scalars['jsonb'];
};


/** columns and relationships of "settings" */
export type SettingsSettingsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "settings" */
export type SettingsAggregate = {
   __typename?: 'settings_aggregate';
  aggregate?: Maybe<SettingsAggregateFields>;
  nodes: Array<Settings>;
};

/** aggregate fields of "settings" */
export type SettingsAggregateFields = {
   __typename?: 'settings_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<SettingsMaxFields>;
  min?: Maybe<SettingsMinFields>;
};


/** aggregate fields of "settings" */
export type SettingsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<SettingsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "settings" */
export type SettingsAggregateOrderBy = {
  count?: Maybe<OrderBy>;
  max?: Maybe<SettingsMaxOrderBy>;
  min?: Maybe<SettingsMinOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type SettingsAppendInput = {
  settings?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "settings" */
export type SettingsArrRelInsertInput = {
  data: Array<SettingsInsertInput>;
  on_conflict?: Maybe<SettingsOnConflict>;
};

/** Boolean expression to filter rows from the table "settings". All fields are combined with a logical 'AND'. */
export type SettingsBoolExp = {
  _and?: Maybe<Array<Maybe<SettingsBoolExp>>>;
  _not?: Maybe<SettingsBoolExp>;
  _or?: Maybe<Array<Maybe<SettingsBoolExp>>>;
  guild?: Maybe<StringComparisonExp>;
  settings?: Maybe<JsonbComparisonExp>;
};

/** unique or primary key constraints on table "settings" */
export enum SettingsConstraint {
  /** unique or primary key constraint */
  SettingsGuildKey = 'settings_guild_key',
  /** unique or primary key constraint */
  SettingsPkey = 'settings_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type SettingsDeleteAtPathInput = {
  settings?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type SettingsDeleteElemInput = {
  settings?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type SettingsDeleteKeyInput = {
  settings?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "settings" */
export type SettingsInsertInput = {
  guild?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type SettingsMaxFields = {
   __typename?: 'settings_max_fields';
  guild?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "settings" */
export type SettingsMaxOrderBy = {
  guild?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type SettingsMinFields = {
   __typename?: 'settings_min_fields';
  guild?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "settings" */
export type SettingsMinOrderBy = {
  guild?: Maybe<OrderBy>;
};

/** response of any mutation on the table "settings" */
export type SettingsMutationResponse = {
   __typename?: 'settings_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Settings>;
};

/** input type for inserting object relation for remote table "settings" */
export type SettingsObjRelInsertInput = {
  data: SettingsInsertInput;
  on_conflict?: Maybe<SettingsOnConflict>;
};

/** on conflict condition type for table "settings" */
export type SettingsOnConflict = {
  constraint: SettingsConstraint;
  update_columns: Array<SettingsUpdateColumn>;
  where?: Maybe<SettingsBoolExp>;
};

/** ordering options when selecting data from "settings" */
export type SettingsOrderBy = {
  guild?: Maybe<OrderBy>;
  settings?: Maybe<OrderBy>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type SettingsPrependInput = {
  settings?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "settings" */
export enum SettingsSelectColumn {
  /** column name */
  Guild = 'guild',
  /** column name */
  Settings = 'settings'
}

/** input type for updating data in table "settings" */
export type SettingsSetInput = {
  guild?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['jsonb']>;
};

/** update columns of table "settings" */
export enum SettingsUpdateColumn {
  /** column name */
  Guild = 'guild',
  /** column name */
  Settings = 'settings'
}

/** subscription root */
export type SubscriptionRoot = {
   __typename?: 'subscription_root';
  /** fetch data from the table: "cases" */
  cases: Array<Cases>;
  /** fetch aggregated fields from the table: "cases" */
  casesAggregate: CasesAggregate;
  /** fetch data from the table: "cases" using primary key columns */
  casesByPk?: Maybe<Cases>;
  /** fetch data from the table: "lockdowns" */
  lockdowns: Array<Lockdowns>;
  /** fetch aggregated fields from the table: "lockdowns" */
  lockdownsAggregate: LockdownsAggregate;
  /** fetch data from the table: "lockdowns" using primary key columns */
  lockdownsByPk?: Maybe<Lockdowns>;
  /** fetch data from the table: "reactionroles" */
  reactionroles: Array<Reactionroles>;
  /** fetch aggregated fields from the table: "reactionroles" */
  reactionrolesAggregate: ReactionrolesAggregate;
  /** fetch data from the table: "reactionroles" using primary key columns */
  reactionrolesByPk?: Maybe<Reactionroles>;
  /** fetch data from the table: "remindmes" */
  remindmes: Array<Remindmes>;
  /** fetch aggregated fields from the table: "remindmes" */
  remindmesAggregate: RemindmesAggregate;
  /** fetch data from the table: "remindmes" using primary key columns */
  remindmesByPk?: Maybe<Remindmes>;
  /** fetch data from the table: "role_states" */
  roleStates: Array<RoleStates>;
  /** fetch aggregated fields from the table: "role_states" */
  roleStatesAggregate: RoleStatesAggregate;
  /** fetch data from the table: "role_states" using primary key columns */
  roleStatesByPk?: Maybe<RoleStates>;
  /** fetch data from the table: "settings" */
  settings: Array<Settings>;
  /** fetch aggregated fields from the table: "settings" */
  settingsAggregate: SettingsAggregate;
  /** fetch data from the table: "settings" using primary key columns */
  settingsByPk?: Maybe<Settings>;
  /** fetch data from the table: "tags" */
  tags: Array<Tags>;
  /** fetch aggregated fields from the table: "tags" */
  tagsAggregate: TagsAggregate;
  /** fetch data from the table: "tags" using primary key columns */
  tagsByPk?: Maybe<Tags>;
};


/** subscription root */
export type SubscriptionRootCasesArgs = {
  distinct_on?: Maybe<Array<CasesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesOrderBy>>;
  where?: Maybe<CasesBoolExp>;
};


/** subscription root */
export type SubscriptionRootCasesAggregateArgs = {
  distinct_on?: Maybe<Array<CasesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesOrderBy>>;
  where?: Maybe<CasesBoolExp>;
};


/** subscription root */
export type SubscriptionRootCasesByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type SubscriptionRootLockdownsArgs = {
  distinct_on?: Maybe<Array<LockdownsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LockdownsOrderBy>>;
  where?: Maybe<LockdownsBoolExp>;
};


/** subscription root */
export type SubscriptionRootLockdownsAggregateArgs = {
  distinct_on?: Maybe<Array<LockdownsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LockdownsOrderBy>>;
  where?: Maybe<LockdownsBoolExp>;
};


/** subscription root */
export type SubscriptionRootLockdownsByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type SubscriptionRootReactionrolesArgs = {
  distinct_on?: Maybe<Array<ReactionrolesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ReactionrolesOrderBy>>;
  where?: Maybe<ReactionrolesBoolExp>;
};


/** subscription root */
export type SubscriptionRootReactionrolesAggregateArgs = {
  distinct_on?: Maybe<Array<ReactionrolesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ReactionrolesOrderBy>>;
  where?: Maybe<ReactionrolesBoolExp>;
};


/** subscription root */
export type SubscriptionRootReactionrolesByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootRemindmesArgs = {
  distinct_on?: Maybe<Array<RemindmesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RemindmesOrderBy>>;
  where?: Maybe<RemindmesBoolExp>;
};


/** subscription root */
export type SubscriptionRootRemindmesAggregateArgs = {
  distinct_on?: Maybe<Array<RemindmesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RemindmesOrderBy>>;
  where?: Maybe<RemindmesBoolExp>;
};


/** subscription root */
export type SubscriptionRootRemindmesByPkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type SubscriptionRootRoleStatesArgs = {
  distinct_on?: Maybe<Array<RoleStatesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RoleStatesOrderBy>>;
  where?: Maybe<RoleStatesBoolExp>;
};


/** subscription root */
export type SubscriptionRootRoleStatesAggregateArgs = {
  distinct_on?: Maybe<Array<RoleStatesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<RoleStatesOrderBy>>;
  where?: Maybe<RoleStatesBoolExp>;
};


/** subscription root */
export type SubscriptionRootRoleStatesByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type SubscriptionRootSettingsArgs = {
  distinct_on?: Maybe<Array<SettingsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsOrderBy>>;
  where?: Maybe<SettingsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSettingsAggregateArgs = {
  distinct_on?: Maybe<Array<SettingsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsOrderBy>>;
  where?: Maybe<SettingsBoolExp>;
};


/** subscription root */
export type SubscriptionRootSettingsByPkArgs = {
  guild: Scalars['String'];
};


/** subscription root */
export type SubscriptionRootTagsArgs = {
  distinct_on?: Maybe<Array<TagsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TagsOrderBy>>;
  where?: Maybe<TagsBoolExp>;
};


/** subscription root */
export type SubscriptionRootTagsAggregateArgs = {
  distinct_on?: Maybe<Array<TagsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TagsOrderBy>>;
  where?: Maybe<TagsBoolExp>;
};


/** subscription root */
export type SubscriptionRootTagsByPkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "tags" */
export type Tags = {
   __typename?: 'tags';
  aliases: Scalars['_text'];
  content: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  /** The id of the guild this tag belongs to */
  guild: Scalars['String'];
  /** Whether the tag is a hoisted guild tag or not */
  hoisted?: Maybe<Scalars['Boolean']>;
  id: Scalars['uuid'];
  /** The id of the user who last modified this tag */
  lastModified?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** Whether the tag is templated or not */
  templated: Scalars['Boolean'];
  updatedAt: Scalars['timestamptz'];
  /** The id of the user this tag belongs to */
  user: Scalars['String'];
  uses: Scalars['Int'];
};

/** aggregated selection of "tags" */
export type TagsAggregate = {
   __typename?: 'tags_aggregate';
  aggregate?: Maybe<TagsAggregateFields>;
  nodes: Array<Tags>;
};

/** aggregate fields of "tags" */
export type TagsAggregateFields = {
   __typename?: 'tags_aggregate_fields';
  avg?: Maybe<TagsAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<TagsMaxFields>;
  min?: Maybe<TagsMinFields>;
  stddev?: Maybe<TagsStddevFields>;
  stddev_pop?: Maybe<TagsStddevPopFields>;
  stddev_samp?: Maybe<TagsStddevSampFields>;
  sum?: Maybe<TagsSumFields>;
  var_pop?: Maybe<TagsVarPopFields>;
  var_samp?: Maybe<TagsVarSampFields>;
  variance?: Maybe<TagsVarianceFields>;
};


/** aggregate fields of "tags" */
export type TagsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TagsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "tags" */
export type TagsAggregateOrderBy = {
  avg?: Maybe<TagsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<TagsMaxOrderBy>;
  min?: Maybe<TagsMinOrderBy>;
  stddev?: Maybe<TagsStddevOrderBy>;
  stddev_pop?: Maybe<TagsStddevPopOrderBy>;
  stddev_samp?: Maybe<TagsStddevSampOrderBy>;
  sum?: Maybe<TagsSumOrderBy>;
  var_pop?: Maybe<TagsVarPopOrderBy>;
  var_samp?: Maybe<TagsVarSampOrderBy>;
  variance?: Maybe<TagsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "tags" */
export type TagsArrRelInsertInput = {
  data: Array<TagsInsertInput>;
  on_conflict?: Maybe<TagsOnConflict>;
};

/** aggregate avg on columns */
export type TagsAvgFields = {
   __typename?: 'tags_avg_fields';
  uses?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "tags" */
export type TagsAvgOrderBy = {
  uses?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "tags". All fields are combined with a logical 'AND'. */
export type TagsBoolExp = {
  _and?: Maybe<Array<Maybe<TagsBoolExp>>>;
  _not?: Maybe<TagsBoolExp>;
  _or?: Maybe<Array<Maybe<TagsBoolExp>>>;
  aliases?: Maybe<TextComparisonExp>;
  content?: Maybe<StringComparisonExp>;
  createdAt?: Maybe<TimestamptzComparisonExp>;
  guild?: Maybe<StringComparisonExp>;
  hoisted?: Maybe<BooleanComparisonExp>;
  id?: Maybe<UuidComparisonExp>;
  lastModified?: Maybe<StringComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  templated?: Maybe<BooleanComparisonExp>;
  updatedAt?: Maybe<TimestamptzComparisonExp>;
  user?: Maybe<StringComparisonExp>;
  uses?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "tags" */
export enum TagsConstraint {
  /** unique or primary key constraint */
  TagsGuildNameKey = 'tags_guild_name_key',
  /** unique or primary key constraint */
  TagsPkey = 'tags_pkey'
}

/** input type for incrementing integer columne in table "tags" */
export type TagsIncInput = {
  uses?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "tags" */
export type TagsInsertInput = {
  aliases?: Maybe<Scalars['_text']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  hoisted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['uuid']>;
  lastModified?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  templated?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Scalars['String']>;
  uses?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type TagsMaxFields = {
   __typename?: 'tags_max_fields';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  lastModified?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Scalars['String']>;
  uses?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "tags" */
export type TagsMaxOrderBy = {
  content?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  lastModified?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
  user?: Maybe<OrderBy>;
  uses?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type TagsMinFields = {
   __typename?: 'tags_min_fields';
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  lastModified?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Scalars['String']>;
  uses?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "tags" */
export type TagsMinOrderBy = {
  content?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  lastModified?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
  user?: Maybe<OrderBy>;
  uses?: Maybe<OrderBy>;
};

/** response of any mutation on the table "tags" */
export type TagsMutationResponse = {
   __typename?: 'tags_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Tags>;
};

/** input type for inserting object relation for remote table "tags" */
export type TagsObjRelInsertInput = {
  data: TagsInsertInput;
  on_conflict?: Maybe<TagsOnConflict>;
};

/** on conflict condition type for table "tags" */
export type TagsOnConflict = {
  constraint: TagsConstraint;
  update_columns: Array<TagsUpdateColumn>;
  where?: Maybe<TagsBoolExp>;
};

/** ordering options when selecting data from "tags" */
export type TagsOrderBy = {
  aliases?: Maybe<OrderBy>;
  content?: Maybe<OrderBy>;
  createdAt?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  hoisted?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lastModified?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  templated?: Maybe<OrderBy>;
  updatedAt?: Maybe<OrderBy>;
  user?: Maybe<OrderBy>;
  uses?: Maybe<OrderBy>;
};

/** select columns of table "tags" */
export enum TagsSelectColumn {
  /** column name */
  Aliases = 'aliases',
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Guild = 'guild',
  /** column name */
  Hoisted = 'hoisted',
  /** column name */
  Id = 'id',
  /** column name */
  LastModified = 'lastModified',
  /** column name */
  Name = 'name',
  /** column name */
  Templated = 'templated',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  User = 'user',
  /** column name */
  Uses = 'uses'
}

/** input type for updating data in table "tags" */
export type TagsSetInput = {
  aliases?: Maybe<Scalars['_text']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  hoisted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['uuid']>;
  lastModified?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  templated?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Scalars['String']>;
  uses?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type TagsStddevFields = {
   __typename?: 'tags_stddev_fields';
  uses?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "tags" */
export type TagsStddevOrderBy = {
  uses?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type TagsStddevPopFields = {
   __typename?: 'tags_stddev_pop_fields';
  uses?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "tags" */
export type TagsStddevPopOrderBy = {
  uses?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type TagsStddevSampFields = {
   __typename?: 'tags_stddev_samp_fields';
  uses?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "tags" */
export type TagsStddevSampOrderBy = {
  uses?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type TagsSumFields = {
   __typename?: 'tags_sum_fields';
  uses?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "tags" */
export type TagsSumOrderBy = {
  uses?: Maybe<OrderBy>;
};

/** update columns of table "tags" */
export enum TagsUpdateColumn {
  /** column name */
  Aliases = 'aliases',
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Guild = 'guild',
  /** column name */
  Hoisted = 'hoisted',
  /** column name */
  Id = 'id',
  /** column name */
  LastModified = 'lastModified',
  /** column name */
  Name = 'name',
  /** column name */
  Templated = 'templated',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  User = 'user',
  /** column name */
  Uses = 'uses'
}

/** aggregate var_pop on columns */
export type TagsVarPopFields = {
   __typename?: 'tags_var_pop_fields';
  uses?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "tags" */
export type TagsVarPopOrderBy = {
  uses?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type TagsVarSampFields = {
   __typename?: 'tags_var_samp_fields';
  uses?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "tags" */
export type TagsVarSampOrderBy = {
  uses?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type TagsVarianceFields = {
   __typename?: 'tags_variance_fields';
  uses?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "tags" */
export type TagsVarianceOrderBy = {
  uses?: Maybe<OrderBy>;
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
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
export type UuidComparisonExp = {
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

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

/** mutation root */
export type MutationRoot = {
  __typename?: 'mutation_root';
  /** delete data from the table: "reaction_roles" */
  deleteReactionRoles?: Maybe<ReactionRolesMutationResponse>;
  /** delete data from the table: "remindmes" */
  deleteRemindmes?: Maybe<RemindmesMutationResponse>;
  /** delete data from the table: "role_states" */
  deleteRoleStates?: Maybe<RoleStatesMutationResponse>;
  /** delete data from the table: "settings" */
  deleteSettings?: Maybe<SettingsMutationResponse>;
  /** delete data from the table: "tags" */
  deleteTags?: Maybe<TagsMutationResponse>;
  /** delete data from the table: "twitch_streams" */
  deleteTwitchStreams?: Maybe<TwitchStreamsMutationResponse>;
  /** delete single row from the table: "reaction_roles" */
  delete_reaction_roles_by_pk?: Maybe<ReactionRoles>;
  /** delete single row from the table: "remindmes" */
  delete_remindmes_by_pk?: Maybe<Remindmes>;
  /** delete single row from the table: "role_states" */
  delete_role_states_by_pk?: Maybe<RoleStates>;
  /** delete single row from the table: "settings" */
  delete_settings_by_pk?: Maybe<Settings>;
  /** delete single row from the table: "tags" */
  delete_tags_by_pk?: Maybe<Tags>;
  /** delete single row from the table: "twitch_streams" */
  delete_twitch_streams_by_pk?: Maybe<TwitchStreams>;
  /** insert data into the table: "reaction_roles" */
  insertReactionRoles?: Maybe<ReactionRolesMutationResponse>;
  /** insert data into the table: "remindmes" */
  insertRemindmes?: Maybe<RemindmesMutationResponse>;
  /** insert data into the table: "role_states" */
  insertRoleStates?: Maybe<RoleStatesMutationResponse>;
  /** insert data into the table: "settings" */
  insertSettings?: Maybe<SettingsMutationResponse>;
  /** insert data into the table: "tags" */
  insertTags?: Maybe<TagsMutationResponse>;
  /** insert data into the table: "twitch_streams" */
  insertTwitchStreams?: Maybe<TwitchStreamsMutationResponse>;
  /** insert a single row into the table: "reaction_roles" */
  insert_reaction_roles_one?: Maybe<ReactionRoles>;
  /** insert a single row into the table: "remindmes" */
  insert_remindmes_one?: Maybe<Remindmes>;
  /** insert a single row into the table: "role_states" */
  insert_role_states_one?: Maybe<RoleStates>;
  /** insert a single row into the table: "settings" */
  insert_settings_one?: Maybe<Settings>;
  /** insert a single row into the table: "tags" */
  insert_tags_one?: Maybe<Tags>;
  /** insert a single row into the table: "twitch_streams" */
  insert_twitch_streams_one?: Maybe<TwitchStreams>;
  /** update data of the table: "reaction_roles" */
  updateReactionRoles?: Maybe<ReactionRolesMutationResponse>;
  /** update data of the table: "remindmes" */
  updateRemindmes?: Maybe<RemindmesMutationResponse>;
  /** update data of the table: "role_states" */
  updateRoleStates?: Maybe<RoleStatesMutationResponse>;
  /** update data of the table: "settings" */
  updateSettings?: Maybe<SettingsMutationResponse>;
  /** update data of the table: "tags" */
  updateTags?: Maybe<TagsMutationResponse>;
  /** update data of the table: "twitch_streams" */
  updateTwitchStreams?: Maybe<TwitchStreamsMutationResponse>;
  /** update single row of the table: "reaction_roles" */
  update_reaction_roles_by_pk?: Maybe<ReactionRoles>;
  /** update single row of the table: "remindmes" */
  update_remindmes_by_pk?: Maybe<Remindmes>;
  /** update single row of the table: "role_states" */
  update_role_states_by_pk?: Maybe<RoleStates>;
  /** update single row of the table: "settings" */
  update_settings_by_pk?: Maybe<Settings>;
  /** update single row of the table: "tags" */
  update_tags_by_pk?: Maybe<Tags>;
  /** update single row of the table: "twitch_streams" */
  update_twitch_streams_by_pk?: Maybe<TwitchStreams>;
};


/** mutation root */
export type MutationRootDeleteReactionRolesArgs = {
  where: ReactionRolesBoolExp;
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
export type MutationRootDeleteTwitchStreamsArgs = {
  where: TwitchStreamsBoolExp;
};


/** mutation root */
export type MutationRootDeleteReactionRolesByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteRemindmesByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootDeleteRoleStatesByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationRootDeleteSettingsByPkArgs = {
  guild: Scalars['String'];
};


/** mutation root */
export type MutationRootDeleteTagsByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationRootDeleteTwitchStreamsByPkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type MutationRootInsertReactionRolesArgs = {
  objects: Array<ReactionRolesInsertInput>;
  on_conflict?: Maybe<ReactionRolesOnConflict>;
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
export type MutationRootInsertTwitchStreamsArgs = {
  objects: Array<TwitchStreamsInsertInput>;
  on_conflict?: Maybe<TwitchStreamsOnConflict>;
};


/** mutation root */
export type MutationRootInsertReactionRolesOneArgs = {
  object: ReactionRolesInsertInput;
  on_conflict?: Maybe<ReactionRolesOnConflict>;
};


/** mutation root */
export type MutationRootInsertRemindmesOneArgs = {
  object: RemindmesInsertInput;
  on_conflict?: Maybe<RemindmesOnConflict>;
};


/** mutation root */
export type MutationRootInsertRoleStatesOneArgs = {
  object: RoleStatesInsertInput;
  on_conflict?: Maybe<RoleStatesOnConflict>;
};


/** mutation root */
export type MutationRootInsertSettingsOneArgs = {
  object: SettingsInsertInput;
  on_conflict?: Maybe<SettingsOnConflict>;
};


/** mutation root */
export type MutationRootInsertTagsOneArgs = {
  object: TagsInsertInput;
  on_conflict?: Maybe<TagsOnConflict>;
};


/** mutation root */
export type MutationRootInsertTwitchStreamsOneArgs = {
  object: TwitchStreamsInsertInput;
  on_conflict?: Maybe<TwitchStreamsOnConflict>;
};


/** mutation root */
export type MutationRootUpdateReactionRolesArgs = {
  _append?: Maybe<ReactionRolesAppendInput>;
  _delete_at_path?: Maybe<ReactionRolesDeleteAtPathInput>;
  _delete_elem?: Maybe<ReactionRolesDeleteElemInput>;
  _delete_key?: Maybe<ReactionRolesDeleteKeyInput>;
  _inc?: Maybe<ReactionRolesIncInput>;
  _prepend?: Maybe<ReactionRolesPrependInput>;
  _set?: Maybe<ReactionRolesSetInput>;
  where: ReactionRolesBoolExp;
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


/** mutation root */
export type MutationRootUpdateTwitchStreamsArgs = {
  _append?: Maybe<TwitchStreamsAppendInput>;
  _delete_at_path?: Maybe<TwitchStreamsDeleteAtPathInput>;
  _delete_elem?: Maybe<TwitchStreamsDeleteElemInput>;
  _delete_key?: Maybe<TwitchStreamsDeleteKeyInput>;
  _inc?: Maybe<TwitchStreamsIncInput>;
  _prepend?: Maybe<TwitchStreamsPrependInput>;
  _set?: Maybe<TwitchStreamsSetInput>;
  where: TwitchStreamsBoolExp;
};


/** mutation root */
export type MutationRootUpdateReactionRolesByPkArgs = {
  _append?: Maybe<ReactionRolesAppendInput>;
  _delete_at_path?: Maybe<ReactionRolesDeleteAtPathInput>;
  _delete_elem?: Maybe<ReactionRolesDeleteElemInput>;
  _delete_key?: Maybe<ReactionRolesDeleteKeyInput>;
  _inc?: Maybe<ReactionRolesIncInput>;
  _prepend?: Maybe<ReactionRolesPrependInput>;
  _set?: Maybe<ReactionRolesSetInput>;
  pk_columns: ReactionRolesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateRemindmesByPkArgs = {
  _inc?: Maybe<RemindmesIncInput>;
  _set?: Maybe<RemindmesSetInput>;
  pk_columns: RemindmesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateRoleStatesByPkArgs = {
  _set?: Maybe<RoleStatesSetInput>;
  pk_columns: RoleStatesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateSettingsByPkArgs = {
  _append?: Maybe<SettingsAppendInput>;
  _delete_at_path?: Maybe<SettingsDeleteAtPathInput>;
  _delete_elem?: Maybe<SettingsDeleteElemInput>;
  _delete_key?: Maybe<SettingsDeleteKeyInput>;
  _prepend?: Maybe<SettingsPrependInput>;
  _set?: Maybe<SettingsSetInput>;
  pk_columns: SettingsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateTagsByPkArgs = {
  _inc?: Maybe<TagsIncInput>;
  _set?: Maybe<TagsSetInput>;
  pk_columns: TagsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateTwitchStreamsByPkArgs = {
  _append?: Maybe<TwitchStreamsAppendInput>;
  _delete_at_path?: Maybe<TwitchStreamsDeleteAtPathInput>;
  _delete_elem?: Maybe<TwitchStreamsDeleteElemInput>;
  _delete_key?: Maybe<TwitchStreamsDeleteKeyInput>;
  _inc?: Maybe<TwitchStreamsIncInput>;
  _prepend?: Maybe<TwitchStreamsPrependInput>;
  _set?: Maybe<TwitchStreamsSetInput>;
  pk_columns: TwitchStreamsPkColumnsInput;
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
  /** fetch data from the table: "reaction_roles" */
  reactionRoles: Array<ReactionRoles>;
  /** fetch aggregated fields from the table: "reaction_roles" */
  reactionRolesAggregate: ReactionRolesAggregate;
  /** fetch data from the table: "reaction_roles" using primary key columns */
  reactionRolesByPk?: Maybe<ReactionRoles>;
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
  /** fetch data from the table: "twitch_streams" */
  twitchStreams: Array<TwitchStreams>;
  /** fetch aggregated fields from the table: "twitch_streams" */
  twitchStreamsAggregate: TwitchStreamsAggregate;
  /** fetch data from the table: "twitch_streams" using primary key columns */
  twitchStreamsByPk?: Maybe<TwitchStreams>;
};


/** query root */
export type QueryRootReactionRolesArgs = {
  distinct_on?: Maybe<Array<ReactionRolesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ReactionRolesOrderBy>>;
  where?: Maybe<ReactionRolesBoolExp>;
};


/** query root */
export type QueryRootReactionRolesAggregateArgs = {
  distinct_on?: Maybe<Array<ReactionRolesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ReactionRolesOrderBy>>;
  where?: Maybe<ReactionRolesBoolExp>;
};


/** query root */
export type QueryRootReactionRolesByPkArgs = {
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


/** query root */
export type QueryRootTwitchStreamsArgs = {
  distinct_on?: Maybe<Array<TwitchStreamsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TwitchStreamsOrderBy>>;
  where?: Maybe<TwitchStreamsBoolExp>;
};


/** query root */
export type QueryRootTwitchStreamsAggregateArgs = {
  distinct_on?: Maybe<Array<TwitchStreamsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TwitchStreamsOrderBy>>;
  where?: Maybe<TwitchStreamsBoolExp>;
};


/** query root */
export type QueryRootTwitchStreamsByPkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "reaction_roles" */
export type ReactionRoles = {
  __typename?: 'reaction_roles';
  channel: Scalars['String'];
  guild: Scalars['String'];
  id: Scalars['Int'];
  message: Scalars['String'];
  roles: Scalars['jsonb'];
};


/** columns and relationships of "reaction_roles" */
export type ReactionRolesRolesArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "reaction_roles" */
export type ReactionRolesAggregate = {
  __typename?: 'reaction_roles_aggregate';
  aggregate?: Maybe<ReactionRolesAggregateFields>;
  nodes: Array<ReactionRoles>;
};

/** aggregate fields of "reaction_roles" */
export type ReactionRolesAggregateFields = {
  __typename?: 'reaction_roles_aggregate_fields';
  avg?: Maybe<ReactionRolesAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<ReactionRolesMaxFields>;
  min?: Maybe<ReactionRolesMinFields>;
  stddev?: Maybe<ReactionRolesStddevFields>;
  stddev_pop?: Maybe<ReactionRolesStddevPopFields>;
  stddev_samp?: Maybe<ReactionRolesStddevSampFields>;
  sum?: Maybe<ReactionRolesSumFields>;
  var_pop?: Maybe<ReactionRolesVarPopFields>;
  var_samp?: Maybe<ReactionRolesVarSampFields>;
  variance?: Maybe<ReactionRolesVarianceFields>;
};


/** aggregate fields of "reaction_roles" */
export type ReactionRolesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ReactionRolesSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "reaction_roles" */
export type ReactionRolesAggregateOrderBy = {
  avg?: Maybe<ReactionRolesAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ReactionRolesMaxOrderBy>;
  min?: Maybe<ReactionRolesMinOrderBy>;
  stddev?: Maybe<ReactionRolesStddevOrderBy>;
  stddev_pop?: Maybe<ReactionRolesStddevPopOrderBy>;
  stddev_samp?: Maybe<ReactionRolesStddevSampOrderBy>;
  sum?: Maybe<ReactionRolesSumOrderBy>;
  var_pop?: Maybe<ReactionRolesVarPopOrderBy>;
  var_samp?: Maybe<ReactionRolesVarSampOrderBy>;
  variance?: Maybe<ReactionRolesVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ReactionRolesAppendInput = {
  roles?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "reaction_roles" */
export type ReactionRolesArrRelInsertInput = {
  data: Array<ReactionRolesInsertInput>;
  on_conflict?: Maybe<ReactionRolesOnConflict>;
};

/** aggregate avg on columns */
export type ReactionRolesAvgFields = {
  __typename?: 'reaction_roles_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "reaction_roles" */
export type ReactionRolesAvgOrderBy = {
  id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "reaction_roles". All fields are combined with a logical 'AND'. */
export type ReactionRolesBoolExp = {
  _and?: Maybe<Array<Maybe<ReactionRolesBoolExp>>>;
  _not?: Maybe<ReactionRolesBoolExp>;
  _or?: Maybe<Array<Maybe<ReactionRolesBoolExp>>>;
  channel?: Maybe<StringComparisonExp>;
  guild?: Maybe<StringComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  message?: Maybe<StringComparisonExp>;
  roles?: Maybe<JsonbComparisonExp>;
};

/** unique or primary key constraints on table "reaction_roles" */
export enum ReactionRolesConstraint {
  /** unique or primary key constraint */
  ReactionRolesPkey = 'reaction_roles_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ReactionRolesDeleteAtPathInput = {
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ReactionRolesDeleteElemInput = {
  roles?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ReactionRolesDeleteKeyInput = {
  roles?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "reaction_roles" */
export type ReactionRolesIncInput = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "reaction_roles" */
export type ReactionRolesInsertInput = {
  channel?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  roles?: Maybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type ReactionRolesMaxFields = {
  __typename?: 'reaction_roles_max_fields';
  channel?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "reaction_roles" */
export type ReactionRolesMaxOrderBy = {
  channel?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type ReactionRolesMinFields = {
  __typename?: 'reaction_roles_min_fields';
  channel?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "reaction_roles" */
export type ReactionRolesMinOrderBy = {
  channel?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
};

/** response of any mutation on the table "reaction_roles" */
export type ReactionRolesMutationResponse = {
  __typename?: 'reaction_roles_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<ReactionRoles>;
};

/** input type for inserting object relation for remote table "reaction_roles" */
export type ReactionRolesObjRelInsertInput = {
  data: ReactionRolesInsertInput;
  on_conflict?: Maybe<ReactionRolesOnConflict>;
};

/** on conflict condition type for table "reaction_roles" */
export type ReactionRolesOnConflict = {
  constraint: ReactionRolesConstraint;
  update_columns: Array<ReactionRolesUpdateColumn>;
  where?: Maybe<ReactionRolesBoolExp>;
};

/** ordering options when selecting data from "reaction_roles" */
export type ReactionRolesOrderBy = {
  channel?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  roles?: Maybe<OrderBy>;
};

/** primary key columns input for table: "reaction_roles" */
export type ReactionRolesPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ReactionRolesPrependInput = {
  roles?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "reaction_roles" */
export enum ReactionRolesSelectColumn {
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

/** input type for updating data in table "reaction_roles" */
export type ReactionRolesSetInput = {
  channel?: Maybe<Scalars['String']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  roles?: Maybe<Scalars['jsonb']>;
};

/** aggregate stddev on columns */
export type ReactionRolesStddevFields = {
  __typename?: 'reaction_roles_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "reaction_roles" */
export type ReactionRolesStddevOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ReactionRolesStddevPopFields = {
  __typename?: 'reaction_roles_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "reaction_roles" */
export type ReactionRolesStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ReactionRolesStddevSampFields = {
  __typename?: 'reaction_roles_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "reaction_roles" */
export type ReactionRolesStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type ReactionRolesSumFields = {
  __typename?: 'reaction_roles_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "reaction_roles" */
export type ReactionRolesSumOrderBy = {
  id?: Maybe<OrderBy>;
};

/** update columns of table "reaction_roles" */
export enum ReactionRolesUpdateColumn {
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
export type ReactionRolesVarPopFields = {
  __typename?: 'reaction_roles_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "reaction_roles" */
export type ReactionRolesVarPopOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ReactionRolesVarSampFields = {
  __typename?: 'reaction_roles_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "reaction_roles" */
export type ReactionRolesVarSampOrderBy = {
  id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type ReactionRolesVarianceFields = {
  __typename?: 'reaction_roles_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "reaction_roles" */
export type ReactionRolesVarianceOrderBy = {
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
  RemindmesPkey = 'remindmes_pkey'
}

/** input type for incrementing integer column in table "remindmes" */
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

/** primary key columns input for table: "remindmes" */
export type RemindmesPkColumnsInput = {
  id: Scalars['Int'];
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
  id?: Maybe<Scalars['uuid']>;
  member?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "role_states" */
export type RoleStatesMaxOrderBy = {
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  member?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type RoleStatesMinFields = {
  __typename?: 'role_states_min_fields';
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  member?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "role_states" */
export type RoleStatesMinOrderBy = {
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
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

/** primary key columns input for table: "role_states" */
export type RoleStatesPkColumnsInput = {
  id: Scalars['uuid'];
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

/** primary key columns input for table: "settings" */
export type SettingsPkColumnsInput = {
  /** The id of the guild this setting belongs to */
  guild: Scalars['String'];
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
  /** fetch data from the table: "reaction_roles" */
  reactionRoles: Array<ReactionRoles>;
  /** fetch aggregated fields from the table: "reaction_roles" */
  reactionRolesAggregate: ReactionRolesAggregate;
  /** fetch data from the table: "reaction_roles" using primary key columns */
  reactionRolesByPk?: Maybe<ReactionRoles>;
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
  /** fetch data from the table: "twitch_streams" */
  twitchStreams: Array<TwitchStreams>;
  /** fetch aggregated fields from the table: "twitch_streams" */
  twitchStreamsAggregate: TwitchStreamsAggregate;
  /** fetch data from the table: "twitch_streams" using primary key columns */
  twitchStreamsByPk?: Maybe<TwitchStreams>;
};


/** subscription root */
export type SubscriptionRootReactionRolesArgs = {
  distinct_on?: Maybe<Array<ReactionRolesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ReactionRolesOrderBy>>;
  where?: Maybe<ReactionRolesBoolExp>;
};


/** subscription root */
export type SubscriptionRootReactionRolesAggregateArgs = {
  distinct_on?: Maybe<Array<ReactionRolesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ReactionRolesOrderBy>>;
  where?: Maybe<ReactionRolesBoolExp>;
};


/** subscription root */
export type SubscriptionRootReactionRolesByPkArgs = {
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


/** subscription root */
export type SubscriptionRootTwitchStreamsArgs = {
  distinct_on?: Maybe<Array<TwitchStreamsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TwitchStreamsOrderBy>>;
  where?: Maybe<TwitchStreamsBoolExp>;
};


/** subscription root */
export type SubscriptionRootTwitchStreamsAggregateArgs = {
  distinct_on?: Maybe<Array<TwitchStreamsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TwitchStreamsOrderBy>>;
  where?: Maybe<TwitchStreamsBoolExp>;
};


/** subscription root */
export type SubscriptionRootTwitchStreamsByPkArgs = {
  id: Scalars['Int'];
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

/** input type for incrementing integer column in table "tags" */
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
  id?: Maybe<Scalars['uuid']>;
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
  id?: Maybe<OrderBy>;
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
  id?: Maybe<Scalars['uuid']>;
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
  id?: Maybe<OrderBy>;
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

/** primary key columns input for table: "tags" */
export type TagsPkColumnsInput = {
  id: Scalars['uuid'];
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

/** columns and relationships of "twitch_streams" */
export type TwitchStreams = {
  __typename?: 'twitch_streams';
  categories?: Maybe<Scalars['jsonb']>;
  channel: Scalars['String'];
  duration?: Maybe<Scalars['Int']>;
  guild: Scalars['String'];
  id: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  online: Scalars['Boolean'];
  startedAt?: Maybe<Scalars['timestamptz']>;
  streamer: Scalars['String'];
  streamerName: Scalars['String'];
};


/** columns and relationships of "twitch_streams" */
export type TwitchStreamsCategoriesArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "twitch_streams" */
export type TwitchStreamsAggregate = {
  __typename?: 'twitch_streams_aggregate';
  aggregate?: Maybe<TwitchStreamsAggregateFields>;
  nodes: Array<TwitchStreams>;
};

/** aggregate fields of "twitch_streams" */
export type TwitchStreamsAggregateFields = {
  __typename?: 'twitch_streams_aggregate_fields';
  avg?: Maybe<TwitchStreamsAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<TwitchStreamsMaxFields>;
  min?: Maybe<TwitchStreamsMinFields>;
  stddev?: Maybe<TwitchStreamsStddevFields>;
  stddev_pop?: Maybe<TwitchStreamsStddevPopFields>;
  stddev_samp?: Maybe<TwitchStreamsStddevSampFields>;
  sum?: Maybe<TwitchStreamsSumFields>;
  var_pop?: Maybe<TwitchStreamsVarPopFields>;
  var_samp?: Maybe<TwitchStreamsVarSampFields>;
  variance?: Maybe<TwitchStreamsVarianceFields>;
};


/** aggregate fields of "twitch_streams" */
export type TwitchStreamsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TwitchStreamsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "twitch_streams" */
export type TwitchStreamsAggregateOrderBy = {
  avg?: Maybe<TwitchStreamsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<TwitchStreamsMaxOrderBy>;
  min?: Maybe<TwitchStreamsMinOrderBy>;
  stddev?: Maybe<TwitchStreamsStddevOrderBy>;
  stddev_pop?: Maybe<TwitchStreamsStddevPopOrderBy>;
  stddev_samp?: Maybe<TwitchStreamsStddevSampOrderBy>;
  sum?: Maybe<TwitchStreamsSumOrderBy>;
  var_pop?: Maybe<TwitchStreamsVarPopOrderBy>;
  var_samp?: Maybe<TwitchStreamsVarSampOrderBy>;
  variance?: Maybe<TwitchStreamsVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type TwitchStreamsAppendInput = {
  categories?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "twitch_streams" */
export type TwitchStreamsArrRelInsertInput = {
  data: Array<TwitchStreamsInsertInput>;
  on_conflict?: Maybe<TwitchStreamsOnConflict>;
};

/** aggregate avg on columns */
export type TwitchStreamsAvgFields = {
  __typename?: 'twitch_streams_avg_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "twitch_streams" */
export type TwitchStreamsAvgOrderBy = {
  duration?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "twitch_streams". All fields are combined with a logical 'AND'. */
export type TwitchStreamsBoolExp = {
  _and?: Maybe<Array<Maybe<TwitchStreamsBoolExp>>>;
  _not?: Maybe<TwitchStreamsBoolExp>;
  _or?: Maybe<Array<Maybe<TwitchStreamsBoolExp>>>;
  categories?: Maybe<JsonbComparisonExp>;
  channel?: Maybe<StringComparisonExp>;
  duration?: Maybe<IntComparisonExp>;
  guild?: Maybe<StringComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  message?: Maybe<StringComparisonExp>;
  online?: Maybe<BooleanComparisonExp>;
  startedAt?: Maybe<TimestamptzComparisonExp>;
  streamer?: Maybe<StringComparisonExp>;
  streamerName?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "twitch_streams" */
export enum TwitchStreamsConstraint {
  /** unique or primary key constraint */
  TwitchStreamsGuildChannelStreamerKey = 'twitch_streams_guild_channel_streamer_key',
  /** unique or primary key constraint */
  TwitchStreamsPkey = 'twitch_streams_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type TwitchStreamsDeleteAtPathInput = {
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type TwitchStreamsDeleteElemInput = {
  categories?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type TwitchStreamsDeleteKeyInput = {
  categories?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "twitch_streams" */
export type TwitchStreamsIncInput = {
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "twitch_streams" */
export type TwitchStreamsInsertInput = {
  categories?: Maybe<Scalars['jsonb']>;
  channel?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  online?: Maybe<Scalars['Boolean']>;
  startedAt?: Maybe<Scalars['timestamptz']>;
  streamer?: Maybe<Scalars['String']>;
  streamerName?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type TwitchStreamsMaxFields = {
  __typename?: 'twitch_streams_max_fields';
  channel?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['timestamptz']>;
  streamer?: Maybe<Scalars['String']>;
  streamerName?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "twitch_streams" */
export type TwitchStreamsMaxOrderBy = {
  channel?: Maybe<OrderBy>;
  duration?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  startedAt?: Maybe<OrderBy>;
  streamer?: Maybe<OrderBy>;
  streamerName?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type TwitchStreamsMinFields = {
  __typename?: 'twitch_streams_min_fields';
  channel?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['timestamptz']>;
  streamer?: Maybe<Scalars['String']>;
  streamerName?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "twitch_streams" */
export type TwitchStreamsMinOrderBy = {
  channel?: Maybe<OrderBy>;
  duration?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  startedAt?: Maybe<OrderBy>;
  streamer?: Maybe<OrderBy>;
  streamerName?: Maybe<OrderBy>;
};

/** response of any mutation on the table "twitch_streams" */
export type TwitchStreamsMutationResponse = {
  __typename?: 'twitch_streams_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<TwitchStreams>;
};

/** input type for inserting object relation for remote table "twitch_streams" */
export type TwitchStreamsObjRelInsertInput = {
  data: TwitchStreamsInsertInput;
  on_conflict?: Maybe<TwitchStreamsOnConflict>;
};

/** on conflict condition type for table "twitch_streams" */
export type TwitchStreamsOnConflict = {
  constraint: TwitchStreamsConstraint;
  update_columns: Array<TwitchStreamsUpdateColumn>;
  where?: Maybe<TwitchStreamsBoolExp>;
};

/** ordering options when selecting data from "twitch_streams" */
export type TwitchStreamsOrderBy = {
  categories?: Maybe<OrderBy>;
  channel?: Maybe<OrderBy>;
  duration?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  online?: Maybe<OrderBy>;
  startedAt?: Maybe<OrderBy>;
  streamer?: Maybe<OrderBy>;
  streamerName?: Maybe<OrderBy>;
};

/** primary key columns input for table: "twitch_streams" */
export type TwitchStreamsPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type TwitchStreamsPrependInput = {
  categories?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "twitch_streams" */
export enum TwitchStreamsSelectColumn {
  /** column name */
  Categories = 'categories',
  /** column name */
  Channel = 'channel',
  /** column name */
  Duration = 'duration',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  Online = 'online',
  /** column name */
  StartedAt = 'startedAt',
  /** column name */
  Streamer = 'streamer',
  /** column name */
  StreamerName = 'streamerName'
}

/** input type for updating data in table "twitch_streams" */
export type TwitchStreamsSetInput = {
  categories?: Maybe<Scalars['jsonb']>;
  channel?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
  online?: Maybe<Scalars['Boolean']>;
  startedAt?: Maybe<Scalars['timestamptz']>;
  streamer?: Maybe<Scalars['String']>;
  streamerName?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type TwitchStreamsStddevFields = {
  __typename?: 'twitch_streams_stddev_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "twitch_streams" */
export type TwitchStreamsStddevOrderBy = {
  duration?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type TwitchStreamsStddevPopFields = {
  __typename?: 'twitch_streams_stddev_pop_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "twitch_streams" */
export type TwitchStreamsStddevPopOrderBy = {
  duration?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type TwitchStreamsStddevSampFields = {
  __typename?: 'twitch_streams_stddev_samp_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "twitch_streams" */
export type TwitchStreamsStddevSampOrderBy = {
  duration?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type TwitchStreamsSumFields = {
  __typename?: 'twitch_streams_sum_fields';
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "twitch_streams" */
export type TwitchStreamsSumOrderBy = {
  duration?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** update columns of table "twitch_streams" */
export enum TwitchStreamsUpdateColumn {
  /** column name */
  Categories = 'categories',
  /** column name */
  Channel = 'channel',
  /** column name */
  Duration = 'duration',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  Online = 'online',
  /** column name */
  StartedAt = 'startedAt',
  /** column name */
  Streamer = 'streamer',
  /** column name */
  StreamerName = 'streamerName'
}

/** aggregate var_pop on columns */
export type TwitchStreamsVarPopFields = {
  __typename?: 'twitch_streams_var_pop_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "twitch_streams" */
export type TwitchStreamsVarPopOrderBy = {
  duration?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type TwitchStreamsVarSampFields = {
  __typename?: 'twitch_streams_var_samp_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "twitch_streams" */
export type TwitchStreamsVarSampOrderBy = {
  duration?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type TwitchStreamsVarianceFields = {
  __typename?: 'twitch_streams_variance_fields';
  duration?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "twitch_streams" */
export type TwitchStreamsVarianceOrderBy = {
  duration?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
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

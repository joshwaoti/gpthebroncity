/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auditLog from "../auditLog.js";
import type * as blog from "../blog.js";
import type * as contact from "../contact.js";
import type * as content from "../content.js";
import type * as crons from "../crons.js";
import type * as eventRegistrations from "../eventRegistrations.js";
import type * as events from "../events.js";
import type * as http from "../http.js";
import type * as lib from "../lib.js";
import type * as media from "../media.js";
import type * as projects from "../projects.js";
import type * as sermons from "../sermons.js";
import type * as users from "../users.js";
import type * as youtube from "../youtube.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auditLog: typeof auditLog;
  blog: typeof blog;
  contact: typeof contact;
  content: typeof content;
  crons: typeof crons;
  eventRegistrations: typeof eventRegistrations;
  events: typeof events;
  http: typeof http;
  lib: typeof lib;
  media: typeof media;
  projects: typeof projects;
  sermons: typeof sermons;
  users: typeof users;
  youtube: typeof youtube;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};

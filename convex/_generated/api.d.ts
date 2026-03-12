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
import type * as check_db from "../check_db.js";
import type * as clean_data from "../clean_data.js";
import type * as contact from "../contact.js";
import type * as content from "../content.js";
import type * as crons from "../crons.js";
import type * as debug from "../debug.js";
import type * as events from "../events.js";
import type * as fix_blog_images from "../fix_blog_images.js";
import type * as http from "../http.js";
import type * as projects from "../projects.js";
import type * as replace_all_blogs from "../replace_all_blogs.js";
import type * as seed_blogs from "../seed_blogs.js";
import type * as seed_events from "../seed_events.js";
import type * as sermons from "../sermons.js";
import type * as test_query from "../test_query.js";
import type * as update_blogs_content from "../update_blogs_content.js";
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
  check_db: typeof check_db;
  clean_data: typeof clean_data;
  contact: typeof contact;
  content: typeof content;
  crons: typeof crons;
  debug: typeof debug;
  events: typeof events;
  fix_blog_images: typeof fix_blog_images;
  http: typeof http;
  projects: typeof projects;
  replace_all_blogs: typeof replace_all_blogs;
  seed_blogs: typeof seed_blogs;
  seed_events: typeof seed_events;
  sermons: typeof sermons;
  test_query: typeof test_query;
  update_blogs_content: typeof update_blogs_content;
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

/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/coinflip/route";
exports.ids = ["app/api/coinflip/route"];
exports.modules = {

/***/ "(rsc)/./app/api/coinflip/route.ts":
/*!***********************************!*\
  !*** ./app/api/coinflip/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { choice, stake } = body;\n        if (!choice || typeof stake !== \"number\" || stake <= 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Invalid input\"\n            }, {\n                status: 400\n            });\n        }\n        // Simple pseudo-random flip. For production use a verifiable RNG.\n        const coin = Math.random() < 0.5 ? \"heads\" : \"tails\";\n        const win = coin === choice;\n        const payout = win ? Number((stake * 2).toFixed(2)) : 0;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            result: win ? \"win\" : \"lose\",\n            coin,\n            payout,\n            stake\n        });\n    } catch (err) {\n        console.error(\"coinflip error\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NvaW5mbGlwL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXdEO0FBT2pELGVBQWVDLEtBQUtDLE9BQW9CO0lBQzdDLElBQUk7UUFDRixNQUFNQyxPQUFRLE1BQU1ELFFBQVFFLElBQUk7UUFFaEMsTUFBTSxFQUFFQyxNQUFNLEVBQUVDLEtBQUssRUFBRSxHQUFHSDtRQUUxQixJQUFJLENBQUNFLFVBQVUsT0FBT0MsVUFBVSxZQUFZQSxTQUFTLEdBQUc7WUFDdEQsT0FBT04scURBQVlBLENBQUNJLElBQUksQ0FBQztnQkFBRUcsU0FBUztZQUFnQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDdkU7UUFFQSxrRUFBa0U7UUFDbEUsTUFBTUMsT0FBT0MsS0FBS0MsTUFBTSxLQUFLLE1BQU0sVUFBVTtRQUM3QyxNQUFNQyxNQUFNSCxTQUFTSjtRQUNyQixNQUFNUSxTQUFTRCxNQUFNRSxPQUFPLENBQUNSLFFBQVEsR0FBR1MsT0FBTyxDQUFDLE1BQU07UUFFdEQsT0FBT2YscURBQVlBLENBQUNJLElBQUksQ0FBQztZQUFFWSxRQUFRSixNQUFNLFFBQVE7WUFBUUg7WUFBTUk7WUFBUVA7UUFBTTtJQUMvRSxFQUFFLE9BQU9XLEtBQUs7UUFDWkMsUUFBUUMsS0FBSyxDQUFDLGtCQUFrQkY7UUFDaEMsT0FBT2pCLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7WUFBRUcsU0FBUztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3RFO0FBQ0YiLCJzb3VyY2VzIjpbIi9ob21lL3RvbnlidWZmZXRoL3Rlc3RiYXNlYXBwL215LW1pbmlraXQtYXBwL2FwcC9hcGkvY29pbmZsaXAvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG50eXBlIEJvZHkgPSB7XG4gIGNob2ljZTogXCJoZWFkc1wiIHwgXCJ0YWlsc1wiO1xuICBzdGFrZTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5ID0gKGF3YWl0IHJlcXVlc3QuanNvbigpKSBhcyBCb2R5O1xuXG4gICAgY29uc3QgeyBjaG9pY2UsIHN0YWtlIH0gPSBib2R5O1xuXG4gICAgaWYgKCFjaG9pY2UgfHwgdHlwZW9mIHN0YWtlICE9PSBcIm51bWJlclwiIHx8IHN0YWtlIDw9IDApIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiSW52YWxpZCBpbnB1dFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2ltcGxlIHBzZXVkby1yYW5kb20gZmxpcC4gRm9yIHByb2R1Y3Rpb24gdXNlIGEgdmVyaWZpYWJsZSBSTkcuXG4gICAgY29uc3QgY29pbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcImhlYWRzXCIgOiBcInRhaWxzXCI7XG4gICAgY29uc3Qgd2luID0gY29pbiA9PT0gY2hvaWNlO1xuICAgIGNvbnN0IHBheW91dCA9IHdpbiA/IE51bWJlcigoc3Rha2UgKiAyKS50b0ZpeGVkKDIpKSA6IDA7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyByZXN1bHQ6IHdpbiA/IFwid2luXCIgOiBcImxvc2VcIiwgY29pbiwgcGF5b3V0LCBzdGFrZSB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihcImNvaW5mbGlwIGVycm9yXCIsIGVycik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJTZXJ2ZXIgZXJyb3JcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcXVlc3QiLCJib2R5IiwianNvbiIsImNob2ljZSIsInN0YWtlIiwibWVzc2FnZSIsInN0YXR1cyIsImNvaW4iLCJNYXRoIiwicmFuZG9tIiwid2luIiwicGF5b3V0IiwiTnVtYmVyIiwidG9GaXhlZCIsInJlc3VsdCIsImVyciIsImNvbnNvbGUiLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/coinflip/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcoinflip%2Froute&page=%2Fapi%2Fcoinflip%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcoinflip%2Froute.ts&appDir=%2Fhome%2Ftonybuffeth%2Ftestbaseapp%2Fmy-minikit-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Ftonybuffeth%2Ftestbaseapp%2Fmy-minikit-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcoinflip%2Froute&page=%2Fapi%2Fcoinflip%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcoinflip%2Froute.ts&appDir=%2Fhome%2Ftonybuffeth%2Ftestbaseapp%2Fmy-minikit-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Ftonybuffeth%2Ftestbaseapp%2Fmy-minikit-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_tonybuffeth_testbaseapp_my_minikit_app_app_api_coinflip_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/coinflip/route.ts */ \"(rsc)/./app/api/coinflip/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/coinflip/route\",\n        pathname: \"/api/coinflip\",\n        filename: \"route\",\n        bundlePath: \"app/api/coinflip/route\"\n    },\n    resolvedPagePath: \"/home/tonybuffeth/testbaseapp/my-minikit-app/app/api/coinflip/route.ts\",\n    nextConfigOutput,\n    userland: _home_tonybuffeth_testbaseapp_my_minikit_app_app_api_coinflip_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjb2luZmxpcCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY29pbmZsaXAlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjb2luZmxpcCUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGdG9ueWJ1ZmZldGglMkZ0ZXN0YmFzZWFwcCUyRm15LW1pbmlraXQtYXBwJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGdG9ueWJ1ZmZldGglMkZ0ZXN0YmFzZWFwcCUyRm15LW1pbmlraXQtYXBwJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNzQjtBQUNuRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL2hvbWUvdG9ueWJ1ZmZldGgvdGVzdGJhc2VhcHAvbXktbWluaWtpdC1hcHAvYXBwL2FwaS9jb2luZmxpcC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvY29pbmZsaXAvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jb2luZmxpcFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY29pbmZsaXAvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS90b255YnVmZmV0aC90ZXN0YmFzZWFwcC9teS1taW5pa2l0LWFwcC9hcHAvYXBpL2NvaW5mbGlwL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcoinflip%2Froute&page=%2Fapi%2Fcoinflip%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcoinflip%2Froute.ts&appDir=%2Fhome%2Ftonybuffeth%2Ftestbaseapp%2Fmy-minikit-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Ftonybuffeth%2Ftestbaseapp%2Fmy-minikit-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fcoinflip%2Froute&page=%2Fapi%2Fcoinflip%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcoinflip%2Froute.ts&appDir=%2Fhome%2Ftonybuffeth%2Ftestbaseapp%2Fmy-minikit-app%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Ftonybuffeth%2Ftestbaseapp%2Fmy-minikit-app&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
var Octokit =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = GitHubApi\n\nconst defaultsDeep = __webpack_require__(/*! lodash/defaultsDeep */ \"./node_modules/lodash/defaultsDeep.js\")\nconst Hook = __webpack_require__(/*! before-after-hook */ \"./node_modules/before-after-hook/index.js\")\n\nconst parseClientOptions = __webpack_require__(/*! ./lib/parse-client-options */ \"./lib/parse-client-options.js\")\nconst request = __webpack_require__(/*! ./lib/request */ \"./lib/request/index.js\")\nconst ENDPOINT_DEFAULTS = __webpack_require__(/*! ./lib/endpoint */ \"./lib/endpoint/index.js\").DEFAULTS\n\nconst PLUGINS = [\n  __webpack_require__(/*! ./lib/plugins/authentication */ \"./lib/plugins/authentication/index.js\"),\n  __webpack_require__(/*! ./lib/plugins/endpoint-methods */ \"./lib/plugins/endpoint-methods/index.js\"),\n  __webpack_require__(/*! ./lib/plugins/pagination */ \"./lib/plugins/pagination/index.js\")\n]\n\nfunction GitHubApi (options) {\n  const defaults = defaultsDeep(parseClientOptions(options), ENDPOINT_DEFAULTS)\n\n  const hook = new Hook()\n  const api = {\n    // NOTE: github.hook, github.plugin and github.request are experimental APIs\n    //       at this point and can change at any time\n    hook,\n    plugin: (pluginFunction) => pluginFunction(api),\n    request: (options) => api.hook('request', defaultsDeep(options, defaults), request)\n  }\n\n  PLUGINS.forEach(api.plugin)\n\n  return api\n}\n\n\n//# sourceURL=webpack://Octokit/./index.js?");

/***/ }),

/***/ "./lib/defaults.js":
/*!*************************!*\
  !*** ./lib/defaults.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  agent: undefined, // https://nodejs.org/api/https.html#https_class_https_agent\n  headers: {\n    accept: 'application/vnd.github.v3+json'\n  },\n  timeout: 0,\n  baseUrl: 'https://api.github.com'\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/defaults.js?");

/***/ }),

/***/ "./lib/deprecate.js":
/*!**************************!*\
  !*** ./lib/deprecate.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = deprecate\n\nconst loggedMessages = {}\n\nfunction deprecate (message) {\n  if (loggedMessages[message]) {\n    return\n  }\n\n  console.warn(`DEPRECATED (@octokit/rest): ${message}`)\n  loggedMessages[message] = 1\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/deprecate.js?");

/***/ }),

/***/ "./lib/endpoint/add-query-parameters.js":
/*!**********************************************!*\
  !*** ./lib/endpoint/add-query-parameters.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = addQueryParameters\n\nfunction addQueryParameters (url, parameters) {\n  const separator = /\\?/.test(url) ? '&' : '?'\n  const names = Object.keys(parameters)\n\n  if (names.length === 0) {\n    return url\n  }\n\n  return url + separator + names\n    .map(name => {\n      if (name === 'q') {\n        return 'q=' + parameters.q.split('+')\n          .map(encodeURIComponent)\n          .join('+')\n      }\n\n      return `${name}=${encodeURIComponent(parameters[name])}`\n    })\n    .join('&')\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/endpoint/add-query-parameters.js?");

/***/ }),

/***/ "./lib/endpoint/defaults.js":
/*!**********************************!*\
  !*** ./lib/endpoint/defaults.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  method: 'get',\n  baseUrl: 'https://api.github.com',\n  headers: {\n    accept: 'application/vnd.github.v3+json'\n  },\n  request: {}\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/endpoint/defaults.js?");

/***/ }),

/***/ "./lib/endpoint/extract-url-variable-names.js":
/*!****************************************************!*\
  !*** ./lib/endpoint/extract-url-variable-names.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = extractUrlVariableName\n\nconst flatten = __webpack_require__(/*! lodash/flatten */ \"./node_modules/lodash/flatten.js\")\n\nconst urlVariableRegex = /\\{[^}]+\\}/g\nfunction extractUrlVariableName (url) {\n  const matches = url.match(urlVariableRegex)\n\n  if (!matches) {\n    return []\n  }\n\n  return flatten(matches.map(removeNonChars))\n}\n\nfunction removeNonChars (variableName) {\n  return variableName.replace(/^\\W+|\\W+$/g, '').split(/,/)\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/endpoint/extract-url-variable-names.js?");

/***/ }),

/***/ "./lib/endpoint/index.js":
/*!*******************************!*\
  !*** ./lib/endpoint/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = restEndpoint\n\nconst defaultsDeep = __webpack_require__(/*! lodash/defaultsDeep */ \"./node_modules/lodash/defaultsDeep.js\")\nconst intersection = __webpack_require__(/*! lodash/intersection */ \"./node_modules/lodash/intersection.js\")\nconst mapKeys = __webpack_require__(/*! lodash/mapKeys */ \"./node_modules/lodash/mapKeys.js\")\nconst omit = __webpack_require__(/*! lodash/omit */ \"./node_modules/lodash/omit.js\")\nconst urlTemplate = __webpack_require__(/*! url-template */ \"./node_modules/url-template/lib/url-template.js\")\nconst getUserAgent = __webpack_require__(/*! universal-user-agent */ \"./node_modules/universal-user-agent/browser.js\")\n\nconst addQueryParameters = __webpack_require__(/*! ./add-query-parameters */ \"./lib/endpoint/add-query-parameters.js\")\nconst extractUrlVariableNames = __webpack_require__(/*! ./extract-url-variable-names */ \"./lib/endpoint/extract-url-variable-names.js\")\nconst pkg = __webpack_require__(/*! ../../package.json */ \"./package.json\")\n\nconst DEFAULTS = module.exports.DEFAULTS = __webpack_require__(/*! ./defaults */ \"./lib/endpoint/defaults.js\")\nconst NON_PARAMETERS = [\n  'request',\n  'baseUrl'\n]\n\nfunction restEndpoint (options) {\n  // lowercase header names (#760)\n  options.headers = mapKeys(options.headers, (value, key) => key.toLowerCase())\n\n  let userAgent = `octokit.js/${pkg.version} ${getUserAgent()}`\n  if (options.headers['user-agent']) {\n    userAgent = `${options.headers['user-agent']} ${userAgent}`\n  }\n  options.headers['user-agent'] = userAgent\n\n  options = defaultsDeep({}, options, DEFAULTS)\n\n  let method = options.method.toLowerCase()\n  let baseUrl = options.baseUrl\n  let url = options.url\n  let body = options.body\n  let headers = options.headers\n  let remainingOptions = omit(options, ['method', 'baseUrl', 'url', 'headers'])\n\n  // replace :varname with {varname} to make it RFC 6570 compatible\n  url = url.replace(/:([a-z]\\w+)/g, '{+$1}')\n\n  // extract variable names from URL to calculate remaining variables later\n  const urlVariableNames = extractUrlVariableNames(url)\n\n  url = urlTemplate.parse(url).expand(remainingOptions)\n\n  if (!/^http/.test(url)) {\n    url = (baseUrl) + url\n  }\n\n  const requestOptions = remainingOptions.request\n  remainingOptions = omit(remainingOptions, intersection(Object.keys(options), urlVariableNames).concat(NON_PARAMETERS))\n\n  if (method === 'get' || method === 'head') {\n    url = addQueryParameters(url, remainingOptions)\n  } else {\n    if ('input' in remainingOptions) {\n      body = remainingOptions.input\n    } else {\n      body = Object.keys(remainingOptions).length ? remainingOptions : undefined\n    }\n  }\n\n  return Object.assign(requestOptions, {\n    method,\n    url,\n    headers,\n    body\n  })\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/endpoint/index.js?");

/***/ }),

/***/ "./lib/parse-client-options.js":
/*!*************************************!*\
  !*** ./lib/parse-client-options.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {module.exports = parseOptions\n\nconst defaults = __webpack_require__(/*! lodash/defaults */ \"./node_modules/lodash/defaults.js\")\nconst pick = __webpack_require__(/*! lodash/pick */ \"./node_modules/lodash/pick.js\")\n\nconst deprecate = __webpack_require__(/*! ./deprecate */ \"./lib/deprecate.js\")\nconst getRequestAgent = __webpack_require__(/*! ./get-request-agent */ 0)\nconst DEFAULTS = __webpack_require__(/*! ./defaults */ \"./lib/defaults.js\")\nconst OPTION_NAMES = [\n  'timeout',\n  'baseUrl',\n  'agent',\n  'headers'\n]\n\nfunction parseOptions (userOptions) {\n  if (!userOptions) {\n    userOptions = {}\n  }\n\n  if ('followRedirects' in userOptions) {\n    deprecate('followRedirects option is no longer supported. All redirects are followed correctly')\n  }\n\n  if ('protocol' in userOptions) {\n    deprecate('protocol option is no longer supported')\n  }\n\n  if ('host' in userOptions) {\n    deprecate('host option is no longer supported')\n  }\n\n  if ('port' in userOptions) {\n    deprecate('port option is no longer supported')\n  }\n\n  if ('pathPrefix' in userOptions) {\n    deprecate('pathPrefix option is no longer supported')\n  }\n\n  if ('Promise' in userOptions) {\n    deprecate('Promise option is no longer supported. The native Promise API is used')\n  }\n\n  const options = defaults(pick(userOptions, OPTION_NAMES), DEFAULTS)\n\n  const clientDefaults = {\n    baseUrl: options.baseUrl,\n    headers: options.headers,\n    request: {\n      timeout: options.timeout\n    }\n  }\n  if (userOptions.protocol) {\n    clientDefaults.baseUrl = `${userOptions.protocol}://${userOptions.host}`\n\n    /* istanbul ignore else */\n    if (userOptions.port) {\n      clientDefaults.baseUrl += `:${userOptions.port}`\n    }\n\n    // Check if a prefix is passed in the options and strip any leading or trailing slashes from it.\n    /* istanbul ignore else */\n    if (userOptions.pathPrefix) {\n      clientDefaults.baseUrl += '/' + userOptions.pathPrefix.replace(/(^[/]+|[/]+$)/g, '')\n    }\n  }\n  /* istanbul ignore else */\n\n  if (!process.browser) {\n    clientDefaults.request.agent = getRequestAgent(clientDefaults.baseUrl, userOptions)\n  }\n\n  return clientDefaults\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://Octokit/./lib/parse-client-options.js?");

/***/ }),

/***/ "./lib/plugins/authentication/authenticate.js":
/*!****************************************************!*\
  !*** ./lib/plugins/authentication/authenticate.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = authenticate\n\nfunction authenticate (state, options) {\n  if (!options) {\n    state.auth = false\n    return\n  }\n\n  switch (options.type) {\n    case 'basic':\n      if (!options.username || !options.password) {\n        throw new Error('Basic authentication requires both a username and password to be set')\n      }\n      break\n\n    case 'oauth':\n      if (!options.token && !(options.key && options.secret)) {\n        throw new Error('OAuth2 authentication requires a token or key & secret to be set')\n      }\n      break\n\n    case 'token':\n    case 'integration':\n    case 'app':\n      if (!options.token) {\n        throw new Error('Token authentication requires a token to be set')\n      }\n      break\n\n    default:\n      throw new Error(\"Invalid authentication type, must be 'basic', 'integration', or 'oauth'\")\n  }\n\n  state.auth = options\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/authentication/authenticate.js?");

/***/ }),

/***/ "./lib/plugins/authentication/before-request.js":
/*!******************************************************!*\
  !*** ./lib/plugins/authentication/before-request.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = authenticationBeforeRequest\n\nconst btoa = __webpack_require__(/*! btoa-lite */ \"./node_modules/btoa-lite/btoa-browser.js\")\nconst uniq = __webpack_require__(/*! lodash/uniq */ \"./node_modules/lodash/uniq.js\")\n\nconst deprecate = __webpack_require__(/*! ../../deprecate */ \"./lib/deprecate.js\")\n\nfunction authenticationBeforeRequest (state, options) {\n  if (!state.auth.type) {\n    return\n  }\n\n  if (state.auth.type === 'basic') {\n    const hash = btoa(`${state.auth.username}:${state.auth.password}`)\n    options.headers['authorization'] = `Basic ${hash}`\n    return\n  }\n\n  if (state.auth.type === 'token') {\n    options.headers['authorization'] = `token ${state.auth.token}`\n    return\n  }\n\n  // deprecate state.auth.type === 'integration', rename to 'app'\n  if (state.auth.type === 'integration') {\n    deprecate('authentication type \"integration\" is deprecated. Use \"app\" instead.')\n    state.auth.type = 'app'\n  }\n\n  if (state.auth.type === 'app') {\n    options.headers['authorization'] = `Bearer ${state.auth.token}`\n    const acceptHeaders = options.headers['accept'].split(',')\n      .concat('application/vnd.github.machine-man-preview+json')\n    options.headers['accept'] = uniq(acceptHeaders).filter(Boolean).join(',')\n    return\n  }\n\n  options.url += options.url.indexOf('?') === -1 ? '?' : '&'\n\n  if (state.auth.token) {\n    options.url += `access_token=${encodeURIComponent(state.auth.token)}`\n    return\n  }\n\n  const key = encodeURIComponent(state.auth.key)\n  const secret = encodeURIComponent(state.auth.secret)\n  options.url += `client_id=${key}&client_secret=${secret}`\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/authentication/before-request.js?");

/***/ }),

/***/ "./lib/plugins/authentication/index.js":
/*!*********************************************!*\
  !*** ./lib/plugins/authentication/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = authenticationPlugin\n\nconst authenticate = __webpack_require__(/*! ./authenticate */ \"./lib/plugins/authentication/authenticate.js\")\nconst beforeRequest = __webpack_require__(/*! ./before-request */ \"./lib/plugins/authentication/before-request.js\")\n\nfunction authenticationPlugin (octokit) {\n  const state = {\n    auth: false\n  }\n  octokit.authenticate = authenticate.bind(null, state)\n  octokit.hook.before('request', beforeRequest.bind(null, state))\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/authentication/index.js?");

/***/ }),

/***/ "./lib/plugins/endpoint-methods/deprecate.js":
/*!***************************************************!*\
  !*** ./lib/plugins/endpoint-methods/deprecate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = deprecate\n\nconst logDeprecationMessage = __webpack_require__(/*! ../../deprecate */ \"./lib/deprecate.js\")\n\nfunction deprecate (func, message) {\n  return function () {\n    logDeprecationMessage(message)\n    return func.apply(null, arguments)\n  }\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/endpoint-methods/deprecate.js?");

/***/ }),

/***/ "./lib/plugins/endpoint-methods/index.js":
/*!***********************************************!*\
  !*** ./lib/plugins/endpoint-methods/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = apiPlugin\n\nconst get = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\")\nconst pick = __webpack_require__(/*! lodash/pick */ \"./node_modules/lodash/pick.js\")\n\nconst method = __webpack_require__(/*! ./method */ \"./lib/plugins/endpoint-methods/method.js\")\nconst deprecate = __webpack_require__(/*! ./deprecate */ \"./lib/plugins/endpoint-methods/deprecate.js\")\n\nconst ENDPOINT_DEFAULTS = __webpack_require__(/*! ../../routes.json */ \"./lib/routes.json\")\n\nfunction apiPlugin (octokit) {\n  Object.keys(ENDPOINT_DEFAULTS).forEach(namespaceName => {\n    octokit[namespaceName] = {}\n\n    Object.keys(ENDPOINT_DEFAULTS[namespaceName]).forEach(apiName => {\n      let apiOptions = ENDPOINT_DEFAULTS[namespaceName][apiName]\n      let deprecated\n\n      if (apiOptions.alias) {\n        deprecated = apiOptions.deprecated\n        apiOptions = get(ENDPOINT_DEFAULTS, apiOptions.alias)\n      }\n\n      const endpointDefaults = pick(apiOptions, ['method', 'url', 'headers', 'request'])\n      if (deprecated) {\n        endpointDefaults.deprecated = deprecated\n      }\n\n      octokit[namespaceName][apiName] = method.bind(null, octokit, endpointDefaults, apiOptions.params)\n\n      // log deprecation warning for APIs flagged as deprecated\n      if (apiOptions.deprecated) {\n        octokit[namespaceName][apiName] = deprecate(\n          octokit[namespaceName][apiName],\n          apiOptions.deprecated\n        )\n      }\n    })\n  })\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/endpoint-methods/index.js?");

/***/ }),

/***/ "./lib/plugins/endpoint-methods/method.js":
/*!************************************************!*\
  !*** ./lib/plugins/endpoint-methods/method.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = apiMethod\n\nconst clone = __webpack_require__(/*! lodash/clone */ \"./node_modules/lodash/clone.js\")\nconst defaultsDeep = __webpack_require__(/*! lodash/defaultsDeep */ \"./node_modules/lodash/defaultsDeep.js\")\nconst mapKeys = __webpack_require__(/*! lodash/mapKeys */ \"./node_modules/lodash/mapKeys.js\")\n\nconst deprecate = __webpack_require__(/*! ../../deprecate */ \"./lib/deprecate.js\")\nconst validate = __webpack_require__(/*! ./validate */ \"./lib/plugins/endpoint-methods/validate.js\")\n\nfunction apiMethod (octokit, endpointDefaults, endpointParams, options, callback) {\n  // Do not alter passed options (#786)\n  options = clone(options) || {}\n\n  // lowercase header names (#760)\n  options.headers = mapKeys(options.headers, (value, key) => key.toLowerCase())\n\n  if (endpointDefaults.deprecated) {\n    deprecate(endpointDefaults.deprecated)\n    delete endpointDefaults.deprecated\n  }\n\n  const endpointOptions = defaultsDeep(options, endpointDefaults)\n\n  const promise = Promise.resolve(endpointOptions)\n    .then(validate.bind(null, endpointParams))\n    .then(octokit.request)\n\n  if (callback) {\n    promise.then(callback.bind(null, null), callback)\n    return\n  }\n\n  return promise\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/endpoint-methods/method.js?");

/***/ }),

/***/ "./lib/plugins/endpoint-methods/validate.js":
/*!**************************************************!*\
  !*** ./lib/plugins/endpoint-methods/validate.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = validate\n\nconst set = __webpack_require__(/*! lodash/set */ \"./node_modules/lodash/set.js\")\nconst get = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\")\nconst HttpError = __webpack_require__(/*! ../../request/http-error */ \"./lib/request/http-error.js\")\nconst deprecate = __webpack_require__(/*! ../../deprecate */ \"./lib/deprecate.js\")\n\nfunction validate (endpointParams, options) {\n  // Alias are handled before validation, as validation rules\n  // ar set the aliased parameter. The `mapTo` property is the other way\n  // around, the final parameter name is the mapTo value, but validation\n  // rules are on parameter with the mapTo property\n  Object.keys(options).forEach(optionName => {\n    if (!endpointParams[optionName] || !endpointParams[optionName].alias) {\n      return\n    }\n\n    set(options, endpointParams[optionName].alias, options[optionName])\n    delete options[optionName]\n\n    // right now all parameters with an alias property also have a deprecated\n    // property, but that might change in future, so we wrap it in the if block,\n    // but ignore if for coverage\n    /* istanbul ignore else */\n    if (endpointParams[optionName].deprecated) {\n      deprecate(`\"${optionName}\" parameter has been renamed to \"${endpointParams[optionName].alias}\"`)\n    }\n  })\n\n  Object.keys(endpointParams).forEach(parameterName => {\n    const parameter = get(endpointParams, parameterName)\n    const expectedType = parameter.type\n    let parentParameterName\n    let parentValue\n    let parentParamIsPresent = true\n    let parentParameterIsArray = false\n\n    if (/\\./.test(parameterName)) {\n      parentParameterName = parameterName.replace(/\\.[^.]+$/, '')\n      parentParameterIsArray = parentParameterName.slice(-2) === '[]'\n      if (parentParameterIsArray) {\n        parentParameterName = parentParameterName.slice(0, -2)\n      }\n      parentValue = get(options, parentParameterName)\n      parentParamIsPresent = parentParameterName === 'headers' || (typeof parentValue === 'object' && parentValue !== null)\n    }\n\n    let values = parentParameterIsArray\n      ? (get(options, parentParameterName) || []).map(value => value[parameterName.split(/\\./).pop()])\n      : [get(options, parameterName)]\n\n    values.forEach((value, i) => {\n      const valueIsPresent = typeof value !== 'undefined'\n      const valueIsNull = value === null\n      const currentParameterName = parentParameterIsArray\n        ? parameterName.replace(/\\[\\]/, `[${i}]`)\n        : parameterName\n\n      if (!parameter.required && !valueIsPresent) {\n        return\n      }\n\n      // if the parent parameter is of type object but allows null\n      // then the child parameters can be ignored\n      if (!parentParamIsPresent) {\n        return\n      }\n\n      if (parameter.allowNull && valueIsNull) {\n        return\n      }\n\n      if (!parameter.allowNull && valueIsNull) {\n        throw new HttpError(`'${currentParameterName}' cannot be null`, 400)\n      }\n\n      if (parameter.required && !valueIsPresent) {\n        throw new HttpError(`Empty value for parameter '${currentParameterName}': ${JSON.stringify(value)}`, 400)\n      }\n\n      // parse to integer before checking for enum\n      // so that string \"1\" will match enum with number 1\n      if (expectedType === 'integer') {\n        const unparsedValue = value\n        value = parseInt(value, 10)\n        if (isNaN(value)) {\n          throw new HttpError(`Invalid value for parameter '${currentParameterName}': ${JSON.stringify(unparsedValue)} is NaN`, 400)\n        }\n      }\n\n      if (parameter.enum && parameter.enum.indexOf(value) === -1) {\n        throw new HttpError(`Invalid value for parameter '${currentParameterName}': ${JSON.stringify(value)}`, 400)\n      }\n\n      if (parameter.validation) {\n        const regex = new RegExp(parameter.validation)\n        if (!regex.test(value)) {\n          throw new HttpError(`Invalid value for parameter '${currentParameterName}': ${JSON.stringify(value)}`, 400)\n        }\n      }\n\n      if (expectedType === 'object' && typeof value === 'string') {\n        try {\n          value = JSON.parse(value)\n        } catch (exception) {\n          throw new HttpError(`JSON parse error of value for parameter '${currentParameterName}': ${JSON.stringify(value)}`, 400)\n        }\n      }\n\n      set(options, parameter.mapTo || currentParameterName, value)\n    })\n  })\n\n  return options\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/endpoint-methods/validate.js?");

/***/ }),

/***/ "./lib/plugins/pagination/get-first-page.js":
/*!**************************************************!*\
  !*** ./lib/plugins/pagination/get-first-page.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = getFirstPage\n\nconst getPage = __webpack_require__(/*! ./get-page */ \"./lib/plugins/pagination/get-page.js\")\n\nfunction getFirstPage (octokit, link, headers, callback) {\n  return getPage(octokit, link, 'first', headers, callback)\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/get-first-page.js?");

/***/ }),

/***/ "./lib/plugins/pagination/get-last-page.js":
/*!*************************************************!*\
  !*** ./lib/plugins/pagination/get-last-page.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = getLastPage\n\nconst getPage = __webpack_require__(/*! ./get-page */ \"./lib/plugins/pagination/get-page.js\")\n\nfunction getLastPage (octokit, link, headers, callback) {\n  return getPage(octokit, link, 'last', headers, callback)\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/get-last-page.js?");

/***/ }),

/***/ "./lib/plugins/pagination/get-next-page.js":
/*!*************************************************!*\
  !*** ./lib/plugins/pagination/get-next-page.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = getNextPage\n\nconst getPage = __webpack_require__(/*! ./get-page */ \"./lib/plugins/pagination/get-page.js\")\n\nfunction getNextPage (octokit, link, headers, callback) {\n  return getPage(octokit, link, 'next', headers, callback)\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/get-next-page.js?");

/***/ }),

/***/ "./lib/plugins/pagination/get-page-links.js":
/*!**************************************************!*\
  !*** ./lib/plugins/pagination/get-page-links.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = getPageLinks\n\nfunction getPageLinks (link) {\n  link = link.link || link.headers.link || ''\n\n  const links = {}\n\n  // link format:\n  // '<https://api.github.com/users/aseemk/followers?page=2>; rel=\"next\", <https://api.github.com/users/aseemk/followers?page=2>; rel=\"last\"'\n  link.replace(/<([^>]*)>;\\s*rel=\"([\\w]*)\"/g, (m, uri, type) => {\n    links[type] = uri\n  })\n\n  return links\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/get-page-links.js?");

/***/ }),

/***/ "./lib/plugins/pagination/get-page.js":
/*!********************************************!*\
  !*** ./lib/plugins/pagination/get-page.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = getPage\n\nconst HttpError = __webpack_require__(/*! ../../request/http-error */ \"./lib/request/http-error.js\")\nconst getPageLinks = __webpack_require__(/*! ./get-page-links */ \"./lib/plugins/pagination/get-page-links.js\")\n\nfunction getPage (octokit, link, which, headers, callback) {\n  if (typeof headers === 'function') {\n    callback = headers\n    headers = null\n  }\n\n  const url = getPageLinks(link)[which]\n\n  if (!url) {\n    const urlError = new HttpError(`No ${which} page found`, 404)\n    if (callback) {\n      return callback(urlError)\n    }\n    return Promise.reject(urlError)\n  }\n\n  const requestOptions = {\n    url,\n    headers: applyAcceptHeader(link, headers)\n  }\n\n  const promise = octokit.request(requestOptions)\n\n  if (callback) {\n    promise.then(callback.bind(null, null), callback)\n    return\n  }\n\n  return promise\n}\n\nfunction applyAcceptHeader (res, headers) {\n  const previous = res.headers && res.headers['x-github-media-type']\n\n  if (!previous || (headers && headers.accept)) {\n    return headers\n  }\n  headers = headers || {}\n  headers.accept = 'application/vnd.' + previous\n    .replace('; param=', '.')\n    .replace('; format=', '+')\n\n  return headers\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/get-page.js?");

/***/ }),

/***/ "./lib/plugins/pagination/get-previous-page.js":
/*!*****************************************************!*\
  !*** ./lib/plugins/pagination/get-previous-page.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = getPreviousPage\n\nconst getPage = __webpack_require__(/*! ./get-page */ \"./lib/plugins/pagination/get-page.js\")\n\nfunction getPreviousPage (octokit, link, headers, callback) {\n  return getPage(octokit, link, 'prev', headers, callback)\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/get-previous-page.js?");

/***/ }),

/***/ "./lib/plugins/pagination/has-first-page.js":
/*!**************************************************!*\
  !*** ./lib/plugins/pagination/has-first-page.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = hasFirstPage\n\nconst getPageLinks = __webpack_require__(/*! ./get-page-links */ \"./lib/plugins/pagination/get-page-links.js\")\n\nfunction hasFirstPage (link) {\n  return getPageLinks(link).first\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/has-first-page.js?");

/***/ }),

/***/ "./lib/plugins/pagination/has-last-page.js":
/*!*************************************************!*\
  !*** ./lib/plugins/pagination/has-last-page.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = hasLastPage\n\nconst getPageLinks = __webpack_require__(/*! ./get-page-links */ \"./lib/plugins/pagination/get-page-links.js\")\n\nfunction hasLastPage (link) {\n  return getPageLinks(link).last\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/has-last-page.js?");

/***/ }),

/***/ "./lib/plugins/pagination/has-next-page.js":
/*!*************************************************!*\
  !*** ./lib/plugins/pagination/has-next-page.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = hasNextPage\n\nconst getPageLinks = __webpack_require__(/*! ./get-page-links */ \"./lib/plugins/pagination/get-page-links.js\")\n\nfunction hasNextPage (link) {\n  return getPageLinks(link).next\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/has-next-page.js?");

/***/ }),

/***/ "./lib/plugins/pagination/has-previous-page.js":
/*!*****************************************************!*\
  !*** ./lib/plugins/pagination/has-previous-page.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = hasPreviousPage\n\nconst getPageLinks = __webpack_require__(/*! ./get-page-links */ \"./lib/plugins/pagination/get-page-links.js\")\n\nfunction hasPreviousPage (link) {\n  return getPageLinks(link).prev\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/has-previous-page.js?");

/***/ }),

/***/ "./lib/plugins/pagination/index.js":
/*!*****************************************!*\
  !*** ./lib/plugins/pagination/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = paginationPlugin\n\nfunction paginationPlugin (octokit) {\n  octokit.getFirstPage = __webpack_require__(/*! ./get-first-page */ \"./lib/plugins/pagination/get-first-page.js\").bind(null, octokit)\n  octokit.getLastPage = __webpack_require__(/*! ./get-last-page */ \"./lib/plugins/pagination/get-last-page.js\").bind(null, octokit)\n  octokit.getNextPage = __webpack_require__(/*! ./get-next-page */ \"./lib/plugins/pagination/get-next-page.js\").bind(null, octokit)\n  octokit.getPreviousPage = __webpack_require__(/*! ./get-previous-page */ \"./lib/plugins/pagination/get-previous-page.js\").bind(null, octokit)\n  octokit.hasFirstPage = __webpack_require__(/*! ./has-first-page */ \"./lib/plugins/pagination/has-first-page.js\")\n  octokit.hasLastPage = __webpack_require__(/*! ./has-last-page */ \"./lib/plugins/pagination/has-last-page.js\")\n  octokit.hasNextPage = __webpack_require__(/*! ./has-next-page */ \"./lib/plugins/pagination/has-next-page.js\")\n  octokit.hasPreviousPage = __webpack_require__(/*! ./has-previous-page */ \"./lib/plugins/pagination/has-previous-page.js\")\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/plugins/pagination/index.js?");

/***/ }),

/***/ "./lib/request/get-buffer-response-browser.js":
/*!****************************************************!*\
  !*** ./lib/request/get-buffer-response-browser.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = getBufferResponse\n\nfunction getBufferResponse (response) {\n  return response.arrayBuffer()\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/request/get-buffer-response-browser.js?");

/***/ }),

/***/ "./lib/request/http-error.js":
/*!***********************************!*\
  !*** ./lib/request/http-error.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst STATUS_CODES = {\n  304: 'Not Modified', // See PR #673 (https://github.com/octokit/rest.js/pull/673)\n  400: 'Bad Request',\n  404: 'Not Found',\n  500: 'Internal Server Error',\n  504: 'Gateway Timeout'\n}\n\nmodule.exports = class HttpError extends Error {\n  constructor (message, code, headers) {\n    super(message)\n    // Maintains proper stack trace for where our error was thrown (only available on V8)\n    /* istanbul ignore else */\n    if (Error.captureStackTrace) {\n      Error.captureStackTrace(this, this.constructor)\n    }\n    this.name = 'HttpError'\n    this.code = code\n    this.status = STATUS_CODES[code]\n    this.headers = headers\n  }\n\n  toString () {\n    return this.message\n  }\n\n  toJSON () {\n    return {\n      code: this.code,\n      status: this.status,\n      message: this.message\n    }\n  }\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/request/http-error.js?");

/***/ }),

/***/ "./lib/request/index.js":
/*!******************************!*\
  !*** ./lib/request/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = restRequest\n\nconst restEndpoint = __webpack_require__(/*! ../endpoint */ \"./lib/endpoint/index.js\")\nconst request = __webpack_require__(/*! ./request */ \"./lib/request/request.js\")\n\nfunction restRequest (endpointOptions) {\n  const requestOptions = restEndpoint(endpointOptions)\n  return request(requestOptions)\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/request/index.js?");

/***/ }),

/***/ "./lib/request/request.js":
/*!********************************!*\
  !*** ./lib/request/request.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = request\n\nconst fetch = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\").default\nconst debug = __webpack_require__(/*! debug */ \"./node_modules/debug/src/browser.js\")('octokit:rest')\nconst defaults = __webpack_require__(/*! lodash/defaults */ \"./node_modules/lodash/defaults.js\")\nconst isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ \"./node_modules/lodash/isPlainObject.js\")\nconst pick = __webpack_require__(/*! lodash/pick */ \"./node_modules/lodash/pick.js\")\n\nconst deprecate = __webpack_require__(/*! ../deprecate */ \"./lib/deprecate.js\")\nconst getBuffer = __webpack_require__(/*! ./get-buffer-response */ \"./lib/request/get-buffer-response-browser.js\")\nconst HttpError = __webpack_require__(/*! ./http-error */ \"./lib/request/http-error.js\")\n\nfunction request (requestOptions) {\n  debug('REQUEST:', requestOptions)\n\n  // calculate content length unless body is a stream, in which case the\n  // content length is already set per option\n  if (requestOptions.body) {\n    defaults(requestOptions.headers, {\n      'content-type': 'application/json; charset=utf-8'\n    })\n  }\n\n  // https://fetch.spec.whatwg.org/#methods\n  requestOptions.method = requestOptions.method.toUpperCase()\n\n  // GitHub expects \"content-length: 0\" header for PUT/PATCH requests without body\n  // fetch does not allow to set `content-length` header, but we can set body to an empty string\n  if (['PATCH', 'PUT'].indexOf(requestOptions.method) >= 0 && !requestOptions.body) {\n    requestOptions.body = ''\n  }\n\n  if (isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {\n    requestOptions.body = JSON.stringify(requestOptions.body)\n  }\n\n  let headers = {}\n  let status\n\n  return fetch(requestOptions.url, pick(requestOptions, 'method', 'body', 'headers', 'timeout', 'agent'))\n\n    .then(response => {\n      status = response.status\n      for (const keyAndValue of response.headers.entries()) {\n        headers[keyAndValue[0]] = keyAndValue[1]\n      }\n\n      if (status === 204 || status === 205) {\n        return\n      }\n\n      // GitHub API returns 200 for HEAD requsets\n      if (requestOptions.method === 'HEAD') {\n        if (status < 400) {\n          return\n        }\n\n        throw new HttpError(response.statusText, status, headers)\n      }\n\n      if (status === 304) {\n        requestOptions.url = response.headers.location\n        throw new HttpError('Not modified', status, headers)\n      }\n\n      if (status >= 400) {\n        return response.text()\n\n          .then(message => {\n            throw new HttpError(message, status, headers)\n          })\n      }\n\n      const contentType = response.headers.get('content-type')\n      if (/application\\/json/.test(contentType)) {\n        return response.json()\n      }\n\n      if (!contentType || /^text\\/|charset=utf-8$/.test(contentType)) {\n        return response.text()\n      }\n\n      return getBuffer(response)\n    })\n\n    .then(data => {\n      return {\n        data,\n        status,\n        headers,\n        get meta () {\n          deprecate('response.meta – use response.headers instead (#896)')\n          return headers\n        }\n      }\n    })\n\n    .catch(error => {\n      if (error instanceof HttpError) {\n        throw error\n      }\n\n      throw new HttpError(error.message, 500, headers)\n    })\n}\n\n\n//# sourceURL=webpack://Octokit/./lib/request/request.js?");

/***/ }),

/***/ "./lib/routes.json":
/*!*************************!*\
  !*** ./lib/routes.json ***!
  \*************************/
/*! exports provided: activity, apps, authorization, checks, enterprise, gists, gitdata, integrations, issues, migrations, misc, orgs, projects, pullRequests, reactions, repos, search, users, default */
/***/ (function(module) {

eval("module.exports = {\"activity\":{\"checkNotificationThreadSubscription\":{\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"thread_id\",\"deprecated\":true},\"thread_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/notifications/threads/:thread_id/subscription\"},\"checkStarringRepo\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/starred/:owner/:repo\"},\"deleteNotificationThreadSubscription\":{\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"thread_id\",\"deprecated\":true},\"thread_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/notifications/threads/:thread_id/subscription\"},\"getEvents\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/events\"},\"getEventsForOrg\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/orgs/:org/events\"},\"getEventsForRepo\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/events\"},\"getEventsForRepoIssues\":{\"alias\":\"issues.getEventsForRepo\",\"deprecated\":\"`activity.getEventsForRepoIssues()` is deprecated, use `issues.getEventsForRepo`\",\"params\":{}},\"getEventsForRepoNetwork\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/networks/:owner/:repo/events\"},\"getEventsForUser\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/events\"},\"getEventsForUserOrg\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/events/orgs/:org\"},\"getEventsForUserPublic\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/events/public\"},\"getEventsReceived\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/received_events\"},\"getEventsReceivedPublic\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/received_events/public\"},\"getFeeds\":{\"method\":\"GET\",\"params\":{},\"url\":\"/feeds\"},\"getNotificationThread\":{\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"thread_id\",\"deprecated\":true},\"thread_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/notifications/threads/:thread_id\"},\"getNotifications\":{\"method\":\"GET\",\"params\":{\"all\":{\"type\":\"boolean\"},\"before\":{\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"participating\":{\"type\":\"boolean\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"}},\"url\":\"/notifications\"},\"getNotificationsForUser\":{\"method\":\"GET\",\"params\":{\"all\":{\"type\":\"boolean\"},\"before\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"participating\":{\"type\":\"boolean\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"since\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/notifications\"},\"getRepoSubscription\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/subscription\"},\"getStargazersForRepo\":{\"headers\":{\"accept\":\"application/vnd.github.v3.star+json\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/stargazers\"},\"getStarredRepos\":{\"headers\":{\"accept\":\"application/vnd.github.v3.star+json\"},\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"sort\":{\"enum\":[\"created\",\"updated\"],\"type\":\"string\"}},\"url\":\"/user/starred\"},\"getStarredReposForUser\":{\"headers\":{\"accept\":\"application/vnd.github.v3.star+json\"},\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"sort\":{\"enum\":[\"created\",\"updated\"],\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/starred\"},\"getWatchedRepos\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/subscriptions\"},\"getWatchedReposForUser\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/subscriptions\"},\"getWatchersForRepo\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/subscribers\"},\"markNotificationThreadAsRead\":{\"method\":\"PATCH\",\"params\":{\"id\":{\"alias\":\"thread_id\",\"deprecated\":true},\"thread_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/notifications/threads/:thread_id\"},\"markNotificationsAsRead\":{\"method\":\"PUT\",\"params\":{\"last_read_at\":{\"type\":\"string\"}},\"url\":\"/notifications\"},\"markNotificationsAsReadForRepo\":{\"method\":\"PUT\",\"params\":{\"last_read_at\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/notifications\"},\"setNotificationThreadSubscription\":{\"method\":\"PUT\",\"params\":{\"id\":{\"alias\":\"thread_id\",\"deprecated\":true},\"ignored\":{\"type\":\"boolean\"},\"thread_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/notifications/threads/:thread_id/subscription\"},\"setRepoSubscription\":{\"method\":\"PUT\",\"params\":{\"ignored\":{\"type\":\"boolean\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"subscribed\":{\"type\":\"boolean\"}},\"url\":\"/repos/:owner/:repo/subscription\"},\"starRepo\":{\"method\":\"PUT\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/starred/:owner/:repo\"},\"unstarRepo\":{\"method\":\"DELETE\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/starred/:owner/:repo\"},\"unwatchRepo\":{\"method\":\"DELETE\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/subscription\"}},\"apps\":{\"addRepoToInstallation\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"PUT\",\"params\":{\"installation_id\":{\"required\":true,\"type\":\"string\"},\"repository_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/installations/:installation_id/repositories/:repository_id\"},\"checkMarketplaceListingAccount\":{\"headers\":{\"accept\":\"application/vnd.github.valkyrie-preview+json\"},\"method\":\"GET\",\"params\":{\"account_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"account_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/marketplace_listing/accounts/:account_id\"},\"checkMarketplaceListingStubbedAccount\":{\"headers\":{\"accept\":\"application/vnd.github.valkyrie-preview+json\"},\"method\":\"GET\",\"params\":{\"account_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"account_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/marketplace_listing/stubbed/accounts/:account_id\"},\"createInstallationToken\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"POST\",\"params\":{\"installation_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/app/installations/:installation_id/access_tokens\"},\"findOrgInstallation\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/installation\"},\"findRepoInstallation\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/installation\"},\"findUserInstallation\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/installation\"},\"get\":{\"method\":\"GET\",\"params\":{},\"url\":\"/app\"},\"getForSlug\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"app_slug\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/apps/:app_slug\"},\"getInstallation\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"installation_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/app/installations/:installation_id\"},\"getInstallationRepositories\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/installation/repositories\"},\"getInstallations\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/app/installations\"},\"getMarketplaceListingPlanAccounts\":{\"headers\":{\"accept\":\"application/vnd.github.valkyrie-preview+json\"},\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"id\":{\"alias\":\"plan_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"plan_id\":{\"required\":true,\"type\":\"string\"},\"sort\":{\"enum\":[\"created\",\"updated\"],\"type\":\"string\"}},\"url\":\"/marketplace_listing/plans/:plan_id/accounts\"},\"getMarketplaceListingPlans\":{\"headers\":{\"accept\":\"application/vnd.github.valkyrie-preview+json\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/marketplace_listing/plans\"},\"getMarketplaceListingStubbedPlanAccounts\":{\"headers\":{\"accept\":\"application/vnd.github.valkyrie-preview+json\"},\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"id\":{\"alias\":\"plan_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"plan_id\":{\"required\":true,\"type\":\"string\"},\"sort\":{\"enum\":[\"created\",\"updated\"],\"type\":\"string\"}},\"url\":\"/marketplace_listing/stubbed/plans/:plan_id/accounts\"},\"getMarketplaceListingStubbedPlans\":{\"headers\":{\"accept\":\"application/vnd.github.valkyrie-preview+json\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/marketplace_listing/stubbed/plans\"},\"removeRepoFromInstallation\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"DELETE\",\"params\":{\"installation_id\":{\"required\":true,\"type\":\"string\"},\"repository_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/installations/:installation_id/repositories/:repository_id\"}},\"authorization\":{\"check\":{\"method\":\"GET\",\"params\":{\"access_token\":{\"required\":true,\"type\":\"string\"},\"client_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/applications/:client_id/tokens/:access_token\"},\"create\":{\"method\":\"POST\",\"params\":{\"client_id\":{\"type\":\"string\"},\"client_secret\":{\"type\":\"string\"},\"fingerprint\":{\"type\":\"string\"},\"note\":{\"required\":true,\"type\":\"string\"},\"note_url\":{\"type\":\"string\"},\"scopes\":{\"type\":\"string[]\"}},\"url\":\"/authorizations\"},\"delete\":{\"method\":\"DELETE\",\"params\":{\"authorization_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"authorization_id\",\"deprecated\":true}},\"url\":\"/authorizations/:authorization_id\"},\"deleteGrant\":{\"method\":\"DELETE\",\"params\":{\"grant_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"grant_id\",\"deprecated\":true}},\"url\":\"/applications/grants/:grant_id\"},\"get\":{\"method\":\"GET\",\"params\":{\"authorization_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"authorization_id\",\"deprecated\":true}},\"url\":\"/authorizations/:authorization_id\"},\"getAll\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/authorizations\"},\"getGrant\":{\"method\":\"GET\",\"params\":{\"grant_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"grant_id\",\"deprecated\":true}},\"url\":\"/applications/grants/:grant_id\"},\"getGrants\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/applications/grants\"},\"getOrCreateAuthorizationForApp\":{\"method\":\"PUT\",\"params\":{\"client_id\":{\"required\":true,\"type\":\"string\"},\"client_secret\":{\"required\":true,\"type\":\"string\"},\"fingerprint\":{\"type\":\"string\"},\"note\":{\"type\":\"string\"},\"note_url\":{\"type\":\"string\"},\"scopes\":{\"type\":\"string[]\"}},\"url\":\"/authorizations/clients/:client_id\"},\"getOrCreateAuthorizationForAppAndFingerprint\":{\"method\":\"PUT\",\"params\":{\"client_id\":{\"required\":true,\"type\":\"string\"},\"client_secret\":{\"required\":true,\"type\":\"string\"},\"fingerprint\":{\"required\":true,\"type\":\"string\"},\"note\":{\"type\":\"string\"},\"note_url\":{\"type\":\"string\"},\"scopes\":{\"type\":\"string[]\"}},\"url\":\"/authorizations/clients/:client_id/:fingerprint\"},\"reset\":{\"method\":\"POST\",\"params\":{\"access_token\":{\"required\":true,\"type\":\"string\"},\"client_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/applications/:client_id/tokens/:access_token\"},\"revoke\":{\"method\":\"DELETE\",\"params\":{\"access_token\":{\"required\":true,\"type\":\"string\"},\"client_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/applications/:client_id/tokens/:access_token\"},\"revokeGrant\":{\"method\":\"DELETE\",\"params\":{\"access_token\":{\"required\":true,\"type\":\"string\"},\"client_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/applications/:client_id/grants/:access_token\"},\"update\":{\"method\":\"PATCH\",\"params\":{\"add_scopes\":{\"type\":\"string[]\"},\"authorization_id\":{\"required\":true,\"type\":\"string\"},\"fingerprint\":{\"type\":\"string\"},\"id\":{\"alias\":\"authorization_id\",\"deprecated\":true},\"note\":{\"type\":\"string\"},\"note_url\":{\"type\":\"string\"},\"remove_scopes\":{\"type\":\"string[]\"},\"scopes\":{\"type\":\"string[]\"}},\"url\":\"/authorizations/:authorization_id\"}},\"checks\":{\"create\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json,application/vnd.github.machine-man-preview+json\"},\"method\":\"POST\",\"params\":{\"actions\":{\"type\":\"object[]\"},\"actions[].description\":{\"required\":true,\"type\":\"string\"},\"actions[].identifier\":{\"required\":true,\"type\":\"string\"},\"actions[].label\":{\"required\":true,\"type\":\"string\"},\"completed_at\":{\"type\":\"string\"},\"conclusion\":{\"enum\":[\"success\",\"failure\",\"neutral\",\"cancelled\",\"timed_out\",\"action_required\",\"details_url\",\"conclusion\",\"status\",\"completed\"],\"type\":\"string\"},\"details_url\":{\"type\":\"string\"},\"external_id\":{\"type\":\"string\"},\"head_sha\":{\"required\":true,\"type\":\"string\"},\"name\":{\"required\":true,\"type\":\"string\"},\"output\":{\"type\":\"object\"},\"output.annotations\":{\"type\":\"object[]\"},\"output.annotations[].annotation_level\":{\"enum\":[\"notice\",\"warning\",\"failure\"],\"required\":true,\"type\":\"string\"},\"output.annotations[].end_column\":{\"type\":\"integer\"},\"output.annotations[].end_line\":{\"required\":true,\"type\":\"integer\"},\"output.annotations[].filename\":{\"alias\":\"output.annotations[].path\"},\"output.annotations[].message\":{\"required\":true,\"type\":\"string\"},\"output.annotations[].path\":{\"required\":true,\"type\":\"string\"},\"output.annotations[].raw_details\":{\"type\":\"string\"},\"output.annotations[].start_column\":{\"type\":\"integer\"},\"output.annotations[].start_line\":{\"required\":true,\"type\":\"integer\"},\"output.annotations[].title\":{\"type\":\"string\"},\"output.annotations[].warning_level\":{\"alias\":\"annotation_level\"},\"output.images\":{\"type\":\"object[]\"},\"output.images[].alt\":{\"required\":true,\"type\":\"string\"},\"output.images[].caption\":{\"type\":\"string\"},\"output.images[].image_url\":{\"required\":true,\"type\":\"string\"},\"output.summary\":{\"required\":true,\"type\":\"string\"},\"output.text\":{\"type\":\"string\"},\"output.title\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"started_at\":{\"type\":\"string\"},\"status\":{\"enum\":[\"queued\",\"in_progress\",\"completed\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/check-runs\"},\"createSuite\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json\"},\"method\":\"POST\",\"params\":{\"head_sha\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/check-suites\"},\"get\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json,application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"check_run_id\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/check-runs/:check_run_id\"},\"getSuite\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json,application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"check_suite_id\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/check-suites/:check_suite_id\"},\"listAnnotations\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json,application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"check_run_id\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/check-runs/:check_run_id/annotations\"},\"listForRef\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json,application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"check_name\":{\"type\":\"string\"},\"filter\":{\"enum\":[\"latest\",\"all\"],\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"status\":{\"enum\":[\"queued\",\"in_progress\",\"completed\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/commits/:ref/check-runs\"},\"listForSuite\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json,application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"check_name\":{\"type\":\"string\"},\"check_suite_id\":{\"required\":true,\"type\":\"string\"},\"filter\":{\"enum\":[\"latest\",\"all\"],\"type\":\"string\"},\"id\":{\"alias\":\"check_suite_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"status\":{\"enum\":[\"queued\",\"in_progress\",\"completed\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/check-suites/:check_suite_id/check-runs\"},\"listSuitesForRef\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json,application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"app_id\":{\"type\":\"integer\"},\"check_name\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/commits/:ref/check-suites\"},\"requestSuites\":{\"deprecated\":\"use `rerequestSuite` instead\",\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json\"},\"method\":\"POST\",\"params\":{\"head_sha\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/check-suite-requests\"},\"rerequestSuite\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json\"},\"method\":\"POST\",\"params\":{\"check_suite_id\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/check-suites/:check_suite_id/rerequest\"},\"setSuitesPreferences\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json,application/vnd.github.machine-man-preview+json\"},\"method\":\"PATCH\",\"params\":{\"auto_trigger_checks\":{\"type\":\"object[]\"},\"auto_trigger_checks[].app_id\":{\"required\":true,\"type\":\"integer\"},\"auto_trigger_checks[].setting\":{\"required\":true,\"type\":\"boolean\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/check-suites/preferences\"},\"update\":{\"headers\":{\"accept\":\"application/vnd.github.antiope-preview+json,application/vnd.github.machine-man-preview+json\"},\"method\":\"PATCH\",\"params\":{\"actions\":{\"type\":\"object[]\"},\"actions[].description\":{\"required\":true,\"type\":\"string\"},\"actions[].identifier\":{\"required\":true,\"type\":\"string\"},\"actions[].label\":{\"required\":true,\"type\":\"string\"},\"check_run_id\":{\"required\":true,\"type\":\"string\"},\"completed_at\":{\"type\":\"string\"},\"conclusion\":{\"enum\":[\"success\",\"failure\",\"neutral\",\"cancelled\",\"timed_out\",\"action_required\",\"conclusion\",\"status\",\"completed\"],\"type\":\"string\"},\"details_url\":{\"type\":\"string\"},\"external_id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"output\":{\"type\":\"object\"},\"output.annotations\":{\"type\":\"object[]\"},\"output.annotations[].annotation_level\":{\"enum\":[\"notice\",\"warning\",\"failure\"],\"required\":true,\"type\":\"string\"},\"output.annotations[].end_column\":{\"type\":\"integer\"},\"output.annotations[].end_line\":{\"required\":true,\"type\":\"integer\"},\"output.annotations[].filename\":{\"alias\":\"output.annotations[].path\"},\"output.annotations[].message\":{\"required\":true,\"type\":\"string\"},\"output.annotations[].path\":{\"required\":true,\"type\":\"string\"},\"output.annotations[].raw_details\":{\"type\":\"string\"},\"output.annotations[].start_column\":{\"type\":\"integer\"},\"output.annotations[].start_line\":{\"required\":true,\"type\":\"integer\"},\"output.annotations[].title\":{\"type\":\"string\"},\"output.annotations[].warning_level\":{\"alias\":\"annotation_level\"},\"output.images\":{\"type\":\"object[]\"},\"output.images[].alt\":{\"required\":true,\"type\":\"string\"},\"output.images[].caption\":{\"type\":\"string\"},\"output.images[].image_url\":{\"required\":true,\"type\":\"string\"},\"output.summary\":{\"required\":true,\"type\":\"string\"},\"output.text\":{\"type\":\"string\"},\"output.title\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"started_at\":{\"type\":\"string\"},\"status\":{\"enum\":[\"queued\",\"in_progress\",\"completed\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/check-runs/:check_run_id\"}},\"enterprise\":{\"createOrg\":{\"method\":\"POST\",\"params\":{\"admin\":{\"required\":true,\"type\":\"string\"},\"login\":{\"required\":true,\"type\":\"string\"},\"profile_name\":{\"type\":\"string\"}},\"url\":\"/admin/organizations\"},\"createPreReceiveEnvironment\":{\"headers\":{\"accept\":\"application/vnd.github.eye-scream-preview\"},\"method\":\"POST\",\"params\":{\"image_url\":{\"required\":true,\"type\":\"string\"},\"name\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/pre-receive-environments\"},\"createPreReceiveHook\":{\"headers\":{\"accept\":\"application/vnd.github.eye-scream-preview\"},\"method\":\"POST\",\"params\":{\"allow_downstream_configuration\":{\"type\":\"boolean\"},\"enforcement\":{\"type\":\"string\"},\"environment\":{\"required\":true,\"type\":\"object\"},\"name\":{\"required\":true,\"type\":\"string\"},\"script\":{\"required\":true,\"type\":\"string\"},\"script_repository\":{\"required\":true,\"type\":\"object\"}},\"url\":\"/admin/pre-receive-hooks\"},\"deletePreReceiveEnvironment\":{\"method\":\"DELETE\",\"params\":{\"id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/pre-receive-environments/:id\"},\"deletePreReceiveHook\":{\"method\":\"DELETE\",\"params\":{\"id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/pre_receive_hooks/:id\"},\"editPreReceiveEnvironment\":{\"method\":\"PATCH\",\"params\":{\"id\":{\"required\":true,\"type\":\"string\"},\"image_url\":{\"required\":true,\"type\":\"string\"},\"name\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/pre-receive-environments/:id\"},\"editPreReceiveHook\":{\"method\":\"PATCH\",\"params\":{\"hook\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"object\"},\"id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/pre_receive_hooks/:id\"},\"getLicense\":{\"method\":\"GET\",\"params\":{},\"url\":\"/enterprise/settings/license\"},\"getPreReceiveEnvironment\":{\"headers\":{\"accept\":\"application/vnd.github.eye-scream-preview\"},\"method\":\"GET\",\"params\":{\"id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/pre-receive-environments/:id\"},\"getPreReceiveEnvironmentDownloadStatus\":{\"headers\":{\"accept\":\"application/vnd.github.eye-scream-preview\"},\"method\":\"GET\",\"params\":{\"id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/pre-receive-environments/:id/downloads/latest\"},\"getPreReceiveEnvironments\":{\"headers\":{\"accept\":\"application/vnd.github.eye-scream-preview\"},\"method\":\"GET\",\"params\":{},\"url\":\"/admin/pre-receive-environments\"},\"getPreReceiveHook\":{\"headers\":{\"accept\":\"application/vnd.github.eye-scream-preview\"},\"method\":\"GET\",\"params\":{\"id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/pre-receive-hooks/:id\"},\"getPreReceiveHooks\":{\"headers\":{\"accept\":\"application/vnd.github.eye-scream-preview\"},\"method\":\"GET\",\"params\":{},\"url\":\"/admin/pre-receive-hooks\"},\"queueIndexingJob\":{\"method\":\"POST\",\"params\":{\"target\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/staff/indexing_jobs\"},\"stats\":{\"method\":\"GET\",\"params\":{\"type\":{\"enum\":[\"issues\",\"hooks\",\"milestones\",\"orgs\",\"comments\",\"pages\",\"users\",\"gists\",\"pulls\",\"repos\",\"all\"],\"required\":true,\"type\":\"string\"}},\"url\":\"/enterprise/stats/:type\"},\"syncLdapForTeam\":{\"method\":\"POST\",\"params\":{\"team_id\":{\"required\":true,\"type\":\"integer\"}},\"url\":\"/admin/ldap/teams/:team_id/sync\"},\"syncLdapForUser\":{\"method\":\"POST\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/ldap/users/:username/sync\"},\"triggerPreReceiveEnvironmentDownload\":{\"headers\":{\"accept\":\"application/vnd.github.eye-scream-preview\"},\"method\":\"POST\",\"params\":{\"id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/pre-receive-environments/:id/downloads\"},\"updateLdapForTeam\":{\"method\":\"PATCH\",\"params\":{\"ldap_dn\":{\"required\":true,\"type\":\"string\"},\"team_id\":{\"required\":true,\"type\":\"integer\"}},\"url\":\"/admin/ldap/teams/:team_id/mapping\"},\"updateLdapForUser\":{\"method\":\"PATCH\",\"params\":{\"ldap_dn\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/admin/ldap/users/:username/mapping\"}},\"gists\":{\"checkStar\":{\"method\":\"GET\",\"params\":{\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gist_id\",\"deprecated\":true}},\"url\":\"/gists/:gist_id/star\"},\"create\":{\"method\":\"POST\",\"params\":{\"description\":{\"type\":\"string\"},\"files\":{\"required\":true,\"type\":\"object\"},\"files.content\":{\"type\":\"string\"},\"public\":{\"type\":\"boolean\"}},\"url\":\"/gists\"},\"createComment\":{\"method\":\"POST\",\"params\":{\"body\":{\"required\":true,\"type\":\"string\"},\"gist_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/gists/:gist_id/comments\"},\"delete\":{\"method\":\"DELETE\",\"params\":{\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gist_id\",\"deprecated\":true}},\"url\":\"/gists/:gist_id\"},\"deleteComment\":{\"method\":\"DELETE\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true}},\"url\":\"/gists/:gist_id/comments/:comment_id\"},\"edit\":{\"method\":\"PATCH\",\"params\":{\"description\":{\"type\":\"string\"},\"files\":{\"type\":\"object\"},\"files.content\":{\"type\":\"string\"},\"files.filename\":{\"type\":\"string\"},\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gist_id\",\"deprecated\":true}},\"url\":\"/gists/:gist_id\"},\"editComment\":{\"method\":\"PATCH\",\"params\":{\"body\":{\"required\":true,\"type\":\"string\"},\"comment_id\":{\"required\":true,\"type\":\"string\"},\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true}},\"url\":\"/gists/:gist_id/comments/:comment_id\"},\"fork\":{\"method\":\"POST\",\"params\":{\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gist_id\",\"deprecated\":true}},\"url\":\"/gists/:gist_id/forks\"},\"get\":{\"method\":\"GET\",\"params\":{\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gist_id\",\"deprecated\":true}},\"url\":\"/gists/:gist_id\"},\"getAll\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"}},\"url\":\"/gists\"},\"getComment\":{\"method\":\"GET\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true}},\"url\":\"/gists/:gist_id/comments/:comment_id\"},\"getComments\":{\"method\":\"GET\",\"params\":{\"gist_id\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/gists/:gist_id/comments\"},\"getCommits\":{\"method\":\"GET\",\"params\":{\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gist_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/gists/:gist_id/commits\"},\"getForUser\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/gists\"},\"getForks\":{\"method\":\"GET\",\"params\":{\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gist_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/gists/:gist_id/forks\"},\"getPublic\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"}},\"url\":\"/gists/public\"},\"getRevision\":{\"method\":\"GET\",\"params\":{\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gist_id\",\"deprecated\":true},\"sha\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/gists/:gist_id/:sha\"},\"getStarred\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"}},\"url\":\"/gists/starred\"},\"star\":{\"method\":\"PUT\",\"params\":{\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gist_id\",\"deprecated\":true}},\"url\":\"/gists/:gist_id/star\"},\"unstar\":{\"method\":\"DELETE\",\"params\":{\"gist_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gist_id\",\"deprecated\":true}},\"url\":\"/gists/:gist_id/star\"}},\"gitdata\":{\"createBlob\":{\"method\":\"POST\",\"params\":{\"content\":{\"required\":true,\"type\":\"string\"},\"encoding\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/blobs\"},\"createCommit\":{\"method\":\"POST\",\"params\":{\"author\":{\"type\":\"object\"},\"committer\":{\"type\":\"object\"},\"message\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"parents\":{\"required\":true,\"type\":\"string[]\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"tree\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/commits\"},\"createReference\":{\"method\":\"POST\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/refs\"},\"createTag\":{\"method\":\"POST\",\"params\":{\"message\":{\"required\":true,\"type\":\"string\"},\"object\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"tag\":{\"required\":true,\"type\":\"string\"},\"tagger\":{\"type\":\"object\"},\"tagger.date\":{\"type\":\"string\"},\"tagger.email\":{\"type\":\"string\"},\"tagger.name\":{\"type\":\"string\"},\"type\":{\"enum\":[\"commit\",\"tree\",\"blob\"],\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/tags\"},\"createTree\":{\"method\":\"POST\",\"params\":{\"base_tree\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"tree\":{\"required\":true,\"type\":\"object[]\"},\"tree[].content\":{\"type\":\"string\"},\"tree[].mode\":{\"enum\":[\"100644\",\"100755\",\"040000\",\"160000\",\"120000\"],\"type\":\"string\"},\"tree[].path\":{\"type\":\"string\"},\"tree[].sha\":{\"type\":\"string\"},\"tree[].type\":{\"enum\":[\"blob\",\"tree\",\"commit\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/trees\"},\"deleteReference\":{\"method\":\"DELETE\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/refs/:ref\"},\"getBlob\":{\"method\":\"GET\",\"params\":{\"file_sha\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"alias\":\"file_sha\",\"deprecated\":true}},\"url\":\"/repos/:owner/:repo/git/blobs/:file_sha\"},\"getCommit\":{\"method\":\"GET\",\"params\":{\"commit_sha\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"alias\":\"commit_sha\",\"deprecated\":true}},\"url\":\"/repos/:owner/:repo/git/commits/:commit_sha\"},\"getCommitSignatureVerification\":{\"method\":\"GET\",\"params\":{\"commit_sha\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"alias\":\"commit_sha\",\"deprecated\":true}},\"url\":\"/repos/:owner/:repo/git/commits/:commit_sha\"},\"getReference\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/refs/:ref\"},\"getReferences\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/refs\"},\"getTag\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"alias\":\"tag_sha\",\"deprecated\":true},\"tag_sha\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/tags/:tag_sha\"},\"getTagSignatureVerification\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"alias\":\"tag_sha\",\"deprecated\":true},\"tag_sha\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/tags/:tag_sha\"},\"getTags\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/refs/tags\"},\"getTree\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"recursive\":{\"enum\":[1],\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"alias\":\"tree_sha\",\"deprecated\":true},\"tree_sha\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/trees/:tree_sha\"},\"updateReference\":{\"method\":\"PATCH\",\"params\":{\"force\":{\"type\":\"boolean\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/git/refs/:ref\"}},\"integrations\":{\"addRepoToInstallation\":{\"deprecated\":\"`integrations` has been renamed to `apps`\",\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"PUT\",\"params\":{\"installation_id\":{\"required\":true,\"type\":\"string\"},\"repository_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/installations/:installation_id/repositories/:repository_id\"},\"createInstallationToken\":{\"deprecated\":\"`integrations` has been renamed to `apps`\",\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"POST\",\"params\":{\"installation_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/installations/:installation_id/access_tokens\"},\"getInstallationRepositories\":{\"deprecated\":\"`integrations` has been renamed to `apps`\",\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{},\"url\":\"/installation/repositories\"},\"getInstallations\":{\"deprecated\":\"`integrations` has been renamed to `apps`\",\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/app/installations\"},\"removeRepoFromInstallation\":{\"deprecated\":\"`integrations` has been renamed to `apps`\",\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"DELETE\",\"params\":{\"installation_id\":{\"required\":true,\"type\":\"string\"},\"repository_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/installations/:installation_id/repositories/:repository_id\"}},\"issues\":{\"addAssigneesToIssue\":{\"method\":\"POST\",\"params\":{\"assignees\":{\"type\":\"string[]\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/assignees\"},\"addLabels\":{\"method\":\"POST\",\"params\":{\"labels\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/labels\"},\"checkAssignee\":{\"method\":\"GET\",\"params\":{\"assignee\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/assignees/:assignee\"},\"create\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"POST\",\"params\":{\"assignee\":{\"type\":\"string\"},\"assignees\":{\"type\":\"string[]\"},\"body\":{\"type\":\"string\"},\"labels\":{\"type\":\"string[]\"},\"milestone\":{\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"title\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues\"},\"createComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"POST\",\"params\":{\"body\":{\"required\":true,\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/comments\"},\"createLabel\":{\"method\":\"POST\",\"params\":{\"color\":{\"required\":true,\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"name\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/labels\"},\"createMilestone\":{\"method\":\"POST\",\"params\":{\"description\":{\"type\":\"string\"},\"due_on\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\"],\"type\":\"string\"},\"title\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/milestones\"},\"deleteComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"DELETE\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/comments/:comment_id\"},\"deleteLabel\":{\"method\":\"DELETE\",\"params\":{\"name\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/labels/:name\"},\"deleteMilestone\":{\"method\":\"DELETE\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/milestones/:number\"},\"edit\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"PATCH\",\"params\":{\"assignee\":{\"type\":\"string\"},\"assignees\":{\"type\":\"string[]\"},\"body\":{\"type\":\"string\"},\"labels\":{\"type\":\"string[]\"},\"milestone\":{\"allowNull\":true,\"type\":\"integer\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\"],\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number\"},\"editComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"PATCH\",\"params\":{\"body\":{\"required\":true,\"type\":\"string\"},\"comment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/comments/:comment_id\"},\"get\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number\"},\"getAll\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"filter\":{\"enum\":[\"assigned\",\"created\",\"mentioned\",\"subscribed\",\"all\"],\"type\":\"string\"},\"labels\":{\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"},\"sort\":{\"enum\":[\"created\",\"updated\",\"comments\"],\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\",\"all\"],\"type\":\"string\"}},\"url\":\"/issues\"},\"getAssignees\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/assignees\"},\"getComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/comments/:comment_id\"},\"getComments\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"since\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/comments\"},\"getCommentsForRepo\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"since\":{\"type\":\"string\"},\"sort\":{\"enum\":[\"created\",\"updated\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/comments\"},\"getEvent\":{\"method\":\"GET\",\"params\":{\"event_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"event_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/events/:event_id\"},\"getEvents\":{\"method\":\"GET\",\"params\":{\"issue_number\":{\"alias\":\"number\",\"deprecated\":true},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/events\"},\"getEventsForRepo\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/events\"},\"getEventsTimeline\":{\"headers\":{\"accept\":\"application/vnd.github.mockingbird-preview\"},\"method\":\"GET\",\"params\":{\"issue_number\":{\"alias\":\"number\",\"deprecated\":true},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/timeline\"},\"getForOrg\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"filter\":{\"enum\":[\"assigned\",\"created\",\"mentioned\",\"subscribed\",\"all\"],\"type\":\"string\"},\"labels\":{\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"},\"sort\":{\"enum\":[\"created\",\"updated\",\"comments\"],\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\",\"all\"],\"type\":\"string\"}},\"url\":\"/orgs/:org/issues\"},\"getForRepo\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"assignee\":{\"type\":\"string\"},\"creator\":{\"type\":\"string\"},\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"labels\":{\"type\":\"string\"},\"mentioned\":{\"type\":\"string\"},\"milestone\":{\"type\":\"string\",\"validation\":\"^([0-9]+|none|\\\\*)$\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"since\":{\"type\":\"string\"},\"sort\":{\"enum\":[\"created\",\"updated\",\"comments\"],\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\",\"all\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues\"},\"getForUser\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"filter\":{\"enum\":[\"assigned\",\"created\",\"mentioned\",\"subscribed\",\"all\"],\"type\":\"string\"},\"labels\":{\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"},\"sort\":{\"enum\":[\"created\",\"updated\",\"comments\"],\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\",\"all\"],\"type\":\"string\"}},\"url\":\"/user/issues\"},\"getIssueLabels\":{\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/labels\"},\"getLabel\":{\"method\":\"GET\",\"params\":{\"name\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/labels/:name\"},\"getLabels\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/labels\"},\"getMilestone\":{\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/milestones/:number\"},\"getMilestoneLabels\":{\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/milestones/:number/labels\"},\"getMilestones\":{\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sort\":{\"enum\":[\"due_on\",\"completeness\"],\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\",\"all\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/milestones\"},\"lock\":{\"method\":\"PUT\",\"params\":{\"lock_reason\":{\"enum\":[\"off-topic\",\"too heated\",\"resolved\",\"spam\"],\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/lock\"},\"removeAllLabels\":{\"method\":\"DELETE\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/labels\"},\"removeAssigneesFromIssue\":{\"method\":\"DELETE\",\"params\":{\"assignees\":{\"type\":\"string[]\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/assignees\"},\"removeLabel\":{\"method\":\"DELETE\",\"params\":{\"name\":{\"required\":true,\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/labels/:name\"},\"replaceAllLabels\":{\"method\":\"PUT\",\"params\":{\"labels\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/labels\"},\"unlock\":{\"method\":\"DELETE\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/lock\"},\"updateLabel\":{\"method\":\"PATCH\",\"params\":{\"color\":{\"type\":\"string\"},\"current_name\":{\"required\":true,\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"oldname\":{\"alias\":\"current_name\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/labels/:current_name\"},\"updateMilestone\":{\"method\":\"PATCH\",\"params\":{\"description\":{\"type\":\"string\"},\"due_on\":{\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\"],\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/milestones/:number\"}},\"migrations\":{\"cancelImport\":{\"headers\":{\"accept\":\"application/vnd.github.barred-rock-preview\"},\"method\":\"DELETE\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/import\"},\"deleteArchiveForAuthenticatedUser\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"DELETE\",\"params\":{\"migration_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/migrations/:migration_id/archive\"},\"deleteMigrationArchive\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"migration_id\",\"deprecated\":true},\"migration_id\":{\"required\":true,\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/migrations/:migration_id/archive\"},\"getArchiveForAuthenticatedUser\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"GET\",\"params\":{\"migration_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/migrations/:migration_id/archive\"},\"getImportCommitAuthors\":{\"headers\":{\"accept\":\"application/vnd.github.barred-rock-preview\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"since\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/import/authors\"},\"getImportProgress\":{\"headers\":{\"accept\":\"application/vnd.github.barred-rock-preview\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/import\"},\"getLargeImportFiles\":{\"headers\":{\"accept\":\"application/vnd.github.barred-rock-preview\"},\"method\":\"GET\",\"params\":{\"name\":{\"alias\":\"repo\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/import/large_files\"},\"getMigrationArchiveLink\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"migration_id\",\"deprecated\":true},\"migration_id\":{\"required\":true,\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/migrations/:migration_id/archive\"},\"getMigrationStatus\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"migration_id\",\"deprecated\":true},\"migration_id\":{\"required\":true,\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/migrations/:migration_id\"},\"getMigrations\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/orgs/:org/migrations\"},\"getStatusForAuthenticatedUser\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"GET\",\"params\":{\"migration_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/migrations/:migration_id\"},\"listForAuthenticatedUser\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/migrations\"},\"mapImportCommitAuthor\":{\"headers\":{\"accept\":\"application/vnd.github.barred-rock-preview\"},\"method\":\"PATCH\",\"params\":{\"author_id\":{\"required\":true,\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/import/authors/:author_id\"},\"setImportLfsPreference\":{\"headers\":{\"accept\":\"application/vnd.github.barred-rock-preview\"},\"method\":\"PATCH\",\"params\":{\"name\":{\"alias\":\"repo\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"use_lfs\":{\"enum\":[\"opt_in\",\"opt_out\"],\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/import/lfs\"},\"startForAuthenticatedUser\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"POST\",\"params\":{\"exclude_attachments\":{\"type\":\"boolean\"},\"lock_repositories\":{\"type\":\"boolean\"},\"repositories\":{\"required\":true,\"type\":\"string[]\"}},\"url\":\"/user/migrations\"},\"startImport\":{\"headers\":{\"accept\":\"application/vnd.github.barred-rock-preview\"},\"method\":\"PUT\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"tfvc_project\":{\"type\":\"string\"},\"vcs\":{\"enum\":[\"subversion\",\"git\",\"mercurial\",\"tfvc\"],\"type\":\"string\"},\"vcs_password\":{\"type\":\"string\"},\"vcs_url\":{\"required\":true,\"type\":\"string\"},\"vcs_username\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/import\"},\"startMigration\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"POST\",\"params\":{\"exclude_attachments\":{\"type\":\"boolean\"},\"lock_repositories\":{\"type\":\"boolean\"},\"org\":{\"required\":true,\"type\":\"string\"},\"repositories\":{\"required\":true,\"type\":\"string[]\"}},\"url\":\"/orgs/:org/migrations\"},\"unlockRepoForAuthenticatedUser\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"DELETE\",\"params\":{\"migration_id\":{\"required\":true,\"type\":\"string\"},\"repo_name\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/migrations/:migration_id/repos/:repo_name/lock\"},\"unlockRepoLockedForMigration\":{\"headers\":{\"accept\":\"application/vnd.github.wyandotte-preview+json\"},\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"migration_id\",\"deprecated\":true},\"migration_id\":{\"required\":true,\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"},\"repo_name\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/migrations/:migration_id/repos/:repo_name/lock\"},\"updateImport\":{\"headers\":{\"accept\":\"application/vnd.github.barred-rock-preview\"},\"method\":\"PATCH\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"vcs_password\":{\"type\":\"string\"},\"vcs_username\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/import\"}},\"misc\":{\"getCodeOfConduct\":{\"headers\":{\"accept\":\"application/vnd.github.scarlet-witch-preview+json\"},\"method\":\"GET\",\"params\":{\"key\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/codes_of_conduct/:key\"},\"getCodesOfConduct\":{\"headers\":{\"accept\":\"application/vnd.github.scarlet-witch-preview+json\"},\"method\":\"GET\",\"params\":{},\"url\":\"/codes_of_conduct\"},\"getEmojis\":{\"method\":\"GET\",\"params\":{},\"url\":\"/emojis\"},\"getGitignoreTemplate\":{\"method\":\"GET\",\"params\":{\"name\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/gitignore/templates/:name\"},\"getGitignoreTemplates\":{\"method\":\"GET\",\"params\":{},\"url\":\"/gitignore/templates\"},\"getLicense\":{\"headers\":{\"accept\":\"application/vnd.github.drax-preview+json\"},\"method\":\"GET\",\"params\":{\"license\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/licenses/:license\"},\"getLicenses\":{\"headers\":{\"accept\":\"application/vnd.github.drax-preview+json\"},\"method\":\"GET\",\"params\":{},\"url\":\"/licenses\"},\"getMeta\":{\"method\":\"GET\",\"params\":{},\"url\":\"/meta\"},\"getRateLimit\":{\"method\":\"GET\",\"params\":{},\"url\":\"/rate_limit\"},\"getRepoCodeOfConduct\":{\"headers\":{\"accept\":\"application/vnd.github.scarlet-witch-preview+json\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/community/code_of_conduct\"},\"getRepoLicense\":{\"headers\":{\"accept\":\"application/vnd.github.drax-preview+json\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/license\"},\"renderMarkdown\":{\"method\":\"POST\",\"params\":{\"context\":{\"type\":\"string\"},\"mode\":{\"enum\":[\"markdown\",\"gfm\"],\"type\":\"string\"},\"text\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/markdown\"},\"renderMarkdownRaw\":{\"headers\":{\"content-type\":\"text/plain; charset=utf-8\"},\"method\":\"POST\",\"params\":{\"data\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string\"}},\"url\":\"/markdown/raw\"}},\"orgs\":{\"addOrgMembership\":{\"method\":\"PUT\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"role\":{\"enum\":[\"admin\",\"member\"],\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/memberships/:username\"},\"addTeamMembership\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"PUT\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"role\":{\"enum\":[\"member\",\"maintainer\"],\"type\":\"string\"},\"team_id\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/memberships/:username\"},\"addTeamRepo\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"PUT\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"org\":{\"alias\":\"owner\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"permission\":{\"enum\":[\"pull\",\"push\",\"admin\"],\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/repos/:owner/:repo\"},\"blockUser\":{\"headers\":{\"accept\":\"application/vnd.github.giant-sentry-fist-preview+json\"},\"method\":\"PUT\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/blocks/:username\"},\"checkBlockedUser\":{\"headers\":{\"accept\":\"application/vnd.github.giant-sentry-fist-preview+json\"},\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/blocks/:username\"},\"checkMembership\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/members/:username\"},\"checkPublicMembership\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/public_members/:username\"},\"checkTeamRepo\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/repos/:owner/:repo\"},\"concealMembership\":{\"method\":\"DELETE\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/public_members/:username\"},\"convertMemberToOutsideCollaborator\":{\"method\":\"PUT\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/outside_collaborators/:username\"},\"createHook\":{\"method\":\"POST\",\"params\":{\"active\":{\"type\":\"boolean\"},\"config\":{\"required\":true,\"type\":\"object\"},\"config.content_type\":{\"type\":\"string\"},\"config.insecure_ssl\":{\"type\":\"string\"},\"config.secret\":{\"type\":\"string\"},\"config.url\":{\"required\":true,\"type\":\"string\"},\"events\":{\"type\":\"string[]\"},\"name\":{\"required\":true,\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/hooks\"},\"createInvitation\":{\"headers\":{\"accept\":\"application/vnd.github.dazzler-preview+json\"},\"method\":\"POST\",\"params\":{\"email\":{\"type\":\"string\"},\"invitee_id\":{\"type\":\"integer\"},\"org\":{\"required\":true,\"type\":\"string\"},\"role\":{\"enum\":[\"admin\",\"direct_member\",\"billing_manager\"],\"type\":\"string\"},\"team_ids\":{\"type\":\"integer[]\"}},\"url\":\"/orgs/:org/invitations\"},\"createTeam\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"POST\",\"params\":{\"description\":{\"type\":\"string\"},\"maintainers\":{\"type\":\"string[]\"},\"name\":{\"required\":true,\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"},\"parent_team_id\":{\"type\":\"integer\"},\"permission\":{\"enum\":[\"pull\",\"push\",\"admin\"],\"type\":\"string\"},\"privacy\":{\"enum\":[\"secret\",\"closed\"],\"type\":\"string\"},\"repo_names\":{\"type\":\"string[]\"}},\"url\":\"/orgs/:org/teams\"},\"deleteHook\":{\"method\":\"DELETE\",\"params\":{\"hook_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"hook_id\",\"deprecated\":true},\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/hooks/:hook_id\"},\"deleteTeam\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id\"},\"deleteTeamRepo\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/repos/:owner/:repo\"},\"editHook\":{\"method\":\"PATCH\",\"params\":{\"active\":{\"type\":\"boolean\"},\"config\":{\"type\":\"object\"},\"config.content_type\":{\"type\":\"string\"},\"config.insecure_ssl\":{\"type\":\"string\"},\"config.secret\":{\"type\":\"string\"},\"config.url\":{\"required\":true,\"type\":\"string\"},\"events\":{\"type\":\"string[]\"},\"hook_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"hook_id\",\"deprecated\":true},\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/hooks/:hook_id\"},\"editTeam\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"PATCH\",\"params\":{\"description\":{\"type\":\"string\"},\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"name\":{\"required\":true,\"type\":\"string\"},\"parent_team_id\":{\"type\":\"integer\"},\"permission\":{\"enum\":[\"pull\",\"push\",\"admin\"],\"type\":\"string\"},\"privacy\":{\"type\":\"string\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id\"},\"get\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org\"},\"getAll\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"}},\"url\":\"/organizations\"},\"getBlockedUsers\":{\"headers\":{\"accept\":\"application/vnd.github.giant-sentry-fist-preview+json\"},\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/blocks\"},\"getChildTeams\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/teams\"},\"getForUser\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/orgs\"},\"getHook\":{\"method\":\"GET\",\"params\":{\"hook_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"hook_id\",\"deprecated\":true},\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/hooks/:hook_id\"},\"getHooks\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/orgs/:org/hooks\"},\"getInvitationTeams\":{\"method\":\"GET\",\"params\":{\"invitation_id\":{\"required\":true,\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/orgs/:org/invitations/:invitation_id/teams\"},\"getMembers\":{\"method\":\"GET\",\"params\":{\"filter\":{\"enum\":[\"2fa_disabled\",\"all\"],\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"role\":{\"enum\":[\"all\",\"admin\",\"member\"],\"type\":\"string\"}},\"url\":\"/orgs/:org/members\"},\"getOrgMembership\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/memberships/:username\"},\"getOutsideCollaborators\":{\"method\":\"GET\",\"params\":{\"filter\":{\"enum\":[\"2fa_disabled\",\"all\"],\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/orgs/:org/outside_collaborators\"},\"getPendingOrgInvites\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/orgs/:org/invitations\"},\"getPendingTeamInvites\":{\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/invitations\"},\"getPublicMembers\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/orgs/:org/public_members\"},\"getTeam\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id\"},\"getTeamMembers\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"role\":{\"enum\":[\"member\",\"maintainer\",\"all\"],\"type\":\"string\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/members\"},\"getTeamMembership\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"team_id\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/memberships/:username\"},\"getTeamRepos\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/repos\"},\"getTeams\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/orgs/:org/teams\"},\"pingHook\":{\"method\":\"POST\",\"params\":{\"hook_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"hook_id\",\"deprecated\":true},\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/hooks/:hook_id/pings\"},\"publicizeMembership\":{\"method\":\"PUT\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/public_members/:username\"},\"removeMember\":{\"method\":\"DELETE\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/members/:username\"},\"removeOrgMembership\":{\"method\":\"DELETE\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/memberships/:username\"},\"removeOutsideCollaborator\":{\"method\":\"DELETE\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/outside_collaborators/:username\"},\"removeTeamMembership\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"team_id\",\"deprecated\":true},\"team_id\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/memberships/:username\"},\"unblockUser\":{\"headers\":{\"accept\":\"application/vnd.github.giant-sentry-fist-preview+json\"},\"method\":\"DELETE\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org/blocks/:username\"},\"update\":{\"method\":\"PATCH\",\"params\":{\"billing_email\":{\"type\":\"string\"},\"company\":{\"type\":\"string\"},\"default_repository_permission\":{\"enum\":[\"read\",\"write\",\"admin\",\"none\"],\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"has_organization_projects\":{\"type\":\"boolean\"},\"has_repository_projects\":{\"type\":\"boolean\"},\"location\":{\"type\":\"string\"},\"members_can_create_repositories\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/orgs/:org\"}},\"projects\":{\"addCollaborator\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"PUT\",\"params\":{\"id\":{\"alias\":\"project_id\",\"deprecated\":true},\"permission\":{\"enum\":[\"read\",\"write\",\"admin\"],\"type\":\"string\"},\"project_id\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/projects/:project_id/collaborators/:username\"},\"createOrgProject\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"POST\",\"params\":{\"body\":{\"type\":\"string\"},\"name\":{\"required\":true,\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/orgs/:org/projects\"},\"createProjectCard\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"POST\",\"params\":{\"column_id\":{\"required\":true,\"type\":\"string\"},\"content_id\":{\"type\":\"integer\"},\"content_type\":{\"type\":\"string\"},\"note\":{\"type\":\"string\"}},\"url\":\"/projects/columns/:column_id/cards\"},\"createProjectColumn\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"POST\",\"params\":{\"id\":{\"alias\":\"project_id\"},\"name\":{\"required\":true,\"type\":\"string\"},\"project_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/projects/:project_id/columns\"},\"createRepoProject\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"POST\",\"params\":{\"body\":{\"type\":\"string\"},\"name\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/projects\"},\"deleteProject\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"project_id\"},\"project_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/projects/:project_id\"},\"deleteProjectCard\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"DELETE\",\"params\":{\"card_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"card_id\"}},\"url\":\"/projects/columns/cards/:card_id\"},\"deleteProjectColumn\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"DELETE\",\"params\":{\"column_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"column_id\"}},\"url\":\"/projects/columns/:column_id\"},\"getCollaborators\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"GET\",\"params\":{\"affiliation\":{\"enum\":[\"outside\",\"direct\",\"all\"],\"type\":\"string\"},\"id\":{\"alias\":\"project_id\",\"deprecated\":true},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"project_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/projects/:project_id/collaborators\"},\"getOrgProjects\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"state\":{\"enum\":[\"open\",\"closed\",\"all\"],\"type\":\"string\"}},\"url\":\"/orgs/:org/projects\"},\"getProject\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"project_id\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"project_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/projects/:project_id\"},\"getProjectCard\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"GET\",\"params\":{\"card_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"card_id\"}},\"url\":\"/projects/columns/cards/:card_id\"},\"getProjectCards\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"GET\",\"params\":{\"archived_state\":{\"enum\":[\"all\",\"archived\",\"not_archived\"],\"type\":\"string\"},\"column_id\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/projects/columns/:column_id/cards\"},\"getProjectColumn\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"GET\",\"params\":{\"column_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"column_id\"}},\"url\":\"/projects/columns/:column_id\"},\"getProjectColumns\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"project_id\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"project_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/projects/:project_id/columns\"},\"getRepoProjects\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\",\"all\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/projects\"},\"getUserPermissionLevel\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"project_id\",\"deprecated\":true},\"project_id\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/projects/:project_id/collaborators/:username/permission\"},\"moveProjectCard\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"POST\",\"params\":{\"card_id\":{\"required\":true,\"type\":\"string\"},\"column_id\":{\"type\":\"integer\"},\"id\":{\"alias\":\"card_id\"},\"position\":{\"required\":true,\"type\":\"string\",\"validation\":\"^(top|bottom|after:\\\\d+)$\"}},\"url\":\"/projects/columns/cards/:card_id/moves\"},\"moveProjectColumn\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"POST\",\"params\":{\"column_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"column_id\"},\"position\":{\"required\":true,\"type\":\"string\",\"validation\":\"^(first|last|after:\\\\d+)$\"}},\"url\":\"/projects/columns/:column_id/moves\"},\"removeCollaborator\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"project_id\",\"deprecated\":true},\"project_id\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/projects/:project_id/collaborators/:username\"},\"updateProject\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"PATCH\",\"params\":{\"body\":{\"type\":\"string\"},\"id\":{\"alias\":\"project_id\"},\"name\":{\"type\":\"string\"},\"organization_permission\":{\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"project_id\":{\"required\":true,\"type\":\"string\"},\"public\":{\"type\":\"boolean\"},\"state\":{\"enum\":[\"open\",\"closed\"],\"type\":\"string\"}},\"url\":\"/projects/:project_id\"},\"updateProjectCard\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"PATCH\",\"params\":{\"archived\":{\"type\":\"boolean\"},\"card_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"card_id\"},\"note\":{\"type\":\"string\"}},\"url\":\"/projects/columns/cards/:card_id\"},\"updateProjectColumn\":{\"headers\":{\"accept\":\"application/vnd.github.inertia-preview+json\"},\"method\":\"PATCH\",\"params\":{\"column_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"column_id\"},\"name\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/projects/columns/:column_id\"}},\"pullRequests\":{\"checkMerged\":{\"headers\":{\"accept\":\"application/vnd.github.polaris-preview\"},\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/merge\"},\"create\":{\"method\":\"POST\",\"params\":{\"base\":{\"required\":true,\"type\":\"string\"},\"body\":{\"type\":\"string\"},\"head\":{\"required\":true,\"type\":\"string\"},\"maintainer_can_modify\":{\"type\":\"boolean\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"title\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls\"},\"createComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"POST\",\"params\":{\"body\":{\"required\":true,\"type\":\"string\"},\"commit_id\":{\"required\":true,\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"path\":{\"required\":true,\"type\":\"string\"},\"position\":{\"required\":true,\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/comments\"},\"createCommentReply\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"POST\",\"params\":{\"body\":{\"required\":true,\"type\":\"string\"},\"in_reply_to\":{\"required\":true,\"type\":\"integer\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/comments\"},\"createFromIssue\":{\"method\":\"POST\",\"params\":{\"base\":{\"required\":true,\"type\":\"string\"},\"body\":{\"type\":\"string\"},\"head\":{\"required\":true,\"type\":\"string\"},\"issue\":{\"required\":true,\"type\":\"integer\"},\"maintainer_can_modify\":{\"type\":\"boolean\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls\"},\"createReview\":{\"method\":\"POST\",\"params\":{\"body\":{\"type\":\"string\"},\"comments\":{\"type\":\"object[]\"},\"comments[].body\":{\"type\":\"string\"},\"comments[].path\":{\"type\":\"string\"},\"comments[].position\":{\"type\":\"integer\"},\"commit_id\":{\"type\":\"string\"},\"event\":{\"enum\":[\"APPROVE\",\"REQUEST_CHANGES\",\"COMMENT\"],\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/reviews\"},\"createReviewRequest\":{\"headers\":{\"accept\":\"application/vnd.github.thor-preview+json\"},\"method\":\"POST\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"reviewers\":{\"type\":\"string[]\"},\"team_reviewers\":{\"type\":\"string[]\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/requested_reviewers\"},\"deleteComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"DELETE\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/comments/:comment_id\"},\"deletePendingReview\":{\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"review_id\",\"deprecated\":true},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"review_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/reviews/:review_id\"},\"deleteReviewRequest\":{\"headers\":{\"accept\":\"application/vnd.github.thor-preview+json\"},\"method\":\"DELETE\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"reviewers\":{\"type\":\"string[]\"},\"team_reviewers\":{\"type\":\"string[]\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/requested_reviewers\"},\"dismissReview\":{\"method\":\"PUT\",\"params\":{\"id\":{\"alias\":\"review_id\",\"deprecated\":true},\"message\":{\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"review_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/reviews/:review_id/dismissals\"},\"editComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"PATCH\",\"params\":{\"body\":{\"required\":true,\"type\":\"string\"},\"comment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/comments/:comment_id\"},\"get\":{\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number\"},\"getAll\":{\"method\":\"GET\",\"params\":{\"base\":{\"type\":\"string\"},\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"head\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sort\":{\"enum\":[\"created\",\"updated\",\"popularity\",\"long-running\"],\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\",\"all\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls\"},\"getComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/comments/:comment_id\"},\"getComments\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"since\":{\"type\":\"string\"},\"sort\":{\"enum\":[\"created\",\"updated\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/comments\"},\"getCommentsForRepo\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"since\":{\"type\":\"string\"},\"sort\":{\"enum\":[\"created\",\"updated\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/comments\"},\"getCommits\":{\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/commits\"},\"getFiles\":{\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/files\"},\"getReview\":{\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"review_id\",\"deprecated\":true},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"review_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/reviews/:review_id\"},\"getReviewComments\":{\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"review_id\",\"deprecated\":true},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"review_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/reviews/:review_id/comments\"},\"getReviewRequests\":{\"headers\":{\"accept\":\"application/vnd.github.thor-preview+json\"},\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/requested_reviewers\"},\"getReviews\":{\"method\":\"GET\",\"params\":{\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/reviews\"},\"merge\":{\"headers\":{\"accept\":\"application/vnd.github.polaris-preview\"},\"method\":\"PUT\",\"params\":{\"commit_message\":{\"type\":\"string\"},\"commit_title\":{\"type\":\"string\"},\"merge_method\":{\"enum\":[\"merge\",\"squash\",\"rebase\"],\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/merge\"},\"submitReview\":{\"method\":\"POST\",\"params\":{\"body\":{\"type\":\"string\"},\"event\":{\"enum\":[\"APPROVE\",\"REQUEST_CHANGES\",\"COMMENT\"],\"type\":\"string\"},\"id\":{\"alias\":\"review_id\",\"deprecated\":true},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"review_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number/reviews/:review_id/events\"},\"update\":{\"method\":\"PATCH\",\"params\":{\"base\":{\"type\":\"string\"},\"body\":{\"type\":\"string\"},\"maintainer_can_modify\":{\"type\":\"boolean\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"state\":{\"enum\":[\"open\",\"closed\"],\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/:number\"}},\"reactions\":{\"createForCommitComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"POST\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/comments/:comment_id/reactions\"},\"createForIssue\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"POST\",\"params\":{\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"required\":true,\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/reactions\"},\"createForIssueComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"POST\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/comments/:comment_id/reactions\"},\"createForPullRequestReviewComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"POST\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/comments/:comment_id/reactions\"},\"createForTeamDiscussion\":{\"headers\":{\"accept\":\"application/vnd.github.echo-preview+json,application/vnd.github.squirrel-girl-preview+json\"},\"method\":\"POST\",\"params\":{\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"required\":true,\"type\":\"string\"},\"discussion_number\":{\"required\":true,\"type\":\"integer\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/discussions/:discussion_number/reactions\"},\"createForTeamDiscussionComment\":{\"headers\":{\"accept\":\"application/vnd.github.echo-preview+json,application/vnd.github.squirrel-girl-preview+json\"},\"method\":\"POST\",\"params\":{\"comment_number\":{\"required\":true,\"type\":\"integer\"},\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"required\":true,\"type\":\"string\"},\"discussion_number\":{\"required\":true,\"type\":\"integer\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions\"},\"delete\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"reaction_id\",\"deprecated\":true},\"reaction_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/reactions/:reaction_id\"},\"getForCommitComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/comments/:comment_id/reactions\"},\"getForIssue\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"type\":\"string\"},\"number\":{\"required\":true,\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/:number/reactions\"},\"getForIssueComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/issues/comments/:comment_id/reactions\"},\"getForPullRequestReviewComment\":{\"headers\":{\"accept\":\"application/vnd.github.squirrel-girl-preview\"},\"method\":\"GET\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pulls/comments/:comment_id/reactions\"},\"getForTeamDiscussion\":{\"headers\":{\"accept\":\"application/vnd.github.echo-preview+json,application/vnd.github.squirrel-girl-preview+json\"},\"method\":\"GET\",\"params\":{\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"type\":\"string\"},\"discussion_number\":{\"required\":true,\"type\":\"integer\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/discussions/:discussion_number/reactions\"},\"getForTeamDiscussionComment\":{\"headers\":{\"accept\":\"application/vnd.github.echo-preview+json,application/vnd.github.squirrel-girl-preview+json\"},\"method\":\"GET\",\"params\":{\"comment_number\":{\"required\":true,\"type\":\"integer\"},\"content\":{\"enum\":[\"+1\",\"-1\",\"laugh\",\"confused\",\"heart\",\"hooray\"],\"type\":\"string\"},\"discussion_number\":{\"required\":true,\"type\":\"integer\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"team_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/teams/:team_id/discussions/:discussion_number/comments/:comment_number/reactions\"}},\"repos\":{\"addCollaborator\":{\"method\":\"PUT\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"permission\":{\"enum\":[\"pull\",\"push\",\"admin\"],\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/collaborators/:username\"},\"addDeployKey\":{\"method\":\"POST\",\"params\":{\"key\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"read_only\":{\"type\":\"boolean\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/keys\"},\"addProtectedBranchAdminEnforcement\":{\"method\":\"POST\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/enforce_admins\"},\"addProtectedBranchRequiredSignatures\":{\"headers\":{\"accept\":\"application/vnd.github.zzzax-preview+json\"},\"method\":\"POST\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_signatures\"},\"addProtectedBranchRequiredStatusChecksContexts\":{\"method\":\"POST\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"contexts\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts\"},\"addProtectedBranchTeamRestrictions\":{\"method\":\"POST\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"teams\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/restrictions/teams\"},\"addProtectedBranchUserRestrictions\":{\"method\":\"POST\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"users\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/restrictions/users\"},\"checkCollaborator\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/collaborators/:username\"},\"compareCommits\":{\"method\":\"GET\",\"params\":{\"base\":{\"required\":true,\"type\":\"string\"},\"head\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/compare/:base...:head\"},\"create\":{\"method\":\"POST\",\"params\":{\"allow_merge_commit\":{\"type\":\"boolean\"},\"allow_rebase_merge\":{\"type\":\"boolean\"},\"allow_squash_merge\":{\"type\":\"boolean\"},\"auto_init\":{\"type\":\"boolean\"},\"description\":{\"type\":\"string\"},\"gitignore_template\":{\"type\":\"string\"},\"has_issues\":{\"type\":\"boolean\"},\"has_projects\":{\"type\":\"boolean\"},\"has_wiki\":{\"type\":\"boolean\"},\"homepage\":{\"type\":\"string\"},\"license_template\":{\"type\":\"string\"},\"name\":{\"required\":true,\"type\":\"string\"},\"private\":{\"type\":\"boolean\"},\"team_id\":{\"type\":\"integer\"}},\"url\":\"/user/repos\"},\"createCommitComment\":{\"method\":\"POST\",\"params\":{\"body\":{\"required\":true,\"type\":\"string\"},\"line\":{\"type\":\"integer\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"position\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/commits/:sha/comments\"},\"createDeployment\":{\"headers\":{\"accept\":\"application/vnd.github.ant-man-preview+json\"},\"method\":\"POST\",\"params\":{\"auto_merge\":{\"type\":\"boolean\"},\"description\":{\"type\":\"string\"},\"environment\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"payload\":{\"type\":\"string\"},\"production_environment\":{\"type\":\"boolean\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"required_contexts\":{\"type\":\"string[]\"},\"task\":{\"type\":\"string\"},\"transient_environment\":{\"type\":\"boolean\"}},\"url\":\"/repos/:owner/:repo/deployments\"},\"createDeploymentStatus\":{\"headers\":{\"accept\":\"application/vnd.github.ant-man-preview+json\"},\"method\":\"POST\",\"params\":{\"auto_inactive\":{\"type\":\"boolean\"},\"deployment_id\":{\"required\":true,\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"environment_url\":{\"type\":\"string\"},\"id\":{\"alias\":\"deployment_id\",\"deprecated\":true},\"log_url\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"state\":{\"enum\":[\"error\",\"failure\",\"inactive\",\"pending\",\"success\"],\"required\":true,\"type\":\"string\"},\"target_url\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/deployments/:deployment_id/statuses\"},\"createFile\":{\"method\":\"PUT\",\"params\":{\"author\":{\"type\":\"object\"},\"branch\":{\"type\":\"string\"},\"committer\":{\"type\":\"object\"},\"content\":{\"required\":true,\"type\":\"string\"},\"message\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"path\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/contents/:path\"},\"createForOrg\":{\"method\":\"POST\",\"params\":{\"allow_merge_commit\":{\"type\":\"boolean\"},\"allow_rebase_merge\":{\"type\":\"boolean\"},\"allow_squash_merge\":{\"type\":\"boolean\"},\"auto_init\":{\"type\":\"boolean\"},\"description\":{\"type\":\"string\"},\"gitignore_template\":{\"type\":\"string\"},\"has_issues\":{\"type\":\"boolean\"},\"has_projects\":{\"type\":\"boolean\"},\"has_wiki\":{\"type\":\"boolean\"},\"homepage\":{\"type\":\"string\"},\"license_template\":{\"type\":\"string\"},\"name\":{\"required\":true,\"type\":\"string\"},\"org\":{\"required\":true,\"type\":\"string\"},\"private\":{\"type\":\"boolean\"},\"team_id\":{\"type\":\"integer\"}},\"url\":\"/orgs/:org/repos\"},\"createHook\":{\"method\":\"POST\",\"params\":{\"active\":{\"type\":\"boolean\"},\"config\":{\"required\":true,\"type\":\"object\"},\"config.content_type\":{\"type\":\"string\"},\"config.insecure_ssl\":{\"type\":\"string\"},\"config.secret\":{\"type\":\"string\"},\"config.url\":{\"required\":true,\"type\":\"string\"},\"events\":{\"type\":\"string[]\"},\"name\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/hooks\"},\"createRelease\":{\"method\":\"POST\",\"params\":{\"body\":{\"type\":\"string\"},\"draft\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"prerelease\":{\"type\":\"boolean\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"tag_name\":{\"required\":true,\"type\":\"string\"},\"target_commitish\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases\"},\"createStatus\":{\"method\":\"POST\",\"params\":{\"context\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"required\":true,\"type\":\"string\"},\"state\":{\"enum\":[\"error\",\"failure\",\"pending\",\"success\"],\"required\":true,\"type\":\"string\"},\"target_url\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/statuses/:sha\"},\"delete\":{\"headers\":{\"accept\":\"application/vnd.github.drax-preview+json\"},\"method\":\"DELETE\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo\"},\"deleteAsset\":{\"method\":\"DELETE\",\"params\":{\"asset_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"asset_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases/assets/:asset_id\"},\"deleteCommitComment\":{\"method\":\"DELETE\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/comments/:comment_id\"},\"deleteDeployKey\":{\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"key_id\",\"deprecated\":true},\"key_id\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/keys/:key_id\"},\"deleteDownload\":{\"method\":\"DELETE\",\"params\":{\"download_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"download_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/downloads/:download_id\"},\"deleteFile\":{\"method\":\"DELETE\",\"params\":{\"author\":{\"type\":\"object\"},\"branch\":{\"type\":\"string\"},\"committer\":{\"type\":\"object\"},\"message\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"path\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/contents/:path\"},\"deleteHook\":{\"method\":\"DELETE\",\"params\":{\"hook_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"hook_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/hooks/:hook_id\"},\"deleteInvite\":{\"method\":\"DELETE\",\"params\":{\"invitation_id\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/invitations/:invitation_id\"},\"deleteRelease\":{\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"release_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"release_id\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases/:release_id\"},\"edit\":{\"headers\":{\"accept\":\"application/vnd.github.drax-preview+json\"},\"method\":\"PATCH\",\"params\":{\"allow_merge_commit\":{\"type\":\"boolean\"},\"allow_rebase_merge\":{\"type\":\"boolean\"},\"allow_squash_merge\":{\"type\":\"boolean\"},\"archived\":{\"type\":\"boolean\"},\"default_branch\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"has_issues\":{\"type\":\"boolean\"},\"has_projects\":{\"type\":\"boolean\"},\"has_wiki\":{\"type\":\"boolean\"},\"homepage\":{\"type\":\"string\"},\"name\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"private\":{\"type\":\"boolean\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo\"},\"editAsset\":{\"method\":\"PATCH\",\"params\":{\"asset_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"asset_id\",\"deprecated\":true},\"label\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases/assets/:asset_id\"},\"editHook\":{\"method\":\"PATCH\",\"params\":{\"active\":{\"type\":\"boolean\"},\"add_events\":{\"type\":\"string[]\"},\"config\":{\"type\":\"object\"},\"config.content_type\":{\"type\":\"string\"},\"config.insecure_ssl\":{\"type\":\"string\"},\"config.secret\":{\"type\":\"string\"},\"config.url\":{\"required\":true,\"type\":\"string\"},\"events\":{\"type\":\"string[]\"},\"hook_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"hook_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"remove_events\":{\"type\":\"string[]\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/hooks/:hook_id\"},\"editRelease\":{\"method\":\"PATCH\",\"params\":{\"body\":{\"type\":\"string\"},\"draft\":{\"type\":\"boolean\"},\"id\":{\"alias\":\"release_id\",\"deprecated\":true},\"name\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"prerelease\":{\"type\":\"boolean\"},\"release_id\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"tag_name\":{\"type\":\"string\"},\"target_commitish\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases/:release_id\"},\"fork\":{\"method\":\"POST\",\"params\":{\"organization\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/forks\"},\"get\":{\"headers\":{\"accept\":\"application/vnd.github.drax-preview+json\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo\"},\"getAll\":{\"method\":\"GET\",\"params\":{\"affiliation\":{\"enum\":[\"owner\",\"collaborator\",\"organization_member\"],\"type\":\"string\"},\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"sort\":{\"enum\":[\"created\",\"updated\",\"pushed\",\"full_name\"],\"type\":\"string\"},\"type\":{\"enum\":[\"all\",\"owner\",\"public\",\"private\",\"member\"],\"type\":\"string\"},\"visibility\":{\"enum\":[\"all\",\"public\",\"private\"],\"type\":\"string\"}},\"url\":\"/user/repos\"},\"getAllCommitComments\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/comments\"},\"getArchiveLink\":{\"method\":\"GET\",\"params\":{\"archive_format\":{\"enum\":[\"tarball\",\"zipball\"],\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/:archive_format/:ref\"},\"getAsset\":{\"method\":\"GET\",\"params\":{\"asset_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"asset_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases/assets/:asset_id\"},\"getAssets\":{\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"release_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"release_id\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases/:release_id/assets\"},\"getBranch\":{\"method\":\"GET\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch\"},\"getBranchProtection\":{\"method\":\"GET\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection\"},\"getBranches\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"protected\":{\"type\":\"boolean\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches\"},\"getById\":{\"method\":\"GET\",\"params\":{\"id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repositories/:id\"},\"getClones\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"per\":{\"enum\":[\"day\",\"week\"],\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/traffic/clones\"},\"getCollaborators\":{\"method\":\"GET\",\"params\":{\"affiliation\":{\"enum\":[\"outside\",\"direct\",\"all\"],\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/collaborators\"},\"getCombinedStatusForRef\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/commits/:ref/status\"},\"getCommit\":{\"headers\":{\"accept\":\"application/vnd.github.cryptographer-preview\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/commits/:sha\"},\"getCommitComment\":{\"method\":\"GET\",\"params\":{\"comment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/comments/:comment_id\"},\"getCommitComments\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/commits/:ref/comments\"},\"getCommits\":{\"method\":\"GET\",\"params\":{\"author\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"path\":{\"type\":\"string\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"type\":\"string\"},\"since\":{\"type\":\"string\"},\"until\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/commits\"},\"getCommunityProfileMetrics\":{\"headers\":{\"accept\":\"application/vnd.github.black-panther-preview+json\"},\"method\":\"GET\",\"params\":{\"name\":{\"alias\":\"repo\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/community/profile\"},\"getContent\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"path\":{\"required\":true,\"type\":\"string\"},\"ref\":{\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/contents/:path\"},\"getContributors\":{\"method\":\"GET\",\"params\":{\"anon\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/contributors\"},\"getDeployKey\":{\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"key_id\",\"deprecated\":true},\"key_id\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/keys/:key_id\"},\"getDeployKeys\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/keys\"},\"getDeployment\":{\"method\":\"GET\",\"params\":{\"deployment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"deployment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/deployments/:deployment_id\"},\"getDeploymentStatus\":{\"method\":\"GET\",\"params\":{\"deployment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"deployment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"status_id\":{\"required\":true,\"type\":\"integer\"}},\"url\":\"/repos/:owner/:repo/deployments/:deployment_id/statuses/:status_id\"},\"getDeploymentStatuses\":{\"headers\":{\"accept\":\"application/vnd.github.ant-man-preview+json\"},\"method\":\"GET\",\"params\":{\"deployment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"deployment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/deployments/:deployment_id/statuses\"},\"getDeployments\":{\"headers\":{\"accept\":\"application/vnd.github.ant-man-preview+json\"},\"method\":\"GET\",\"params\":{\"environment\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"ref\":{\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"type\":\"string\"},\"task\":{\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/deployments\"},\"getDownload\":{\"method\":\"GET\",\"params\":{\"download_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"download_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/downloads/:download_id\"},\"getDownloads\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/downloads\"},\"getForOrg\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"all\",\"public\",\"private\",\"forks\",\"sources\",\"member\"],\"type\":\"string\"}},\"url\":\"/orgs/:org/repos\"},\"getForUser\":{\"method\":\"GET\",\"params\":{\"direction\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"sort\":{\"enum\":[\"created\",\"updated\",\"pushed\",\"full_name\"],\"type\":\"string\"},\"type\":{\"enum\":[\"all\",\"owner\",\"member\"],\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/repos\"},\"getForks\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sort\":{\"enum\":[\"newest\",\"oldest\",\"stargazers\"],\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/forks\"},\"getHook\":{\"method\":\"GET\",\"params\":{\"hook_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"hook_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/hooks/:hook_id\"},\"getHooks\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/hooks\"},\"getInvites\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/invitations\"},\"getLanguages\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/languages\"},\"getLatestPagesBuild\":{\"headers\":{\"accept\":\"application/vnd.github.mister-fantastic-preview+json\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pages/builds/latest\"},\"getLatestRelease\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases/latest\"},\"getPages\":{\"headers\":{\"accept\":\"application/vnd.github.mister-fantastic-preview+json\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pages\"},\"getPagesBuild\":{\"headers\":{\"accept\":\"application/vnd.github.mister-fantastic-preview+json\"},\"method\":\"GET\",\"params\":{\"build_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"build_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pages/builds/:build_id\"},\"getPagesBuilds\":{\"headers\":{\"accept\":\"application/vnd.github.mister-fantastic-preview+json\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pages/builds\"},\"getPaths\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/traffic/popular/paths\"},\"getProtectedBranchAdminEnforcement\":{\"method\":\"GET\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/enforce_admins\"},\"getProtectedBranchPullRequestReviewEnforcement\":{\"method\":\"GET\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews\"},\"getProtectedBranchRequiredSignatures\":{\"headers\":{\"accept\":\"application/vnd.github.zzzax-preview+json\"},\"method\":\"GET\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_signatures\"},\"getProtectedBranchRequiredStatusChecks\":{\"method\":\"GET\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_status_checks\"},\"getProtectedBranchRequiredStatusChecksContexts\":{\"method\":\"GET\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts\"},\"getProtectedBranchRestrictions\":{\"method\":\"GET\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/restrictions\"},\"getProtectedBranchTeamRestrictions\":{\"method\":\"GET\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/restrictions/teams\"},\"getProtectedBranchUserRestrictions\":{\"method\":\"GET\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/restrictions/users\"},\"getPublic\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"}},\"url\":\"/repositories\"},\"getReadme\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"ref\":{\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/readme\"},\"getReferrers\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/traffic/popular/referrers\"},\"getRelease\":{\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"release_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"release_id\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases/:release_id\"},\"getReleaseByTag\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"tag\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases/tags/:tag\"},\"getReleases\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/releases\"},\"getShaOfCommitRef\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/commits/:ref\"},\"getStatsCodeFrequency\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/stats/code_frequency\"},\"getStatsCommitActivity\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/stats/commit_activity\"},\"getStatsContributors\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/stats/contributors\"},\"getStatsParticipation\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/stats/participation\"},\"getStatsPunchCard\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/stats/punch_card\"},\"getStatuses\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"ref\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/commits/:ref/statuses\"},\"getTags\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/tags\"},\"getTeams\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/teams\"},\"getTopics\":{\"headers\":{\"accept\":\"application/vnd.github.mercy-preview+json\"},\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/topics\"},\"getViews\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"per\":{\"enum\":[\"day\",\"week\"],\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/traffic/views\"},\"merge\":{\"method\":\"POST\",\"params\":{\"base\":{\"required\":true,\"type\":\"string\"},\"commit_message\":{\"type\":\"string\"},\"head\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/merges\"},\"pingHook\":{\"method\":\"POST\",\"params\":{\"hook_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"hook_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/hooks/:hook_id/pings\"},\"removeBranchProtection\":{\"method\":\"DELETE\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection\"},\"removeCollaborator\":{\"method\":\"DELETE\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/collaborators/:username\"},\"removeProtectedBranchAdminEnforcement\":{\"method\":\"DELETE\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/enforce_admins\"},\"removeProtectedBranchPullRequestReviewEnforcement\":{\"method\":\"DELETE\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews\"},\"removeProtectedBranchRequiredSignatures\":{\"headers\":{\"accept\":\"application/vnd.github.zzzax-preview+json\"},\"method\":\"DELETE\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_signatures\"},\"removeProtectedBranchRequiredStatusChecks\":{\"method\":\"DELETE\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_status_checks\"},\"removeProtectedBranchRequiredStatusChecksContexts\":{\"method\":\"DELETE\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"contexts\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts\"},\"removeProtectedBranchRestrictions\":{\"method\":\"DELETE\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/restrictions\"},\"removeProtectedBranchTeamRestrictions\":{\"method\":\"DELETE\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"teams\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/restrictions/teams\"},\"removeProtectedBranchUserRestrictions\":{\"method\":\"DELETE\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"users\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/restrictions/users\"},\"replaceProtectedBranchRequiredStatusChecksContexts\":{\"method\":\"PUT\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"contexts\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_status_checks/contexts\"},\"replaceProtectedBranchTeamRestrictions\":{\"method\":\"PUT\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"teams\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/restrictions/teams\"},\"replaceProtectedBranchUserRestrictions\":{\"method\":\"PUT\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"users\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/restrictions/users\"},\"replaceTopics\":{\"headers\":{\"accept\":\"application/vnd.github.mercy-preview+json\"},\"method\":\"PUT\",\"params\":{\"names\":{\"required\":true,\"type\":\"string[]\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/topics\"},\"requestPageBuild\":{\"headers\":{\"accept\":\"application/vnd.github.mister-fantastic-preview+json\"},\"method\":\"POST\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/pages/builds\"},\"reviewUserPermissionLevel\":{\"method\":\"GET\",\"params\":{\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/collaborators/:username/permission\"},\"testHook\":{\"method\":\"POST\",\"params\":{\"hook_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"hook_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/hooks/:hook_id/tests\"},\"transfer\":{\"headers\":{\"accept\":\"application/vnd.github.nightshade-preview+json\"},\"method\":\"POST\",\"params\":{\"new_owner\":{\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"team_id\":{\"alias\":\"team_ids\",\"deprecated\":true},\"team_ids\":{\"type\":\"integer[]\"}},\"url\":\"/repos/:owner/:repo/transfer\"},\"updateBranchProtection\":{\"method\":\"PUT\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"enforce_admins\":{\"allowNull\":true,\"required\":true,\"type\":\"boolean\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"required_pull_request_reviews\":{\"allowNull\":true,\"required\":true,\"type\":\"object\"},\"required_pull_request_reviews.dismiss_stale_reviews\":{\"type\":\"boolean\"},\"required_pull_request_reviews.dismissal_restrictions\":{\"type\":\"object\"},\"required_pull_request_reviews.dismissal_restrictions.teams\":{\"type\":\"string[]\"},\"required_pull_request_reviews.dismissal_restrictions.users\":{\"type\":\"string[]\"},\"required_pull_request_reviews.require_code_owner_reviews\":{\"type\":\"boolean\"},\"required_pull_request_reviews.required_approving_review_count\":{\"type\":\"integer\"},\"required_status_checks\":{\"allowNull\":true,\"required\":true,\"type\":\"object\"},\"required_status_checks.contexts\":{\"required\":true,\"type\":\"string[]\"},\"required_status_checks.strict\":{\"required\":true,\"type\":\"boolean\"},\"restrictions\":{\"allowNull\":true,\"required\":true,\"type\":\"object\"},\"restrictions.teams\":{\"type\":\"string[]\"},\"restrictions.users\":{\"type\":\"string[]\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection\"},\"updateCommitComment\":{\"method\":\"PATCH\",\"params\":{\"body\":{\"required\":true,\"type\":\"string\"},\"comment_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"comment_id\",\"deprecated\":true},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/comments/:comment_id\"},\"updateFile\":{\"method\":\"PUT\",\"params\":{\"author\":{\"type\":\"object\"},\"branch\":{\"type\":\"string\"},\"committer\":{\"type\":\"object\"},\"content\":{\"required\":true,\"type\":\"string\"},\"message\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"path\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"sha\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/contents/:path\"},\"updateInvite\":{\"method\":\"PATCH\",\"params\":{\"invitation_id\":{\"required\":true,\"type\":\"string\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"permissions\":{\"enum\":[\"read\",\"write\",\"admin\"],\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/repos/:owner/:repo/invitations/:invitation_id\"},\"updateProtectedBranchPullRequestReviewEnforcement\":{\"method\":\"PATCH\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"dismiss_stale_reviews\":{\"type\":\"boolean\"},\"dismissal_restrictions\":{\"type\":\"object\"},\"dismissal_restrictions.teams\":{\"type\":\"string[]\"},\"dismissal_restrictions.users\":{\"type\":\"string[]\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"require_code_owner_reviews\":{\"type\":\"boolean\"},\"required_approving_review_count\":{\"type\":\"integer\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_pull_request_reviews\"},\"updateProtectedBranchRequiredStatusChecks\":{\"method\":\"PATCH\",\"params\":{\"branch\":{\"required\":true,\"type\":\"string\"},\"contexts\":{\"type\":\"string[]\"},\"owner\":{\"required\":true,\"type\":\"string\"},\"repo\":{\"required\":true,\"type\":\"string\"},\"strict\":{\"type\":\"boolean\"}},\"url\":\"/repos/:owner/:repo/branches/:branch/protection/required_status_checks\"},\"uploadAsset\":{\"method\":\"POST\",\"params\":{\"contentLength\":{\"alias\":\"headers.content-length\"},\"contentType\":{\"alias\":\"headers.content-type\"},\"file\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string | object\"},\"headers.content-length\":{\"required\":true,\"type\":\"integer\"},\"headers.content-type\":{\"required\":true,\"type\":\"string\"},\"label\":{\"type\":\"string\"},\"name\":{\"required\":true,\"type\":\"string\"},\"url\":{\"required\":true,\"type\":\"string\"}},\"url\":\":url\"}},\"search\":{\"code\":{\"method\":\"GET\",\"params\":{\"order\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"q\":{\"required\":true,\"type\":\"string\"},\"sort\":{\"enum\":[\"indexed\"],\"type\":\"string\"}},\"url\":\"/search/code\"},\"commits\":{\"headers\":{\"accept\":\"application/vnd.github.cloak-preview+json\"},\"method\":\"GET\",\"params\":{\"order\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"q\":{\"required\":true,\"type\":\"string\"},\"sort\":{\"enum\":[\"author-date\",\"committer-date\"],\"type\":\"string\"}},\"url\":\"/search/commits\"},\"issues\":{\"method\":\"GET\",\"params\":{\"order\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"q\":{\"required\":true,\"type\":\"string\"},\"sort\":{\"enum\":[\"comments\",\"created\",\"updated\"],\"type\":\"string\"}},\"url\":\"/search/issues\"},\"labels\":{\"headers\":{\"accept\":\"application/vnd.github.symmetra-preview+json\"},\"method\":\"GET\",\"params\":{\"order\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"q\":{\"required\":true,\"type\":\"string\"},\"repository_id\":{\"required\":true,\"type\":\"integer\"},\"sort\":{\"enum\":[\"created\",\"updated\"],\"type\":\"string\"}},\"url\":\"/search/labels\"},\"repos\":{\"headers\":{\"accept\":\"application/vnd.github.mercy-preview+json\"},\"method\":\"GET\",\"params\":{\"order\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"q\":{\"required\":true,\"type\":\"string\"},\"sort\":{\"enum\":[\"stars\",\"forks\",\"updated\"],\"type\":\"string\"}},\"url\":\"/search/repositories\"},\"topics\":{\"headers\":{\"accept\":\"application/vnd.github.mercy-preview+json\"},\"method\":\"GET\",\"params\":{\"q\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/search/topics\"},\"users\":{\"method\":\"GET\",\"params\":{\"order\":{\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"q\":{\"required\":true,\"type\":\"string\"},\"sort\":{\"enum\":[\"followers\",\"repositories\",\"joined\"],\"type\":\"string\"}},\"url\":\"/search/users\"}},\"users\":{\"acceptRepoInvite\":{\"method\":\"PATCH\",\"params\":{\"invitation_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/repository_invitations/:invitation_id\"},\"addEmails\":{\"method\":\"POST\",\"params\":{\"emails\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"}},\"url\":\"/user/emails\"},\"addRepoToInstallation\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"PUT\",\"params\":{\"installation_id\":{\"required\":true,\"type\":\"string\"},\"repository_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/installations/:installation_id/repositories/:repository_id\"},\"blockUser\":{\"headers\":{\"accept\":\"application/vnd.github.giant-sentry-fist-preview+json\"},\"method\":\"PUT\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/blocks/:username\"},\"checkBlockedUser\":{\"headers\":{\"accept\":\"application/vnd.github.giant-sentry-fist-preview+json\"},\"method\":\"GET\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/blocks/:username\"},\"checkFollowing\":{\"method\":\"GET\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/following/:username\"},\"checkIfOneFollowersOther\":{\"method\":\"GET\",\"params\":{\"target_user\":{\"required\":true,\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/following/:target_user\"},\"createGpgKey\":{\"headers\":{\"accept\":\"application/vnd.github.cryptographer-preview\"},\"method\":\"POST\",\"params\":{\"armored_public_key\":{\"type\":\"string\"}},\"url\":\"/user/gpg_keys\"},\"createKey\":{\"method\":\"POST\",\"params\":{\"key\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"url\":\"/user/keys\"},\"declineRepoInvite\":{\"method\":\"DELETE\",\"params\":{\"invitation_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/repository_invitations/:invitation_id\"},\"deleteEmails\":{\"method\":\"DELETE\",\"params\":{\"emails\":{\"mapTo\":\"input\",\"required\":true,\"type\":\"string[]\"}},\"url\":\"/user/emails\"},\"deleteGpgKey\":{\"headers\":{\"accept\":\"application/vnd.github.cryptographer-preview\"},\"method\":\"DELETE\",\"params\":{\"gpg_key_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gpg_key_id\",\"deprecated\":true}},\"url\":\"/user/gpg_keys/:gpg_key_id\"},\"deleteKey\":{\"method\":\"DELETE\",\"params\":{\"id\":{\"alias\":\"key_id\",\"deprecated\":true},\"key_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/keys/:key_id\"},\"demote\":{\"method\":\"DELETE\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/site_admin\"},\"editOrgMembership\":{\"method\":\"PATCH\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"},\"state\":{\"enum\":[\"active\"],\"required\":true,\"type\":\"string\"}},\"url\":\"/user/memberships/orgs/:org\"},\"followUser\":{\"method\":\"PUT\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/following/:username\"},\"get\":{\"method\":\"GET\",\"params\":{},\"url\":\"/user\"},\"getAll\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"since\":{\"type\":\"string\"}},\"url\":\"/users\"},\"getBlockedUsers\":{\"headers\":{\"accept\":\"application/vnd.github.giant-sentry-fist-preview+json\"},\"method\":\"GET\",\"params\":{},\"url\":\"/user/blocks\"},\"getById\":{\"method\":\"GET\",\"params\":{\"id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/:id\"},\"getContextForUser\":{\"headers\":{\"accept\":\"application/vnd.github.hagar-preview+json\"},\"method\":\"GET\",\"params\":{\"subject_id\":{\"type\":\"string\"},\"subject_type\":{\"enum\":[\"organization\",\"repository\",\"issue\",\"pull_request\"],\"type\":\"string\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/hovercard\"},\"getEmails\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/emails\"},\"getFollowers\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/followers\"},\"getFollowersForUser\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/followers\"},\"getFollowing\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/following\"},\"getFollowingForUser\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/following\"},\"getForUser\":{\"method\":\"GET\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username\"},\"getGpgKey\":{\"headers\":{\"accept\":\"application/vnd.github.cryptographer-preview\"},\"method\":\"GET\",\"params\":{\"gpg_key_id\":{\"required\":true,\"type\":\"string\"},\"id\":{\"alias\":\"gpg_key_id\",\"deprecated\":true}},\"url\":\"/user/gpg_keys/:gpg_key_id\"},\"getGpgKeys\":{\"headers\":{\"accept\":\"application/vnd.github.cryptographer-preview\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/gpg_keys\"},\"getGpgKeysForUser\":{\"headers\":{\"accept\":\"application/vnd.github.cryptographer-preview\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/gpg_keys\"},\"getInstallationRepos\":{\"method\":\"GET\",\"params\":{\"installation_id\":{\"required\":true,\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/installations/:installation_id/repositories\"},\"getInstallations\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/installations\"},\"getKey\":{\"method\":\"GET\",\"params\":{\"id\":{\"alias\":\"key_id\",\"deprecated\":true},\"key_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/keys/:key_id\"},\"getKeys\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/keys\"},\"getKeysForUser\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/keys\"},\"getMarketplacePurchases\":{\"headers\":{\"accept\":\"application/vnd.github.valkyrie-preview+json\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/marketplace_purchases\"},\"getMarketplaceStubbedPurchases\":{\"headers\":{\"accept\":\"application/vnd.github.valkyrie-preview+json\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/marketplace_purchases/stubbed\"},\"getOrgMembership\":{\"method\":\"GET\",\"params\":{\"org\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/memberships/orgs/:org\"},\"getOrgMemberships\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"},\"state\":{\"enum\":[\"active\",\"pending\"],\"type\":\"string\"}},\"url\":\"/user/memberships/orgs\"},\"getOrgs\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/orgs\"},\"getPublicEmails\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/public_emails\"},\"getRepoInvites\":{\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/repository_invitations\"},\"getTeams\":{\"headers\":{\"accept\":\"application/vnd.github.hellcat-preview+json\"},\"method\":\"GET\",\"params\":{\"page\":{\"type\":\"integer\"},\"per_page\":{\"type\":\"integer\"}},\"url\":\"/user/teams\"},\"promote\":{\"method\":\"PUT\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/site_admin\"},\"removeRepoFromInstallation\":{\"headers\":{\"accept\":\"application/vnd.github.machine-man-preview+json\"},\"method\":\"DELETE\",\"params\":{\"installation_id\":{\"required\":true,\"type\":\"string\"},\"repository_id\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/installations/:installation_id/repositories/:repository_id\"},\"suspend\":{\"method\":\"PUT\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/suspended\"},\"togglePrimaryEmailVisibility\":{\"method\":\"PATCH\",\"params\":{\"email\":{\"required\":true,\"type\":\"string\"},\"visibility\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/email/visibility\"},\"unblockUser\":{\"headers\":{\"accept\":\"application/vnd.github.giant-sentry-fist-preview+json\"},\"method\":\"DELETE\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/blocks/:username\"},\"unfollowUser\":{\"method\":\"DELETE\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/user/following/:username\"},\"unsuspend\":{\"method\":\"DELETE\",\"params\":{\"username\":{\"required\":true,\"type\":\"string\"}},\"url\":\"/users/:username/suspended\"},\"update\":{\"method\":\"PATCH\",\"params\":{\"bio\":{\"type\":\"string\"},\"blog\":{\"type\":\"string\"},\"company\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"hireable\":{\"type\":\"boolean\"},\"location\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"url\":\"/user\"}}};\n\n//# sourceURL=webpack://Octokit/./lib/routes.json?");

/***/ }),

/***/ "./node_modules/before-after-hook/index.js":
/*!*************************************************!*\
  !*** ./node_modules/before-after-hook/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = Hook\n\nvar register = __webpack_require__(/*! ./lib/register */ \"./node_modules/before-after-hook/lib/register.js\")\nvar addHook = __webpack_require__(/*! ./lib/add */ \"./node_modules/before-after-hook/lib/add.js\")\nvar removeHook = __webpack_require__(/*! ./lib/remove */ \"./node_modules/before-after-hook/lib/remove.js\")\n\nfunction Hook () {\n  var state = {\n    registry: {}\n  }\n\n  var hook = register.bind(null, state)\n  hook.remove = {}\n  hook.api = {remove: {}}\n\n  ;['before', 'error', 'after'].forEach(function (kind) {\n    hook[kind] = hook.api[kind] = addHook.bind(null, state, kind)\n    hook.remove[kind] = hook.api.remove[kind] = removeHook.bind(null, state, kind)\n  })\n\n  return hook\n}\n\n\n//# sourceURL=webpack://Octokit/./node_modules/before-after-hook/index.js?");

/***/ }),

/***/ "./node_modules/before-after-hook/lib/add.js":
/*!***************************************************!*\
  !*** ./node_modules/before-after-hook/lib/add.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = addHook\n\nfunction addHook (state, kind, name, hook) {\n  if (!state.registry[name]) {\n    state.registry[name] = {\n      before: [],\n      error: [],\n      after: []\n    }\n  }\n\n  state.registry[name][kind][kind === 'before' ? 'unshift' : 'push'](hook)\n}\n\n\n//# sourceURL=webpack://Octokit/./node_modules/before-after-hook/lib/add.js?");

/***/ }),

/***/ "./node_modules/before-after-hook/lib/register.js":
/*!********************************************************!*\
  !*** ./node_modules/before-after-hook/lib/register.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = register\n\nfunction register (state, name, options, method) {\n  if (arguments.length === 3) {\n    method = options\n    options = {}\n  }\n\n  if (typeof method !== 'function') {\n    throw new Error('method for before hook must be a function')\n  }\n\n  if (typeof options !== 'object') {\n    throw new Error('options for before hook must be an object')\n  }\n\n  if (Array.isArray(name)) {\n    return name.reverse().reduce(function (callback, name) {\n      return register.bind(null, state, name, options, callback)\n    }, method)()\n  }\n\n  var hooks = state.registry[name]\n\n  if (!hooks) {\n    return invokeMethod(options, method)\n  }\n\n  var beforeHooks = hooks.before\n  var errorHooks = hooks.error\n  var afterHooks = hooks.after\n\n  // 1. run \"before hooks\" which may mutate options\n  return Promise.all(beforeHooks.map(invokeBeforeHook.bind(null, options)))\n\n  // 2. Once all finish without error, call the method with the (mutated) options\n  .then(function () {\n    return method(options)\n  })\n\n  // 3. If an error occurs in 1. or 2. run the \"error hooks\" which may mutate\n  //    the error object. If one of them does not return an error then set the\n  //    result to that. Otherwise throw (mutated) error.\n  .catch(function (error) {\n    return Promise.all(errorHooks.map(invokeErrorHook.bind(null, error, options)))\n\n    .then(function (results) {\n      var nonErrorResults = results.filter(isntError)\n\n      if (nonErrorResults.length) {\n        return nonErrorResults[0]\n      }\n\n      throw error\n    })\n  })\n\n  // 4. Run the \"after hooks\". They may mutate the result\n  .then(function (result) {\n    return Promise.all(afterHooks.map(invokeAfterHook.bind(null, result, options)))\n\n    .then(function () {\n      return result\n    })\n  })\n}\n\nfunction invokeMethod (options, method) {\n  try {\n    return Promise.resolve(method(options))\n  } catch (error) {\n    return Promise.reject(error)\n  }\n}\n\nfunction invokeBeforeHook (options, method) {\n  try {\n    return method(options)\n  } catch (error) {\n    return Promise.reject(error)\n  }\n}\n\nfunction invokeErrorHook (result, options, errorHook) {\n  try {\n    return Promise.resolve(errorHook(result, options))\n\n    .catch(function (error) { return error })\n  } catch (error) {\n    return Promise.resolve(error)\n  }\n}\n\nfunction invokeAfterHook (result, options, method) {\n  try {\n    return method(result, options)\n  } catch (error) {\n    return Promise.reject(error)\n  }\n}\n\nfunction isntError (result) {\n  return !(result instanceof Error)\n}\n\n\n//# sourceURL=webpack://Octokit/./node_modules/before-after-hook/lib/register.js?");

/***/ }),

/***/ "./node_modules/before-after-hook/lib/remove.js":
/*!******************************************************!*\
  !*** ./node_modules/before-after-hook/lib/remove.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = removeHook\n\nfunction removeHook (state, kind, name, method) {\n  if (!state.registry[name]) {\n    return\n  }\n\n  var index = state.registry[name][kind].indexOf(method)\n\n  if (index === -1) {\n    return\n  }\n\n  state.registry[name][kind].splice(index, 1)\n}\n\n\n//# sourceURL=webpack://Octokit/./node_modules/before-after-hook/lib/remove.js?");

/***/ }),

/***/ "./node_modules/btoa-lite/btoa-browser.js":
/*!************************************************!*\
  !*** ./node_modules/btoa-lite/btoa-browser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function _btoa(str) {\n  return btoa(str)\n}\n\n\n//# sourceURL=webpack://Octokit/./node_modules/btoa-lite/btoa-browser.js?");

/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/* eslint-env browser */\n\n/**\n * This is the web browser implementation of `debug()`.\n */\nexports.log = log;\nexports.formatArgs = formatArgs;\nexports.save = save;\nexports.load = load;\nexports.useColors = useColors;\nexports.storage = localstorage();\n/**\n * Colors.\n */\n\nexports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];\n/**\n * Currently only WebKit-based Web Inspectors, Firefox >= v31,\n * and the Firebug extension (any Firefox version) are known\n * to support \"%c\" CSS customizations.\n *\n * TODO: add a `localStorage` variable to explicitly enable/disable colors\n */\n// eslint-disable-next-line complexity\n\nfunction useColors() {\n  // NB: In an Electron preload script, document will be defined but not fully\n  // initialized. Since we know we're in Chrome, we'll just detect this case\n  // explicitly\n  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {\n    return true;\n  } // Internet Explorer and Edge do not support colors.\n\n\n  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\\/(\\d+)/)) {\n    return false;\n  } // Is webkit? http://stackoverflow.com/a/16459606/376773\n  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632\n\n\n  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773\n  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?\n  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages\n  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\\/(\\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker\n  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\\/(\\d+)/);\n}\n/**\n * Colorize log arguments if enabled.\n *\n * @api public\n */\n\n\nfunction formatArgs(args) {\n  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);\n\n  if (!this.useColors) {\n    return;\n  }\n\n  var c = 'color: ' + this.color;\n  args.splice(1, 0, c, 'color: inherit'); // The final \"%c\" is somewhat tricky, because there could be other\n  // arguments passed either before or after the %c, so we need to\n  // figure out the correct index to insert the CSS into\n\n  var index = 0;\n  var lastC = 0;\n  args[0].replace(/%[a-zA-Z%]/g, function (match) {\n    if (match === '%%') {\n      return;\n    }\n\n    index++;\n\n    if (match === '%c') {\n      // We only are interested in the *last* %c\n      // (the user may have provided their own)\n      lastC = index;\n    }\n  });\n  args.splice(lastC, 0, c);\n}\n/**\n * Invokes `console.log()` when available.\n * No-op when `console.log` is not a \"function\".\n *\n * @api public\n */\n\n\nfunction log() {\n  var _console;\n\n  // This hackery is required for IE8/9, where\n  // the `console.log` function doesn't have 'apply'\n  return (typeof console === \"undefined\" ? \"undefined\" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);\n}\n/**\n * Save `namespaces`.\n *\n * @param {String} namespaces\n * @api private\n */\n\n\nfunction save(namespaces) {\n  try {\n    if (namespaces) {\n      exports.storage.setItem('debug', namespaces);\n    } else {\n      exports.storage.removeItem('debug');\n    }\n  } catch (error) {// Swallow\n    // XXX (@Qix-) should we be logging these?\n  }\n}\n/**\n * Load `namespaces`.\n *\n * @return {String} returns the previously persisted debug modes\n * @api private\n */\n\n\nfunction load() {\n  var r;\n\n  try {\n    r = exports.storage.getItem('debug');\n  } catch (error) {} // Swallow\n  // XXX (@Qix-) should we be logging these?\n  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG\n\n\n  if (!r && typeof process !== 'undefined' && 'env' in process) {\n    r = process.env.DEBUG;\n  }\n\n  return r;\n}\n/**\n * Localstorage attempts to return the localstorage.\n *\n * This is necessary because safari throws\n * when a user disables cookies/localstorage\n * and you attempt to access it.\n *\n * @return {LocalStorage}\n * @api private\n */\n\n\nfunction localstorage() {\n  try {\n    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context\n    // The Browser also has localStorage in the global context.\n    return localStorage;\n  } catch (error) {// Swallow\n    // XXX (@Qix-) should we be logging these?\n  }\n}\n\nmodule.exports = __webpack_require__(/*! ./common */ \"./node_modules/debug/src/common.js\")(exports);\nvar formatters = module.exports.formatters;\n/**\n * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.\n */\n\nformatters.j = function (v) {\n  try {\n    return JSON.stringify(v);\n  } catch (error) {\n    return '[UnexpectedJSONParseError]: ' + error.message;\n  }\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://Octokit/./node_modules/debug/src/browser.js?");

/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * This is the common logic for both the Node.js and web browser\n * implementations of `debug()`.\n */\nfunction setup(env) {\n  createDebug.debug = createDebug;\n  createDebug.default = createDebug;\n  createDebug.coerce = coerce;\n  createDebug.disable = disable;\n  createDebug.enable = enable;\n  createDebug.enabled = enabled;\n  createDebug.humanize = __webpack_require__(/*! ms */ \"./node_modules/ms/index.js\");\n  Object.keys(env).forEach(function (key) {\n    createDebug[key] = env[key];\n  });\n  /**\n  * Active `debug` instances.\n  */\n\n  createDebug.instances = [];\n  /**\n  * The currently active debug mode names, and names to skip.\n  */\n\n  createDebug.names = [];\n  createDebug.skips = [];\n  /**\n  * Map of special \"%n\" handling functions, for the debug \"format\" argument.\n  *\n  * Valid key names are a single, lower or upper-case letter, i.e. \"n\" and \"N\".\n  */\n\n  createDebug.formatters = {};\n  /**\n  * Selects a color for a debug namespace\n  * @param {String} namespace The namespace string for the for the debug instance to be colored\n  * @return {Number|String} An ANSI color code for the given namespace\n  * @api private\n  */\n\n  function selectColor(namespace) {\n    var hash = 0;\n\n    for (var i = 0; i < namespace.length; i++) {\n      hash = (hash << 5) - hash + namespace.charCodeAt(i);\n      hash |= 0; // Convert to 32bit integer\n    }\n\n    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];\n  }\n\n  createDebug.selectColor = selectColor;\n  /**\n  * Create a debugger with the given `namespace`.\n  *\n  * @param {String} namespace\n  * @return {Function}\n  * @api public\n  */\n\n  function createDebug(namespace) {\n    var prevTime;\n\n    function debug() {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      // Disabled?\n      if (!debug.enabled) {\n        return;\n      }\n\n      var self = debug; // Set `diff` timestamp\n\n      var curr = Number(new Date());\n      var ms = curr - (prevTime || curr);\n      self.diff = ms;\n      self.prev = prevTime;\n      self.curr = curr;\n      prevTime = curr;\n      args[0] = createDebug.coerce(args[0]);\n\n      if (typeof args[0] !== 'string') {\n        // Anything else let's inspect with %O\n        args.unshift('%O');\n      } // Apply any `formatters` transformations\n\n\n      var index = 0;\n      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {\n        // If we encounter an escaped % then don't increase the array index\n        if (match === '%%') {\n          return match;\n        }\n\n        index++;\n        var formatter = createDebug.formatters[format];\n\n        if (typeof formatter === 'function') {\n          var val = args[index];\n          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`\n\n          args.splice(index, 1);\n          index--;\n        }\n\n        return match;\n      }); // Apply env-specific formatting (colors, etc.)\n\n      createDebug.formatArgs.call(self, args);\n      var logFn = self.log || createDebug.log;\n      logFn.apply(self, args);\n    }\n\n    debug.namespace = namespace;\n    debug.enabled = createDebug.enabled(namespace);\n    debug.useColors = createDebug.useColors();\n    debug.color = selectColor(namespace);\n    debug.destroy = destroy;\n    debug.extend = extend; // Debug.formatArgs = formatArgs;\n    // debug.rawLog = rawLog;\n    // env-specific initialization logic for debug instances\n\n    if (typeof createDebug.init === 'function') {\n      createDebug.init(debug);\n    }\n\n    createDebug.instances.push(debug);\n    return debug;\n  }\n\n  function destroy() {\n    var index = createDebug.instances.indexOf(this);\n\n    if (index !== -1) {\n      createDebug.instances.splice(index, 1);\n      return true;\n    }\n\n    return false;\n  }\n\n  function extend(namespace, delimiter) {\n    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);\n  }\n  /**\n  * Enables a debug mode by namespaces. This can include modes\n  * separated by a colon and wildcards.\n  *\n  * @param {String} namespaces\n  * @api public\n  */\n\n\n  function enable(namespaces) {\n    createDebug.save(namespaces);\n    createDebug.names = [];\n    createDebug.skips = [];\n    var i;\n    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\\s,]+/);\n    var len = split.length;\n\n    for (i = 0; i < len; i++) {\n      if (!split[i]) {\n        // ignore empty strings\n        continue;\n      }\n\n      namespaces = split[i].replace(/\\*/g, '.*?');\n\n      if (namespaces[0] === '-') {\n        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));\n      } else {\n        createDebug.names.push(new RegExp('^' + namespaces + '$'));\n      }\n    }\n\n    for (i = 0; i < createDebug.instances.length; i++) {\n      var instance = createDebug.instances[i];\n      instance.enabled = createDebug.enabled(instance.namespace);\n    }\n  }\n  /**\n  * Disable debug output.\n  *\n  * @api public\n  */\n\n\n  function disable() {\n    createDebug.enable('');\n  }\n  /**\n  * Returns true if the given mode name is enabled, false otherwise.\n  *\n  * @param {String} name\n  * @return {Boolean}\n  * @api public\n  */\n\n\n  function enabled(name) {\n    if (name[name.length - 1] === '*') {\n      return true;\n    }\n\n    var i;\n    var len;\n\n    for (i = 0, len = createDebug.skips.length; i < len; i++) {\n      if (createDebug.skips[i].test(name)) {\n        return false;\n      }\n    }\n\n    for (i = 0, len = createDebug.names.length; i < len; i++) {\n      if (createDebug.names[i].test(name)) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n  /**\n  * Coerce `val`.\n  *\n  * @param {Mixed} val\n  * @return {Mixed}\n  * @api private\n  */\n\n\n  function coerce(val) {\n    if (val instanceof Error) {\n      return val.stack || val.message;\n    }\n\n    return val;\n  }\n\n  createDebug.enable(createDebug.load());\n  return createDebug;\n}\n\nmodule.exports = setup;\n\n\n\n//# sourceURL=webpack://Octokit/./node_modules/debug/src/common.js?");

/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar DataView = getNative(root, 'DataView');\n\nmodule.exports = DataView;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_DataView.js?");

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var hashClear = __webpack_require__(/*! ./_hashClear */ \"./node_modules/lodash/_hashClear.js\"),\n    hashDelete = __webpack_require__(/*! ./_hashDelete */ \"./node_modules/lodash/_hashDelete.js\"),\n    hashGet = __webpack_require__(/*! ./_hashGet */ \"./node_modules/lodash/_hashGet.js\"),\n    hashHas = __webpack_require__(/*! ./_hashHas */ \"./node_modules/lodash/_hashHas.js\"),\n    hashSet = __webpack_require__(/*! ./_hashSet */ \"./node_modules/lodash/_hashSet.js\");\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\nmodule.exports = Hash;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_Hash.js?");

/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ \"./node_modules/lodash/_listCacheClear.js\"),\n    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ \"./node_modules/lodash/_listCacheDelete.js\"),\n    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ \"./node_modules/lodash/_listCacheGet.js\"),\n    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ \"./node_modules/lodash/_listCacheHas.js\"),\n    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ \"./node_modules/lodash/_listCacheSet.js\");\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_ListCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Map = getNative(root, 'Map');\n\nmodule.exports = Map;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_Map.js?");

/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ \"./node_modules/lodash/_mapCacheClear.js\"),\n    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ \"./node_modules/lodash/_mapCacheDelete.js\"),\n    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ \"./node_modules/lodash/_mapCacheGet.js\"),\n    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ \"./node_modules/lodash/_mapCacheHas.js\"),\n    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ \"./node_modules/lodash/_mapCacheSet.js\");\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\nmodule.exports = MapCache;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_MapCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Promise = getNative(root, 'Promise');\n\nmodule.exports = Promise;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_Promise.js?");

/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Set = getNative(root, 'Set');\n\nmodule.exports = Set;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_Set.js?");

/***/ }),

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\"),\n    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ \"./node_modules/lodash/_setCacheAdd.js\"),\n    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ \"./node_modules/lodash/_setCacheHas.js\");\n\n/**\n *\n * Creates an array cache object to store unique values.\n *\n * @private\n * @constructor\n * @param {Array} [values] The values to cache.\n */\nfunction SetCache(values) {\n  var index = -1,\n      length = values == null ? 0 : values.length;\n\n  this.__data__ = new MapCache;\n  while (++index < length) {\n    this.add(values[index]);\n  }\n}\n\n// Add methods to `SetCache`.\nSetCache.prototype.add = SetCache.prototype.push = setCacheAdd;\nSetCache.prototype.has = setCacheHas;\n\nmodule.exports = SetCache;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_SetCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    stackClear = __webpack_require__(/*! ./_stackClear */ \"./node_modules/lodash/_stackClear.js\"),\n    stackDelete = __webpack_require__(/*! ./_stackDelete */ \"./node_modules/lodash/_stackDelete.js\"),\n    stackGet = __webpack_require__(/*! ./_stackGet */ \"./node_modules/lodash/_stackGet.js\"),\n    stackHas = __webpack_require__(/*! ./_stackHas */ \"./node_modules/lodash/_stackHas.js\"),\n    stackSet = __webpack_require__(/*! ./_stackSet */ \"./node_modules/lodash/_stackSet.js\");\n\n/**\n * Creates a stack cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Stack(entries) {\n  var data = this.__data__ = new ListCache(entries);\n  this.size = data.size;\n}\n\n// Add methods to `Stack`.\nStack.prototype.clear = stackClear;\nStack.prototype['delete'] = stackDelete;\nStack.prototype.get = stackGet;\nStack.prototype.has = stackHas;\nStack.prototype.set = stackSet;\n\nmodule.exports = Stack;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_Stack.js?");

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Uint8Array = root.Uint8Array;\n\nmodule.exports = Uint8Array;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_Uint8Array.js?");

/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar WeakMap = getNative(root, 'WeakMap');\n\nmodule.exports = WeakMap;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_WeakMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A faster alternative to `Function#apply`, this function invokes `func`\n * with the `this` binding of `thisArg` and the arguments of `args`.\n *\n * @private\n * @param {Function} func The function to invoke.\n * @param {*} thisArg The `this` binding of `func`.\n * @param {Array} args The arguments to invoke `func` with.\n * @returns {*} Returns the result of `func`.\n */\nfunction apply(func, thisArg, args) {\n  switch (args.length) {\n    case 0: return func.call(thisArg);\n    case 1: return func.call(thisArg, args[0]);\n    case 2: return func.call(thisArg, args[0], args[1]);\n    case 3: return func.call(thisArg, args[0], args[1], args[2]);\n  }\n  return func.apply(thisArg, args);\n}\n\nmodule.exports = apply;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_apply.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.forEach` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns `array`.\n */\nfunction arrayEach(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (iteratee(array[index], index, array) === false) {\n      break;\n    }\n  }\n  return array;\n}\n\nmodule.exports = arrayEach;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_arrayEach.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.filter` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {Array} Returns the new filtered array.\n */\nfunction arrayFilter(array, predicate) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      resIndex = 0,\n      result = [];\n\n  while (++index < length) {\n    var value = array[index];\n    if (predicate(value, index, array)) {\n      result[resIndex++] = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayFilter;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_arrayFilter.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayIncludes.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayIncludes.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ \"./node_modules/lodash/_baseIndexOf.js\");\n\n/**\n * A specialized version of `_.includes` for arrays without support for\n * specifying an index to search from.\n *\n * @private\n * @param {Array} [array] The array to inspect.\n * @param {*} target The value to search for.\n * @returns {boolean} Returns `true` if `target` is found, else `false`.\n */\nfunction arrayIncludes(array, value) {\n  var length = array == null ? 0 : array.length;\n  return !!length && baseIndexOf(array, value, 0) > -1;\n}\n\nmodule.exports = arrayIncludes;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_arrayIncludes.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayIncludesWith.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash/_arrayIncludesWith.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This function is like `arrayIncludes` except that it accepts a comparator.\n *\n * @private\n * @param {Array} [array] The array to inspect.\n * @param {*} target The value to search for.\n * @param {Function} comparator The comparator invoked per element.\n * @returns {boolean} Returns `true` if `target` is found, else `false`.\n */\nfunction arrayIncludesWith(array, value, comparator) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (comparator(value, array[index])) {\n      return true;\n    }\n  }\n  return false;\n}\n\nmodule.exports = arrayIncludesWith;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_arrayIncludesWith.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseTimes = __webpack_require__(/*! ./_baseTimes */ \"./node_modules/lodash/_baseTimes.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Creates an array of the enumerable property names of the array-like `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @param {boolean} inherited Specify returning inherited property names.\n * @returns {Array} Returns the array of property names.\n */\nfunction arrayLikeKeys(value, inherited) {\n  var isArr = isArray(value),\n      isArg = !isArr && isArguments(value),\n      isBuff = !isArr && !isArg && isBuffer(value),\n      isType = !isArr && !isArg && !isBuff && isTypedArray(value),\n      skipIndexes = isArr || isArg || isBuff || isType,\n      result = skipIndexes ? baseTimes(value.length, String) : [],\n      length = result.length;\n\n  for (var key in value) {\n    if ((inherited || hasOwnProperty.call(value, key)) &&\n        !(skipIndexes && (\n           // Safari 9 has enumerable `arguments.length` in strict mode.\n           key == 'length' ||\n           // Node.js 0.10 has enumerable non-index properties on buffers.\n           (isBuff && (key == 'offset' || key == 'parent')) ||\n           // PhantomJS 2 has enumerable non-index properties on typed arrays.\n           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||\n           // Skip index properties.\n           isIndex(key, length)\n        ))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayLikeKeys;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_arrayLikeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.map` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the new mapped array.\n */\nfunction arrayMap(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      result = Array(length);\n\n  while (++index < length) {\n    result[index] = iteratee(array[index], index, array);\n  }\n  return result;\n}\n\nmodule.exports = arrayMap;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_arrayMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Appends the elements of `values` to `array`.\n *\n * @private\n * @param {Array} array The array to modify.\n * @param {Array} values The values to append.\n * @returns {Array} Returns `array`.\n */\nfunction arrayPush(array, values) {\n  var index = -1,\n      length = values.length,\n      offset = array.length;\n\n  while (++index < length) {\n    array[offset + index] = values[index];\n  }\n  return array;\n}\n\nmodule.exports = arrayPush;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_arrayPush.js?");

/***/ }),

/***/ "./node_modules/lodash/_arraySome.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arraySome.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.some` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {boolean} Returns `true` if any element passes the predicate check,\n *  else `false`.\n */\nfunction arraySome(array, predicate) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (predicate(array[index], index, array)) {\n      return true;\n    }\n  }\n  return false;\n}\n\nmodule.exports = arraySome;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_arraySome.js?");

/***/ }),

/***/ "./node_modules/lodash/_assignMergeValue.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_assignMergeValue.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * This function is like `assignValue` except that it doesn't assign\n * `undefined` values.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction assignMergeValue(object, key, value) {\n  if ((value !== undefined && !eq(object[key], value)) ||\n      (value === undefined && !(key in object))) {\n    baseAssignValue(object, key, value);\n  }\n}\n\nmodule.exports = assignMergeValue;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_assignMergeValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Assigns `value` to `key` of `object` if the existing value is not equivalent\n * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction assignValue(object, key, value) {\n  var objValue = object[key];\n  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||\n      (value === undefined && !(key in object))) {\n    baseAssignValue(object, key, value);\n  }\n}\n\nmodule.exports = assignValue;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_assignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_assocIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssign.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseAssign.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * The base implementation of `_.assign` without support for multiple sources\n * or `customizer` functions.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @returns {Object} Returns `object`.\n */\nfunction baseAssign(object, source) {\n  return object && copyObject(source, keys(source), object);\n}\n\nmodule.exports = baseAssign;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseAssign.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseAssignIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * The base implementation of `_.assignIn` without support for multiple sources\n * or `customizer` functions.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @returns {Object} Returns `object`.\n */\nfunction baseAssignIn(object, source) {\n  return object && copyObject(source, keysIn(source), object);\n}\n\nmodule.exports = baseAssignIn;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseAssignIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\");\n\n/**\n * The base implementation of `assignValue` and `assignMergeValue` without\n * value checks.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction baseAssignValue(object, key, value) {\n  if (key == '__proto__' && defineProperty) {\n    defineProperty(object, key, {\n      'configurable': true,\n      'enumerable': true,\n      'value': value,\n      'writable': true\n    });\n  } else {\n    object[key] = value;\n  }\n}\n\nmodule.exports = baseAssignValue;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseAssignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseClone.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseClone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    arrayEach = __webpack_require__(/*! ./_arrayEach */ \"./node_modules/lodash/_arrayEach.js\"),\n    assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    baseAssign = __webpack_require__(/*! ./_baseAssign */ \"./node_modules/lodash/_baseAssign.js\"),\n    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ \"./node_modules/lodash/_baseAssignIn.js\"),\n    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ \"./node_modules/lodash/_cloneBuffer.js\"),\n    copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\"),\n    copySymbols = __webpack_require__(/*! ./_copySymbols */ \"./node_modules/lodash/_copySymbols.js\"),\n    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ \"./node_modules/lodash/_copySymbolsIn.js\"),\n    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ \"./node_modules/lodash/_getAllKeys.js\"),\n    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ \"./node_modules/lodash/_getAllKeysIn.js\"),\n    getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ \"./node_modules/lodash/_initCloneArray.js\"),\n    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ \"./node_modules/lodash/_initCloneByTag.js\"),\n    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ \"./node_modules/lodash/_initCloneObject.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isMap = __webpack_require__(/*! ./isMap */ \"./node_modules/lodash/isMap.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isSet = __webpack_require__(/*! ./isSet */ \"./node_modules/lodash/isSet.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_DEEP_FLAG = 1,\n    CLONE_FLAT_FLAG = 2,\n    CLONE_SYMBOLS_FLAG = 4;\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values supported by `_.clone`. */\nvar cloneableTags = {};\ncloneableTags[argsTag] = cloneableTags[arrayTag] =\ncloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =\ncloneableTags[boolTag] = cloneableTags[dateTag] =\ncloneableTags[float32Tag] = cloneableTags[float64Tag] =\ncloneableTags[int8Tag] = cloneableTags[int16Tag] =\ncloneableTags[int32Tag] = cloneableTags[mapTag] =\ncloneableTags[numberTag] = cloneableTags[objectTag] =\ncloneableTags[regexpTag] = cloneableTags[setTag] =\ncloneableTags[stringTag] = cloneableTags[symbolTag] =\ncloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =\ncloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;\ncloneableTags[errorTag] = cloneableTags[funcTag] =\ncloneableTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.clone` and `_.cloneDeep` which tracks\n * traversed objects.\n *\n * @private\n * @param {*} value The value to clone.\n * @param {boolean} bitmask The bitmask flags.\n *  1 - Deep clone\n *  2 - Flatten inherited properties\n *  4 - Clone symbols\n * @param {Function} [customizer] The function to customize cloning.\n * @param {string} [key] The key of `value`.\n * @param {Object} [object] The parent object of `value`.\n * @param {Object} [stack] Tracks traversed objects and their clone counterparts.\n * @returns {*} Returns the cloned value.\n */\nfunction baseClone(value, bitmask, customizer, key, object, stack) {\n  var result,\n      isDeep = bitmask & CLONE_DEEP_FLAG,\n      isFlat = bitmask & CLONE_FLAT_FLAG,\n      isFull = bitmask & CLONE_SYMBOLS_FLAG;\n\n  if (customizer) {\n    result = object ? customizer(value, key, object, stack) : customizer(value);\n  }\n  if (result !== undefined) {\n    return result;\n  }\n  if (!isObject(value)) {\n    return value;\n  }\n  var isArr = isArray(value);\n  if (isArr) {\n    result = initCloneArray(value);\n    if (!isDeep) {\n      return copyArray(value, result);\n    }\n  } else {\n    var tag = getTag(value),\n        isFunc = tag == funcTag || tag == genTag;\n\n    if (isBuffer(value)) {\n      return cloneBuffer(value, isDeep);\n    }\n    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {\n      result = (isFlat || isFunc) ? {} : initCloneObject(value);\n      if (!isDeep) {\n        return isFlat\n          ? copySymbolsIn(value, baseAssignIn(result, value))\n          : copySymbols(value, baseAssign(result, value));\n      }\n    } else {\n      if (!cloneableTags[tag]) {\n        return object ? value : {};\n      }\n      result = initCloneByTag(value, tag, isDeep);\n    }\n  }\n  // Check for circular references and return its corresponding clone.\n  stack || (stack = new Stack);\n  var stacked = stack.get(value);\n  if (stacked) {\n    return stacked;\n  }\n  stack.set(value, result);\n\n  if (isSet(value)) {\n    value.forEach(function(subValue) {\n      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));\n    });\n\n    return result;\n  }\n\n  if (isMap(value)) {\n    value.forEach(function(subValue, key) {\n      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));\n    });\n\n    return result;\n  }\n\n  var keysFunc = isFull\n    ? (isFlat ? getAllKeysIn : getAllKeys)\n    : (isFlat ? keysIn : keys);\n\n  var props = isArr ? undefined : keysFunc(value);\n  arrayEach(props || value, function(subValue, key) {\n    if (props) {\n      key = subValue;\n      subValue = value[key];\n    }\n    // Recursively populate clone (susceptible to call stack limits).\n    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));\n  });\n  return result;\n}\n\nmodule.exports = baseClone;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseClone.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** Built-in value references. */\nvar objectCreate = Object.create;\n\n/**\n * The base implementation of `_.create` without support for assigning\n * properties to the created object.\n *\n * @private\n * @param {Object} proto The object to inherit from.\n * @returns {Object} Returns the new object.\n */\nvar baseCreate = (function() {\n  function object() {}\n  return function(proto) {\n    if (!isObject(proto)) {\n      return {};\n    }\n    if (objectCreate) {\n      return objectCreate(proto);\n    }\n    object.prototype = proto;\n    var result = new object;\n    object.prototype = undefined;\n    return result;\n  };\n}());\n\nmodule.exports = baseCreate;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFindIndex.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseFindIndex.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.findIndex` and `_.findLastIndex` without\n * support for iteratee shorthands.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {Function} predicate The function invoked per iteration.\n * @param {number} fromIndex The index to search from.\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction baseFindIndex(array, predicate, fromIndex, fromRight) {\n  var length = array.length,\n      index = fromIndex + (fromRight ? 1 : -1);\n\n  while ((fromRight ? index-- : ++index < length)) {\n    if (predicate(array[index], index, array)) {\n      return index;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = baseFindIndex;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseFindIndex.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFlatten.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseFlatten.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    isFlattenable = __webpack_require__(/*! ./_isFlattenable */ \"./node_modules/lodash/_isFlattenable.js\");\n\n/**\n * The base implementation of `_.flatten` with support for restricting flattening.\n *\n * @private\n * @param {Array} array The array to flatten.\n * @param {number} depth The maximum recursion depth.\n * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.\n * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.\n * @param {Array} [result=[]] The initial result value.\n * @returns {Array} Returns the new flattened array.\n */\nfunction baseFlatten(array, depth, predicate, isStrict, result) {\n  var index = -1,\n      length = array.length;\n\n  predicate || (predicate = isFlattenable);\n  result || (result = []);\n\n  while (++index < length) {\n    var value = array[index];\n    if (depth > 0 && predicate(value)) {\n      if (depth > 1) {\n        // Recursively flatten arrays (susceptible to call stack limits).\n        baseFlatten(value, depth - 1, predicate, isStrict, result);\n      } else {\n        arrayPush(result, value);\n      }\n    } else if (!isStrict) {\n      result[result.length] = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseFlatten;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseFlatten.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ \"./node_modules/lodash/_createBaseFor.js\");\n\n/**\n * The base implementation of `baseForOwn` which iterates over `object`\n * properties returned by `keysFunc` and invokes `iteratee` for each property.\n * Iteratee functions may exit iteration early by explicitly returning `false`.\n *\n * @private\n * @param {Object} object The object to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @returns {Object} Returns `object`.\n */\nvar baseFor = createBaseFor();\n\nmodule.exports = baseFor;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseFor.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseForOwn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFor = __webpack_require__(/*! ./_baseFor */ \"./node_modules/lodash/_baseFor.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * The base implementation of `_.forOwn` without support for iteratee shorthands.\n *\n * @private\n * @param {Object} object The object to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Object} Returns `object`.\n */\nfunction baseForOwn(object, iteratee) {\n  return object && baseFor(object, iteratee, keys);\n}\n\nmodule.exports = baseForOwn;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseForOwn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * The base implementation of `_.get` without support for default values.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @returns {*} Returns the resolved value.\n */\nfunction baseGet(object, path) {\n  path = castPath(path, object);\n\n  var index = 0,\n      length = path.length;\n\n  while (object != null && index < length) {\n    object = object[toKey(path[index++])];\n  }\n  return (index && index == length) ? object : undefined;\n}\n\nmodule.exports = baseGet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/**\n * The base implementation of `getAllKeys` and `getAllKeysIn` which uses\n * `keysFunc` and `symbolsFunc` to get the enumerable property names and\n * symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @param {Function} symbolsFunc The function to get the symbols of `object`.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction baseGetAllKeys(object, keysFunc, symbolsFunc) {\n  var result = keysFunc(object);\n  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));\n}\n\nmodule.exports = baseGetAllKeys;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseGetAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseHasIn.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseHasIn.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.hasIn` without support for deep paths.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {Array|string} key The key to check.\n * @returns {boolean} Returns `true` if `key` exists, else `false`.\n */\nfunction baseHasIn(object, key) {\n  return object != null && key in Object(object);\n}\n\nmodule.exports = baseHasIn;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseHasIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIndexOf.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIndexOf.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ \"./node_modules/lodash/_baseFindIndex.js\"),\n    baseIsNaN = __webpack_require__(/*! ./_baseIsNaN */ \"./node_modules/lodash/_baseIsNaN.js\"),\n    strictIndexOf = __webpack_require__(/*! ./_strictIndexOf */ \"./node_modules/lodash/_strictIndexOf.js\");\n\n/**\n * The base implementation of `_.indexOf` without `fromIndex` bounds checks.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} value The value to search for.\n * @param {number} fromIndex The index to search from.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction baseIndexOf(array, value, fromIndex) {\n  return value === value\n    ? strictIndexOf(array, value, fromIndex)\n    : baseFindIndex(array, baseIsNaN, fromIndex);\n}\n\nmodule.exports = baseIndexOf;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIntersection.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIntersection.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var SetCache = __webpack_require__(/*! ./_SetCache */ \"./node_modules/lodash/_SetCache.js\"),\n    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ \"./node_modules/lodash/_arrayIncludes.js\"),\n    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ \"./node_modules/lodash/_arrayIncludesWith.js\"),\n    arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    cacheHas = __webpack_require__(/*! ./_cacheHas */ \"./node_modules/lodash/_cacheHas.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMin = Math.min;\n\n/**\n * The base implementation of methods like `_.intersection`, without support\n * for iteratee shorthands, that accepts an array of arrays to inspect.\n *\n * @private\n * @param {Array} arrays The arrays to inspect.\n * @param {Function} [iteratee] The iteratee invoked per element.\n * @param {Function} [comparator] The comparator invoked per element.\n * @returns {Array} Returns the new array of shared values.\n */\nfunction baseIntersection(arrays, iteratee, comparator) {\n  var includes = comparator ? arrayIncludesWith : arrayIncludes,\n      length = arrays[0].length,\n      othLength = arrays.length,\n      othIndex = othLength,\n      caches = Array(othLength),\n      maxLength = Infinity,\n      result = [];\n\n  while (othIndex--) {\n    var array = arrays[othIndex];\n    if (othIndex && iteratee) {\n      array = arrayMap(array, baseUnary(iteratee));\n    }\n    maxLength = nativeMin(array.length, maxLength);\n    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))\n      ? new SetCache(othIndex && array)\n      : undefined;\n  }\n  array = arrays[0];\n\n  var index = -1,\n      seen = caches[0];\n\n  outer:\n  while (++index < length && result.length < maxLength) {\n    var value = array[index],\n        computed = iteratee ? iteratee(value) : value;\n\n    value = (comparator || value !== 0) ? value : 0;\n    if (!(seen\n          ? cacheHas(seen, computed)\n          : includes(result, computed, comparator)\n        )) {\n      othIndex = othLength;\n      while (--othIndex) {\n        var cache = caches[othIndex];\n        if (!(cache\n              ? cacheHas(cache, computed)\n              : includes(arrays[othIndex], computed, comparator))\n            ) {\n          continue outer;\n        }\n      }\n      if (seen) {\n        seen.push(computed);\n      }\n      result.push(value);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseIntersection;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIntersection.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]';\n\n/**\n * The base implementation of `_.isArguments`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n */\nfunction baseIsArguments(value) {\n  return isObjectLike(value) && baseGetTag(value) == argsTag;\n}\n\nmodule.exports = baseIsArguments;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIsArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsEqual.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsEqual.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ \"./node_modules/lodash/_baseIsEqualDeep.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/**\n * The base implementation of `_.isEqual` which supports partial comparisons\n * and tracks traversed objects.\n *\n * @private\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @param {boolean} bitmask The bitmask flags.\n *  1 - Unordered comparison\n *  2 - Partial comparison\n * @param {Function} [customizer] The function to customize comparisons.\n * @param {Object} [stack] Tracks traversed `value` and `other` objects.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n */\nfunction baseIsEqual(value, other, bitmask, customizer, stack) {\n  if (value === other) {\n    return true;\n  }\n  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {\n    return value !== value && other !== other;\n  }\n  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);\n}\n\nmodule.exports = baseIsEqual;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIsEqual.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsEqualDeep.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsEqualDeep.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    equalArrays = __webpack_require__(/*! ./_equalArrays */ \"./node_modules/lodash/_equalArrays.js\"),\n    equalByTag = __webpack_require__(/*! ./_equalByTag */ \"./node_modules/lodash/_equalByTag.js\"),\n    equalObjects = __webpack_require__(/*! ./_equalObjects */ \"./node_modules/lodash/_equalObjects.js\"),\n    getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1;\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    objectTag = '[object Object]';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * A specialized version of `baseIsEqual` for arrays and objects which performs\n * deep comparisons and tracks traversed objects enabling objects with circular\n * references to be compared.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} [stack] Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {\n  var objIsArr = isArray(object),\n      othIsArr = isArray(other),\n      objTag = objIsArr ? arrayTag : getTag(object),\n      othTag = othIsArr ? arrayTag : getTag(other);\n\n  objTag = objTag == argsTag ? objectTag : objTag;\n  othTag = othTag == argsTag ? objectTag : othTag;\n\n  var objIsObj = objTag == objectTag,\n      othIsObj = othTag == objectTag,\n      isSameTag = objTag == othTag;\n\n  if (isSameTag && isBuffer(object)) {\n    if (!isBuffer(other)) {\n      return false;\n    }\n    objIsArr = true;\n    objIsObj = false;\n  }\n  if (isSameTag && !objIsObj) {\n    stack || (stack = new Stack);\n    return (objIsArr || isTypedArray(object))\n      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)\n      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);\n  }\n  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {\n    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),\n        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');\n\n    if (objIsWrapped || othIsWrapped) {\n      var objUnwrapped = objIsWrapped ? object.value() : object,\n          othUnwrapped = othIsWrapped ? other.value() : other;\n\n      stack || (stack = new Stack);\n      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);\n    }\n  }\n  if (!isSameTag) {\n    return false;\n  }\n  stack || (stack = new Stack);\n  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);\n}\n\nmodule.exports = baseIsEqualDeep;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIsEqualDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsMap.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsMap.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]';\n\n/**\n * The base implementation of `_.isMap` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a map, else `false`.\n */\nfunction baseIsMap(value) {\n  return isObjectLike(value) && getTag(value) == mapTag;\n}\n\nmodule.exports = baseIsMap;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIsMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsMatch.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsMatch.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ \"./node_modules/lodash/_baseIsEqual.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/**\n * The base implementation of `_.isMatch` without support for iteratee shorthands.\n *\n * @private\n * @param {Object} object The object to inspect.\n * @param {Object} source The object of property values to match.\n * @param {Array} matchData The property names, values, and compare flags to match.\n * @param {Function} [customizer] The function to customize comparisons.\n * @returns {boolean} Returns `true` if `object` is a match, else `false`.\n */\nfunction baseIsMatch(object, source, matchData, customizer) {\n  var index = matchData.length,\n      length = index,\n      noCustomizer = !customizer;\n\n  if (object == null) {\n    return !length;\n  }\n  object = Object(object);\n  while (index--) {\n    var data = matchData[index];\n    if ((noCustomizer && data[2])\n          ? data[1] !== object[data[0]]\n          : !(data[0] in object)\n        ) {\n      return false;\n    }\n  }\n  while (++index < length) {\n    data = matchData[index];\n    var key = data[0],\n        objValue = object[key],\n        srcValue = data[1];\n\n    if (noCustomizer && data[2]) {\n      if (objValue === undefined && !(key in object)) {\n        return false;\n      }\n    } else {\n      var stack = new Stack;\n      if (customizer) {\n        var result = customizer(objValue, srcValue, key, object, source, stack);\n      }\n      if (!(result === undefined\n            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)\n            : result\n          )) {\n        return false;\n      }\n    }\n  }\n  return true;\n}\n\nmodule.exports = baseIsMatch;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIsMatch.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNaN.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsNaN.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.isNaN` without support for number objects.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.\n */\nfunction baseIsNaN(value) {\n  return value !== value;\n}\n\nmodule.exports = baseIsNaN;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIsNaN.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isMasked = __webpack_require__(/*! ./_isMasked */ \"./node_modules/lodash/_isMasked.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\nmodule.exports = baseIsNative;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIsNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar setTag = '[object Set]';\n\n/**\n * The base implementation of `_.isSet` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a set, else `false`.\n */\nfunction baseIsSet(value) {\n  return isObjectLike(value) && getTag(value) == setTag;\n}\n\nmodule.exports = baseIsSet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIsSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values of typed arrays. */\nvar typedArrayTags = {};\ntypedArrayTags[float32Tag] = typedArrayTags[float64Tag] =\ntypedArrayTags[int8Tag] = typedArrayTags[int16Tag] =\ntypedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =\ntypedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =\ntypedArrayTags[uint32Tag] = true;\ntypedArrayTags[argsTag] = typedArrayTags[arrayTag] =\ntypedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =\ntypedArrayTags[dataViewTag] = typedArrayTags[dateTag] =\ntypedArrayTags[errorTag] = typedArrayTags[funcTag] =\ntypedArrayTags[mapTag] = typedArrayTags[numberTag] =\ntypedArrayTags[objectTag] = typedArrayTags[regexpTag] =\ntypedArrayTags[setTag] = typedArrayTags[stringTag] =\ntypedArrayTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.isTypedArray` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n */\nfunction baseIsTypedArray(value) {\n  return isObjectLike(value) &&\n    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];\n}\n\nmodule.exports = baseIsTypedArray;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIsTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIteratee.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIteratee.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseMatches = __webpack_require__(/*! ./_baseMatches */ \"./node_modules/lodash/_baseMatches.js\"),\n    baseMatchesProperty = __webpack_require__(/*! ./_baseMatchesProperty */ \"./node_modules/lodash/_baseMatchesProperty.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    property = __webpack_require__(/*! ./property */ \"./node_modules/lodash/property.js\");\n\n/**\n * The base implementation of `_.iteratee`.\n *\n * @private\n * @param {*} [value=_.identity] The value to convert to an iteratee.\n * @returns {Function} Returns the iteratee.\n */\nfunction baseIteratee(value) {\n  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.\n  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.\n  if (typeof value == 'function') {\n    return value;\n  }\n  if (value == null) {\n    return identity;\n  }\n  if (typeof value == 'object') {\n    return isArray(value)\n      ? baseMatchesProperty(value[0], value[1])\n      : baseMatches(value);\n  }\n  return property(value);\n}\n\nmodule.exports = baseIteratee;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseIteratee.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ \"./node_modules/lodash/_nativeKeys.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeys(object) {\n  if (!isPrototype(object)) {\n    return nativeKeys(object);\n  }\n  var result = [];\n  for (var key in Object(object)) {\n    if (hasOwnProperty.call(object, key) && key != 'constructor') {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseKeys;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ \"./node_modules/lodash/_nativeKeysIn.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeysIn(object) {\n  if (!isObject(object)) {\n    return nativeKeysIn(object);\n  }\n  var isProto = isPrototype(object),\n      result = [];\n\n  for (var key in object) {\n    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseKeysIn;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMatches.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseMatches.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsMatch = __webpack_require__(/*! ./_baseIsMatch */ \"./node_modules/lodash/_baseIsMatch.js\"),\n    getMatchData = __webpack_require__(/*! ./_getMatchData */ \"./node_modules/lodash/_getMatchData.js\"),\n    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ \"./node_modules/lodash/_matchesStrictComparable.js\");\n\n/**\n * The base implementation of `_.matches` which doesn't clone `source`.\n *\n * @private\n * @param {Object} source The object of property values to match.\n * @returns {Function} Returns the new spec function.\n */\nfunction baseMatches(source) {\n  var matchData = getMatchData(source);\n  if (matchData.length == 1 && matchData[0][2]) {\n    return matchesStrictComparable(matchData[0][0], matchData[0][1]);\n  }\n  return function(object) {\n    return object === source || baseIsMatch(object, source, matchData);\n  };\n}\n\nmodule.exports = baseMatches;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseMatches.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMatchesProperty.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_baseMatchesProperty.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ \"./node_modules/lodash/_baseIsEqual.js\"),\n    get = __webpack_require__(/*! ./get */ \"./node_modules/lodash/get.js\"),\n    hasIn = __webpack_require__(/*! ./hasIn */ \"./node_modules/lodash/hasIn.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ \"./node_modules/lodash/_isStrictComparable.js\"),\n    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ \"./node_modules/lodash/_matchesStrictComparable.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/**\n * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.\n *\n * @private\n * @param {string} path The path of the property to get.\n * @param {*} srcValue The value to match.\n * @returns {Function} Returns the new spec function.\n */\nfunction baseMatchesProperty(path, srcValue) {\n  if (isKey(path) && isStrictComparable(srcValue)) {\n    return matchesStrictComparable(toKey(path), srcValue);\n  }\n  return function(object) {\n    var objValue = get(object, path);\n    return (objValue === undefined && objValue === srcValue)\n      ? hasIn(object, path)\n      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);\n  };\n}\n\nmodule.exports = baseMatchesProperty;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseMatchesProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMerge.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseMerge.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ \"./node_modules/lodash/_assignMergeValue.js\"),\n    baseFor = __webpack_require__(/*! ./_baseFor */ \"./node_modules/lodash/_baseFor.js\"),\n    baseMergeDeep = __webpack_require__(/*! ./_baseMergeDeep */ \"./node_modules/lodash/_baseMergeDeep.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\"),\n    safeGet = __webpack_require__(/*! ./_safeGet */ \"./node_modules/lodash/_safeGet.js\");\n\n/**\n * The base implementation of `_.merge` without support for multiple sources.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @param {number} srcIndex The index of `source`.\n * @param {Function} [customizer] The function to customize merged values.\n * @param {Object} [stack] Tracks traversed source values and their merged\n *  counterparts.\n */\nfunction baseMerge(object, source, srcIndex, customizer, stack) {\n  if (object === source) {\n    return;\n  }\n  baseFor(source, function(srcValue, key) {\n    if (isObject(srcValue)) {\n      stack || (stack = new Stack);\n      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);\n    }\n    else {\n      var newValue = customizer\n        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)\n        : undefined;\n\n      if (newValue === undefined) {\n        newValue = srcValue;\n      }\n      assignMergeValue(object, key, newValue);\n    }\n  }, keysIn);\n}\n\nmodule.exports = baseMerge;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseMerge.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMergeDeep.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseMergeDeep.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ \"./node_modules/lodash/_assignMergeValue.js\"),\n    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ \"./node_modules/lodash/_cloneBuffer.js\"),\n    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ \"./node_modules/lodash/_cloneTypedArray.js\"),\n    copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\"),\n    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ \"./node_modules/lodash/_initCloneObject.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ \"./node_modules/lodash/isArrayLikeObject.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isPlainObject = __webpack_require__(/*! ./isPlainObject */ \"./node_modules/lodash/isPlainObject.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\"),\n    safeGet = __webpack_require__(/*! ./_safeGet */ \"./node_modules/lodash/_safeGet.js\"),\n    toPlainObject = __webpack_require__(/*! ./toPlainObject */ \"./node_modules/lodash/toPlainObject.js\");\n\n/**\n * A specialized version of `baseMerge` for arrays and objects which performs\n * deep merges and tracks traversed objects enabling objects with circular\n * references to be merged.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @param {string} key The key of the value to merge.\n * @param {number} srcIndex The index of `source`.\n * @param {Function} mergeFunc The function to merge values.\n * @param {Function} [customizer] The function to customize assigned values.\n * @param {Object} [stack] Tracks traversed source values and their merged\n *  counterparts.\n */\nfunction baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {\n  var objValue = safeGet(object, key),\n      srcValue = safeGet(source, key),\n      stacked = stack.get(srcValue);\n\n  if (stacked) {\n    assignMergeValue(object, key, stacked);\n    return;\n  }\n  var newValue = customizer\n    ? customizer(objValue, srcValue, (key + ''), object, source, stack)\n    : undefined;\n\n  var isCommon = newValue === undefined;\n\n  if (isCommon) {\n    var isArr = isArray(srcValue),\n        isBuff = !isArr && isBuffer(srcValue),\n        isTyped = !isArr && !isBuff && isTypedArray(srcValue);\n\n    newValue = srcValue;\n    if (isArr || isBuff || isTyped) {\n      if (isArray(objValue)) {\n        newValue = objValue;\n      }\n      else if (isArrayLikeObject(objValue)) {\n        newValue = copyArray(objValue);\n      }\n      else if (isBuff) {\n        isCommon = false;\n        newValue = cloneBuffer(srcValue, true);\n      }\n      else if (isTyped) {\n        isCommon = false;\n        newValue = cloneTypedArray(srcValue, true);\n      }\n      else {\n        newValue = [];\n      }\n    }\n    else if (isPlainObject(srcValue) || isArguments(srcValue)) {\n      newValue = objValue;\n      if (isArguments(objValue)) {\n        newValue = toPlainObject(objValue);\n      }\n      else if (!isObject(objValue) || isFunction(objValue)) {\n        newValue = initCloneObject(srcValue);\n      }\n    }\n    else {\n      isCommon = false;\n    }\n  }\n  if (isCommon) {\n    // Recursively merge objects and arrays (susceptible to call stack limits).\n    stack.set(srcValue, newValue);\n    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);\n    stack['delete'](srcValue);\n  }\n  assignMergeValue(object, key, newValue);\n}\n\nmodule.exports = baseMergeDeep;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseMergeDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/_basePick.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_basePick.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var basePickBy = __webpack_require__(/*! ./_basePickBy */ \"./node_modules/lodash/_basePickBy.js\"),\n    hasIn = __webpack_require__(/*! ./hasIn */ \"./node_modules/lodash/hasIn.js\");\n\n/**\n * The base implementation of `_.pick` without support for individual\n * property identifiers.\n *\n * @private\n * @param {Object} object The source object.\n * @param {string[]} paths The property paths to pick.\n * @returns {Object} Returns the new object.\n */\nfunction basePick(object, paths) {\n  return basePickBy(object, paths, function(value, path) {\n    return hasIn(object, path);\n  });\n}\n\nmodule.exports = basePick;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_basePick.js?");

/***/ }),

/***/ "./node_modules/lodash/_basePickBy.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_basePickBy.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\"),\n    baseSet = __webpack_require__(/*! ./_baseSet */ \"./node_modules/lodash/_baseSet.js\"),\n    castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\");\n\n/**\n * The base implementation of  `_.pickBy` without support for iteratee shorthands.\n *\n * @private\n * @param {Object} object The source object.\n * @param {string[]} paths The property paths to pick.\n * @param {Function} predicate The function invoked per property.\n * @returns {Object} Returns the new object.\n */\nfunction basePickBy(object, paths, predicate) {\n  var index = -1,\n      length = paths.length,\n      result = {};\n\n  while (++index < length) {\n    var path = paths[index],\n        value = baseGet(object, path);\n\n    if (predicate(value, path)) {\n      baseSet(result, castPath(path, object), value);\n    }\n  }\n  return result;\n}\n\nmodule.exports = basePickBy;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_basePickBy.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseProperty.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseProperty.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.property` without support for deep paths.\n *\n * @private\n * @param {string} key The key of the property to get.\n * @returns {Function} Returns the new accessor function.\n */\nfunction baseProperty(key) {\n  return function(object) {\n    return object == null ? undefined : object[key];\n  };\n}\n\nmodule.exports = baseProperty;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_basePropertyDeep.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_basePropertyDeep.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\");\n\n/**\n * A specialized version of `baseProperty` which supports deep paths.\n *\n * @private\n * @param {Array|string} path The path of the property to get.\n * @returns {Function} Returns the new accessor function.\n */\nfunction basePropertyDeep(path) {\n  return function(object) {\n    return baseGet(object, path);\n  };\n}\n\nmodule.exports = basePropertyDeep;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_basePropertyDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\"),\n    overRest = __webpack_require__(/*! ./_overRest */ \"./node_modules/lodash/_overRest.js\"),\n    setToString = __webpack_require__(/*! ./_setToString */ \"./node_modules/lodash/_setToString.js\");\n\n/**\n * The base implementation of `_.rest` which doesn't validate or coerce arguments.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @returns {Function} Returns the new function.\n */\nfunction baseRest(func, start) {\n  return setToString(overRest(func, start, identity), func + '');\n}\n\nmodule.exports = baseRest;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * The base implementation of `_.set`.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {Array|string} path The path of the property to set.\n * @param {*} value The value to set.\n * @param {Function} [customizer] The function to customize path creation.\n * @returns {Object} Returns `object`.\n */\nfunction baseSet(object, path, value, customizer) {\n  if (!isObject(object)) {\n    return object;\n  }\n  path = castPath(path, object);\n\n  var index = -1,\n      length = path.length,\n      lastIndex = length - 1,\n      nested = object;\n\n  while (nested != null && ++index < length) {\n    var key = toKey(path[index]),\n        newValue = value;\n\n    if (index != lastIndex) {\n      var objValue = nested[key];\n      newValue = customizer ? customizer(objValue, key, nested) : undefined;\n      if (newValue === undefined) {\n        newValue = isObject(objValue)\n          ? objValue\n          : (isIndex(path[index + 1]) ? [] : {});\n      }\n    }\n    assignValue(nested, key, newValue);\n    nested = nested[key];\n  }\n  return object;\n}\n\nmodule.exports = baseSet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var constant = __webpack_require__(/*! ./constant */ \"./node_modules/lodash/constant.js\"),\n    defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\");\n\n/**\n * The base implementation of `setToString` without support for hot loop shorting.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar baseSetToString = !defineProperty ? identity : function(func, string) {\n  return defineProperty(func, 'toString', {\n    'configurable': true,\n    'enumerable': false,\n    'value': constant(string),\n    'writable': true\n  });\n};\n\nmodule.exports = baseSetToString;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseSetToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSlice.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseSlice.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.slice` without an iteratee call guard.\n *\n * @private\n * @param {Array} array The array to slice.\n * @param {number} [start=0] The start position.\n * @param {number} [end=array.length] The end position.\n * @returns {Array} Returns the slice of `array`.\n */\nfunction baseSlice(array, start, end) {\n  var index = -1,\n      length = array.length;\n\n  if (start < 0) {\n    start = -start > length ? 0 : (length + start);\n  }\n  end = end > length ? length : end;\n  if (end < 0) {\n    end += length;\n  }\n  length = start > end ? 0 : ((end - start) >>> 0);\n  start >>>= 0;\n\n  var result = Array(length);\n  while (++index < length) {\n    result[index] = array[index + start];\n  }\n  return result;\n}\n\nmodule.exports = baseSlice;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseSlice.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.times` without support for iteratee shorthands\n * or max array length checks.\n *\n * @private\n * @param {number} n The number of times to invoke `iteratee`.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the array of results.\n */\nfunction baseTimes(n, iteratee) {\n  var index = -1,\n      result = Array(n);\n\n  while (++index < n) {\n    result[index] = iteratee(index);\n  }\n  return result;\n}\n\nmodule.exports = baseTimes;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseTimes.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolToString = symbolProto ? symbolProto.toString : undefined;\n\n/**\n * The base implementation of `_.toString` which doesn't convert nullish\n * values to empty strings.\n *\n * @private\n * @param {*} value The value to process.\n * @returns {string} Returns the string.\n */\nfunction baseToString(value) {\n  // Exit early for strings to avoid a performance hit in some environments.\n  if (typeof value == 'string') {\n    return value;\n  }\n  if (isArray(value)) {\n    // Recursively convert values (susceptible to call stack limits).\n    return arrayMap(value, baseToString) + '';\n  }\n  if (isSymbol(value)) {\n    return symbolToString ? symbolToString.call(value) : '';\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = baseToString;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.unary` without support for storing metadata.\n *\n * @private\n * @param {Function} func The function to cap arguments for.\n * @returns {Function} Returns the new capped function.\n */\nfunction baseUnary(func) {\n  return function(value) {\n    return func(value);\n  };\n}\n\nmodule.exports = baseUnary;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseUnary.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUniq.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseUniq.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var SetCache = __webpack_require__(/*! ./_SetCache */ \"./node_modules/lodash/_SetCache.js\"),\n    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ \"./node_modules/lodash/_arrayIncludes.js\"),\n    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ \"./node_modules/lodash/_arrayIncludesWith.js\"),\n    cacheHas = __webpack_require__(/*! ./_cacheHas */ \"./node_modules/lodash/_cacheHas.js\"),\n    createSet = __webpack_require__(/*! ./_createSet */ \"./node_modules/lodash/_createSet.js\"),\n    setToArray = __webpack_require__(/*! ./_setToArray */ \"./node_modules/lodash/_setToArray.js\");\n\n/** Used as the size to enable large array optimizations. */\nvar LARGE_ARRAY_SIZE = 200;\n\n/**\n * The base implementation of `_.uniqBy` without support for iteratee shorthands.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {Function} [iteratee] The iteratee invoked per element.\n * @param {Function} [comparator] The comparator invoked per element.\n * @returns {Array} Returns the new duplicate free array.\n */\nfunction baseUniq(array, iteratee, comparator) {\n  var index = -1,\n      includes = arrayIncludes,\n      length = array.length,\n      isCommon = true,\n      result = [],\n      seen = result;\n\n  if (comparator) {\n    isCommon = false;\n    includes = arrayIncludesWith;\n  }\n  else if (length >= LARGE_ARRAY_SIZE) {\n    var set = iteratee ? null : createSet(array);\n    if (set) {\n      return setToArray(set);\n    }\n    isCommon = false;\n    includes = cacheHas;\n    seen = new SetCache;\n  }\n  else {\n    seen = iteratee ? [] : result;\n  }\n  outer:\n  while (++index < length) {\n    var value = array[index],\n        computed = iteratee ? iteratee(value) : value;\n\n    value = (comparator || value !== 0) ? value : 0;\n    if (isCommon && computed === computed) {\n      var seenIndex = seen.length;\n      while (seenIndex--) {\n        if (seen[seenIndex] === computed) {\n          continue outer;\n        }\n      }\n      if (iteratee) {\n        seen.push(computed);\n      }\n      result.push(value);\n    }\n    else if (!includes(seen, computed, comparator)) {\n      if (seen !== result) {\n        seen.push(computed);\n      }\n      result.push(value);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseUniq;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseUniq.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUnset.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnset.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    last = __webpack_require__(/*! ./last */ \"./node_modules/lodash/last.js\"),\n    parent = __webpack_require__(/*! ./_parent */ \"./node_modules/lodash/_parent.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * The base implementation of `_.unset`.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {Array|string} path The property path to unset.\n * @returns {boolean} Returns `true` if the property is deleted, else `false`.\n */\nfunction baseUnset(object, path) {\n  path = castPath(path, object);\n  object = parent(object, path);\n  return object == null || delete object[toKey(last(path))];\n}\n\nmodule.exports = baseUnset;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_baseUnset.js?");

/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if a `cache` value for `key` exists.\n *\n * @private\n * @param {Object} cache The cache to query.\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction cacheHas(cache, key) {\n  return cache.has(key);\n}\n\nmodule.exports = cacheHas;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_cacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_castArrayLikeObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_castArrayLikeObject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ \"./node_modules/lodash/isArrayLikeObject.js\");\n\n/**\n * Casts `value` to an empty array if it's not an array like object.\n *\n * @private\n * @param {*} value The value to inspect.\n * @returns {Array|Object} Returns the cast array-like object.\n */\nfunction castArrayLikeObject(value) {\n  return isArrayLikeObject(value) ? value : [];\n}\n\nmodule.exports = castArrayLikeObject;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_castArrayLikeObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    stringToPath = __webpack_require__(/*! ./_stringToPath */ \"./node_modules/lodash/_stringToPath.js\"),\n    toString = __webpack_require__(/*! ./toString */ \"./node_modules/lodash/toString.js\");\n\n/**\n * Casts `value` to a path array if it's not one.\n *\n * @private\n * @param {*} value The value to inspect.\n * @param {Object} [object] The object to query keys on.\n * @returns {Array} Returns the cast property path array.\n */\nfunction castPath(value, object) {\n  if (isArray(value)) {\n    return value;\n  }\n  return isKey(value, object) ? [value] : stringToPath(toString(value));\n}\n\nmodule.exports = castPath;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_castPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ \"./node_modules/lodash/_Uint8Array.js\");\n\n/**\n * Creates a clone of `arrayBuffer`.\n *\n * @private\n * @param {ArrayBuffer} arrayBuffer The array buffer to clone.\n * @returns {ArrayBuffer} Returns the cloned array buffer.\n */\nfunction cloneArrayBuffer(arrayBuffer) {\n  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);\n  new Uint8Array(result).set(new Uint8Array(arrayBuffer));\n  return result;\n}\n\nmodule.exports = cloneArrayBuffer;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_cloneArrayBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined,\n    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;\n\n/**\n * Creates a clone of  `buffer`.\n *\n * @private\n * @param {Buffer} buffer The buffer to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Buffer} Returns the cloned buffer.\n */\nfunction cloneBuffer(buffer, isDeep) {\n  if (isDeep) {\n    return buffer.slice();\n  }\n  var length = buffer.length,\n      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);\n\n  buffer.copy(result);\n  return result;\n}\n\nmodule.exports = cloneBuffer;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_cloneBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneDataView.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_cloneDataView.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\");\n\n/**\n * Creates a clone of `dataView`.\n *\n * @private\n * @param {Object} dataView The data view to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned data view.\n */\nfunction cloneDataView(dataView, isDeep) {\n  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;\n  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);\n}\n\nmodule.exports = cloneDataView;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_cloneDataView.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneRegExp.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneRegExp.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to match `RegExp` flags from their coerced string values. */\nvar reFlags = /\\w*$/;\n\n/**\n * Creates a clone of `regexp`.\n *\n * @private\n * @param {Object} regexp The regexp to clone.\n * @returns {Object} Returns the cloned regexp.\n */\nfunction cloneRegExp(regexp) {\n  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));\n  result.lastIndex = regexp.lastIndex;\n  return result;\n}\n\nmodule.exports = cloneRegExp;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_cloneRegExp.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneSymbol.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneSymbol.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;\n\n/**\n * Creates a clone of the `symbol` object.\n *\n * @private\n * @param {Object} symbol The symbol object to clone.\n * @returns {Object} Returns the cloned symbol object.\n */\nfunction cloneSymbol(symbol) {\n  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};\n}\n\nmodule.exports = cloneSymbol;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_cloneSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\");\n\n/**\n * Creates a clone of `typedArray`.\n *\n * @private\n * @param {Object} typedArray The typed array to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned typed array.\n */\nfunction cloneTypedArray(typedArray, isDeep) {\n  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;\n  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);\n}\n\nmodule.exports = cloneTypedArray;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_cloneTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Copies the values of `source` to `array`.\n *\n * @private\n * @param {Array} source The array to copy values from.\n * @param {Array} [array=[]] The array to copy values to.\n * @returns {Array} Returns `array`.\n */\nfunction copyArray(source, array) {\n  var index = -1,\n      length = source.length;\n\n  array || (array = Array(length));\n  while (++index < length) {\n    array[index] = source[index];\n  }\n  return array;\n}\n\nmodule.exports = copyArray;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_copyArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\");\n\n/**\n * Copies properties of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy properties from.\n * @param {Array} props The property identifiers to copy.\n * @param {Object} [object={}] The object to copy properties to.\n * @param {Function} [customizer] The function to customize copied values.\n * @returns {Object} Returns `object`.\n */\nfunction copyObject(source, props, object, customizer) {\n  var isNew = !object;\n  object || (object = {});\n\n  var index = -1,\n      length = props.length;\n\n  while (++index < length) {\n    var key = props[index];\n\n    var newValue = customizer\n      ? customizer(object[key], source[key], key, object, source)\n      : undefined;\n\n    if (newValue === undefined) {\n      newValue = source[key];\n    }\n    if (isNew) {\n      baseAssignValue(object, key, newValue);\n    } else {\n      assignValue(object, key, newValue);\n    }\n  }\n  return object;\n}\n\nmodule.exports = copyObject;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_copyObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_copySymbols.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_copySymbols.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\");\n\n/**\n * Copies own symbols of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy symbols from.\n * @param {Object} [object={}] The object to copy symbols to.\n * @returns {Object} Returns `object`.\n */\nfunction copySymbols(source, object) {\n  return copyObject(source, getSymbols(source), object);\n}\n\nmodule.exports = copySymbols;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_copySymbols.js?");

/***/ }),

/***/ "./node_modules/lodash/_copySymbolsIn.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_copySymbolsIn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ \"./node_modules/lodash/_getSymbolsIn.js\");\n\n/**\n * Copies own and inherited symbols of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy symbols from.\n * @param {Object} [object={}] The object to copy symbols to.\n * @returns {Object} Returns `object`.\n */\nfunction copySymbolsIn(source, object) {\n  return copyObject(source, getSymbolsIn(source), object);\n}\n\nmodule.exports = copySymbolsIn;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_copySymbolsIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\nmodule.exports = coreJsData;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_coreJsData.js?");

/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseRest = __webpack_require__(/*! ./_baseRest */ \"./node_modules/lodash/_baseRest.js\"),\n    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ \"./node_modules/lodash/_isIterateeCall.js\");\n\n/**\n * Creates a function like `_.assign`.\n *\n * @private\n * @param {Function} assigner The function to assign values.\n * @returns {Function} Returns the new assigner function.\n */\nfunction createAssigner(assigner) {\n  return baseRest(function(object, sources) {\n    var index = -1,\n        length = sources.length,\n        customizer = length > 1 ? sources[length - 1] : undefined,\n        guard = length > 2 ? sources[2] : undefined;\n\n    customizer = (assigner.length > 3 && typeof customizer == 'function')\n      ? (length--, customizer)\n      : undefined;\n\n    if (guard && isIterateeCall(sources[0], sources[1], guard)) {\n      customizer = length < 3 ? undefined : customizer;\n      length = 1;\n    }\n    object = Object(object);\n    while (++index < length) {\n      var source = sources[index];\n      if (source) {\n        assigner(object, source, index, customizer);\n      }\n    }\n    return object;\n  });\n}\n\nmodule.exports = createAssigner;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_createAssigner.js?");

/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a base function for methods like `_.forIn` and `_.forOwn`.\n *\n * @private\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {Function} Returns the new base function.\n */\nfunction createBaseFor(fromRight) {\n  return function(object, iteratee, keysFunc) {\n    var index = -1,\n        iterable = Object(object),\n        props = keysFunc(object),\n        length = props.length;\n\n    while (length--) {\n      var key = props[fromRight ? length : ++index];\n      if (iteratee(iterable[key], key, iterable) === false) {\n        break;\n      }\n    }\n    return object;\n  };\n}\n\nmodule.exports = createBaseFor;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_createBaseFor.js?");

/***/ }),

/***/ "./node_modules/lodash/_createSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_createSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Set = __webpack_require__(/*! ./_Set */ \"./node_modules/lodash/_Set.js\"),\n    noop = __webpack_require__(/*! ./noop */ \"./node_modules/lodash/noop.js\"),\n    setToArray = __webpack_require__(/*! ./_setToArray */ \"./node_modules/lodash/_setToArray.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/**\n * Creates a set object of `values`.\n *\n * @private\n * @param {Array} values The values to add to the set.\n * @returns {Object} Returns the new set.\n */\nvar createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {\n  return new Set(values);\n};\n\nmodule.exports = createSet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_createSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_customDefaultsMerge.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_customDefaultsMerge.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseMerge = __webpack_require__(/*! ./_baseMerge */ \"./node_modules/lodash/_baseMerge.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/**\n * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source\n * objects into destination objects that are passed thru.\n *\n * @private\n * @param {*} objValue The destination value.\n * @param {*} srcValue The source value.\n * @param {string} key The key of the property to merge.\n * @param {Object} object The parent object of `objValue`.\n * @param {Object} source The parent object of `srcValue`.\n * @param {Object} [stack] Tracks traversed source values and their merged\n *  counterparts.\n * @returns {*} Returns the value to assign.\n */\nfunction customDefaultsMerge(objValue, srcValue, key, object, source, stack) {\n  if (isObject(objValue) && isObject(srcValue)) {\n    // Recursively merge objects and arrays (susceptible to call stack limits).\n    stack.set(srcValue, objValue);\n    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);\n    stack['delete'](srcValue);\n  }\n  return objValue;\n}\n\nmodule.exports = customDefaultsMerge;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_customDefaultsMerge.js?");

/***/ }),

/***/ "./node_modules/lodash/_customOmitClone.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_customOmitClone.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isPlainObject = __webpack_require__(/*! ./isPlainObject */ \"./node_modules/lodash/isPlainObject.js\");\n\n/**\n * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain\n * objects.\n *\n * @private\n * @param {*} value The value to inspect.\n * @param {string} key The key of the property to inspect.\n * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.\n */\nfunction customOmitClone(value) {\n  return isPlainObject(value) ? undefined : value;\n}\n\nmodule.exports = customOmitClone;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_customOmitClone.js?");

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\nvar defineProperty = (function() {\n  try {\n    var func = getNative(Object, 'defineProperty');\n    func({}, '', {});\n    return func;\n  } catch (e) {}\n}());\n\nmodule.exports = defineProperty;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_defineProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalArrays.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_equalArrays.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var SetCache = __webpack_require__(/*! ./_SetCache */ \"./node_modules/lodash/_SetCache.js\"),\n    arraySome = __webpack_require__(/*! ./_arraySome */ \"./node_modules/lodash/_arraySome.js\"),\n    cacheHas = __webpack_require__(/*! ./_cacheHas */ \"./node_modules/lodash/_cacheHas.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/**\n * A specialized version of `baseIsEqualDeep` for arrays with support for\n * partial deep comparisons.\n *\n * @private\n * @param {Array} array The array to compare.\n * @param {Array} other The other array to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `array` and `other` objects.\n * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.\n */\nfunction equalArrays(array, other, bitmask, customizer, equalFunc, stack) {\n  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,\n      arrLength = array.length,\n      othLength = other.length;\n\n  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {\n    return false;\n  }\n  // Assume cyclic values are equal.\n  var stacked = stack.get(array);\n  if (stacked && stack.get(other)) {\n    return stacked == other;\n  }\n  var index = -1,\n      result = true,\n      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;\n\n  stack.set(array, other);\n  stack.set(other, array);\n\n  // Ignore non-index properties.\n  while (++index < arrLength) {\n    var arrValue = array[index],\n        othValue = other[index];\n\n    if (customizer) {\n      var compared = isPartial\n        ? customizer(othValue, arrValue, index, other, array, stack)\n        : customizer(arrValue, othValue, index, array, other, stack);\n    }\n    if (compared !== undefined) {\n      if (compared) {\n        continue;\n      }\n      result = false;\n      break;\n    }\n    // Recursively compare arrays (susceptible to call stack limits).\n    if (seen) {\n      if (!arraySome(other, function(othValue, othIndex) {\n            if (!cacheHas(seen, othIndex) &&\n                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {\n              return seen.push(othIndex);\n            }\n          })) {\n        result = false;\n        break;\n      }\n    } else if (!(\n          arrValue === othValue ||\n            equalFunc(arrValue, othValue, bitmask, customizer, stack)\n        )) {\n      result = false;\n      break;\n    }\n  }\n  stack['delete'](array);\n  stack['delete'](other);\n  return result;\n}\n\nmodule.exports = equalArrays;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_equalArrays.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalByTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_equalByTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ \"./node_modules/lodash/_Uint8Array.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\"),\n    equalArrays = __webpack_require__(/*! ./_equalArrays */ \"./node_modules/lodash/_equalArrays.js\"),\n    mapToArray = __webpack_require__(/*! ./_mapToArray */ \"./node_modules/lodash/_mapToArray.js\"),\n    setToArray = __webpack_require__(/*! ./_setToArray */ \"./node_modules/lodash/_setToArray.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/** `Object#toString` result references. */\nvar boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]';\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;\n\n/**\n * A specialized version of `baseIsEqualDeep` for comparing objects of\n * the same `toStringTag`.\n *\n * **Note:** This function only supports comparing values with tags of\n * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {string} tag The `toStringTag` of the objects to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {\n  switch (tag) {\n    case dataViewTag:\n      if ((object.byteLength != other.byteLength) ||\n          (object.byteOffset != other.byteOffset)) {\n        return false;\n      }\n      object = object.buffer;\n      other = other.buffer;\n\n    case arrayBufferTag:\n      if ((object.byteLength != other.byteLength) ||\n          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {\n        return false;\n      }\n      return true;\n\n    case boolTag:\n    case dateTag:\n    case numberTag:\n      // Coerce booleans to `1` or `0` and dates to milliseconds.\n      // Invalid dates are coerced to `NaN`.\n      return eq(+object, +other);\n\n    case errorTag:\n      return object.name == other.name && object.message == other.message;\n\n    case regexpTag:\n    case stringTag:\n      // Coerce regexes to strings and treat strings, primitives and objects,\n      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring\n      // for more details.\n      return object == (other + '');\n\n    case mapTag:\n      var convert = mapToArray;\n\n    case setTag:\n      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;\n      convert || (convert = setToArray);\n\n      if (object.size != other.size && !isPartial) {\n        return false;\n      }\n      // Assume cyclic values are equal.\n      var stacked = stack.get(object);\n      if (stacked) {\n        return stacked == other;\n      }\n      bitmask |= COMPARE_UNORDERED_FLAG;\n\n      // Recursively compare objects (susceptible to call stack limits).\n      stack.set(object, other);\n      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);\n      stack['delete'](object);\n      return result;\n\n    case symbolTag:\n      if (symbolValueOf) {\n        return symbolValueOf.call(object) == symbolValueOf.call(other);\n      }\n  }\n  return false;\n}\n\nmodule.exports = equalByTag;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_equalByTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalObjects.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_equalObjects.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ \"./node_modules/lodash/_getAllKeys.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1;\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * A specialized version of `baseIsEqualDeep` for objects with support for\n * partial deep comparisons.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction equalObjects(object, other, bitmask, customizer, equalFunc, stack) {\n  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,\n      objProps = getAllKeys(object),\n      objLength = objProps.length,\n      othProps = getAllKeys(other),\n      othLength = othProps.length;\n\n  if (objLength != othLength && !isPartial) {\n    return false;\n  }\n  var index = objLength;\n  while (index--) {\n    var key = objProps[index];\n    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {\n      return false;\n    }\n  }\n  // Assume cyclic values are equal.\n  var stacked = stack.get(object);\n  if (stacked && stack.get(other)) {\n    return stacked == other;\n  }\n  var result = true;\n  stack.set(object, other);\n  stack.set(other, object);\n\n  var skipCtor = isPartial;\n  while (++index < objLength) {\n    key = objProps[index];\n    var objValue = object[key],\n        othValue = other[key];\n\n    if (customizer) {\n      var compared = isPartial\n        ? customizer(othValue, objValue, key, other, object, stack)\n        : customizer(objValue, othValue, key, object, other, stack);\n    }\n    // Recursively compare objects (susceptible to call stack limits).\n    if (!(compared === undefined\n          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))\n          : compared\n        )) {\n      result = false;\n      break;\n    }\n    skipCtor || (skipCtor = key == 'constructor');\n  }\n  if (result && !skipCtor) {\n    var objCtor = object.constructor,\n        othCtor = other.constructor;\n\n    // Non `Object` object instances with different constructors are not equal.\n    if (objCtor != othCtor &&\n        ('constructor' in object && 'constructor' in other) &&\n        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&\n          typeof othCtor == 'function' && othCtor instanceof othCtor)) {\n      result = false;\n    }\n  }\n  stack['delete'](object);\n  stack['delete'](other);\n  return result;\n}\n\nmodule.exports = equalObjects;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_equalObjects.js?");

/***/ }),

/***/ "./node_modules/lodash/_flatRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_flatRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var flatten = __webpack_require__(/*! ./flatten */ \"./node_modules/lodash/flatten.js\"),\n    overRest = __webpack_require__(/*! ./_overRest */ \"./node_modules/lodash/_overRest.js\"),\n    setToString = __webpack_require__(/*! ./_setToString */ \"./node_modules/lodash/_setToString.js\");\n\n/**\n * A specialized version of `baseRest` which flattens the rest array.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @returns {Function} Returns the new function.\n */\nfunction flatRest(func) {\n  return setToString(overRest(func, undefined, flatten), func + '');\n}\n\nmodule.exports = flatRest;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_flatRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ \"./node_modules/lodash/_baseGetAllKeys.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * Creates an array of own enumerable property names and symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction getAllKeys(object) {\n  return baseGetAllKeys(object, keys, getSymbols);\n}\n\nmodule.exports = getAllKeys;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_getAllKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getAllKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ \"./node_modules/lodash/_baseGetAllKeys.js\"),\n    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ \"./node_modules/lodash/_getSymbolsIn.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * Creates an array of own and inherited enumerable property names and\n * symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction getAllKeysIn(object) {\n  return baseGetAllKeys(object, keysIn, getSymbolsIn);\n}\n\nmodule.exports = getAllKeysIn;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getAllKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isKeyable = __webpack_require__(/*! ./_isKeyable */ \"./node_modules/lodash/_isKeyable.js\");\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\nmodule.exports = getMapData;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getMapData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMatchData.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getMatchData.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ \"./node_modules/lodash/_isStrictComparable.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * Gets the property names, values, and compare flags of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the match data of `object`.\n */\nfunction getMatchData(object) {\n  var result = keys(object),\n      length = result.length;\n\n  while (length--) {\n    var key = result[length],\n        value = object[key];\n\n    result[length] = [key, value, isStrictComparable(value)];\n  }\n  return result;\n}\n\nmodule.exports = getMatchData;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getMatchData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ \"./node_modules/lodash/_baseIsNative.js\"),\n    getValue = __webpack_require__(/*! ./_getValue */ \"./node_modules/lodash/_getValue.js\");\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\nmodule.exports = getNative;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/** Built-in value references. */\nvar getPrototype = overArg(Object.getPrototypeOf, Object);\n\nmodule.exports = getPrototype;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getSymbols.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ \"./node_modules/lodash/_arrayFilter.js\"),\n    stubArray = __webpack_require__(/*! ./stubArray */ \"./node_modules/lodash/stubArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeGetSymbols = Object.getOwnPropertySymbols;\n\n/**\n * Creates an array of the own enumerable symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of symbols.\n */\nvar getSymbols = !nativeGetSymbols ? stubArray : function(object) {\n  if (object == null) {\n    return [];\n  }\n  object = Object(object);\n  return arrayFilter(nativeGetSymbols(object), function(symbol) {\n    return propertyIsEnumerable.call(object, symbol);\n  });\n};\n\nmodule.exports = getSymbols;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getSymbols.js?");

/***/ }),

/***/ "./node_modules/lodash/_getSymbolsIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getSymbolsIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\"),\n    stubArray = __webpack_require__(/*! ./stubArray */ \"./node_modules/lodash/stubArray.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeGetSymbols = Object.getOwnPropertySymbols;\n\n/**\n * Creates an array of the own and inherited enumerable symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of symbols.\n */\nvar getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {\n  var result = [];\n  while (object) {\n    arrayPush(result, getSymbols(object));\n    object = getPrototype(object);\n  }\n  return result;\n};\n\nmodule.exports = getSymbolsIn;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getSymbolsIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DataView = __webpack_require__(/*! ./_DataView */ \"./node_modules/lodash/_DataView.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    Promise = __webpack_require__(/*! ./_Promise */ \"./node_modules/lodash/_Promise.js\"),\n    Set = __webpack_require__(/*! ./_Set */ \"./node_modules/lodash/_Set.js\"),\n    WeakMap = __webpack_require__(/*! ./_WeakMap */ \"./node_modules/lodash/_WeakMap.js\"),\n    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]',\n    objectTag = '[object Object]',\n    promiseTag = '[object Promise]',\n    setTag = '[object Set]',\n    weakMapTag = '[object WeakMap]';\n\nvar dataViewTag = '[object DataView]';\n\n/** Used to detect maps, sets, and weakmaps. */\nvar dataViewCtorString = toSource(DataView),\n    mapCtorString = toSource(Map),\n    promiseCtorString = toSource(Promise),\n    setCtorString = toSource(Set),\n    weakMapCtorString = toSource(WeakMap);\n\n/**\n * Gets the `toStringTag` of `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nvar getTag = baseGetTag;\n\n// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.\nif ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||\n    (Map && getTag(new Map) != mapTag) ||\n    (Promise && getTag(Promise.resolve()) != promiseTag) ||\n    (Set && getTag(new Set) != setTag) ||\n    (WeakMap && getTag(new WeakMap) != weakMapTag)) {\n  getTag = function(value) {\n    var result = baseGetTag(value),\n        Ctor = result == objectTag ? value.constructor : undefined,\n        ctorString = Ctor ? toSource(Ctor) : '';\n\n    if (ctorString) {\n      switch (ctorString) {\n        case dataViewCtorString: return dataViewTag;\n        case mapCtorString: return mapTag;\n        case promiseCtorString: return promiseTag;\n        case setCtorString: return setTag;\n        case weakMapCtorString: return weakMapTag;\n      }\n    }\n    return result;\n  };\n}\n\nmodule.exports = getTag;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_getValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_hasPath.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hasPath.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * Checks if `path` exists on `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array|string} path The path to check.\n * @param {Function} hasFunc The function to check properties.\n * @returns {boolean} Returns `true` if `path` exists, else `false`.\n */\nfunction hasPath(object, path, hasFunc) {\n  path = castPath(path, object);\n\n  var index = -1,\n      length = path.length,\n      result = false;\n\n  while (++index < length) {\n    var key = toKey(path[index]);\n    if (!(result = object != null && hasFunc(object, key))) {\n      break;\n    }\n    object = object[key];\n  }\n  if (result || ++index != length) {\n    return result;\n  }\n  length = object == null ? 0 : object.length;\n  return !!length && isLength(length) && isIndex(key, length) &&\n    (isArray(object) || isArguments(object));\n}\n\nmodule.exports = hasPath;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_hasPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n  this.size = 0;\n}\n\nmodule.exports = hashClear;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_hashClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  var result = this.has(key) && delete this.__data__[key];\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = hashDelete;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_hashDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\nmodule.exports = hashGet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_hashGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);\n}\n\nmodule.exports = hashHas;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_hashHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  this.size += this.has(key) ? 0 : 1;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\nmodule.exports = hashSet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_hashSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneArray.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Initializes an array clone.\n *\n * @private\n * @param {Array} array The array to clone.\n * @returns {Array} Returns the initialized clone.\n */\nfunction initCloneArray(array) {\n  var length = array.length,\n      result = new array.constructor(length);\n\n  // Add properties assigned by `RegExp#exec`.\n  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {\n    result.index = array.index;\n    result.input = array.input;\n  }\n  return result;\n}\n\nmodule.exports = initCloneArray;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_initCloneArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneByTag.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneByTag.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\"),\n    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ \"./node_modules/lodash/_cloneDataView.js\"),\n    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ \"./node_modules/lodash/_cloneRegExp.js\"),\n    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ \"./node_modules/lodash/_cloneSymbol.js\"),\n    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ \"./node_modules/lodash/_cloneTypedArray.js\");\n\n/** `Object#toString` result references. */\nvar boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/**\n * Initializes an object clone based on its `toStringTag`.\n *\n * **Note:** This function only supports cloning values with tags of\n * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.\n *\n * @private\n * @param {Object} object The object to clone.\n * @param {string} tag The `toStringTag` of the object to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the initialized clone.\n */\nfunction initCloneByTag(object, tag, isDeep) {\n  var Ctor = object.constructor;\n  switch (tag) {\n    case arrayBufferTag:\n      return cloneArrayBuffer(object);\n\n    case boolTag:\n    case dateTag:\n      return new Ctor(+object);\n\n    case dataViewTag:\n      return cloneDataView(object, isDeep);\n\n    case float32Tag: case float64Tag:\n    case int8Tag: case int16Tag: case int32Tag:\n    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:\n      return cloneTypedArray(object, isDeep);\n\n    case mapTag:\n      return new Ctor;\n\n    case numberTag:\n    case stringTag:\n      return new Ctor(object);\n\n    case regexpTag:\n      return cloneRegExp(object);\n\n    case setTag:\n      return new Ctor;\n\n    case symbolTag:\n      return cloneSymbol(object);\n  }\n}\n\nmodule.exports = initCloneByTag;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_initCloneByTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseCreate = __webpack_require__(/*! ./_baseCreate */ \"./node_modules/lodash/_baseCreate.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\");\n\n/**\n * Initializes an object clone.\n *\n * @private\n * @param {Object} object The object to clone.\n * @returns {Object} Returns the initialized clone.\n */\nfunction initCloneObject(object) {\n  return (typeof object.constructor == 'function' && !isPrototype(object))\n    ? baseCreate(getPrototype(object))\n    : {};\n}\n\nmodule.exports = initCloneObject;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_initCloneObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_isFlattenable.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_isFlattenable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/** Built-in value references. */\nvar spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;\n\n/**\n * Checks if `value` is a flattenable `arguments` object or array.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.\n */\nfunction isFlattenable(value) {\n  return isArray(value) || isArguments(value) ||\n    !!(spreadableSymbol && value && value[spreadableSymbol]);\n}\n\nmodule.exports = isFlattenable;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_isFlattenable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/** Used to detect unsigned integer values. */\nvar reIsUint = /^(?:0|[1-9]\\d*)$/;\n\n/**\n * Checks if `value` is a valid array-like index.\n *\n * @private\n * @param {*} value The value to check.\n * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.\n * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.\n */\nfunction isIndex(value, length) {\n  var type = typeof value;\n  length = length == null ? MAX_SAFE_INTEGER : length;\n\n  return !!length &&\n    (type == 'number' ||\n      (type != 'symbol' && reIsUint.test(value))) &&\n        (value > -1 && value % 1 == 0 && value < length);\n}\n\nmodule.exports = isIndex;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_isIndex.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/**\n * Checks if the given arguments are from an iteratee call.\n *\n * @private\n * @param {*} value The potential iteratee value argument.\n * @param {*} index The potential iteratee index or key argument.\n * @param {*} object The potential iteratee object argument.\n * @returns {boolean} Returns `true` if the arguments are from an iteratee call,\n *  else `false`.\n */\nfunction isIterateeCall(value, index, object) {\n  if (!isObject(object)) {\n    return false;\n  }\n  var type = typeof index;\n  if (type == 'number'\n        ? (isArrayLike(object) && isIndex(index, object.length))\n        : (type == 'string' && index in object)\n      ) {\n    return eq(object[index], value);\n  }\n  return false;\n}\n\nmodule.exports = isIterateeCall;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_isIterateeCall.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used to match property names within property paths. */\nvar reIsDeepProp = /\\.|\\[(?:[^[\\]]*|([\"'])(?:(?!\\1)[^\\\\]|\\\\.)*?\\1)\\]/,\n    reIsPlainProp = /^\\w*$/;\n\n/**\n * Checks if `value` is a property name and not a property path.\n *\n * @private\n * @param {*} value The value to check.\n * @param {Object} [object] The object to query keys on.\n * @returns {boolean} Returns `true` if `value` is a property name, else `false`.\n */\nfunction isKey(value, object) {\n  if (isArray(value)) {\n    return false;\n  }\n  var type = typeof value;\n  if (type == 'number' || type == 'symbol' || type == 'boolean' ||\n      value == null || isSymbol(value)) {\n    return true;\n  }\n  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||\n    (object != null && value in Object(object));\n}\n\nmodule.exports = isKey;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_isKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\nmodule.exports = isKeyable;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_isKeyable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var coreJsData = __webpack_require__(/*! ./_coreJsData */ \"./node_modules/lodash/_coreJsData.js\");\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\nmodule.exports = isMasked;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_isMasked.js?");

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Checks if `value` is likely a prototype object.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.\n */\nfunction isPrototype(value) {\n  var Ctor = value && value.constructor,\n      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;\n\n  return value === proto;\n}\n\nmodule.exports = isPrototype;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_isPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_isStrictComparable.js":
/*!****************************************************!*\
  !*** ./node_modules/lodash/_isStrictComparable.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/**\n * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` if suitable for strict\n *  equality comparisons, else `false`.\n */\nfunction isStrictComparable(value) {\n  return value === value && !isObject(value);\n}\n\nmodule.exports = isStrictComparable;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_isStrictComparable.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_listCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_listCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_listCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_listCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_listCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Hash = __webpack_require__(/*! ./_Hash */ \"./node_modules/lodash/_Hash.js\"),\n    ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\");\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.size = 0;\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\nmodule.exports = mapCacheClear;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_mapCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  var result = getMapData(this, key)['delete'](key);\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = mapCacheDelete;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_mapCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\nmodule.exports = mapCacheGet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_mapCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\nmodule.exports = mapCacheHas;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_mapCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  var data = getMapData(this, key),\n      size = data.size;\n\n  data.set(key, value);\n  this.size += data.size == size ? 0 : 1;\n  return this;\n}\n\nmodule.exports = mapCacheSet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_mapCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_mapToArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Converts `map` to its key-value pairs.\n *\n * @private\n * @param {Object} map The map to convert.\n * @returns {Array} Returns the key-value pairs.\n */\nfunction mapToArray(map) {\n  var index = -1,\n      result = Array(map.size);\n\n  map.forEach(function(value, key) {\n    result[++index] = [key, value];\n  });\n  return result;\n}\n\nmodule.exports = mapToArray;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_mapToArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_matchesStrictComparable.js":
/*!*********************************************************!*\
  !*** ./node_modules/lodash/_matchesStrictComparable.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `matchesProperty` for source values suitable\n * for strict equality comparisons, i.e. `===`.\n *\n * @private\n * @param {string} key The key of the property to get.\n * @param {*} srcValue The value to match.\n * @returns {Function} Returns the new spec function.\n */\nfunction matchesStrictComparable(key, srcValue) {\n  return function(object) {\n    if (object == null) {\n      return false;\n    }\n    return object[key] === srcValue &&\n      (srcValue !== undefined || (key in Object(object)));\n  };\n}\n\nmodule.exports = matchesStrictComparable;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_matchesStrictComparable.js?");

/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoize = __webpack_require__(/*! ./memoize */ \"./node_modules/lodash/memoize.js\");\n\n/** Used as the maximum memoize cache size. */\nvar MAX_MEMOIZE_SIZE = 500;\n\n/**\n * A specialized version of `_.memoize` which clears the memoized function's\n * cache when it exceeds `MAX_MEMOIZE_SIZE`.\n *\n * @private\n * @param {Function} func The function to have its output memoized.\n * @returns {Function} Returns the new memoized function.\n */\nfunction memoizeCapped(func) {\n  var result = memoize(func, function(key) {\n    if (cache.size === MAX_MEMOIZE_SIZE) {\n      cache.clear();\n    }\n    return key;\n  });\n\n  var cache = result.cache;\n  return result;\n}\n\nmodule.exports = memoizeCapped;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_memoizeCapped.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\n/* Built-in method references that are verified to be native. */\nvar nativeCreate = getNative(Object, 'create');\n\nmodule.exports = nativeCreate;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_nativeCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeKeys = overArg(Object.keys, Object);\n\nmodule.exports = nativeKeys;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_nativeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This function is like\n * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * except that it includes inherited enumerable properties.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction nativeKeysIn(object) {\n  var result = [];\n  if (object != null) {\n    for (var key in Object(object)) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = nativeKeysIn;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_nativeKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Detect free variable `process` from Node.js. */\nvar freeProcess = moduleExports && freeGlobal.process;\n\n/** Used to access faster Node.js helpers. */\nvar nodeUtil = (function() {\n  try {\n    // Use `util.types` for Node.js 10+.\n    var types = freeModule && freeModule.require && freeModule.require('util').types;\n\n    if (types) {\n      return types;\n    }\n\n    // Legacy `process.binding('util')` for Node.js < 10.\n    return freeProcess && freeProcess.binding && freeProcess.binding('util');\n  } catch (e) {}\n}());\n\nmodule.exports = nodeUtil;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_nodeUtil.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a unary function that invokes `func` with its argument transformed.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {Function} transform The argument transform.\n * @returns {Function} Returns the new function.\n */\nfunction overArg(func, transform) {\n  return function(arg) {\n    return func(transform(arg));\n  };\n}\n\nmodule.exports = overArg;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_overArg.js?");

/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var apply = __webpack_require__(/*! ./_apply */ \"./node_modules/lodash/_apply.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max;\n\n/**\n * A specialized version of `baseRest` which transforms the rest array.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @param {Function} transform The rest array transform.\n * @returns {Function} Returns the new function.\n */\nfunction overRest(func, start, transform) {\n  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);\n  return function() {\n    var args = arguments,\n        index = -1,\n        length = nativeMax(args.length - start, 0),\n        array = Array(length);\n\n    while (++index < length) {\n      array[index] = args[start + index];\n    }\n    index = -1;\n    var otherArgs = Array(start + 1);\n    while (++index < start) {\n      otherArgs[index] = args[index];\n    }\n    otherArgs[start] = transform(array);\n    return apply(func, this, otherArgs);\n  };\n}\n\nmodule.exports = overRest;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_overRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_parent.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_parent.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\"),\n    baseSlice = __webpack_require__(/*! ./_baseSlice */ \"./node_modules/lodash/_baseSlice.js\");\n\n/**\n * Gets the parent value at `path` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array} path The path to get the parent value of.\n * @returns {*} Returns the parent value.\n */\nfunction parent(object, path) {\n  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));\n}\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_parent.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/_safeGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_safeGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key`, unless `key` is \"__proto__\".\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction safeGet(object, key) {\n  if (key == '__proto__') {\n    return;\n  }\n\n  return object[key];\n}\n\nmodule.exports = safeGet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_safeGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_setCacheAdd.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheAdd.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Adds `value` to the array cache.\n *\n * @private\n * @name add\n * @memberOf SetCache\n * @alias push\n * @param {*} value The value to cache.\n * @returns {Object} Returns the cache instance.\n */\nfunction setCacheAdd(value) {\n  this.__data__.set(value, HASH_UNDEFINED);\n  return this;\n}\n\nmodule.exports = setCacheAdd;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_setCacheAdd.js?");

/***/ }),

/***/ "./node_modules/lodash/_setCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is in the array cache.\n *\n * @private\n * @name has\n * @memberOf SetCache\n * @param {*} value The value to search for.\n * @returns {number} Returns `true` if `value` is found, else `false`.\n */\nfunction setCacheHas(value) {\n  return this.__data__.has(value);\n}\n\nmodule.exports = setCacheHas;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_setCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Converts `set` to an array of its values.\n *\n * @private\n * @param {Object} set The set to convert.\n * @returns {Array} Returns the values.\n */\nfunction setToArray(set) {\n  var index = -1,\n      result = Array(set.size);\n\n  set.forEach(function(value) {\n    result[++index] = value;\n  });\n  return result;\n}\n\nmodule.exports = setToArray;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_setToArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ \"./node_modules/lodash/_baseSetToString.js\"),\n    shortOut = __webpack_require__(/*! ./_shortOut */ \"./node_modules/lodash/_shortOut.js\");\n\n/**\n * Sets the `toString` method of `func` to return `string`.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar setToString = shortOut(baseSetToString);\n\nmodule.exports = setToString;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_setToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to detect hot functions by number of calls within a span of milliseconds. */\nvar HOT_COUNT = 800,\n    HOT_SPAN = 16;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeNow = Date.now;\n\n/**\n * Creates a function that'll short out and invoke `identity` instead\n * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`\n * milliseconds.\n *\n * @private\n * @param {Function} func The function to restrict.\n * @returns {Function} Returns the new shortable function.\n */\nfunction shortOut(func) {\n  var count = 0,\n      lastCalled = 0;\n\n  return function() {\n    var stamp = nativeNow(),\n        remaining = HOT_SPAN - (stamp - lastCalled);\n\n    lastCalled = stamp;\n    if (remaining > 0) {\n      if (++count >= HOT_COUNT) {\n        return arguments[0];\n      }\n    } else {\n      count = 0;\n    }\n    return func.apply(undefined, arguments);\n  };\n}\n\nmodule.exports = shortOut;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_shortOut.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\");\n\n/**\n * Removes all key-value entries from the stack.\n *\n * @private\n * @name clear\n * @memberOf Stack\n */\nfunction stackClear() {\n  this.__data__ = new ListCache;\n  this.size = 0;\n}\n\nmodule.exports = stackClear;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_stackClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the stack.\n *\n * @private\n * @name delete\n * @memberOf Stack\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction stackDelete(key) {\n  var data = this.__data__,\n      result = data['delete'](key);\n\n  this.size = data.size;\n  return result;\n}\n\nmodule.exports = stackDelete;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_stackDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the stack value for `key`.\n *\n * @private\n * @name get\n * @memberOf Stack\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction stackGet(key) {\n  return this.__data__.get(key);\n}\n\nmodule.exports = stackGet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_stackGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if a stack value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Stack\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction stackHas(key) {\n  return this.__data__.has(key);\n}\n\nmodule.exports = stackHas;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_stackHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Used as the size to enable large array optimizations. */\nvar LARGE_ARRAY_SIZE = 200;\n\n/**\n * Sets the stack `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Stack\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the stack cache instance.\n */\nfunction stackSet(key, value) {\n  var data = this.__data__;\n  if (data instanceof ListCache) {\n    var pairs = data.__data__;\n    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {\n      pairs.push([key, value]);\n      this.size = ++data.size;\n      return this;\n    }\n    data = this.__data__ = new MapCache(pairs);\n  }\n  data.set(key, value);\n  this.size = data.size;\n  return this;\n}\n\nmodule.exports = stackSet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_stackSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_strictIndexOf.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_strictIndexOf.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.indexOf` which performs strict equality\n * comparisons of values, i.e. `===`.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} value The value to search for.\n * @param {number} fromIndex The index to search from.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction strictIndexOf(array, value, fromIndex) {\n  var index = fromIndex - 1,\n      length = array.length;\n\n  while (++index < length) {\n    if (array[index] === value) {\n      return index;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = strictIndexOf;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_strictIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ \"./node_modules/lodash/_memoizeCapped.js\");\n\n/** Used to match property names within property paths. */\nvar rePropName = /[^.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))/g;\n\n/** Used to match backslashes in property paths. */\nvar reEscapeChar = /\\\\(\\\\)?/g;\n\n/**\n * Converts `string` to a property path array.\n *\n * @private\n * @param {string} string The string to convert.\n * @returns {Array} Returns the property path array.\n */\nvar stringToPath = memoizeCapped(function(string) {\n  var result = [];\n  if (string.charCodeAt(0) === 46 /* . */) {\n    result.push('');\n  }\n  string.replace(rePropName, function(match, number, quote, subString) {\n    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));\n  });\n  return result;\n});\n\nmodule.exports = stringToPath;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_stringToPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/**\n * Converts `value` to a string key if it's not a string or symbol.\n *\n * @private\n * @param {*} value The value to inspect.\n * @returns {string|symbol} Returns the key.\n */\nfunction toKey(value) {\n  if (typeof value == 'string' || isSymbol(value)) {\n    return value;\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = toKey;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_toKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar funcProto = Function.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to convert.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\nmodule.exports = toSource;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/_toSource.js?");

/***/ }),

/***/ "./node_modules/lodash/clone.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/clone.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseClone = __webpack_require__(/*! ./_baseClone */ \"./node_modules/lodash/_baseClone.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_SYMBOLS_FLAG = 4;\n\n/**\n * Creates a shallow clone of `value`.\n *\n * **Note:** This method is loosely based on the\n * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)\n * and supports cloning arrays, array buffers, booleans, date objects, maps,\n * numbers, `Object` objects, regexes, sets, strings, symbols, and typed\n * arrays. The own enumerable properties of `arguments` objects are cloned\n * as plain objects. An empty object is returned for uncloneable values such\n * as error objects, functions, DOM nodes, and WeakMaps.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to clone.\n * @returns {*} Returns the cloned value.\n * @see _.cloneDeep\n * @example\n *\n * var objects = [{ 'a': 1 }, { 'b': 2 }];\n *\n * var shallow = _.clone(objects);\n * console.log(shallow[0] === objects[0]);\n * // => true\n */\nfunction clone(value) {\n  return baseClone(value, CLONE_SYMBOLS_FLAG);\n}\n\nmodule.exports = clone;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/clone.js?");

/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a function that returns `value`.\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Util\n * @param {*} value The value to return from the new function.\n * @returns {Function} Returns the new constant function.\n * @example\n *\n * var objects = _.times(2, _.constant({ 'a': 1 }));\n *\n * console.log(objects);\n * // => [{ 'a': 1 }, { 'a': 1 }]\n *\n * console.log(objects[0] === objects[1]);\n * // => true\n */\nfunction constant(value) {\n  return function() {\n    return value;\n  };\n}\n\nmodule.exports = constant;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/constant.js?");

/***/ }),

/***/ "./node_modules/lodash/defaults.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/defaults.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseRest = __webpack_require__(/*! ./_baseRest */ \"./node_modules/lodash/_baseRest.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\"),\n    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ \"./node_modules/lodash/_isIterateeCall.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Assigns own and inherited enumerable string keyed properties of source\n * objects to the destination object for all destination properties that\n * resolve to `undefined`. Source objects are applied from left to right.\n * Once a property is set, additional values of the same property are ignored.\n *\n * **Note:** This method mutates `object`.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The destination object.\n * @param {...Object} [sources] The source objects.\n * @returns {Object} Returns `object`.\n * @see _.defaultsDeep\n * @example\n *\n * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });\n * // => { 'a': 1, 'b': 2 }\n */\nvar defaults = baseRest(function(object, sources) {\n  object = Object(object);\n\n  var index = -1;\n  var length = sources.length;\n  var guard = length > 2 ? sources[2] : undefined;\n\n  if (guard && isIterateeCall(sources[0], sources[1], guard)) {\n    length = 1;\n  }\n\n  while (++index < length) {\n    var source = sources[index];\n    var props = keysIn(source);\n    var propsIndex = -1;\n    var propsLength = props.length;\n\n    while (++propsIndex < propsLength) {\n      var key = props[propsIndex];\n      var value = object[key];\n\n      if (value === undefined ||\n          (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {\n        object[key] = source[key];\n      }\n    }\n  }\n\n  return object;\n});\n\nmodule.exports = defaults;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/defaults.js?");

/***/ }),

/***/ "./node_modules/lodash/defaultsDeep.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/defaultsDeep.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var apply = __webpack_require__(/*! ./_apply */ \"./node_modules/lodash/_apply.js\"),\n    baseRest = __webpack_require__(/*! ./_baseRest */ \"./node_modules/lodash/_baseRest.js\"),\n    customDefaultsMerge = __webpack_require__(/*! ./_customDefaultsMerge */ \"./node_modules/lodash/_customDefaultsMerge.js\"),\n    mergeWith = __webpack_require__(/*! ./mergeWith */ \"./node_modules/lodash/mergeWith.js\");\n\n/**\n * This method is like `_.defaults` except that it recursively assigns\n * default properties.\n *\n * **Note:** This method mutates `object`.\n *\n * @static\n * @memberOf _\n * @since 3.10.0\n * @category Object\n * @param {Object} object The destination object.\n * @param {...Object} [sources] The source objects.\n * @returns {Object} Returns `object`.\n * @see _.defaults\n * @example\n *\n * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });\n * // => { 'a': { 'b': 2, 'c': 3 } }\n */\nvar defaultsDeep = baseRest(function(args) {\n  args.push(undefined, customDefaultsMerge);\n  return apply(mergeWith, undefined, args);\n});\n\nmodule.exports = defaultsDeep;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/defaultsDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/eq.js?");

/***/ }),

/***/ "./node_modules/lodash/flatten.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/flatten.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ \"./node_modules/lodash/_baseFlatten.js\");\n\n/**\n * Flattens `array` a single level deep.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {Array} array The array to flatten.\n * @returns {Array} Returns the new flattened array.\n * @example\n *\n * _.flatten([1, [2, [3, [4]], 5]]);\n * // => [1, 2, [3, [4]], 5]\n */\nfunction flatten(array) {\n  var length = array == null ? 0 : array.length;\n  return length ? baseFlatten(array, 1) : [];\n}\n\nmodule.exports = flatten;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/flatten.js?");

/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\");\n\n/**\n * Gets the value at `path` of `object`. If the resolved value is\n * `undefined`, the `defaultValue` is returned in its place.\n *\n * @static\n * @memberOf _\n * @since 3.7.0\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @param {*} [defaultValue] The value returned for `undefined` resolved values.\n * @returns {*} Returns the resolved value.\n * @example\n *\n * var object = { 'a': [{ 'b': { 'c': 3 } }] };\n *\n * _.get(object, 'a[0].b.c');\n * // => 3\n *\n * _.get(object, ['a', '0', 'b', 'c']);\n * // => 3\n *\n * _.get(object, 'a.b.c', 'default');\n * // => 'default'\n */\nfunction get(object, path, defaultValue) {\n  var result = object == null ? undefined : baseGet(object, path);\n  return result === undefined ? defaultValue : result;\n}\n\nmodule.exports = get;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/get.js?");

/***/ }),

/***/ "./node_modules/lodash/hasIn.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/hasIn.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseHasIn = __webpack_require__(/*! ./_baseHasIn */ \"./node_modules/lodash/_baseHasIn.js\"),\n    hasPath = __webpack_require__(/*! ./_hasPath */ \"./node_modules/lodash/_hasPath.js\");\n\n/**\n * Checks if `path` is a direct or inherited property of `object`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path to check.\n * @returns {boolean} Returns `true` if `path` exists, else `false`.\n * @example\n *\n * var object = _.create({ 'a': _.create({ 'b': 2 }) });\n *\n * _.hasIn(object, 'a');\n * // => true\n *\n * _.hasIn(object, 'a.b');\n * // => true\n *\n * _.hasIn(object, ['a', 'b']);\n * // => true\n *\n * _.hasIn(object, 'b');\n * // => false\n */\nfunction hasIn(object, path) {\n  return object != null && hasPath(object, path, baseHasIn);\n}\n\nmodule.exports = hasIn;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/hasIn.js?");

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/identity.js?");

/***/ }),

/***/ "./node_modules/lodash/intersection.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/intersection.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    baseIntersection = __webpack_require__(/*! ./_baseIntersection */ \"./node_modules/lodash/_baseIntersection.js\"),\n    baseRest = __webpack_require__(/*! ./_baseRest */ \"./node_modules/lodash/_baseRest.js\"),\n    castArrayLikeObject = __webpack_require__(/*! ./_castArrayLikeObject */ \"./node_modules/lodash/_castArrayLikeObject.js\");\n\n/**\n * Creates an array of unique values that are included in all given arrays\n * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons. The order and references of result values are\n * determined by the first array.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {...Array} [arrays] The arrays to inspect.\n * @returns {Array} Returns the new array of intersecting values.\n * @example\n *\n * _.intersection([2, 1], [2, 3]);\n * // => [2]\n */\nvar intersection = baseRest(function(arrays) {\n  var mapped = arrayMap(arrays, castArrayLikeObject);\n  return (mapped.length && mapped[0] === arrays[0])\n    ? baseIntersection(mapped)\n    : [];\n});\n\nmodule.exports = intersection;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/intersection.js?");

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ \"./node_modules/lodash/_baseIsArguments.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/**\n * Checks if `value` is likely an `arguments` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n *  else `false`.\n * @example\n *\n * _.isArguments(function() { return arguments; }());\n * // => true\n *\n * _.isArguments([1, 2, 3]);\n * // => false\n */\nvar isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {\n  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&\n    !propertyIsEnumerable.call(value, 'callee');\n};\n\nmodule.exports = isArguments;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\");\n\n/**\n * Checks if `value` is array-like. A value is considered array-like if it's\n * not a function and has a `value.length` that's an integer greater than or\n * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n * @example\n *\n * _.isArrayLike([1, 2, 3]);\n * // => true\n *\n * _.isArrayLike(document.body.children);\n * // => true\n *\n * _.isArrayLike('abc');\n * // => true\n *\n * _.isArrayLike(_.noop);\n * // => false\n */\nfunction isArrayLike(value) {\n  return value != null && isLength(value.length) && !isFunction(value);\n}\n\nmodule.exports = isArrayLike;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isArrayLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/**\n * This method is like `_.isArrayLike` except that it also checks if `value`\n * is an object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array-like object,\n *  else `false`.\n * @example\n *\n * _.isArrayLikeObject([1, 2, 3]);\n * // => true\n *\n * _.isArrayLikeObject(document.body.children);\n * // => true\n *\n * _.isArrayLikeObject('abc');\n * // => false\n *\n * _.isArrayLikeObject(_.noop);\n * // => false\n */\nfunction isArrayLikeObject(value) {\n  return isObjectLike(value) && isArrayLike(value);\n}\n\nmodule.exports = isArrayLikeObject;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isArrayLikeObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\"),\n    stubFalse = __webpack_require__(/*! ./stubFalse */ \"./node_modules/lodash/stubFalse.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;\n\n/**\n * Checks if `value` is a buffer.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.\n * @example\n *\n * _.isBuffer(new Buffer(2));\n * // => true\n *\n * _.isBuffer(new Uint8Array(2));\n * // => false\n */\nvar isBuffer = nativeIsBuffer || stubFalse;\n\nmodule.exports = isBuffer;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isFunction.js?");

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/**\n * Checks if `value` is a valid array-like length.\n *\n * **Note:** This method is loosely based on\n * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n * @example\n *\n * _.isLength(3);\n * // => true\n *\n * _.isLength(Number.MIN_VALUE);\n * // => false\n *\n * _.isLength(Infinity);\n * // => false\n *\n * _.isLength('3');\n * // => false\n */\nfunction isLength(value) {\n  return typeof value == 'number' &&\n    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;\n}\n\nmodule.exports = isLength;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isLength.js?");

/***/ }),

/***/ "./node_modules/lodash/isMap.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isMap.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ \"./node_modules/lodash/_baseIsMap.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsMap = nodeUtil && nodeUtil.isMap;\n\n/**\n * Checks if `value` is classified as a `Map` object.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a map, else `false`.\n * @example\n *\n * _.isMap(new Map);\n * // => true\n *\n * _.isMap(new WeakMap);\n * // => false\n */\nvar isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;\n\nmodule.exports = isMap;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isMap.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar objectTag = '[object Object]';\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to infer the `Object` constructor. */\nvar objectCtorString = funcToString.call(Object);\n\n/**\n * Checks if `value` is a plain object, that is, an object created by the\n * `Object` constructor or one with a `[[Prototype]]` of `null`.\n *\n * @static\n * @memberOf _\n * @since 0.8.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n * }\n *\n * _.isPlainObject(new Foo);\n * // => false\n *\n * _.isPlainObject([1, 2, 3]);\n * // => false\n *\n * _.isPlainObject({ 'x': 0, 'y': 0 });\n * // => true\n *\n * _.isPlainObject(Object.create(null));\n * // => true\n */\nfunction isPlainObject(value) {\n  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {\n    return false;\n  }\n  var proto = getPrototype(value);\n  if (proto === null) {\n    return true;\n  }\n  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;\n  return typeof Ctor == 'function' && Ctor instanceof Ctor &&\n    funcToString.call(Ctor) == objectCtorString;\n}\n\nmodule.exports = isPlainObject;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isPlainObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isSet.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isSet.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ \"./node_modules/lodash/_baseIsSet.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsSet = nodeUtil && nodeUtil.isSet;\n\n/**\n * Checks if `value` is classified as a `Set` object.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a set, else `false`.\n * @example\n *\n * _.isSet(new Set);\n * // => true\n *\n * _.isSet(new WeakSet);\n * // => false\n */\nvar isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;\n\nmodule.exports = isSet;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isSet.js?");

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ \"./node_modules/lodash/_baseIsTypedArray.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;\n\n/**\n * Checks if `value` is classified as a typed array.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n * @example\n *\n * _.isTypedArray(new Uint8Array);\n * // => true\n *\n * _.isTypedArray([]);\n * // => false\n */\nvar isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;\n\nmodule.exports = isTypedArray;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/isTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ \"./node_modules/lodash/_arrayLikeKeys.js\"),\n    baseKeys = __webpack_require__(/*! ./_baseKeys */ \"./node_modules/lodash/_baseKeys.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates an array of the own enumerable property names of `object`.\n *\n * **Note:** Non-object values are coerced to objects. See the\n * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * for more details.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.keys(new Foo);\n * // => ['a', 'b'] (iteration order is not guaranteed)\n *\n * _.keys('hi');\n * // => ['0', '1']\n */\nfunction keys(object) {\n  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);\n}\n\nmodule.exports = keys;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/keys.js?");

/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ \"./node_modules/lodash/_arrayLikeKeys.js\"),\n    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ \"./node_modules/lodash/_baseKeysIn.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates an array of the own and inherited enumerable property names of `object`.\n *\n * **Note:** Non-object values are coerced to objects.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Object\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.keysIn(new Foo);\n * // => ['a', 'b', 'c'] (iteration order is not guaranteed)\n */\nfunction keysIn(object) {\n  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);\n}\n\nmodule.exports = keysIn;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/keysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/last.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/last.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the last element of `array`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {Array} array The array to query.\n * @returns {*} Returns the last element of `array`.\n * @example\n *\n * _.last([1, 2, 3]);\n * // => 3\n */\nfunction last(array) {\n  var length = array == null ? 0 : array.length;\n  return length ? array[length - 1] : undefined;\n}\n\nmodule.exports = last;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/last.js?");

/***/ }),

/***/ "./node_modules/lodash/mapKeys.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/mapKeys.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    baseForOwn = __webpack_require__(/*! ./_baseForOwn */ \"./node_modules/lodash/_baseForOwn.js\"),\n    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ \"./node_modules/lodash/_baseIteratee.js\");\n\n/**\n * The opposite of `_.mapValues`; this method creates an object with the\n * same values as `object` and keys generated by running each own enumerable\n * string keyed property of `object` thru `iteratee`. The iteratee is invoked\n * with three arguments: (value, key, object).\n *\n * @static\n * @memberOf _\n * @since 3.8.0\n * @category Object\n * @param {Object} object The object to iterate over.\n * @param {Function} [iteratee=_.identity] The function invoked per iteration.\n * @returns {Object} Returns the new mapped object.\n * @see _.mapValues\n * @example\n *\n * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {\n *   return key + value;\n * });\n * // => { 'a1': 1, 'b2': 2 }\n */\nfunction mapKeys(object, iteratee) {\n  var result = {};\n  iteratee = baseIteratee(iteratee, 3);\n\n  baseForOwn(object, function(value, key, object) {\n    baseAssignValue(result, iteratee(value, key, object), value);\n  });\n  return result;\n}\n\nmodule.exports = mapKeys;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/mapKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/**\n * Creates a function that memoizes the result of `func`. If `resolver` is\n * provided, it determines the cache key for storing the result based on the\n * arguments provided to the memoized function. By default, the first argument\n * provided to the memoized function is used as the map cache key. The `func`\n * is invoked with the `this` binding of the memoized function.\n *\n * **Note:** The cache is exposed as the `cache` property on the memoized\n * function. Its creation may be customized by replacing the `_.memoize.Cache`\n * constructor with one whose instances implement the\n * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)\n * method interface of `clear`, `delete`, `get`, `has`, and `set`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Function\n * @param {Function} func The function to have its output memoized.\n * @param {Function} [resolver] The function to resolve the cache key.\n * @returns {Function} Returns the new memoized function.\n * @example\n *\n * var object = { 'a': 1, 'b': 2 };\n * var other = { 'c': 3, 'd': 4 };\n *\n * var values = _.memoize(_.values);\n * values(object);\n * // => [1, 2]\n *\n * values(other);\n * // => [3, 4]\n *\n * object.a = 2;\n * values(object);\n * // => [1, 2]\n *\n * // Modify the result cache.\n * values.cache.set(object, ['a', 'b']);\n * values(object);\n * // => ['a', 'b']\n *\n * // Replace `_.memoize.Cache`.\n * _.memoize.Cache = WeakMap;\n */\nfunction memoize(func, resolver) {\n  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  var memoized = function() {\n    var args = arguments,\n        key = resolver ? resolver.apply(this, args) : args[0],\n        cache = memoized.cache;\n\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    var result = func.apply(this, args);\n    memoized.cache = cache.set(key, result) || cache;\n    return result;\n  };\n  memoized.cache = new (memoize.Cache || MapCache);\n  return memoized;\n}\n\n// Expose `MapCache`.\nmemoize.Cache = MapCache;\n\nmodule.exports = memoize;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/memoize.js?");

/***/ }),

/***/ "./node_modules/lodash/mergeWith.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/mergeWith.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseMerge = __webpack_require__(/*! ./_baseMerge */ \"./node_modules/lodash/_baseMerge.js\"),\n    createAssigner = __webpack_require__(/*! ./_createAssigner */ \"./node_modules/lodash/_createAssigner.js\");\n\n/**\n * This method is like `_.merge` except that it accepts `customizer` which\n * is invoked to produce the merged values of the destination and source\n * properties. If `customizer` returns `undefined`, merging is handled by the\n * method instead. The `customizer` is invoked with six arguments:\n * (objValue, srcValue, key, object, source, stack).\n *\n * **Note:** This method mutates `object`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Object\n * @param {Object} object The destination object.\n * @param {...Object} sources The source objects.\n * @param {Function} customizer The function to customize assigned values.\n * @returns {Object} Returns `object`.\n * @example\n *\n * function customizer(objValue, srcValue) {\n *   if (_.isArray(objValue)) {\n *     return objValue.concat(srcValue);\n *   }\n * }\n *\n * var object = { 'a': [1], 'b': [2] };\n * var other = { 'a': [3], 'b': [4] };\n *\n * _.mergeWith(object, other, customizer);\n * // => { 'a': [1, 3], 'b': [2, 4] }\n */\nvar mergeWith = createAssigner(function(object, source, srcIndex, customizer) {\n  baseMerge(object, source, srcIndex, customizer);\n});\n\nmodule.exports = mergeWith;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/mergeWith.js?");

/***/ }),

/***/ "./node_modules/lodash/noop.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/noop.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `undefined`.\n *\n * @static\n * @memberOf _\n * @since 2.3.0\n * @category Util\n * @example\n *\n * _.times(2, _.noop);\n * // => [undefined, undefined]\n */\nfunction noop() {\n  // No operation performed.\n}\n\nmodule.exports = noop;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/noop.js?");

/***/ }),

/***/ "./node_modules/lodash/omit.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/omit.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    baseClone = __webpack_require__(/*! ./_baseClone */ \"./node_modules/lodash/_baseClone.js\"),\n    baseUnset = __webpack_require__(/*! ./_baseUnset */ \"./node_modules/lodash/_baseUnset.js\"),\n    castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    customOmitClone = __webpack_require__(/*! ./_customOmitClone */ \"./node_modules/lodash/_customOmitClone.js\"),\n    flatRest = __webpack_require__(/*! ./_flatRest */ \"./node_modules/lodash/_flatRest.js\"),\n    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ \"./node_modules/lodash/_getAllKeysIn.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_DEEP_FLAG = 1,\n    CLONE_FLAT_FLAG = 2,\n    CLONE_SYMBOLS_FLAG = 4;\n\n/**\n * The opposite of `_.pick`; this method creates an object composed of the\n * own and inherited enumerable property paths of `object` that are not omitted.\n *\n * **Note:** This method is considerably slower than `_.pick`.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The source object.\n * @param {...(string|string[])} [paths] The property paths to omit.\n * @returns {Object} Returns the new object.\n * @example\n *\n * var object = { 'a': 1, 'b': '2', 'c': 3 };\n *\n * _.omit(object, ['a', 'c']);\n * // => { 'b': '2' }\n */\nvar omit = flatRest(function(object, paths) {\n  var result = {};\n  if (object == null) {\n    return result;\n  }\n  var isDeep = false;\n  paths = arrayMap(paths, function(path) {\n    path = castPath(path, object);\n    isDeep || (isDeep = path.length > 1);\n    return path;\n  });\n  copyObject(object, getAllKeysIn(object), result);\n  if (isDeep) {\n    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);\n  }\n  var length = paths.length;\n  while (length--) {\n    baseUnset(result, paths[length]);\n  }\n  return result;\n});\n\nmodule.exports = omit;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/omit.js?");

/***/ }),

/***/ "./node_modules/lodash/pick.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/pick.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var basePick = __webpack_require__(/*! ./_basePick */ \"./node_modules/lodash/_basePick.js\"),\n    flatRest = __webpack_require__(/*! ./_flatRest */ \"./node_modules/lodash/_flatRest.js\");\n\n/**\n * Creates an object composed of the picked `object` properties.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The source object.\n * @param {...(string|string[])} [paths] The property paths to pick.\n * @returns {Object} Returns the new object.\n * @example\n *\n * var object = { 'a': 1, 'b': '2', 'c': 3 };\n *\n * _.pick(object, ['a', 'c']);\n * // => { 'a': 1, 'c': 3 }\n */\nvar pick = flatRest(function(object, paths) {\n  return object == null ? {} : basePick(object, paths);\n});\n\nmodule.exports = pick;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/pick.js?");

/***/ }),

/***/ "./node_modules/lodash/property.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/property.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseProperty = __webpack_require__(/*! ./_baseProperty */ \"./node_modules/lodash/_baseProperty.js\"),\n    basePropertyDeep = __webpack_require__(/*! ./_basePropertyDeep */ \"./node_modules/lodash/_basePropertyDeep.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * Creates a function that returns the value at `path` of a given object.\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Util\n * @param {Array|string} path The path of the property to get.\n * @returns {Function} Returns the new accessor function.\n * @example\n *\n * var objects = [\n *   { 'a': { 'b': 2 } },\n *   { 'a': { 'b': 1 } }\n * ];\n *\n * _.map(objects, _.property('a.b'));\n * // => [2, 1]\n *\n * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');\n * // => [1, 2]\n */\nfunction property(path) {\n  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);\n}\n\nmodule.exports = property;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/property.js?");

/***/ }),

/***/ "./node_modules/lodash/set.js":
/*!************************************!*\
  !*** ./node_modules/lodash/set.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseSet = __webpack_require__(/*! ./_baseSet */ \"./node_modules/lodash/_baseSet.js\");\n\n/**\n * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,\n * it's created. Arrays are created for missing index properties while objects\n * are created for all other missing properties. Use `_.setWith` to customize\n * `path` creation.\n *\n * **Note:** This method mutates `object`.\n *\n * @static\n * @memberOf _\n * @since 3.7.0\n * @category Object\n * @param {Object} object The object to modify.\n * @param {Array|string} path The path of the property to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns `object`.\n * @example\n *\n * var object = { 'a': [{ 'b': { 'c': 3 } }] };\n *\n * _.set(object, 'a[0].b.c', 4);\n * console.log(object.a[0].b.c);\n * // => 4\n *\n * _.set(object, ['x', '0', 'y', 'z'], 5);\n * console.log(object.x[0].y.z);\n * // => 5\n */\nfunction set(object, path, value) {\n  return object == null ? object : baseSet(object, path, value);\n}\n\nmodule.exports = set;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/set.js?");

/***/ }),

/***/ "./node_modules/lodash/stubArray.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns a new empty array.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {Array} Returns the new empty array.\n * @example\n *\n * var arrays = _.times(2, _.stubArray);\n *\n * console.log(arrays);\n * // => [[], []]\n *\n * console.log(arrays[0] === arrays[1]);\n * // => false\n */\nfunction stubArray() {\n  return [];\n}\n\nmodule.exports = stubArray;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/stubArray.js?");

/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/stubFalse.js?");

/***/ }),

/***/ "./node_modules/lodash/toPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/toPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * Converts `value` to a plain object flattening inherited enumerable string\n * keyed properties of `value` to own properties of the plain object.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {Object} Returns the converted plain object.\n * @example\n *\n * function Foo() {\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.assign({ 'a': 1 }, new Foo);\n * // => { 'a': 1, 'b': 2 }\n *\n * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));\n * // => { 'a': 1, 'b': 2, 'c': 3 }\n */\nfunction toPlainObject(value) {\n  return copyObject(value, keysIn(value));\n}\n\nmodule.exports = toPlainObject;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/toPlainObject.js?");

/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseToString = __webpack_require__(/*! ./_baseToString */ \"./node_modules/lodash/_baseToString.js\");\n\n/**\n * Converts `value` to a string. An empty string is returned for `null`\n * and `undefined` values. The sign of `-0` is preserved.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n * @example\n *\n * _.toString(null);\n * // => ''\n *\n * _.toString(-0);\n * // => '-0'\n *\n * _.toString([1, 2, 3]);\n * // => '1,2,3'\n */\nfunction toString(value) {\n  return value == null ? '' : baseToString(value);\n}\n\nmodule.exports = toString;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/toString.js?");

/***/ }),

/***/ "./node_modules/lodash/uniq.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/uniq.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseUniq = __webpack_require__(/*! ./_baseUniq */ \"./node_modules/lodash/_baseUniq.js\");\n\n/**\n * Creates a duplicate-free version of an array, using\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons, in which only the first occurrence of each element\n * is kept. The order of result values is determined by the order they occur\n * in the array.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {Array} array The array to inspect.\n * @returns {Array} Returns the new duplicate free array.\n * @example\n *\n * _.uniq([2, 1, 2]);\n * // => [2, 1]\n */\nfunction uniq(array) {\n  return (array && array.length) ? baseUniq(array) : [];\n}\n\nmodule.exports = uniq;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/lodash/uniq.js?");

/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar w = d * 7;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */\n\nmodule.exports = function(val, options) {\n  options = options || {};\n  var type = typeof val;\n  if (type === 'string' && val.length > 0) {\n    return parse(val);\n  } else if (type === 'number' && isNaN(val) === false) {\n    return options.long ? fmtLong(val) : fmtShort(val);\n  }\n  throw new Error(\n    'val is not a non-empty string or a valid number. val=' +\n      JSON.stringify(val)\n  );\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */\n\nfunction parse(str) {\n  str = String(str);\n  if (str.length > 100) {\n    return;\n  }\n  var match = /^((?:\\d+)?\\-?\\d?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(\n    str\n  );\n  if (!match) {\n    return;\n  }\n  var n = parseFloat(match[1]);\n  var type = (match[2] || 'ms').toLowerCase();\n  switch (type) {\n    case 'years':\n    case 'year':\n    case 'yrs':\n    case 'yr':\n    case 'y':\n      return n * y;\n    case 'weeks':\n    case 'week':\n    case 'w':\n      return n * w;\n    case 'days':\n    case 'day':\n    case 'd':\n      return n * d;\n    case 'hours':\n    case 'hour':\n    case 'hrs':\n    case 'hr':\n    case 'h':\n      return n * h;\n    case 'minutes':\n    case 'minute':\n    case 'mins':\n    case 'min':\n    case 'm':\n      return n * m;\n    case 'seconds':\n    case 'second':\n    case 'secs':\n    case 'sec':\n    case 's':\n      return n * s;\n    case 'milliseconds':\n    case 'millisecond':\n    case 'msecs':\n    case 'msec':\n    case 'ms':\n      return n;\n    default:\n      return undefined;\n  }\n}\n\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtShort(ms) {\n  var msAbs = Math.abs(ms);\n  if (msAbs >= d) {\n    return Math.round(ms / d) + 'd';\n  }\n  if (msAbs >= h) {\n    return Math.round(ms / h) + 'h';\n  }\n  if (msAbs >= m) {\n    return Math.round(ms / m) + 'm';\n  }\n  if (msAbs >= s) {\n    return Math.round(ms / s) + 's';\n  }\n  return ms + 'ms';\n}\n\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtLong(ms) {\n  var msAbs = Math.abs(ms);\n  if (msAbs >= d) {\n    return plural(ms, msAbs, d, 'day');\n  }\n  if (msAbs >= h) {\n    return plural(ms, msAbs, h, 'hour');\n  }\n  if (msAbs >= m) {\n    return plural(ms, msAbs, m, 'minute');\n  }\n  if (msAbs >= s) {\n    return plural(ms, msAbs, s, 'second');\n  }\n  return ms + ' ms';\n}\n\n/**\n * Pluralization helper.\n */\n\nfunction plural(ms, msAbs, n, name) {\n  var isPlural = msAbs >= n * 1.5;\n  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');\n}\n\n\n//# sourceURL=webpack://Octokit/./node_modules/ms/index.js?");

/***/ }),

/***/ "./node_modules/node-fetch/browser.js":
/*!********************************************!*\
  !*** ./node_modules/node-fetch/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = exports = self.fetch;\n\n// Needed for TypeScript and Webpack.\nexports.default = self.fetch.bind(self);\n\nexports.Headers = self.Headers;\nexports.Request = self.Request;\nexports.Response = self.Response;\n\n\n//# sourceURL=webpack://Octokit/./node_modules/node-fetch/browser.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack://Octokit/./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/universal-user-agent/browser.js":
/*!******************************************************!*\
  !*** ./node_modules/universal-user-agent/browser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = getUserAgentBrowser\n\nfunction getUserAgentBrowser () {\n  /* global navigator */\n  return navigator.userAgent\n}\n\n\n//# sourceURL=webpack://Octokit/./node_modules/universal-user-agent/browser.js?");

/***/ }),

/***/ "./node_modules/url-template/lib/url-template.js":
/*!*******************************************************!*\
  !*** ./node_modules/url-template/lib/url-template.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function (root, factory) {\n    if (true) {\n        module.exports = factory();\n    } else {}\n}(this, function () {\n  /**\n   * @constructor\n   */\n  function UrlTemplate() {\n  }\n\n  /**\n   * @private\n   * @param {string} str\n   * @return {string}\n   */\n  UrlTemplate.prototype.encodeReserved = function (str) {\n    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {\n      if (!/%[0-9A-Fa-f]/.test(part)) {\n        part = encodeURI(part).replace(/%5B/g, '[').replace(/%5D/g, ']');\n      }\n      return part;\n    }).join('');\n  };\n\n  /**\n   * @private\n   * @param {string} str\n   * @return {string}\n   */\n  UrlTemplate.prototype.encodeUnreserved = function (str) {\n    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {\n      return '%' + c.charCodeAt(0).toString(16).toUpperCase();\n    });\n  }\n\n  /**\n   * @private\n   * @param {string} operator\n   * @param {string} value\n   * @param {string} key\n   * @return {string}\n   */\n  UrlTemplate.prototype.encodeValue = function (operator, value, key) {\n    value = (operator === '+' || operator === '#') ? this.encodeReserved(value) : this.encodeUnreserved(value);\n\n    if (key) {\n      return this.encodeUnreserved(key) + '=' + value;\n    } else {\n      return value;\n    }\n  };\n\n  /**\n   * @private\n   * @param {*} value\n   * @return {boolean}\n   */\n  UrlTemplate.prototype.isDefined = function (value) {\n    return value !== undefined && value !== null;\n  };\n\n  /**\n   * @private\n   * @param {string}\n   * @return {boolean}\n   */\n  UrlTemplate.prototype.isKeyOperator = function (operator) {\n    return operator === ';' || operator === '&' || operator === '?';\n  };\n\n  /**\n   * @private\n   * @param {Object} context\n   * @param {string} operator\n   * @param {string} key\n   * @param {string} modifier\n   */\n  UrlTemplate.prototype.getValues = function (context, operator, key, modifier) {\n    var value = context[key],\n        result = [];\n\n    if (this.isDefined(value) && value !== '') {\n      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {\n        value = value.toString();\n\n        if (modifier && modifier !== '*') {\n          value = value.substring(0, parseInt(modifier, 10));\n        }\n\n        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));\n      } else {\n        if (modifier === '*') {\n          if (Array.isArray(value)) {\n            value.filter(this.isDefined).forEach(function (value) {\n              result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));\n            }, this);\n          } else {\n            Object.keys(value).forEach(function (k) {\n              if (this.isDefined(value[k])) {\n                result.push(this.encodeValue(operator, value[k], k));\n              }\n            }, this);\n          }\n        } else {\n          var tmp = [];\n\n          if (Array.isArray(value)) {\n            value.filter(this.isDefined).forEach(function (value) {\n              tmp.push(this.encodeValue(operator, value));\n            }, this);\n          } else {\n            Object.keys(value).forEach(function (k) {\n              if (this.isDefined(value[k])) {\n                tmp.push(this.encodeUnreserved(k));\n                tmp.push(this.encodeValue(operator, value[k].toString()));\n              }\n            }, this);\n          }\n\n          if (this.isKeyOperator(operator)) {\n            result.push(this.encodeUnreserved(key) + '=' + tmp.join(','));\n          } else if (tmp.length !== 0) {\n            result.push(tmp.join(','));\n          }\n        }\n      }\n    } else {\n      if (operator === ';') {\n        if (this.isDefined(value)) {\n          result.push(this.encodeUnreserved(key));\n        }\n      } else if (value === '' && (operator === '&' || operator === '?')) {\n        result.push(this.encodeUnreserved(key) + '=');\n      } else if (value === '') {\n        result.push('');\n      }\n    }\n    return result;\n  };\n\n  /**\n   * @param {string} template\n   * @return {function(Object):string}\n   */\n  UrlTemplate.prototype.parse = function (template) {\n    var that = this;\n    var operators = ['+', '#', '.', '/', ';', '?', '&'];\n\n    return {\n      expand: function (context) {\n        return template.replace(/\\{([^\\{\\}]+)\\}|([^\\{\\}]+)/g, function (_, expression, literal) {\n          if (expression) {\n            var operator = null,\n                values = [];\n\n            if (operators.indexOf(expression.charAt(0)) !== -1) {\n              operator = expression.charAt(0);\n              expression = expression.substr(1);\n            }\n\n            expression.split(/,/g).forEach(function (variable) {\n              var tmp = /([^:\\*]*)(?::(\\d+)|(\\*))?/.exec(variable);\n              values.push.apply(values, that.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));\n            });\n\n            if (operator && operator !== '+') {\n              var separator = ',';\n\n              if (operator === '?') {\n                separator = '&';\n              } else if (operator !== '#') {\n                separator = operator;\n              }\n              return (values.length !== 0 ? operator : '') + values.join(separator);\n            } else {\n              return values.join(',');\n            }\n          } else {\n            return that.encodeReserved(literal);\n          }\n        });\n      }\n    };\n  };\n\n  return new UrlTemplate();\n}));\n\n\n//# sourceURL=webpack://Octokit/./node_modules/url-template/lib/url-template.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack://Octokit/(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\r\n\tif (!module.webpackPolyfill) {\r\n\t\tmodule.deprecate = function() {};\r\n\t\tmodule.paths = [];\r\n\t\t// module.parent = undefined by default\r\n\t\tif (!module.children) module.children = [];\r\n\t\tObject.defineProperty(module, \"loaded\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.l;\r\n\t\t\t}\r\n\t\t});\r\n\t\tObject.defineProperty(module, \"id\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.i;\r\n\t\t\t}\r\n\t\t});\r\n\t\tmodule.webpackPolyfill = 1;\r\n\t}\r\n\treturn module;\r\n};\r\n\n\n//# sourceURL=webpack://Octokit/(webpack)/buildin/module.js?");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, publishConfig, description, keywords, author, contributors, repository, engines, dependencies, devDependencies, browser, types, scripts, license, files, apidoc, nyc, release, standard, bundlesize, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"@octokit/rest\",\"version\":\"0.0.0-semantically-released\",\"publishConfig\":{\"access\":\"public\",\"tag\":\"latest\"},\"description\":\"GitHub REST API client for Node.js\",\"keywords\":[\"octokit\",\"github\",\"rest\",\"api-client\"],\"author\":\"Gregor Martynus (https://github.com/gr2m)\",\"contributors\":[{\"name\":\"Mike de Boer\",\"email\":\"info@mikedeboer.nl\"},{\"name\":\"Fabian Jakobs\",\"email\":\"fabian@c9.io\"},{\"name\":\"Joe Gallo\",\"email\":\"joe@brassafrax.com\"},{\"name\":\"Gregor Martynus\",\"url\":\"https://github.com/gr2m\"}],\"repository\":\"https://github.com/octokit/rest.js\",\"engines\":{\"node\":\">=4\"},\"dependencies\":{\"before-after-hook\":\"^1.1.0\",\"btoa-lite\":\"^1.0.0\",\"debug\":\"^3.1.0\",\"http-proxy-agent\":\"^2.1.0\",\"https-proxy-agent\":\"^2.2.0\",\"lodash\":\"^4.17.4\",\"node-fetch\":\"^2.1.1\",\"universal-user-agent\":\"^2.0.0\",\"url-template\":\"^2.0.8\"},\"devDependencies\":{\"@gimenete/type-writer\":\"^0.1.3\",\"@gr2m/node-fetch\":\"^2.0.0\",\"@octokit/fixtures-server\":\"^2.1.5\",\"@octokit/routes\":\"12.0.0\",\"@types/node\":\"^10.1.2\",\"apidoc\":\"^0.17.6\",\"bundlesize\":\"^0.17.0\",\"chai\":\"^4.1.2\",\"compression-webpack-plugin\":\"^2.0.0\",\"coveralls\":\"^3.0.0\",\"cypress\":\"^3.0.0\",\"dotenv\":\"^6.0.0\",\"gh-pages-with-token\":\"^1.0.0\",\"glob\":\"^7.1.2\",\"jsondiff\":\"0.0.0\",\"mkdirp\":\"^0.5.1\",\"mocha\":\"^5.0.0\",\"mustache\":\"^3.0.0\",\"nock\":\"^10.0.0\",\"npm-run-all\":\"^4.1.2\",\"nyc\":\"^12.0.1\",\"prettier\":\"^1.14.2\",\"proxy\":\"^0.2.4\",\"proxyquire\":\"^2.0.0\",\"semantic-release\":\"^15.0.0\",\"sinon\":\"^6.0.0\",\"sinon-chai\":\"^3.0.0\",\"standard\":\"^12.0.0\",\"standard-markdown\":\"^5.0.1\",\"string-to-arraybuffer\":\"^1.0.0\",\"typescript\":\"^2.9.2\",\"webpack\":\"^4.0.0\",\"webpack-bundle-analyzer\":\"^3.0.0\",\"webpack-cli\":\"^3.0.0\"},\"browser\":{\"./lib/get-request-agent.js\":false,\"./lib/request/get-buffer-response.js\":\"./lib/request/get-buffer-response-browser.js\"},\"types\":\"index.d.ts\",\"scripts\":{\"coverage\":\"nyc report --reporter=html && open coverage/index.html\",\"coverage:upload\":\"nyc report --reporter=text-lcov | coveralls\",\"pretest\":\"standard && standard-markdown *.md\",\"test\":\"nyc mocha test/mocha-node-setup.js \\\"test/**/*-test.js\\\"\",\"test:browser\":\"cypress run --browser chrome\",\"test:examples\":\"node test/examples.js\",\"build\":\"npm-run-all build:*\",\"prebuild:docs\":\"mkdirp doc/\",\"build:docs\":\"node scripts/generate-api-docs\",\"postbuild:docs\":\"apidoc -i doc/ -o doc/\",\"build:flow\":\"node scripts/generate-flow-types\",\"build:ts\":\"node scripts/generate-typescript-types\",\"prebuild:browser\":\"mkdirp dist/\",\"build:browser\":\"npm-run-all build:browser:*\",\"build:browser:development\":\"webpack --mode development --entry . --output-library=Octokit --output=./dist/octokit-rest.js --profile --json > dist/bundle-stats.json\",\"build:browser:production\":\"webpack --mode production --entry . --plugin=compression-webpack-plugin --output-library=Octokit --output-path=./dist --output-filename=octokit-rest.min.js --devtool source-map\",\"generate-bundle-report\":\"webpack-bundle-analyzer dist/bundle-stats.json --mode=static --no-open --report dist/bundle-report.html\",\"generate-routes\":\"node scripts/generate-routes\",\"prevalidate:ts\":\"npm run -s build:ts\",\"validate:ts\":\"tsc --target es6 index.d.ts\",\"postvalidate:ts\":\"tsc --noEmit --target es6 test/typescript-validate.ts\",\"deploy-docs\":\"gh-pages-with-token -d doc\",\"semantic-release\":\"semantic-release\",\"start-fixtures-server\":\"octokit-fixtures-server\"},\"license\":\"MIT\",\"files\":[\"index.js\",\"index.d.ts\",\"index.js.flow\",\"lib\"],\"apidoc\":{\"template\":{\"withCompare\":false}},\"nyc\":{\"ignore\":[\"examples\",\"test\"]},\"release\":{\"publish\":[\"@semantic-release/npm\",{\"path\":\"@semantic-release/github\",\"assets\":[\"dist/*\",\"!dist/*.map.gz\"]}]},\"standard\":{\"globals\":[\"describe\",\"before\",\"beforeEach\",\"afterEach\",\"after\",\"it\",\"expect\",\"cy\"]},\"bundlesize\":[{\"path\":\"./dist/octokit-rest.min.js.gz\",\"maxSize\":\"33 kB\"}]};\n\n//# sourceURL=webpack://Octokit/./package.json?");

/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** ./get-request-agent (ignored) ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack://Octokit/./get-request-agent_(ignored)?");

/***/ })

/******/ });
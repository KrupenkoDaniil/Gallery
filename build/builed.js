/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./img/cat.jpg */ "./src/img/cat.jpg"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <title>Document</title>\r\n</head>\r\n<body>\r\n    <div class=\"overlay\"></div>\r\n    \r\n    <div class=\"wrap\">\r\n        <section class=\"post-window\"> \r\n            <div class=\"post-window__image-section image-section\">\r\n                <img class=\"image-section__img\" src=\"#\" alt=\"picture\">\r\n                <a href=\"#\" class=\"image-section__exit-button\"></a>\r\n                <div class=\"image-section__title\">\r\n                    <p class=\"image-section__text\"></p>\r\n                    <div class=\"image-section__likes\"></div>\r\n                </div>\r\n            </div>\r\n            <hr>\r\n            <div class=\"post-window__comments-section comments-section\">\r\n                <ul class=\"comments-section__comments-container comments-container\">\r\n                </ul>\r\n                <div class=\"comments-section__show-comments-button button\">Show More Comments</div>\r\n            </div>\r\n            <form class=\"post-window__add-comment add-comment\" method=\"GET\">\r\n                <input class=\"add-comment__name\" type=\"text\" list=\"names\" placeholder=\"Your name\" required>\r\n                <datalist id=\"names\">\r\n                    <option value=\"Daniil Krupenko\"></option>\r\n                    <option value=\"Vasia Pypkin\"></option>\r\n                </datalist>\r\n                <textarea class=\"add-comment__textarea textarea\" name=\"comment\" id=\"comment\" placeholder=\"Your comment here\" required></textarea>\r\n                <div class=\"add-comment__submit-button button\">Submit</div>\r\n            </form>\r\n        </section>\r\n    </div>  \r\n\r\n    <section class=\"add-window\">\r\n        <div class=\"add-window__image-section image-section\">\r\n            <div class=\"scale-control-settings\">\r\n                <a class=\"scale-control-settings__increase-button\">+</a>\r\n                <a class=\"scale-control-settings__decrease-button\">-</a>\r\n            </div>\r\n            <img class=\"add-window__img\" src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"new-pic\">\r\n            <input id=\"file\" name=\"file\" type=\"file\" accept=\"image/png, image/jpeg\" class=\"add-window__upload-input\">\r\n            <a href=\"#\" class=\"add-window__exit-button\"></a>\r\n        </div>\r\n        <hr>\r\n        <form method=\"GET\" class=\"setting-section\">\r\n            <div class=\"setting-section__filters\">\r\n                <label class=\"setting-section__label\" for=\"filter-chrome\">\"Хром\"\r\n                    <input class=\"setting-section__input\" type=\"radio\" name=\"filter\" id=\"filter-chrome\">\r\n                </label>\r\n                <input class=\"setting-section__filter\" type=\"radio\" name=\"filter\" id=\"filter-sepia\">\r\n                <label class=\"setting-section__label\" for=\"filter-sepia\">\"Сепия\"</label>\r\n\r\n                <input class=\"setting-section__filter\" type=\"radio\" name=\"filter\" id=\"filter-marvin\">\r\n                <label class=\"setting-section__label\" for=\"filter-marvin\">\"Марвин\"</label>\r\n\r\n                <input class=\"setting-section__filter\" type=\"radio\" name=\"filter\" id=\"filter-fobos\">\r\n                <label class=\"setting-section__label\" for=\"filter-fobos\">\"Фобос\"</label>\r\n\r\n                <input class=\"setting-section__filter\" type=\"radio\" name=\"filter\" id=\"filter-znoi\">\r\n                <label class=\"setting-section__label\" for=\"filter-znoi\">\"Зной\"</label>\r\n\r\n                <input class=\"setting-section__filter\" type=\"radio\" name=\"filter\" id=\"filter-original\">\r\n                <label class=\"setting-section__label\" for=\"filter-original\">\"Оригинал\"</label>\r\n\r\n            </div>\r\n            <textarea class=\"setting-section__textarea textarea\" name=\"description\" id=\"description\" placeholder=\"Write description\" required></textarea>\r\n            <!-- make it anchor -->\r\n            <div class=\"setting-section__submit-button\">Upload new post</div>\r\n        </form>\r\n    </section>\r\n\r\n    <template id='comment-template'>\r\n        <li class=\"comments-section__comment\">\r\n            <div class=\"comment-section__title\">\r\n                <img class=\"comment-section__avatar\" src=\"#\" alt=\"picture\">\r\n                <p class=\"comment-section__nickname\"></p>\r\n            </div>\r\n            <p class=\"comment-section__text\"></p>\r\n        </li>\r\n    </template>\r\n\r\n    <template id=\"post-template\" type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal\">\r\n        <div class=\"post\">\r\n            <h5>Comments:<span></span></h5>\r\n            <h5>Likes:<span></span></h5>\r\n        </div>\r\n    </template>\r\n</body>\r\n</html>\r\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/img/cat.jpg":
/*!*************************!*\
  !*** ./src/img/cat.jpg ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2012c107300d230af378.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");



// import './js/create-desk.js';
})();

/******/ })()
;
//# sourceMappingURL=builed.js.map
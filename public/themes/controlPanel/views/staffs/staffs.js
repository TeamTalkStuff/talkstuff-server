/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 99);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(3)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(75),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\laragon\\www\\talkstuff\\vuejs\\modules\\staffs\\components\\NewStaff.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] NewStaff.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-73d6914c", Component.options)
  } else {
    hotAPI.reload("data-v-73d6914c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

window.routes = window.routes || [];
window.widgets = window.widgets || [];

(function () {
    var moduleRoutes = [{ path: '/staffs', name: 'staffs', component: __webpack_require__(64) }, { path: '/staffs/new', name: 'staffs.new', component: __webpack_require__(17) }, { path: '/staffs/:staffId/details',
        name: 'staffs.details',
        component: __webpack_require__(63),
        beforeEnter: function beforeEnter(to, from, next) {
            next(function (vm) {
                if (!vm.$root.hasPermission('staff__manage_details')) {
                    return false;
                }
                return true;
            });
        },
        children: [{
            path: 'home',
            name: 'staffs.details.home',
            component: __webpack_require__(65)
        }, {
            path: 'edit',
            name: 'staffs.details.edit',
            component: __webpack_require__(17)
        }, {
            path: 'permissions',
            name: 'staffs.details.permissions',
            component: __webpack_require__(66)
        }]
    }];

    moduleRoutes.forEach(function (route) {
        window.routes.push(route);
    });

    var moduleWidgets = [{
        name: 'staff-count',
        component: __webpack_require__(67),
        permissions: ["staff__list"],
        width: 1,
        height: 1,
        x: 0,
        y: 1
    }];

    moduleWidgets.forEach(function (widget) {
        window.widgets.push(widget);
    });
})();

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            staff: {
                id: null,
                permissions: []
            }
        };
    },

    methods: {
        getStaff: function getStaff() {
            var vm = this;

            vm.$http.get('/api/staffs/' + this.staff.id + '/get', {
                before: function before(request) {
                    //console.log(vm.$data);
                    this.$root.notify("Fetching Staff...");
                }
            }).then(function (response) {
                vm.$root.notify("Staff found!", 'success');

                Vue.set(vm, 'staff', response.data);

                bus.$emit('staff-found', response.data);
            }, function (error) {
                console.log(error);
            });
        }
    },
    created: function created() {
        if (this.$route.params.staffId) {
            this.staff.id = this.$route.params.staffId;

            this.getStaff();
        }
    },
    mounted: function mounted() {
        var vm = this;

        bus.$on('staff-found', function (staff) {
            Vue.set(vm.$root, 'pageTitle', 'Staff: ' + vm.staff.fullName);
        });

        bus.$on('staff-updated', function (staff) {

            vm.$set(vm, 'staff', staff);
            Vue.set(vm.$root, 'pageTitle', 'Staff: ' + vm.staff.fullName);
        });

        bus.$on('refresh-staff', function (staff) {
            vm.getStaff();
        });
    }
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            branches: [],
            roles: [],
            staff: {
                id: null,
                branch_id: null,
                roleIds: [],
                permissions: [],
                registrationDate: null,
                username: '',
                firstName: '',
                lastName: '',
                otherNames: '',
                active: false,
                email: '',
                phone: ''
            },
            usernameExists: false,
            emailExists: false
        };
    },

    methods: {
        exists: function exists(roleId) {
            return _.contains(this.staff.roleIds, roleId);
        },
        loadRoles: function loadRoles() {
            var vm = this;

            vm.$http.get('/api/security/roles/', {
                before: function before(request) {
                    this.$root.notify("Contacting server for security roles... Please wait.");
                }
            }).then(function (response) {
                //console.log(response.data);
                vm.$set(vm, 'roles', response.data);
            }, function (error) {
                console.log(error);

                vm.$root.notify('Error loading roles...', 'error');
            });
        },
        loadBranches: function loadBranches() {
            var vm = this;

            vm.$http.get('/api/branches/').then(function (response) {
                vm.$set(vm, 'branches', response.data);
            }, function (error) {
                console.log(error);

                vm.$root.notify('Error loading branches...', 'error');
            });
        },
        save: function save() {
            var vm = this;

            vm.$http.post('/api/staffs/save', this.staff, {
                before: function before() {
                    console.log(vm.staff);
                    vm.$root.notify('Saving staff: ' + vm.staff.firstName);
                }
            }).then(function (response) {
                //console.log(response.data);
                vm.$root.notify(vm.staff.firstName + ' has been saved successfully!', 'success');

                if (vm.staff.id) {// we updated the staff
                    //   bus.$emit('staff-updated', response.data);
                }

                window.router.go(-1);
            }, function (error) {
                vm.$root.notify('Error: ' + error.data.message, 'error');

                console.log(error);
            });
        },
        getStaff: function getStaff() {
            var vm = this;

            if (vm.$parent.staff) vm.$set(vm, 'staff', vm.$parent.staff);
        },
        validateBeforeSubmit: function validateBeforeSubmit() {
            var _this = this;

            this.$validator.validateAll().then(function () {
                // eslint-disable-next-line
                if (!_this.usernameExists && !_this.emailExists) {
                    _this.save();
                } else {
                    UIkit.modal.alert('Username and/or email address already exists').then(function () {});
                }
            }).catch(function () {
                // eslint-disable-next-line
                UIkit.modal.alert('There are errors with your registration. Please re-check!').then(function () {});
            });
        },
        validateUsernameOnServer: function validateUsernameOnServer() {
            var vm = this;

            if (vm.staff.username.length) {
                vm.$http.get('/api/security/users/' + vm.staff.username + '/search-username', {
                    before: function before(request) {
                        request.params.searching = true;
                    }
                }).then(function (response) {
                    // server should return with a staff with this username
                    var user = response.data;

                    if (user.id != undefined) {
                        vm.$set(vm, 'userExists', true);
                        vm.$validator.errorBag.add('username', 'Username has been taken');
                    } else {
                        vm.$set(vm, 'userExists', false);
                    }
                }, function (error) {
                    // error occurred
                });
            }
        }
    },
    beforeCreate: function beforeCreate() {},
    computed: {
        staffName: function staffName() {
            return this.staff.firstName + ' ' + this.staff.otherNames + ' ' + this.staff.lastName;
        }
    },
    mounted: function mounted() {
        if (this.$route.params.staffId) {
            this.staff.id = this.$route.params.staffId;

            this.getStaff();
        } else {
            Vue.set(this.$root, 'pageTitle', 'New Staff');
        }
        var vm = this;

        this.loadBranches();
        this.loadRoles();

        bus.$on('staff-found', function (staff) {
            vm.getStaff();
        });
    },
    created: function created() {
        var vm = this;
        this.$watch('staffName', function (newVal, oldVal) {
            if (newVal) {
                vm.heading = 'Staff: ' + newVal;
            } else {
                vm.heading = 'New Staff';
            }
        });
    }
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            staffs: [],
            branches: [],
            staff: {
                id: null,
                name: '',
                username: '',
                firstName: '',
                lastName: '',
                otherNames: '',
                email: '',
                phone: '',
                branch_id: ''
            },
            usernameExists: false,
            emailExists: false
        };
    },

    methods: {
        staffModal: function staffModal(staff) {
            if (staff !== undefined) {
                Vue.set(this, 'staff', staff);
            } else {
                Vue.set(this, 'staff', {
                    id: null,
                    name: '',
                    username: '',
                    firstName: '',
                    lastName: '',
                    otherNames: '',
                    email: '',
                    phone: '',
                    branch_id: ''
                });
            }
        },
        loadStaffs: function loadStaffs() {
            var vm = this;

            vm.$http.get('/api/staffs/', {
                before: function before(request) {
                    vm.$set(vm.$root, 'loadingData', true);

                    this.$root.notify("Contacting server for Staffs... Please wait.");
                }
            }).then(function (response) {
                //console.log(response.data);
                vm.$set(vm, 'staffs', response.data);
                vm.$set(vm.$root, 'loadingData', false);

                this.$root.notify(vm.staffs.length + " staff(s) found.", 'success');
            }, function (error) {
                console.log(error);

                vm.$root.notify('Error loading staffs...', 'error');
            });
        },
        save: function save() {
            var vm = this;

            vm.$http.post('/api/staffs/save', this.staff, {
                before: function before() {
                    vm.$root.notify('Creating staff: ' + vm.staff.firstName);
                }
            }).then(function (response) {
                if (!vm.staff.id) {
                    // we are creating a new staff, so we push into the array
                    vm.staffs.push(response.data);
                }

                vm.$root.notify('Saved! ' + vm.staff.name, 'success');
            }, function (error) {});
        },
        confirmDelete: function confirmDelete(staffIndex) {
            var vm = this;

            var delStaff = vm.staffs[staffIndex];

            UIkit.modal.confirm('Are you sure you want to proceed?').then(function () {

                vm.staffs.splice(staffIndex, 1);

                vm.$http.get('/api/staffs/' + delStaff.id + '/delete').then(function (response) {
                    vm.$root.notify(response.data.name + ' has been successfully deleted from the system.');
                }, function (error) {
                    console.log(error);
                });
            }, function () {
                //console.log('Rejected.')
            });
        },
        validateUsernameOnServer: function validateUsernameOnServer() {
            var vm = this;

            if (vm.staff.username.length) {
                vm.$http.get('/api/security/users/' + vm.staff.username + '/search-username', {
                    before: function before(request) {
                        request.params.searching = true;
                    }
                }).then(function (response) {
                    // server should return with a member with this username
                    var user = response.data;

                    if (user.id != undefined) {
                        vm.$set(vm, 'userExists', true);
                        vm.$validator.errorBag.add('username', 'Username has been taken');
                    } else {
                        vm.$set(vm, 'userExists', false);
                    }
                }, function (error) {
                    // error occurred
                });
            }
        },
        validateEmailOnServer: function validateEmailOnServer() {
            var vm = this;

            if (vm.staff.email.length) {
                vm.$http.get('/api/security/users/' + vm.staff.email + '/search-email', {
                    before: function before(request) {
                        request.params.searching = true;
                    }
                }).then(function (response) {
                    // server should return with a member with this username
                    var user = response.data;

                    if (user.id != undefined) {
                        vm.$set(vm, 'emailExists', true);
                        vm.$validator.errorBag.add('email', 'Email address already exists');
                    } else {
                        vm.$set(vm, 'emailExists', false);
                    }
                }, function (error) {
                    // error occurred
                });
            }
        }
    },
    beforeCreate: function beforeCreate() {
        Vue.set(this.$root, 'pageTitle', 'Staffs');
    },
    mounted: function mounted() {
        this.loadStaffs();
    }
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            branches: [],
            staff: {
                id: null,
                name: '',
                username: '',
                firstName: '',
                lastName: '',
                otherNames: '',
                email: '',
                phone: '',
                branch_id: ''
            }
        };
    },

    methods: {
        staffModal: function staffModal(staff) {
            if (staff !== undefined) {
                Vue.set(this, 'staff', staff);
            } else {
                Vue.set(this, 'staff', {
                    id: null,
                    name: '',
                    username: '',
                    firstName: '',
                    lastName: '',
                    otherNames: '',
                    email: '',
                    phone: '',
                    branch_id: ''
                });
            }
        },
        toggleActivation: function toggleActivation() {
            var vm = this;

            vm.$http.get('/api/staffs/' + vm.$parent.staff.id + '/toggle-activation', {
                before: function before(request) {
                    vm.$root.notify('Contacting server.... Please wait!');
                }
            }).then(function (response) {
                vm.$root.notify('Staff Updated!', 'success');

                bus.$emit('refresh-staff', response.data);
            }, function (error) {
                console.log(error.data);
            });
        },
        confirmDelete: function confirmDelete() {
            var vm = this;

            UIkit.modal.confirm('Are you sure you want to proceed?').then(function () {

                vm.$http.get('/api/staffs/' + vm.$parent.staff.id + '/delete').then(function (response) {
                    vm.$root.notify(response.data.firstName + ' has been successfully deleted from the system.');
                    vm.$root.back();
                }, function (error) {
                    console.log(error);
                });
            }, function () {
                //console.log('Rejected.')
            });
        }
    },
    mounted: function mounted() {
        /*bus.$on('staff-found', function(){
        });*/
    }
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            modules: []
        };
    },

    methods: {
        getModules: function getModules() {
            var vm = this;
            vm.$http.get('/api/app/modules', {
                before: function before(request) {
                    //this.$root.notify("Fetching Role...");
                }
            }).then(function (response) {
                //vm.$root.notify("Role found!",'success');

                Vue.set(vm, 'modules', response.data);
            }, function (error) {
                console.log(error);
            });
        },
        saveStaffRole: function saveStaffRole() {
            var vm = this;

            vm.$http.post('/api/staffs/save-permissions', this.$parent.staff, {
                before: function before() {
                    vm.$root.notify('Saving staff permissions');
                    // we only need the access key to be submitted to the server
                }
            }).then(function (response) {
                vm.$set(vm.$parent, 'staff', response.data);
                vm.$root.notify('Saved successfully!', 'success');

                //window.router.back();
            }, function (error) {
                vm.$root.notify('Error: ' + error.data.message, 'error');

                console.log(error);
            });
        },
        togglePermission: function togglePermission(permission) {
            var vm = this;
            var found = _.find(vm.$parent.staff.permissions, function (item) {
                if (_.isEqual(item, permission.access)) return true;
            });

            if (found) {
                // remove permission from role
                var removed = _.without(vm.$parent.staff.permissions, found);
                vm.$set(vm.role, 'permissions', removed);
            } else {
                // add permission to role
                vm.$parent.staff.permissions.push(permission.access);
            }
        },
        exists: function exists(access) {
            return _.contains(this.$parent.staff.permissions, access);
        }
    },
    mounted: function mounted() {
        this.getModules();
    }
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            totalStaffs: 0
        };
    },


    methods: {
        loadStaffs: function loadStaffs() {
            var vm = this;

            vm.$http.get('/api/staffs/', {
                before: function before(request) {
                    //this.$root.notify("Contacting server for Staffs... Please wait.");
                }
            }).then(function (response) {
                //console.log(response.data);
                vm.$set(vm, 'totalStaffs', response.data.length);
            }, function (error) {
                console.log(error);

                vm.$root.notify('Error loading staffs...', 'error');
            });
        }
    },

    mounted: function mounted() {
        this.loadStaffs();
    }
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

/***/ }),
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

/***/ }),
/* 43 */,
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

/***/ }),
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

/***/ }),
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(83)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(69),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\laragon\\www\\talkstuff\\vuejs\\modules\\staffs\\components\\Details.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Details.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1dc1cff8", Component.options)
  } else {
    hotAPI.reload("data-v-1dc1cff8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(90)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(77),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\laragon\\www\\talkstuff\\vuejs\\modules\\staffs\\components\\Staffs.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Staffs.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-abe99a66", Component.options)
  } else {
    hotAPI.reload("data-v-abe99a66", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(85)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(71),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\laragon\\www\\talkstuff\\vuejs\\modules\\staffs\\components\\details\\StaffHomeScreen.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] StaffHomeScreen.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ee8f9d8", Component.options)
  } else {
    hotAPI.reload("data-v-2ee8f9d8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(82)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(68),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\laragon\\www\\talkstuff\\vuejs\\modules\\staffs\\components\\details\\StaffRoles.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] StaffRoles.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d88c738", Component.options)
  } else {
    hotAPI.reload("data-v-0d88c738", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(87)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(73),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\laragon\\www\\talkstuff\\vuejs\\modules\\staffs\\widgets\\StaffCount.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] StaffCount.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3bf54e5e", Component.options)
  } else {
    hotAPI.reload("data-v-3bf54e5e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uk-margin-remove-top",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-1-1 uk-margin-remove"
  }, [_c('div', {
    staticClass: "uk-card uk-card-default "
  }, [_c('div', {
    staticClass: "uk-card-header"
  }, [_c('div', {
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-expand@m"
  }, [_c('h3', {
    staticClass: "uk-card-title uk-margin-remove-bottom"
  }, [_vm._v("\n                            " + _vm._s(_vm.$parent.staff.firstName) + ": "), _c('span', {
    staticClass: "uk-text-bold"
  }, [_vm._v("Custom Privileges")])])]), _vm._v(" "), _c('div', {
    staticClass: "uk-width-auto@m"
  })])]), _vm._v(" "), _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.saveStaffRole()
      }
    }
  }, [_c('div', {
    staticClass: "uk-card-body"
  }, [(_vm.modules.length) ? _c('div', {
    staticClass: "uk-child-width-1-3@m uk-grid-small uk-grid-divider",
    attrs: {
      "uk-grid": ""
    }
  }, _vm._l((_vm.modules), function(module) {
    return (module.permissions.length) ? _c('div', {
      staticClass: "uk-card uk-card-small"
    }, [_c('div', {
      staticClass: "uk-card-header"
    }, [_c('h3', {
      staticClass: "uk-card-title uk-margin-remove-bottom"
    }, [_vm._v(_vm._s(module.name))]), _vm._v(" "), _c('p', {
      staticClass: "uk-margin-remove-top"
    }, [_vm._v(_vm._s(module.description))])]), _vm._v(" "), _c('div', {
      staticClass: "uk-card-body"
    }, [_c('div', {
      staticClass: "uk-margin uk-grid-small uk-child-width-1-1 uk-flex uk-flex-column"
    }, _vm._l((module.permissions), function(permission) {
      return _c('label', [_c('input', {
        staticClass: "uk-checkbox permissions",
        attrs: {
          "type": "checkbox"
        },
        domProps: {
          "checked": _vm.exists(permission.access)
        },
        on: {
          "change": function($event) {
            _vm.togglePermission(permission)
          }
        }
      }), _vm._v("\n                                        " + _vm._s(permission.description) + "\n                                    ")])
    }))])]) : _vm._e()
  })) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "uk-card-footer"
  }, [_c('button', {
    staticClass: "uk-button uk-button-primary",
    attrs: {
      "type": "submit",
      "disabled": _vm.$parent.staff.id && !_vm.$parent.staff.permissions.length
    }
  }, [_vm._v("save")])])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0d88c738", module.exports)
  }
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "uk-flex-middle uk-flex",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-auto@m"
  }, [_c('router-link', {
    class: 'uk-button uk-button-secondary',
    attrs: {
      "tag": "button",
      "to": {
        name: 'staffs'
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-arrow-left"
  }), _vm._v("\n                Back to list\n            ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "uk-width-expand@m"
  }, [_c('div', {
    staticClass: "uk-flex uk-flex-right uk-grid-small uk-child-width-1-5@m uk-flex-middle uk-grid-match",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', [_c('router-link', {
    staticClass: "uk-link-reset",
    attrs: {
      "to": {
        name: 'staffs.details.home',
        params: {
          staffId: _vm.staff.id
        }
      }
    }
  }, [_c('div', {
    staticClass: "uk-card uk-card-small bg-hover-cyan uk-card-body uk-text-center",
    class: {
      'bg-white uk-dark fg-cyan fg-hover-white': _vm.$route.name == 'staffs.details.home', 'uk-light bg-darkGray': _vm.$route.name != 'staffs.details.home'
    }
  }, [_c('span', {
    attrs: {
      "uk-icon": "ratio: 2; icon: home"
    }
  }), _vm._v(" "), _c('br'), _vm._v("\n                            Summary\n                        ")])])], 1), _vm._v(" "), _c('div', [(_vm.$root.hasPermission('staff__modify')) ? _c('router-link', {
    staticClass: "uk-link-reset",
    attrs: {
      "to": {
        name: 'staffs.details.edit',
        params: {
          staffId: _vm.staff.id
        }
      }
    }
  }, [_c('div', {
    staticClass: "uk-card uk-card-small bg-hover-cyan uk-card-body uk-text-center",
    class: {
      'bg-white uk-dark fg-cyan fg-hover-white': _vm.$route.name == 'staffs.details.edit', 'uk-light bg-darkGray': _vm.$route.name != 'staffs.details.edit'
    }
  }, [_c('span', {
    attrs: {
      "uk-icon": "ratio: 2; icon: pencil"
    }
  }), _vm._v(" "), _c('br'), _vm._v("\n                            Edit\n                        ")])]) : _vm._e()], 1), _vm._v(" "), _c('div', [(_vm.$root.hasPermission('staff__grant_custom_access')) ? _c('router-link', {
    staticClass: "uk-link-reset",
    attrs: {
      "to": {
        name: 'staffs.details.permissions',
        params: {
          staffId: _vm.staff.id
        }
      }
    }
  }, [_c('div', {
    staticClass: "uk-card uk-card-small bg-hover-cyan uk-card-body uk-text-center",
    class: {
      'bg-white uk-dark fg-cyan fg-hover-white':
      _vm.$route.name == 'staffs.details.permissions',
        'uk-light bg-darkGray': _vm.$route.name != 'staffs.details.permissions'
    }
  }, [_c('span', {
    attrs: {
      "uk-icon": "ratio: 2; icon: lock"
    }
  }), _vm._v(" "), _c('br'), _vm._v("\n                            Access Privileges\n                        ")])]) : _vm._e()], 1)])])]), _vm._v(" "), _c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1dc1cff8", module.exports)
  }
}

/***/ }),
/* 70 */,
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uk-margin-remove-top",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-1-1 uk-margin-remove"
  }, [_c('div', {
    staticClass: "uk-card uk-card-default "
  }, [_c('div', {
    staticClass: "uk-card-header"
  }, [_c('div', {
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-expand@m"
  }, [_c('h3', {
    staticClass: "uk-card-title uk-margin-remove-bottom"
  }, [_vm._v("\n                            " + _vm._s(_vm.$parent.staff.firstName) + ": "), _c('span', {
    staticClass: "uk-text-bold"
  }, [_vm._v("Profile")])])]), _vm._v(" "), _c('div', {
    staticClass: "uk-width-auto@m"
  }, [(_vm.$root.hasPermission('staff__activate')) ? _c('div', {
    staticClass: "uk-margin-remove"
  }, [(!_vm.$parent.staff.active) ? _c('button', {
    staticClass: "uk-button uk-width-1-1 uk-button-small uk-button-secondary",
    on: {
      "click": function($event) {
        _vm.toggleActivation()
      }
    }
  }, [_vm._v("\n                                activate\n                            ")]) : _vm._e(), _vm._v(" "), (_vm.$parent.staff.active) ? _c('button', {
    staticClass: "uk-button uk-width-1-1 uk-button-small fg-white bg-darkRed bg-hover-amber",
    on: {
      "click": function($event) {
        _vm.toggleActivation()
      }
    }
  }, [_vm._v("\n                                de-activate\n                            ")]) : _vm._e()]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "uk-card-body"
  }, [_c('div', {
    staticClass: "uk-grid-match uk-grid-small uk-grid-divider",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-1-3@m uk-card uk-card-small"
  }, [_c('div', {
    staticClass: "uk-card-body"
  }, [_c('ul', {
    staticClass: "uk-list"
  }, [_c('li', [_c('label', {
    staticClass: "uk-form-label"
  }, [_vm._v("Name:")]), _vm._v(" " + _vm._s(_vm.$parent.staff.fullName) + "\n                                ")]), _vm._v(" "), _c('li', [_c('label', {
    staticClass: "uk-form-label"
  }, [_vm._v("Username:")]), _vm._v(" " + _vm._s(_vm.$parent.staff.username) + "\n                                ")]), _vm._v(" "), _c('li', [_c('label', {
    staticClass: "uk-form-label"
  }, [_vm._v("Phone:")]), _vm._v(" " + _vm._s(_vm.$parent.staff.phone) + "\n                                ")]), _vm._v(" "), _c('li', [_c('label', {
    staticClass: "uk-form-label"
  }, [_vm._v("Email:")]), _vm._v(" " + _vm._s(_vm.$parent.staff.email) + "\n                                ")])])]), _vm._v(" "), _c('div', {
    staticClass: "uk-card-footer",
    attrs: {
      "uk-margin": ""
    }
  }, [_c('a', {
    staticClass: "uk-button uk-button-small uk-button-danger",
    attrs: {
      "uk-tooltip": "",
      "title": "Delete"
    },
    on: {
      "click": function($event) {
        _vm.confirmDelete(_vm.index)
      }
    }
  }, [_c('span', {
    staticClass: "fa fa-times"
  }), _vm._v(" Delete\n                            ")])])]), _vm._v(" "), _c('div', {
    staticClass: "uk-width-2-3@m uk-card uk-card-small"
  }, [_c('div', {
    staticClass: "uk-flex uk-flex-wrap uk-child-width-1-3@m uk-grid-small uk-grid-match",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', [_c('div', {
    staticClass: "uk-tile uk-padding-small",
    class: {
      'bg-darkGreen': _vm.$parent.staff.active, 'bg-darkRed': !_vm.$parent.staff.active
    }
  }, [_c('h3', {
    staticClass: "uk-h3 uk-margin-remove uk-text-center fg-white"
  }, [_vm._v("\n                                        Account is "), _c('br'), _vm._v(" "), (_vm.$parent.staff.active) ? _c('span', {}, [_vm._v("\n                                        Active\n                                        "), _c('br'), _c('i', {
    staticClass: "fa fa-check"
  })]) : _c('span', {}, [_vm._v("\n                                            Pending Activation\n                                            "), _c('br'), _vm._v(" "), _c('i', {
    staticClass: "fa fa-ban"
  })])])])])])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "uk-modal-container",
    attrs: {
      "id": "staff-modal",
      "uk-modal": ""
    }
  }, [_c('div', {
    staticClass: "uk-modal-dialog"
  }, [_c('button', {
    staticClass: "uk-modal-close-outside",
    attrs: {
      "type": "button",
      "uk-close": ""
    }
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "uk-modal-body"
  }), _vm._v(" "), _c('div', {
    staticClass: "uk-modal-footer uk-text-right"
  }, [_c('button', {
    staticClass: "uk-button uk-button-default uk-modal-close",
    attrs: {
      "type": "button"
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('button', {
    staticClass: "uk-button uk-button-primary uk-modal-close",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.save()
      }
    }
  }, [_vm._v("Save")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uk-modal-header"
  }, [_c('h2', {
    staticClass: "uk-modal-title"
  }, [_vm._v("Staff")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2ee8f9d8", module.exports)
  }
}

/***/ }),
/* 72 */,
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uk-width-1-3@m"
  }, [_c('div', {
    staticClass: "uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@m",
    attrs: {
      "uk-grid": ""
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "uk-card-body"
  }, [_c('h3', {
    staticClass: "uk-h1 uk-margin-remove-bottom uk-text-center"
  }, [_vm._v(_vm._s(_vm.totalStaffs))]), _vm._v(" "), _c('p', {
    staticClass: "uk-text-lead uk-text-center uk-margin-remove"
  }, [_vm._v("Staffs")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uk-card-media-left uk-cover-container bg-darkMagenta uk-light"
  }, [_c('div', {
    staticClass: "uk-position-center"
  }, [_c('i', {
    staticClass: "fa fa-briefcase fa-4x"
  })])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3bf54e5e", module.exports)
  }
}

/***/ }),
/* 74 */,
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "uk-width-1-1"
  }, [_c('div', {
    staticClass: "uk-card uk-card-default uk-box-shadow-large"
  }, [_c('div', {
    staticClass: "uk-card-header"
  }, [_c('div', {
    staticClass: "uk-grid-small uk-flex-middle",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-expand"
  }, [_c('h3', {
    staticClass: "uk-card-title uk-margin-remove-bottom"
  }, [_vm._v("Staff Registration Form")]), _vm._v(" "), _c('p', {
    staticClass: "uk-margin-remove-top"
  }, [_vm._v(_vm._s(_vm.staffName))])]), _vm._v(" "), _c('div', {
    staticClass: "uk-width-auto"
  }, [_c('router-link', {
    class: 'uk-button uk-button-secondary',
    attrs: {
      "tag": "button",
      "to": {
        name: 'staffs'
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-arrow-left"
  }), _vm._v("\n                            Back to list\n                        ")])], 1)])]), _vm._v(" "), _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.validateBeforeSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "uk-card-body"
  }, [_c('div', {
    staticClass: "uk-grid-divider uk-grid-match",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-2-3@m"
  }, [_c('div', {
    staticClass: "uk-child-width-1-3@m uk-grid-small",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {}, [_c('label', {
    staticClass: "uk-form-label",
    attrs: {
      "for": "staff.firstName"
    }
  }, [_vm._v("First Name:")]), _vm._v(" "), _c('div', {
    staticClass: "uk-form-controls"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.staff.firstName),
      expression: "staff.firstName"
    }, {
      name: "validate",
      rawName: "v-validate",
      value: ('required'),
      expression: "'required'"
    }],
    staticClass: "uk-input uk-form-width-expand",
    class: {
      'uk-form-danger': _vm.errors.has('firstName')
    },
    attrs: {
      "id": "staff.firstName",
      "autofocus": "",
      "type": "text",
      "name": "firstName",
      "placeholder": "Your first name..."
    },
    domProps: {
      "value": (_vm.staff.firstName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.staff.firstName = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errors.has('firstName')),
      expression: "errors.has('firstName')"
    }],
    staticClass: "uk-text-meta uk-text-danger"
  }, [_vm._v("\n                                            " + _vm._s(_vm.errors.first('firstName')) + "\n                                        ")])])]), _vm._v(" "), _c('div', {}, [_c('label', {
    staticClass: "uk-form-label",
    attrs: {
      "for": "staff.otherNames"
    }
  }, [_vm._v("Other Names:")]), _vm._v(" "), _c('div', {
    staticClass: "uk-form-controls"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.staff.otherNames),
      expression: "staff.otherNames"
    }],
    staticClass: "uk-input uk-form-width-expand",
    attrs: {
      "id": "staff.otherNames",
      "type": "text",
      "placeholder": "Your other names..."
    },
    domProps: {
      "value": (_vm.staff.otherNames)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.staff.otherNames = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {}, [_c('label', {
    staticClass: "uk-form-label",
    attrs: {
      "for": "staff.lastName"
    }
  }, [_vm._v("Last Name:")]), _vm._v(" "), _c('div', {
    staticClass: "uk-form-controls"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.staff.lastName),
      expression: "staff.lastName"
    }, {
      name: "validate",
      rawName: "v-validate",
      value: ('required'),
      expression: "'required'"
    }],
    staticClass: "uk-input uk-form-width-expand",
    class: {
      'uk-form-danger': _vm.errors.has('lastName')
    },
    attrs: {
      "id": "staff.lastName",
      "name": "lastName",
      "type": "text",
      "placeholder": "Your last name..."
    },
    domProps: {
      "value": (_vm.staff.lastName)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.staff.lastName = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errors.has('lastName')),
      expression: "errors.has('lastName')"
    }],
    staticClass: "uk-text-meta uk-text-danger"
  }, [_vm._v("\n                                            " + _vm._s(_vm.errors.first('lastName')) + "\n                                        ")])])])]), _vm._v(" "), _c('hr', {
    staticClass: "uk-divider-icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "uk-child-width-1-2@m",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-1-1"
  }, [_c('label', {
    staticClass: "uk-form-label",
    attrs: {
      "for": "staff.address"
    }
  }, [_vm._v("Address:")]), _vm._v(" "), _c('div', {
    staticClass: "uk-form-controls"
  }, [_c('textarea', {
    directives: [{
      name: "validate",
      rawName: "v-validate",
      value: ('required'),
      expression: "'required'"
    }, {
      name: "model",
      rawName: "v-model",
      value: (_vm.staff.address),
      expression: "staff.address"
    }],
    staticClass: "uk-textarea",
    class: {
      'uk-form-danger': _vm.errors.has('address')
    },
    attrs: {
      "id": "staff.address",
      "rows": "3",
      "name": "address"
    },
    domProps: {
      "value": (_vm.staff.address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.staff.address = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errors.has('address')),
      expression: "errors.has('address')"
    }],
    staticClass: "uk-text-meta uk-text-danger"
  }, [_vm._v("\n                                            " + _vm._s(_vm.errors.first('address')) + "\n                                        ")])])]), _vm._v(" "), _c('div', {}, [_c('label', {
    staticClass: "uk-form-label",
    attrs: {
      "for": "staff.phone"
    }
  }, [_vm._v("Mobile Phone:")]), _vm._v(" "), _c('div', {
    staticClass: "uk-form-controls"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.staff.phone),
      expression: "staff.phone"
    }, {
      name: "validate",
      rawName: "v-validate",
      value: ('required|numeric|min:11'),
      expression: "'required|numeric|min:11'"
    }],
    staticClass: "uk-input uk-form-width-expand",
    class: {
      'uk-form-danger': _vm.errors.has('phone')
    },
    attrs: {
      "id": "staff.phone",
      "name": "phone",
      "type": "text",
      "placeholder": "Your phone number..."
    },
    domProps: {
      "value": (_vm.staff.phone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.staff.phone = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errors.has('phone')),
      expression: "errors.has('phone')"
    }],
    staticClass: "uk-text-meta uk-text-danger"
  }, [_vm._v("\n                                            " + _vm._s(_vm.errors.first('phone')) + "\n                                        ")])])]), _vm._v(" "), _c('div', {}, [_c('label', {
    staticClass: "uk-form-label"
  }, [_vm._v(":")]), _vm._v(" "), _c('div', {
    staticClass: "uk-form-controls uk-flex uk-flex-column"
  }, [_c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.staff.active),
      expression: "staff.active"
    }],
    staticClass: "uk-checkbox",
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.staff.active) ? _vm._i(_vm.staff.active, null) > -1 : (_vm.staff.active)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.staff.active,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.staff.active = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.staff.active = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.staff.active = $$c
        }
      }
    }
  }), _vm._v("\n                                            Active\n                                        ")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "uk-width-1-3@m"
  }, [(_vm.branches.length) ? _c('div', {
    staticClass: "uk-margin"
  }, [_c('label', {
    staticClass: "uk-form-label",
    attrs: {
      "for": "staff.branch_id"
    }
  }, [_vm._v("Opening Branch:")]), _vm._v(" "), _c('div', {
    staticClass: "uk-form-controls"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.staff.branch_id),
      expression: "staff.branch_id"
    }, {
      name: "validate",
      rawName: "v-validate",
      value: ('required'),
      expression: "'required'"
    }],
    staticClass: "uk-select",
    class: {
      'uk-form-danger': _vm.errors.has('branch')
    },
    attrs: {
      "id": "staff.branch_id",
      "name": "branch"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.staff.branch_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.branches), function(branch) {
    return _c('option', {
      domProps: {
        "value": branch.id
      }
    }, [_vm._v("\n                                            " + _vm._s(branch.name) + "\n                                        ")])
  })), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errors.has('branch')),
      expression: "errors.has('branch')"
    }],
    staticClass: "uk-text-meta uk-text-danger"
  }, [_vm._v("\n                                    " + _vm._s(_vm.errors.first('branch')) + "\n                                ")])])]) : _vm._e(), _vm._v(" "), (_vm.roles.length) ? _c('div', {
    staticClass: "uk-margin"
  }, [_c('label', {
    staticClass: "uk-form-label"
  }, [_vm._v("Roles:")]), _vm._v(" "), _c('div', {
    staticClass: "uk-form-controls uk-flex uk-flex-column"
  }, _vm._l((_vm.roles), function(role) {
    return (role.description != 'Member') ? _c('label', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.staff.roleIds),
        expression: "staff.roleIds"
      }],
      staticClass: "uk-checkbox",
      attrs: {
        "type": "checkbox"
      },
      domProps: {
        "value": role.id,
        "checked": _vm.exists(role.id),
        "checked": Array.isArray(_vm.staff.roleIds) ? _vm._i(_vm.staff.roleIds, role.id) > -1 : (_vm.staff.roleIds)
      },
      on: {
        "__c": function($event) {
          var $$a = _vm.staff.roleIds,
            $$el = $event.target,
            $$c = $$el.checked ? (true) : (false);
          if (Array.isArray($$a)) {
            var $$v = role.id,
              $$i = _vm._i($$a, $$v);
            if ($$c) {
              $$i < 0 && (_vm.staff.roleIds = $$a.concat($$v))
            } else {
              $$i > -1 && (_vm.staff.roleIds = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
            }
          } else {
            _vm.staff.roleIds = $$c
          }
        }
      }
    }), _vm._v("\n                                        " + _vm._s(role.description) + "\n                                    ")]) : _vm._e()
  }))]) : _vm._e(), _vm._v(" "), (!_vm.staff.id) ? _c('div', {
    staticClass: "uk-margin"
  }, [_c('label', {
    staticClass: "uk-form-label",
    attrs: {
      "for": "staff.username"
    }
  }, [_vm._v("Your username:")]), _vm._v(" "), _c('div', {
    staticClass: "uk-form-controls"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.staff.username),
      expression: "staff.username"
    }, {
      name: "validate",
      rawName: "v-validate",
      value: ('required'),
      expression: "'required'"
    }],
    staticClass: "uk-input uk-form-width-expand",
    class: {
      'uk-form-danger': _vm.errors.has('username') || _vm.usernameExists
    },
    attrs: {
      "id": "staff.username",
      "name": "username",
      "type": "text",
      "placeholder": "Your username..."
    },
    domProps: {
      "value": (_vm.staff.username)
    },
    on: {
      "blur": function($event) {
        _vm.validateUsernameOnServer()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.staff.username = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errors.has('username')),
      expression: "errors.has('username')"
    }],
    staticClass: "uk-text-meta uk-text-danger"
  }, [_vm._v("\n                                            " + _vm._s(_vm.errors.first('username')) + "\n                                    ")])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "uk-margin"
  }, [_c('label', {
    staticClass: "uk-form-label",
    attrs: {
      "for": "staff.email"
    }
  }, [_vm._v("Your Email:")]), _vm._v(" "), _c('div', {
    staticClass: "uk-form-controls"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.staff.email),
      expression: "staff.email"
    }, {
      name: "validate",
      rawName: "v-validate",
      value: ('required|email'),
      expression: "'required|email'"
    }],
    staticClass: "uk-input uk-form-width-expand",
    class: {
      'uk-form-danger': _vm.errors.has('email')
    },
    attrs: {
      "id": "staff.email",
      "name": "email",
      "type": "text",
      "placeholder": "Your email..."
    },
    domProps: {
      "value": (_vm.staff.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.staff.email = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errors.has('email')),
      expression: "errors.has('email')"
    }],
    staticClass: "uk-text-meta uk-text-danger"
  }, [_vm._v("\n                                            " + _vm._s(_vm.errors.first('email')) + "\n                                    ")])])])])])]), _vm._v(" "), _vm._m(0)])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uk-card-footer"
  }, [_c('button', {
    staticClass: "uk-button uk-button-primary",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("save")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-73d6914c", module.exports)
  }
}

/***/ }),
/* 76 */,
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('div', {
    staticClass: "uk-width-1-1"
  }, [_c('div', {
    staticClass: "uk-card uk-card-default"
  }, [_c('div', {
    staticClass: "uk-card-header"
  }, [_c('div', {
    staticClass: "uk-grid-small uk-flex-middle",
    attrs: {
      "uk-grid": ""
    }
  }, [_c('div', {
    staticClass: "uk-width-auto"
  }, [(_vm.$root.hasPermission('staff__add')) ? _c('router-link', {
    staticClass: "uk-button uk-button-primary",
    attrs: {
      "to": {
        name: 'staffs.new'
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-plus-circle"
  }), _vm._v("\n                            New Staff\n                        ")]) : _vm._e()], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "uk-card-body"
  }, [(_vm.staffs.length) ? _c('table', {
    staticClass: "uk-table"
  }, [_c('caption', [_vm._v("You have " + _vm._s(_vm.staffs.length) + " staff(s).")]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.staffs), function(staff, index) {
    return _c('router-link', {
      key: staff.id,
      attrs: {
        "tag": "tr",
        "to": {
          name: 'staffs.details.home',
          params: {
            staffId: staff.id
          }
        }
      }
    }, [_c('td', [_vm._v(_vm._s(index + 1))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(staff.fullName))])])
  }))]) : _c('div', {
    staticClass: "uk-card uk-card-body uk-padding-large uk-flex uk-flex-center"
  }, [(_vm.$root.loadingData) ? _c('h3', {
    staticClass: "uk-h2 uk-text-center uk-text-muted"
  }, [_c('div', {
    attrs: {
      "uk-spinner": ""
    }
  })]) : _c('h3', {
    staticClass: "uk-h3 uk-text-center uk-text-muted"
  }, [_vm._v("No data returned!")])])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th'), _vm._v(" "), _c('th', [_vm._v("Name")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-abe99a66", module.exports)
  }
}

/***/ }),
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("02d0193d", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0d88c738\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./StaffRoles.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0d88c738\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./StaffRoles.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7821378e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1dc1cff8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Details.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-1dc1cff8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Details.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 84 */,
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5873fa6f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2ee8f9d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./StaffHomeScreen.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2ee8f9d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./StaffHomeScreen.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 86 */,
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(44);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("90dd6468", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3bf54e5e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./StaffCount.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3bf54e5e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./StaffCount.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 88 */,
/* 89 */,
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0f62d76c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-abe99a66\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Staffs.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-abe99a66\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Staffs.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);


/***/ })
/******/ ]);
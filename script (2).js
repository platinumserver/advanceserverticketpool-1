/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	;(function($) {
	  var RtDomBuilder = __webpack_require__(1),
	      rtClasses = __webpack_require__(2),
	      styles = __webpack_require__(3),
	      rtBuilderData = __webpack_require__(6),
	      RtOrientation = __webpack_require__(7),
	      rtDefaults = __webpack_require__(9);
	  
	  var _emptyObj = function(obj) {
	    return Object.keys(obj).length == 0;
	  };
	  
	  var _throwIfInvalid = function(trackerOpts) {
	    if(!trackerOpts || trackerOpts.referralsEarned < 0) {
	      throw 'You must pass in a positive numeric value for referralsEarned';
	    }
	  };

	  var ReferralTracker = function(el, trackerOpts) {
	    _throwIfInvalid(trackerOpts);
	    this.$el = $(el);
	    this._set('rtData', rtDefaults(trackerOpts));
	    this.createTracker();
	    new RtOrientation(this);
	  };
	  
	  ReferralTracker.prototype = {
	    createTracker: function(returnEl) {
	      this.$el.addClass('row');
	      this.buildDom();
	      this._set('initialized', true);
	      if(returnEl) { return this.$el };
	    },
	    
	    buildDom: function() {
	      this.buildRewardRow();
	      this.buildPrizeRow();
	      this.buildMessage();
	    },
	    
	    buildRewardRow: function() {
	      var $el = this.$el,
	          rewardCollection = this.buildRewardCollection(),
	          referralTrackerRewards = new RtDomBuilder.rewardLevelsRow({rewardLevelNodes: rewardCollection.html});
	      $el.html(referralTrackerRewards.html);
	    },
	    
	    buildPrizeRow: function() {
	      var $el = this.$el,
	          prizeCollection = this.buildPrizeCollection(),
	          prizeRow = new RtDomBuilder.prizeRow({prizeNodes: prizeCollection.html});
	      $el.append(prizeRow.html);
	    },
	    
	    buildRewardCollection: function() {
	      var builderData = rtBuilderData.rewardCollection(this),
	          collection = new RtDomBuilder.collection(RtDomBuilder.rewardLevel, this._get('rewardLevels'), builderData);
	      return collection;
	    },
	    
	    buildPrizeCollection: function() {
	      var builderData = rtBuilderData.prizeCollection(this),
	          collection = new RtDomBuilder.collection(RtDomBuilder.prize, this._get('prizes'), builderData);
	      return collection;
	    },
	    
	    buildMessage: function() {
	      var builderData = rtBuilderData.message(this),
	          message;
	      if(!builderData.showMessage) { return; }
	      message = new RtDomBuilder.message(builderData);
	      this.$el.prepend(message.html);
	    },
	    
	    _set: function(attr, obj) {
	      var $el = this.$el,
	          data = $el.data('referral-tracker') || {};
	      if(_emptyObj(data)) {
	        $el.data('referral-tracker', {});
	        data = $el.data('referral-tracker');
	      }
	      data[attr] = obj;
	    },
	    
	    _get: function (attr) {
	      var data = this.$el.data('referral-tracker');
	      try {
	        return data.rtData[attr];
	      } catch (err) {
	        return '';
	      }
	    }
	  }
	  
	  $.fn.referralTracker = function(trackerOpts) {
	    if (this.length > 1) {
	      for(var i = 0; i < this.length; i++) {
	        new ReferralTracker(this[i], trackerOpts);
	      }
	    } else {
	      new ReferralTracker(this, trackerOpts);
	    }
	  };
	})($);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var RtDomBuilder = function() {
	  
	  // Must return an object with an html property.
	  //
	  
	  this.rewardLevel = function(opts) {
	    var opts = opts || {},
	        reClass = '',
	        level;
	    if(opts.index == (opts.rewardLevels.length - 1)) { opts.rewardClass += ' reward-level-last'}
	    if(opts.referralsEarned >= opts.rewardLevels[opts.index]) { reClass += ' reward-earned' };
	    level = $('<div class="' + opts.rewardClass + ' reward-level reward-level-' + opts.index + reClass + '"></div>');
	    level.append('<span class="reward-level-text' + reClass + '">' + opts.rewardLevels[opts.index] + '</span>')
	    this.html = level.wrap('<div>').parent().html();
	  };
	  
	  this.rewardLevelsRow = function(opts) {
	    var opts = $.extend(true, {rewardLevelNodes: ''}, opts),
	        elemHtml = '<div class="col-sm-12 referral-tracker-rewards" style="text-align: center">';
	        elemHtml += opts.rewardLevelNodes;
	        elemHtml += '</div>';
	    this.html = elemHtml;
	  }
	  
	  this.prizeRow = function(opts) {
	    var opts = $.extend(true, {prizeNodes: ''}, opts),
	        elemHtml = '<div class="col-sm-12 referral-tracker-prizes" style="text-align: center">';
	        elemHtml += opts.prizeNodes;
	        elemHtml += '<div class="clearfix"></div>';
	        elemHtml += '</div>';
	    this.html = elemHtml;
	  }
	  
	  this.prize = function(opts) {
	    var opts = opts || {},
	        prizeClass = opts.prizeClass;
	    if(opts.referralsEarned >= opts.rewardLevels[opts.index]) { prizeClass += ' reward-earned' };
	    var prizeLevel = $('<div class="' + prizeClass + ' reward-level-prize-container reward-level-' + opts.index + '"><div class="reward-level-prize">' + opts.prizes[opts.index] + '</div></div>');
	    this.html = prizeLevel.wrap('<div>').parent().html();
	  }
	  
	  this.message = function(opts) {
	    var opts = opts || {},
	        message = '<div class="col-xs-12 referral-message text-center"><h3>';
	    if(opts.referralsEarned == 0) {
	        message += '0 ' + opts.noneMessage;
	    } else if (opts.referralsEarned == 1) {
	      message += '1 ' + opts.singularMessage;
	    } else {
	      message += opts.referralsEarned + ' ' + opts.pluralMessage;
	    }
	    message += '</h3></div>'
	    this.html = $(message).wrap('<div>').parent().html();
	  }
	  
	  this.collection = function(Obj, collection, data) {
	    var data = data || {},
	        html = '',
	        limit = collection.length;
	    if(data.limit) { limit = data.limit; }
	    for(var i = 0; i < limit; i++) {
	      data.index = i;
	      html += new Obj(data).html;
	    }
	    this.html = html;
	  }
	};

	module.exports = new RtDomBuilder();

/***/ },
/* 2 */
/***/ function(module, exports) {

	// Helper methods to determine which classes are appropriate
	// given a variable amount of prize levels.
	//
	var rtClasses = {
	  reward: function(rewardLevels) {
	    var rewardClass;
	    switch(rewardLevels) {
	      case 2:
	        rewardClass = 'col-sm-6 col-xs-3';
	        break;
	      case 3:
	        rewardClass = 'col-sm-4 col-xs-3';
	        break;
	      case 4:
	        rewardClass = 'col-sm-3 col-xs-3';
	        break;
	      case 5:
	        rewardClass = 'col-sm-5ths col-xs-3';
	        break;
	      default:
	        throw 'You must provide between 2-5 Reward Levels.';
	    }
	    return rewardClass;
	  }
	};

	module.exports = rtClasses;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {"insertAt":"top"});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./styles.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, ".col-xs-5ths,\n.col-sm-5ths,\n.col-md-5ths,\n.col-lg-5ths {\n  position: relative;\n  min-height: 1px;\n  padding-right: 10px;\n  padding-left: 10px; }\n\n.col-xs-5ths {\n  width: 20% !important;\n  float: left !important; }\n\n@media (min-width: 768px) {\n  .col-sm-5ths {\n    width: 20% !important;\n    float: left !important; } }\n\n@media (min-width: 992px) {\n  .col-md-5ths {\n    width: 20% !important;\n    float: left !important; } }\n\n@media (min-width: 1200px) {\n  .col-lg-5ths {\n    width: 20% !important;\n    float: left !important; } }\n\n.referral-tracker-rewards {\n  margin: 20px auto; }\n  .referral-tracker-rewards .reward-level-text {\n    font-size: 18px;\n    width: 50px;\n    height: 50px;\n    border-radius: 100px;\n    display: inline-block;\n    background-color: #AFB1B3;\n    color: #fff;\n    text-align: center;\n    line-height: 50px;\n    z-index: 9;\n    position: relative; }\n\n.reward-earned.reward-level-text {\n  background-color: #4A90E2;\n  color: white; }\n\n.reward-level-0 .left-handle {\n  display: none; }\n\n.reward-level-last .right-handle {\n  display: none !important; }\n\n.referral-tracker .left-handle, .referral-tracker .right-handle {\n  top: 20px;\n  height: 10px;\n  z-index: 5;\n  background: #f7f7f7;\n  position: absolute;\n  width: 50%; }\n\n.referral-tracker .left-handle {\n  left: 0; }\n\n.referral-tracker .right-handle {\n  left: 50%; }\n\n.reward-earned .left-handle .progress-bar {\n  background-color: #4A90E2;\n  height: 10px;\n  width: 100%; }\n\n.reward-earned.reward-level.reward-right .right-handle .progress-bar {\n  background-color: #4A90E2;\n  height: 10px;\n  width: 100%; }\n\n.referral-tracker-vertical .left-handle {\n  height: 100%;\n  width: 10px;\n  left: 50%;\n  top: -30px;\n  transform: translateX(-50%);\n  display: none; }\n\n.referral-tracker-vertical .right-handle {\n  height: 100%;\n  width: 10px;\n  left: 50%;\n  transform: translateX(-50%);\n  top: 2px; }\n\n.referral-tracker {\n  display: none;\n  margin: 20px auto; }\n\n.referral-tracker-prizes {\n  margin-top: 10px; }\n\n.reward-level-prize {\n  background-color: #f7f7f7;\n  padding: 20px;\n  border-radius: 3px; }\n\n.reward-level-prize::before {\n  content: \" \";\n  border: 0;\n  border-bottom: 20px solid #f7f7f7;\n  border-left: 20px solid transparent;\n  border-right: 20px solid transparent;\n  position: absolute;\n  display: inline-block;\n  top: -15px;\n  left: 50%;\n  transform: translateX(-50%); }\n\n.prize-vertical .reward-level-prize::before {\n  content: \" \";\n  transform: rotate(-90deg);\n  display: inline-block;\n  top: 15px;\n  left: -8px;\n  position: absolute; }\n\n@media screen and (max-width: 767px) {\n  .referral-tracker-prizes {\n    margin: 20px auto; } }\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License https://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	// Inject an instance of ReferralTracker to build the data object
	// RtDomBuilder requires for that specific instance.
	//
	var rtBuilderData = {
	  prizeCollection: function(rt) {
	    return {  prizeClass: rt._get('rewardClass'),
	              prizes: rt._get('prizes'),
	              rewardLevels: rt._get('rewardLevels'),
	              referralsEarned: rt._get('referralsEarned'),
	              limit: rt._get('rewardLevels').length }
	  },
	  rewardCollection: function(rt) {
	    return {rewardClass: rt._get('rewardClass'),
	            rewardLevels: rt._get('rewardLevels'),
	            referralsEarned: rt._get('referralsEarned')}
	  },
	  message: function(rt) {
	    return {showMessage: rt._get('showMessage'),
	        referralsEarned: rt._get('referralsEarned'),
	        singularMessage: rt._get('singularMessage'),
	        pluralMessage: rt._get('pluralMessage'),
	        noneMessage: rt._get('noneMessage')}
	  }
	}

	module.exports = rtBuilderData;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var RtProgress = __webpack_require__(8);

	// RtOrientation handles the orientation of the referral tracker. Sets event 
	// listeners for resizing, displays the correct orientation on page load, etc.
	//
	var RtOrientation = function(rt) {
	  this.rt = rt;
	  this.$el = rt.$el;
	  this.progressBar = new RtProgress(rt);
	  this.listen();
	  rt.$el.fadeIn();
	};

	RtOrientation.prototype = {
	  listen: function() {
	    var self = this;
	    $(document).ready(function() {
	      var width = $(document).width();
	      if(width <= 767) {
	        self.detachAndAppend();
	      } else {
	        self.horizontalHtml = self.$el.html();
	      }
	    });
	    
	    $(window).resize(function() {
	      var width = $(document).width();
	      if(width <= 767) {
	        self.detachAndAppend();
	      } else {
	        self.reattach();
	      }
	    });
	  },
	  
	  detachAndAppend: function() {
	    var rewardLevels = this.$el.find('.reward-level'),
	        prizes = this.$el.find('.reward-level-prize-container');
	    this.$el.addClass('referral-tracker-vertical');
	    for(var i = 0; i < rewardLevels.length; i++) {
	      var $prize = $(prizes[i]),
	          $rl = $(rewardLevels[i]),
	          $prizeDom = $prize.detach();
	      $rl.after($prizeDom);
	      $prize.removeClass('col-sm-3 col-sm-4 col-sm-6 col-sm-5ths col-xs-3');
	      $prize.addClass('col-xs-9 prize-vertical');
	      prizes.css({'marginTop': 30});
	      rewardLevels.css({'marginTop': 30});
	    }
	    this.progressBar.trigger('detach');
	  },
	  
	  reattach: function() {
	    if(this.horizontalHtml) {
	      this.$el.html(this.horizontalHtml);
	    } else {
	      this.$el.html('');
	      this.$el = this.rt.createTracker(true);
	      this.horizontalHtml = this.$el.html()
	    }
	    this.$el.removeClass('referral-tracker-vertical');
	    this.progressBar.trigger('reattach');
	  }
	}

	module.exports = RtOrientation;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var RtProgress = function(rt) {
	  var self = this;
	  this.rt = rt;
	  this.events = {
	    detach: function() {
	      self.vertical();
	    },
	    reattach: function() {
	      self.horizontal();
	    }
	  }
	  this.setup();
	}

	RtProgress.prototype = {
	  setup: function() {
	    this.vertical();
	    this.horizontal();
	  },
	  
	  vertical: function() {
	    this.find('.reward-earned.reward-level-prize-container').each(function() {
	      var height = $(this).height();
	      $(this).prev('.reward-level').find('.right-handle, .right-handle .progress-bar').height(height + 30)
	    });
	  },
	  
	  horizontal: function() {
	    this.find('.reward-level-text.reward-earned').closest('.reward-level').addClass('reward-earned');
	    this.find('.reward-earned.reward-level:not(:last)').addClass('reward-right')
	    this.find('.reward-level').append('<div class="left-handle"><div class="progress-bar"></div></div><div class="right-handle"><div class="progress-bar"></div></div>')
	  },
	  
	  find: function(selector) {
	    return this.rt.$el.find(selector);
	  },
	  
	  trigger: function(event) {
	    this.events[event].call()
	  }
	}

	module.exports = RtProgress;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var rtClasses = __webpack_require__(2);

	var defaults = {
	  rewardLevels: [0,5,10],
	  prizes: ['<h4>25% Off</h4><p>Early-bird pricing on all products.</p>', 
	    '<h4>50% Off</h4><p>Super early-bird pricing on all products.</p>', 
	    '<h4>Get 1 Free</h4><p>Get your first shirt for free.</p>'],
	  showMessage: true,
	  singularMessage: 'invited friend has joined. Keep checking.', 
	  pluralMessage: 'invited friends have joined. Keep checking.',
	  noneMessage: 'invited friends have joined. Hurry up and share!'
	};

	var rtDefaults = function(trackerOpts) {
	  var mergedDefaults = $.extend(true, defaults, trackerOpts);
	  mergedDefaults.rewardClass = rtClasses.reward(mergedDefaults.rewardLevels.length);
	  return mergedDefaults;
	}

	module.exports = rtDefaults;

/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License https://www.opensource.org/licenses/mit-license.php
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


/***/ }
/******/ ]);


$('.referral-tracker').referralTracker({
          rewardLevels: [0,1,2,3,4],
          prizes: ['<h4>Share it with your 4 friends </h4><p>And earn ₱65.00 after completing your sharing task</p>', 
            '<h4>Get ₱5.00 cash reward </h4><p>Get your cash when your 1st refferal purchase 200 goldencoins</p>', 
            '<h4>Get ₱5.00 cash reward</h4><p>Get your cash when your 2nd refferal purchase 200 goldencoins</p>', 
            '<h4>Get ₱5.00 cash reward</h4><p>Get your cash when your 3rd refferal purchase 200 goldencoins </p>', 
            '<h4>Get ₱50.00 cash reward</h4><p>Get your cash when your 4th refferal purchase x2 speed up goldencoins</p>'],
          referralsEarned: 0,
          showMessage: true,
          singularMessage: 'invited friend has joined. Keep checking.', 
          pluralMessage: 'invited friends have joined. Keep checking.',
          noneMessage: 'invited friends have joined & purchased . Hurry up and share!'});
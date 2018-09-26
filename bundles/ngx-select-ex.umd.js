(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('escape-string-regexp'), require('@angular/core'), require('@angular/forms'), require('@angular/platform-browser'), require('rxjs'), require('rxjs/operators'), require('lodash'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-select-ex', ['exports', 'escape-string-regexp', '@angular/core', '@angular/forms', '@angular/platform-browser', 'rxjs', 'rxjs/operators', 'lodash', '@angular/common'], factory) :
    (factory((global['ngx-select-ex'] = {}),global.escapeString,global.ng.core,global.ng.forms,global.ng.platformBrowser,global.rxjs,global.rxjs.operators,global._,global.ng.common));
}(this, (function (exports,escapeStringNs,core,forms,platformBrowser,rxjs,operators,lodashNs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var escapeString = escapeStringNs;
    var NgxSelectOption = /** @class */ (function () {
        function NgxSelectOption(value, text, disabled, data, _parent) {
            if (_parent === void 0) {
                _parent = null;
            }
            this.value = value;
            this.text = text;
            this.disabled = disabled;
            this.data = data;
            this._parent = _parent;
            this.type = 'option';
            this.cacheRenderedText = null;
        }
        Object.defineProperty(NgxSelectOption.prototype, "parent", {
            get: /**
             * @return {?}
             */ function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} sanitizer
         * @param {?} highlightText
         * @return {?}
         */
        NgxSelectOption.prototype.renderText = /**
         * @param {?} sanitizer
         * @param {?} highlightText
         * @return {?}
         */
            function (sanitizer, highlightText) {
                if (this.cacheHighlightText !== highlightText || this.cacheRenderedText === null) {
                    this.cacheHighlightText = highlightText;
                    if (this.cacheHighlightText) {
                        this.cacheRenderedText = sanitizer.bypassSecurityTrustHtml((this.text + '').replace(new RegExp(escapeString(this.cacheHighlightText), 'gi'), '<strong>$&</strong>'));
                    }
                    else {
                        this.cacheRenderedText = sanitizer.bypassSecurityTrustHtml(this.text);
                    }
                }
                return this.cacheRenderedText;
            };
        return NgxSelectOption;
    }());
    var NgxSelectOptGroup = /** @class */ (function () {
        function NgxSelectOptGroup(label, options) {
            if (options === void 0) {
                options = [];
            }
            this.label = label;
            this.options = options;
            this.type = 'optgroup';
            this.filter(function () { return true; });
        }
        /**
         * @param {?} callbackFn
         * @return {?}
         */
        NgxSelectOptGroup.prototype.filter = /**
         * @param {?} callbackFn
         * @return {?}
         */
            function (callbackFn) {
                this.optionsFiltered = this.options.filter(function (option) { return callbackFn(option); });
            };
        return NgxSelectOptGroup;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxSelectOptionDirective = /** @class */ (function () {
        function NgxSelectOptionDirective(template) {
            this.template = template;
        }
        NgxSelectOptionDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[ngx-select-option]' },] }
        ];
        /** @nocollapse */
        NgxSelectOptionDirective.ctorParameters = function () {
            return [
                { type: core.TemplateRef }
            ];
        };
        return NgxSelectOptionDirective;
    }());
    var NgxSelectOptionSelectedDirective = /** @class */ (function () {
        function NgxSelectOptionSelectedDirective(template) {
            this.template = template;
        }
        NgxSelectOptionSelectedDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[ngx-select-option-selected]' },] }
        ];
        /** @nocollapse */
        NgxSelectOptionSelectedDirective.ctorParameters = function () {
            return [
                { type: core.TemplateRef }
            ];
        };
        return NgxSelectOptionSelectedDirective;
    }());
    var NgxSelectOptionNotFoundDirective = /** @class */ (function () {
        function NgxSelectOptionNotFoundDirective(template) {
            this.template = template;
        }
        NgxSelectOptionNotFoundDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[ngx-select-option-not-found]' },] }
        ];
        /** @nocollapse */
        NgxSelectOptionNotFoundDirective.ctorParameters = function () {
            return [
                { type: core.TemplateRef }
            ];
        };
        return NgxSelectOptionNotFoundDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var _ = lodashNs;
    /** @type {?} */
    var escapeString$1 = escapeStringNs;
    /** @type {?} */
    var NGX_SELECT_OPTIONS = new core.InjectionToken('NGX_SELECT_OPTIONS');
    /** @enum {number} */
    var ENavigation = {
        first: 0, previous: 1, next: 2, last: 3,
        firstSelected: 4, firstIfOptionActiveInvisible: 5,
    };
    ENavigation[ENavigation.first] = 'first';
    ENavigation[ENavigation.previous] = 'previous';
    ENavigation[ENavigation.next] = 'next';
    ENavigation[ENavigation.last] = 'last';
    ENavigation[ENavigation.firstSelected] = 'firstSelected';
    ENavigation[ENavigation.firstIfOptionActiveInvisible] = 'firstIfOptionActiveInvisible';
    /**
     * @param {?} obj
     * @param {?} propertyName
     * @return {?}
     */
    function propertyExists(obj, propertyName) {
        return propertyName in obj;
    }
    var NgxSelectComponent = /** @class */ (function () {
        function NgxSelectComponent(iterableDiffers, sanitizer, cd, defaultOptions) {
            var _this = this;
            this.sanitizer = sanitizer;
            this.cd = cd;
            this.optionValueField = 'id';
            this.optionTextField = 'text';
            this.optGroupLabelField = 'label';
            this.optGroupOptionsField = 'options';
            this.multiple = false;
            this.allowClear = false;
            this.placeholder = '';
            this.noAutoComplete = false;
            this.disabled = false;
            this.defaultValue = [];
            this.autoSelectSingleOption = false;
            this.autoClearSearch = false;
            this.noResultsFound = 'No results found';
            this.size = 'default';
            this.keyCodeToRemoveSelected = 'Delete';
            this.keyCodeToOptionsOpen = 'Enter';
            this.keyCodeToOptionsClose = 'Escape';
            this.keyCodeToOptionsSelect = 'Enter';
            this.keyCodeToNavigateFirst = 'ArrowLeft';
            this.keyCodeToNavigatePrevious = 'ArrowUp';
            this.keyCodeToNavigateNext = 'ArrowDown';
            this.keyCodeToNavigateLast = 'ArrowRight';
            this.typed = new core.EventEmitter();
            this.focus = new core.EventEmitter();
            this.blur = new core.EventEmitter();
            this.open = new core.EventEmitter();
            this.close = new core.EventEmitter();
            this.select = new core.EventEmitter();
            this.remove = new core.EventEmitter();
            this.navigated = new core.EventEmitter();
            this.selectionChanges = new core.EventEmitter();
            this.optionsOpened = false;
            this.actualValue = [];
            this.subjOptions = new rxjs.BehaviorSubject([]);
            this.subjSearchText = new rxjs.BehaviorSubject('');
            this.subjOptionsSelected = new rxjs.BehaviorSubject([]);
            this.subjExternalValue = new rxjs.BehaviorSubject([]);
            this.subjDefaultValue = new rxjs.BehaviorSubject([]);
            this.subjRegisterOnChange = new rxjs.Subject();
            this._focusToInput = false;
            this.isFocused = false;
            this.onChange = function (v) { return v; };
            this.onTouched = function () { return null; };
            Object.assign(this, defaultOptions);
            // differs
            this.itemsDiffer = iterableDiffers.find([]).create(null);
            this.defaultValueDiffer = iterableDiffers.find([]).create(null);
            // observers
            this.typed.subscribe(function (text) { return _this.subjSearchText.next(text); });
            this.subjOptionsSelected.subscribe(function (options) { return _this.selectionChanges.emit(options); });
            /** @type {?} */
            var cacheExternalValue;
            /** @type {?} */
            var subjActualValue = this.subjExternalValue
                .pipe(operators.map(function (v) { return cacheExternalValue = v === null ? [] : [].concat(v); }), operators.merge(this.subjOptionsSelected
                .pipe(operators.map(function (options) {
                return options.map(function (o) { return o.value; });
            }))), operators.combineLatest(this.subjDefaultValue, function (eVal, dVal) {
                /** @type {?} */
                var newVal = _.isEqual(eVal, dVal) ? [] : eVal;
                return newVal.length ? newVal : dVal;
            }), operators.distinctUntilChanged(function (x, y) { return _.isEqual(x, y); }), operators.share());
            subjActualValue
                .pipe(operators.combineLatest(this.subjRegisterOnChange, function (actualValue) { return actualValue; }))
                .subscribe(function (actualValue) {
                _this.actualValue = actualValue;
                if (!_.isEqual(actualValue, cacheExternalValue)) {
                    cacheExternalValue = actualValue;
                    if (_this.multiple) {
                        _this.onChange(actualValue);
                    }
                    else {
                        _this.onChange(actualValue.length ? actualValue[0] : null);
                    }
                }
            });
            this.subjOptions
                .pipe(operators.flatMap(function (options) {
                return rxjs.from(options)
                    .pipe(operators.flatMap(function (option) {
                    return option instanceof NgxSelectOption
                        ? rxjs.of(option)
                        : (option instanceof NgxSelectOptGroup ? rxjs.from(option.options) : rxjs.empty());
                }), operators.toArray());
            }))
                .pipe(operators.combineLatest(subjActualValue, function (optionsFlat, actualValue) {
                rxjs.from(optionsFlat)
                    .pipe(operators.filter(function (option) { return actualValue.indexOf(option.value) !== -1; }), operators.toArray(), operators.filter(function (options) { return !_.isEqual(options, _this.subjOptionsSelected.value); }))
                    .subscribe(function (options) { return _this.subjOptionsSelected.next(options); });
            }))
                .subscribe();
            this.subjOptions
                .pipe(operators.combineLatest(this.subjOptionsSelected, this.subjSearchText, function (options, selectedOptions, search) {
                _this.optionsFiltered = _this.filterOptions(search, options, selectedOptions);
                _this.cacheOptionsFilteredFlat = null;
                _this.navigateOption(ENavigation.firstIfOptionActiveInvisible);
                return selectedOptions;
            }), operators.flatMap(function (selectedOptions) {
                return _this.optionsFilteredFlat().pipe(operators.filter(function (flatOptions) {
                    return _this.autoSelectSingleOption && flatOptions.length === 1 && !selectedOptions.length;
                }));
            }))
                .subscribe(function (flatOptions) { return _this.subjOptionsSelected.next(flatOptions); });
        }
        /**
         * @param {?=} otherClassNames
         * @param {?=} useFormControl
         * @return {?}
         */
        NgxSelectComponent.prototype.setFormControlSize = /**
         * @param {?=} otherClassNames
         * @param {?=} useFormControl
         * @return {?}
         */
            function (otherClassNames, useFormControl) {
                if (otherClassNames === void 0) {
                    otherClassNames = {};
                }
                if (useFormControl === void 0) {
                    useFormControl = true;
                }
                /** @type {?} */
                var formControlExtraClasses = useFormControl ? {
                    'form-control-sm input-sm': this.size === 'small',
                    'form-control-lg input-lg': this.size === 'large'
                } : {};
                return Object.assign(formControlExtraClasses, otherClassNames);
            };
        /**
         * @return {?}
         */
        NgxSelectComponent.prototype.setBtnSize = /**
         * @return {?}
         */
            function () {
                return { 'btn-sm': this.size === 'small', 'btn-lg': this.size === 'large' };
            };
        Object.defineProperty(NgxSelectComponent.prototype, "optionsSelected", {
            get: /**
             * @return {?}
             */ function () {
                return this.subjOptionsSelected.value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} event
         * @return {?}
         */
        NgxSelectComponent.prototype.mainClicked = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                event.clickedSelectComponent = this;
                if (!this.isFocused) {
                    this.isFocused = true;
                    this.focus.emit();
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgxSelectComponent.prototype.documentClick = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event.clickedSelectComponent !== this) {
                    if (this.optionsOpened) {
                        this.optionsClose();
                        this.cd.detectChanges(); // fix error because of delay between different events
                    }
                    if (this.isFocused) {
                        this.isFocused = false;
                        this.blur.emit();
                    }
                }
            };
        /**
         * @return {?}
         */
        NgxSelectComponent.prototype.optionsFilteredFlat = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.cacheOptionsFilteredFlat) {
                    return rxjs.of(this.cacheOptionsFilteredFlat);
                }
                return rxjs.from(this.optionsFiltered)
                    .pipe(operators.flatMap(function (option) {
                    return option instanceof NgxSelectOption ? rxjs.of(option) :
                        (option instanceof NgxSelectOptGroup ? rxjs.from(option.optionsFiltered) : rxjs.empty());
                }), operators.filter(function (optionsFilteredFlat) { return !optionsFilteredFlat.disabled; }), operators.toArray(), operators.tap(function (optionsFilteredFlat) { return _this.cacheOptionsFilteredFlat = optionsFilteredFlat; }));
            };
        /**
         * @param {?} navigation
         * @return {?}
         */
        NgxSelectComponent.prototype.navigateOption = /**
         * @param {?} navigation
         * @return {?}
         */
            function (navigation) {
                var _this = this;
                this.optionsFilteredFlat()
                    .pipe(operators.map(function (options) {
                    /** @type {?} */
                    var navigated = { index: -1, activeOption: null, filteredOptionList: options };
                    /** @type {?} */
                    var newActiveIdx;
                    switch (navigation) {
                        case ENavigation.first:
                            navigated.index = 0;
                            break;
                        case ENavigation.previous:
                            newActiveIdx = options.indexOf(_this.optionActive) - 1;
                            navigated.index = newActiveIdx >= 0 ? newActiveIdx : options.length - 1;
                            break;
                        case ENavigation.next:
                            newActiveIdx = options.indexOf(_this.optionActive) + 1;
                            navigated.index = newActiveIdx < options.length ? newActiveIdx : 0;
                            break;
                        case ENavigation.last:
                            navigated.index = options.length - 1;
                            break;
                        case ENavigation.firstSelected:
                            if (_this.subjOptionsSelected.value.length) {
                                navigated.index = options.indexOf(_this.subjOptionsSelected.value[0]);
                            }
                            break;
                        case ENavigation.firstIfOptionActiveInvisible:
                            /** @type {?} */
                            var idxOfOptionActive = options.indexOf(_this.optionActive);
                            navigated.index = idxOfOptionActive > 0 ? idxOfOptionActive : 0;
                            break;
                    }
                    navigated.activeOption = options[navigated.index];
                    return navigated;
                }))
                    .subscribe(function (newNavigated) { return _this.optionActivate(newNavigated); });
            };
        /**
         * @return {?}
         */
        NgxSelectComponent.prototype.ngDoCheck = /**
         * @return {?}
         */
            function () {
                if (this.itemsDiffer.diff(this.items)) {
                    this.subjOptions.next(this.buildOptions(this.items));
                }
                /** @type {?} */
                var defVal = this.defaultValue ? [].concat(this.defaultValue) : [];
                if (this.defaultValueDiffer.diff(defVal)) {
                    this.subjDefaultValue.next(defVal);
                }
            };
        /**
         * @return {?}
         */
        NgxSelectComponent.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
            function () {
                if (this._focusToInput && this.checkInputVisibility() && this.inputElRef &&
                    this.inputElRef.nativeElement !== document.activeElement) {
                    this._focusToInput = false;
                    this.inputElRef.nativeElement.focus();
                }
            };
        /**
         * @return {?}
         */
        NgxSelectComponent.prototype.canClearNotMultiple = /**
         * @return {?}
         */
            function () {
                return this.allowClear && !!this.subjOptionsSelected.value.length &&
                    (!this.subjDefaultValue.value.length || this.subjDefaultValue.value[0] !== this.actualValue[0]);
            };
        /**
         * @return {?}
         */
        NgxSelectComponent.prototype.focusToInput = /**
         * @return {?}
         */
            function () {
                this._focusToInput = true;
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgxSelectComponent.prototype.inputKeyDown = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var keysForOpenedState = [
                    this.keyCodeToOptionsSelect,
                    this.keyCodeToNavigateFirst,
                    this.keyCodeToNavigatePrevious,
                    this.keyCodeToNavigateNext,
                    this.keyCodeToNavigateLast,
                ];
                /** @type {?} */
                var keysForClosedState = [this.keyCodeToOptionsOpen, this.keyCodeToRemoveSelected];
                if (this.optionsOpened && keysForOpenedState.indexOf(event.code) !== -1) {
                    event.preventDefault();
                    event.stopPropagation();
                    switch (event.code) {
                        case this.keyCodeToOptionsSelect:
                            this.optionSelect(this.optionActive);
                            this.navigateOption(ENavigation.next);
                            break;
                        case this.keyCodeToNavigateFirst:
                            this.navigateOption(ENavigation.first);
                            break;
                        case this.keyCodeToNavigatePrevious:
                            this.navigateOption(ENavigation.previous);
                            break;
                        case this.keyCodeToNavigateLast:
                            this.navigateOption(ENavigation.last);
                            break;
                        case this.keyCodeToNavigateNext:
                            this.navigateOption(ENavigation.next);
                            break;
                    }
                }
                else if (!this.optionsOpened && keysForClosedState.indexOf(event.code) !== -1) {
                    event.preventDefault();
                    event.stopPropagation();
                    switch (event.code) {
                        case this.keyCodeToOptionsOpen:
                            this.optionsOpen();
                            break;
                        case this.keyCodeToRemoveSelected:
                            this.optionRemove(this.subjOptionsSelected.value[this.subjOptionsSelected.value.length - 1], event);
                            break;
                    }
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgxSelectComponent.prototype.mainKeyUp = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event.code === this.keyCodeToOptionsClose) {
                    this.optionsClose();
                }
            };
        /**
         * @param {?} index
         * @param {?} option
         * @return {?}
         */
        NgxSelectComponent.prototype.trackByOption = /**
         * @param {?} index
         * @param {?} option
         * @return {?}
         */
            function (index, option) {
                return option instanceof NgxSelectOption ? option.value :
                    (option instanceof NgxSelectOptGroup ? option.label : option);
            };
        /**
         * @return {?}
         */
        NgxSelectComponent.prototype.checkInputVisibility = /**
         * @return {?}
         */
            function () {
                return (this.multiple === true) || (this.optionsOpened && !this.noAutoComplete);
            };
        /**
         * \@internal
         * @param {?=} value
         * @return {?}
         */
        NgxSelectComponent.prototype.inputKeyUp = /**
         * \@internal
         * @param {?=} value
         * @return {?}
         */
            function (value) {
                if (value === void 0) {
                    value = '';
                }
                if (!this.optionsOpened && value) {
                    this.optionsOpen(value);
                }
            };
        /**
         * \@internal
         * @param {?} value
         * @return {?}
         */
        NgxSelectComponent.prototype.doInputText = /**
         * \@internal
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (this.optionsOpened) {
                    this.typed.emit(value);
                }
            };
        /**
         * \@internal
         * @param {?=} value
         * @return {?}
         */
        NgxSelectComponent.prototype.inputClick = /**
         * \@internal
         * @param {?=} value
         * @return {?}
         */
            function (value) {
                if (value === void 0) {
                    value = '';
                }
                if (!this.optionsOpened) {
                    this.optionsOpen(value);
                }
            };
        /**
         * \@internal
         * @param {?} html
         * @return {?}
         */
        NgxSelectComponent.prototype.sanitize = /**
         * \@internal
         * @param {?} html
         * @return {?}
         */
            function (html) {
                return html ? this.sanitizer.bypassSecurityTrustHtml(html) : null;
            };
        /**
         * \@internal
         * @param {?} option
         * @return {?}
         */
        NgxSelectComponent.prototype.highlightOption = /**
         * \@internal
         * @param {?} option
         * @return {?}
         */
            function (option) {
                if (this.inputElRef) {
                    return option.renderText(this.sanitizer, this.inputElRef.nativeElement.value);
                }
                return option.renderText(this.sanitizer, '');
            };
        /**
         * \@internal
         * @param {?} option
         * @param {?=} event
         * @return {?}
         */
        NgxSelectComponent.prototype.optionSelect = /**
         * \@internal
         * @param {?} option
         * @param {?=} event
         * @return {?}
         */
            function (option, event) {
                if (event === void 0) {
                    event = null;
                }
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                if (option && !option.disabled) {
                    this.subjOptionsSelected.next((this.multiple ? this.subjOptionsSelected.value : []).concat([option]));
                    this.select.emit(option.value);
                    this.optionsClose();
                    this.onTouched();
                }
            };
        /**
         * \@internal
         * @param {?} option
         * @param {?} event
         * @return {?}
         */
        NgxSelectComponent.prototype.optionRemove = /**
         * \@internal
         * @param {?} option
         * @param {?} event
         * @return {?}
         */
            function (option, event) {
                if (!this.disabled && option) {
                    event.stopPropagation();
                    this.subjOptionsSelected.next((this.multiple ? this.subjOptionsSelected.value : []).filter(function (o) { return o !== option; }));
                    this.remove.emit(option.value);
                }
            };
        /**
         * \@internal
         * @param {?} option
         * @param {?} element
         * @return {?}
         */
        NgxSelectComponent.prototype.isOptionActive = /**
         * \@internal
         * @param {?} option
         * @param {?} element
         * @return {?}
         */
            function (option, element) {
                if (this.optionActive === option) {
                    this.ensureVisibleElement(element);
                    return true;
                }
                return false;
            };
        /**
         * \@internal
         * @param {?} navigated
         * @return {?}
         */
        NgxSelectComponent.prototype.optionActivate = /**
         * \@internal
         * @param {?} navigated
         * @return {?}
         */
            function (navigated) {
                if ((this.optionActive !== navigated.activeOption) &&
                    (!navigated.activeOption || !navigated.activeOption.disabled)) {
                    this.optionActive = navigated.activeOption;
                    this.navigated.emit(navigated);
                }
            };
        /**
         * @param {?} search
         * @param {?} options
         * @param {?} selectedOptions
         * @return {?}
         */
        NgxSelectComponent.prototype.filterOptions = /**
         * @param {?} search
         * @param {?} options
         * @param {?} selectedOptions
         * @return {?}
         */
            function (search, options, selectedOptions) {
                var _this = this;
                /** @type {?} */
                var regExp = new RegExp(escapeString$1(search), 'i');
                /** @type {?} */
                var filterOption = function (option) {
                    if (_this.searchCallback) {
                        return _this.searchCallback(search, option);
                    }
                    return (!search || regExp.test(option.text)) && (!_this.multiple || selectedOptions.indexOf(option) === -1);
                };
                return options.filter(function (option) {
                    if (option instanceof NgxSelectOption) {
                        return filterOption(/** @type {?} */ (option));
                    }
                    else if (option instanceof NgxSelectOptGroup) {
                        /** @type {?} */
                        var subOp = /** @type {?} */ (option);
                        subOp.filter(function (subOption) { return filterOption(subOption); });
                        return subOp.optionsFiltered.length;
                    }
                });
            };
        /**
         * @param {?} element
         * @return {?}
         */
        NgxSelectComponent.prototype.ensureVisibleElement = /**
         * @param {?} element
         * @return {?}
         */
            function (element) {
                if (this.choiceMenuElRef && this.cacheElementOffsetTop !== element.offsetTop) {
                    this.cacheElementOffsetTop = element.offsetTop;
                    /** @type {?} */
                    var container = this.choiceMenuElRef.nativeElement;
                    if (this.cacheElementOffsetTop < container.scrollTop) {
                        container.scrollTop = this.cacheElementOffsetTop;
                    }
                    else if (this.cacheElementOffsetTop + element.offsetHeight > container.scrollTop + container.clientHeight) {
                        container.scrollTop = this.cacheElementOffsetTop + element.offsetHeight - container.clientHeight;
                    }
                }
            };
        /**
         * @param {?=} search
         * @return {?}
         */
        NgxSelectComponent.prototype.optionsOpen = /**
         * @param {?=} search
         * @return {?}
         */
            function (search) {
                if (search === void 0) {
                    search = '';
                }
                if (!this.disabled) {
                    this.optionsOpened = true;
                    this.subjSearchText.next(search);
                    if (!this.multiple && this.subjOptionsSelected.value.length) {
                        this.navigateOption(ENavigation.firstSelected);
                    }
                    else {
                        this.navigateOption(ENavigation.first);
                    }
                    this.focusToInput();
                    this.open.emit();
                }
            };
        /**
         * @return {?}
         */
        NgxSelectComponent.prototype.optionsClose = /**
         * @return {?}
         */
            function () {
                this.optionsOpened = false;
                // if (focusToHost) {
                //     const x = window.scrollX, y = window.scrollY;
                //     this.mainElRef.nativeElement.focus();
                //     window.scrollTo(x, y);
                // }
                this.close.emit();
                if (this.autoClearSearch && this.multiple && this.inputElRef) {
                    this.inputElRef.nativeElement.value = null;
                }
            };
        /**
         * @param {?} data
         * @return {?}
         */
        NgxSelectComponent.prototype.buildOptions = /**
         * @param {?} data
         * @return {?}
         */
            function (data) {
                var _this = this;
                /** @type {?} */
                var result = [];
                if (Array.isArray(data)) {
                    /** @type {?} */
                    var option_1 = void 0;
                    data.forEach(function (item) {
                        /** @type {?} */
                        var isOptGroup = typeof item === 'object' && item !== null &&
                            propertyExists(item, _this.optGroupLabelField) && propertyExists(item, _this.optGroupOptionsField) &&
                            Array.isArray(item[_this.optGroupOptionsField]);
                        if (isOptGroup) {
                            /** @type {?} */
                            var optGroup_1 = new NgxSelectOptGroup(item[_this.optGroupLabelField]);
                            item[_this.optGroupOptionsField].forEach(function (subOption) {
                                if (option_1 = _this.buildOption(subOption, optGroup_1)) {
                                    optGroup_1.options.push(option_1);
                                }
                            });
                            result.push(optGroup_1);
                        }
                        else if (option_1 = _this.buildOption(item, null)) {
                            result.push(option_1);
                        }
                    });
                }
                return result;
            };
        /**
         * @param {?} data
         * @param {?} parent
         * @return {?}
         */
        NgxSelectComponent.prototype.buildOption = /**
         * @param {?} data
         * @param {?} parent
         * @return {?}
         */
            function (data, parent) {
                /** @type {?} */
                var value;
                /** @type {?} */
                var text;
                /** @type {?} */
                var disabled;
                if (typeof data === 'string' || typeof data === 'number') {
                    value = text = data;
                    disabled = false;
                }
                else if (typeof data === 'object' && data !== null &&
                    (propertyExists(data, this.optionValueField) || propertyExists(data, this.optionTextField))) {
                    value = propertyExists(data, this.optionValueField) ? data[this.optionValueField] : data[this.optionTextField];
                    text = propertyExists(data, this.optionTextField) ? data[this.optionTextField] : data[this.optionValueField];
                    disabled = propertyExists(data, 'disabled') ? data['disabled'] : false;
                }
                else {
                    return null;
                }
                return new NgxSelectOption(value, text, disabled, data, parent);
            };
        /**
         * @param {?} obj
         * @return {?}
         */
        NgxSelectComponent.prototype.writeValue = /**
         * @param {?} obj
         * @return {?}
         */
            function (obj) {
                this.subjExternalValue.next(obj);
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgxSelectComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChange = fn;
                this.subjRegisterOnChange.next();
            };
        /**
         * @param {?} fn
         * @return {?}
         */
        NgxSelectComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onTouched = fn;
            };
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        NgxSelectComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
            function (isDisabled) {
                this.disabled = isDisabled;
            };
        NgxSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-select',
                        template: "<div #main [tabindex]=\"disabled? -1: 0\" class=\"ngx-select dropdown\"\r\n     [ngClass]=\"setFormControlSize({\r\n        'ngx-select_multiple form-control': multiple === true,\r\n        'open show': optionsOpened && optionsFiltered.length\r\n     }, multiple === true)\"\r\n     (click)=\"mainClicked($event)\" (focusin)=\"mainClicked($event)\"\r\n     (focus)=\"focusToInput()\" (keydown)=\"inputKeyDown($event)\"\r\n     (keyup)=\"mainKeyUp($event)\">\r\n    <div [ngClass]=\"{ 'ngx-select__disabled': disabled}\"></div>\r\n\r\n    <!-- single selected item -->\r\n    <div class=\"ngx-select__selected\"\r\n         *ngIf=\"(multiple === false) && (!optionsOpened || noAutoComplete)\">\r\n        <div class=\"ngx-select__toggle btn form-control\" [ngClass]=\"setFormControlSize(setBtnSize())\"\r\n             (click)=\"optionsOpen()\">\r\n\r\n            <span *ngIf=\"!optionsSelected.length\" class=\"ngx-select__placeholder text-muted\">\r\n                <span [innerHtml]=\"placeholder\"></span>\r\n            </span>\r\n            <span *ngIf=\"optionsSelected.length\"\r\n                  class=\"ngx-select__selected-single pull-left float-left\"\r\n                  [ngClass]=\"{'ngx-select__allow-clear': allowClear}\">\r\n                <ng-container [ngTemplateOutlet]=\"templateSelectedOption || defaultTemplateOption\"\r\n                              [ngTemplateOutletContext]=\"{$implicit: optionsSelected[0], index: 0,\r\n                                                          text: sanitize(optionsSelected[0].text)}\">\r\n                </ng-container>\r\n            </span>\r\n            <span class=\"ngx-select__toggle-buttons\">\r\n                <a class=\"ngx-select__clear btn btn-sm btn-link\" *ngIf=\"canClearNotMultiple()\"\r\n                   [ngClass]=\"setBtnSize()\"\r\n                   (click)=\"optionRemove(optionsSelected[0], $event)\">\r\n                    <i class=\"ngx-select__clear-icon\"></i>\r\n                </a>\r\n                <i class=\"dropdown-toggle\"></i>\r\n                <i class=\"ngx-select__toggle-caret caret\"></i>\r\n            </span>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- multiple selected items -->\r\n    <div class=\"ngx-select__selected\" *ngIf=\"multiple === true\">\r\n        <span *ngFor=\"let option of optionsSelected; trackBy: trackByOption; let idx = index\">\r\n            <span tabindex=\"-1\" [ngClass]=\"setBtnSize()\"\r\n                  class=\"ngx-select__selected-plural btn btn-default btn-secondary btn-xs\">\r\n\r\n                <ng-container [ngTemplateOutlet]=\"templateSelectedOption || defaultTemplateOption\"\r\n                              [ngTemplateOutletContext]=\"{$implicit: option, index: idx, text: sanitize(option.text)}\">\r\n                </ng-container>\r\n\r\n                <a class=\"ngx-select__clear btn btn-sm btn-link pull-right float-right\" [ngClass]=\"setBtnSize()\"\r\n                   (click)=\"optionRemove(option, $event)\">\r\n                    <i class=\"ngx-select__clear-icon\"></i>\r\n                </a>\r\n            </span>\r\n        </span>\r\n    </div>\r\n\r\n    <!-- live search an item from the list -->\r\n    <input #input type=\"text\" class=\"ngx-select__search form-control\" [ngClass]=\"setFormControlSize()\"\r\n           *ngIf=\"checkInputVisibility()\"\r\n           [tabindex]=\"multiple === false? -1: 0\"\r\n           (keydown)=\"inputKeyDown($event)\"\r\n           (keyup)=\"inputKeyUp(input.value)\"\r\n           (input)=\"doInputText(input.value)\"\r\n           [disabled]=\"disabled\"\r\n           [placeholder]=\"optionsSelected.length? '': placeholder\"\r\n           (click)=\"inputClick(input.value)\"\r\n           autocomplete=\"off\"\r\n           autocorrect=\"off\"\r\n           autocapitalize=\"off\"\r\n           spellcheck=\"false\"\r\n           role=\"combobox\">\r\n\r\n    <!-- options template -->\r\n    <ul #choiceMenu role=\"menu\" *ngIf=\"isFocused\" class=\"ngx-select__choices dropdown-menu\"\r\n        [class.show]=\"optionsOpened\">\r\n        <li class=\"ngx-select__item-group\" role=\"menuitem\"\r\n            *ngFor=\"let opt of optionsFiltered; trackBy: trackByOption; let idxGroup=index\">\r\n            <div class=\"divider dropdown-divider\" *ngIf=\"opt.type === 'optgroup' && (idxGroup > 0)\"></div>\r\n            <div class=\"dropdown-header\" *ngIf=\"opt.type === 'optgroup'\">{{opt.label}}</div>\r\n\r\n            <a href=\"#\" #choiceItem class=\"ngx-select__item dropdown-item\"\r\n               *ngFor=\"let option of (opt.optionsFiltered || [opt]); trackBy: trackByOption; let idxOption = index\"\r\n               [ngClass]=\"{\r\n                    'ngx-select__item_active active': isOptionActive(option, choiceItem),\r\n                    'ngx-select__item_disabled disabled': option.disabled\r\n               }\"\r\n               (mouseenter)=\"optionActivate({\r\n                    activeOption: option,\r\n                    filteredOptionList: optionsFiltered,\r\n                    index: optionsFiltered.indexOf(option)\r\n               })\"\r\n               (click)=\"optionSelect(option, $event)\">\r\n                <ng-container [ngTemplateOutlet]=\"templateOption || defaultTemplateOption\"\r\n                              [ngTemplateOutletContext]=\"{$implicit: option, text: highlightOption(option),\r\n                              index: idxGroup, subIndex: idxOption}\"></ng-container>\r\n            </a>\r\n        </li>\r\n        <li class=\"ngx-select__item ngx-select__item_no-found dropdown-header\" *ngIf=\"!optionsFiltered.length\">\r\n            <ng-container [ngTemplateOutlet]=\"templateOptionNotFound || defaultTemplateOptionNotFound\"></ng-container>\r\n        </li>\r\n    </ul>\r\n\r\n    <!--Default templates-->\r\n    <ng-template #defaultTemplateOption let-text=\"text\">\r\n        <span [innerHtml]=\"text\"></span>\r\n    </ng-template>\r\n\r\n    <ng-template #defaultTemplateOptionNotFound>\r\n        {{noResultsFound}}\r\n    </ng-template>\r\n\r\n</div>",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(function () { return NgxSelectComponent; }),
                                multi: true
                            }
                        ],
                        styles: [".ngx-select_multiple{height:auto;padding:3px 3px 0}.ngx-select_multiple .ngx-select__search{background-color:transparent!important;border:none;outline:0;box-shadow:none;height:1.6666em;padding:0;margin-bottom:3px}.ngx-select__disabled{background-color:#eceeef;border-radius:4px;position:absolute;width:100%;height:100%;z-index:5;opacity:.6;top:0;left:0;cursor:not-allowed}.ngx-select__toggle{outline:0;position:relative;text-align:left!important;color:#333;background-color:#fff;border-color:#ccc;display:inline-flex;align-items:stretch;justify-content:space-between}.ngx-select__toggle:hover{color:#333;background-color:#e6e6e6;border-color:#adadad}.ngx-select__toggle-buttons{flex-shrink:0;display:flex;align-items:center}.ngx-select__toggle-caret{position:absolute;height:10px;top:50%;right:10px;margin-top:-2px}.ngx-select__placeholder{float:left}.ngx-select__clear{margin-right:10px;padding:0;border:none}.ngx-select_multiple .ngx-select__clear{line-height:initial;margin-left:5px;margin-right:0;color:#000;opacity:.5}.ngx-select__clear-icon{display:inline-block;font-size:inherit;cursor:pointer;position:relative;width:1em;height:.75em;padding:0}.ngx-select__clear-icon:after,.ngx-select__clear-icon:before{content:'';position:absolute;border-top:3px solid;width:100%;top:50%;left:0;margin-top:-1px}.ngx-select__clear-icon:before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ngx-select__clear-icon:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.ngx-select__choices{width:100%;height:auto;max-height:200px;overflow-x:hidden;margin-top:0;position:absolute}.ngx-select_multiple .ngx-select__choices{margin-top:1px}.ngx-select__item{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;white-space:nowrap;cursor:pointer;text-decoration:none}.ngx-select__item_disabled,.ngx-select__item_no-found{cursor:default}.ngx-select__item_active{color:#fff;outline:0;background-color:#428bca}.ngx-select__selected-plural,.ngx-select__selected-single{display:inline-flex;align-items:center;overflow:hidden}.ngx-select__selected-plural span,.ngx-select__selected-single span{overflow:hidden;text-overflow:ellipsis}.ngx-select__selected-plural{outline:0;margin:0 3px 3px 0}.input-group>.dropdown{position:static}"]
                    }] }
        ];
        /** @nocollapse */
        NgxSelectComponent.ctorParameters = function () {
            return [
                { type: core.IterableDiffers },
                { type: platformBrowser.DomSanitizer },
                { type: core.ChangeDetectorRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [NGX_SELECT_OPTIONS,] }, { type: core.Optional }] }
            ];
        };
        NgxSelectComponent.propDecorators = {
            items: [{ type: core.Input }],
            optionValueField: [{ type: core.Input }],
            optionTextField: [{ type: core.Input }],
            optGroupLabelField: [{ type: core.Input }],
            optGroupOptionsField: [{ type: core.Input }],
            multiple: [{ type: core.Input }],
            allowClear: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            noAutoComplete: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            defaultValue: [{ type: core.Input }],
            autoSelectSingleOption: [{ type: core.Input }],
            autoClearSearch: [{ type: core.Input }],
            noResultsFound: [{ type: core.Input }],
            size: [{ type: core.Input }],
            searchCallback: [{ type: core.Input }],
            typed: [{ type: core.Output }],
            focus: [{ type: core.Output }],
            blur: [{ type: core.Output }],
            open: [{ type: core.Output }],
            close: [{ type: core.Output }],
            select: [{ type: core.Output }],
            remove: [{ type: core.Output }],
            navigated: [{ type: core.Output }],
            selectionChanges: [{ type: core.Output }],
            mainElRef: [{ type: core.ViewChild, args: ['main',] }],
            inputElRef: [{ type: core.ViewChild, args: ['input',] }],
            choiceMenuElRef: [{ type: core.ViewChild, args: ['choiceMenu',] }],
            templateOption: [{ type: core.ContentChild, args: [NgxSelectOptionDirective, { read: core.TemplateRef },] }],
            templateSelectedOption: [{ type: core.ContentChild, args: [NgxSelectOptionSelectedDirective, { read: core.TemplateRef },] }],
            templateOptionNotFound: [{ type: core.ContentChild, args: [NgxSelectOptionNotFoundDirective, { read: core.TemplateRef },] }],
            documentClick: [{ type: core.HostListener, args: ['document:focusin', ['$event'],] }, { type: core.HostListener, args: ['document:click', ['$event'],] }]
        };
        return NgxSelectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxSelectModule = /** @class */ (function () {
        function NgxSelectModule() {
        }
        /**
         * @param {?} options
         * @return {?}
         */
        NgxSelectModule.forRoot = /**
         * @param {?} options
         * @return {?}
         */
            function (options) {
                return {
                    ngModule: NgxSelectModule,
                    providers: [{ provide: NGX_SELECT_OPTIONS, useValue: options }]
                };
            };
        NgxSelectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [NgxSelectComponent,
                            NgxSelectOptionDirective, NgxSelectOptionSelectedDirective, NgxSelectOptionNotFoundDirective
                        ],
                        exports: [NgxSelectComponent,
                            NgxSelectOptionDirective, NgxSelectOptionSelectedDirective, NgxSelectOptionNotFoundDirective
                        ]
                    },] }
        ];
        return NgxSelectModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgxSelectModule = NgxSelectModule;
    exports.NGX_SELECT_OPTIONS = NGX_SELECT_OPTIONS;
    exports.NgxSelectComponent = NgxSelectComponent;
    exports.NgxSelectOption = NgxSelectOption;
    exports.NgxSelectOptGroup = NgxSelectOptGroup;
    exports.NgxSelectOptionDirective = NgxSelectOptionDirective;
    exports.NgxSelectOptionSelectedDirective = NgxSelectOptionSelectedDirective;
    exports.NgxSelectOptionNotFoundDirective = NgxSelectOptionNotFoundDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNlbGVjdC1leC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1zZWxlY3QtZXgvbmd4LXNlbGVjdC9uZ3gtc2VsZWN0LmNsYXNzZXMudHMiLCJuZzovL25neC1zZWxlY3QtZXgvbmd4LXNlbGVjdC9uZ3gtdGVtcGxhdGVzLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LXNlbGVjdC1leC9uZ3gtc2VsZWN0L25neC1zZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtc2VsZWN0LWV4L25neC1zZWxlY3Qvbmd4LXNlbGVjdC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVIdG1sfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0ICogYXMgZXNjYXBlU3RyaW5nTnMgZnJvbSAnZXNjYXBlLXN0cmluZy1yZWdleHAnO1xyXG5pbXBvcnQge0lOZ3hTZWxlY3RPcHRHcm91cCwgSU5neFNlbGVjdE9wdGlvbiwgSU5neFNlbGVjdE9wdGlvbkJhc2UsIFROZ3hTZWxlY3RPcHRpb25UeXBlfSBmcm9tICcuL25neC1zZWxlY3QuaW50ZXJmYWNlcyc7XHJcblxyXG5jb25zdCBlc2NhcGVTdHJpbmcgPSBlc2NhcGVTdHJpbmdOcztcclxuXHJcbmV4cG9ydCBjbGFzcyBOZ3hTZWxlY3RPcHRpb24gaW1wbGVtZW50cyBJTmd4U2VsZWN0T3B0aW9uLCBJTmd4U2VsZWN0T3B0aW9uQmFzZSB7XHJcbiAgICByZWFkb25seSB0eXBlOiBUTmd4U2VsZWN0T3B0aW9uVHlwZSA9ICdvcHRpb24nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIHRleHQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBkYXRhOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9wYXJlbnQ6IE5neFNlbGVjdE9wdEdyb3VwID0gbnVsbCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IE5neFNlbGVjdE9wdEdyb3VwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FjaGVIaWdobGlnaHRUZXh0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGNhY2hlUmVuZGVyZWRUZXh0OiBTYWZlSHRtbCA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHJlbmRlclRleHQoc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIGhpZ2hsaWdodFRleHQ6IHN0cmluZyk6IFNhZmVIdG1sIHtcclxuICAgICAgICBpZiAodGhpcy5jYWNoZUhpZ2hsaWdodFRleHQgIT09IGhpZ2hsaWdodFRleHQgfHwgdGhpcy5jYWNoZVJlbmRlcmVkVGV4dCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlSGlnaGxpZ2h0VGV4dCA9IGhpZ2hsaWdodFRleHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlSGlnaGxpZ2h0VGV4dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVJlbmRlcmVkVGV4dCA9IHNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCgodGhpcy50ZXh0ICsgJycpLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChlc2NhcGVTdHJpbmcodGhpcy5jYWNoZUhpZ2hsaWdodFRleHQpLCAnZ2knKSwgJzxzdHJvbmc+JCY8L3N0cm9uZz4nXHJcbiAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVSZW5kZXJlZFRleHQgPSBzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGhpcy50ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZVJlbmRlcmVkVGV4dDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5neFNlbGVjdE9wdEdyb3VwIGltcGxlbWVudHMgSU5neFNlbGVjdE9wdEdyb3VwLCBJTmd4U2VsZWN0T3B0aW9uQmFzZSB7XHJcbiAgICByZWFkb25seSB0eXBlOiBUTmd4U2VsZWN0T3B0aW9uVHlwZSA9ICdvcHRncm91cCc7XHJcblxyXG4gICAgcHVibGljIG9wdGlvbnNGaWx0ZXJlZDogTmd4U2VsZWN0T3B0aW9uW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGxhYmVsOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10gPSBbXSkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyKCgpID0+IHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXIoY2FsbGJhY2tGbjogKHZhbHVlOiBOZ3hTZWxlY3RPcHRpb24pID0+IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3B0aW9uc0ZpbHRlcmVkID0gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pID0+IGNhbGxiYWNrRm4ob3B0aW9uKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFRTZWxlY3RPcHRpb24gPSBOZ3hTZWxlY3RPcHRHcm91cCB8IE5neFNlbGVjdE9wdGlvbjtcclxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25neC1zZWxlY3Qtb3B0aW9uXSd9KVxyXG5leHBvcnQgY2xhc3MgTmd4U2VsZWN0T3B0aW9uRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge1xyXG4gICAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ3gtc2VsZWN0LW9wdGlvbi1zZWxlY3RlZF0nfSlcclxuZXhwb3J0IGNsYXNzIE5neFNlbGVjdE9wdGlvblNlbGVjdGVkRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge1xyXG4gICAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tuZ3gtc2VsZWN0LW9wdGlvbi1ub3QtZm91bmRdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ3hTZWxlY3RPcHRpb25Ob3RGb3VuZERpcmVjdGl2ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgRG9DaGVjaywgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLFxyXG4gICAgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciwgSXRlcmFibGVEaWZmZXIsIEl0ZXJhYmxlRGlmZmVycywgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbnRlbnRDaGlsZCxcclxuICAgIFRlbXBsYXRlUmVmLCBPcHRpb25hbCwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQge1N1YmplY3QsIE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgb2YsIGVtcHR5LCBmcm9tfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHttYXAsIG1lcmdlLCBjb21iaW5lTGF0ZXN0LCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2hhcmUsIHRhcCwgZmxhdE1hcCwgZmlsdGVyLCB0b0FycmF5fSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgKiBhcyBsb2Rhc2hOcyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGVTdHJpbmdOcyBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XHJcbmltcG9ydCB7Tmd4U2VsZWN0T3B0R3JvdXAsIE5neFNlbGVjdE9wdGlvbiwgVFNlbGVjdE9wdGlvbn0gZnJvbSAnLi9uZ3gtc2VsZWN0LmNsYXNzZXMnO1xyXG5pbXBvcnQge05neFNlbGVjdE9wdGlvbkRpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uTm90Rm91bmREaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvblNlbGVjdGVkRGlyZWN0aXZlfSBmcm9tICcuL25neC10ZW1wbGF0ZXMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHtJTmd4T3B0aW9uTmF2aWdhdGVkLCBJTmd4U2VsZWN0T3B0aW9uLCBJTmd4U2VsZWN0T3B0aW9uc30gZnJvbSAnLi9uZ3gtc2VsZWN0LmludGVyZmFjZXMnO1xyXG5cclxuY29uc3QgXyA9IGxvZGFzaE5zO1xyXG5jb25zdCBlc2NhcGVTdHJpbmcgPSBlc2NhcGVTdHJpbmdOcztcclxuXHJcbmV4cG9ydCBjb25zdCBOR1hfU0VMRUNUX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignTkdYX1NFTEVDVF9PUFRJT05TJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOZ3hTZWxlY3RDb21wb25lbnRNb3VzZUV2ZW50IGV4dGVuZHMgTW91c2VFdmVudCB7XHJcbiAgICBjbGlja2VkU2VsZWN0Q29tcG9uZW50PzogTmd4U2VsZWN0Q29tcG9uZW50O1xyXG59XHJcblxyXG5lbnVtIEVOYXZpZ2F0aW9uIHtcclxuICAgIGZpcnN0LCBwcmV2aW91cywgbmV4dCwgbGFzdCxcclxuICAgIGZpcnN0U2VsZWN0ZWQsIGZpcnN0SWZPcHRpb25BY3RpdmVJbnZpc2libGVcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvcGVydHlFeGlzdHMob2JqOiBPYmplY3QsIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gcHJvcGVydHlOYW1lIGluIG9iajtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1zZWxlY3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4U2VsZWN0Q29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBJTmd4U2VsZWN0T3B0aW9ucywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIERvQ2hlY2ssIEFmdGVyQ29udGVudENoZWNrZWQge1xyXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1zOiBhbnlbXTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25WYWx1ZUZpZWxkID0gJ2lkJztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25UZXh0RmllbGQgPSAndGV4dCc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgb3B0R3JvdXBMYWJlbEZpZWxkID0gJ2xhYmVsJztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvcHRHcm91cE9wdGlvbnNGaWVsZCA9ICdvcHRpb25zJztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIGFsbG93Q2xlYXIgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlciA9ICcnO1xyXG4gICAgQElucHV0KCkgcHVibGljIG5vQXV0b0NvbXBsZXRlID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBkZWZhdWx0VmFsdWU6IGFueVtdID0gW107XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYXV0b1NlbGVjdFNpbmdsZU9wdGlvbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIGF1dG9DbGVhclNlYXJjaCA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIG5vUmVzdWx0c0ZvdW5kID0gJ05vIHJlc3VsdHMgZm91bmQnO1xyXG4gICAgQElucHV0KCkgcHVibGljIHNpemU6ICdzbWFsbCcgfCAnZGVmYXVsdCcgfCAnbGFyZ2UnID0gJ2RlZmF1bHQnO1xyXG4gICAgQElucHV0KCkgcHVibGljIHNlYXJjaENhbGxiYWNrOiAoc2VhcmNoOiBzdHJpbmcsIGl0ZW06IElOZ3hTZWxlY3RPcHRpb24pID0+IGJvb2xlYW47XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvUmVtb3ZlU2VsZWN0ZWQgPSAnRGVsZXRlJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9PcHRpb25zT3BlbiA9ICdFbnRlcic7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvT3B0aW9uc0Nsb3NlID0gJ0VzY2FwZSc7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvT3B0aW9uc1NlbGVjdCA9ICdFbnRlcic7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvTmF2aWdhdGVGaXJzdCA9ICdBcnJvd0xlZnQnO1xyXG4gICAgcHVibGljIGtleUNvZGVUb05hdmlnYXRlUHJldmlvdXMgPSAnQXJyb3dVcCc7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvTmF2aWdhdGVOZXh0ID0gJ0Fycm93RG93bic7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvTmF2aWdhdGVMYXN0ID0gJ0Fycm93UmlnaHQnO1xyXG5cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgdHlwZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgcmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG5hdmlnYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SU5neE9wdGlvbk5hdmlnYXRlZD4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2VsZWN0aW9uQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXI8SU5neFNlbGVjdE9wdGlvbltdPigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ21haW4nKSBwcm90ZWN0ZWQgbWFpbkVsUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnKSBwcm90ZWN0ZWQgaW5wdXRFbFJlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2Nob2ljZU1lbnUnKSBwcm90ZWN0ZWQgY2hvaWNlTWVudUVsUmVmOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoTmd4U2VsZWN0T3B0aW9uRGlyZWN0aXZlLCB7cmVhZDogVGVtcGxhdGVSZWZ9KSB0ZW1wbGF0ZU9wdGlvbjogTmd4U2VsZWN0T3B0aW9uRGlyZWN0aXZlO1xyXG4gICAgQENvbnRlbnRDaGlsZChOZ3hTZWxlY3RPcHRpb25TZWxlY3RlZERpcmVjdGl2ZSwge3JlYWQ6IFRlbXBsYXRlUmVmfSkgdGVtcGxhdGVTZWxlY3RlZE9wdGlvbjogTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmU7XHJcbiAgICBAQ29udGVudENoaWxkKE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlLCB7cmVhZDogVGVtcGxhdGVSZWZ9KSB0ZW1wbGF0ZU9wdGlvbk5vdEZvdW5kOiBOZ3hTZWxlY3RPcHRpb25Ob3RGb3VuZERpcmVjdGl2ZTtcclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uc09wZW5lZCA9IGZhbHNlO1xyXG4gICAgcHVibGljIG9wdGlvbnNGaWx0ZXJlZDogVFNlbGVjdE9wdGlvbltdO1xyXG5cclxuICAgIHByaXZhdGUgb3B0aW9uQWN0aXZlOiBOZ3hTZWxlY3RPcHRpb247XHJcbiAgICBwcml2YXRlIGl0ZW1zRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxhbnk+O1xyXG4gICAgcHJpdmF0ZSBkZWZhdWx0VmFsdWVEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPGFueVtdPjtcclxuICAgIHByaXZhdGUgYWN0dWFsVmFsdWU6IGFueVtdID0gW107XHJcblxyXG4gICAgcHVibGljIHN1YmpPcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUU2VsZWN0T3B0aW9uW10+KFtdKTtcclxuICAgIHByaXZhdGUgc3VialNlYXJjaFRleHQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG5cclxuICAgIHByaXZhdGUgc3Viak9wdGlvbnNTZWxlY3RlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Tmd4U2VsZWN0T3B0aW9uW10+KFtdKTtcclxuICAgIHByaXZhdGUgc3ViakV4dGVybmFsVmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueVtdPihbXSk7XHJcbiAgICBwcml2YXRlIHN1YmpEZWZhdWx0VmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueVtdPihbXSk7XHJcbiAgICBwcml2YXRlIHN1YmpSZWdpc3Rlck9uQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgICBwcml2YXRlIGNhY2hlT3B0aW9uc0ZpbHRlcmVkRmxhdDogTmd4U2VsZWN0T3B0aW9uW107XHJcbiAgICBwcml2YXRlIGNhY2hlRWxlbWVudE9mZnNldFRvcDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX2ZvY3VzVG9JbnB1dCA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzRm9jdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICAgIEBJbmplY3QoTkdYX1NFTEVDVF9PUFRJT05TKSBAT3B0aW9uYWwoKSBkZWZhdWx0T3B0aW9uczogSU5neFNlbGVjdE9wdGlvbnMpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gZGlmZmVyc1xyXG4gICAgICAgIHRoaXMuaXRlbXNEaWZmZXIgPSBpdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlPGFueT4obnVsbCk7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0VmFsdWVEaWZmZXIgPSBpdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlPGFueT4obnVsbCk7XHJcblxyXG4gICAgICAgIC8vIG9ic2VydmVyc1xyXG4gICAgICAgIHRoaXMudHlwZWQuc3Vic2NyaWJlKCh0ZXh0OiBzdHJpbmcpID0+IHRoaXMuc3VialNlYXJjaFRleHQubmV4dCh0ZXh0KSk7XHJcbiAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnN1YnNjcmliZSgob3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+IHRoaXMuc2VsZWN0aW9uQ2hhbmdlcy5lbWl0KG9wdGlvbnMpKTtcclxuICAgICAgICBsZXQgY2FjaGVFeHRlcm5hbFZhbHVlOiBhbnlbXTtcclxuICAgICAgICBjb25zdCBzdWJqQWN0dWFsVmFsdWUgPSB0aGlzLnN1YmpFeHRlcm5hbFZhbHVlXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKCh2OiBhbnlbXSkgPT4gY2FjaGVFeHRlcm5hbFZhbHVlID0gdiA9PT0gbnVsbCA/IFtdIDogW10uY29uY2F0KHYpKSxcclxuICAgICAgICAgICAgICAgIG1lcmdlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoKG9wdGlvbnM6IE5neFNlbGVjdE9wdGlvbltdKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5tYXAoKG86IE5neFNlbGVjdE9wdGlvbikgPT4gby52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMuc3ViakRlZmF1bHRWYWx1ZSwgKGVWYWw6IGFueVtdLCBkVmFsOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VmFsID0gXy5pc0VxdWFsKGVWYWwsIGRWYWwpID8gW10gOiBlVmFsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbC5sZW5ndGggPyBuZXdWYWwgOiBkVmFsO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoeCwgeSkgPT4gXy5pc0VxdWFsKHgsIHkpKSxcclxuICAgICAgICAgICAgICAgIHNoYXJlKClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgc3ViakFjdHVhbFZhbHVlXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLnN1YmpSZWdpc3Rlck9uQ2hhbmdlLCAoYWN0dWFsVmFsdWU6IGFueVtdKSA9PiBhY3R1YWxWYWx1ZSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChhY3R1YWxWYWx1ZTogYW55W10pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsVmFsdWUgPSBhY3R1YWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICghXy5pc0VxdWFsKGFjdHVhbFZhbHVlLCBjYWNoZUV4dGVybmFsVmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVFeHRlcm5hbFZhbHVlID0gYWN0dWFsVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShhY3R1YWxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShhY3R1YWxWYWx1ZS5sZW5ndGggPyBhY3R1YWxWYWx1ZVswXSA6IG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3Viak9wdGlvbnNcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBmbGF0TWFwKChvcHRpb25zOiBUU2VsZWN0T3B0aW9uW10pID0+IGZyb20ob3B0aW9ucylcclxuICAgICAgICAgICAgICAgIC5waXBlKGZsYXRNYXAoKG9wdGlvbjogVFNlbGVjdE9wdGlvbikgPT4gb3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgPyBvZihvcHRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgOiAob3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0R3JvdXAgPyBmcm9tKG9wdGlvbi5vcHRpb25zKSA6IGVtcHR5KCkpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgdG9BcnJheSgpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgY29tYmluZUxhdGVzdChzdWJqQWN0dWFsVmFsdWUsIChvcHRpb25zRmxhdDogTmd4U2VsZWN0T3B0aW9uW10sIGFjdHVhbFZhbHVlOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb20ob3B0aW9uc0ZsYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoKG9wdGlvbjogTmd4U2VsZWN0T3B0aW9uKSA9PiBhY3R1YWxWYWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgIT09IC0xKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvQXJyYXkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcigob3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+ICFfLmlzRXF1YWwob3B0aW9ucywgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlKSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKG9wdGlvbnM6IE5neFNlbGVjdE9wdGlvbltdKSA9PiB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQubmV4dChvcHRpb25zKSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1xyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLCB0aGlzLnN1YmpTZWFyY2hUZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIChvcHRpb25zOiBUU2VsZWN0T3B0aW9uW10sIHNlbGVjdGVkT3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10sIHNlYXJjaDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0ZpbHRlcmVkID0gdGhpcy5maWx0ZXJPcHRpb25zKHNlYXJjaCwgb3B0aW9ucywgc2VsZWN0ZWRPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZU9wdGlvbnNGaWx0ZXJlZEZsYXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlT3B0aW9uKEVOYXZpZ2F0aW9uLmZpcnN0SWZPcHRpb25BY3RpdmVJbnZpc2libGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBmbGF0TWFwKChzZWxlY3RlZE9wdGlvbnM6IE5neFNlbGVjdE9wdGlvbltdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc0ZpbHRlcmVkRmxhdCgpLnBpcGUoZmlsdGVyKChmbGF0T3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1NlbGVjdFNpbmdsZU9wdGlvbiAmJiBmbGF0T3B0aW9ucy5sZW5ndGggPT09IDEgJiYgIXNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGZsYXRPcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSkgPT4gdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLm5leHQoZmxhdE9wdGlvbnMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Rm9ybUNvbnRyb2xTaXplKG90aGVyQ2xhc3NOYW1lczogT2JqZWN0ID0ge30sIHVzZUZvcm1Db250cm9sOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sRXh0cmFDbGFzc2VzID0gdXNlRm9ybUNvbnRyb2wgPyB7XHJcbiAgICAgICAgICAgICdmb3JtLWNvbnRyb2wtc20gaW5wdXQtc20nOiB0aGlzLnNpemUgPT09ICdzbWFsbCcsXHJcbiAgICAgICAgICAgICdmb3JtLWNvbnRyb2wtbGcgaW5wdXQtbGcnOiB0aGlzLnNpemUgPT09ICdsYXJnZSdcclxuICAgICAgICB9IDoge307XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZm9ybUNvbnRyb2xFeHRyYUNsYXNzZXMsIG90aGVyQ2xhc3NOYW1lcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJ0blNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHsnYnRuLXNtJzogdGhpcy5zaXplID09PSAnc21hbGwnLCAnYnRuLWxnJzogdGhpcy5zaXplID09PSAnbGFyZ2UnfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG9wdGlvbnNTZWxlY3RlZCgpOiBOZ3hTZWxlY3RPcHRpb25bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFpbkNsaWNrZWQoZXZlbnQ6IElOZ3hTZWxlY3RDb21wb25lbnRNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuY2xpY2tlZFNlbGVjdENvbXBvbmVudCA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRm9jdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXMuZW1pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpmb2N1c2luJywgWyckZXZlbnQnXSlcclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIHB1YmxpYyBkb2N1bWVudENsaWNrKGV2ZW50OiBJTmd4U2VsZWN0Q29tcG9uZW50TW91c2VFdmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5jbGlja2VkU2VsZWN0Q29tcG9uZW50ICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNPcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0Nsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTsgLy8gZml4IGVycm9yIGJlY2F1c2Ugb2YgZGVsYXkgYmV0d2VlbiBkaWZmZXJlbnQgZXZlbnRzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGb2N1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibHVyLmVtaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wdGlvbnNGaWx0ZXJlZEZsYXQoKTogT2JzZXJ2YWJsZTxOZ3hTZWxlY3RPcHRpb25bXT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlT3B0aW9uc0ZpbHRlcmVkRmxhdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5jYWNoZU9wdGlvbnNGaWx0ZXJlZEZsYXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5vcHRpb25zRmlsdGVyZWQpXHJcbiAgICAgICAgICAgIC5waXBlKGZsYXRNYXA8VFNlbGVjdE9wdGlvbiwgTmd4U2VsZWN0T3B0aW9uPigob3B0aW9uOiBUU2VsZWN0T3B0aW9uKSA9PlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0aW9uID8gb2Yob3B0aW9uKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgKG9wdGlvbiBpbnN0YW5jZW9mIE5neFNlbGVjdE9wdEdyb3VwID8gZnJvbShvcHRpb24ub3B0aW9uc0ZpbHRlcmVkKSA6IGVtcHR5KCkpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyKChvcHRpb25zRmlsdGVyZWRGbGF0OiBOZ3hTZWxlY3RPcHRpb24pID0+ICFvcHRpb25zRmlsdGVyZWRGbGF0LmRpc2FibGVkKSxcclxuICAgICAgICAgICAgICAgIHRvQXJyYXkoKSxcclxuICAgICAgICAgICAgICAgIHRhcCgob3B0aW9uc0ZpbHRlcmVkRmxhdDogTmd4U2VsZWN0T3B0aW9uW10pID0+IHRoaXMuY2FjaGVPcHRpb25zRmlsdGVyZWRGbGF0ID0gb3B0aW9uc0ZpbHRlcmVkRmxhdClcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5hdmlnYXRlT3B0aW9uKG5hdmlnYXRpb246IEVOYXZpZ2F0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zRmlsdGVyZWRGbGF0KClcclxuICAgICAgICAgICAgLnBpcGUobWFwPE5neFNlbGVjdE9wdGlvbltdLCBJTmd4T3B0aW9uTmF2aWdhdGVkPigob3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdmlnYXRlZDogSU5neE9wdGlvbk5hdmlnYXRlZCA9IHtpbmRleDogLTEsIGFjdGl2ZU9wdGlvbjogbnVsbCwgZmlsdGVyZWRPcHRpb25MaXN0OiBvcHRpb25zfTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBY3RpdmVJZHg7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5hdmlnYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEVOYXZpZ2F0aW9uLmZpcnN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZWQuaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEVOYXZpZ2F0aW9uLnByZXZpb3VzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBY3RpdmVJZHggPSBvcHRpb25zLmluZGV4T2YodGhpcy5vcHRpb25BY3RpdmUpIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGVkLmluZGV4ID0gbmV3QWN0aXZlSWR4ID49IDAgPyBuZXdBY3RpdmVJZHggOiBvcHRpb25zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRU5hdmlnYXRpb24ubmV4dDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QWN0aXZlSWR4ID0gb3B0aW9ucy5pbmRleE9mKHRoaXMub3B0aW9uQWN0aXZlKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlZC5pbmRleCA9IG5ld0FjdGl2ZUlkeCA8IG9wdGlvbnMubGVuZ3RoID8gbmV3QWN0aXZlSWR4IDogMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFTmF2aWdhdGlvbi5sYXN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZWQuaW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRU5hdmlnYXRpb24uZmlyc3RTZWxlY3RlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlZC5pbmRleCA9IG9wdGlvbnMuaW5kZXhPZih0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRU5hdmlnYXRpb24uZmlyc3RJZk9wdGlvbkFjdGl2ZUludmlzaWJsZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4T2ZPcHRpb25BY3RpdmUgPSBvcHRpb25zLmluZGV4T2YodGhpcy5vcHRpb25BY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZWQuaW5kZXggPSBpZHhPZk9wdGlvbkFjdGl2ZSA+IDAgPyBpZHhPZk9wdGlvbkFjdGl2ZSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGVkLmFjdGl2ZU9wdGlvbiA9IG9wdGlvbnNbbmF2aWdhdGVkLmluZGV4XTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYXZpZ2F0ZWQ7XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChuZXdOYXZpZ2F0ZWQ6IElOZ3hPcHRpb25OYXZpZ2F0ZWQpID0+IHRoaXMub3B0aW9uQWN0aXZhdGUobmV3TmF2aWdhdGVkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nRG9DaGVjaygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pdGVtc0RpZmZlci5kaWZmKHRoaXMuaXRlbXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Viak9wdGlvbnMubmV4dCh0aGlzLmJ1aWxkT3B0aW9ucyh0aGlzLml0ZW1zKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWZWYWwgPSB0aGlzLmRlZmF1bHRWYWx1ZSA/IFtdLmNvbmNhdCh0aGlzLmRlZmF1bHRWYWx1ZSkgOiBbXTtcclxuICAgICAgICBpZiAodGhpcy5kZWZhdWx0VmFsdWVEaWZmZXIuZGlmZihkZWZWYWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViakRlZmF1bHRWYWx1ZS5uZXh0KGRlZlZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZvY3VzVG9JbnB1dCAmJiB0aGlzLmNoZWNrSW5wdXRWaXNpYmlsaXR5KCkgJiYgdGhpcy5pbnB1dEVsUmVmICYmXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbFJlZi5uYXRpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzVG9JbnB1dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RWxSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FuQ2xlYXJOb3RNdWx0aXBsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hbGxvd0NsZWFyICYmICEhdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICAoIXRoaXMuc3ViakRlZmF1bHRWYWx1ZS52YWx1ZS5sZW5ndGggfHwgdGhpcy5zdWJqRGVmYXVsdFZhbHVlLnZhbHVlWzBdICE9PSB0aGlzLmFjdHVhbFZhbHVlWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZm9jdXNUb0lucHV0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzVG9JbnB1dCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlucHV0S2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGNvbnN0IGtleXNGb3JPcGVuZWRTdGF0ZSA9IFtcclxuICAgICAgICAgICAgdGhpcy5rZXlDb2RlVG9PcHRpb25zU2VsZWN0LFxyXG4gICAgICAgICAgICB0aGlzLmtleUNvZGVUb05hdmlnYXRlRmlyc3QsXHJcbiAgICAgICAgICAgIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVQcmV2aW91cyxcclxuICAgICAgICAgICAgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZU5leHQsXHJcbiAgICAgICAgICAgIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVMYXN0LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgY29uc3Qga2V5c0ZvckNsb3NlZFN0YXRlID0gW3RoaXMua2V5Q29kZVRvT3B0aW9uc09wZW4sIHRoaXMua2V5Q29kZVRvUmVtb3ZlU2VsZWN0ZWRdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zT3BlbmVkICYmIGtleXNGb3JPcGVuZWRTdGF0ZS5pbmRleE9mKGV2ZW50LmNvZGUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMua2V5Q29kZVRvT3B0aW9uc1NlbGVjdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvblNlbGVjdCh0aGlzLm9wdGlvbkFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZUZpcnN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24uZmlyc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmtleUNvZGVUb05hdmlnYXRlUHJldmlvdXM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5wcmV2aW91cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVMYXN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24ubGFzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVOZXh0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24ubmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnNPcGVuZWQgJiYga2V5c0ZvckNsb3NlZFN0YXRlLmluZGV4T2YoZXZlbnQuY29kZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9PcHRpb25zT3BlbjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNPcGVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMua2V5Q29kZVRvUmVtb3ZlU2VsZWN0ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25SZW1vdmUodGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlW3RoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZS5sZW5ndGggLSAxXSwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYWluS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gdGhpcy5rZXlDb2RlVG9PcHRpb25zQ2xvc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2xvc2UoLyp0cnVlKi8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJhY2tCeU9wdGlvbihpbmRleDogbnVtYmVyLCBvcHRpb246IFRTZWxlY3RPcHRpb24pIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0aW9uID8gb3B0aW9uLnZhbHVlIDpcclxuICAgICAgICAgICAgKG9wdGlvbiBpbnN0YW5jZW9mIE5neFNlbGVjdE9wdEdyb3VwID8gb3B0aW9uLmxhYmVsIDogb3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tJbnB1dFZpc2liaWxpdHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm11bHRpcGxlID09PSB0cnVlKSB8fCAodGhpcy5vcHRpb25zT3BlbmVkICYmICF0aGlzLm5vQXV0b0NvbXBsZXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgaW5wdXRLZXlVcCh2YWx1ZTogc3RyaW5nID0gJycpIHtcclxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc09wZW5lZCAmJiB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNPcGVuKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRvSW5wdXRUZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zT3BlbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZWQuZW1pdCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBpbnB1dENsaWNrKHZhbHVlOiBzdHJpbmcgPSAnJykge1xyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zT3BlbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc09wZW4odmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgc2FuaXRpemUoaHRtbDogc3RyaW5nKTogU2FmZUh0bWwge1xyXG4gICAgICAgIHJldHVybiBodG1sID8gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbCkgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBoaWdobGlnaHRPcHRpb24ob3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pOiBTYWZlSHRtbCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRFbFJlZikge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnJlbmRlclRleHQodGhpcy5zYW5pdGl6ZXIsIHRoaXMuaW5wdXRFbFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbi5yZW5kZXJUZXh0KHRoaXMuc2FuaXRpemVyLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIG9wdGlvblNlbGVjdChvcHRpb246IE5neFNlbGVjdE9wdGlvbiwgZXZlbnQ6IEV2ZW50ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbiAmJiAhb3B0aW9uLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC5uZXh0KCh0aGlzLm11bHRpcGxlID8gdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlIDogW10pLmNvbmNhdChbb3B0aW9uXSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KG9wdGlvbi52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0Nsb3NlKC8qdHJ1ZSovKTtcclxuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIG9wdGlvblJlbW92ZShvcHRpb246IE5neFNlbGVjdE9wdGlvbiwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmIG9wdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLm5leHQoKHRoaXMubXVsdGlwbGUgPyB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWUgOiBbXSkuZmlsdGVyKG8gPT4gbyAhPT0gb3B0aW9uKSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlLmVtaXQob3B0aW9uLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGlzT3B0aW9uQWN0aXZlKG9wdGlvbjogTmd4U2VsZWN0T3B0aW9uLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkFjdGl2ZSA9PT0gb3B0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5zdXJlVmlzaWJsZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIG9wdGlvbkFjdGl2YXRlKG5hdmlnYXRlZDogSU5neE9wdGlvbk5hdmlnYXRlZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICgodGhpcy5vcHRpb25BY3RpdmUgIT09IG5hdmlnYXRlZC5hY3RpdmVPcHRpb24pICYmXHJcbiAgICAgICAgICAgICghbmF2aWdhdGVkLmFjdGl2ZU9wdGlvbiB8fCAhbmF2aWdhdGVkLmFjdGl2ZU9wdGlvbi5kaXNhYmxlZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25BY3RpdmUgPSBuYXZpZ2F0ZWQuYWN0aXZlT3B0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlZC5lbWl0KG5hdmlnYXRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmlsdGVyT3B0aW9ucyhzZWFyY2g6IHN0cmluZywgb3B0aW9uczogVFNlbGVjdE9wdGlvbltdLCBzZWxlY3RlZE9wdGlvbnM6IE5neFNlbGVjdE9wdGlvbltdKTogVFNlbGVjdE9wdGlvbltdIHtcclxuICAgICAgICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGVzY2FwZVN0cmluZyhzZWFyY2gpLCAnaScpLFxyXG4gICAgICAgICAgICBmaWx0ZXJPcHRpb24gPSAob3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoQ2FsbGJhY2soc2VhcmNoLCBvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICghc2VhcmNoIHx8IHJlZ0V4cC50ZXN0KG9wdGlvbi50ZXh0KSkgJiYgKCF0aGlzLm11bHRpcGxlIHx8IHNlbGVjdGVkT3B0aW9ucy5pbmRleE9mKG9wdGlvbikgPT09IC0xKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKChvcHRpb246IFRTZWxlY3RPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbiBpbnN0YW5jZW9mIE5neFNlbGVjdE9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlck9wdGlvbig8Tmd4U2VsZWN0T3B0aW9uPm9wdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0R3JvdXApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk9wID0gPE5neFNlbGVjdE9wdEdyb3VwPm9wdGlvbjtcclxuICAgICAgICAgICAgICAgIHN1Yk9wLmZpbHRlcigoc3ViT3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pID0+IGZpbHRlck9wdGlvbihzdWJPcHRpb24pKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdWJPcC5vcHRpb25zRmlsdGVyZWQubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbnN1cmVWaXNpYmxlRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNob2ljZU1lbnVFbFJlZiAmJiB0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcCAhPT0gZWxlbWVudC5vZmZzZXRUb3ApIHtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZUVsZW1lbnRPZmZzZXRUb3AgPSBlbGVtZW50Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyOiBIVE1MRWxlbWVudCA9IHRoaXMuY2hvaWNlTWVudUVsUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcCA8IGNvbnRhaW5lci5zY3JvbGxUb3ApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ID4gY29udGFpbmVyLnNjcm9sbFRvcCArIGNvbnRhaW5lci5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gY29udGFpbmVyLmNsaWVudEhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uc09wZW4oc2VhcmNoOiBzdHJpbmcgPSAnJykge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNPcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN1YmpTZWFyY2hUZXh0Lm5leHQoc2VhcmNoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24uZmlyc3RTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlT3B0aW9uKEVOYXZpZ2F0aW9uLmZpcnN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZvY3VzVG9JbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLm9wZW4uZW1pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uc0Nsb3NlKC8qZm9jdXNUb0hvc3Q6IGJvb2xlYW4gPSBmYWxzZSovKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zT3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgLy8gaWYgKGZvY3VzVG9Ib3N0KSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHggPSB3aW5kb3cuc2Nyb2xsWCwgeSA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm1haW5FbFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgLy8gICAgIHdpbmRvdy5zY3JvbGxUbyh4LCB5KTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5jbG9zZS5lbWl0KCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmF1dG9DbGVhclNlYXJjaCAmJiB0aGlzLm11bHRpcGxlICYmIHRoaXMuaW5wdXRFbFJlZikge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RWxSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRPcHRpb25zKGRhdGE6IGFueVtdKTogQXJyYXk8Tmd4U2VsZWN0T3B0aW9uIHwgTmd4U2VsZWN0T3B0R3JvdXA+IHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IEFycmF5PE5neFNlbGVjdE9wdGlvbiB8IE5neFNlbGVjdE9wdEdyb3VwPiA9IFtdO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb246IE5neFNlbGVjdE9wdGlvbjtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzT3B0R3JvdXAgPSB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5RXhpc3RzKGl0ZW0sIHRoaXMub3B0R3JvdXBMYWJlbEZpZWxkKSAmJiBwcm9wZXJ0eUV4aXN0cyhpdGVtLCB0aGlzLm9wdEdyb3VwT3B0aW9uc0ZpZWxkKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoaXRlbVt0aGlzLm9wdEdyb3VwT3B0aW9uc0ZpZWxkXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNPcHRHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdEdyb3VwID0gbmV3IE5neFNlbGVjdE9wdEdyb3VwKGl0ZW1bdGhpcy5vcHRHcm91cExhYmVsRmllbGRdKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtW3RoaXMub3B0R3JvdXBPcHRpb25zRmllbGRdLmZvckVhY2goKHN1Yk9wdGlvbjogTmd4U2VsZWN0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPSB0aGlzLmJ1aWxkT3B0aW9uKHN1Yk9wdGlvbiwgb3B0R3JvdXApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRHcm91cC5vcHRpb25zLnB1c2gob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9wdEdyb3VwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9uID0gdGhpcy5idWlsZE9wdGlvbihpdGVtLCBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRPcHRpb24oZGF0YTogYW55LCBwYXJlbnQ6IE5neFNlbGVjdE9wdEdyb3VwKTogTmd4U2VsZWN0T3B0aW9uIHtcclxuICAgICAgICBsZXQgdmFsdWUsIHRleHQsIGRpc2FibGVkO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGV4dCA9IGRhdGE7XHJcbiAgICAgICAgICAgIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgZGF0YSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAocHJvcGVydHlFeGlzdHMoZGF0YSwgdGhpcy5vcHRpb25WYWx1ZUZpZWxkKSB8fCBwcm9wZXJ0eUV4aXN0cyhkYXRhLCB0aGlzLm9wdGlvblRleHRGaWVsZCkpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gcHJvcGVydHlFeGlzdHMoZGF0YSwgdGhpcy5vcHRpb25WYWx1ZUZpZWxkKSA/IGRhdGFbdGhpcy5vcHRpb25WYWx1ZUZpZWxkXSA6IGRhdGFbdGhpcy5vcHRpb25UZXh0RmllbGRdO1xyXG4gICAgICAgICAgICB0ZXh0ID0gcHJvcGVydHlFeGlzdHMoZGF0YSwgdGhpcy5vcHRpb25UZXh0RmllbGQpID8gZGF0YVt0aGlzLm9wdGlvblRleHRGaWVsZF0gOiBkYXRhW3RoaXMub3B0aW9uVmFsdWVGaWVsZF07XHJcbiAgICAgICAgICAgIGRpc2FibGVkID0gcHJvcGVydHlFeGlzdHMoZGF0YSwgJ2Rpc2FibGVkJykgPyBkYXRhWydkaXNhYmxlZCddIDogZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTmd4U2VsZWN0T3B0aW9uKHZhbHVlLCB0ZXh0LCBkaXNhYmxlZCwgZGF0YSwgcGFyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8gaW50ZXJmYWNlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIC8vLy8vLy8vLy8vL1xyXG4gICAgcHVibGljIG9uQ2hhbmdlID0gKHY6IGFueSkgPT4gdjtcclxuXHJcbiAgICBwdWJsaWMgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3ViakV4dGVybmFsVmFsdWUubmV4dChvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB7fSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgICAgICB0aGlzLnN1YmpSZWdpc3Rlck9uQ2hhbmdlLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge05HWF9TRUxFQ1RfT1BUSU9OUywgTmd4U2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL25neC1zZWxlY3QuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3hTZWxlY3RPcHRpb25EaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlLCBOZ3hTZWxlY3RPcHRpb25TZWxlY3RlZERpcmVjdGl2ZX0gZnJvbSAnLi9uZ3gtdGVtcGxhdGVzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7SU5neFNlbGVjdE9wdGlvbnN9IGZyb20gJy4vbmd4LXNlbGVjdC5pbnRlcmZhY2VzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbTmd4U2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgIE5neFNlbGVjdE9wdGlvbkRpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW05neFNlbGVjdENvbXBvbmVudCxcclxuICAgICAgICBOZ3hTZWxlY3RPcHRpb25EaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvblNlbGVjdGVkRGlyZWN0aXZlLCBOZ3hTZWxlY3RPcHRpb25Ob3RGb3VuZERpcmVjdGl2ZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4U2VsZWN0TW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KG9wdGlvbnM6IElOZ3hTZWxlY3RPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmdNb2R1bGU6IE5neFNlbGVjdE1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HWF9TRUxFQ1RfT1BUSU9OUywgdXNlVmFsdWU6IG9wdGlvbnN9XVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkRpcmVjdGl2ZSIsIlRlbXBsYXRlUmVmIiwiZXNjYXBlU3RyaW5nIiwiSW5qZWN0aW9uVG9rZW4iLCJFdmVudEVtaXR0ZXIiLCJCZWhhdmlvclN1YmplY3QiLCJTdWJqZWN0IiwibWFwIiwibWVyZ2UiLCJjb21iaW5lTGF0ZXN0IiwiZGlzdGluY3RVbnRpbENoYW5nZWQiLCJzaGFyZSIsImZsYXRNYXAiLCJmcm9tIiwib2YiLCJlbXB0eSIsInRvQXJyYXkiLCJmaWx0ZXIiLCJ0YXAiLCJDb21wb25lbnQiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJJdGVyYWJsZURpZmZlcnMiLCJEb21TYW5pdGl6ZXIiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIkluamVjdCIsIk9wdGlvbmFsIiwiSW5wdXQiLCJPdXRwdXQiLCJWaWV3Q2hpbGQiLCJDb250ZW50Q2hpbGQiLCJIb3N0TGlzdGVuZXIiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBO0lBR0EsSUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBRXBDLFFBQUE7UUFHSSx5QkFBbUIsS0FBc0IsRUFDdEIsTUFDQSxVQUNBLE1BQ0M7Ozs7WUFKRCxVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUN0QixTQUFJLEdBQUosSUFBSTtZQUNKLGFBQVEsR0FBUixRQUFRO1lBQ1IsU0FBSSxHQUFKLElBQUk7WUFDSCxZQUFPLEdBQVAs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
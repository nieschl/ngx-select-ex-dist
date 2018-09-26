import * as escapeStringNs from 'escape-string-regexp';
import { Directive, TemplateRef, Input, Output, ViewChild, Component, EventEmitter, forwardRef, HostListener, IterableDiffers, ChangeDetectorRef, ContentChild, Optional, Inject, InjectionToken, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, BehaviorSubject, of, empty, from } from 'rxjs';
import { map, merge, combineLatest, distinctUntilChanged, share, tap, flatMap, filter, toArray } from 'rxjs/operators';
import * as lodashNs from 'lodash';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var escapeString = escapeStringNs;
var NgxSelectOption = /** @class */ (function () {
    function NgxSelectOption(value, text, disabled, data, _parent) {
        if (_parent === void 0) { _parent = null; }
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
         */
        function () {
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
        if (options === void 0) { options = []; }
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
        { type: Directive, args: [{ selector: '[ngx-select-option]' },] }
    ];
    /** @nocollapse */
    NgxSelectOptionDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgxSelectOptionDirective;
}());
var NgxSelectOptionSelectedDirective = /** @class */ (function () {
    function NgxSelectOptionSelectedDirective(template) {
        this.template = template;
    }
    NgxSelectOptionSelectedDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngx-select-option-selected]' },] }
    ];
    /** @nocollapse */
    NgxSelectOptionSelectedDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgxSelectOptionSelectedDirective;
}());
var NgxSelectOptionNotFoundDirective = /** @class */ (function () {
    function NgxSelectOptionNotFoundDirective(template) {
        this.template = template;
    }
    NgxSelectOptionNotFoundDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngx-select-option-not-found]' },] }
    ];
    /** @nocollapse */
    NgxSelectOptionNotFoundDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
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
var NGX_SELECT_OPTIONS = new InjectionToken('NGX_SELECT_OPTIONS');
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
        this.typed = new EventEmitter();
        this.focus = new EventEmitter();
        this.blur = new EventEmitter();
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.select = new EventEmitter();
        this.remove = new EventEmitter();
        this.navigated = new EventEmitter();
        this.selectionChanges = new EventEmitter();
        this.optionsOpened = false;
        this.actualValue = [];
        this.subjOptions = new BehaviorSubject([]);
        this.subjSearchText = new BehaviorSubject('');
        this.subjOptionsSelected = new BehaviorSubject([]);
        this.subjExternalValue = new BehaviorSubject([]);
        this.subjDefaultValue = new BehaviorSubject([]);
        this.subjRegisterOnChange = new Subject();
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
            .pipe(map(function (v) { return cacheExternalValue = v === null ? [] : [].concat(v); }), merge(this.subjOptionsSelected
            .pipe(map(function (options) {
            return options.map(function (o) { return o.value; });
        }))), combineLatest(this.subjDefaultValue, function (eVal, dVal) {
            /** @type {?} */
            var newVal = _.isEqual(eVal, dVal) ? [] : eVal;
            return newVal.length ? newVal : dVal;
        }), distinctUntilChanged(function (x, y) { return _.isEqual(x, y); }), share());
        subjActualValue
            .pipe(combineLatest(this.subjRegisterOnChange, function (actualValue) { return actualValue; }))
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
            .pipe(flatMap(function (options) { return from(options)
            .pipe(flatMap(function (option) { return option instanceof NgxSelectOption
            ? of(option)
            : (option instanceof NgxSelectOptGroup ? from(option.options) : empty()); }), toArray()); }))
            .pipe(combineLatest(subjActualValue, function (optionsFlat, actualValue) {
            from(optionsFlat)
                .pipe(filter(function (option) { return actualValue.indexOf(option.value) !== -1; }), toArray(), filter(function (options) { return !_.isEqual(options, _this.subjOptionsSelected.value); }))
                .subscribe(function (options) { return _this.subjOptionsSelected.next(options); });
        }))
            .subscribe();
        this.subjOptions
            .pipe(combineLatest(this.subjOptionsSelected, this.subjSearchText, function (options, selectedOptions, search) {
            _this.optionsFiltered = _this.filterOptions(search, options, selectedOptions);
            _this.cacheOptionsFilteredFlat = null;
            _this.navigateOption(ENavigation.firstIfOptionActiveInvisible);
            return selectedOptions;
        }), flatMap(function (selectedOptions) {
            return _this.optionsFilteredFlat().pipe(filter(function (flatOptions) {
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
        if (otherClassNames === void 0) { otherClassNames = {}; }
        if (useFormControl === void 0) { useFormControl = true; }
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
         */
        function () {
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
            return of(this.cacheOptionsFilteredFlat);
        }
        return from(this.optionsFiltered)
            .pipe(flatMap(function (option) {
            return option instanceof NgxSelectOption ? of(option) :
                (option instanceof NgxSelectOptGroup ? from(option.optionsFiltered) : empty());
        }), filter(function (optionsFilteredFlat) { return !optionsFilteredFlat.disabled; }), toArray(), tap(function (optionsFilteredFlat) { return _this.cacheOptionsFilteredFlat = optionsFilteredFlat; }));
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
            .pipe(map(function (options) {
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
        if (value === void 0) { value = ''; }
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
        if (value === void 0) { value = ''; }
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
        if (event === void 0) { event = null; }
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
        if (search === void 0) { search = ''; }
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
        { type: Component, args: [{
                    selector: 'ngx-select',
                    template: "<div #main [tabindex]=\"disabled? -1: 0\" class=\"ngx-select dropdown\"\r\n     [ngClass]=\"setFormControlSize({\r\n        'ngx-select_multiple form-control': multiple === true,\r\n        'open show': optionsOpened && optionsFiltered.length\r\n     }, multiple === true)\"\r\n     (click)=\"mainClicked($event)\" (focusin)=\"mainClicked($event)\"\r\n     (focus)=\"focusToInput()\" (keydown)=\"inputKeyDown($event)\"\r\n     (keyup)=\"mainKeyUp($event)\">\r\n    <div [ngClass]=\"{ 'ngx-select__disabled': disabled}\"></div>\r\n\r\n    <!-- single selected item -->\r\n    <div class=\"ngx-select__selected\"\r\n         *ngIf=\"(multiple === false) && (!optionsOpened || noAutoComplete)\">\r\n        <div class=\"ngx-select__toggle btn form-control\" [ngClass]=\"setFormControlSize(setBtnSize())\"\r\n             (click)=\"optionsOpen()\">\r\n\r\n            <span *ngIf=\"!optionsSelected.length\" class=\"ngx-select__placeholder text-muted\">\r\n                <span [innerHtml]=\"placeholder\"></span>\r\n            </span>\r\n            <span *ngIf=\"optionsSelected.length\"\r\n                  class=\"ngx-select__selected-single pull-left float-left\"\r\n                  [ngClass]=\"{'ngx-select__allow-clear': allowClear}\">\r\n                <ng-container [ngTemplateOutlet]=\"templateSelectedOption || defaultTemplateOption\"\r\n                              [ngTemplateOutletContext]=\"{$implicit: optionsSelected[0], index: 0,\r\n                                                          text: sanitize(optionsSelected[0].text)}\">\r\n                </ng-container>\r\n            </span>\r\n            <span class=\"ngx-select__toggle-buttons\">\r\n                <a class=\"ngx-select__clear btn btn-sm btn-link\" *ngIf=\"canClearNotMultiple()\"\r\n                   [ngClass]=\"setBtnSize()\"\r\n                   (click)=\"optionRemove(optionsSelected[0], $event)\">\r\n                    <i class=\"ngx-select__clear-icon\"></i>\r\n                </a>\r\n                <i class=\"dropdown-toggle\"></i>\r\n                <i class=\"ngx-select__toggle-caret caret\"></i>\r\n            </span>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- multiple selected items -->\r\n    <div class=\"ngx-select__selected\" *ngIf=\"multiple === true\">\r\n        <span *ngFor=\"let option of optionsSelected; trackBy: trackByOption; let idx = index\">\r\n            <span tabindex=\"-1\" [ngClass]=\"setBtnSize()\"\r\n                  class=\"ngx-select__selected-plural btn btn-default btn-secondary btn-xs\">\r\n\r\n                <ng-container [ngTemplateOutlet]=\"templateSelectedOption || defaultTemplateOption\"\r\n                              [ngTemplateOutletContext]=\"{$implicit: option, index: idx, text: sanitize(option.text)}\">\r\n                </ng-container>\r\n\r\n                <a class=\"ngx-select__clear btn btn-sm btn-link pull-right float-right\" [ngClass]=\"setBtnSize()\"\r\n                   (click)=\"optionRemove(option, $event)\">\r\n                    <i class=\"ngx-select__clear-icon\"></i>\r\n                </a>\r\n            </span>\r\n        </span>\r\n    </div>\r\n\r\n    <!-- live search an item from the list -->\r\n    <input #input type=\"text\" class=\"ngx-select__search form-control\" [ngClass]=\"setFormControlSize()\"\r\n           *ngIf=\"checkInputVisibility()\"\r\n           [tabindex]=\"multiple === false? -1: 0\"\r\n           (keydown)=\"inputKeyDown($event)\"\r\n           (keyup)=\"inputKeyUp(input.value)\"\r\n           (input)=\"doInputText(input.value)\"\r\n           [disabled]=\"disabled\"\r\n           [placeholder]=\"optionsSelected.length? '': placeholder\"\r\n           (click)=\"inputClick(input.value)\"\r\n           autocomplete=\"off\"\r\n           autocorrect=\"off\"\r\n           autocapitalize=\"off\"\r\n           spellcheck=\"false\"\r\n           role=\"combobox\">\r\n\r\n    <!-- options template -->\r\n    <ul #choiceMenu role=\"menu\" *ngIf=\"isFocused\" class=\"ngx-select__choices dropdown-menu\"\r\n        [class.show]=\"optionsOpened\">\r\n        <li class=\"ngx-select__item-group\" role=\"menuitem\"\r\n            *ngFor=\"let opt of optionsFiltered; trackBy: trackByOption; let idxGroup=index\">\r\n            <div class=\"divider dropdown-divider\" *ngIf=\"opt.type === 'optgroup' && (idxGroup > 0)\"></div>\r\n            <div class=\"dropdown-header\" *ngIf=\"opt.type === 'optgroup'\">{{opt.label}}</div>\r\n\r\n            <a href=\"#\" #choiceItem class=\"ngx-select__item dropdown-item\"\r\n               *ngFor=\"let option of (opt.optionsFiltered || [opt]); trackBy: trackByOption; let idxOption = index\"\r\n               [ngClass]=\"{\r\n                    'ngx-select__item_active active': isOptionActive(option, choiceItem),\r\n                    'ngx-select__item_disabled disabled': option.disabled\r\n               }\"\r\n               (mouseenter)=\"optionActivate({\r\n                    activeOption: option,\r\n                    filteredOptionList: optionsFiltered,\r\n                    index: optionsFiltered.indexOf(option)\r\n               })\"\r\n               (click)=\"optionSelect(option, $event)\">\r\n                <ng-container [ngTemplateOutlet]=\"templateOption || defaultTemplateOption\"\r\n                              [ngTemplateOutletContext]=\"{$implicit: option, text: highlightOption(option),\r\n                              index: idxGroup, subIndex: idxOption}\"></ng-container>\r\n            </a>\r\n        </li>\r\n        <li class=\"ngx-select__item ngx-select__item_no-found dropdown-header\" *ngIf=\"!optionsFiltered.length\">\r\n            <ng-container [ngTemplateOutlet]=\"templateOptionNotFound || defaultTemplateOptionNotFound\"></ng-container>\r\n        </li>\r\n    </ul>\r\n\r\n    <!--Default templates-->\r\n    <ng-template #defaultTemplateOption let-text=\"text\">\r\n        <span [innerHtml]=\"text\"></span>\r\n    </ng-template>\r\n\r\n    <ng-template #defaultTemplateOptionNotFound>\r\n        {{noResultsFound}}\r\n    </ng-template>\r\n\r\n</div>",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgxSelectComponent; }),
                            multi: true
                        }
                    ],
                    styles: [".ngx-select_multiple{height:auto;padding:3px 3px 0}.ngx-select_multiple .ngx-select__search{background-color:transparent!important;border:none;outline:0;box-shadow:none;height:1.6666em;padding:0;margin-bottom:3px}.ngx-select__disabled{background-color:#eceeef;border-radius:4px;position:absolute;width:100%;height:100%;z-index:5;opacity:.6;top:0;left:0;cursor:not-allowed}.ngx-select__toggle{outline:0;position:relative;text-align:left!important;color:#333;background-color:#fff;border-color:#ccc;display:inline-flex;align-items:stretch;justify-content:space-between}.ngx-select__toggle:hover{color:#333;background-color:#e6e6e6;border-color:#adadad}.ngx-select__toggle-buttons{flex-shrink:0;display:flex;align-items:center}.ngx-select__toggle-caret{position:absolute;height:10px;top:50%;right:10px;margin-top:-2px}.ngx-select__placeholder{float:left}.ngx-select__clear{margin-right:10px;padding:0;border:none}.ngx-select_multiple .ngx-select__clear{line-height:initial;margin-left:5px;margin-right:0;color:#000;opacity:.5}.ngx-select__clear-icon{display:inline-block;font-size:inherit;cursor:pointer;position:relative;width:1em;height:.75em;padding:0}.ngx-select__clear-icon:after,.ngx-select__clear-icon:before{content:'';position:absolute;border-top:3px solid;width:100%;top:50%;left:0;margin-top:-1px}.ngx-select__clear-icon:before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ngx-select__clear-icon:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.ngx-select__choices{width:100%;height:auto;max-height:200px;overflow-x:hidden;margin-top:0;position:absolute}.ngx-select_multiple .ngx-select__choices{margin-top:1px}.ngx-select__item{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;white-space:nowrap;cursor:pointer;text-decoration:none}.ngx-select__item_disabled,.ngx-select__item_no-found{cursor:default}.ngx-select__item_active{color:#fff;outline:0;background-color:#428bca}.ngx-select__selected-plural,.ngx-select__selected-single{display:inline-flex;align-items:center;overflow:hidden}.ngx-select__selected-plural span,.ngx-select__selected-single span{overflow:hidden;text-overflow:ellipsis}.ngx-select__selected-plural{outline:0;margin:0 3px 3px 0}.input-group>.dropdown{position:static}"]
                }] }
    ];
    /** @nocollapse */
    NgxSelectComponent.ctorParameters = function () { return [
        { type: IterableDiffers },
        { type: DomSanitizer },
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Inject, args: [NGX_SELECT_OPTIONS,] }, { type: Optional }] }
    ]; };
    NgxSelectComponent.propDecorators = {
        items: [{ type: Input }],
        optionValueField: [{ type: Input }],
        optionTextField: [{ type: Input }],
        optGroupLabelField: [{ type: Input }],
        optGroupOptionsField: [{ type: Input }],
        multiple: [{ type: Input }],
        allowClear: [{ type: Input }],
        placeholder: [{ type: Input }],
        noAutoComplete: [{ type: Input }],
        disabled: [{ type: Input }],
        defaultValue: [{ type: Input }],
        autoSelectSingleOption: [{ type: Input }],
        autoClearSearch: [{ type: Input }],
        noResultsFound: [{ type: Input }],
        size: [{ type: Input }],
        searchCallback: [{ type: Input }],
        typed: [{ type: Output }],
        focus: [{ type: Output }],
        blur: [{ type: Output }],
        open: [{ type: Output }],
        close: [{ type: Output }],
        select: [{ type: Output }],
        remove: [{ type: Output }],
        navigated: [{ type: Output }],
        selectionChanges: [{ type: Output }],
        mainElRef: [{ type: ViewChild, args: ['main',] }],
        inputElRef: [{ type: ViewChild, args: ['input',] }],
        choiceMenuElRef: [{ type: ViewChild, args: ['choiceMenu',] }],
        templateOption: [{ type: ContentChild, args: [NgxSelectOptionDirective, { read: TemplateRef },] }],
        templateSelectedOption: [{ type: ContentChild, args: [NgxSelectOptionSelectedDirective, { read: TemplateRef },] }],
        templateOptionNotFound: [{ type: ContentChild, args: [NgxSelectOptionNotFoundDirective, { read: TemplateRef },] }],
        documentClick: [{ type: HostListener, args: ['document:focusin', ['$event'],] }, { type: HostListener, args: ['document:click', ['$event'],] }]
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
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
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

export { NgxSelectModule, NGX_SELECT_OPTIONS, NgxSelectComponent, NgxSelectOption, NgxSelectOptGroup, NgxSelectOptionDirective, NgxSelectOptionSelectedDirective, NgxSelectOptionNotFoundDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNlbGVjdC1leC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXNlbGVjdC1leC9uZ3gtc2VsZWN0L25neC1zZWxlY3QuY2xhc3Nlcy50cyIsIm5nOi8vbmd4LXNlbGVjdC1leC9uZ3gtc2VsZWN0L25neC10ZW1wbGF0ZXMuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtc2VsZWN0LWV4L25neC1zZWxlY3Qvbmd4LXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25neC1zZWxlY3QtZXgvbmd4LXNlbGVjdC9uZ3gtc2VsZWN0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGVTdHJpbmdOcyBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XHJcbmltcG9ydCB7SU5neFNlbGVjdE9wdEdyb3VwLCBJTmd4U2VsZWN0T3B0aW9uLCBJTmd4U2VsZWN0T3B0aW9uQmFzZSwgVE5neFNlbGVjdE9wdGlvblR5cGV9IGZyb20gJy4vbmd4LXNlbGVjdC5pbnRlcmZhY2VzJztcclxuXHJcbmNvbnN0IGVzY2FwZVN0cmluZyA9IGVzY2FwZVN0cmluZ05zO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5neFNlbGVjdE9wdGlvbiBpbXBsZW1lbnRzIElOZ3hTZWxlY3RPcHRpb24sIElOZ3hTZWxlY3RPcHRpb25CYXNlIHtcclxuICAgIHJlYWRvbmx5IHR5cGU6IFROZ3hTZWxlY3RPcHRpb25UeXBlID0gJ29wdGlvbic7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgdGV4dDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIGRpc2FibGVkOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIGRhdGE6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3BhcmVudDogTmd4U2VsZWN0T3B0R3JvdXAgPSBudWxsKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogTmd4U2VsZWN0T3B0R3JvdXAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWNoZUhpZ2hsaWdodFRleHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgY2FjaGVSZW5kZXJlZFRleHQ6IFNhZmVIdG1sID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyVGV4dChzYW5pdGl6ZXI6IERvbVNhbml0aXplciwgaGlnaGxpZ2h0VGV4dDogc3RyaW5nKTogU2FmZUh0bWwge1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlSGlnaGxpZ2h0VGV4dCAhPT0gaGlnaGxpZ2h0VGV4dCB8fCB0aGlzLmNhY2hlUmVuZGVyZWRUZXh0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVIaWdobGlnaHRUZXh0ID0gaGlnaGxpZ2h0VGV4dDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVIaWdobGlnaHRUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlUmVuZGVyZWRUZXh0ID0gc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKCh0aGlzLnRleHQgKyAnJykucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKGVzY2FwZVN0cmluZyh0aGlzLmNhY2hlSGlnaGxpZ2h0VGV4dCksICdnaScpLCAnPHN0cm9uZz4kJjwvc3Ryb25nPidcclxuICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVJlbmRlcmVkVGV4dCA9IHNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVuZGVyZWRUZXh0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmd4U2VsZWN0T3B0R3JvdXAgaW1wbGVtZW50cyBJTmd4U2VsZWN0T3B0R3JvdXAsIElOZ3hTZWxlY3RPcHRpb25CYXNlIHtcclxuICAgIHJlYWRvbmx5IHR5cGU6IFROZ3hTZWxlY3RPcHRpb25UeXBlID0gJ29wdGdyb3VwJztcclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uc0ZpbHRlcmVkOiBOZ3hTZWxlY3RPcHRpb25bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIoKCkgPT4gdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbHRlcihjYWxsYmFja0ZuOiAodmFsdWU6IE5neFNlbGVjdE9wdGlvbikgPT4gYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zRmlsdGVyZWQgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHRpb246IE5neFNlbGVjdE9wdGlvbikgPT4gY2FsbGJhY2tGbihvcHRpb24pKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgVFNlbGVjdE9wdGlvbiA9IE5neFNlbGVjdE9wdEdyb3VwIHwgTmd4U2VsZWN0T3B0aW9uO1xyXG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmd4LXNlbGVjdC1vcHRpb25dJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ3hTZWxlY3RPcHRpb25EaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25neC1zZWxlY3Qtb3B0aW9uLXNlbGVjdGVkXSd9KVxyXG5leHBvcnQgY2xhc3MgTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25neC1zZWxlY3Qtb3B0aW9uLW5vdC1mb3VuZF0nfSlcclxuZXhwb3J0IGNsYXNzIE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLCBEb0NoZWNrLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsXHJcbiAgICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJdGVyYWJsZURpZmZlciwgSXRlcmFibGVEaWZmZXJzLCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29udGVudENoaWxkLFxyXG4gICAgVGVtcGxhdGVSZWYsIE9wdGlvbmFsLCBJbmplY3QsIEluamVjdGlvblRva2VuXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlSHRtbH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7U3ViamVjdCwgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBvZiwgZW1wdHksIGZyb219IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge21hcCwgbWVyZ2UsIGNvbWJpbmVMYXRlc3QsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzaGFyZSwgdGFwLCBmbGF0TWFwLCBmaWx0ZXIsIHRvQXJyYXl9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCAqIGFzIGxvZGFzaE5zIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZVN0cmluZ05zIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcclxuaW1wb3J0IHtOZ3hTZWxlY3RPcHRHcm91cCwgTmd4U2VsZWN0T3B0aW9uLCBUU2VsZWN0T3B0aW9ufSBmcm9tICcuL25neC1zZWxlY3QuY2xhc3Nlcyc7XHJcbmltcG9ydCB7Tmd4U2VsZWN0T3B0aW9uRGlyZWN0aXZlLCBOZ3hTZWxlY3RPcHRpb25Ob3RGb3VuZERpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmV9IGZyb20gJy4vbmd4LXRlbXBsYXRlcy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge0lOZ3hPcHRpb25OYXZpZ2F0ZWQsIElOZ3hTZWxlY3RPcHRpb24sIElOZ3hTZWxlY3RPcHRpb25zfSBmcm9tICcuL25neC1zZWxlY3QuaW50ZXJmYWNlcyc7XHJcblxyXG5jb25zdCBfID0gbG9kYXNoTnM7XHJcbmNvbnN0IGVzY2FwZVN0cmluZyA9IGVzY2FwZVN0cmluZ05zO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5HWF9TRUxFQ1RfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdOR1hfU0VMRUNUX09QVElPTlMnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5neFNlbGVjdENvbXBvbmVudE1vdXNlRXZlbnQgZXh0ZW5kcyBNb3VzZUV2ZW50IHtcclxuICAgIGNsaWNrZWRTZWxlY3RDb21wb25lbnQ/OiBOZ3hTZWxlY3RDb21wb25lbnQ7XHJcbn1cclxuXHJcbmVudW0gRU5hdmlnYXRpb24ge1xyXG4gICAgZmlyc3QsIHByZXZpb3VzLCBuZXh0LCBsYXN0LFxyXG4gICAgZmlyc3RTZWxlY3RlZCwgZmlyc3RJZk9wdGlvbkFjdGl2ZUludmlzaWJsZVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9wZXJ0eUV4aXN0cyhvYmo6IE9iamVjdCwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBwcm9wZXJ0eU5hbWUgaW4gb2JqO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LXNlbGVjdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hTZWxlY3RDb21wb25lbnQpLFxyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIElOZ3hTZWxlY3RPcHRpb25zLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgRG9DaGVjaywgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbXM6IGFueVtdO1xyXG4gICAgQElucHV0KCkgcHVibGljIG9wdGlvblZhbHVlRmllbGQgPSAnaWQnO1xyXG4gICAgQElucHV0KCkgcHVibGljIG9wdGlvblRleHRGaWVsZCA9ICd0ZXh0JztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvcHRHcm91cExhYmVsRmllbGQgPSAnbGFiZWwnO1xyXG4gICAgQElucHV0KCkgcHVibGljIG9wdEdyb3VwT3B0aW9uc0ZpZWxkID0gJ29wdGlvbnMnO1xyXG4gICAgQElucHV0KCkgcHVibGljIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYWxsb3dDbGVhciA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyID0gJyc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbm9BdXRvQ29tcGxldGUgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIGRlZmF1bHRWYWx1ZTogYW55W10gPSBbXTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBhdXRvU2VsZWN0U2luZ2xlT3B0aW9uID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYXV0b0NsZWFyU2VhcmNoID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbm9SZXN1bHRzRm91bmQgPSAnTm8gcmVzdWx0cyBmb3VuZCc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2l6ZTogJ3NtYWxsJyB8ICdkZWZhdWx0JyB8ICdsYXJnZScgPSAnZGVmYXVsdCc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoQ2FsbGJhY2s6IChzZWFyY2g6IHN0cmluZywgaXRlbTogSU5neFNlbGVjdE9wdGlvbikgPT4gYm9vbGVhbjtcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9SZW1vdmVTZWxlY3RlZCA9ICdEZWxldGUnO1xyXG4gICAgcHVibGljIGtleUNvZGVUb09wdGlvbnNPcGVuID0gJ0VudGVyJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9PcHRpb25zQ2xvc2UgPSAnRXNjYXBlJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9PcHRpb25zU2VsZWN0ID0gJ0VudGVyJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9OYXZpZ2F0ZUZpcnN0ID0gJ0Fycm93TGVmdCc7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvTmF2aWdhdGVQcmV2aW91cyA9ICdBcnJvd1VwJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9OYXZpZ2F0ZU5leHQgPSAnQXJyb3dEb3duJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9OYXZpZ2F0ZUxhc3QgPSAnQXJyb3dSaWdodCc7XHJcblxyXG4gICAgQE91dHB1dCgpIHB1YmxpYyB0eXBlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyByZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgbmF2aWdhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxJTmd4T3B0aW9uTmF2aWdhdGVkPigpO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBzZWxlY3Rpb25DaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcjxJTmd4U2VsZWN0T3B0aW9uW10+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnbWFpbicpIHByb3RlY3RlZCBtYWluRWxSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdpbnB1dCcpIHByb3RlY3RlZCBpbnB1dEVsUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnY2hvaWNlTWVudScpIHByb3RlY3RlZCBjaG9pY2VNZW51RWxSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChOZ3hTZWxlY3RPcHRpb25EaXJlY3RpdmUsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pIHRlbXBsYXRlT3B0aW9uOiBOZ3hTZWxlY3RPcHRpb25EaXJlY3RpdmU7XHJcbiAgICBAQ29udGVudENoaWxkKE5neFNlbGVjdE9wdGlvblNlbGVjdGVkRGlyZWN0aXZlLCB7cmVhZDogVGVtcGxhdGVSZWZ9KSB0ZW1wbGF0ZVNlbGVjdGVkT3B0aW9uOiBOZ3hTZWxlY3RPcHRpb25TZWxlY3RlZERpcmVjdGl2ZTtcclxuICAgIEBDb250ZW50Q2hpbGQoTmd4U2VsZWN0T3B0aW9uTm90Rm91bmREaXJlY3RpdmUsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pIHRlbXBsYXRlT3B0aW9uTm90Rm91bmQ6IE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlO1xyXG5cclxuICAgIHB1YmxpYyBvcHRpb25zT3BlbmVkID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgb3B0aW9uc0ZpbHRlcmVkOiBUU2VsZWN0T3B0aW9uW107XHJcblxyXG4gICAgcHJpdmF0ZSBvcHRpb25BY3RpdmU6IE5neFNlbGVjdE9wdGlvbjtcclxuICAgIHByaXZhdGUgaXRlbXNEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPGFueT47XHJcbiAgICBwcml2YXRlIGRlZmF1bHRWYWx1ZURpZmZlcjogSXRlcmFibGVEaWZmZXI8YW55W10+O1xyXG4gICAgcHJpdmF0ZSBhY3R1YWxWYWx1ZTogYW55W10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgc3Viak9wdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRTZWxlY3RPcHRpb25bXT4oW10pO1xyXG4gICAgcHJpdmF0ZSBzdWJqU2VhcmNoVGV4dCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJqT3B0aW9uc1NlbGVjdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOZ3hTZWxlY3RPcHRpb25bXT4oW10pO1xyXG4gICAgcHJpdmF0ZSBzdWJqRXh0ZXJuYWxWYWx1ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcclxuICAgIHByaXZhdGUgc3ViakRlZmF1bHRWYWx1ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcclxuICAgIHByaXZhdGUgc3VialJlZ2lzdGVyT25DaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIHByaXZhdGUgY2FjaGVPcHRpb25zRmlsdGVyZWRGbGF0OiBOZ3hTZWxlY3RPcHRpb25bXTtcclxuICAgIHByaXZhdGUgY2FjaGVFbGVtZW50T2Zmc2V0VG9wOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZm9jdXNUb0lucHV0ID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNGb2N1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgICAgICAgICAgQEluamVjdChOR1hfU0VMRUNUX09QVElPTlMpIEBPcHRpb25hbCgpIGRlZmF1bHRPcHRpb25zOiBJTmd4U2VsZWN0T3B0aW9ucykge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGVmYXVsdE9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBkaWZmZXJzXHJcbiAgICAgICAgdGhpcy5pdGVtc0RpZmZlciA9IGl0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGU8YW55PihudWxsKTtcclxuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZURpZmZlciA9IGl0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGU8YW55PihudWxsKTtcclxuXHJcbiAgICAgICAgLy8gb2JzZXJ2ZXJzXHJcbiAgICAgICAgdGhpcy50eXBlZC5zdWJzY3JpYmUoKHRleHQ6IHN0cmluZykgPT4gdGhpcy5zdWJqU2VhcmNoVGV4dC5uZXh0KHRleHQpKTtcclxuICAgICAgICB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQuc3Vic2NyaWJlKChvcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSkgPT4gdGhpcy5zZWxlY3Rpb25DaGFuZ2VzLmVtaXQob3B0aW9ucykpO1xyXG4gICAgICAgIGxldCBjYWNoZUV4dGVybmFsVmFsdWU6IGFueVtdO1xyXG4gICAgICAgIGNvbnN0IHN1YmpBY3R1YWxWYWx1ZSA9IHRoaXMuc3ViakV4dGVybmFsVmFsdWVcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAoKHY6IGFueVtdKSA9PiBjYWNoZUV4dGVybmFsVmFsdWUgPSB2ID09PSBudWxsID8gW10gOiBbXS5jb25jYXQodikpLFxyXG4gICAgICAgICAgICAgICAgbWVyZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgob3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm1hcCgobzogTmd4U2VsZWN0T3B0aW9uKSA9PiBvLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5zdWJqRGVmYXVsdFZhbHVlLCAoZVZhbDogYW55W10sIGRWYWw6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWwgPSBfLmlzRXF1YWwoZVZhbCwgZFZhbCkgPyBbXSA6IGVWYWw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3VmFsLmxlbmd0aCA/IG5ld1ZhbCA6IGRWYWw7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiBfLmlzRXF1YWwoeCwgeSkpLFxyXG4gICAgICAgICAgICAgICAgc2hhcmUoKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICBzdWJqQWN0dWFsVmFsdWVcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMuc3VialJlZ2lzdGVyT25DaGFuZ2UsIChhY3R1YWxWYWx1ZTogYW55W10pID0+IGFjdHVhbFZhbHVlKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGFjdHVhbFZhbHVlOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxWYWx1ZSA9IGFjdHVhbFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzRXF1YWwoYWN0dWFsVmFsdWUsIGNhY2hlRXh0ZXJuYWxWYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZUV4dGVybmFsVmFsdWUgPSBhY3R1YWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGFjdHVhbFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGFjdHVhbFZhbHVlLmxlbmd0aCA/IGFjdHVhbFZhbHVlWzBdIDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1xyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGZsYXRNYXAoKG9wdGlvbnM6IFRTZWxlY3RPcHRpb25bXSkgPT4gZnJvbShvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgLnBpcGUoZmxhdE1hcCgob3B0aW9uOiBUU2VsZWN0T3B0aW9uKSA9PiBvcHRpb24gaW5zdGFuY2VvZiBOZ3hTZWxlY3RPcHRpb25cclxuICAgICAgICAgICAgICAgICAgICA/IG9mKG9wdGlvbilcclxuICAgICAgICAgICAgICAgICAgICA6IChvcHRpb24gaW5zdGFuY2VvZiBOZ3hTZWxlY3RPcHRHcm91cCA/IGZyb20ob3B0aW9uLm9wdGlvbnMpIDogZW1wdHkoKSlcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICB0b0FycmF5KClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHN1YmpBY3R1YWxWYWx1ZSwgKG9wdGlvbnNGbGF0OiBOZ3hTZWxlY3RPcHRpb25bXSwgYWN0dWFsVmFsdWU6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbShvcHRpb25zRmxhdClcclxuICAgICAgICAgICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcigob3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pID0+IGFjdHVhbFZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSAhPT0gLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9BcnJheSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKChvcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSkgPT4gIV8uaXNFcXVhbChvcHRpb25zLCB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgob3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+IHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC5uZXh0KG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnN1YmpPcHRpb25zXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQsIHRoaXMuc3VialNlYXJjaFRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgKG9wdGlvbnM6IFRTZWxlY3RPcHRpb25bXSwgc2VsZWN0ZWRPcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSwgc2VhcmNoOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zRmlsdGVyZWQgPSB0aGlzLmZpbHRlck9wdGlvbnMoc2VhcmNoLCBvcHRpb25zLCBzZWxlY3RlZE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlT3B0aW9uc0ZpbHRlcmVkRmxhdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24uZmlyc3RJZk9wdGlvbkFjdGl2ZUludmlzaWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGZsYXRNYXAoKHNlbGVjdGVkT3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zRmlsdGVyZWRGbGF0KCkucGlwZShmaWx0ZXIoKGZsYXRPcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvU2VsZWN0U2luZ2xlT3B0aW9uICYmIGZsYXRPcHRpb25zLmxlbmd0aCA9PT0gMSAmJiAhc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZmxhdE9wdGlvbnM6IE5neFNlbGVjdE9wdGlvbltdKSA9PiB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQubmV4dChmbGF0T3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRGb3JtQ29udHJvbFNpemUob3RoZXJDbGFzc05hbWVzOiBPYmplY3QgPSB7fSwgdXNlRm9ybUNvbnRyb2w6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2xFeHRyYUNsYXNzZXMgPSB1c2VGb3JtQ29udHJvbCA/IHtcclxuICAgICAgICAgICAgJ2Zvcm0tY29udHJvbC1zbSBpbnB1dC1zbSc6IHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJyxcclxuICAgICAgICAgICAgJ2Zvcm0tY29udHJvbC1sZyBpbnB1dC1sZyc6IHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJ1xyXG4gICAgICAgIH0gOiB7fTtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmb3JtQ29udHJvbEV4dHJhQ2xhc3Nlcywgb3RoZXJDbGFzc05hbWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QnRuU2l6ZSgpIHtcclxuICAgICAgICByZXR1cm4geydidG4tc20nOiB0aGlzLnNpemUgPT09ICdzbWFsbCcsICdidG4tbGcnOiB0aGlzLnNpemUgPT09ICdsYXJnZSd9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgb3B0aW9uc1NlbGVjdGVkKCk6IE5neFNlbGVjdE9wdGlvbltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYWluQ2xpY2tlZChldmVudDogSU5neFNlbGVjdENvbXBvbmVudE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBldmVudC5jbGlja2VkU2VsZWN0Q29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBpZiAoIXRoaXMuaXNGb2N1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mb2N1cy5lbWl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmZvY3VzaW4nLCBbJyRldmVudCddKVxyXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxyXG4gICAgcHVibGljIGRvY3VtZW50Q2xpY2soZXZlbnQ6IElOZ3hTZWxlY3RDb21wb25lbnRNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmNsaWNrZWRTZWxlY3RDb21wb25lbnQgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc09wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpOyAvLyBmaXggZXJyb3IgYmVjYXVzZSBvZiBkZWxheSBiZXR3ZWVuIGRpZmZlcmVudCBldmVudHNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0ZvY3VzZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsdXIuZW1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3B0aW9uc0ZpbHRlcmVkRmxhdCgpOiBPYnNlcnZhYmxlPE5neFNlbGVjdE9wdGlvbltdPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVPcHRpb25zRmlsdGVyZWRGbGF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmNhY2hlT3B0aW9uc0ZpbHRlcmVkRmxhdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLm9wdGlvbnNGaWx0ZXJlZClcclxuICAgICAgICAgICAgLnBpcGUoZmxhdE1hcDxUU2VsZWN0T3B0aW9uLCBOZ3hTZWxlY3RPcHRpb24+KChvcHRpb246IFRTZWxlY3RPcHRpb24pID0+XHJcbiAgICAgICAgICAgICAgICBvcHRpb24gaW5zdGFuY2VvZiBOZ3hTZWxlY3RPcHRpb24gPyBvZihvcHRpb24pIDpcclxuICAgICAgICAgICAgICAgICAgICAob3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0R3JvdXAgPyBmcm9tKG9wdGlvbi5vcHRpb25zRmlsdGVyZWQpIDogZW1wdHkoKSlcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKG9wdGlvbnNGaWx0ZXJlZEZsYXQ6IE5neFNlbGVjdE9wdGlvbikgPT4gIW9wdGlvbnNGaWx0ZXJlZEZsYXQuZGlzYWJsZWQpLFxyXG4gICAgICAgICAgICAgICAgdG9BcnJheSgpLFxyXG4gICAgICAgICAgICAgICAgdGFwKChvcHRpb25zRmlsdGVyZWRGbGF0OiBOZ3hTZWxlY3RPcHRpb25bXSkgPT4gdGhpcy5jYWNoZU9wdGlvbnNGaWx0ZXJlZEZsYXQgPSBvcHRpb25zRmlsdGVyZWRGbGF0KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF2aWdhdGVPcHRpb24obmF2aWdhdGlvbjogRU5hdmlnYXRpb24pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnNGaWx0ZXJlZEZsYXQoKVxyXG4gICAgICAgICAgICAucGlwZShtYXA8Tmd4U2VsZWN0T3B0aW9uW10sIElOZ3hPcHRpb25OYXZpZ2F0ZWQ+KChvcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmF2aWdhdGVkOiBJTmd4T3B0aW9uTmF2aWdhdGVkID0ge2luZGV4OiAtMSwgYWN0aXZlT3B0aW9uOiBudWxsLCBmaWx0ZXJlZE9wdGlvbkxpc3Q6IG9wdGlvbnN9O1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0FjdGl2ZUlkeDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAobmF2aWdhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRU5hdmlnYXRpb24uZmlyc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlZC5pbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRU5hdmlnYXRpb24ucHJldmlvdXM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FjdGl2ZUlkeCA9IG9wdGlvbnMuaW5kZXhPZih0aGlzLm9wdGlvbkFjdGl2ZSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZWQuaW5kZXggPSBuZXdBY3RpdmVJZHggPj0gMCA/IG5ld0FjdGl2ZUlkeCA6IG9wdGlvbnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFTmF2aWdhdGlvbi5uZXh0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBY3RpdmVJZHggPSBvcHRpb25zLmluZGV4T2YodGhpcy5vcHRpb25BY3RpdmUpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGVkLmluZGV4ID0gbmV3QWN0aXZlSWR4IDwgb3B0aW9ucy5sZW5ndGggPyBuZXdBY3RpdmVJZHggOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEVOYXZpZ2F0aW9uLmxhc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlZC5pbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFTmF2aWdhdGlvbi5maXJzdFNlbGVjdGVkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGVkLmluZGV4ID0gb3B0aW9ucy5pbmRleE9mKHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFTmF2aWdhdGlvbi5maXJzdElmT3B0aW9uQWN0aXZlSW52aXNpYmxlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHhPZk9wdGlvbkFjdGl2ZSA9IG9wdGlvbnMuaW5kZXhPZih0aGlzLm9wdGlvbkFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlZC5pbmRleCA9IGlkeE9mT3B0aW9uQWN0aXZlID4gMCA/IGlkeE9mT3B0aW9uQWN0aXZlIDogMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0ZWQuYWN0aXZlT3B0aW9uID0gb3B0aW9uc1tuYXZpZ2F0ZWQuaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdmlnYXRlZDtcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKG5ld05hdmlnYXRlZDogSU5neE9wdGlvbk5hdmlnYXRlZCkgPT4gdGhpcy5vcHRpb25BY3RpdmF0ZShuZXdOYXZpZ2F0ZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdEb0NoZWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLml0ZW1zRGlmZmVyLmRpZmYodGhpcy5pdGVtcykpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqT3B0aW9ucy5uZXh0KHRoaXMuYnVpbGRPcHRpb25zKHRoaXMuaXRlbXMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZlZhbCA9IHRoaXMuZGVmYXVsdFZhbHVlID8gW10uY29uY2F0KHRoaXMuZGVmYXVsdFZhbHVlKSA6IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRWYWx1ZURpZmZlci5kaWZmKGRlZlZhbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqRGVmYXVsdFZhbHVlLm5leHQoZGVmVmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fZm9jdXNUb0lucHV0ICYmIHRoaXMuY2hlY2tJbnB1dFZpc2liaWxpdHkoKSAmJiB0aGlzLmlucHV0RWxSZWYgJiZcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEVsUmVmLm5hdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZm9jdXNUb0lucHV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5DbGVhck5vdE11bHRpcGxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFsbG93Q2xlYXIgJiYgISF0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWUubGVuZ3RoICYmXHJcbiAgICAgICAgICAgICghdGhpcy5zdWJqRGVmYXVsdFZhbHVlLnZhbHVlLmxlbmd0aCB8fCB0aGlzLnN1YmpEZWZhdWx0VmFsdWUudmFsdWVbMF0gIT09IHRoaXMuYWN0dWFsVmFsdWVbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmb2N1c1RvSW5wdXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZm9jdXNUb0lucHV0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5wdXRLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qga2V5c0Zvck9wZW5lZFN0YXRlID0gW1xyXG4gICAgICAgICAgICB0aGlzLmtleUNvZGVUb09wdGlvbnNTZWxlY3QsXHJcbiAgICAgICAgICAgIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVGaXJzdCxcclxuICAgICAgICAgICAgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZVByZXZpb3VzLFxyXG4gICAgICAgICAgICB0aGlzLmtleUNvZGVUb05hdmlnYXRlTmV4dCxcclxuICAgICAgICAgICAgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZUxhc3QsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBrZXlzRm9yQ2xvc2VkU3RhdGUgPSBbdGhpcy5rZXlDb2RlVG9PcHRpb25zT3BlbiwgdGhpcy5rZXlDb2RlVG9SZW1vdmVTZWxlY3RlZF07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNPcGVuZWQgJiYga2V5c0Zvck9wZW5lZFN0YXRlLmluZGV4T2YoZXZlbnQuY29kZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9PcHRpb25zU2VsZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uU2VsZWN0KHRoaXMub3B0aW9uQWN0aXZlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlT3B0aW9uKEVOYXZpZ2F0aW9uLm5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmtleUNvZGVUb05hdmlnYXRlRmlyc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5maXJzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVQcmV2aW91czpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlT3B0aW9uKEVOYXZpZ2F0aW9uLnByZXZpb3VzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZUxhc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5sYXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZU5leHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9uc09wZW5lZCAmJiBrZXlzRm9yQ2xvc2VkU3RhdGUuaW5kZXhPZihldmVudC5jb2RlKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmtleUNvZGVUb09wdGlvbnNPcGVuOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc09wZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9SZW1vdmVTZWxlY3RlZDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvblJlbW92ZSh0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWVbdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlLmxlbmd0aCAtIDFdLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1haW5LZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC5jb2RlID09PSB0aGlzLmtleUNvZGVUb09wdGlvbnNDbG9zZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNDbG9zZSgvKnRydWUqLyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0cmFja0J5T3B0aW9uKGluZGV4OiBudW1iZXIsIG9wdGlvbjogVFNlbGVjdE9wdGlvbikge1xyXG4gICAgICAgIHJldHVybiBvcHRpb24gaW5zdGFuY2VvZiBOZ3hTZWxlY3RPcHRpb24gPyBvcHRpb24udmFsdWUgOlxyXG4gICAgICAgICAgICAob3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0R3JvdXAgPyBvcHRpb24ubGFiZWwgOiBvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0lucHV0VmlzaWJpbGl0eSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMubXVsdGlwbGUgPT09IHRydWUpIHx8ICh0aGlzLm9wdGlvbnNPcGVuZWQgJiYgIXRoaXMubm9BdXRvQ29tcGxldGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBpbnB1dEtleVVwKHZhbHVlOiBzdHJpbmcgPSAnJykge1xyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zT3BlbmVkICYmIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc09wZW4odmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZG9JbnB1dFRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNPcGVuZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlZC5lbWl0KHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGlucHV0Q2xpY2sodmFsdWU6IHN0cmluZyA9ICcnKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNPcGVuZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zT3Blbih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBzYW5pdGl6ZShodG1sOiBzdHJpbmcpOiBTYWZlSHRtbCB7XHJcbiAgICAgICAgcmV0dXJuIGh0bWwgPyB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sKSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGhpZ2hsaWdodE9wdGlvbihvcHRpb246IE5neFNlbGVjdE9wdGlvbik6IFNhZmVIdG1sIHtcclxuICAgICAgICBpZiAodGhpcy5pbnB1dEVsUmVmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24ucmVuZGVyVGV4dCh0aGlzLnNhbml0aXplciwgdGhpcy5pbnB1dEVsUmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uLnJlbmRlclRleHQodGhpcy5zYW5pdGl6ZXIsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgb3B0aW9uU2VsZWN0KG9wdGlvbjogTmd4U2VsZWN0T3B0aW9uLCBldmVudDogRXZlbnQgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9uICYmICFvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLm5leHQoKHRoaXMubXVsdGlwbGUgPyB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWUgOiBbXSkuY29uY2F0KFtvcHRpb25dKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQob3B0aW9uLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2xvc2UoLyp0cnVlKi8pO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgb3B0aW9uUmVtb3ZlKG9wdGlvbjogTmd4U2VsZWN0T3B0aW9uLCBldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgb3B0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQubmV4dCgodGhpcy5tdWx0aXBsZSA/IHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZSA6IFtdKS5maWx0ZXIobyA9PiBvICE9PSBvcHRpb24pKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUuZW1pdChvcHRpb24udmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgaXNPcHRpb25BY3RpdmUob3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24sIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uQWN0aXZlID09PSBvcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5lbnN1cmVWaXNpYmxlRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgb3B0aW9uQWN0aXZhdGUobmF2aWdhdGVkOiBJTmd4T3B0aW9uTmF2aWdhdGVkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCh0aGlzLm9wdGlvbkFjdGl2ZSAhPT0gbmF2aWdhdGVkLmFjdGl2ZU9wdGlvbikgJiZcclxuICAgICAgICAgICAgKCFuYXZpZ2F0ZWQuYWN0aXZlT3B0aW9uIHx8ICFuYXZpZ2F0ZWQuYWN0aXZlT3B0aW9uLmRpc2FibGVkKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkFjdGl2ZSA9IG5hdmlnYXRlZC5hY3RpdmVPcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGVkLmVtaXQobmF2aWdhdGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaWx0ZXJPcHRpb25zKHNlYXJjaDogc3RyaW5nLCBvcHRpb25zOiBUU2VsZWN0T3B0aW9uW10sIHNlbGVjdGVkT3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pOiBUU2VsZWN0T3B0aW9uW10ge1xyXG4gICAgICAgIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoZXNjYXBlU3RyaW5nKHNlYXJjaCksICdpJyksXHJcbiAgICAgICAgICAgIGZpbHRlck9wdGlvbiA9IChvcHRpb246IE5neFNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hDYWxsYmFjayhzZWFyY2gsIG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCFzZWFyY2ggfHwgcmVnRXhwLnRlc3Qob3B0aW9uLnRleHQpKSAmJiAoIXRoaXMubXVsdGlwbGUgfHwgc2VsZWN0ZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uKSA9PT0gLTEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maWx0ZXIoKG9wdGlvbjogVFNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyT3B0aW9uKDxOZ3hTZWxlY3RPcHRpb24+b3B0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb24gaW5zdGFuY2VvZiBOZ3hTZWxlY3RPcHRHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViT3AgPSA8Tmd4U2VsZWN0T3B0R3JvdXA+b3B0aW9uO1xyXG4gICAgICAgICAgICAgICAgc3ViT3AuZmlsdGVyKChzdWJPcHRpb246IE5neFNlbGVjdE9wdGlvbikgPT4gZmlsdGVyT3B0aW9uKHN1Yk9wdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Yk9wLm9wdGlvbnNGaWx0ZXJlZC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVuc3VyZVZpc2libGVFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hvaWNlTWVudUVsUmVmICYmIHRoaXMuY2FjaGVFbGVtZW50T2Zmc2V0VG9wICE9PSBlbGVtZW50Lm9mZnNldFRvcCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcCA9IGVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jaG9pY2VNZW51RWxSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVFbGVtZW50T2Zmc2V0VG9wIDwgY29udGFpbmVyLnNjcm9sbFRvcCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMuY2FjaGVFbGVtZW50T2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FjaGVFbGVtZW50T2Zmc2V0VG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgPiBjb250YWluZXIuc2Nyb2xsVG9wICsgY29udGFpbmVyLmNsaWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMuY2FjaGVFbGVtZW50T2Zmc2V0VG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgLSBjb250YWluZXIuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcHRpb25zT3BlbihzZWFyY2g6IHN0cmluZyA9ICcnKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc09wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3VialNlYXJjaFRleHQubmV4dChzZWFyY2gpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5maXJzdFNlbGVjdGVkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24uZmlyc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUb0lucHV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMub3Blbi5lbWl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcHRpb25zQ2xvc2UoLypmb2N1c1RvSG9zdDogYm9vbGVhbiA9IGZhbHNlKi8pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnNPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAvLyBpZiAoZm9jdXNUb0hvc3QpIHtcclxuICAgICAgICAvLyAgICAgY29uc3QgeCA9IHdpbmRvdy5zY3JvbGxYLCB5ID0gd2luZG93LnNjcm9sbFk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubWFpbkVsUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAvLyAgICAgd2luZG93LnNjcm9sbFRvKHgsIHkpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLmNsb3NlLmVtaXQoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b0NsZWFyU2VhcmNoICYmIHRoaXMubXVsdGlwbGUgJiYgdGhpcy5pbnB1dEVsUmVmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZE9wdGlvbnMoZGF0YTogYW55W10pOiBBcnJheTxOZ3hTZWxlY3RPcHRpb24gfCBOZ3hTZWxlY3RPcHRHcm91cD4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8Tmd4U2VsZWN0T3B0aW9uIHwgTmd4U2VsZWN0T3B0R3JvdXA+ID0gW107XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbjogTmd4U2VsZWN0T3B0aW9uO1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNPcHRHcm91cCA9IHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlFeGlzdHMoaXRlbSwgdGhpcy5vcHRHcm91cExhYmVsRmllbGQpICYmIHByb3BlcnR5RXhpc3RzKGl0ZW0sIHRoaXMub3B0R3JvdXBPcHRpb25zRmllbGQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShpdGVtW3RoaXMub3B0R3JvdXBPcHRpb25zRmllbGRdKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc09wdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0R3JvdXAgPSBuZXcgTmd4U2VsZWN0T3B0R3JvdXAoaXRlbVt0aGlzLm9wdEdyb3VwTGFiZWxGaWVsZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1bdGhpcy5vcHRHcm91cE9wdGlvbnNGaWVsZF0uZm9yRWFjaCgoc3ViT3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9IHRoaXMuYnVpbGRPcHRpb24oc3ViT3B0aW9uLCBvcHRHcm91cCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdEdyb3VwLm9wdGlvbnMucHVzaChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gob3B0R3JvdXApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb24gPSB0aGlzLmJ1aWxkT3B0aW9uKGl0ZW0sIG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZE9wdGlvbihkYXRhOiBhbnksIHBhcmVudDogTmd4U2VsZWN0T3B0R3JvdXApOiBOZ3hTZWxlY3RPcHRpb24ge1xyXG4gICAgICAgIGxldCB2YWx1ZSwgdGV4dCwgZGlzYWJsZWQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0ZXh0ID0gZGF0YTtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiBkYXRhICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgIChwcm9wZXJ0eUV4aXN0cyhkYXRhLCB0aGlzLm9wdGlvblZhbHVlRmllbGQpIHx8IHByb3BlcnR5RXhpc3RzKGRhdGEsIHRoaXMub3B0aW9uVGV4dEZpZWxkKSkpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBwcm9wZXJ0eUV4aXN0cyhkYXRhLCB0aGlzLm9wdGlvblZhbHVlRmllbGQpID8gZGF0YVt0aGlzLm9wdGlvblZhbHVlRmllbGRdIDogZGF0YVt0aGlzLm9wdGlvblRleHRGaWVsZF07XHJcbiAgICAgICAgICAgIHRleHQgPSBwcm9wZXJ0eUV4aXN0cyhkYXRhLCB0aGlzLm9wdGlvblRleHRGaWVsZCkgPyBkYXRhW3RoaXMub3B0aW9uVGV4dEZpZWxkXSA6IGRhdGFbdGhpcy5vcHRpb25WYWx1ZUZpZWxkXTtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBwcm9wZXJ0eUV4aXN0cyhkYXRhLCAnZGlzYWJsZWQnKSA/IGRhdGFbJ2Rpc2FibGVkJ10gOiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOZ3hTZWxlY3RPcHRpb24odmFsdWUsIHRleHQsIGRpc2FibGVkLCBkYXRhLCBwYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLyBpbnRlcmZhY2UgQ29udHJvbFZhbHVlQWNjZXNzb3IgLy8vLy8vLy8vLy8vXHJcbiAgICBwdWJsaWMgb25DaGFuZ2UgPSAodjogYW55KSA9PiB2O1xyXG5cclxuICAgIHB1YmxpYyBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiBudWxsO1xyXG5cclxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdWJqRXh0ZXJuYWxWYWx1ZS5uZXh0KG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHt9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgICAgIHRoaXMuc3VialJlZ2lzdGVyT25DaGFuZ2UubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TkdYX1NFTEVDVF9PUFRJT05TLCBOZ3hTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vbmd4LXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQge05neFNlbGVjdE9wdGlvbkRpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uTm90Rm91bmREaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvblNlbGVjdGVkRGlyZWN0aXZlfSBmcm9tICcuL25neC10ZW1wbGF0ZXMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHtJTmd4U2VsZWN0T3B0aW9uc30gZnJvbSAnLi9uZ3gtc2VsZWN0LmludGVyZmFjZXMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtOZ3hTZWxlY3RDb21wb25lbnQsXHJcbiAgICAgICAgTmd4U2VsZWN0T3B0aW9uRGlyZWN0aXZlLCBOZ3hTZWxlY3RPcHRpb25TZWxlY3RlZERpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uTm90Rm91bmREaXJlY3RpdmVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbTmd4U2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgIE5neFNlbGVjdE9wdGlvbkRpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hTZWxlY3RNb2R1bGUge1xyXG4gICAgc3RhdGljIGZvclJvb3Qob3B0aW9uczogSU5neFNlbGVjdE9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogTmd4U2VsZWN0TW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTkdYX1NFTEVDVF9PUFRJT05TLCB1c2VWYWx1ZTogb3B0aW9uc31dXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiZXNjYXBlU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFHQSxJQUFNLFlBQVksR0FBRyxjQUFjLENBQUM7QUFFcEMsSUFBQTtJQUdJLHlCQUFtQixLQUFzQixFQUN0QixNQUNBLFVBQ0EsTUFDQzs7UUFKRCxVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUN0QixTQUFJLEdBQUosSUFBSTtRQUNKLGFBQVEsR0FBUixRQUFRO1FBQ1IsU0FBSSxHQUFKLElBQUk7UUFDSCxZQUFPLEdBQVAsT0FBTztvQkFOVyxRQUFRO2lDQWNSLElBQUk7S0FQekM7MEJBRVUsbUNBQU07Ozs7O1lBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7O0lBTWpCLG9DQUFVOzs7OztjQUFDLFNBQXVCLEVBQUUsYUFBcUI7UUFDNUQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssYUFBYSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7WUFDOUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQztZQUN4QyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FDL0UsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFB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
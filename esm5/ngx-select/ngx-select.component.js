/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Input, Output, ViewChild, Component, ElementRef, EventEmitter, forwardRef, HostListener, IterableDiffers, ChangeDetectorRef, ContentChild, TemplateRef, Optional, Inject, InjectionToken } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, BehaviorSubject, of, empty, from } from 'rxjs';
import { map, merge, combineLatest, distinctUntilChanged, share, tap, flatMap, filter, toArray } from 'rxjs/operators';
import * as lodashNs from 'lodash';
import * as escapeStringNs from 'escape-string-regexp';
import { NgxSelectOptGroup, NgxSelectOption } from './ngx-select.classes';
import { NgxSelectOptionDirective, NgxSelectOptionNotFoundDirective, NgxSelectOptionSelectedDirective } from './ngx-templates.directive';
/** @type {?} */
var _ = lodashNs;
/** @type {?} */
var escapeString = escapeStringNs;
/** @type {?} */
export var NGX_SELECT_OPTIONS = new InjectionToken('NGX_SELECT_OPTIONS');
/**
 * @record
 */
export function INgxSelectComponentMouseEvent() { }
/** @type {?|undefined} */
INgxSelectComponentMouseEvent.prototype.clickedSelectComponent;
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
        var regExp = new RegExp(escapeString(search), 'i');
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
export { NgxSelectComponent };
if (false) {
    /** @type {?} */
    NgxSelectComponent.prototype.items;
    /** @type {?} */
    NgxSelectComponent.prototype.optionValueField;
    /** @type {?} */
    NgxSelectComponent.prototype.optionTextField;
    /** @type {?} */
    NgxSelectComponent.prototype.optGroupLabelField;
    /** @type {?} */
    NgxSelectComponent.prototype.optGroupOptionsField;
    /** @type {?} */
    NgxSelectComponent.prototype.multiple;
    /** @type {?} */
    NgxSelectComponent.prototype.allowClear;
    /** @type {?} */
    NgxSelectComponent.prototype.placeholder;
    /** @type {?} */
    NgxSelectComponent.prototype.noAutoComplete;
    /** @type {?} */
    NgxSelectComponent.prototype.disabled;
    /** @type {?} */
    NgxSelectComponent.prototype.defaultValue;
    /** @type {?} */
    NgxSelectComponent.prototype.autoSelectSingleOption;
    /** @type {?} */
    NgxSelectComponent.prototype.autoClearSearch;
    /** @type {?} */
    NgxSelectComponent.prototype.noResultsFound;
    /** @type {?} */
    NgxSelectComponent.prototype.size;
    /** @type {?} */
    NgxSelectComponent.prototype.searchCallback;
    /** @type {?} */
    NgxSelectComponent.prototype.keyCodeToRemoveSelected;
    /** @type {?} */
    NgxSelectComponent.prototype.keyCodeToOptionsOpen;
    /** @type {?} */
    NgxSelectComponent.prototype.keyCodeToOptionsClose;
    /** @type {?} */
    NgxSelectComponent.prototype.keyCodeToOptionsSelect;
    /** @type {?} */
    NgxSelectComponent.prototype.keyCodeToNavigateFirst;
    /** @type {?} */
    NgxSelectComponent.prototype.keyCodeToNavigatePrevious;
    /** @type {?} */
    NgxSelectComponent.prototype.keyCodeToNavigateNext;
    /** @type {?} */
    NgxSelectComponent.prototype.keyCodeToNavigateLast;
    /** @type {?} */
    NgxSelectComponent.prototype.typed;
    /** @type {?} */
    NgxSelectComponent.prototype.focus;
    /** @type {?} */
    NgxSelectComponent.prototype.blur;
    /** @type {?} */
    NgxSelectComponent.prototype.open;
    /** @type {?} */
    NgxSelectComponent.prototype.close;
    /** @type {?} */
    NgxSelectComponent.prototype.select;
    /** @type {?} */
    NgxSelectComponent.prototype.remove;
    /** @type {?} */
    NgxSelectComponent.prototype.navigated;
    /** @type {?} */
    NgxSelectComponent.prototype.selectionChanges;
    /** @type {?} */
    NgxSelectComponent.prototype.mainElRef;
    /** @type {?} */
    NgxSelectComponent.prototype.inputElRef;
    /** @type {?} */
    NgxSelectComponent.prototype.choiceMenuElRef;
    /** @type {?} */
    NgxSelectComponent.prototype.templateOption;
    /** @type {?} */
    NgxSelectComponent.prototype.templateSelectedOption;
    /** @type {?} */
    NgxSelectComponent.prototype.templateOptionNotFound;
    /** @type {?} */
    NgxSelectComponent.prototype.optionsOpened;
    /** @type {?} */
    NgxSelectComponent.prototype.optionsFiltered;
    /** @type {?} */
    NgxSelectComponent.prototype.optionActive;
    /** @type {?} */
    NgxSelectComponent.prototype.itemsDiffer;
    /** @type {?} */
    NgxSelectComponent.prototype.defaultValueDiffer;
    /** @type {?} */
    NgxSelectComponent.prototype.actualValue;
    /** @type {?} */
    NgxSelectComponent.prototype.subjOptions;
    /** @type {?} */
    NgxSelectComponent.prototype.subjSearchText;
    /** @type {?} */
    NgxSelectComponent.prototype.subjOptionsSelected;
    /** @type {?} */
    NgxSelectComponent.prototype.subjExternalValue;
    /** @type {?} */
    NgxSelectComponent.prototype.subjDefaultValue;
    /** @type {?} */
    NgxSelectComponent.prototype.subjRegisterOnChange;
    /** @type {?} */
    NgxSelectComponent.prototype.cacheOptionsFilteredFlat;
    /** @type {?} */
    NgxSelectComponent.prototype.cacheElementOffsetTop;
    /** @type {?} */
    NgxSelectComponent.prototype._focusToInput;
    /** @type {?} */
    NgxSelectComponent.prototype.isFocused;
    /** @type {?} */
    NgxSelectComponent.prototype.onChange;
    /** @type {?} */
    NgxSelectComponent.prototype.onTouched;
    /** @type {?} */
    NgxSelectComponent.prototype.sanitizer;
    /** @type {?} */
    NgxSelectComponent.prototype.cd;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2VsZWN0LWV4LyIsInNvdXJjZXMiOlsibmd4LXNlbGVjdC9uZ3gtc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUMyQixLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFDdEQsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBa0IsZUFBZSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFDL0gsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUNoRCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLFlBQVksRUFBVyxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxPQUFPLEVBQWMsZUFBZSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzNFLE9BQU8sRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFckgsT0FBTyxLQUFLLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFDbkMsT0FBTyxLQUFLLGNBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFnQixNQUFNLHNCQUFzQixDQUFDO0FBQ3ZGLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxnQ0FBZ0MsRUFBRSxnQ0FBZ0MsRUFBQyxNQUFNLDJCQUEyQixDQUFDOztBQUd2SSxJQUFNLENBQUMsR0FBRyxRQUFRLENBQUM7O0FBQ25CLElBQU0sWUFBWSxHQUFHLGNBQWMsQ0FB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QVksU0FBQyxnQ0FBZ0MsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUM7Z0NBd0lsRSxZQUFZLFNBQUMsa0JBQWtCLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FDM0MsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOzs2QkFqTzlDOztTQThDYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgRG9DaGVjaywgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLFxyXG4gICAgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciwgSXRlcmFibGVEaWZmZXIsIEl0ZXJhYmxlRGlmZmVycywgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbnRlbnRDaGlsZCxcclxuICAgIFRlbXBsYXRlUmVmLCBPcHRpb25hbCwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQge1N1YmplY3QsIE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgb2YsIGVtcHR5LCBmcm9tfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHttYXAsIG1lcmdlLCBjb21iaW5lTGF0ZXN0LCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2hhcmUsIHRhcCwgZmxhdE1hcCwgZmlsdGVyLCB0b0FycmF5fSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgKiBhcyBsb2Rhc2hOcyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGVTdHJpbmdOcyBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XHJcbmltcG9ydCB7Tmd4U2VsZWN0T3B0R3JvdXAsIE5neFNlbGVjdE9wdGlvbiwgVFNlbGVjdE9wdGlvbn0gZnJvbSAnLi9uZ3gtc2VsZWN0LmNsYXNzZXMnO1xyXG5pbXBvcnQge05neFNlbGVjdE9wdGlvbkRpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uTm90Rm91bmREaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvblNlbGVjdGVkRGlyZWN0aXZlfSBmcm9tICcuL25neC10ZW1wbGF0ZXMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHtJTmd4T3B0aW9uTmF2aWdhdGVkLCBJTmd4U2VsZWN0T3B0aW9uLCBJTmd4U2VsZWN0T3B0aW9uc30gZnJvbSAnLi9uZ3gtc2VsZWN0LmludGVyZmFjZXMnO1xyXG5cclxuY29uc3QgXyA9IGxvZGFzaE5zO1xyXG5jb25zdCBlc2NhcGVTdHJpbmcgPSBlc2NhcGVTdHJpbmdOcztcclxuXHJcbmV4cG9ydCBjb25zdCBOR1hfU0VMRUNUX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignTkdYX1NFTEVDVF9PUFRJT05TJyk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOZ3hTZWxlY3RDb21wb25lbnRNb3VzZUV2ZW50IGV4dGVuZHMgTW91c2VFdmVudCB7XHJcbiAgICBjbGlja2VkU2VsZWN0Q29tcG9uZW50PzogTmd4U2VsZWN0Q29tcG9uZW50O1xyXG59XHJcblxyXG5lbnVtIEVOYXZpZ2F0aW9uIHtcclxuICAgIGZpcnN0LCBwcmV2aW91cywgbmV4dCwgbGFzdCxcclxuICAgIGZpcnN0U2VsZWN0ZWQsIGZpcnN0SWZPcHRpb25BY3RpdmVJbnZpc2libGVcclxufVxyXG5cclxuZnVuY3Rpb24gcHJvcGVydHlFeGlzdHMob2JqOiBPYmplY3QsIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gcHJvcGVydHlOYW1lIGluIG9iajtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1zZWxlY3QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4U2VsZWN0Q29tcG9uZW50KSxcclxuICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBJTmd4U2VsZWN0T3B0aW9ucywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIERvQ2hlY2ssIEFmdGVyQ29udGVudENoZWNrZWQge1xyXG4gICAgQElucHV0KCkgcHVibGljIGl0ZW1zOiBhbnlbXTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25WYWx1ZUZpZWxkID0gJ2lkJztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25UZXh0RmllbGQgPSAndGV4dCc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgb3B0R3JvdXBMYWJlbEZpZWxkID0gJ2xhYmVsJztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvcHRHcm91cE9wdGlvbnNGaWVsZCA9ICdvcHRpb25zJztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIGFsbG93Q2xlYXIgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBwbGFjZWhvbGRlciA9ICcnO1xyXG4gICAgQElucHV0KCkgcHVibGljIG5vQXV0b0NvbXBsZXRlID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBkZWZhdWx0VmFsdWU6IGFueVtdID0gW107XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYXV0b1NlbGVjdFNpbmdsZU9wdGlvbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIGF1dG9DbGVhclNlYXJjaCA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIG5vUmVzdWx0c0ZvdW5kID0gJ05vIHJlc3VsdHMgZm91bmQnO1xyXG4gICAgQElucHV0KCkgcHVibGljIHNpemU6ICdzbWFsbCcgfCAnZGVmYXVsdCcgfCAnbGFyZ2UnID0gJ2RlZmF1bHQnO1xyXG4gICAgQElucHV0KCkgcHVibGljIHNlYXJjaENhbGxiYWNrOiAoc2VhcmNoOiBzdHJpbmcsIGl0ZW06IElOZ3hTZWxlY3RPcHRpb24pID0+IGJvb2xlYW47XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvUmVtb3ZlU2VsZWN0ZWQgPSAnRGVsZXRlJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9PcHRpb25zT3BlbiA9ICdFbnRlcic7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvT3B0aW9uc0Nsb3NlID0gJ0VzY2FwZSc7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvT3B0aW9uc1NlbGVjdCA9ICdFbnRlcic7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvTmF2aWdhdGVGaXJzdCA9ICdBcnJvd0xlZnQnO1xyXG4gICAgcHVibGljIGtleUNvZGVUb05hdmlnYXRlUHJldmlvdXMgPSAnQXJyb3dVcCc7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvTmF2aWdhdGVOZXh0ID0gJ0Fycm93RG93bic7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvTmF2aWdhdGVMYXN0ID0gJ0Fycm93UmlnaHQnO1xyXG5cclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgdHlwZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgZm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgcmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIG5hdmlnYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SU5neE9wdGlvbk5hdmlnYXRlZD4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2VsZWN0aW9uQ2hhbmdlcyA9IG5ldyBFdmVudEVtaXR0ZXI8SU5neFNlbGVjdE9wdGlvbltdPigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ21haW4nKSBwcm90ZWN0ZWQgbWFpbkVsUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnKSBwcm90ZWN0ZWQgaW5wdXRFbFJlZjogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2Nob2ljZU1lbnUnKSBwcm90ZWN0ZWQgY2hvaWNlTWVudUVsUmVmOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoTmd4U2VsZWN0T3B0aW9uRGlyZWN0aXZlLCB7cmVhZDogVGVtcGxhdGVSZWZ9KSB0ZW1wbGF0ZU9wdGlvbjogTmd4U2VsZWN0T3B0aW9uRGlyZWN0aXZlO1xyXG4gICAgQENvbnRlbnRDaGlsZChOZ3hTZWxlY3RPcHRpb25TZWxlY3RlZERpcmVjdGl2ZSwge3JlYWQ6IFRlbXBsYXRlUmVmfSkgdGVtcGxhdGVTZWxlY3RlZE9wdGlvbjogTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmU7XHJcbiAgICBAQ29udGVudENoaWxkKE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlLCB7cmVhZDogVGVtcGxhdGVSZWZ9KSB0ZW1wbGF0ZU9wdGlvbk5vdEZvdW5kOiBOZ3hTZWxlY3RPcHRpb25Ob3RGb3VuZERpcmVjdGl2ZTtcclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uc09wZW5lZCA9IGZhbHNlO1xyXG4gICAgcHVibGljIG9wdGlvbnNGaWx0ZXJlZDogVFNlbGVjdE9wdGlvbltdO1xyXG5cclxuICAgIHByaXZhdGUgb3B0aW9uQWN0aXZlOiBOZ3hTZWxlY3RPcHRpb247XHJcbiAgICBwcml2YXRlIGl0ZW1zRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxhbnk+O1xyXG4gICAgcHJpdmF0ZSBkZWZhdWx0VmFsdWVEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPGFueVtdPjtcclxuICAgIHByaXZhdGUgYWN0dWFsVmFsdWU6IGFueVtdID0gW107XHJcblxyXG4gICAgcHVibGljIHN1YmpPcHRpb25zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUU2VsZWN0T3B0aW9uW10+KFtdKTtcclxuICAgIHByaXZhdGUgc3VialNlYXJjaFRleHQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG5cclxuICAgIHByaXZhdGUgc3Viak9wdGlvbnNTZWxlY3RlZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Tmd4U2VsZWN0T3B0aW9uW10+KFtdKTtcclxuICAgIHByaXZhdGUgc3ViakV4dGVybmFsVmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueVtdPihbXSk7XHJcbiAgICBwcml2YXRlIHN1YmpEZWZhdWx0VmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueVtdPihbXSk7XHJcbiAgICBwcml2YXRlIHN1YmpSZWdpc3Rlck9uQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgICBwcml2YXRlIGNhY2hlT3B0aW9uc0ZpbHRlcmVkRmxhdDogTmd4U2VsZWN0T3B0aW9uW107XHJcbiAgICBwcml2YXRlIGNhY2hlRWxlbWVudE9mZnNldFRvcDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX2ZvY3VzVG9JbnB1dCA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzRm9jdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGl0ZXJhYmxlRGlmZmVyczogSXRlcmFibGVEaWZmZXJzLCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICAgIEBJbmplY3QoTkdYX1NFTEVDVF9PUFRJT05TKSBAT3B0aW9uYWwoKSBkZWZhdWx0T3B0aW9uczogSU5neFNlbGVjdE9wdGlvbnMpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gZGlmZmVyc1xyXG4gICAgICAgIHRoaXMuaXRlbXNEaWZmZXIgPSBpdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlPGFueT4obnVsbCk7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0VmFsdWVEaWZmZXIgPSBpdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlPGFueT4obnVsbCk7XHJcblxyXG4gICAgICAgIC8vIG9ic2VydmVyc1xyXG4gICAgICAgIHRoaXMudHlwZWQuc3Vic2NyaWJlKCh0ZXh0OiBzdHJpbmcpID0+IHRoaXMuc3VialNlYXJjaFRleHQubmV4dCh0ZXh0KSk7XHJcbiAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnN1YnNjcmliZSgob3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+IHRoaXMuc2VsZWN0aW9uQ2hhbmdlcy5lbWl0KG9wdGlvbnMpKTtcclxuICAgICAgICBsZXQgY2FjaGVFeHRlcm5hbFZhbHVlOiBhbnlbXTtcclxuICAgICAgICBjb25zdCBzdWJqQWN0dWFsVmFsdWUgPSB0aGlzLnN1YmpFeHRlcm5hbFZhbHVlXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKCh2OiBhbnlbXSkgPT4gY2FjaGVFeHRlcm5hbFZhbHVlID0gdiA9PT0gbnVsbCA/IFtdIDogW10uY29uY2F0KHYpKSxcclxuICAgICAgICAgICAgICAgIG1lcmdlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoKG9wdGlvbnM6IE5neFNlbGVjdE9wdGlvbltdKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5tYXAoKG86IE5neFNlbGVjdE9wdGlvbikgPT4gby52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMuc3ViakRlZmF1bHRWYWx1ZSwgKGVWYWw6IGFueVtdLCBkVmFsOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VmFsID0gXy5pc0VxdWFsKGVWYWwsIGRWYWwpID8gW10gOiBlVmFsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbC5sZW5ndGggPyBuZXdWYWwgOiBkVmFsO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoeCwgeSkgPT4gXy5pc0VxdWFsKHgsIHkpKSxcclxuICAgICAgICAgICAgICAgIHNoYXJlKClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgc3ViakFjdHVhbFZhbHVlXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLnN1YmpSZWdpc3Rlck9uQ2hhbmdlLCAoYWN0dWFsVmFsdWU6IGFueVtdKSA9PiBhY3R1YWxWYWx1ZSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChhY3R1YWxWYWx1ZTogYW55W10pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsVmFsdWUgPSBhY3R1YWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICghXy5pc0VxdWFsKGFjdHVhbFZhbHVlLCBjYWNoZUV4dGVybmFsVmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVFeHRlcm5hbFZhbHVlID0gYWN0dWFsVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShhY3R1YWxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShhY3R1YWxWYWx1ZS5sZW5ndGggPyBhY3R1YWxWYWx1ZVswXSA6IG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3Viak9wdGlvbnNcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBmbGF0TWFwKChvcHRpb25zOiBUU2VsZWN0T3B0aW9uW10pID0+IGZyb20ob3B0aW9ucylcclxuICAgICAgICAgICAgICAgIC5waXBlKGZsYXRNYXAoKG9wdGlvbjogVFNlbGVjdE9wdGlvbikgPT4gb3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgPyBvZihvcHRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgOiAob3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0R3JvdXAgPyBmcm9tKG9wdGlvbi5vcHRpb25zKSA6IGVtcHR5KCkpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgdG9BcnJheSgpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgY29tYmluZUxhdGVzdChzdWJqQWN0dWFsVmFsdWUsIChvcHRpb25zRmxhdDogTmd4U2VsZWN0T3B0aW9uW10sIGFjdHVhbFZhbHVlOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb20ob3B0aW9uc0ZsYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoKG9wdGlvbjogTmd4U2VsZWN0T3B0aW9uKSA9PiBhY3R1YWxWYWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgIT09IC0xKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvQXJyYXkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcigob3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+ICFfLmlzRXF1YWwob3B0aW9ucywgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlKSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKG9wdGlvbnM6IE5neFNlbGVjdE9wdGlvbltdKSA9PiB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQubmV4dChvcHRpb25zKSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1xyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLCB0aGlzLnN1YmpTZWFyY2hUZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIChvcHRpb25zOiBUU2VsZWN0T3B0aW9uW10sIHNlbGVjdGVkT3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10sIHNlYXJjaDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0ZpbHRlcmVkID0gdGhpcy5maWx0ZXJPcHRpb25zKHNlYXJjaCwgb3B0aW9ucywgc2VsZWN0ZWRPcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZU9wdGlvbnNGaWx0ZXJlZEZsYXQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlT3B0aW9uKEVOYXZpZ2F0aW9uLmZpcnN0SWZPcHRpb25BY3RpdmVJbnZpc2libGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBmbGF0TWFwKChzZWxlY3RlZE9wdGlvbnM6IE5neFNlbGVjdE9wdGlvbltdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc0ZpbHRlcmVkRmxhdCgpLnBpcGUoZmlsdGVyKChmbGF0T3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b1NlbGVjdFNpbmdsZU9wdGlvbiAmJiBmbGF0T3B0aW9ucy5sZW5ndGggPT09IDEgJiYgIXNlbGVjdGVkT3B0aW9ucy5sZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGZsYXRPcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSkgPT4gdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLm5leHQoZmxhdE9wdGlvbnMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Rm9ybUNvbnRyb2xTaXplKG90aGVyQ2xhc3NOYW1lczogT2JqZWN0ID0ge30sIHVzZUZvcm1Db250cm9sOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sRXh0cmFDbGFzc2VzID0gdXNlRm9ybUNvbnRyb2wgPyB7XHJcbiAgICAgICAgICAgICdmb3JtLWNvbnRyb2wtc20gaW5wdXQtc20nOiB0aGlzLnNpemUgPT09ICdzbWFsbCcsXHJcbiAgICAgICAgICAgICdmb3JtLWNvbnRyb2wtbGcgaW5wdXQtbGcnOiB0aGlzLnNpemUgPT09ICdsYXJnZSdcclxuICAgICAgICB9IDoge307XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZm9ybUNvbnRyb2xFeHRyYUNsYXNzZXMsIG90aGVyQ2xhc3NOYW1lcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJ0blNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHsnYnRuLXNtJzogdGhpcy5zaXplID09PSAnc21hbGwnLCAnYnRuLWxnJzogdGhpcy5zaXplID09PSAnbGFyZ2UnfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG9wdGlvbnNTZWxlY3RlZCgpOiBOZ3hTZWxlY3RPcHRpb25bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFpbkNsaWNrZWQoZXZlbnQ6IElOZ3hTZWxlY3RDb21wb25lbnRNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuY2xpY2tlZFNlbGVjdENvbXBvbmVudCA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRm9jdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXMuZW1pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpmb2N1c2luJywgWyckZXZlbnQnXSlcclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIHB1YmxpYyBkb2N1bWVudENsaWNrKGV2ZW50OiBJTmd4U2VsZWN0Q29tcG9uZW50TW91c2VFdmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5jbGlja2VkU2VsZWN0Q29tcG9uZW50ICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnNPcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0Nsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTsgLy8gZml4IGVycm9yIGJlY2F1c2Ugb2YgZGVsYXkgYmV0d2VlbiBkaWZmZXJlbnQgZXZlbnRzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGb2N1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ibHVyLmVtaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wdGlvbnNGaWx0ZXJlZEZsYXQoKTogT2JzZXJ2YWJsZTxOZ3hTZWxlY3RPcHRpb25bXT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlT3B0aW9uc0ZpbHRlcmVkRmxhdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5jYWNoZU9wdGlvbnNGaWx0ZXJlZEZsYXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5vcHRpb25zRmlsdGVyZWQpXHJcbiAgICAgICAgICAgIC5waXBlKGZsYXRNYXA8VFNlbGVjdE9wdGlvbiwgTmd4U2VsZWN0T3B0aW9uPigob3B0aW9uOiBUU2VsZWN0T3B0aW9uKSA9PlxyXG4gICAgICAgICAgICAgICAgb3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0aW9uID8gb2Yob3B0aW9uKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgKG9wdGlvbiBpbnN0YW5jZW9mIE5neFNlbGVjdE9wdEdyb3VwID8gZnJvbShvcHRpb24ub3B0aW9uc0ZpbHRlcmVkKSA6IGVtcHR5KCkpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyKChvcHRpb25zRmlsdGVyZWRGbGF0OiBOZ3hTZWxlY3RPcHRpb24pID0+ICFvcHRpb25zRmlsdGVyZWRGbGF0LmRpc2FibGVkKSxcclxuICAgICAgICAgICAgICAgIHRvQXJyYXkoKSxcclxuICAgICAgICAgICAgICAgIHRhcCgob3B0aW9uc0ZpbHRlcmVkRmxhdDogTmd4U2VsZWN0T3B0aW9uW10pID0+IHRoaXMuY2FjaGVPcHRpb25zRmlsdGVyZWRGbGF0ID0gb3B0aW9uc0ZpbHRlcmVkRmxhdClcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5hdmlnYXRlT3B0aW9uKG5hdmlnYXRpb246IEVOYXZpZ2F0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zRmlsdGVyZWRGbGF0KClcclxuICAgICAgICAgICAgLnBpcGUobWFwPE5neFNlbGVjdE9wdGlvbltdLCBJTmd4T3B0aW9uTmF2aWdhdGVkPigob3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdmlnYXRlZDogSU5neE9wdGlvbk5hdmlnYXRlZCA9IHtpbmRleDogLTEsIGFjdGl2ZU9wdGlvbjogbnVsbCwgZmlsdGVyZWRPcHRpb25MaXN0OiBvcHRpb25zfTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdBY3RpdmVJZHg7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5hdmlnYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEVOYXZpZ2F0aW9uLmZpcnN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZWQuaW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEVOYXZpZ2F0aW9uLnByZXZpb3VzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBY3RpdmVJZHggPSBvcHRpb25zLmluZGV4T2YodGhpcy5vcHRpb25BY3RpdmUpIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGVkLmluZGV4ID0gbmV3QWN0aXZlSWR4ID49IDAgPyBuZXdBY3RpdmVJZHggOiBvcHRpb25zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRU5hdmlnYXRpb24ubmV4dDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QWN0aXZlSWR4ID0gb3B0aW9ucy5pbmRleE9mKHRoaXMub3B0aW9uQWN0aXZlKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlZC5pbmRleCA9IG5ld0FjdGl2ZUlkeCA8IG9wdGlvbnMubGVuZ3RoID8gbmV3QWN0aXZlSWR4IDogMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFTmF2aWdhdGlvbi5sYXN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZWQuaW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRU5hdmlnYXRpb24uZmlyc3RTZWxlY3RlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlZC5pbmRleCA9IG9wdGlvbnMuaW5kZXhPZih0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRU5hdmlnYXRpb24uZmlyc3RJZk9wdGlvbkFjdGl2ZUludmlzaWJsZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4T2ZPcHRpb25BY3RpdmUgPSBvcHRpb25zLmluZGV4T2YodGhpcy5vcHRpb25BY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZWQuaW5kZXggPSBpZHhPZk9wdGlvbkFjdGl2ZSA+IDAgPyBpZHhPZk9wdGlvbkFjdGl2ZSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGVkLmFjdGl2ZU9wdGlvbiA9IG9wdGlvbnNbbmF2aWdhdGVkLmluZGV4XTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYXZpZ2F0ZWQ7XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChuZXdOYXZpZ2F0ZWQ6IElOZ3hPcHRpb25OYXZpZ2F0ZWQpID0+IHRoaXMub3B0aW9uQWN0aXZhdGUobmV3TmF2aWdhdGVkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nRG9DaGVjaygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pdGVtc0RpZmZlci5kaWZmKHRoaXMuaXRlbXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Viak9wdGlvbnMubmV4dCh0aGlzLmJ1aWxkT3B0aW9ucyh0aGlzLml0ZW1zKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWZWYWwgPSB0aGlzLmRlZmF1bHRWYWx1ZSA/IFtdLmNvbmNhdCh0aGlzLmRlZmF1bHRWYWx1ZSkgOiBbXTtcclxuICAgICAgICBpZiAodGhpcy5kZWZhdWx0VmFsdWVEaWZmZXIuZGlmZihkZWZWYWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViakRlZmF1bHRWYWx1ZS5uZXh0KGRlZlZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZvY3VzVG9JbnB1dCAmJiB0aGlzLmNoZWNrSW5wdXRWaXNpYmlsaXR5KCkgJiYgdGhpcy5pbnB1dEVsUmVmICYmXHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbFJlZi5uYXRpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzVG9JbnB1dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RWxSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2FuQ2xlYXJOb3RNdWx0aXBsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hbGxvd0NsZWFyICYmICEhdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICAoIXRoaXMuc3ViakRlZmF1bHRWYWx1ZS52YWx1ZS5sZW5ndGggfHwgdGhpcy5zdWJqRGVmYXVsdFZhbHVlLnZhbHVlWzBdICE9PSB0aGlzLmFjdHVhbFZhbHVlWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZm9jdXNUb0lucHV0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzVG9JbnB1dCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlucHV0S2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGNvbnN0IGtleXNGb3JPcGVuZWRTdGF0ZSA9IFtcclxuICAgICAgICAgICAgdGhpcy5rZXlDb2RlVG9PcHRpb25zU2VsZWN0LFxyXG4gICAgICAgICAgICB0aGlzLmtleUNvZGVUb05hdmlnYXRlRmlyc3QsXHJcbiAgICAgICAgICAgIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVQcmV2aW91cyxcclxuICAgICAgICAgICAgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZU5leHQsXHJcbiAgICAgICAgICAgIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVMYXN0LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgY29uc3Qga2V5c0ZvckNsb3NlZFN0YXRlID0gW3RoaXMua2V5Q29kZVRvT3B0aW9uc09wZW4sIHRoaXMua2V5Q29kZVRvUmVtb3ZlU2VsZWN0ZWRdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zT3BlbmVkICYmIGtleXNGb3JPcGVuZWRTdGF0ZS5pbmRleE9mKGV2ZW50LmNvZGUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMua2V5Q29kZVRvT3B0aW9uc1NlbGVjdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvblNlbGVjdCh0aGlzLm9wdGlvbkFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZUZpcnN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24uZmlyc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmtleUNvZGVUb05hdmlnYXRlUHJldmlvdXM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5wcmV2aW91cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVMYXN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24ubGFzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVOZXh0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24ubmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnNPcGVuZWQgJiYga2V5c0ZvckNsb3NlZFN0YXRlLmluZGV4T2YoZXZlbnQuY29kZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9PcHRpb25zT3BlbjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNPcGVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMua2V5Q29kZVRvUmVtb3ZlU2VsZWN0ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25SZW1vdmUodGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlW3RoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZS5sZW5ndGggLSAxXSwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYWluS2V5VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gdGhpcy5rZXlDb2RlVG9PcHRpb25zQ2xvc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2xvc2UoLyp0cnVlKi8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdHJhY2tCeU9wdGlvbihpbmRleDogbnVtYmVyLCBvcHRpb246IFRTZWxlY3RPcHRpb24pIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0aW9uID8gb3B0aW9uLnZhbHVlIDpcclxuICAgICAgICAgICAgKG9wdGlvbiBpbnN0YW5jZW9mIE5neFNlbGVjdE9wdEdyb3VwID8gb3B0aW9uLmxhYmVsIDogb3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tJbnB1dFZpc2liaWxpdHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm11bHRpcGxlID09PSB0cnVlKSB8fCAodGhpcy5vcHRpb25zT3BlbmVkICYmICF0aGlzLm5vQXV0b0NvbXBsZXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgaW5wdXRLZXlVcCh2YWx1ZTogc3RyaW5nID0gJycpIHtcclxuICAgICAgICBpZiAoIXRoaXMub3B0aW9uc09wZW5lZCAmJiB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNPcGVuKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGRvSW5wdXRUZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zT3BlbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZWQuZW1pdCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBpbnB1dENsaWNrKHZhbHVlOiBzdHJpbmcgPSAnJykge1xyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zT3BlbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc09wZW4odmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgc2FuaXRpemUoaHRtbDogc3RyaW5nKTogU2FmZUh0bWwge1xyXG4gICAgICAgIHJldHVybiBodG1sID8gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbCkgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBoaWdobGlnaHRPcHRpb24ob3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pOiBTYWZlSHRtbCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRFbFJlZikge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnJlbmRlclRleHQodGhpcy5zYW5pdGl6ZXIsIHRoaXMuaW5wdXRFbFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbi5yZW5kZXJUZXh0KHRoaXMuc2FuaXRpemVyLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIG9wdGlvblNlbGVjdChvcHRpb246IE5neFNlbGVjdE9wdGlvbiwgZXZlbnQ6IEV2ZW50ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbiAmJiAhb3B0aW9uLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC5uZXh0KCh0aGlzLm11bHRpcGxlID8gdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlIDogW10pLmNvbmNhdChbb3B0aW9uXSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KG9wdGlvbi52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0Nsb3NlKC8qdHJ1ZSovKTtcclxuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIG9wdGlvblJlbW92ZShvcHRpb246IE5neFNlbGVjdE9wdGlvbiwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmIG9wdGlvbikge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLm5leHQoKHRoaXMubXVsdGlwbGUgPyB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWUgOiBbXSkuZmlsdGVyKG8gPT4gbyAhPT0gb3B0aW9uKSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlLmVtaXQob3B0aW9uLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGlzT3B0aW9uQWN0aXZlKG9wdGlvbjogTmd4U2VsZWN0T3B0aW9uLCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbkFjdGl2ZSA9PT0gb3B0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5zdXJlVmlzaWJsZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIG9wdGlvbkFjdGl2YXRlKG5hdmlnYXRlZDogSU5neE9wdGlvbk5hdmlnYXRlZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICgodGhpcy5vcHRpb25BY3RpdmUgIT09IG5hdmlnYXRlZC5hY3RpdmVPcHRpb24pICYmXHJcbiAgICAgICAgICAgICghbmF2aWdhdGVkLmFjdGl2ZU9wdGlvbiB8fCAhbmF2aWdhdGVkLmFjdGl2ZU9wdGlvbi5kaXNhYmxlZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25BY3RpdmUgPSBuYXZpZ2F0ZWQuYWN0aXZlT3B0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlZC5lbWl0KG5hdmlnYXRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmlsdGVyT3B0aW9ucyhzZWFyY2g6IHN0cmluZywgb3B0aW9uczogVFNlbGVjdE9wdGlvbltdLCBzZWxlY3RlZE9wdGlvbnM6IE5neFNlbGVjdE9wdGlvbltdKTogVFNlbGVjdE9wdGlvbltdIHtcclxuICAgICAgICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGVzY2FwZVN0cmluZyhzZWFyY2gpLCAnaScpLFxyXG4gICAgICAgICAgICBmaWx0ZXJPcHRpb24gPSAob3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoQ2FsbGJhY2soc2VhcmNoLCBvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICghc2VhcmNoIHx8IHJlZ0V4cC50ZXN0KG9wdGlvbi50ZXh0KSkgJiYgKCF0aGlzLm11bHRpcGxlIHx8IHNlbGVjdGVkT3B0aW9ucy5pbmRleE9mKG9wdGlvbikgPT09IC0xKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKChvcHRpb246IFRTZWxlY3RPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbiBpbnN0YW5jZW9mIE5neFNlbGVjdE9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlck9wdGlvbig8Tmd4U2VsZWN0T3B0aW9uPm9wdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0R3JvdXApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk9wID0gPE5neFNlbGVjdE9wdEdyb3VwPm9wdGlvbjtcclxuICAgICAgICAgICAgICAgIHN1Yk9wLmZpbHRlcigoc3ViT3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pID0+IGZpbHRlck9wdGlvbihzdWJPcHRpb24pKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdWJPcC5vcHRpb25zRmlsdGVyZWQubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbnN1cmVWaXNpYmxlRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNob2ljZU1lbnVFbFJlZiAmJiB0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcCAhPT0gZWxlbWVudC5vZmZzZXRUb3ApIHtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZUVsZW1lbnRPZmZzZXRUb3AgPSBlbGVtZW50Lm9mZnNldFRvcDtcclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyOiBIVE1MRWxlbWVudCA9IHRoaXMuY2hvaWNlTWVudUVsUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcCA8IGNvbnRhaW5lci5zY3JvbGxUb3ApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ID4gY29udGFpbmVyLnNjcm9sbFRvcCArIGNvbnRhaW5lci5jbGllbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gY29udGFpbmVyLmNsaWVudEhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uc09wZW4oc2VhcmNoOiBzdHJpbmcgPSAnJykge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNPcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN1YmpTZWFyY2hUZXh0Lm5leHQoc2VhcmNoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmIHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24uZmlyc3RTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlT3B0aW9uKEVOYXZpZ2F0aW9uLmZpcnN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZvY3VzVG9JbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLm9wZW4uZW1pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uc0Nsb3NlKC8qZm9jdXNUb0hvc3Q6IGJvb2xlYW4gPSBmYWxzZSovKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zT3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgLy8gaWYgKGZvY3VzVG9Ib3N0KSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHggPSB3aW5kb3cuc2Nyb2xsWCwgeSA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm1haW5FbFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgLy8gICAgIHdpbmRvdy5zY3JvbGxUbyh4LCB5KTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5jbG9zZS5lbWl0KCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmF1dG9DbGVhclNlYXJjaCAmJiB0aGlzLm11bHRpcGxlICYmIHRoaXMuaW5wdXRFbFJlZikge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0RWxSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRPcHRpb25zKGRhdGE6IGFueVtdKTogQXJyYXk8Tmd4U2VsZWN0T3B0aW9uIHwgTmd4U2VsZWN0T3B0R3JvdXA+IHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IEFycmF5PE5neFNlbGVjdE9wdGlvbiB8IE5neFNlbGVjdE9wdEdyb3VwPiA9IFtdO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb246IE5neFNlbGVjdE9wdGlvbjtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzT3B0R3JvdXAgPSB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5RXhpc3RzKGl0ZW0sIHRoaXMub3B0R3JvdXBMYWJlbEZpZWxkKSAmJiBwcm9wZXJ0eUV4aXN0cyhpdGVtLCB0aGlzLm9wdEdyb3VwT3B0aW9uc0ZpZWxkKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoaXRlbVt0aGlzLm9wdEdyb3VwT3B0aW9uc0ZpZWxkXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNPcHRHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdEdyb3VwID0gbmV3IE5neFNlbGVjdE9wdEdyb3VwKGl0ZW1bdGhpcy5vcHRHcm91cExhYmVsRmllbGRdKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtW3RoaXMub3B0R3JvdXBPcHRpb25zRmllbGRdLmZvckVhY2goKHN1Yk9wdGlvbjogTmd4U2VsZWN0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPSB0aGlzLmJ1aWxkT3B0aW9uKHN1Yk9wdGlvbiwgb3B0R3JvdXApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRHcm91cC5vcHRpb25zLnB1c2gob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9wdEdyb3VwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9uID0gdGhpcy5idWlsZE9wdGlvbihpdGVtLCBudWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnVpbGRPcHRpb24oZGF0YTogYW55LCBwYXJlbnQ6IE5neFNlbGVjdE9wdEdyb3VwKTogTmd4U2VsZWN0T3B0aW9uIHtcclxuICAgICAgICBsZXQgdmFsdWUsIHRleHQsIGRpc2FibGVkO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdGV4dCA9IGRhdGE7XHJcbiAgICAgICAgICAgIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgZGF0YSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAocHJvcGVydHlFeGlzdHMoZGF0YSwgdGhpcy5vcHRpb25WYWx1ZUZpZWxkKSB8fCBwcm9wZXJ0eUV4aXN0cyhkYXRhLCB0aGlzLm9wdGlvblRleHRGaWVsZCkpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gcHJvcGVydHlFeGlzdHMoZGF0YSwgdGhpcy5vcHRpb25WYWx1ZUZpZWxkKSA/IGRhdGFbdGhpcy5vcHRpb25WYWx1ZUZpZWxkXSA6IGRhdGFbdGhpcy5vcHRpb25UZXh0RmllbGRdO1xyXG4gICAgICAgICAgICB0ZXh0ID0gcHJvcGVydHlFeGlzdHMoZGF0YSwgdGhpcy5vcHRpb25UZXh0RmllbGQpID8gZGF0YVt0aGlzLm9wdGlvblRleHRGaWVsZF0gOiBkYXRhW3RoaXMub3B0aW9uVmFsdWVGaWVsZF07XHJcbiAgICAgICAgICAgIGRpc2FibGVkID0gcHJvcGVydHlFeGlzdHMoZGF0YSwgJ2Rpc2FibGVkJykgPyBkYXRhWydkaXNhYmxlZCddIDogZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgTmd4U2VsZWN0T3B0aW9uKHZhbHVlLCB0ZXh0LCBkaXNhYmxlZCwgZGF0YSwgcGFyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8gaW50ZXJmYWNlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIC8vLy8vLy8vLy8vL1xyXG4gICAgcHVibGljIG9uQ2hhbmdlID0gKHY6IGFueSkgPT4gdjtcclxuXHJcbiAgICBwdWJsaWMgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3ViakV4dGVybmFsVmFsdWUubmV4dChvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB7fSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgICAgICB0aGlzLnN1YmpSZWdpc3Rlck9uQ2hhbmdlLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcbn1cclxuIl19
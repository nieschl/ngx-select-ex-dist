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
const escapeString = escapeStringNs;
class NgxSelectOption {
    /**
     * @param {?} value
     * @param {?} text
     * @param {?} disabled
     * @param {?} data
     * @param {?=} _parent
     */
    constructor(value, text, disabled, data, _parent = null) {
        this.value = value;
        this.text = text;
        this.disabled = disabled;
        this.data = data;
        this._parent = _parent;
        this.type = 'option';
        this.cacheRenderedText = null;
    }
    /**
     * @return {?}
     */
    get parent() {
        return this._parent;
    }
    /**
     * @param {?} sanitizer
     * @param {?} highlightText
     * @return {?}
     */
    renderText(sanitizer, highlightText) {
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
    }
}
class NgxSelectOptGroup {
    /**
     * @param {?} label
     * @param {?=} options
     */
    constructor(label, options = []) {
        this.label = label;
        this.options = options;
        this.type = 'optgroup';
        this.filter(() => true);
    }
    /**
     * @param {?} callbackFn
     * @return {?}
     */
    filter(callbackFn) {
        this.optionsFiltered = this.options.filter((option) => callbackFn(option));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxSelectOptionDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgxSelectOptionDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-select-option]' },] }
];
/** @nocollapse */
NgxSelectOptionDirective.ctorParameters = () => [
    { type: TemplateRef }
];
class NgxSelectOptionSelectedDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgxSelectOptionSelectedDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-select-option-selected]' },] }
];
/** @nocollapse */
NgxSelectOptionSelectedDirective.ctorParameters = () => [
    { type: TemplateRef }
];
class NgxSelectOptionNotFoundDirective {
    /**
     * @param {?} template
     */
    constructor(template) {
        this.template = template;
    }
}
NgxSelectOptionNotFoundDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngx-select-option-not-found]' },] }
];
/** @nocollapse */
NgxSelectOptionNotFoundDirective.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const _ = lodashNs;
/** @type {?} */
const escapeString$1 = escapeStringNs;
/** @type {?} */
const NGX_SELECT_OPTIONS = new InjectionToken('NGX_SELECT_OPTIONS');
/** @enum {number} */
const ENavigation = {
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
class NgxSelectComponent {
    /**
     * @param {?} iterableDiffers
     * @param {?} sanitizer
     * @param {?} cd
     * @param {?} defaultOptions
     */
    constructor(iterableDiffers, sanitizer, cd, defaultOptions) {
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
        this.onChange = (v) => v;
        this.onTouched = () => null;
        Object.assign(this, defaultOptions);
        // differs
        this.itemsDiffer = iterableDiffers.find([]).create(null);
        this.defaultValueDiffer = iterableDiffers.find([]).create(null);
        // observers
        this.typed.subscribe((text) => this.subjSearchText.next(text));
        this.subjOptionsSelected.subscribe((options) => this.selectionChanges.emit(options));
        /** @type {?} */
        let cacheExternalValue;
        /** @type {?} */
        const subjActualValue = this.subjExternalValue
            .pipe(map((v) => cacheExternalValue = v === null ? [] : [].concat(v)), merge(this.subjOptionsSelected
            .pipe(map((options) => options.map((o) => o.value)))), combineLatest(this.subjDefaultValue, (eVal, dVal) => {
            /** @type {?} */
            const newVal = _.isEqual(eVal, dVal) ? [] : eVal;
            return newVal.length ? newVal : dVal;
        }), distinctUntilChanged((x, y) => _.isEqual(x, y)), share());
        subjActualValue
            .pipe(combineLatest(this.subjRegisterOnChange, (actualValue) => actualValue))
            .subscribe((actualValue) => {
            this.actualValue = actualValue;
            if (!_.isEqual(actualValue, cacheExternalValue)) {
                cacheExternalValue = actualValue;
                if (this.multiple) {
                    this.onChange(actualValue);
                }
                else {
                    this.onChange(actualValue.length ? actualValue[0] : null);
                }
            }
        });
        this.subjOptions
            .pipe(flatMap((options) => from(options)
            .pipe(flatMap((option) => option instanceof NgxSelectOption
            ? of(option)
            : (option instanceof NgxSelectOptGroup ? from(option.options) : empty())), toArray())))
            .pipe(combineLatest(subjActualValue, (optionsFlat, actualValue) => {
            from(optionsFlat)
                .pipe(filter((option) => actualValue.indexOf(option.value) !== -1), toArray(), filter((options) => !_.isEqual(options, this.subjOptionsSelected.value)))
                .subscribe((options) => this.subjOptionsSelected.next(options));
        }))
            .subscribe();
        this.subjOptions
            .pipe(combineLatest(this.subjOptionsSelected, this.subjSearchText, (options, selectedOptions, search) => {
            this.optionsFiltered = this.filterOptions(search, options, selectedOptions);
            this.cacheOptionsFilteredFlat = null;
            this.navigateOption(ENavigation.firstIfOptionActiveInvisible);
            return selectedOptions;
        }), flatMap((selectedOptions) => {
            return this.optionsFilteredFlat().pipe(filter((flatOptions) => this.autoSelectSingleOption && flatOptions.length === 1 && !selectedOptions.length));
        }))
            .subscribe((flatOptions) => this.subjOptionsSelected.next(flatOptions));
    }
    /**
     * @param {?=} otherClassNames
     * @param {?=} useFormControl
     * @return {?}
     */
    setFormControlSize(otherClassNames = {}, useFormControl = true) {
        /** @type {?} */
        const formControlExtraClasses = useFormControl ? {
            'form-control-sm input-sm': this.size === 'small',
            'form-control-lg input-lg': this.size === 'large'
        } : {};
        return Object.assign(formControlExtraClasses, otherClassNames);
    }
    /**
     * @return {?}
     */
    setBtnSize() {
        return { 'btn-sm': this.size === 'small', 'btn-lg': this.size === 'large' };
    }
    /**
     * @return {?}
     */
    get optionsSelected() {
        return this.subjOptionsSelected.value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mainClicked(event) {
        event.clickedSelectComponent = this;
        if (!this.isFocused) {
            this.isFocused = true;
            this.focus.emit();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    documentClick(event) {
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
    }
    /**
     * @return {?}
     */
    optionsFilteredFlat() {
        if (this.cacheOptionsFilteredFlat) {
            return of(this.cacheOptionsFilteredFlat);
        }
        return from(this.optionsFiltered)
            .pipe(flatMap((option) => option instanceof NgxSelectOption ? of(option) :
            (option instanceof NgxSelectOptGroup ? from(option.optionsFiltered) : empty())), filter((optionsFilteredFlat) => !optionsFilteredFlat.disabled), toArray(), tap((optionsFilteredFlat) => this.cacheOptionsFilteredFlat = optionsFilteredFlat));
    }
    /**
     * @param {?} navigation
     * @return {?}
     */
    navigateOption(navigation) {
        this.optionsFilteredFlat()
            .pipe(map((options) => {
            /** @type {?} */
            const navigated = { index: -1, activeOption: null, filteredOptionList: options };
            /** @type {?} */
            let newActiveIdx;
            switch (navigation) {
                case ENavigation.first:
                    navigated.index = 0;
                    break;
                case ENavigation.previous:
                    newActiveIdx = options.indexOf(this.optionActive) - 1;
                    navigated.index = newActiveIdx >= 0 ? newActiveIdx : options.length - 1;
                    break;
                case ENavigation.next:
                    newActiveIdx = options.indexOf(this.optionActive) + 1;
                    navigated.index = newActiveIdx < options.length ? newActiveIdx : 0;
                    break;
                case ENavigation.last:
                    navigated.index = options.length - 1;
                    break;
                case ENavigation.firstSelected:
                    if (this.subjOptionsSelected.value.length) {
                        navigated.index = options.indexOf(this.subjOptionsSelected.value[0]);
                    }
                    break;
                case ENavigation.firstIfOptionActiveInvisible:
                    /** @type {?} */
                    const idxOfOptionActive = options.indexOf(this.optionActive);
                    navigated.index = idxOfOptionActive > 0 ? idxOfOptionActive : 0;
                    break;
            }
            navigated.activeOption = options[navigated.index];
            return navigated;
        }))
            .subscribe((newNavigated) => this.optionActivate(newNavigated));
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.itemsDiffer.diff(this.items)) {
            this.subjOptions.next(this.buildOptions(this.items));
        }
        /** @type {?} */
        const defVal = this.defaultValue ? [].concat(this.defaultValue) : [];
        if (this.defaultValueDiffer.diff(defVal)) {
            this.subjDefaultValue.next(defVal);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        if (this._focusToInput && this.checkInputVisibility() && this.inputElRef &&
            this.inputElRef.nativeElement !== document.activeElement) {
            this._focusToInput = false;
            this.inputElRef.nativeElement.focus();
        }
    }
    /**
     * @return {?}
     */
    canClearNotMultiple() {
        return this.allowClear && !!this.subjOptionsSelected.value.length &&
            (!this.subjDefaultValue.value.length || this.subjDefaultValue.value[0] !== this.actualValue[0]);
    }
    /**
     * @return {?}
     */
    focusToInput() {
        this._focusToInput = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputKeyDown(event) {
        /** @type {?} */
        const keysForOpenedState = [
            this.keyCodeToOptionsSelect,
            this.keyCodeToNavigateFirst,
            this.keyCodeToNavigatePrevious,
            this.keyCodeToNavigateNext,
            this.keyCodeToNavigateLast,
        ];
        /** @type {?} */
        const keysForClosedState = [this.keyCodeToOptionsOpen, this.keyCodeToRemoveSelected];
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mainKeyUp(event) {
        if (event.code === this.keyCodeToOptionsClose) {
            this.optionsClose();
        }
    }
    /**
     * @param {?} index
     * @param {?} option
     * @return {?}
     */
    trackByOption(index, option) {
        return option instanceof NgxSelectOption ? option.value :
            (option instanceof NgxSelectOptGroup ? option.label : option);
    }
    /**
     * @return {?}
     */
    checkInputVisibility() {
        return (this.multiple === true) || (this.optionsOpened && !this.noAutoComplete);
    }
    /**
     * \@internal
     * @param {?=} value
     * @return {?}
     */
    inputKeyUp(value = '') {
        if (!this.optionsOpened && value) {
            this.optionsOpen(value);
        }
    }
    /**
     * \@internal
     * @param {?} value
     * @return {?}
     */
    doInputText(value) {
        if (this.optionsOpened) {
            this.typed.emit(value);
        }
    }
    /**
     * \@internal
     * @param {?=} value
     * @return {?}
     */
    inputClick(value = '') {
        if (!this.optionsOpened) {
            this.optionsOpen(value);
        }
    }
    /**
     * \@internal
     * @param {?} html
     * @return {?}
     */
    sanitize(html) {
        return html ? this.sanitizer.bypassSecurityTrustHtml(html) : null;
    }
    /**
     * \@internal
     * @param {?} option
     * @return {?}
     */
    highlightOption(option) {
        if (this.inputElRef) {
            return option.renderText(this.sanitizer, this.inputElRef.nativeElement.value);
        }
        return option.renderText(this.sanitizer, '');
    }
    /**
     * \@internal
     * @param {?} option
     * @param {?=} event
     * @return {?}
     */
    optionSelect(option, event = null) {
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
    }
    /**
     * \@internal
     * @param {?} option
     * @param {?} event
     * @return {?}
     */
    optionRemove(option, event) {
        if (!this.disabled && option) {
            event.stopPropagation();
            this.subjOptionsSelected.next((this.multiple ? this.subjOptionsSelected.value : []).filter(o => o !== option));
            this.remove.emit(option.value);
        }
    }
    /**
     * \@internal
     * @param {?} option
     * @param {?} element
     * @return {?}
     */
    isOptionActive(option, element) {
        if (this.optionActive === option) {
            this.ensureVisibleElement(element);
            return true;
        }
        return false;
    }
    /**
     * \@internal
     * @param {?} navigated
     * @return {?}
     */
    optionActivate(navigated) {
        if ((this.optionActive !== navigated.activeOption) &&
            (!navigated.activeOption || !navigated.activeOption.disabled)) {
            this.optionActive = navigated.activeOption;
            this.navigated.emit(navigated);
        }
    }
    /**
     * @param {?} search
     * @param {?} options
     * @param {?} selectedOptions
     * @return {?}
     */
    filterOptions(search, options, selectedOptions) {
        /** @type {?} */
        const regExp = new RegExp(escapeString$1(search), 'i');
        /** @type {?} */
        const filterOption = (option) => {
            if (this.searchCallback) {
                return this.searchCallback(search, option);
            }
            return (!search || regExp.test(option.text)) && (!this.multiple || selectedOptions.indexOf(option) === -1);
        };
        return options.filter((option) => {
            if (option instanceof NgxSelectOption) {
                return filterOption(/** @type {?} */ (option));
            }
            else if (option instanceof NgxSelectOptGroup) {
                /** @type {?} */
                const subOp = /** @type {?} */ (option);
                subOp.filter((subOption) => filterOption(subOption));
                return subOp.optionsFiltered.length;
            }
        });
    }
    /**
     * @param {?} element
     * @return {?}
     */
    ensureVisibleElement(element) {
        if (this.choiceMenuElRef && this.cacheElementOffsetTop !== element.offsetTop) {
            this.cacheElementOffsetTop = element.offsetTop;
            /** @type {?} */
            const container = this.choiceMenuElRef.nativeElement;
            if (this.cacheElementOffsetTop < container.scrollTop) {
                container.scrollTop = this.cacheElementOffsetTop;
            }
            else if (this.cacheElementOffsetTop + element.offsetHeight > container.scrollTop + container.clientHeight) {
                container.scrollTop = this.cacheElementOffsetTop + element.offsetHeight - container.clientHeight;
            }
        }
    }
    /**
     * @param {?=} search
     * @return {?}
     */
    optionsOpen(search = '') {
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
    }
    /**
     * @return {?}
     */
    optionsClose() {
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
    }
    /**
     * @param {?} data
     * @return {?}
     */
    buildOptions(data) {
        /** @type {?} */
        const result = [];
        if (Array.isArray(data)) {
            /** @type {?} */
            let option;
            data.forEach((item) => {
                /** @type {?} */
                const isOptGroup = typeof item === 'object' && item !== null &&
                    propertyExists(item, this.optGroupLabelField) && propertyExists(item, this.optGroupOptionsField) &&
                    Array.isArray(item[this.optGroupOptionsField]);
                if (isOptGroup) {
                    /** @type {?} */
                    const optGroup = new NgxSelectOptGroup(item[this.optGroupLabelField]);
                    item[this.optGroupOptionsField].forEach((subOption) => {
                        if (option = this.buildOption(subOption, optGroup)) {
                            optGroup.options.push(option);
                        }
                    });
                    result.push(optGroup);
                }
                else if (option = this.buildOption(item, null)) {
                    result.push(option);
                }
            });
        }
        return result;
    }
    /**
     * @param {?} data
     * @param {?} parent
     * @return {?}
     */
    buildOption(data, parent) {
        /** @type {?} */
        let value;
        /** @type {?} */
        let text;
        /** @type {?} */
        let disabled;
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
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        this.subjExternalValue.next(obj);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
        this.subjRegisterOnChange.next();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
NgxSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-select',
                template: "<div #main [tabindex]=\"disabled? -1: 0\" class=\"ngx-select dropdown\"\r\n     [ngClass]=\"setFormControlSize({\r\n        'ngx-select_multiple form-control': multiple === true,\r\n        'open show': optionsOpened && optionsFiltered.length\r\n     }, multiple === true)\"\r\n     (click)=\"mainClicked($event)\" (focusin)=\"mainClicked($event)\"\r\n     (focus)=\"focusToInput()\" (keydown)=\"inputKeyDown($event)\"\r\n     (keyup)=\"mainKeyUp($event)\">\r\n    <div [ngClass]=\"{ 'ngx-select__disabled': disabled}\"></div>\r\n\r\n    <!-- single selected item -->\r\n    <div class=\"ngx-select__selected\"\r\n         *ngIf=\"(multiple === false) && (!optionsOpened || noAutoComplete)\">\r\n        <div class=\"ngx-select__toggle btn form-control\" [ngClass]=\"setFormControlSize(setBtnSize())\"\r\n             (click)=\"optionsOpen()\">\r\n\r\n            <span *ngIf=\"!optionsSelected.length\" class=\"ngx-select__placeholder text-muted\">\r\n                <span [innerHtml]=\"placeholder\"></span>\r\n            </span>\r\n            <span *ngIf=\"optionsSelected.length\"\r\n                  class=\"ngx-select__selected-single pull-left float-left\"\r\n                  [ngClass]=\"{'ngx-select__allow-clear': allowClear}\">\r\n                <ng-container [ngTemplateOutlet]=\"templateSelectedOption || defaultTemplateOption\"\r\n                              [ngTemplateOutletContext]=\"{$implicit: optionsSelected[0], index: 0,\r\n                                                          text: sanitize(optionsSelected[0].text)}\">\r\n                </ng-container>\r\n            </span>\r\n            <span class=\"ngx-select__toggle-buttons\">\r\n                <a class=\"ngx-select__clear btn btn-sm btn-link\" *ngIf=\"canClearNotMultiple()\"\r\n                   [ngClass]=\"setBtnSize()\"\r\n                   (click)=\"optionRemove(optionsSelected[0], $event)\">\r\n                    <i class=\"ngx-select__clear-icon\"></i>\r\n                </a>\r\n                <i class=\"dropdown-toggle\"></i>\r\n                <i class=\"ngx-select__toggle-caret caret\"></i>\r\n            </span>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- multiple selected items -->\r\n    <div class=\"ngx-select__selected\" *ngIf=\"multiple === true\">\r\n        <span *ngFor=\"let option of optionsSelected; trackBy: trackByOption; let idx = index\">\r\n            <span tabindex=\"-1\" [ngClass]=\"setBtnSize()\"\r\n                  class=\"ngx-select__selected-plural btn btn-default btn-secondary btn-xs\">\r\n\r\n                <ng-container [ngTemplateOutlet]=\"templateSelectedOption || defaultTemplateOption\"\r\n                              [ngTemplateOutletContext]=\"{$implicit: option, index: idx, text: sanitize(option.text)}\">\r\n                </ng-container>\r\n\r\n                <a class=\"ngx-select__clear btn btn-sm btn-link pull-right float-right\" [ngClass]=\"setBtnSize()\"\r\n                   (click)=\"optionRemove(option, $event)\">\r\n                    <i class=\"ngx-select__clear-icon\"></i>\r\n                </a>\r\n            </span>\r\n        </span>\r\n    </div>\r\n\r\n    <!-- live search an item from the list -->\r\n    <input #input type=\"text\" class=\"ngx-select__search form-control\" [ngClass]=\"setFormControlSize()\"\r\n           *ngIf=\"checkInputVisibility()\"\r\n           [tabindex]=\"multiple === false? -1: 0\"\r\n           (keydown)=\"inputKeyDown($event)\"\r\n           (keyup)=\"inputKeyUp(input.value)\"\r\n           (input)=\"doInputText(input.value)\"\r\n           [disabled]=\"disabled\"\r\n           [placeholder]=\"optionsSelected.length? '': placeholder\"\r\n           (click)=\"inputClick(input.value)\"\r\n           autocomplete=\"off\"\r\n           autocorrect=\"off\"\r\n           autocapitalize=\"off\"\r\n           spellcheck=\"false\"\r\n           role=\"combobox\">\r\n\r\n    <!-- options template -->\r\n    <ul #choiceMenu role=\"menu\" *ngIf=\"isFocused\" class=\"ngx-select__choices dropdown-menu\"\r\n        [class.show]=\"optionsOpened\">\r\n        <li class=\"ngx-select__item-group\" role=\"menuitem\"\r\n            *ngFor=\"let opt of optionsFiltered; trackBy: trackByOption; let idxGroup=index\">\r\n            <div class=\"divider dropdown-divider\" *ngIf=\"opt.type === 'optgroup' && (idxGroup > 0)\"></div>\r\n            <div class=\"dropdown-header\" *ngIf=\"opt.type === 'optgroup'\">{{opt.label}}</div>\r\n\r\n            <a href=\"#\" #choiceItem class=\"ngx-select__item dropdown-item\"\r\n               *ngFor=\"let option of (opt.optionsFiltered || [opt]); trackBy: trackByOption; let idxOption = index\"\r\n               [ngClass]=\"{\r\n                    'ngx-select__item_active active': isOptionActive(option, choiceItem),\r\n                    'ngx-select__item_disabled disabled': option.disabled\r\n               }\"\r\n               (mouseenter)=\"optionActivate({\r\n                    activeOption: option,\r\n                    filteredOptionList: optionsFiltered,\r\n                    index: optionsFiltered.indexOf(option)\r\n               })\"\r\n               (click)=\"optionSelect(option, $event)\">\r\n                <ng-container [ngTemplateOutlet]=\"templateOption || defaultTemplateOption\"\r\n                              [ngTemplateOutletContext]=\"{$implicit: option, text: highlightOption(option),\r\n                              index: idxGroup, subIndex: idxOption}\"></ng-container>\r\n            </a>\r\n        </li>\r\n        <li class=\"ngx-select__item ngx-select__item_no-found dropdown-header\" *ngIf=\"!optionsFiltered.length\">\r\n            <ng-container [ngTemplateOutlet]=\"templateOptionNotFound || defaultTemplateOptionNotFound\"></ng-container>\r\n        </li>\r\n    </ul>\r\n\r\n    <!--Default templates-->\r\n    <ng-template #defaultTemplateOption let-text=\"text\">\r\n        <span [innerHtml]=\"text\"></span>\r\n    </ng-template>\r\n\r\n    <ng-template #defaultTemplateOptionNotFound>\r\n        {{noResultsFound}}\r\n    </ng-template>\r\n\r\n</div>",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NgxSelectComponent),
                        multi: true
                    }
                ],
                styles: [".ngx-select_multiple{height:auto;padding:3px 3px 0}.ngx-select_multiple .ngx-select__search{background-color:transparent!important;border:none;outline:0;box-shadow:none;height:1.6666em;padding:0;margin-bottom:3px}.ngx-select__disabled{background-color:#eceeef;border-radius:4px;position:absolute;width:100%;height:100%;z-index:5;opacity:.6;top:0;left:0;cursor:not-allowed}.ngx-select__toggle{outline:0;position:relative;text-align:left!important;color:#333;background-color:#fff;border-color:#ccc;display:inline-flex;align-items:stretch;justify-content:space-between}.ngx-select__toggle:hover{color:#333;background-color:#e6e6e6;border-color:#adadad}.ngx-select__toggle-buttons{flex-shrink:0;display:flex;align-items:center}.ngx-select__toggle-caret{position:absolute;height:10px;top:50%;right:10px;margin-top:-2px}.ngx-select__placeholder{float:left}.ngx-select__clear{margin-right:10px;padding:0;border:none}.ngx-select_multiple .ngx-select__clear{line-height:initial;margin-left:5px;margin-right:0;color:#000;opacity:.5}.ngx-select__clear-icon{display:inline-block;font-size:inherit;cursor:pointer;position:relative;width:1em;height:.75em;padding:0}.ngx-select__clear-icon:after,.ngx-select__clear-icon:before{content:'';position:absolute;border-top:3px solid;width:100%;top:50%;left:0;margin-top:-1px}.ngx-select__clear-icon:before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ngx-select__clear-icon:after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.ngx-select__choices{width:100%;height:auto;max-height:200px;overflow-x:hidden;margin-top:0;position:absolute}.ngx-select_multiple .ngx-select__choices{margin-top:1px}.ngx-select__item{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;white-space:nowrap;cursor:pointer;text-decoration:none}.ngx-select__item_disabled,.ngx-select__item_no-found{cursor:default}.ngx-select__item_active{color:#fff;outline:0;background-color:#428bca}.ngx-select__selected-plural,.ngx-select__selected-single{display:inline-flex;align-items:center;overflow:hidden}.ngx-select__selected-plural span,.ngx-select__selected-single span{overflow:hidden;text-overflow:ellipsis}.ngx-select__selected-plural{outline:0;margin:0 3px 3px 0}.input-group>.dropdown{position:static}"]
            }] }
];
/** @nocollapse */
NgxSelectComponent.ctorParameters = () => [
    { type: IterableDiffers },
    { type: DomSanitizer },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [NGX_SELECT_OPTIONS,] }, { type: Optional }] }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxSelectModule {
    /**
     * @param {?} options
     * @return {?}
     */
    static forRoot(options) {
        return {
            ngModule: NgxSelectModule,
            providers: [{ provide: NGX_SELECT_OPTIONS, useValue: options }]
        };
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxSelectModule, NGX_SELECT_OPTIONS, NgxSelectComponent, NgxSelectOption, NgxSelectOptGroup, NgxSelectOptionDirective, NgxSelectOptionSelectedDirective, NgxSelectOptionNotFoundDirective };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNlbGVjdC1leC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXNlbGVjdC1leC9uZ3gtc2VsZWN0L25neC1zZWxlY3QuY2xhc3Nlcy50cyIsIm5nOi8vbmd4LXNlbGVjdC1leC9uZ3gtc2VsZWN0L25neC10ZW1wbGF0ZXMuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtc2VsZWN0LWV4L25neC1zZWxlY3Qvbmd4LXNlbGVjdC5jb21wb25lbnQudHMiLCJuZzovL25neC1zZWxlY3QtZXgvbmd4LXNlbGVjdC9uZ3gtc2VsZWN0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGVTdHJpbmdOcyBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XHJcbmltcG9ydCB7SU5neFNlbGVjdE9wdEdyb3VwLCBJTmd4U2VsZWN0T3B0aW9uLCBJTmd4U2VsZWN0T3B0aW9uQmFzZSwgVE5neFNlbGVjdE9wdGlvblR5cGV9IGZyb20gJy4vbmd4LXNlbGVjdC5pbnRlcmZhY2VzJztcclxuXHJcbmNvbnN0IGVzY2FwZVN0cmluZyA9IGVzY2FwZVN0cmluZ05zO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5neFNlbGVjdE9wdGlvbiBpbXBsZW1lbnRzIElOZ3hTZWxlY3RPcHRpb24sIElOZ3hTZWxlY3RPcHRpb25CYXNlIHtcclxuICAgIHJlYWRvbmx5IHR5cGU6IFROZ3hTZWxlY3RPcHRpb25UeXBlID0gJ29wdGlvbic7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgdGV4dDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIGRpc2FibGVkOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIGRhdGE6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3BhcmVudDogTmd4U2VsZWN0T3B0R3JvdXAgPSBudWxsKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogTmd4U2VsZWN0T3B0R3JvdXAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWNoZUhpZ2hsaWdodFRleHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgY2FjaGVSZW5kZXJlZFRleHQ6IFNhZmVIdG1sID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyVGV4dChzYW5pdGl6ZXI6IERvbVNhbml0aXplciwgaGlnaGxpZ2h0VGV4dDogc3RyaW5nKTogU2FmZUh0bWwge1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlSGlnaGxpZ2h0VGV4dCAhPT0gaGlnaGxpZ2h0VGV4dCB8fCB0aGlzLmNhY2hlUmVuZGVyZWRUZXh0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVIaWdobGlnaHRUZXh0ID0gaGlnaGxpZ2h0VGV4dDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVIaWdobGlnaHRUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlUmVuZGVyZWRUZXh0ID0gc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKCh0aGlzLnRleHQgKyAnJykucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKGVzY2FwZVN0cmluZyh0aGlzLmNhY2hlSGlnaGxpZ2h0VGV4dCksICdnaScpLCAnPHN0cm9uZz4kJjwvc3Ryb25nPidcclxuICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVJlbmRlcmVkVGV4dCA9IHNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVuZGVyZWRUZXh0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmd4U2VsZWN0T3B0R3JvdXAgaW1wbGVtZW50cyBJTmd4U2VsZWN0T3B0R3JvdXAsIElOZ3hTZWxlY3RPcHRpb25CYXNlIHtcclxuICAgIHJlYWRvbmx5IHR5cGU6IFROZ3hTZWxlY3RPcHRpb25UeXBlID0gJ29wdGdyb3VwJztcclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uc0ZpbHRlcmVkOiBOZ3hTZWxlY3RPcHRpb25bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIoKCkgPT4gdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbHRlcihjYWxsYmFja0ZuOiAodmFsdWU6IE5neFNlbGVjdE9wdGlvbikgPT4gYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zRmlsdGVyZWQgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHRpb246IE5neFNlbGVjdE9wdGlvbikgPT4gY2FsbGJhY2tGbihvcHRpb24pKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgVFNlbGVjdE9wdGlvbiA9IE5neFNlbGVjdE9wdEdyb3VwIHwgTmd4U2VsZWN0T3B0aW9uO1xyXG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgVGVtcGxhdGVSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmd4LXNlbGVjdC1vcHRpb25dJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ3hTZWxlY3RPcHRpb25EaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25neC1zZWxlY3Qtb3B0aW9uLXNlbGVjdGVkXSd9KVxyXG5leHBvcnQgY2xhc3MgTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25neC1zZWxlY3Qtb3B0aW9uLW5vdC1mb3VuZF0nfSlcclxuZXhwb3J0IGNsYXNzIE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLCBEb0NoZWNrLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsXHJcbiAgICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJdGVyYWJsZURpZmZlciwgSXRlcmFibGVEaWZmZXJzLCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29udGVudENoaWxkLFxyXG4gICAgVGVtcGxhdGVSZWYsIE9wdGlvbmFsLCBJbmplY3QsIEluamVjdGlvblRva2VuXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlSHRtbH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7U3ViamVjdCwgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBvZiwgZW1wdHksIGZyb219IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge21hcCwgbWVyZ2UsIGNvbWJpbmVMYXRlc3QsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzaGFyZSwgdGFwLCBmbGF0TWFwLCBmaWx0ZXIsIHRvQXJyYXl9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCAqIGFzIGxvZGFzaE5zIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZVN0cmluZ05zIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJztcclxuaW1wb3J0IHtOZ3hTZWxlY3RPcHRHcm91cCwgTmd4U2VsZWN0T3B0aW9uLCBUU2VsZWN0T3B0aW9ufSBmcm9tICcuL25neC1zZWxlY3QuY2xhc3Nlcyc7XHJcbmltcG9ydCB7Tmd4U2VsZWN0T3B0aW9uRGlyZWN0aXZlLCBOZ3hTZWxlY3RPcHRpb25Ob3RGb3VuZERpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmV9IGZyb20gJy4vbmd4LXRlbXBsYXRlcy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge0lOZ3hPcHRpb25OYXZpZ2F0ZWQsIElOZ3hTZWxlY3RPcHRpb24sIElOZ3hTZWxlY3RPcHRpb25zfSBmcm9tICcuL25neC1zZWxlY3QuaW50ZXJmYWNlcyc7XHJcblxyXG5jb25zdCBfID0gbG9kYXNoTnM7XHJcbmNvbnN0IGVzY2FwZVN0cmluZyA9IGVzY2FwZVN0cmluZ05zO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5HWF9TRUxFQ1RfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdOR1hfU0VMRUNUX09QVElPTlMnKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5neFNlbGVjdENvbXBvbmVudE1vdXNlRXZlbnQgZXh0ZW5kcyBNb3VzZUV2ZW50IHtcclxuICAgIGNsaWNrZWRTZWxlY3RDb21wb25lbnQ/OiBOZ3hTZWxlY3RDb21wb25lbnQ7XHJcbn1cclxuXHJcbmVudW0gRU5hdmlnYXRpb24ge1xyXG4gICAgZmlyc3QsIHByZXZpb3VzLCBuZXh0LCBsYXN0LFxyXG4gICAgZmlyc3RTZWxlY3RlZCwgZmlyc3RJZk9wdGlvbkFjdGl2ZUludmlzaWJsZVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9wZXJ0eUV4aXN0cyhvYmo6IE9iamVjdCwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBwcm9wZXJ0eU5hbWUgaW4gb2JqO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LXNlbGVjdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hTZWxlY3RDb21wb25lbnQpLFxyXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIElOZ3hTZWxlY3RPcHRpb25zLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgRG9DaGVjaywgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgaXRlbXM6IGFueVtdO1xyXG4gICAgQElucHV0KCkgcHVibGljIG9wdGlvblZhbHVlRmllbGQgPSAnaWQnO1xyXG4gICAgQElucHV0KCkgcHVibGljIG9wdGlvblRleHRGaWVsZCA9ICd0ZXh0JztcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBvcHRHcm91cExhYmVsRmllbGQgPSAnbGFiZWwnO1xyXG4gICAgQElucHV0KCkgcHVibGljIG9wdEdyb3VwT3B0aW9uc0ZpZWxkID0gJ29wdGlvbnMnO1xyXG4gICAgQElucHV0KCkgcHVibGljIG11bHRpcGxlID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYWxsb3dDbGVhciA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyID0gJyc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbm9BdXRvQ29tcGxldGUgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcHVibGljIGRlZmF1bHRWYWx1ZTogYW55W10gPSBbXTtcclxuICAgIEBJbnB1dCgpIHB1YmxpYyBhdXRvU2VsZWN0U2luZ2xlT3B0aW9uID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgYXV0b0NsZWFyU2VhcmNoID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgbm9SZXN1bHRzRm91bmQgPSAnTm8gcmVzdWx0cyBmb3VuZCc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2l6ZTogJ3NtYWxsJyB8ICdkZWZhdWx0JyB8ICdsYXJnZScgPSAnZGVmYXVsdCc7XHJcbiAgICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoQ2FsbGJhY2s6IChzZWFyY2g6IHN0cmluZywgaXRlbTogSU5neFNlbGVjdE9wdGlvbikgPT4gYm9vbGVhbjtcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9SZW1vdmVTZWxlY3RlZCA9ICdEZWxldGUnO1xyXG4gICAgcHVibGljIGtleUNvZGVUb09wdGlvbnNPcGVuID0gJ0VudGVyJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9PcHRpb25zQ2xvc2UgPSAnRXNjYXBlJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9PcHRpb25zU2VsZWN0ID0gJ0VudGVyJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9OYXZpZ2F0ZUZpcnN0ID0gJ0Fycm93TGVmdCc7XHJcbiAgICBwdWJsaWMga2V5Q29kZVRvTmF2aWdhdGVQcmV2aW91cyA9ICdBcnJvd1VwJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9OYXZpZ2F0ZU5leHQgPSAnQXJyb3dEb3duJztcclxuICAgIHB1YmxpYyBrZXlDb2RlVG9OYXZpZ2F0ZUxhc3QgPSAnQXJyb3dSaWdodCc7XHJcblxyXG4gICAgQE91dHB1dCgpIHB1YmxpYyB0eXBlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBmb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgYmx1ciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyByZW1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoKSBwdWJsaWMgbmF2aWdhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxJTmd4T3B0aW9uTmF2aWdhdGVkPigpO1xyXG4gICAgQE91dHB1dCgpIHB1YmxpYyBzZWxlY3Rpb25DaGFuZ2VzID0gbmV3IEV2ZW50RW1pdHRlcjxJTmd4U2VsZWN0T3B0aW9uW10+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnbWFpbicpIHByb3RlY3RlZCBtYWluRWxSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdpbnB1dCcpIHByb3RlY3RlZCBpbnB1dEVsUmVmOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnY2hvaWNlTWVudScpIHByb3RlY3RlZCBjaG9pY2VNZW51RWxSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChOZ3hTZWxlY3RPcHRpb25EaXJlY3RpdmUsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pIHRlbXBsYXRlT3B0aW9uOiBOZ3hTZWxlY3RPcHRpb25EaXJlY3RpdmU7XHJcbiAgICBAQ29udGVudENoaWxkKE5neFNlbGVjdE9wdGlvblNlbGVjdGVkRGlyZWN0aXZlLCB7cmVhZDogVGVtcGxhdGVSZWZ9KSB0ZW1wbGF0ZVNlbGVjdGVkT3B0aW9uOiBOZ3hTZWxlY3RPcHRpb25TZWxlY3RlZERpcmVjdGl2ZTtcclxuICAgIEBDb250ZW50Q2hpbGQoTmd4U2VsZWN0T3B0aW9uTm90Rm91bmREaXJlY3RpdmUsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pIHRlbXBsYXRlT3B0aW9uTm90Rm91bmQ6IE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlO1xyXG5cclxuICAgIHB1YmxpYyBvcHRpb25zT3BlbmVkID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgb3B0aW9uc0ZpbHRlcmVkOiBUU2VsZWN0T3B0aW9uW107XHJcblxyXG4gICAgcHJpdmF0ZSBvcHRpb25BY3RpdmU6IE5neFNlbGVjdE9wdGlvbjtcclxuICAgIHByaXZhdGUgaXRlbXNEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPGFueT47XHJcbiAgICBwcml2YXRlIGRlZmF1bHRWYWx1ZURpZmZlcjogSXRlcmFibGVEaWZmZXI8YW55W10+O1xyXG4gICAgcHJpdmF0ZSBhY3R1YWxWYWx1ZTogYW55W10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgc3Viak9wdGlvbnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRTZWxlY3RPcHRpb25bXT4oW10pO1xyXG4gICAgcHJpdmF0ZSBzdWJqU2VhcmNoVGV4dCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPignJyk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJqT3B0aW9uc1NlbGVjdGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOZ3hTZWxlY3RPcHRpb25bXT4oW10pO1xyXG4gICAgcHJpdmF0ZSBzdWJqRXh0ZXJuYWxWYWx1ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcclxuICAgIHByaXZhdGUgc3ViakRlZmF1bHRWYWx1ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KFtdKTtcclxuICAgIHByaXZhdGUgc3VialJlZ2lzdGVyT25DaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIHByaXZhdGUgY2FjaGVPcHRpb25zRmlsdGVyZWRGbGF0OiBOZ3hTZWxlY3RPcHRpb25bXTtcclxuICAgIHByaXZhdGUgY2FjaGVFbGVtZW50T2Zmc2V0VG9wOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZm9jdXNUb0lucHV0ID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNGb2N1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgICAgICAgICAgQEluamVjdChOR1hfU0VMRUNUX09QVElPTlMpIEBPcHRpb25hbCgpIGRlZmF1bHRPcHRpb25zOiBJTmd4U2VsZWN0T3B0aW9ucykge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGVmYXVsdE9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBkaWZmZXJzXHJcbiAgICAgICAgdGhpcy5pdGVtc0RpZmZlciA9IGl0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGU8YW55PihudWxsKTtcclxuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZURpZmZlciA9IGl0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGU8YW55PihudWxsKTtcclxuXHJcbiAgICAgICAgLy8gb2JzZXJ2ZXJzXHJcbiAgICAgICAgdGhpcy50eXBlZC5zdWJzY3JpYmUoKHRleHQ6IHN0cmluZykgPT4gdGhpcy5zdWJqU2VhcmNoVGV4dC5uZXh0KHRleHQpKTtcclxuICAgICAgICB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQuc3Vic2NyaWJlKChvcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSkgPT4gdGhpcy5zZWxlY3Rpb25DaGFuZ2VzLmVtaXQob3B0aW9ucykpO1xyXG4gICAgICAgIGxldCBjYWNoZUV4dGVybmFsVmFsdWU6IGFueVtdO1xyXG4gICAgICAgIGNvbnN0IHN1YmpBY3R1YWxWYWx1ZSA9IHRoaXMuc3ViakV4dGVybmFsVmFsdWVcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAoKHY6IGFueVtdKSA9PiBjYWNoZUV4dGVybmFsVmFsdWUgPSB2ID09PSBudWxsID8gW10gOiBbXS5jb25jYXQodikpLFxyXG4gICAgICAgICAgICAgICAgbWVyZ2UoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcCgob3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm1hcCgobzogTmd4U2VsZWN0T3B0aW9uKSA9PiBvLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5zdWJqRGVmYXVsdFZhbHVlLCAoZVZhbDogYW55W10sIGRWYWw6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWwgPSBfLmlzRXF1YWwoZVZhbCwgZFZhbCkgPyBbXSA6IGVWYWw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3VmFsLmxlbmd0aCA/IG5ld1ZhbCA6IGRWYWw7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiBfLmlzRXF1YWwoeCwgeSkpLFxyXG4gICAgICAgICAgICAgICAgc2hhcmUoKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICBzdWJqQWN0dWFsVmFsdWVcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMuc3VialJlZ2lzdGVyT25DaGFuZ2UsIChhY3R1YWxWYWx1ZTogYW55W10pID0+IGFjdHVhbFZhbHVlKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGFjdHVhbFZhbHVlOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxWYWx1ZSA9IGFjdHVhbFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzRXF1YWwoYWN0dWFsVmFsdWUsIGNhY2hlRXh0ZXJuYWxWYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZUV4dGVybmFsVmFsdWUgPSBhY3R1YWxWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGFjdHVhbFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKGFjdHVhbFZhbHVlLmxlbmd0aCA/IGFjdHVhbFZhbHVlWzBdIDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1xyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGZsYXRNYXAoKG9wdGlvbnM6IFRTZWxlY3RPcHRpb25bXSkgPT4gZnJvbShvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgLnBpcGUoZmxhdE1hcCgob3B0aW9uOiBUU2VsZWN0T3B0aW9uKSA9PiBvcHRpb24gaW5zdGFuY2VvZiBOZ3hTZWxlY3RPcHRpb25cclxuICAgICAgICAgICAgICAgICAgICA/IG9mKG9wdGlvbilcclxuICAgICAgICAgICAgICAgICAgICA6IChvcHRpb24gaW5zdGFuY2VvZiBOZ3hTZWxlY3RPcHRHcm91cCA/IGZyb20ob3B0aW9uLm9wdGlvbnMpIDogZW1wdHkoKSlcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICB0b0FycmF5KClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHN1YmpBY3R1YWxWYWx1ZSwgKG9wdGlvbnNGbGF0OiBOZ3hTZWxlY3RPcHRpb25bXSwgYWN0dWFsVmFsdWU6IGFueVtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbShvcHRpb25zRmxhdClcclxuICAgICAgICAgICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcigob3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pID0+IGFjdHVhbFZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSAhPT0gLTEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9BcnJheSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKChvcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSkgPT4gIV8uaXNFcXVhbChvcHRpb25zLCB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgob3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+IHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC5uZXh0KG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnN1YmpPcHRpb25zXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQsIHRoaXMuc3VialNlYXJjaFRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgKG9wdGlvbnM6IFRTZWxlY3RPcHRpb25bXSwgc2VsZWN0ZWRPcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSwgc2VhcmNoOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zRmlsdGVyZWQgPSB0aGlzLmZpbHRlck9wdGlvbnMoc2VhcmNoLCBvcHRpb25zLCBzZWxlY3RlZE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlT3B0aW9uc0ZpbHRlcmVkRmxhdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24uZmlyc3RJZk9wdGlvbkFjdGl2ZUludmlzaWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGZsYXRNYXAoKHNlbGVjdGVkT3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zRmlsdGVyZWRGbGF0KCkucGlwZShmaWx0ZXIoKGZsYXRPcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvU2VsZWN0U2luZ2xlT3B0aW9uICYmIGZsYXRPcHRpb25zLmxlbmd0aCA9PT0gMSAmJiAhc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZmxhdE9wdGlvbnM6IE5neFNlbGVjdE9wdGlvbltdKSA9PiB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQubmV4dChmbGF0T3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRGb3JtQ29udHJvbFNpemUob3RoZXJDbGFzc05hbWVzOiBPYmplY3QgPSB7fSwgdXNlRm9ybUNvbnRyb2w6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2xFeHRyYUNsYXNzZXMgPSB1c2VGb3JtQ29udHJvbCA/IHtcclxuICAgICAgICAgICAgJ2Zvcm0tY29udHJvbC1zbSBpbnB1dC1zbSc6IHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJyxcclxuICAgICAgICAgICAgJ2Zvcm0tY29udHJvbC1sZyBpbnB1dC1sZyc6IHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJ1xyXG4gICAgICAgIH0gOiB7fTtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihmb3JtQ29udHJvbEV4dHJhQ2xhc3Nlcywgb3RoZXJDbGFzc05hbWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QnRuU2l6ZSgpIHtcclxuICAgICAgICByZXR1cm4geydidG4tc20nOiB0aGlzLnNpemUgPT09ICdzbWFsbCcsICdidG4tbGcnOiB0aGlzLnNpemUgPT09ICdsYXJnZSd9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgb3B0aW9uc1NlbGVjdGVkKCk6IE5neFNlbGVjdE9wdGlvbltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtYWluQ2xpY2tlZChldmVudDogSU5neFNlbGVjdENvbXBvbmVudE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBldmVudC5jbGlja2VkU2VsZWN0Q29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICBpZiAoIXRoaXMuaXNGb2N1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5mb2N1cy5lbWl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmZvY3VzaW4nLCBbJyRldmVudCddKVxyXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxyXG4gICAgcHVibGljIGRvY3VtZW50Q2xpY2soZXZlbnQ6IElOZ3hTZWxlY3RDb21wb25lbnRNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmNsaWNrZWRTZWxlY3RDb21wb25lbnQgIT09IHRoaXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uc09wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpOyAvLyBmaXggZXJyb3IgYmVjYXVzZSBvZiBkZWxheSBiZXR3ZWVuIGRpZmZlcmVudCBldmVudHNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0ZvY3VzZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJsdXIuZW1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3B0aW9uc0ZpbHRlcmVkRmxhdCgpOiBPYnNlcnZhYmxlPE5neFNlbGVjdE9wdGlvbltdPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FjaGVPcHRpb25zRmlsdGVyZWRGbGF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmNhY2hlT3B0aW9uc0ZpbHRlcmVkRmxhdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLm9wdGlvbnNGaWx0ZXJlZClcclxuICAgICAgICAgICAgLnBpcGUoZmxhdE1hcDxUU2VsZWN0T3B0aW9uLCBOZ3hTZWxlY3RPcHRpb24+KChvcHRpb246IFRTZWxlY3RPcHRpb24pID0+XHJcbiAgICAgICAgICAgICAgICBvcHRpb24gaW5zdGFuY2VvZiBOZ3hTZWxlY3RPcHRpb24gPyBvZihvcHRpb24pIDpcclxuICAgICAgICAgICAgICAgICAgICAob3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0R3JvdXAgPyBmcm9tKG9wdGlvbi5vcHRpb25zRmlsdGVyZWQpIDogZW1wdHkoKSlcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKG9wdGlvbnNGaWx0ZXJlZEZsYXQ6IE5neFNlbGVjdE9wdGlvbikgPT4gIW9wdGlvbnNGaWx0ZXJlZEZsYXQuZGlzYWJsZWQpLFxyXG4gICAgICAgICAgICAgICAgdG9BcnJheSgpLFxyXG4gICAgICAgICAgICAgICAgdGFwKChvcHRpb25zRmlsdGVyZWRGbGF0OiBOZ3hTZWxlY3RPcHRpb25bXSkgPT4gdGhpcy5jYWNoZU9wdGlvbnNGaWx0ZXJlZEZsYXQgPSBvcHRpb25zRmlsdGVyZWRGbGF0KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmF2aWdhdGVPcHRpb24obmF2aWdhdGlvbjogRU5hdmlnYXRpb24pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnNGaWx0ZXJlZEZsYXQoKVxyXG4gICAgICAgICAgICAucGlwZShtYXA8Tmd4U2VsZWN0T3B0aW9uW10sIElOZ3hPcHRpb25OYXZpZ2F0ZWQ+KChvcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmF2aWdhdGVkOiBJTmd4T3B0aW9uTmF2aWdhdGVkID0ge2luZGV4OiAtMSwgYWN0aXZlT3B0aW9uOiBudWxsLCBmaWx0ZXJlZE9wdGlvbkxpc3Q6IG9wdGlvbnN9O1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0FjdGl2ZUlkeDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAobmF2aWdhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRU5hdmlnYXRpb24uZmlyc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlZC5pbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRU5hdmlnYXRpb24ucHJldmlvdXM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FjdGl2ZUlkeCA9IG9wdGlvbnMuaW5kZXhPZih0aGlzLm9wdGlvbkFjdGl2ZSkgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZWQuaW5kZXggPSBuZXdBY3RpdmVJZHggPj0gMCA/IG5ld0FjdGl2ZUlkeCA6IG9wdGlvbnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFTmF2aWdhdGlvbi5uZXh0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBY3RpdmVJZHggPSBvcHRpb25zLmluZGV4T2YodGhpcy5vcHRpb25BY3RpdmUpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGVkLmluZGV4ID0gbmV3QWN0aXZlSWR4IDwgb3B0aW9ucy5sZW5ndGggPyBuZXdBY3RpdmVJZHggOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEVOYXZpZ2F0aW9uLmxhc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlZC5pbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFTmF2aWdhdGlvbi5maXJzdFNlbGVjdGVkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGVkLmluZGV4ID0gb3B0aW9ucy5pbmRleE9mKHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFTmF2aWdhdGlvbi5maXJzdElmT3B0aW9uQWN0aXZlSW52aXNpYmxlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHhPZk9wdGlvbkFjdGl2ZSA9IG9wdGlvbnMuaW5kZXhPZih0aGlzLm9wdGlvbkFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlZC5pbmRleCA9IGlkeE9mT3B0aW9uQWN0aXZlID4gMCA/IGlkeE9mT3B0aW9uQWN0aXZlIDogMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0ZWQuYWN0aXZlT3B0aW9uID0gb3B0aW9uc1tuYXZpZ2F0ZWQuaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdmlnYXRlZDtcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKG5ld05hdmlnYXRlZDogSU5neE9wdGlvbk5hdmlnYXRlZCkgPT4gdGhpcy5vcHRpb25BY3RpdmF0ZShuZXdOYXZpZ2F0ZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdEb0NoZWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLml0ZW1zRGlmZmVyLmRpZmYodGhpcy5pdGVtcykpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqT3B0aW9ucy5uZXh0KHRoaXMuYnVpbGRPcHRpb25zKHRoaXMuaXRlbXMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlZlZhbCA9IHRoaXMuZGVmYXVsdFZhbHVlID8gW10uY29uY2F0KHRoaXMuZGVmYXVsdFZhbHVlKSA6IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLmRlZmF1bHRWYWx1ZURpZmZlci5kaWZmKGRlZlZhbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqRGVmYXVsdFZhbHVlLm5leHQoZGVmVmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fZm9jdXNUb0lucHV0ICYmIHRoaXMuY2hlY2tJbnB1dFZpc2liaWxpdHkoKSAmJiB0aGlzLmlucHV0RWxSZWYgJiZcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEVsUmVmLm5hdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZm9jdXNUb0lucHV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5DbGVhck5vdE11bHRpcGxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFsbG93Q2xlYXIgJiYgISF0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWUubGVuZ3RoICYmXHJcbiAgICAgICAgICAgICghdGhpcy5zdWJqRGVmYXVsdFZhbHVlLnZhbHVlLmxlbmd0aCB8fCB0aGlzLnN1YmpEZWZhdWx0VmFsdWUudmFsdWVbMF0gIT09IHRoaXMuYWN0dWFsVmFsdWVbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmb2N1c1RvSW5wdXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZm9jdXNUb0lucHV0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5wdXRLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qga2V5c0Zvck9wZW5lZFN0YXRlID0gW1xyXG4gICAgICAgICAgICB0aGlzLmtleUNvZGVUb09wdGlvbnNTZWxlY3QsXHJcbiAgICAgICAgICAgIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVGaXJzdCxcclxuICAgICAgICAgICAgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZVByZXZpb3VzLFxyXG4gICAgICAgICAgICB0aGlzLmtleUNvZGVUb05hdmlnYXRlTmV4dCxcclxuICAgICAgICAgICAgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZUxhc3QsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBrZXlzRm9yQ2xvc2VkU3RhdGUgPSBbdGhpcy5rZXlDb2RlVG9PcHRpb25zT3BlbiwgdGhpcy5rZXlDb2RlVG9SZW1vdmVTZWxlY3RlZF07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNPcGVuZWQgJiYga2V5c0Zvck9wZW5lZFN0YXRlLmluZGV4T2YoZXZlbnQuY29kZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9PcHRpb25zU2VsZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uU2VsZWN0KHRoaXMub3B0aW9uQWN0aXZlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlT3B0aW9uKEVOYXZpZ2F0aW9uLm5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmtleUNvZGVUb05hdmlnYXRlRmlyc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5maXJzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMua2V5Q29kZVRvTmF2aWdhdGVQcmV2aW91czpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlT3B0aW9uKEVOYXZpZ2F0aW9uLnByZXZpb3VzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZUxhc3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5sYXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9OYXZpZ2F0ZU5leHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5uZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9uc09wZW5lZCAmJiBrZXlzRm9yQ2xvc2VkU3RhdGUuaW5kZXhPZihldmVudC5jb2RlKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLmtleUNvZGVUb09wdGlvbnNPcGVuOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc09wZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5rZXlDb2RlVG9SZW1vdmVTZWxlY3RlZDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvblJlbW92ZSh0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWVbdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlLmxlbmd0aCAtIDFdLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1haW5LZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC5jb2RlID09PSB0aGlzLmtleUNvZGVUb09wdGlvbnNDbG9zZSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNDbG9zZSgvKnRydWUqLyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0cmFja0J5T3B0aW9uKGluZGV4OiBudW1iZXIsIG9wdGlvbjogVFNlbGVjdE9wdGlvbikge1xyXG4gICAgICAgIHJldHVybiBvcHRpb24gaW5zdGFuY2VvZiBOZ3hTZWxlY3RPcHRpb24gPyBvcHRpb24udmFsdWUgOlxyXG4gICAgICAgICAgICAob3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0R3JvdXAgPyBvcHRpb24ubGFiZWwgOiBvcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0lucHV0VmlzaWJpbGl0eSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMubXVsdGlwbGUgPT09IHRydWUpIHx8ICh0aGlzLm9wdGlvbnNPcGVuZWQgJiYgIXRoaXMubm9BdXRvQ29tcGxldGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBpbnB1dEtleVVwKHZhbHVlOiBzdHJpbmcgPSAnJykge1xyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zT3BlbmVkICYmIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc09wZW4odmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgZG9JbnB1dFRleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNPcGVuZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlZC5lbWl0KHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGlucHV0Q2xpY2sodmFsdWU6IHN0cmluZyA9ICcnKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnNPcGVuZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zT3Blbih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBzYW5pdGl6ZShodG1sOiBzdHJpbmcpOiBTYWZlSHRtbCB7XHJcbiAgICAgICAgcmV0dXJuIGh0bWwgPyB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sKSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIGhpZ2hsaWdodE9wdGlvbihvcHRpb246IE5neFNlbGVjdE9wdGlvbik6IFNhZmVIdG1sIHtcclxuICAgICAgICBpZiAodGhpcy5pbnB1dEVsUmVmKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24ucmVuZGVyVGV4dCh0aGlzLnNhbml0aXplciwgdGhpcy5pbnB1dEVsUmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uLnJlbmRlclRleHQodGhpcy5zYW5pdGl6ZXIsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgb3B0aW9uU2VsZWN0KG9wdGlvbjogTmd4U2VsZWN0T3B0aW9uLCBldmVudDogRXZlbnQgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9uICYmICFvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLm5leHQoKHRoaXMubXVsdGlwbGUgPyB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQudmFsdWUgOiBbXSkuY29uY2F0KFtvcHRpb25dKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQob3B0aW9uLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2xvc2UoLyp0cnVlKi8pO1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgb3B0aW9uUmVtb3ZlKG9wdGlvbjogTmd4U2VsZWN0T3B0aW9uLCBldmVudDogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgb3B0aW9uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLnN1YmpPcHRpb25zU2VsZWN0ZWQubmV4dCgodGhpcy5tdWx0aXBsZSA/IHRoaXMuc3Viak9wdGlvbnNTZWxlY3RlZC52YWx1ZSA6IFtdKS5maWx0ZXIobyA9PiBvICE9PSBvcHRpb24pKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUuZW1pdChvcHRpb24udmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgaXNPcHRpb25BY3RpdmUob3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24sIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uQWN0aXZlID09PSBvcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5lbnN1cmVWaXNpYmxlRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgb3B0aW9uQWN0aXZhdGUobmF2aWdhdGVkOiBJTmd4T3B0aW9uTmF2aWdhdGVkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCh0aGlzLm9wdGlvbkFjdGl2ZSAhPT0gbmF2aWdhdGVkLmFjdGl2ZU9wdGlvbikgJiZcclxuICAgICAgICAgICAgKCFuYXZpZ2F0ZWQuYWN0aXZlT3B0aW9uIHx8ICFuYXZpZ2F0ZWQuYWN0aXZlT3B0aW9uLmRpc2FibGVkKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbkFjdGl2ZSA9IG5hdmlnYXRlZC5hY3RpdmVPcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGVkLmVtaXQobmF2aWdhdGVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaWx0ZXJPcHRpb25zKHNlYXJjaDogc3RyaW5nLCBvcHRpb25zOiBUU2VsZWN0T3B0aW9uW10sIHNlbGVjdGVkT3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10pOiBUU2VsZWN0T3B0aW9uW10ge1xyXG4gICAgICAgIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoZXNjYXBlU3RyaW5nKHNlYXJjaCksICdpJyksXHJcbiAgICAgICAgICAgIGZpbHRlck9wdGlvbiA9IChvcHRpb246IE5neFNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hDYWxsYmFjayhzZWFyY2gsIG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCFzZWFyY2ggfHwgcmVnRXhwLnRlc3Qob3B0aW9uLnRleHQpKSAmJiAoIXRoaXMubXVsdGlwbGUgfHwgc2VsZWN0ZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uKSA9PT0gLTEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9ucy5maWx0ZXIoKG9wdGlvbjogVFNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9uIGluc3RhbmNlb2YgTmd4U2VsZWN0T3B0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyT3B0aW9uKDxOZ3hTZWxlY3RPcHRpb24+b3B0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb24gaW5zdGFuY2VvZiBOZ3hTZWxlY3RPcHRHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViT3AgPSA8Tmd4U2VsZWN0T3B0R3JvdXA+b3B0aW9uO1xyXG4gICAgICAgICAgICAgICAgc3ViT3AuZmlsdGVyKChzdWJPcHRpb246IE5neFNlbGVjdE9wdGlvbikgPT4gZmlsdGVyT3B0aW9uKHN1Yk9wdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Yk9wLm9wdGlvbnNGaWx0ZXJlZC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVuc3VyZVZpc2libGVFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hvaWNlTWVudUVsUmVmICYmIHRoaXMuY2FjaGVFbGVtZW50T2Zmc2V0VG9wICE9PSBlbGVtZW50Lm9mZnNldFRvcCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlRWxlbWVudE9mZnNldFRvcCA9IGVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5jaG9pY2VNZW51RWxSZWYubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVFbGVtZW50T2Zmc2V0VG9wIDwgY29udGFpbmVyLnNjcm9sbFRvcCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMuY2FjaGVFbGVtZW50T2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2FjaGVFbGVtZW50T2Zmc2V0VG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgPiBjb250YWluZXIuc2Nyb2xsVG9wICsgY29udGFpbmVyLmNsaWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMuY2FjaGVFbGVtZW50T2Zmc2V0VG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgLSBjb250YWluZXIuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcHRpb25zT3BlbihzZWFyY2g6IHN0cmluZyA9ICcnKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc09wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc3VialNlYXJjaFRleHQubmV4dChzZWFyY2gpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5zdWJqT3B0aW9uc1NlbGVjdGVkLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZU9wdGlvbihFTmF2aWdhdGlvbi5maXJzdFNlbGVjdGVkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVPcHRpb24oRU5hdmlnYXRpb24uZmlyc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUb0lucHV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMub3Blbi5lbWl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcHRpb25zQ2xvc2UoLypmb2N1c1RvSG9zdDogYm9vbGVhbiA9IGZhbHNlKi8pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnNPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAvLyBpZiAoZm9jdXNUb0hvc3QpIHtcclxuICAgICAgICAvLyAgICAgY29uc3QgeCA9IHdpbmRvdy5zY3JvbGxYLCB5ID0gd2luZG93LnNjcm9sbFk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubWFpbkVsUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAvLyAgICAgd2luZG93LnNjcm9sbFRvKHgsIHkpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLmNsb3NlLmVtaXQoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b0NsZWFyU2VhcmNoICYmIHRoaXMubXVsdGlwbGUgJiYgdGhpcy5pbnB1dEVsUmVmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRFbFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZE9wdGlvbnMoZGF0YTogYW55W10pOiBBcnJheTxOZ3hTZWxlY3RPcHRpb24gfCBOZ3hTZWxlY3RPcHRHcm91cD4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8Tmd4U2VsZWN0T3B0aW9uIHwgTmd4U2VsZWN0T3B0R3JvdXA+ID0gW107XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbjogTmd4U2VsZWN0T3B0aW9uO1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNPcHRHcm91cCA9IHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlFeGlzdHMoaXRlbSwgdGhpcy5vcHRHcm91cExhYmVsRmllbGQpICYmIHByb3BlcnR5RXhpc3RzKGl0ZW0sIHRoaXMub3B0R3JvdXBPcHRpb25zRmllbGQpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShpdGVtW3RoaXMub3B0R3JvdXBPcHRpb25zRmllbGRdKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc09wdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0R3JvdXAgPSBuZXcgTmd4U2VsZWN0T3B0R3JvdXAoaXRlbVt0aGlzLm9wdEdyb3VwTGFiZWxGaWVsZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1bdGhpcy5vcHRHcm91cE9wdGlvbnNGaWVsZF0uZm9yRWFjaCgoc3ViT3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbiA9IHRoaXMuYnVpbGRPcHRpb24oc3ViT3B0aW9uLCBvcHRHcm91cCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdEdyb3VwLm9wdGlvbnMucHVzaChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gob3B0R3JvdXApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb24gPSB0aGlzLmJ1aWxkT3B0aW9uKGl0ZW0sIG51bGwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZE9wdGlvbihkYXRhOiBhbnksIHBhcmVudDogTmd4U2VsZWN0T3B0R3JvdXApOiBOZ3hTZWxlY3RPcHRpb24ge1xyXG4gICAgICAgIGxldCB2YWx1ZSwgdGV4dCwgZGlzYWJsZWQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0ZXh0ID0gZGF0YTtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiBkYXRhICE9PSBudWxsICYmXHJcbiAgICAgICAgICAgIChwcm9wZXJ0eUV4aXN0cyhkYXRhLCB0aGlzLm9wdGlvblZhbHVlRmllbGQpIHx8IHByb3BlcnR5RXhpc3RzKGRhdGEsIHRoaXMub3B0aW9uVGV4dEZpZWxkKSkpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBwcm9wZXJ0eUV4aXN0cyhkYXRhLCB0aGlzLm9wdGlvblZhbHVlRmllbGQpID8gZGF0YVt0aGlzLm9wdGlvblZhbHVlRmllbGRdIDogZGF0YVt0aGlzLm9wdGlvblRleHRGaWVsZF07XHJcbiAgICAgICAgICAgIHRleHQgPSBwcm9wZXJ0eUV4aXN0cyhkYXRhLCB0aGlzLm9wdGlvblRleHRGaWVsZCkgPyBkYXRhW3RoaXMub3B0aW9uVGV4dEZpZWxkXSA6IGRhdGFbdGhpcy5vcHRpb25WYWx1ZUZpZWxkXTtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBwcm9wZXJ0eUV4aXN0cyhkYXRhLCAnZGlzYWJsZWQnKSA/IGRhdGFbJ2Rpc2FibGVkJ10gOiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBOZ3hTZWxlY3RPcHRpb24odmFsdWUsIHRleHQsIGRpc2FibGVkLCBkYXRhLCBwYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLyBpbnRlcmZhY2UgQ29udHJvbFZhbHVlQWNjZXNzb3IgLy8vLy8vLy8vLy8vXHJcbiAgICBwdWJsaWMgb25DaGFuZ2UgPSAodjogYW55KSA9PiB2O1xyXG5cclxuICAgIHB1YmxpYyBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiBudWxsO1xyXG5cclxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdWJqRXh0ZXJuYWxWYWx1ZS5uZXh0KG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHt9KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgICAgIHRoaXMuc3VialJlZ2lzdGVyT25DaGFuZ2UubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TkdYX1NFTEVDVF9PUFRJT05TLCBOZ3hTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vbmd4LXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQge05neFNlbGVjdE9wdGlvbkRpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uTm90Rm91bmREaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvblNlbGVjdGVkRGlyZWN0aXZlfSBmcm9tICcuL25neC10ZW1wbGF0ZXMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHtJTmd4U2VsZWN0T3B0aW9uc30gZnJvbSAnLi9uZ3gtc2VsZWN0LmludGVyZmFjZXMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtOZ3hTZWxlY3RDb21wb25lbnQsXHJcbiAgICAgICAgTmd4U2VsZWN0T3B0aW9uRGlyZWN0aXZlLCBOZ3hTZWxlY3RPcHRpb25TZWxlY3RlZERpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uTm90Rm91bmREaXJlY3RpdmVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbTmd4U2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgIE5neFNlbGVjdE9wdGlvbkRpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hTZWxlY3RNb2R1bGUge1xyXG4gICAgc3RhdGljIGZvclJvb3Qob3B0aW9uczogSU5neFNlbGVjdE9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogTmd4U2VsZWN0TW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTkdYX1NFTEVDVF9PUFRJT05TLCB1c2VWYWx1ZTogb3B0aW9uc31dXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiZXNjYXBlU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFHQSxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUM7QUFFcEM7Ozs7Ozs7O0lBR0ksWUFBbUIsS0FBc0IsRUFDdEIsTUFDQSxVQUNBLE1BQ0MsVUFBNkIsSUFBSTtRQUpsQyxVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUN0QixTQUFJLEdBQUosSUFBSTtRQUNKLGFBQVEsR0FBUixRQUFRO1FBQ1IsU0FBSSxHQUFKLElBQUk7UUFDSCxZQUFPLEdBQVAsT0FBTztvQkFOVyxRQUFRO2lDQWNSLElBQUk7S0FQekM7Ozs7UUFFVSxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0lBTWpCLFVBQVUsQ0FBQyxTQUF1QixFQUFFLGFBQXFCO1FBQzVELElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLGFBQWEsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssSUFBSSxFQUFFO1lBQzlFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxhQUFhLENBQUM7WUFDeEMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQy9FLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JB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
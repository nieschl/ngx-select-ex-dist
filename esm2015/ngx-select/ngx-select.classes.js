/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as escapeStringNs from 'escape-string-regexp';
/** @type {?} */
const escapeString = escapeStringNs;
export class NgxSelectOption {
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
if (false) {
    /** @type {?} */
    NgxSelectOption.prototype.type;
    /** @type {?} */
    NgxSelectOption.prototype.cacheHighlightText;
    /** @type {?} */
    NgxSelectOption.prototype.cacheRenderedText;
    /** @type {?} */
    NgxSelectOption.prototype.value;
    /** @type {?} */
    NgxSelectOption.prototype.text;
    /** @type {?} */
    NgxSelectOption.prototype.disabled;
    /** @type {?} */
    NgxSelectOption.prototype.data;
    /** @type {?} */
    NgxSelectOption.prototype._parent;
}
export class NgxSelectOptGroup {
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
if (false) {
    /** @type {?} */
    NgxSelectOptGroup.prototype.type;
    /** @type {?} */
    NgxSelectOptGroup.prototype.optionsFiltered;
    /** @type {?} */
    NgxSelectOptGroup.prototype.label;
    /** @type {?} */
    NgxSelectOptGroup.prototype.options;
}
/** @typedef {?} */
var TSelectOption;
export { TSelectOption };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNlbGVjdC5jbGFzc2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNlbGVjdC1leC8iLCJzb3VyY2VzIjpbIm5neC1zZWxlY3Qvbmd4LXNlbGVjdC5jbGFzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssY0FBYyxNQUFNLHNCQUFzQixDQUFDOztBQUd2RCxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUM7QUFFcEMsTUFBTTs7Ozs7Ozs7SUFHRixZQUFtQixLQUFzQixFQUN0QixNQUNBLFVBQ0EsTUFDQyxVQUE2QixJQUFJO1FBSmxDLFVBQUssR0FBTCxLQUFLLENBQWlCO1FBQ3RCLFNBQUksR0FBSixJQUFJO1FBQ0osYUFBUSxHQUFSLFFBQVE7UUFDUixTQUFJLEdBQUosSUFBSTtRQUNILFlBQU8sR0FBUCxPQUFPO29CQU5XLFFBQVE7aUNBY1IsSUFBSTtLQVB6Qzs7OztRQUVVLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7SUFNakIsVUFBVSxDQUFDLFNBQXVCLEVBQUUsYUFBcUI7UUFDNUQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssYUFBYSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7WUFDOUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQztZQUN4QyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUMvRSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUscUJBQXFCLENBQ2pGLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pFO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzs7Q0FFckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxNQUFNOzs7OztJQUtGLFlBQW1CLEtBQWEsRUFDYixVQUE2QixFQUFFO1FBRC9CLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixZQUFPLEdBQVAsT0FBTztvQkFMWSxVQUFVO1FBTTVDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBRU0sTUFBTSxDQUFDLFVBQTJDO1FBQ3JELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUF1QixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Q0FFbkciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RvbVNhbml0aXplciwgU2FmZUh0bWx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGVTdHJpbmdOcyBmcm9tICdlc2NhcGUtc3RyaW5nLXJlZ2V4cCc7XHJcbmltcG9ydCB7SU5neFNlbGVjdE9wdEdyb3VwLCBJTmd4U2VsZWN0T3B0aW9uLCBJTmd4U2VsZWN0T3B0aW9uQmFzZSwgVE5neFNlbGVjdE9wdGlvblR5cGV9IGZyb20gJy4vbmd4LXNlbGVjdC5pbnRlcmZhY2VzJztcclxuXHJcbmNvbnN0IGVzY2FwZVN0cmluZyA9IGVzY2FwZVN0cmluZ05zO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5neFNlbGVjdE9wdGlvbiBpbXBsZW1lbnRzIElOZ3hTZWxlY3RPcHRpb24sIElOZ3hTZWxlY3RPcHRpb25CYXNlIHtcclxuICAgIHJlYWRvbmx5IHR5cGU6IFROZ3hTZWxlY3RPcHRpb25UeXBlID0gJ29wdGlvbic7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgdGV4dDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIGRpc2FibGVkOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIGRhdGE6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3BhcmVudDogTmd4U2VsZWN0T3B0R3JvdXAgPSBudWxsKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJlbnQoKTogTmd4U2VsZWN0T3B0R3JvdXAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWNoZUhpZ2hsaWdodFRleHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgY2FjaGVSZW5kZXJlZFRleHQ6IFNhZmVIdG1sID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyVGV4dChzYW5pdGl6ZXI6IERvbVNhbml0aXplciwgaGlnaGxpZ2h0VGV4dDogc3RyaW5nKTogU2FmZUh0bWwge1xyXG4gICAgICAgIGlmICh0aGlzLmNhY2hlSGlnaGxpZ2h0VGV4dCAhPT0gaGlnaGxpZ2h0VGV4dCB8fCB0aGlzLmNhY2hlUmVuZGVyZWRUZXh0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVIaWdobGlnaHRUZXh0ID0gaGlnaGxpZ2h0VGV4dDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVIaWdobGlnaHRUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlUmVuZGVyZWRUZXh0ID0gc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKCh0aGlzLnRleHQgKyAnJykucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKGVzY2FwZVN0cmluZyh0aGlzLmNhY2hlSGlnaGxpZ2h0VGV4dCksICdnaScpLCAnPHN0cm9uZz4kJjwvc3Ryb25nPidcclxuICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVJlbmRlcmVkVGV4dCA9IHNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlUmVuZGVyZWRUZXh0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmd4U2VsZWN0T3B0R3JvdXAgaW1wbGVtZW50cyBJTmd4U2VsZWN0T3B0R3JvdXAsIElOZ3hTZWxlY3RPcHRpb25CYXNlIHtcclxuICAgIHJlYWRvbmx5IHR5cGU6IFROZ3hTZWxlY3RPcHRpb25UeXBlID0gJ29wdGdyb3VwJztcclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uc0ZpbHRlcmVkOiBOZ3hTZWxlY3RPcHRpb25bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbGFiZWw6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBvcHRpb25zOiBOZ3hTZWxlY3RPcHRpb25bXSA9IFtdKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIoKCkgPT4gdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZpbHRlcihjYWxsYmFja0ZuOiAodmFsdWU6IE5neFNlbGVjdE9wdGlvbikgPT4gYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zRmlsdGVyZWQgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHRpb246IE5neFNlbGVjdE9wdGlvbikgPT4gY2FsbGJhY2tGbihvcHRpb24pKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgVFNlbGVjdE9wdGlvbiA9IE5neFNlbGVjdE9wdEdyb3VwIHwgTmd4U2VsZWN0T3B0aW9uO1xyXG4iXX0=
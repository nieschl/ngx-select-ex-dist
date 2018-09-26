/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as escapeStringNs from 'escape-string-regexp';
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
export { NgxSelectOption };
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
export { NgxSelectOptGroup };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNlbGVjdC5jbGFzc2VzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNlbGVjdC1leC8iLCJzb3VyY2VzIjpbIm5neC1zZWxlY3Qvbmd4LXNlbGVjdC5jbGFzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssY0FBYyxNQUFNLHNCQUFzQixDQUFDOztBQUd2RCxJQUFNLFlBQVksR0FBRyxjQUFjLENBQUM7QUFFcEMsSUFBQTtJQUdJLHlCQUFtQixLQUFzQixFQUN0QixNQUNBLFVBQ0EsTUFDQzs7UUFKRCxVQUFLLEdBQUwsS0FBSyxDQUFpQjtRQUN0QixTQUFJLEdBQUosSUFBSTtRQUNKLGFBQVEsR0FBUixRQUFRO1FBQ1IsU0FBSSxHQUFKLElBQUk7UUFDSCxZQUFPLEdBQVAsT0FBTztvQkFOVyxRQUFRO2lDQWNSLElBQUk7S0FQekM7MEJBRVUsbUNBQU07Ozs7O1lBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7O0lBTWpCLG9DQUFVOzs7OztjQUFDLFNBQXVCLEVBQUUsYUFBcUI7UUFDNUQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssYUFBYSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7WUFDOUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQztZQUN4QyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUMvRSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUscUJBQXFCLENBQ2pGLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pFO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzs7MEJBbEN0QztJQW9DQyxDQUFBO0FBOUJELDJCQThCQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVELElBQUE7SUFLSSwyQkFBbUIsS0FBYSxFQUNiOztRQURBLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixZQUFPLEdBQVAsT0FBTztvQkFMWSxVQUFVO1FBTTVDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQztLQUMzQjs7Ozs7SUFFTSxrQ0FBTTs7OztjQUFDLFVBQTJDO1FBQ3JELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxNQUF1QixJQUFLLE9BQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7OzRCQWpEcEc7SUFtREMsQ0FBQTtBQWJELDZCQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVIdG1sfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0ICogYXMgZXNjYXBlU3RyaW5nTnMgZnJvbSAnZXNjYXBlLXN0cmluZy1yZWdleHAnO1xyXG5pbXBvcnQge0lOZ3hTZWxlY3RPcHRHcm91cCwgSU5neFNlbGVjdE9wdGlvbiwgSU5neFNlbGVjdE9wdGlvbkJhc2UsIFROZ3hTZWxlY3RPcHRpb25UeXBlfSBmcm9tICcuL25neC1zZWxlY3QuaW50ZXJmYWNlcyc7XHJcblxyXG5jb25zdCBlc2NhcGVTdHJpbmcgPSBlc2NhcGVTdHJpbmdOcztcclxuXHJcbmV4cG9ydCBjbGFzcyBOZ3hTZWxlY3RPcHRpb24gaW1wbGVtZW50cyBJTmd4U2VsZWN0T3B0aW9uLCBJTmd4U2VsZWN0T3B0aW9uQmFzZSB7XHJcbiAgICByZWFkb25seSB0eXBlOiBUTmd4U2VsZWN0T3B0aW9uVHlwZSA9ICdvcHRpb24nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgcHVibGljIHRleHQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBkYXRhOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9wYXJlbnQ6IE5neFNlbGVjdE9wdEdyb3VwID0gbnVsbCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGFyZW50KCk6IE5neFNlbGVjdE9wdEdyb3VwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FjaGVIaWdobGlnaHRUZXh0OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGNhY2hlUmVuZGVyZWRUZXh0OiBTYWZlSHRtbCA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHJlbmRlclRleHQoc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIGhpZ2hsaWdodFRleHQ6IHN0cmluZyk6IFNhZmVIdG1sIHtcclxuICAgICAgICBpZiAodGhpcy5jYWNoZUhpZ2hsaWdodFRleHQgIT09IGhpZ2hsaWdodFRleHQgfHwgdGhpcy5jYWNoZVJlbmRlcmVkVGV4dCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlSGlnaGxpZ2h0VGV4dCA9IGhpZ2hsaWdodFRleHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlSGlnaGxpZ2h0VGV4dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZVJlbmRlcmVkVGV4dCA9IHNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCgodGhpcy50ZXh0ICsgJycpLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJlZ0V4cChlc2NhcGVTdHJpbmcodGhpcy5jYWNoZUhpZ2hsaWdodFRleHQpLCAnZ2knKSwgJzxzdHJvbmc+JCY8L3N0cm9uZz4nXHJcbiAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVSZW5kZXJlZFRleHQgPSBzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGhpcy50ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZVJlbmRlcmVkVGV4dDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5neFNlbGVjdE9wdEdyb3VwIGltcGxlbWVudHMgSU5neFNlbGVjdE9wdEdyb3VwLCBJTmd4U2VsZWN0T3B0aW9uQmFzZSB7XHJcbiAgICByZWFkb25seSB0eXBlOiBUTmd4U2VsZWN0T3B0aW9uVHlwZSA9ICdvcHRncm91cCc7XHJcblxyXG4gICAgcHVibGljIG9wdGlvbnNGaWx0ZXJlZDogTmd4U2VsZWN0T3B0aW9uW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGxhYmVsOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb3B0aW9uczogTmd4U2VsZWN0T3B0aW9uW10gPSBbXSkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyKCgpID0+IHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXIoY2FsbGJhY2tGbjogKHZhbHVlOiBOZ3hTZWxlY3RPcHRpb24pID0+IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3B0aW9uc0ZpbHRlcmVkID0gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uOiBOZ3hTZWxlY3RPcHRpb24pID0+IGNhbGxiYWNrRm4ob3B0aW9uKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFRTZWxlY3RPcHRpb24gPSBOZ3hTZWxlY3RPcHRHcm91cCB8IE5neFNlbGVjdE9wdGlvbjtcclxuIl19
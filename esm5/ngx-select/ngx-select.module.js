/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGX_SELECT_OPTIONS, NgxSelectComponent } from './ngx-select.component';
import { NgxSelectOptionDirective, NgxSelectOptionNotFoundDirective, NgxSelectOptionSelectedDirective } from './ngx-templates.directive';
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
export { NgxSelectModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNlbGVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2VsZWN0LWV4LyIsInNvdXJjZXMiOlsibmd4LXNlbGVjdC9uZ3gtc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzlFLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxnQ0FBZ0MsRUFBRSxnQ0FBZ0MsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7OztJQWU1SCx1QkFBTzs7OztJQUFkLFVBQWUsT0FBMEI7UUFDckMsT0FBTztZQUNILFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQztTQUNoRSxDQUFDO0tBQ0w7O2dCQWpCSixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7cUJBQ2Y7b0JBQ0QsWUFBWSxFQUFFLENBQUMsa0JBQWtCO3dCQUM3Qix3QkFBd0IsRUFBRSxnQ0FBZ0MsRUFBRSxnQ0FBZ0M7cUJBQy9GO29CQUNELE9BQU8sRUFBRSxDQUFDLGtCQUFrQjt3QkFDeEIsd0JBQXdCLEVBQUUsZ0NBQWdDLEVBQUUsZ0NBQWdDO3FCQUMvRjtpQkFDSjs7MEJBaEJEOztTQWlCYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge05HWF9TRUxFQ1RfT1BUSU9OUywgTmd4U2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL25neC1zZWxlY3QuY29tcG9uZW50JztcclxuaW1wb3J0IHtOZ3hTZWxlY3RPcHRpb25EaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlLCBOZ3hTZWxlY3RPcHRpb25TZWxlY3RlZERpcmVjdGl2ZX0gZnJvbSAnLi9uZ3gtdGVtcGxhdGVzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7SU5neFNlbGVjdE9wdGlvbnN9IGZyb20gJy4vbmd4LXNlbGVjdC5pbnRlcmZhY2VzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbTmd4U2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgIE5neFNlbGVjdE9wdGlvbkRpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW05neFNlbGVjdENvbXBvbmVudCxcclxuICAgICAgICBOZ3hTZWxlY3RPcHRpb25EaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvblNlbGVjdGVkRGlyZWN0aXZlLCBOZ3hTZWxlY3RPcHRpb25Ob3RGb3VuZERpcmVjdGl2ZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4U2VsZWN0TW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KG9wdGlvbnM6IElOZ3hTZWxlY3RPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmdNb2R1bGU6IE5neFNlbGVjdE1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HWF9TRUxFQ1RfT1BUSU9OUywgdXNlVmFsdWU6IG9wdGlvbnN9XVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl19
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGX_SELECT_OPTIONS, NgxSelectComponent } from './ngx-select.component';
import { NgxSelectOptionDirective, NgxSelectOptionNotFoundDirective, NgxSelectOptionSelectedDirective } from './ngx-templates.directive';
export class NgxSelectModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNlbGVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtc2VsZWN0LWV4LyIsInNvdXJjZXMiOlsibmd4LXNlbGVjdC9uZ3gtc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzlFLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxnQ0FBZ0MsRUFBRSxnQ0FBZ0MsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBY3ZJLE1BQU07Ozs7O0lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUEwQjtRQUNyQyxPQUFPO1lBQ0gsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDO1NBQ2hFLENBQUM7S0FDTDs7O1lBakJKLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtpQkFDZjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxrQkFBa0I7b0JBQzdCLHdCQUF3QixFQUFFLGdDQUFnQyxFQUFFLGdDQUFnQztpQkFDL0Y7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsa0JBQWtCO29CQUN4Qix3QkFBd0IsRUFBRSxnQ0FBZ0MsRUFBRSxnQ0FBZ0M7aUJBQy9GO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TkdYX1NFTEVDVF9PUFRJT05TLCBOZ3hTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vbmd4LXNlbGVjdC5jb21wb25lbnQnO1xyXG5pbXBvcnQge05neFNlbGVjdE9wdGlvbkRpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uTm90Rm91bmREaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvblNlbGVjdGVkRGlyZWN0aXZlfSBmcm9tICcuL25neC10ZW1wbGF0ZXMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHtJTmd4U2VsZWN0T3B0aW9uc30gZnJvbSAnLi9uZ3gtc2VsZWN0LmludGVyZmFjZXMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtOZ3hTZWxlY3RDb21wb25lbnQsXHJcbiAgICAgICAgTmd4U2VsZWN0T3B0aW9uRGlyZWN0aXZlLCBOZ3hTZWxlY3RPcHRpb25TZWxlY3RlZERpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uTm90Rm91bmREaXJlY3RpdmVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbTmd4U2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgIE5neFNlbGVjdE9wdGlvbkRpcmVjdGl2ZSwgTmd4U2VsZWN0T3B0aW9uU2VsZWN0ZWREaXJlY3RpdmUsIE5neFNlbGVjdE9wdGlvbk5vdEZvdW5kRGlyZWN0aXZlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hTZWxlY3RNb2R1bGUge1xyXG4gICAgc3RhdGljIGZvclJvb3Qob3B0aW9uczogSU5neFNlbGVjdE9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogTmd4U2VsZWN0TW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTkdYX1NFTEVDVF9PUFRJT05TLCB1c2VWYWx1ZTogb3B0aW9uc31dXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXX0=
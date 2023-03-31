import { Directive, Input, OnChanges, OnDestroy, Self, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { merge, Subscription, tap } from 'rxjs';

@Directive({
  selector: 'router-outlet[componentClass], router-outlet[dynamicClassGetter]',
})
export class NgxRouterOutletClassDirective implements OnChanges, OnDestroy {

  constructor(
    @Self() private routerOutlet: RouterOutlet,
  ) {
    this.subscription = merge(
      routerOutlet?.activateEvents,
      routerOutlet?.attachEvents,
    ).pipe(
      tap(() => this.componentClassList =
        this.routerOutlet['activated']?.location?.nativeElement.classList),
    ).subscribe({
      next: (component) => {
        this.setComponentClass();

        const dynamicClasses = this.splitClasses(
          this.dynamicClassGetter?.(component));
        if (dynamicClasses) {
          this.setComponentClass(dynamicClasses);
        }
      },
    });
  }

  /**
   * The class(es) to add to the router-outlet's every component's host element.
   * Multiple classes can be separated by spaces.
   * It will be applied to the component's host element every time its value changes
   * or the component changes.
   * We recommend using this input for static classes for better performance.
   * @type {string}
   * @memberof NgxRouterOutletClassDirective
   */
  @Input() componentClass?: string;

  /**
   * A function to get the class(es) for a specific router-outlet's component's host element.
   * The function is called with the component instance as the only argument every time
   * the component changes.
   * The function should return a string with the class(es) to add.
   * Multiple classes can be separated by spaces.
   * @type {function}
   * @memberof NgxRouterOutletClassDirective
   */
  @Input() dynamicClassGetter: (component: any) => string = () => '';

  private componentClassList: DOMTokenList = this.routerOutlet['activated']?.location?.nativeElement.classList;

  private classArray: string[] = [];

  private subscription: Subscription;

  /**
   * Split a string of classes into an array of classes.
   * @param classes A string of classes separated by spaces.
   * @private
   */
  private splitClasses(classes?: string) {
    return classes?.split(' ').filter(Boolean) || [];
  }

  /**
   * Set the component class(es) to the component's host element.
   * @param classes
   * @private
   */
  private setComponentClass(classes: string[] = this.classArray) {
    classes.forEach((className) => {
      if (!this.componentClassList?.contains(className)) {
        this.componentClassList?.add(className);
      }
    });
  }

  /**
   * Unset the component class(es) from the component's host element.
   * @param classes
   * @private
   */
  private unsetComponentClass(classes: string[]) {
    classes.forEach((className) => {
      if (this.componentClassList?.contains(className)) {
        this.componentClassList?.remove(className);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const componentClassChange = changes['componentClass'];

    if (componentClassChange) {
      const { currentValue, previousValue }: {
        currentValue?: string,
        previousValue?: string,
      } = componentClassChange;

      const previousClasses = this.splitClasses(previousValue);
      const newClasses = this.splitClasses(currentValue);
      this.classArray = newClasses;

      const notIn = (target: string[]) => (str: string) => !target.includes(str);
      const classesToRemove = previousClasses.filter(notIn(newClasses));
      const classesToAdd = newClasses.filter(notIn(previousClasses));

      this.unsetComponentClass(classesToRemove);
      this.setComponentClass(classesToAdd);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

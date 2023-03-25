import { Directive, Input, OnChanges, OnDestroy, Self, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { merge, Subscription } from 'rxjs';

@Directive({
  selector: 'router-outlet[componentClass]',
})
export class NgxRouterOutletClassDirective implements OnChanges, OnDestroy {

  constructor(
    @Self() private routerOutlet: RouterOutlet,
  ) {
    this.subscription = merge(
      routerOutlet?.activateEvents,
      routerOutlet?.attachEvents,
    ).subscribe({
      next: () => this.setComponentClass(),
    });
  }

  @Input() componentClass = '';

  subscription: Subscription;

  private setComponentClass() {
    if (this.routerOutlet.isActivated && this.componentClass) {
      this.routerOutlet['activated'].location?.nativeElement.classList
        .add(...this.componentClass.split(' '));
    }
  }

  private unsetComponentClass(classes: string) {
    if (this.routerOutlet.isActivated && classes) {
      this.routerOutlet['activated'].location?.nativeElement.classList
        .remove(...classes.split(' '));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['componentClass']) {
      this.unsetComponentClass(changes['componentClass'].previousValue);

      this.setComponentClass();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

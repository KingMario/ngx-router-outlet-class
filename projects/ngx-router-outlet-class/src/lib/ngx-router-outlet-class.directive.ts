import { Directive, Input, OnChanges, Self, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Directive({
  selector: 'router-outlet[componentClass]',
})
export class NgxRouterOutletClassDirective implements OnChanges {

  constructor(
    @Self() private routerOutlet: RouterOutlet,
  ) {
    routerOutlet?.activateEvents.subscribe(() => {
      this.setComponentClass();
    });

    routerOutlet?.attachEvents.subscribe(() => {
      this.setComponentClass();
    });

    routerOutlet?.detachEvents.subscribe(() => {
      this.setComponentClass();
    });
  }

  @Input() componentClass = '';

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

}

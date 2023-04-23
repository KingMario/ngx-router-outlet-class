# NgxRouterOutletClass

A directive to add CSS class(es) to the activated/attached component's host element (hereinafter, the `route element`)
of a router-outlet.

## Reason

Ever wonder why the class(es) set on router-outlet is not applied to the route element?

This is because, in Angular, the router-outlet is not directly replaced by the route element, while in some other
frameworks, the route element replaces the router outlet/view placeholder. In Angular, the route element is inserted
next to the router-outlet.

You may wish to add a uniform class(es) to each route element based on the overall layout and styling to form a uniform
look for your application regardless of the route's path. It would be less work if you could bind class(es) to
router-outlet and add the class(es) on the fly to each route element instead of adding class(es) to them individually.

This directive adds class binding to the router-outlet to the route element. It is a workaround for the missing
functionality.

## Usage

Simply install and import the module.

Then set or bind a string to the `componentClass` attribute of the router-outlet element, just like you would do to the
class attribute of any native element. The directive will automatically add the class(es) to the route element.

A `dynamicClassGetter` function attribute is also provided to get the dynamic class(es) for the route element. This
function should take the activated component as the only parameter and return the class(es) as a string.

### Install

```bash
npm install ngx-router-outlet-class
```

### Import

```typescript
import { NgxRouterOutletClassModule } from 'ngx-router-outlet-class';

@NgModule({
  imports: [
    NgxRouterOutletClassModule,
  ],
})
export class AppModule {
}
```

### Use

#### Component Class Binding

You can simply set the `componentClass` attribute to a string, which will be added to the route element's class list.

* Static class(es)

```html

<router-outlet componentClass="content-container"></router-outlet>
```

* Dynamic class(es)

```html

<router-outlet [componentClass]="componentClass" #myOutlet="outlet"></router-outlet>
```

```typescript
class AppComponent {

  @ViewChild('myOutlet') myOutlet: RouterOutlet;

  get componentClass() {
    return `content-container ${
      this.myOutlet.component?.isAboutComponent
        ? 'theme-aero'
        : 'theme-violet'
    }`;
  }

}
```

#### High Performance Dynamic Class(es)

Performance has already been taken into consideration when handling bound value changes.

But in the dynamic component class binding above, there is still a performance issue, since the addition and deletion
of class(es) happens not only on change of the bound value, but also (inside the directive) on change of the component.

Use `dynamicClassGetter` function attribute to solve the issue, with `componentClass` used for static or less changeable
class(es) only.

This function is only called by the directive when the component changes, making it a high-performance way to get and
apply the component-specific class(es).

Here's an example of how to use it:

```html

<router-outlet [dynamicClassGetter]="myClassGetter"></router-outlet>
```

```typescript
class AppComponent {

  myClassGetter(component: any) {
    return component?.isAbout
      ? 'theme-aero'
      : 'theme-violet';
  }

}
```

## Limitation

Because the private property `activated` of `RouterOutlet` is used in the directive, there is no guarantee that the
directive will work in the future versions of Angular.

## Upvote My Feature Request

If you find this workaround helpful, please vote my [feature request](https://github.com/angular/angular/issues/49483)
for the Angular team, then we may have built-in functionality in the future.

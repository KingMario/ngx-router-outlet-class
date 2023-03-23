# NgxRouterOutletClass

A directive to add CSS class to the activated/attached component's host element (hereinafter, the route element) of a
router-outlet.

## Reason

Ever wonder why the class set on router-outlet is not applied to the route element?

This is because, in Angular, the router-outlet is not directly replaced by the route element, while in some other
frameworks, the route element replaces the router outlet/view placeholder. In Angular, the route element is inserted
next to the router-outlet.

You may wish to add a uniform class to each route element based on the overall layout and styling to form a uniform look
for your application regardless of the route's path. It would be less work if you could bind class to router-outlet and
add the class on the fly to each route element instead of manually adding classes to them.

This directive adds class binding to the router-outlet to the route element. It is a workaround for the missing
functionality.

## Usage

Simply install and import the module. Then set or bind a string to the componentClass attribute of the router-outlet
element, just like you would do to the class attribute of any native element. The directive will automatically add the
class to the route element.

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

#### Static class

```html

<router-outlet componentClass="content-container an-extra-class'"></router-outlet>
```

#### Dynamic class

```html

<router-outlet [componentClass]="myClass"></router-outlet>
```

## Limitation

Because the private property `activated` of `RouterOutlet` is used in the directive, there is no guarantee that the
directive will work in the future versions of Angular.

## Upvote My Feature Request

If you find this workaround helpful, please vote my [feature request](https://github.com/angular/angular/issues/49483)
for the Angular team, then we may have built-in functionality in the future.

## To Do

- [ ] Add tests
- [ ] Add demo

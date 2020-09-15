import { Component, h } from '@stencil/core';
import { routerState } from '@corejam/core-components';
import { Route, match } from 'stencil-router-v2';

@Component({
  tag: 'app-layout',
})
export class AppLayout {
  render() {
    const Router = routerState.router;
    return (
      <div>
        <dershop-header></dershop-header>
        <Router.Switch>
          <Route path={match('/', { exact: true })}>
            <dershop-spotlight></dershop-spotlight>
          </Route>
          <Route path={match('/products', { exact: true })}>
            <app-products></app-products>
          </Route>
          <Route path={match('/products/:page', { exact: true })} render={({ page }) => <app-products page={Number(page)}></app-products>} />

          <Route path={match('/cart', { exact: true })}>
            <dershop-cart></dershop-cart>
          </Route>
          <Route path={match('/login', { exact: true })}>
            <corejam-auth-form-login></corejam-auth-form-login>
          </Route>
          <Route path={match('/register', { exact: true })}>
            <dershop-form-register></dershop-form-register>
          </Route>
          <Route path={match('/admin/users', { exact: true })}>
            <auth-admin-user-list page={1}></auth-admin-user-list>
          </Route>
          <Route path={match('/admin/users/edit/:id', { exact: true })} render={({ id }) => <auth-admin-user-form id={id}></auth-admin-user-form>} />

          <Route path={match('/admin/orders', { exact: true })}>
            <dershop-admin-order-list page={1}></dershop-admin-order-list>
          </Route>
          <Route path={match('/admin/orders/view/:id', { exact: true })} render={({ id }) => <dershop-order-view id={id}></dershop-order-view>} />
          <Route path={match('/account/order/:id', { exact: true })} render={({ id }) => <dershop-order-view id={id}></dershop-order-view>} />

          <Route path={match('/:slug')} render={({ slug }) => <app-product slug={slug}></app-product>}></Route>
        </Router.Switch>
      </div>
    );
  }
}

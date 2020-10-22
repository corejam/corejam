import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-products',
  shadow: true,
})
export class AppProducts {
  @Prop() page: number = 1;

  render() {
    return <dershop-product-list default></dershop-product-list>;
  }
}

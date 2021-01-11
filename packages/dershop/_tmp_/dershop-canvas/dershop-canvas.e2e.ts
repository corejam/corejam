import { newE2EPage } from '@stencil/core/testing';

describe('dershop-canvas', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dershop-canvas></dershop-canvas>');

    const element = await page.find('dershop-canvas');
    expect(element).toHaveClass('hydrated');
  });
});

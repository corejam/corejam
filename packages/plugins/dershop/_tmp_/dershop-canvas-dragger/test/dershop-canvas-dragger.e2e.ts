import { newE2EPage } from '@stencil/core/testing';

describe('dershop-canvas-dragger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dershop-canvas-dragger></dershop-canvas-dragger>');

    const element = await page.find('dershop-canvas-dragger');
    expect(element).toHaveClass('hydrated');
  });
});

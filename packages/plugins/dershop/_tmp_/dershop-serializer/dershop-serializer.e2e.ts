import { newE2EPage } from '@stencil/core/testing';

describe('dershop-serializer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dershop-serializer></dershop-serializer>');

    const element = await page.find('dershop-serializer');
    expect(element).toHaveClass('hydrated');
  });
});

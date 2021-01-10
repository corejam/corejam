import { newE2EPage } from '@stencil/core/testing';

describe('dershop-editable', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dershop-editable></dershop-editable>');

    const element = await page.find('dershop-editable');
    expect(element).toHaveClass('hydrated');
  });
});

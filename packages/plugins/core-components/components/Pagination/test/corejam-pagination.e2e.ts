import { newE2EPage } from '@stencil/core/testing';

describe('corejam-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<corejam-pagination></corejam-pagination>');

    const element = await page.find('corejam-pagination');
    expect(element).toHaveClass('hydrated');
  });
});

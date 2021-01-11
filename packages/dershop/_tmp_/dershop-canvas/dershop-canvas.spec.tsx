import { newSpecPage } from '@stencil/core/testing';
import { DershopCanvas } from './dershop-canvas';

describe('dershop-canvas', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DershopCanvas],
      html: `<dershop-canvas></dershop-canvas>`,
    });
    expect(page.root).toEqualHtml(`
      <dershop-canvas>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dershop-canvas>
    `);
  });
});

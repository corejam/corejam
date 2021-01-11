import { newSpecPage } from '@stencil/core/testing';
import { DershopEditable } from './dershop-editable';

describe('dershop-editable', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DershopEditable],
      html: `<dershop-editable></dershop-editable>`,
    });
    expect(page.root).toEqualHtml(`
      <dershop-editable>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dershop-editable>
    `);
  });
});

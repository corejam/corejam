import { newSpecPage } from '@stencil/core/testing';
import { DershopSerializer } from './dershop-serializer';

describe('dershop-serializer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DershopSerializer],
      html: `<dershop-serializer></dershop-serializer>`,
    });
    expect(page.root).toEqualHtml(`
      <dershop-serializer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dershop-serializer>
    `);
  });
});

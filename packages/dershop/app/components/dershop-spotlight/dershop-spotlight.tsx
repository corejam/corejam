import { Component, h } from "@stencil/core";

@Component({
  tag: "dershop-spotlight",
})
export class DershopSpotlight {
  render() {
    return (
      <corejam-box flex max="xl" mx="auto" mt={16} mb={16} direction="col" lgDirection="row">
        <corejam-box w="12" lgW="6" lgPr={4} position="relative">
          <corejam-image
            fit="cover"
            w={12}
            h="300px"
            src="https://images.unsplash.com/photo-1562887009-92ca32b341c6?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjE lgd9&amp;-auto=format&amp;fit=crop&amp;w=2378&amp;q=80"
            alt=""
          ></corejam-image>
          <corejam-box flex position="absolute" top={0} p={8} direction="col">
            <corejam-type as="h3" weight="extrabold" color="black">
              Produkt Name
            </corejam-type>
            <corejam-type as="span" weight="bold" color="gray-600">
              12 Items
            </corejam-type>
          </corejam-box>
        </corejam-box>
        <corejam-box flex w="12" lgW="6" pt={4} lgPt={0}>
          <corejam-grid templateColumns="2" templateRows="2" gap={4}>
            <corejam-box position="relative" display="block">
              <corejam-image
                h="142px"
                fit="cover"
                src="https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
                alt=""
              />
              <corejam-box flex direction="col" position="absolute" top={0} left={0} p={8}>
                <corejam-type weight="bold" size="sm" color="gray-800" lineHeight="relaxed">
                  Produkt Names
                </corejam-type>
                <corejam-type as="span" weight="hairline" size="xs" color="gray-600">
                  12 Items
                </corejam-type>
              </corejam-box>
            </corejam-box>
            <corejam-box position="relative" display="block">
              <corejam-image
                h="142px"
                fit="cover"
                src="https://images.unsplash.com/photo-1562887189-7c2ae6ace6dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80"
                alt=""
              />
              <corejam-box flex direction="col" position="absolute" top={0} left={0} p={8}>
                <corejam-type as="span" weight="bold" size="sm" lineHeight="relaxed" color="gray-800">
                  Produkt Name
                </corejam-type>
                <corejam-type as="span" weight="hairline" color="gray-600">
                  12 Items
                </corejam-type>
              </corejam-box>
            </corejam-box>
            <corejam-box position="relative" display="block">
              <corejam-image
                h="142px"
                fit="cover"
                src="https://images.unsplash.com/photo-1562886877-f12251816e01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80"
                alt=""
              />
              <corejam-box flex direction="col" position="absolute" top={0} left={0} p={8}>
                <corejam-type as="span" weight="bold" size="sm" color="gray-800" lineHeight="relaxed">
                  Produkt Namess
                </corejam-type>
                <corejam-type as="span" weight="hairline" size="xs" color="gray-600">
                  12 Items
                </corejam-type>
              </corejam-box>
            </corejam-box>
            <corejam-box position="relative" display="block">
              <corejam-image
                h="142px"
                fit="cover"
                src="https://images.unsplash.com/photo-1562886812-41775a01195d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2378&q=80"
                alt=""
              />
              <corejam-box flex direction="col" position="absolute" top={0} left={0} p={8}>
                <corejam-type as="span" weight="bold" size="sm" lineHeight="relaxed" color="gray-800">
                  Produkt Name
                </corejam-type>
                <corejam-type as="span" weight="hairline" size="xs" color="gray-600">
                  12 Items
                </corejam-type>
              </corejam-box>
            </corejam-box>
          </corejam-grid>
        </corejam-box>
      </corejam-box>
    );
  }
}

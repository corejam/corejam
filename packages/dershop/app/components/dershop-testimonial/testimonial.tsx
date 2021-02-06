import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "dershop-testimonial",
  styleUrl: "testimonial.css",
})
export class Testimonial {
  @Prop() heading: string;
  @Prop() text: string;
  render() {
    return (
      <Host>
        <section>
          <corejam-box
            flex
            max="xl"
            mx="auto"
            bg="gray-400"
            direction="col"
            justify="center"
            items="center"
            px={12}
            py={8}
            mdPx={32}
            mdPy={12}
            lgPx={64}
            lgPy={16}
            mb={24}
          >
            <corejam-box mb={2}>
              <corejam-type as="h3" size="lg">
                Testimonial
              </corejam-type>
            </corejam-box>
            <corejam-type as="p" color="gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum nihil sed, voluptatem aliquid qui ipsa
              suscipit, ex sequi repellendus tenetur ab placeat saepe. Sit quia reprehenderit minus voluptate ab magnam.
            </corejam-type>
            <corejam-box flex mt={2} justify="center">
              <corejam-box w={1}>
                <corejam-image
                  h="60px"
                  fit="cover"
                  rounded="full"
                  src="https://images.unsplash.com/photo-1579743748827-b7fef7954fdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=933&amp;q=80"
                  alt=""
                />
              </corejam-box>
            </corejam-box>
          </corejam-box>
        </section>
      </Host>
    );
  }
}

import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "dershop-route-account",
  shadow: true,
})
export class CartRoute {
  render() {
    return (
      <Host>
        <corejam-box max="xl" mx="auto" mt={12} px={4} lgPx={0}>
          <corejam-box mb={16}>
            <corejam-type as="h2" size="3xl" align="center" weight="bold">
              My Account
            </corejam-type>
          </corejam-box>
          <corejam-box flex>
            <corejam-box w={3} pt={8} bWidthTop={1} bColor="gray-500" mr={24}>
              <corejam-box flex direction="col">
                <corejam-box mb={4}>
                  <corejam-base-link href="#" class="py-4 mb-1">
                    Personal details
                  </corejam-base-link>
                </corejam-box>
                <corejam-box mb={4}>
                  <corejam-base-link href="#" class="py-4 mb-1">
                    Address book
                  </corejam-base-link>
                </corejam-box>
                <corejam-box mb={4}>
                  <corejam-base-link href="#" class="py-4 mb-1">
                    Settings
                  </corejam-base-link>
                </corejam-box>
              </corejam-box>
            </corejam-box>
            <corejam-box w={9} pt={8} bWidthTop={1} bColor="gray-500">
              <corejam-box flex mb={8}>
                <corejam-box w={6} pr={4}>
                  <corejam-form-input
                    label="First name"
                    required
                    type="text"
                    placeholder="Firstname"
                    id="firstname"
                  ></corejam-form-input>
                </corejam-box>
                <corejam-box w={6} pl={4}>
                  <corejam-form-input
                    id="lastname"
                    required
                    type="text"
                    placeholder="Lastname"
                    label="Last name"
                  ></corejam-form-input>
                </corejam-box>
              </corejam-box>
              <corejam-box flex mb={8}>
                <corejam-box w={6} pr={4}>
                  <corejam-form-input
                    id="birthday"
                    label="Birthday"
                    type="date"
                    placeholder="Birthday"
                  ></corejam-form-input>
                </corejam-box>
              </corejam-box>
              <corejam-box flex mb={8}>
                <corejam-box w={6} pr={4}>
                  <corejam-form-input
                    id="phonenumber"
                    type="number"
                    label="Phone number"
                    placeholder="Phone"
                  ></corejam-form-input>
                </corejam-box>
                <corejam-box w={6} pl={4}>
                  <corejam-form-input
                    id="mail"
                    type="mail"
                    label="Email Address"
                    placeholder="Email"
                  ></corejam-form-input>
                </corejam-box>
              </corejam-box>
              <corejam-base-link href="#">
                <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                  Save
                </corejam-type>
              </corejam-base-link>
              <corejam-box bWidthBottom={1} bColor="gray-400" mb={8} mt={12}>
                <corejam-type as="h3" size="xl">
                  Password
                </corejam-type>
              </corejam-box>
              <corejam-box flex mb={8}>
                <corejam-box w={6}>
                  <corejam-form-input
                    id="currentpassword"
                    type="password"
                    label="Current Password"
                    placeholder="Current password"
                  ></corejam-form-input>
                </corejam-box>
              </corejam-box>
              <corejam-box flex mb={8}>
                <corejam-box w={6}>
                  <corejam-form-input
                    id="newpasswor"
                    type="password"
                    label="New Password"
                    placeholder="New password"
                  ></corejam-form-input>
                </corejam-box>
              </corejam-box>
              <corejam-box flex mb={8}>
                <corejam-box w={6}>
                  <corejam-form-input
                    id="confirmpassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm password"
                  ></corejam-form-input>
                </corejam-box>
              </corejam-box>
              <corejam-base-link href="#">
                <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                  Save
                </corejam-type>
              </corejam-base-link>
            </corejam-box>
          </corejam-box>
        </corejam-box>
      </Host>
    );
  }
}

import { coreState } from '@corejam/core-components';
import { Component, h, Listen } from '@stencil/core';
import gql from 'graphql-tag';
import { userUpdatePasswordMutationGQL } from '../../../shared/graphql/Mutations';

@Component({
  tag: 'auth-reset-password-form'
})
export class AuthResetPasswordForm {

  private updatePasswordFormId = "updatePassword";

  @Listen("sendForm", { target: "window" })
  async formEventHandler({ detail }) {
    if (detail.formId != this.updatePasswordFormId) return;

    return this.updatePassword(detail)
  }

  async updatePassword(detail) {
    const userInput = {};

    Object.keys(detail).map(value => {
      if (detail[value].key) {
        userInput[detail[value].key] = detail[value].value
      }
    })

    await coreState.client.mutate({
      mutation: gql(userUpdatePasswordMutationGQL),
      variables: {
        userPasswordInput: userInput
      }
    })
  }

  render() {
    return (
      <corejam-box>
        <corejam-box bWidthBottom={1} bColor="gray-400" mb={8} mt={12}>
          <corejam-type as="h3" size="xl">
            Update Password
          </corejam-type>
        </corejam-box>
        <corejam-form-container name={this.updatePasswordFormId}>
          <corejam-box flex mb={8}>
            <corejam-box w={6}>
              <corejam-form-input
                name="oldPassword"
                type="password"
                formId={this.updatePasswordFormId}
                label="Current Password"
                placeholder="Current password"
              ></corejam-form-input>
            </corejam-box>
          </corejam-box>
          <corejam-box flex mb={8}>
            <corejam-box w={6}>
              <corejam-form-input
                name="password"
                type="password"
                formId={this.updatePasswordFormId}
                label="New Password"
                placeholder="New password"
              ></corejam-form-input>
            </corejam-box>
          </corejam-box>
          <corejam-box flex mb={8}>
            <corejam-box w={6}>
              <corejam-form-input
                name="passwordConfirm"
                type="password"
                formId={this.updatePasswordFormId}
                label="Confirm Password"
                placeholder="Confirm password"
              ></corejam-form-input>
            </corejam-box>
          </corejam-box>
          <corejam-base-link href="#">
            <corejam-form-submit formId={this.updatePasswordFormId} >
              <corejam-type size="sm" weight="bold" transform="uppercase" decoration="underline">
                Save
            </corejam-type>
            </corejam-form-submit>
          </corejam-base-link>
        </corejam-form-container>
      </corejam-box>
    );
  }
}

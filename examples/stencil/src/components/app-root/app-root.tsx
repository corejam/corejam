import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  render() {
    return (
      <corejam-init>
        <corejam-ui-base></corejam-ui-base>
        <app-layout></app-layout>
      </corejam-init>
    );
  }
}

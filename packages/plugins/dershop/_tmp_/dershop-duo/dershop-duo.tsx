//@ts-nocheck
import { Component, Host, h, Event, State } from "@stencil/core";
import { EventEmitter } from "stencil-apollo/dist/types/stencil.core";

@Component({
  tag: "dershop-duo",
  styleUrl: "dershop-duo.css",
})
export class DershopDuo {
  @State() isConnected: boolean = false;
  @Event() establishP2P: EventEmitter;
  @Event() disconnectP2P: EventEmitter;
  @Listen("p2pEstablished", { target: "document" })
  markEstablished() {
    this.isConnected = true;
  }
  @Listen("p2pDisconnected", { target: "document" })
  markDisconnected() {
    this.isConnected = false;
  }
  renderIcon() {
    if (this.isConnected)
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.3006 1.04621C11.7169 1.17743 12 1.56348 12 1.99995V6.99995L16 6.99995C16.3729 6.99995 16.7148 7.20741 16.887 7.53814C17.0592 7.86887 17.0331 8.26794 16.8192 8.57341L9.81924 18.5734C9.56894 18.931 9.11564 19.0849 8.69936 18.9537C8.28309 18.8225 8 18.4364 8 18L8 13H4C3.62713 13 3.28522 12.7925 3.11302 12.4618C2.94083 12.131 2.96694 11.732 3.18077 11.4265L10.1808 1.42649C10.4311 1.06892 10.8844 0.914992 11.3006 1.04621Z"
            fill="#4A5568"
          ></path>
        </svg>
      );
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 10V3L4 14H11L11 21L20 10L13 10Z"
          stroke="#4A5568"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  toggleP2P() {
    console.log("click");
    this.isConnected ? this.disconnectP2P.emit() : this.establishP2P.emit();
  }
  render() {
    return <Host onClick={() => this.toggleP2P()}>{this.renderIcon()}</Host>;
  }
}

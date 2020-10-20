/*
import { Component, Host, h, State, Prop, Element, Event, Listen, EventEmitter, Build } from "@stencil/core";
import { canvasOpenPeers, canvasClosePeers } from "@corejam/base/dist/esm/mutations/Canvas";
import { canvasPagesPollPeers } from "@corejam/base/dist/esm/queries/Admin/CanvasPages";
import appState from "../../store/app";
declare var SimplePeer: any;

@Component({
  tag: "dershop-peer",
  
})
export class DershopPeer {
  @State() hash: string = ((Math.random() * (10000000 - 1 + 1)) << 0).toString();
  @State() sessionId: string; //Iniator session id
  @Prop() inviteId: string; //receiver sessionId
  @Prop() canvasId: string;
  @Event() p2pEstablished: EventEmitter;
  @Event() p2pDisconnected: EventEmitter;
  @Event() p2pReceivedData: EventEmitter;
  private isConnected = false;

  private peerInstance: any;

  @Element() el: HTMLElement;
  componentWillLoad() {
    if (Build.isBrowser) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/simple-peer@9.7.2/simplepeer.min.js";
      document.body.append(script);

      const broadcastNode = document.createElement("dershop-duo");
      document.body.appendChild(broadcastNode);
    }
  }

  componentDidRender() {
    if (Build.isBrowser) {
      const urlParams = new URLSearchParams(window.location.search);
      const inviteId = urlParams.get("inviteId");
      if (inviteId) {
        this.setupPeer(false);
        this.join();
      }
    }
  }

  setupPeer(initiator = true) {
    console.log("new peer instance");
    this.peerInstance = null;
    this.peerInstance = new SimplePeer({
      initiator,
      trickle: false,
    });

    this.peerInstance.on("error", async (err) => {
      console.log("error", err);
      await appState.client.request(canvasClosePeers, {
        id: this.canvasId,
      });
    });

    this.peerInstance.on("signal", async (offer) => {
      if (!this.isConnected) {
        this.isConnected = true;
        console.log("offer:", offer);
        const res = await appState.client.request(canvasOpenPeers, {
          id: this.canvasId,
          peerInput: {
            hash: this.hash,
            offer: JSON.stringify(offer),
          },
        });
        if (res) {
          const answer: any = await this.pollForPeers();
          console.log("answer", answer);
          this.peerInstance.signal(JSON.parse(answer.offer));
          this.p2pEstablished.emit();
          document.addEventListener("mousemove", (e) => {
            const data = {
              receiver: "Cursor",
              cursor: {
                x: e.clientX,
                y: e.clientY,
                width: window.innerWidth,
                height: window.innerHeight,
              },
            };
            this.peerInstance.send(JSON.stringify(data));
          });

          document.addEventListener("mousedown", () => {
            const data = {
              receiver: "CursorMousedown",
            };
            this.peerInstance.send(JSON.stringify(data));
          });
          document.addEventListener("mouseup", () => {
            const data = {
              receiver: "CursorMouseup",
            };
            this.peerInstance.send(JSON.stringify(data));
          });
        }
      }
    });

    this.peerInstance.on("connect", () => {
      console.log("CONNECT");
    });

    this.peerInstance.on("data", (data) => {
      try {
        const parsed = JSON.parse(data);
        this.p2pReceivedData.emit(parsed);
      } catch (e) {
        console.log(e);
      }
    });

    this.peerInstance.on("close", async () => {
      console.log("close");
      const res = await appState.client.request(canvasClosePeers, {
        id: this.canvasId,
      });
      if (res) this.p2pDisconnected.emit();
    });
  }

  async join() {
    const remotePeer: any = await this.pollForPeers();
    if (remotePeer) this.peerInstance.signal(remotePeer.offer);
  }

  private async pollForPeers() {
    return new Promise((res) => {
      console.log(res);
      const id = setInterval(async () => {
        const data = await appState.client.request(canvasPagesPollPeers, { id: this.canvasId });

        const peers = data.canvasPollPeers;
        const remotePeer = peers.peers.filter((peer) => peer.hash !== this.hash);
        if (remotePeer.length > 0) {
          clearInterval(id);
          res(remotePeer[0]);
        }
      }, 2000);
    });
  }

  @Listen("establishP2P", { target: "document" })
  initP2p(_e) {
    this.setupPeer();
  }
  @Listen("disconnectP2P", { target: "document" })
  disconnectP2P(_e) {
    if (this.peerInstance) this.peerInstance.destroy();
    this.isConnected = false;
  }

  @Listen("p2pSendData", { target: "document" })
  sendPeerData(e: CustomEvent) {
    if (this.peerInstance) this.peerInstance.send("" + JSON.stringify(e.detail) + "");
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
*/

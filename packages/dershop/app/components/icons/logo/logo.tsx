//@ts-nocheck
import { Component, h, Host } from "@stencil/core";

const SvgLogo = ({ colorCode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    id="svg4924"
    x="0"
    y="0"
    version="1.1"
    xmlSpace="preserve"
    viewBox="0 0 586.925 686.087"
  >
    <defs>
      <path
        fill={colorCode}
        id="SVGID_5_"
        d="M129.9 303.3c-.9 6.4-5.1 12.5-12.2 18.1 7.2-3.1 11.1-8.2 12.6-14.2 4.1 21.9-8.7 17.1-18.9 21.9-2.4-21.1 15.2-16.7 18.5-25.8"
      />
      <path
        fill={colorCode}
        id="SVGID_3_"
        d="M135 307.6c2.3 7.5 7.5 13.6 16.7 17-9.3-6.6-14.9-13.9-16.4-21.9 4.7 11.1 26.5 4.6 24.8 31.1-13.1-5.4-28.7 1.4-25.1-26.2"
      />
      <path
        fill={colorCode}
        id="SVGID_1_"
        d="M130.1 325.9c-1 7.8 1.3 15.5 8.3 22.3-5.8-9.8-7.9-18.7-6.1-26.7-.2 12.1 22.4 14.9 10.1 38.5-9.8-10.2-26.9-10.4-12.3-34.1"
      />
    </defs>
    <g id="g94" clip-path="none" transform="translate(-370.87 -40.79)">
      <g id="g92">
        <g id="g4932" transform="matrix(1.33333 0 0 -1.33333 0 800)">
          <g id="g5582" transform="translate(-720.232 -2663.47) scale(8.98022)">
            <g id="g5412">
              <defs id="defs13">
                <use xlinkHref="#SVGID_1_" />
              </defs>
              <use
                id="use15"
                width="100%"
                height="100%"
                x="0"
                y="0"
                fill={colorCode}
                overflow="visible"
                xlinkHref="#SVGID_1_"
              />
              <clipPath id="SVGID_2_">
                <use id="use17" width="100%" height="100%" x="0" y="0" overflow="visible" xlinkHref="#SVGID_1_" />
              </clipPath>
              <g id="g5414" clip-path="url(#SVGID_2_)">
                <g id="g5420">
                  <g id="g5422">
                    <use id="path5434" class="st1" xlinkHref="#SVGID_1_" />
                  </g>
                </g>
              </g>
            </g>
            <g id="g5436">
              <defs id="defs26">
                <use xlinkHref="#SVGID_3_" />
              </defs>
              <use
                id="use28"
                width="100%"
                height="100%"
                x="0"
                y="0"
                fill={colorCode}
                overflow="visible"
                xlinkHref="#SVGID_3_"
              />
              <clipPath id="SVGID_4_">
                <use id="use30" width="100%" height="100%" x="0" y="0" overflow="visible" xlinkHref="#SVGID_3_" />
              </clipPath>
              <g id="g5438" clip-path="url(#SVGID_4_)">
                <g id="g5444">
                  <g id="g5446">
                    <use id="path5458" class="st1" xlinkHref="#SVGID_3_" />
                  </g>
                </g>
              </g>
            </g>
            <g id="g5460">
              <defs id="defs39">
                //@ts-ignore
                <use xlinkHref="#SVGID_5_" />
              </defs>
              <use
                id="use41"
                width="100%"
                height="100%"
                x="0"
                y="0"
                fill={colorCode}
                overflow="visible"
                xlinkHref="#SVGID_5_"
              />
              <clipPath id="SVGID_6_">
                <use id="use43" width="100%" height="100%" x="0" y="0" overflow="visible" xlinkHref="#SVGID_5_" />
              </clipPath>
              <g id="g5462" clip-path="url(#SVGID_6_)">
                <g id="g5468">
                  <g id="g5470">
                    <use id="path5482" class="st1" xlinkHref="#SVGID_5_" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
    <use id="use98" width="100%" height="100%" x="0" y="0" transform="translate(-370.87 -40.79)" xlinkHref="#g92" />
  </svg>
);

@Component({
  tag: "dershop-logo",
  styleUrl: "logo.css",
})

/**
 *
 * Ref to svg, will be replaced by svg set
 */
export class Logo {
  render() {
    return (
      <Host>
        <SvgLogo colorCode="#333" />
      </Host>
    );
  }
}

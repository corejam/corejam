/**
 *
 * @param value
 *
 */

export default {
  property: "animation",
  transform: (value) => {
    const valids = ["none", "spin", "ping", "pulse", "bounce"];
    const valueMap = {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite",
    };
    if (valids.includes(value)) return valueMap[value];
  },
  additional: (value) => {
    if (!document.querySelector(`style#cj-animation-${value}`)) {
      const styleNode = document.createElement("style");
      styleNode.id = "cj-animation-" + value;
      if (value === "spin") {
        styleNode.innerHTML = `
            @keyframes spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `;
      }
      if (value === "ping") {
        styleNode.innerHTML = `@keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }`;
      }
      if (value === "pulse") {
        styleNode.innerHTML = `
            @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: .5;
                }
              }
            `;
      }
      if (value === "bounce") {
        styleNode.innerHTML = `
            @keyframes bounce {
                0%, 100% {
                  transform: translateY(-25%);
                  animationTimingFunction: cubic-bezier(0.8, 0, 1, 1);
                }
                50% {
                  transform: translateY(0);
                  animationTimingFunction: cubic-bezier(0, 0, 0.2, 1);
                }
              }
            `;
      }

      document.head.appendChild(styleNode);
    }
    return [];
  },
};

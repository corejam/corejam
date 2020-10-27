import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "corejam-ui-base",
})
export class UiBase {
  async componentWillRender() {
    const styleRules = `
    * {
      box-sizing: border-box;
    }
    html {
      line-height: 1.15;
      height: 100%;
    }
    body {
      font-family: var(--cj-font-sans);
      margin: 0;
    }
    :root {
      --cj-breakpoint-sm: 640;
      --cj-breakpoint-md: 768;
      --cj-breakpoint-lg: 1024;
      --cj-breakpoint-xl: 1280;
      --cj-box-multiplier: 0.25;


      --cj-font-sans: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
      --cj-font-serif: Georgia, Cambria, Times New Roman, Times, serif;
      --cj-font-mono:Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;

      --cj-link-decoration: none;
      --cj-link-hover-decoration: underline;

      --cj-color-black: #000;
      --cj-color-white: #fff;

      --cj-color-gray-100: #f7fafc;
      --cj-color-gray-200: #edf2f7;
      --cj-color-gray-300: #e2e8f0;
      --cj-color-gray-400: #cbd5e0;
      --cj-color-gray-500: #a0aec0;
      --cj-color-gray-600: #718096;
      --cj-color-gray-700: #4a5568;
      --cj-color-gray-800: #2d3748;
      --cj-color-gray-900: #1a202c;


        --cj-color-red-100: #fff5f5;
        --cj-color-red-200: #fed7d7;
        --cj-color-red-300: #feb2b2;
        --cj-color-red-400: #fc8181;
        --cj-color-red-500: #f56565;
        --cj-color-red-600: #e53e3e;
        --cj-color-red-700: #c53030;
        --cj-color-red-800: #9b2c2c;
        --cj-color-red-900: #742a2a;

        --cj-color-orange-100: #fffaf0;
        --cj-color-orange-200: #feebc8;
        --cj-color-orange-300: #fbd38d;
        --cj-color-orange-400: #f6ad55;
        --cj-color-orange-500: #ed8936;
        --cj-color-orange-600: #dd6b20;
        --cj-color-orange-700: #c05621;
        --cj-color-orange-800: #9c4221;
        --cj-color-orange-900: #7b341e;


        --cj-color-yellow-100: #fffff0;
        --cj-color-yellow-200: #fefcbf;
        --cj-color-yellow-300: #faf089;
        --cj-color-yellow-400: #f6e05e;
        --cj-color-yellow-500: #ecc94b;
        --cj-color-yellow-600: #d69e2e;
        --cj-color-yellow-700: #b7791f;
        --cj-color-yellow-800: #975a16;
        --cj-color-yellow-900: #744210;


        --cj-color-green-100: #f0fff4;
        --cj-color-green-200: #c6f6d5;
        --cj-color-green-300: #9ae6b4;
        --cj-color-green-400: #68d391;
        --cj-color-green-500: #48bb78;
        --cj-color-green-600: #38a169;
        --cj-color-green-700: #2f855a;
        --cj-color-green-800: #276749;
        --cj-color-green-900: #22543d;

        
        --cj-color-teal-100: #e6fffa;
        --cj-color-teal-200: #b2f5ea;
        --cj-color-teal-300: #81e6d9;
        --cj-color-teal-400: #4fd1c5;
        --cj-color-teal-500: #38b2ac;
        --cj-color-teal-600: #319795;
        --cj-color-teal-700: #2c7a7b;
        --cj-color-teal-800: #285e61;
        --cj-color-teal-900: #234e52;

        --cj-color-blue-100: #ebf8ff;
        --cj-color-blue-200: #bee3f8;
        --cj-color-blue-300: #90cdf4;
        --cj-color-blue-400: #63b3ed;
        --cj-color-blue-500: #4299e1;
        --cj-color-blue-600: #3182ce;
        --cj-color-blue-700: #2b6cb0;
        --cj-color-blue-800: #2c5282;
        --cj-color-blue-900: #2a4365;


        --cj-color-indigo-100: #ebf4ff;
        --cj-color-indigo-200: #c3dafe;
        --cj-color-indigo-300: #a3bffa;
        --cj-color-indigo-400: #7f9cf5;
        --cj-color-indigo-500: #667eea;
        --cj-color-indigo-600: #5a67d8;
        --cj-color-indigo-700: #4c51bf;
        --cj-color-indigo-800: #434190;
        --cj-color-indigo-900: #3c366b;

      
        --cj-color-purple-100: #faf5ff;
        --cj-color-purple-200: #e9d8fd;
        --cj-color-purple-300: #d6bcfa;
        --cj-color-purple-400: #b794f4;
        --cj-color-purple-500: #9f7aea;
        --cj-color-purple-600: #805ad5;
        --cj-color-purple-700: #6b46c1;
        --cj-color-purple-800: #553c9a;
        --cj-color-purple-900: #44337a;

        --cj-color-pink-100: #fff5f7;
        --cj-color-pink-200: #fed7e2;
        --cj-color-pink-300: #fbb6ce;
        --cj-color-pink-400: #f687b3;
        --cj-color-pink-500: #ed64a6;
        --cj-color-pink-600: #d53f8c;
        --cj-color-pink-700: #b83280;
        --cj-color-pink-800: #97266d;
        --cj-color-pink-900: #702459;

        --cj-color-primary: var(--cj-color-black);
        --cj-color-secondary: var(--cj-color-gray-800);


      --cj-font-size-xs: 0.75rem;
      --cj-font-size-sm: 0.875rem;
      --cj-font-size-base: 1rem;
      --cj-font-size-lg: 1.125rem;
      --cj-font-size-xl: 1.25rem;
      --cj-font-size-2xl: 1.5rem;
      --cj-font-size-3xl: 1.875rem;
      --cj-font-size-4xl: 2.25rem;
      --cj-font-size-5xl: 3rem;
      --cj-font-size-6xl: 4rem;
      --cj-font-weight-hairline: 100;
      --cj-font-weight-thin: 200;
      --cj-font-weight-light: 300;
      --cj-font-weight-normal: 400;
      --cj-font-weight-medium: 500;
      --cj-font-weight-semibold: 600;
      --cj-font-weight-bold: 700;
      --cj-font-weight-extrabold: 800;
      --cj-font-weight-black: 900;
      --cj-font-spacing-tighter: -0.05em;
      --cj-font-spacing-tight: -0.025em;
      --cj-font-spacing-normal: 0;
      --cj-font-spacing-wide: 0.025em;
      --cj-font-spacing-wider: 0.05em;
      --cj-font-spacing-widest: 0.1em;
      --cj-font-line-height-none: 1;
      --cj-font-line-height-tight: 1.25;
      --cj-font-line-height-snug: 1.375;
      --cj-font-line-height-normal: 1.5;
      --cj-font-line-height-relaxed: 1.625;
      --cj-font-line-height-loose: 2;
      --cj-font-line-height-3: .75rem;
      --cj-font-line-height-4: 1rem;
      --cj-font-line-height-5: 1.25rem;
      --cj-font-line-height-6: 1.5rem;
      --cj-font-line-height-7: 1.75rem;
      --cj-font-line-height-8: 2rem;
      --cj-font-line-height-9: 2.25rem;
      --cj-font-line-height-10: 2.5rem;
    }
  `;
    const existingTag = document.querySelectorAll("head style#corejam-ui-base");
    if (existingTag.length > 0) {
      existingTag[0].innerHTML = styleRules;
    } else {
      const style = document.createElement("style");
      style.id = "corejam-ui-base";
      style.innerHTML = styleRules;
      document.head.appendChild(style);
    }
  }
  render() {
    return <Host></Host>;
  }
}

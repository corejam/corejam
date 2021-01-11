export default (value, styles, title) => {
    let styleString = "";
    styles.forEach((style) => {
        styleString += style.outerHTML;
    })

    return `
<html>
    <head>
        <title>${title}</title>
        ${styleString}
        <script type="module" src="https://unpkg.com/@corejam/core-components@latest/web-components/index.js"></script>
        <script nomodule src="https://unpkg.com/@corejam/core-components@latest/web-components/index.cjs"></script>
    </head>
    <body>
        ${value}
    </body>
</html>
`}
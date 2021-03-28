# web-ext-citation

## Folder structure
### src/asset
Folder structure containing the components making up the background page for the web extension.  
Contains `manifest.json`.  
Contains the icons for the web extension.  
Contains `index.html`, the markup for the web extension.    
`index.html` is empty - the html is injected through `<div id='root'>`with react.  

### src/background-script
`src/App.tsx` is already considered a background script.  
Additional background scripts, found in this folder, can be injected into index.html.  
The injection of all the background scripts is done through the webpack plugin `HtmlWebpackPlugin`.  

### src/content-script
Contains all the content scripts. 

### src/styles
Tailwind is used for CSS.  

### webpack
The background-scripts, content-scripts, and `index.tsx` (react) are prevented from being compiled into a single `.js` file by specifying multiple entry points and multiple output files.  
To configure Tailwind with webpack, `MiniCssExtractPlugin.loader`, `css-loader`, `postcss-loader` are needed.  
`postcss-loader` process Tailwind syntax into pure css.
`MiniCssExtractPlugin.loader` extracts CSS into separate files instead of compiling the css into js.
# My experience building a web extension

## About
This web extension auto generates citations, when the user copies the text from the following Singapore academic websites.
1. https://www.lawnet.sg/lawnet/web/lawnet/free-resources (judgements)

## Why I created this extension
As a student, cumbersome to keep track of citation
Time consuming!

```
//Examples of citations
Constitution of the Republic of Singapore (1999 Reprint) Art 14(1)
Tan Ching Seng v Raffles Town Club Pte Ltd [2002] 3 SLR 345 at [10]
```

## Demo


## Challenges
1. Cross browser compatability

Use firefox's [WebExtension browser API Polyfill](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension)

2. Using React to build web extensions
All web extensions need a manifest.json file

manifest.json file specifies the location of the content script, background script, and static assets (html, css, js)

=> Use webpack to specify multiple output paths!

3. Automated Testing
Conventional testing framework like Cypress / React testing library is confined to the web page.

Browser extensions are embedded add-ons, not regular HTML files. Since the extension is out of scope, it is not possible to simulate user actions such as clicks and scrolls, inspect web elements, etc.

Can only test the extension interface itself, but not the interaction between the webpage and the extension

For testing in chromium browsers, can use [Puppeteer](https://dev.to/scahhht/simple-steps-for-testing-a-chrome-extension-in-puppeteer-2pm3). It is a headless chrome.

Allows the execution of a full version of the latest Chrome browser while controlling it programmatically. It can be used on servers without dedicated graphics or display.

For firefox, use selenium and do a [hacky workaround of opening the page in an iframe](https://www.browserstack.com/guide/test-chrome-extensions-in-selenium)

4. CI/CD
web extension are usually published in the browser's respective add-on store by uploding the zip file there

How to integrate with github action?

I have not yet tried it out:

For chrome extension, need [google cloud platform to access the chrome web store api](https://circleci.com/blog/continuously-deploy-a-chrome-extension/).

For firefox extension, [not yet supported](https://discourse.mozilla.org/t/deploying-an-add-on-from-a-ci-pipeline/28981).


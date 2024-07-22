# V7 Go Command Palette Chromium web extension

This is a web extension built primarily for Chromium-based browsers, to add a command palette to V7 Go.

The extension works by inserting a `svelte` component into the content of the running page (in this instance, just the V7 Go sub-domain), which communicates with Go via the [API](https://docs.go.v7labs.com). The visual styling for the component is predominantly carefully inherited from the hosted styles, to help the command palette feel as integrated as possible. All styles were reverse-engineered from existing components, as the stylesheet source wasn't available.

Accessibility was a high concern, but wasn't as actively worked on as other features. Ideally the component would have kept strict adherence to recommended practices. The decision to not use [melt-ui](https://melt-ui.com/) was in favour of zero runtime dependencies (but should be considered for a real, production build, as strict adherence to accessility guidelines is hard and takes time to get right).

## Installation

Check out repo, then the usual `pnpm install`.

The built files go into `/dist`, where [these instructions](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) can be used to load the extension into Chromium.

## Development

Uses the `vite-plugin-web-extension` to develop and build the web extension. Copy `.env.example` to `.env` and replace the `<API_KEY>` with one that can access the workspace.

> `$ pnpm dev` will start a the `vite` development server and [`web-ext` tool](https://github.com/mozilla/web-ext), loading the unpackaged extension into a new Chromium instance. The vite plugin is still fairly new, and things like hot module reloading (and even auto-refresh on watch) don't work. Manual refreshing works well enough.

## Testing

### Unit testing (Vitest)

For unit testing, this project uses `vitest`, focused on testing logic in utility functions.

> `$ pnpm test` to run the unit tests in `vitest`.

### End-to-end testing (Playwright)

To test the web extension, a real browser is needed to load and run the browser. `playwright` can load an extension into Chromium, load the V7 Go interface, and test the web extension in a real environment.

To accomplish this, real login credentials need to be added to the `.env`, specifically replacing `<EMAIL>`and `<PASSWORD>` respectively.

> `$ pnpm test:e2e` to run the tests with `playwright`.

## Further explorations and tasks

- [ ] More tests (particularly around integration and interactions)
- [ ] Configure API url and key from web extension options
- [ ] Navigate suggestions with arrow keys
- [ ] Recency suggestions
- [ ] Contextual suggestions based on Workspace and Project
- [ ] Suggestions from LLM
- [ ] Close palette by clicking outside
- [ ] Get api key from logged in user session

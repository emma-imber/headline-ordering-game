import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>headline-ordering-game</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});

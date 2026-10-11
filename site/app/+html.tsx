import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta
          name="description"
          content="The Future Innovators is a nonprofit bringing hands-on engineering and STEM workshops to students in Atlanta and around the world."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Sora:wght@600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body, #root {
                height: 100% !important;
                max-height: 100% !important;
                margin: 0 !important;
                background: #F6F1E8;
              }
              #root {
                display: flex !important;
                flex-direction: column !important;
              }
              textarea, input, button { font-family: inherit; }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

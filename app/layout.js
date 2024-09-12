import "../app/globals.css";

import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CV Editor</title>
        <meta name="description" content="Edit your CV with ease" />
      </head>
      <body>{children}</body>
    </html>
  );
}

import { Html, Head, Main, NextScript } from 'next/document';
export const metadata = {
  title: 'Mi-Chat App',
  description: 'This is the chat application with vrelatime video conferencing',
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

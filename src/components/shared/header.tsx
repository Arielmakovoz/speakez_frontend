import Head from "next/head";

export const Header: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <Head>
      <title>{`${title ? title + " | " : ""}SpeakEz`}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta charSet="UTF-8" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#FDE9CE" />

      <meta
        property="og:title"
        content={`${title ? title + " | " : ""}SpeakEz`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://speakez.vercel.app" />
      <meta
        property="og:description"
        content="SpeakEZ is an interactive speaking test with the objective of helping people with speaking disfluency (stuttering, cluttering, etc), improving overall speaking clarity, speed, vocalization, articulation as well as other factors necessary in healthy communication."
      />
      <meta
        name="description"
        content="SpeakEZ is an interactive speaking test with the objective of helping people with speaking disfluency (stuttering, cluttering, etc), improving overall speaking clarity, speed, vocalization, articulation as well as other factors necessary in healthy communication."
      />
    </Head>
  );
};

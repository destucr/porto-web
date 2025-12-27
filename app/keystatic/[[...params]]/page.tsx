import KeystaticApp from "../keystatic";

export default function Page() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.process = window.process || { env: {} }; 
                   window.process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID = "${process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID || process.env.KEYSTATIC_GITHUB_CLIENT_ID || ''}";`,
        }}
      />
      <KeystaticApp />
    </>
  );
}
export default function SEO() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#C9A24D" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:site_name" content="Asakia Hawawu Hanan" />
      <meta property="og:locale" content="en_GH" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@asakiahanan" />
      <meta name="twitter:creator" content="@asakiahanan" />
      
      {/* Additional SEO */}
      <link rel="canonical" href="https://asakiahanan.com" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </>
  )
}
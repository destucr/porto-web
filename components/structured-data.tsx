export function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Destu Cikal',
    url: 'https://destucikal.site',
    jobTitle: 'iOS & Full-stack Developer',
    sameAs: [
      'https://linkedin.com/in/destucikal',
      'https://github.com/destucr',
    ],
    description: 'iOS Developer at Bullion Ecosystem International, building native apps with UIKit and SwiftUI.'
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Destu Cikal Portfolio',
    url: 'https://destucikal.site',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([personSchema, websiteSchema]),
      }}
    />
  )
}
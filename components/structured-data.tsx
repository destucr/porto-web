export function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Destu Cikal',
    url: 'https://destucikal.site',
    jobTitle: 'iOS Developer',
    sameAs: [
      'https://linkedin.com/in/destucikal',
      'https://github.com/destucr',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Bullion Ecosystem International',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Apple Developer Academy @ BINUS',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Telkom University',
      },
    ],
    knowsAbout: ['iOS Development', 'Swift', 'UIKit', 'SwiftUI', 'Mobile App Development'],
    description: 'iOS Developer crafting native apps with Swift, UIKit, and SwiftUI. Apple Developer Academy graduate.',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Destu Cikal',
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
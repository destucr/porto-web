export const projects = [
  {
    id: "tiny-app-baby-heartbeat-listener",
    title: "Tiny App: Baby Heartbeat Listener",
    description: "iOS app to listen to a baby’s heartbeat using Live Listen and real-time audio processing.",
    image: "/images/tiny-splashscreen.webp",
    tags: ["iOS", "AudioKit", "Core Animation", "SwiftLint", "GitHub Actions"],
    githubUrl: "https://github.com/destucikal",
    appStoreUrl: "https://tinymiracle.life",
    details: "#### Audio Engineering & Visualization\nDeveloped a specialized iOS solution for real-time baby heartbeat monitoring, leveraging advanced audio processing frameworks.\n\n- **Real-time Visualization**: Implemented dynamic waveform rendering using Core Animation to provide visual feedback for audio signals.\n- **Audio Filtering**: Utilized AudioKit to refine raw audio input, specifically targeting frequencies relevant to fetal heartbeats while minimizing background noise.\n- **End-to-End Experience**: Designed and built the complete user journey, from onboarding to recording and playback flows.\n\n#### Engineering Rigor\n- **Code Quality**: Integrated SwiftLint to maintain a clean and consistent codebase.\n- **Automation**: Established CI/CD pipelines using GitHub Actions to automate linting and ensure project stability.",
    videoUrl: "",
    screenshots: [
      "/images/tiny-splashscreen.webp",
      "/images/tiny-livelisten-start.webp",
      "/images/tiny-livelisten-stop.webp",
      "/images/tiny-livelisten-playback.webp",
      "/images/tiny-livelisten-playback-played.webp",
      "/images/tiny-history-weekly.webp"
    ]
  },
  {
    id: "telly-bisindo-sign-language-learning",
    title: "Telly: BISINDO Sign Language Learning",
    description: "Indonesian Sign Language learning app using Create ML and interactive course progression.",
    image: "/images/telly-splashscreen.webp",
    tags: ["iOS", "SwiftUI", "Create ML", "SwiftData"],
    githubUrl: "https://github.com/destucikal",
    appStoreUrl: "",
    details: "#### Interactive Learning System\nBuilt a modern educational platform for Indonesian Sign Language (BISINDO), focusing on interactive engagement and progress tracking.\n\n- **ML-Powered Learning**: Integrated Create ML models to facilitate real-time sign recognition and interactive learning feedback.\n- **Gamified Progression**: Developed a structured course selection system with dynamic lock/unlock logic based on user performance and completion.\n- **Fluid UI/UX**: Crafted animated interface elements using SwiftUI's `withAnimation` modifier, ensuring a polished and responsive learning environment.\n\n#### Data Persistence\n- **Progress Tracking**: Leveraged SwiftData for lightweight, local storage of user course states and achievement history.",
    videoUrl: "/images/telly-demo.mp4",
    screenshots: [
      "/images/telly-splashscreen.webp",
      "/images/telly-onboarding-welcome.webp",
      "/images/telly-onboarding-inputname.webp",
      "/images/telly-onboarding-howtouse.webp",
      "/images/telly-onboarding-guide.webp",
      "/images/telly-home-course.webp",
      "/images/telly-home-course-modalguide.webp",
      "/images/telly-course-start.webp"
    ]
  },
  {
    id: "solari-running-companion",
    title: "Solari: Running Tracker",
    description: "Running tracker app using SwiftUI, MapKit, and Core Location for real-time metrics and route visualization.",
    image: "/images/solari-runhome.webp",
    tags: ["iOS", "SwiftUI", "MapKit", "Core Location", "SwiftData"],
    githubUrl: "https://github.com/destucikal",
    appStoreUrl: "",
    details: "#### Tracking & Spatial Data\nDeveloped a comprehensive running tracker that prioritizes accuracy and real-time user feedback.\n\n- **Precise Metrics**: Implemented Core Location to accurately calculate pace, distance, and duration during active sessions.\n- **Route Visualization**: Integrated MapKit to render real-time breadcrumb paths, allowing users to visualize their running routes as they happen.\n- **Metric Summaries**: Built intentional result screens that summarize run statistics through a clear, data-focused UI.\n\n#### Session Management\n- **Local Persistence**: Integrated SwiftData to manage and persist historical running sessions, allowing for offline access and performance trends.",
    videoUrl: "",
    screenshots: [
      "/images/solari-runhome.webp",
      "/images/solari-running.webp",
      "/images/solari-runresult.webp",
      "/images/solari-select-startpoint.webp"
    ]
  },
  {
    id: "snorkeling-booking-app",
    title: "Snorkeling Booking App",
    description: "Led cross-functional teams to improve the post-purchase experience for a consumer snorkeling app.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
    tags: ["Product Management", "UX Research", "Metric Definition"],
    githubUrl: "https://github.com/destucikal",
    appStoreUrl: "",
    details: "#### Product Strategy & Leadership\nLed a cross-functional squad to redefine the post-purchase experience, focusing on user retention and satisfaction. The goal was to bridge the gap between booking a tour and the actual physical experience on the water.\n\n- **Cross-Functional Leadership**: Managed a team of 7 stakeholders across design, engineering, and operations to deliver an initial end-to-end solution.\n- **Decision Frameworks**: Employed effort-impact matrices to evaluate potential solutions and prioritize features for the MVP, ensuring we hit our deadline for the high season.\n- **Concept Validation**: Conducted structured user interviews to test concepts and gather qualitative feedback before full implementation.\n\n#### Requirements Engineering\n- **Definition & QA**: Authored comprehensive epics, user stories, and test cases covering both positive and edge-case negative flows to ensure product quality.\n- **Iterative Feedback**: Implemented a feedback loop where tour operators could report issues directly, allowing for rapid iteration on the booking management system.\n\n#### Outcomes\nThe project resulted in a 15% increase in repeat bookings and a significant reduction in customer support tickets related to tour logistics. By providing users with clear, real-time updates after their purchase, we built trust and improved the overall brand perception.",
    videoUrl: "",
    screenshots: []
  },
  {
    id: "p2p-lending-app-fraud-prevention",
    title: "P2P Lending App: Fraud Prevention",
    description: "Developed document liveness detection using machine learning to prevent user fraud.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    tags: ["Machine Learning", "Image Classification", "Computer Vision"],
    githubUrl: "https://github.com/destucikal",
    appStoreUrl: "",
    details: "#### Computer Vision & Security\nEngineered a document liveness detection system to mitigate fraud within a P2P lending platform. This system was designed to prevent users from using photos of screens or printed copies of documents during the KYC process.\n\n- **Model Development**: Built a multiclass image classification model designed to distinguish between authentic KTP documents and fraudulent reproductions. I experimented with different architectures to find the best balance between accuracy and inference speed.\n- **Dataset Engineering**: Prepared, curated, and augmented datasets to improve model robustness across various lighting and orientation conditions. I implemented custom augmentation pipelines to simulate common camera artifacts.\n- **Evaluation & Training**: Utilized Google Colab for model training and iterative evaluation of accuracy and precision metrics. The model achieved over 95% accuracy on our validation set.\n\n#### Taxonomy Design\n- **Class Definition**: Defined a rigorous class taxonomy for liveness detection to handle nuanced fraud patterns, such as \"screen-re-photography\" vs \"paper-re-photography\".\n- **Integration Strategy**: Worked closely with the mobile engineering team to design an efficient workflow for capturing high-quality document images while providing real-time feedback to the user.\n\n#### Security Impact\nBy automating the liveness check, we reduced the manual verification workload by 40% and significantly lowered the rate of fraudulent account creations. This contributed to a safer lending ecosystem and increased investor confidence in the platform.",
    videoUrl: "",
    screenshots: []
  },
]

export const blogPosts = [
  {
    slug: "the-architecture-of-trust",
    title: "The Architecture of Trust: Why Your UIKit Brain is Fighting SwiftUI",
    excerpt: "Moving from UIKit to SwiftUI isn't just a syntax change; it's a fundamental shift from being a master puppeteer to becoming a scriptwriter. Here is how to stop fighting the system and start building with intent.",
    date: "2025-01-08",
    content: "Building an app in UIKit always felt like being a master puppeteer. You had your strings (the delegates), your stage (the window), and your puppets (the views). If a puppet needed to raise its arm, you manually sent a command to pull that specific string at exactly the right time. It was precise, it was explicit, and for any nontrivial app, it was utterly exhausting. When I first moved to SwiftUI, I tried to keep my hands on those strings. I kept looking for the `updateUI()` method or trying to find where the \"real\" view lived so I could poke it with a new value. This is the first and most painful hurdle for any mid-level developer: realizing that in SwiftUI, you aren't the puppeteer anymore; you are the scriptwriter. You describe *what* should happen, and you must learn to trust the system to move the puppets.\n\nThe struggle usually begins with layout. In UIKit, we lived and died by Auto Layout constraints. We told the system exactly how many points separated a label from an image, often creating a fragile web of math that would break the moment a dynamic type size changed. SwiftUI replaces this rigid control with a \"negotiation\". A parent view proposes a size, the child view chooses its own size based on its content, and the parent then places it. This can feel like chaos to a developer used to absolute positioning. From a UI/UX design perspective, however, this is a massive win. It moves us away from \"pixel perfection\" toward \"intent perfection\". When you use a `VStack`, you aren't just stacking items; you are declaring that these elements belong together in a vertical narrative. The system handles the math of whether that’s on an iPhone 16 Pro Max or an iPad in split-view.\n\n```swift\n// The \"UIKit\" way of thinking (even in SwiftUI) - Fragile and over-constrained\nText(\"Hello World\")\n    .frame(width: 200, height: 50) // Hardcoded control that breaks on small devices\n    .border(Color.red)\n\n// The \"SwiftUI\" way of thinking - Flexible and intent-based\nText(\"Hello World\")\n    .padding() // Let the content breathe based on system standards\n    .frame(maxWidth: .infinity) // Negotiate for all available horizontal space\n    .background(RoundedRectangle(cornerRadius: 12).fill(Color.blue.opacity(0.1)))\n```\n\nThe second, deeper struggle is state management. In UIKit, the \"Source of Truth\" was often fragmented. You had data in a model, a copy of that data in a text field, and maybe another copy in a view controller property. Syncing them required a complex web of delegates and notifications. If you missed even one update, the user saw a \"wrong\" screen—a classic bug that kills user trust. From a product manager's standpoint, these \"out-of-sync\" issues are the silent killers of adoption metrics. They create a sense of unreliability that users can't always name but can definitely feel. SwiftUI solves this by forcing a Single Source of Truth through property wrappers like `@State` and `@Binding`. The UI is no longer a separate entity that needs to be updated; it is simply a function of the state. If the data exists, the UI reflects it. If the data changes, the UI re-renders.\n\n```javascript\n// A clean, reactive approach to a simple toggle\nstruct ToggleGallery: View {\n    @State private var isExpanded: Bool = false // The ONLY source of truth\n\n    var body: {\n        VStack(spacing: 20) {\n            Button(isExpanded ? \"Hide Details\" : \"Show Details\") {\n                // We change the DATA, and the UI reacts\n                withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) {\n                    isExpanded.toggle()\n                }\n            }\n            \n            if isExpanded {\n                // This view only exists in the hierarchy if the state says so\n                ProjectInfoView()\n                    .transition(.move(edge: .bottom).combined(with: .opacity))\n            }\n        }\n    }\n}\n```\n\nThis shift leads to what I call \"The Architecture of Intent\". When we stop worrying about *how* to update a label's text and start focusing on *what* the state of the app is, we become better product builders. We start thinking about the user's journey as a series of valid states rather than a series of transitions. For a mid-level developer, the most actionable advice I can give is this: stop trying to \"force\" SwiftUI to behave like UIKit. Don't use `ObservableObject` as a bucket for all your old delegate logic. Instead, embrace the safety of **Swift 6** and the clarity of the new **@Observable** macro. Treat your code as a craft where the goal is to make the invisible foundations so solid that the user never has to think about the technology—they only feel the intent. When you build with trust in the system, you aren't just writing shorter code; you are building a more resilient, human-centered product.",
  },
]
export const projects = [
  {
    id: "tiny-app-baby-heartbeat-listener",
    title: "Tiny App: Baby Heartbeat Listener",
    description: "iOS app to listen to a baby’s heartbeat using Live Listen and real-time audio processing.",
    image: "/images/tiny-splashscreen.png",
    tags: ["iOS", "AudioKit", "Core Animation", "SwiftLint", "GitHub Actions"],
    githubUrl: "https://github.com/destucikal",
    appStoreUrl: "https://tinymiracle.life",
    details: "#### Audio Engineering & Visualization\nDeveloped a specialized iOS solution for real-time baby heartbeat monitoring, leveraging advanced audio processing frameworks.\n\n- **Real-time Visualization**: Implemented dynamic waveform rendering using Core Animation to provide visual feedback for audio signals.\n- **Audio Filtering**: Utilized AudioKit to refine raw audio input, specifically targeting frequencies relevant to fetal heartbeats while minimizing background noise.\n- **End-to-End Experience**: Designed and built the complete user journey, from onboarding to recording and playback flows.\n\n#### Engineering Rigor\n- **Code Quality**: Integrated SwiftLint to maintain a clean and consistent codebase.\n- **Automation**: Established CI/CD pipelines using GitHub Actions to automate linting and ensure project stability.",
    videoUrl: "/images/tiny-demo.mp4",
    screenshots: [
      "/images/tiny-splashscreen.png",
      "/images/tiny-livelisten-start.png",
      "/images/tiny-livelisten-stop.png",
      "/images/tiny-livelisten-playback.png",
      "/images/tiny-livelisten-playback-played.png",
      "/images/tiny-history-weekly.png"
    ]
  },
  {
    id: "telly-bisindo-sign-language-learning",
    title: "Telly: BISINDO Sign Language Learning",
    description: "Indonesian Sign Language learning app using Create ML and interactive course progression.",
    image: "/images/telly-splashscreen.png",
    tags: ["iOS", "SwiftUI", "Create ML", "SwiftData"],
    githubUrl: "https://github.com/destucikal",
    appStoreUrl: "",
    details: "#### Interactive Learning System\nBuilt a modern educational platform for Indonesian Sign Language (BISINDO), focusing on interactive engagement and progress tracking.\n\n- **ML-Powered Learning**: Integrated Create ML models to facilitate real-time sign recognition and interactive learning feedback.\n- **Gamified Progression**: Developed a structured course selection system with dynamic lock/unlock logic based on user performance and completion.\n- **Fluid UI/UX**: Crafted animated interface elements using SwiftUI's `withAnimation` modifier, ensuring a polished and responsive learning environment.\n\n#### Data Persistence\n- **Progress Tracking**: Leveraged SwiftData for lightweight, local storage of user course states and achievement history.",
    videoUrl: "/images/telly-demo.mov",
    screenshots: [
      "/images/telly-splashscreen.png",
      "/images/telly-onboarding-welcome.png",
      "/images/telly-onboarding-inputname.png",
      "/images/telly-onboarding-howtouse.png",
      "/images/telly-onboarding-guide.png",
      "/images/telly-home-course.png",
      "/images/telly-home-course-modalguide.png",
      "/images/telly-course-start.png"
    ]
  },
  {
    id: "solari-running-companion",
    title: "Solari: Running Tracker",
    description: "Running tracker app using SwiftUI, MapKit, and Core Location for real-time metrics and route visualization.",
    image: "/images/solari-runhome.png",
    tags: ["iOS", "SwiftUI", "MapKit", "Core Location", "SwiftData"],
    githubUrl: "https://github.com/destucikal",
    appStoreUrl: "",
    details: "#### Tracking & Spatial Data\nDeveloped a comprehensive running tracker that prioritizes accuracy and real-time user feedback.\n\n- **Precise Metrics**: Implemented Core Location to accurately calculate pace, distance, and duration during active sessions.\n- **Route Visualization**: Integrated MapKit to render real-time breadcrumb paths, allowing users to visualize their running routes as they happen.\n- **Metric Summaries**: Built intentional result screens that summarize run statistics through a clear, data-focused UI.\n\n#### Session Management\n- **Local Persistence**: Integrated SwiftData to manage and persist historical running sessions, allowing for offline access and performance trends.",
    videoUrl: "",
    screenshots: [
      "/images/solari-runhome.png",
      "/images/solari-running.png",
      "/images/solari-runresult.png",
      "/images/solari-select-startpoint.png"
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
    slug: "mastering-swiftui-layouts",
    title: "Mastering SwiftUI Layouts: ZStack, VStack, and HStack",
    excerpt: "A deep dive into the layout system of SwiftUI and how to build complex interfaces with simple stacks.",
    date: "2024-03-15",
    content: "SwiftUI layouts are declarative and powerful. By combining ZStack, VStack, and HStack, you can create complex and responsive user interfaces with minimal code. Unlike UIKit's Auto Layout, SwiftUI's layout system is intuitive and relies on the relationship between parent and child views.\n\n### The Foundation: Three Basic Stacks\n\nAt the heart of SwiftUI layout are three containers:\n\n1. **VStack (Vertical Stack)**: Arranges its children in a vertical line. It's the most common container for building forms, lists, and general page structures.\n2. **HStack (Horizontal Stack)**: Arranges its children in a horizontal line. Perfect for toolbars, side-by-side buttons, or label-icon combinations.\n3. **ZStack (Depth Stack)**: Overlays its children on top of each other. This is essential for creating backgrounds, badges, or complex custom UI components that require layering.\n\n### How Layout Happens in SwiftUI\n\nThe SwiftUI layout process follows three simple steps:\n1. **The parent proposes a size** for the child.\n2. **The child chooses its own size**. The child is responsible for determining how much space it needs based on its content.\n3. **The parent places the child** in its coordinate space.\n\n### Building Complexity: Nesting Stacks\n\nThe real power of SwiftUI comes from nesting these stacks. By combining a `VStack` inside an `HStack`, or adding a `ZStack` as a background to a `VStack`, you can build almost any interface.\n\n### Best Practices for Sophisticated Layouts\n\n- **Use Spacers**: `Spacer()` views are invisible views that expand to fill all available space. Use them to push views to the edges of a stack.\n- **Alignment Guides**: Go beyond simple `.leading` or `.trailing` by using custom alignment guides to align views across different stacks.\n- **Fixed vs. Flexible Sizes**: Understand when to use `.fixedSize()` to prevent a view from truncating or expanding beyond its ideal size.\n- **Layout Priorities**: Use `.layoutPriority()` to tell SwiftUI which views should have first pick of the available space when space is tight.\n\nBy mastering these fundamental concepts, you'll be able to build beautiful, responsive, and maintainable iOS interfaces with ease.",
    tags: ["SwiftUI", "Tutorial"],
  },
  {
    slug: "getting-started-with-ios-development",
    title: "Getting Started with iOS Development in 2025",
    excerpt: "The landscape of iOS development is evolving. Here's what you need to focus on this year.",
    date: "2025-12-25",
    content: "The landscape of iOS development is evolving rapidly. As we move into 2025, the barrier to entry has changed, and the tools at our disposal are more powerful than ever. Whether you're a beginner or looking to refresh your skills, here's what you need to focus on this year.\n\n### 1. Master Swift 6 and Structured Concurrency\n\nSwift 6 is the current standard, and its focus on safety—especially data race safety—is paramount.\n- **Async/Await**: Move beyond completion handlers. Understand how to use structured concurrency to write clean, readable asynchronous code.\n- **Actors**: Learn how actors protect mutable state from data races in a multi-threaded environment.\n- **Safe Data Contention**: Understand how the compiler now helps you avoid common concurrency bugs before they even reach production.\n\n### 2. Deep Dive into Modern SwiftUI\n\nSwiftUI is no longer the \"new\" framework; it is the *standard* framework.\n- **SwiftData**: Replace Core Data with SwiftData for your persistence needs. It's designed to work seamlessly with SwiftUI's declarative syntax.\n- **NavigationStack**: Master the modern navigation API to handle complex deep-linking and state-driven navigation.\n- **Animations**: iOS users expect fluid interfaces. Learn how to use phase-based and keyframe-based animations to make your apps feel alive.\n\n### 3. Integrate Apple Intelligence (AI)\n\nWith the release of Apple Intelligence, users expect smarter apps.\n- **Core ML**: Learn how to integrate on-device machine learning models for tasks like image classification, text analysis, and sound recognition.\n- **App Intents**: Make your app's features available to Siri and the wider system through App Intents.\n- **Personalization**: Use on-device data to provide tailored experiences without compromising user privacy.\n\n### 4. Engineering Rigor: Testing and Automation\n\nBuilding an app is one thing; maintaining it is another.\n- **Unit and UI Testing**: Write meaningful tests using the latest Swift Testing framework.\n- **CI/CD**: Automate your builds and deployments using tools like GitHub Actions or Xcode Cloud.\n- **SwiftLint**: Maintain a consistent coding style across your team or personal projects.\n\n### Conclusion\n\nThe journey into iOS development in 2025 is about more than just writing code; it's about building intentional, safe, and intelligent experiences. Focus on the core fundamentals of Swift and SwiftUI, embrace the new AI capabilities, and never stop learning.",
    tags: ["Career", "Swift", "iOS"],
  },
]
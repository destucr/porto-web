export const projects = [
  {
    id: "tiny-app-baby-heartbeat-listener",
    slug: "tiny-app-baby-heartbeat-listener",
    title: "Tiny App: Baby Heartbeat Listener",
    description: "An iOS app using AirPods and AVFoundation to create an intimate bonding experience for expecting parents.",
    image: "/images/tiny-thumbnail.webp",
    tags: ["iOS", "AudioKit", "AVFoundation", "Accelerate", "SwiftUI", "Firebase"],
    githubUrl: "https://github.com/destucr",
    appStoreUrl: "https://tinymiracle.life",
    details: `#### What it does
Tiny is an iOS app designed to create an intimate bonding experience for expecting parents. Using your iPhone"""s microphone and AirPods, parents can listen to sounds from the womb while watching a beautiful, reactive "Orb" visualization that responds to audio input. The app includes an interactive pregnancy timeline and the ability to record and privately share these special moments with family through secure, code-protected rooms.

Note: This app is for emotional bonding and entertainment purposes only, not medical monitoring. iPhones cannot reliably detect fetal heartbeats—always consult your healthcare provider for medical concerns.

#### How I built it
Built the app in SwiftUI with a focus on creating a tactile, high-end experience that makes parents feel connected to their baby.

 - Reactive UI Architecture: Developed a custom SwiftUI Canvas-based visualization that maps real-time audio amplitude to organic shape animations, providing immediate visual feedback for auditory input.

 - Custom DSP Chain: Implemented a specialized audio processing pipeline using AVFoundation and AudioKit, featuring a Parametric EQ and High-Shelf Filter to isolate 200Hz rhythmic patterns while maintaining acoustic transparency.

 - FFT Signal Processing: Engineered a real-time audio analyzer using the Accelerate framework for high-performance Fast Fourier Transform (FFT) analysis, implementing a dynamic peak-detection buffer to identify audio patterns with sub-millisecond latency.

 - AirPods Integration: Implemented seamless audio routing for AirPods using AVAudioSession, ensuring low-latency monitoring while simultaneously recording high-quality audio to Firebase Storage for safekeeping.

#### Challenges
The biggest challenge was creating an immersive audio experience that felt authentic and emotionally resonant.

 - Solution: Instead of using harsh noise gates that create unnatural silence, I implemented a dynamic peak buffer that adapts to the ambient noise floor. This preserves the natural "whooshing" and environmental sounds that make the experience feel real, while still identifying rhythmic patterns to drive the Orb"""s visualization. The result is an interface that feels alive and responsive without feeling clinical or artificial.`,
    videoUrl: "/images/tiny-demo.mp4",
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
    slug: "telly-bisindo-sign-language-learning",
    title: "Telly: BISINDO Sign Language Learning",
    description: "A native iOS app teaching Indonesian Sign Language (BISINDO) through real-time gesture recognition.",
    image: "/images/telly-thumbnail.webp",
    tags: ["iOS", "SwiftUI", "Create ML", "SwiftData"],
    githubUrl: "https://github.com/destucr",
    appStoreUrl: "",
    details: `#### What it does
Users learn BISINDO signs by watching demonstrations, then practicing with their device"""s camera. The app uses on-device machine learning to verify their hand shapes and provide instant feedback.

#### How I built it
- **On-Device Vision**: Trained Create ML models to recognize 50+ BISINDO signs, optimized for low-latency execution directly on the device.
- **Reactive SwiftUI UI**: Built an interactive course system with real-time camera overlays providing instant gesture feedback.
- **Local Data Persistence**: Used SwiftData to manage user progress, lesson states, and achievement history without server dependency.

#### Challenges
The hardest part was getting enough training data—BISINDO resources are scarce compared to ASL. I had to film and annotate my own reference videos, then augment the dataset with rotations and lighting variations to make the model robust to different environments.

Balancing model accuracy with file size was tricky since the entire model ships with the app.`,
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
    slug: "solari-running-companion",
    title: "Solari: Running Tracker",
    description: "Running tracker app using SwiftUI, MapKit, and Core Location for real-time metrics and route visualization.",
    image: "/images/solari-thumbnail.webp",
    tags: ["iOS", "SwiftUI", "MapKit", "Core Location", "SwiftData"],
    githubUrl: "https://github.com/destucr",
    appStoreUrl: "",
    details: `#### Tracking & Spatial Data
Developed a comprehensive running tracker that prioritizes accuracy and real-time user feedback.

- Precise Metrics: Implemented Core Location to accurately calculate pace, distance, and duration during active sessions.
- Route Visualization: Integrated MapKit to render real-time breadcrumb paths, allowing users to visualize their running routes as they happen.
- Metric Summaries: Built intentional result screens that summarize run statistics through a clear, data-focused UI.

#### Session Management
- Local Persistence: Integrated SwiftData to manage and persist historical running sessions, allowing for offline access and performance trends.`,
    videoUrl: "",
    screenshots: [
      "/images/solari-runhome.webp",
      "/images/solari-running.webp",
      "/images/solari-runresult.webp",
      "/images/solari-select-startpoint.webp"
    ]
  },
  {
    id: "go-line",
    slug: "go-line",
    title: "Go Line: Transit Puzzle Simulator",
    description: "A zen-inspired transit management game where players draw railway lines, connect stations, and keep the city moving smoothly.",
    image: "/images/goline-thumbnail.webp",
    tags: ["Swift", "SpriteKit", "SwiftUI", "RxSwift", "iOS", "GLSL"],
    githubUrl: "https://github.com/destucr/go-line",
    appStoreUrl: "",
    demoUrl: "",
    details: `#### What it does
Go Line is a strategic puzzle game challenging you to keep a growing city's transit flowing. Draw lines between stations, transport passengers to their unique destinations, and prevent network tension from spiraling out of control. Every shift brings new upgrades, color-coded lines, and ever more intricate networks to manage.

#### How I built it
- **SpriteKit Engine**: Uses SpriteKit for smooth, performant 2D rendering—curvy rails, interactive maps, and sleek game pieces.
- **Swifty Modern UI**: Combines SwiftUI for menus and overlays with SpriteKit gameplay for ultra-responsive user experience.
- **Reactive State Management**: All game state and interactions are managed with RxSwift, ensuring tight syncing between logic and UI.
- **Minimalist Visuals & Shaders**: Custom industrial UI with subtle metallic textures and handmade-style dashed lines, realized via GLSL shaders.
- **Upgrades and Day Cycles**: Implements a persistent upgrade shop and progressive day cycles, letting players improve their network and chase efficiency.

#### Challenges
The game's biggest challenge was creating an interface responsive enough for rapid touch-drag line drawing, and scalable enough to visualize a complex, multi-line network without overwhelming users. Fine-tuning the tension system for clear but forgiving fail states—and ensuring the game remained relaxing, not stressful—required numerous design iterations.`,
    videoUrl: "/images/goline-demo.mp4",
    screenshots: [
      "/images/goline-homescreen.webp",
      "/images/goline-upgrade-shop.webp",
      "/images/goline-gameplay-full.webp"
    ]
  },
  {
    id: "gtfs-web",
    slug: "gtfs-web",
    title: "GTFS-Web: High-Performance Transit Management Ecosystem",
    description: "A comprehensive GTFS management platform featuring a multi-interface architecture, custom GIS route engine, and real-time geospatial data processing.",
    image: "/images/gtfs-web/dashboard.webp",
    tags: ["Go", "React", "TypeScript", "PostgreSQL", "Leaflet", "Docker"],
    githubUrl: "https://github.com/destucr/GTFS-Web",
    appStoreUrl: "",
    demoUrl: "/gtfs-cms/index.html",
    details: `#### Transit Management System
Developed a robust ecosystem for managing General Transit Feed Specification (GTFS) data, optimized for high-density information display and intuitive operator workflows.

- Map-First Interface: Architected a UI where the map is always visible. Instead of full-page menus, I used draggable floating panels for editing data, so users never lose their geographic context while working.
- Admin Dashboard & Public App: Built a two-part system: a high-capacity management portal for transit operators to handle thousands of rows of data, and a separate, lightweight viewer designed for fast performance on commuter's phones.
- Automated Route Mapping: Developed a custom engine that automatically "snaps" bus stops to the nearest roads. It uses real-time pathfinding to draw routes instantly, replacing the need for manual line drawing.

#### How I built it
- **Full-Stack Transit Engine**: Built a Go backend with PostgreSQL using GORM to handle complex relational integrity across agencies, routes, and schedules.
- **Multi-Interface Architecture**: Created specialized React interfaces—a high-density administrative CMS for operators and a performant Leaflet-based map viewer for public commuters.
- **GIS Route Engine**: Built an interactive route editor allowing real-time map-based stop placement, heuristic pathfinding, and automated trip pattern validation.
- **Containerized Orchestration**: Dockerized the entire ecosystem for consistent deployment and scaling.

#### Challenges
The hardest part was designing the CMS interface to display high-density transit data without overwhelming operators—GTFS files can have thousands of interconnected records, and a single mistake cascades through the entire system.`,
    videoUrl: "",
    screenshots: [
      "/images/gtfs-web/route-studio-path.webp",
      "/images/gtfs-web/stop-and-routes.webp",
      "/images/gtfs-web/trip-mapping.webp",
      "/images/gtfs-web/web-viewer.webp",
      "/images/gtfs-web/agencies.webp"
    ]
  },
  {
    id: "snorkeling-booking-app",
    slug: "snorkeling-booking-app",
    title: "Snorkeling Booking App",
    description: "Led cross-functional teams to improve the post-purchase experience for a consumer snorkeling app.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
    tags: ["Product Management", "UX Research", "Metric Definition"],
    githubUrl: "https://github.com/destucr",
    appStoreUrl: "",
    articleOnly: true,
    details: "#### Product Strategy & Leadership\nLed a cross-functional squad to redefine the post-purchase experience, focusing on user retention and satisfaction. The goal was to bridge the gap between booking a tour and the actual physical experience on the water.\n\n- Cross-Functional Leadership: Managed a team of 7 stakeholders across design, engineering, and operations to deliver an initial end-to-end solution.\n- Decision Frameworks: Employed effort-impact matrices to evaluate potential solutions and prioritize features for the MVP, ensuring we hit our deadline for the high season.\n- Concept Validation: Conducted structured user interviews to test concepts and gather qualitative feedback before full implementation.\n\n#### Requirements Engineering\n- Definition & QA: Authored comprehensive epics, user stories, and test cases covering both positive and edge-case negative flows to ensure product quality.\n- Iterative Feedback: Implemented a feedback loop where tour operators could report issues directly, allowing for rapid iteration on the booking management system.\n\n#### Outcomes\nThe project resulted in a 15% increase in repeat bookings and a significant reduction in customer support tickets related to tour logistics. By providing users with clear, real-time updates after their purchase, we built trust and improved the overall brand perception.",
    videoUrl: "",
    screenshots: []
  },
  {
    id: "p2p-lending-app-fraud-prevention",
    slug: "p2p-lending-app-fraud-prevention",
    title: "P2P Lending App: Fraud Prevention",
    description: "Developed document liveness detection using machine learning to prevent user fraud.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    tags: ["Machine Learning", "Image Classification", "Computer Vision"],
    githubUrl: "https://github.com/destucr",
    appStoreUrl: "",
    articleOnly: true,
    details: "#### Computer Vision & Security\nEngineered a document liveness detection system to mitigate fraud within a P2P lending platform. This system was designed to prevent users from using photos of screens or printed copies of documents during the KYC process.\n\n- Model Development: Built a multiclass image classification model designed to distinguish between authentic KTP documents and fraudulent reproductions. I experimented with different architectures to find the best balance between accuracy and inference speed.\n- Dataset Engineering: Prepared, curated, and augmented datasets to improve model robustness across various lighting and orientation conditions. I implemented custom augmentation pipelines to simulate common camera artifacts.\n- Evaluation & Training: Utilized Google Colab for model training and iterative evaluation of accuracy and precision metrics. The model achieved over 95% accuracy on our validation set.\n\n#### Taxonomy Design\n- Class Definition: Defined a rigorous class taxonomy for liveness detection to handle nuanced fraud patterns, such as \"screen-re-photography\" vs \"paper-re-photography\".\n- Integration Strategy: Worked closely with the mobile engineering team to design an efficient workflow for capturing high-quality document images while providing real-time feedback to the user.\n- Security Impact\nBy automating the liveness check, we reduced the manual verification workload by 40% and significantly lowered the rate of fraudulent account creations. This contributed to a safer lending ecosystem and increased investor confidence in the platform.",
    videoUrl: "",
    screenshots: []
  },
]

export const blogPosts = [
  {
    slug: "the-manual-transmission",
    title: "The Manual Transmission: Why Your SwiftUI Brain is Fighting UIKit",
    excerpt: "Moving from SwiftUI back to UIKit feels like being told you now have to build the stage and move every puppet yourself. Here is how to survive the transition from declarative to imperative thinking.",
    date: "2025-01-08",
    tags: ["Engineering", "Philosophy", "iOS"],
    content: `There is a specific kind of silence that happens when an iOS developer, raised on the magic of SwiftUI, opens a legacy UIKit file for the first time. It’s the sound of a "scriptwriter" being told they now have to build the entire stage, sew the costumes, and manually push every puppet across the floor. In SwiftUI, we got used to saying "make a list," and it appeared. In UIKit, you have to explain exactly how to register a cell, how to calculate its height, and what happens to the memory when that cell disappears. Moving "backward" from SwiftUI to UIKit isn't just a change in tools; it’s a transition from trusting the system to taking total, exhaustive responsibility for every single frame. 

The first thing that hits you is the loss of the "Single Source of Truth." In SwiftUI, if the data changes, the UI reflects it. It’s a law of nature. But in UIKit, the data and the UI are two strangers living in different houses who only talk if you manually carry a message between them. From a product manager’s perspective, this is where the danger lies. UIKit apps are prone to "ghost states"—where the data says the user is logged in, but the button still says "Sign In" because someone forgot to call \`button.setTitle()\` in one specific edge case. To survive this, you have to stop thinking of your UI as a function of state and start thinking of it as a series of manual events that you must orchestrate perfectly. 

\`\`\`swift
// SwiftUI: The UI simply IS.
Toggle("Enable Notifications", isOn: $isEnabled)

// UIKit: You must manually sync and respond.
let toggle = UISwitch()
toggle.addTarget(self, action: #selector(handleToggle), for: .valueChanged)

@objc func handleToggle(_ sender: UISwitch) {
    // You are responsible for keeping the model and UI in sync.
    self.userSettings.notificationsEnabled = sender.isOn
    updateOtherPartsOfUI(isEnabled: sender.isOn) // Manually cascading changes
}
\`\`\`

Then comes the layout. If SwiftUI is a "negotiation" where views find their own space, UIKit is a "dictatorship" of math. Auto Layout doesn't care about your design "intent"; it only cares about whether your constraints are mathematically satisfiable. From a UI/UX designer’s point of view, UIKit allows for a level of pixel-level precision that SwiftUI sometimes struggles with, but it comes at the cost of extreme rigidity. You aren't just saying "put this in the center"; you are writing a system of linear equations. The "Stranger Test" here is brutal: a stranger (or the compiler) looks at your constraints and asks, "What happens if the text gets longer?" In SwiftUI, the box grows. In UIKit, the box clips, or worse, the entire layout "breaks" and throws a wall of red text into the console. 

\`\`\`swift
// The SwiftUI "Negotiation"
VStack {
    Text("Hello")
    Text("World")
}

// The UIKit "Dictatorship" (Manual Constraints)
NSLayoutConstraint.activate([
    label.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
    label.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
    label.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16)
    // If you forget one, the label disappears. If you add a conflicting one, it breaks.
])
\`\`\`

The "Architecture of Intent" changes here, too. To be a good mid-level developer in UIKit, you have to embrace the Delegate Pattern. It is the oldest conversation in iOS development. It feels like a chore—creating protocols, setting \`weak var delegate\`, and implementing methods—but it is how you keep your app from becoming a tangled mess. My actionable advice for anyone making this move: don't fight the lifecycle. In SwiftUI, we barely care about *when* a view appears. In UIKit, the \`viewDidLoad\` vs. \`viewWillAppear\` distinction is the heartbeat of your performance. If you do heavy work in the wrong method, the app feels sluggish. 

The transition is hard because it forces you to be a craftsman of the "invisible." You have to care about the memory cycles, the layout passes, and the manual synchronization of every label. But there is a hidden reward: once you master UIKit, you finally understand what SwiftUI is actually doing under the hood. You realize that the "magic" isn"""t magic at all—it’s just a very good puppeteer hiding the strings. Building in UIKit makes you more precise, more defensive, and ultimately, more intentional about every single frame you put in front of a user.`,
  },
]

export const books = [
  {
    title: "UIKit Apprentice (Second Edition): Beginning IOS Development with Swift",
    author: "Fahim Farook and Matthijs Hollemans",
    coverImage: "https://assets.alexandria.kodeco.com/books/26138d8a757dd1dc09df6301bc4a47f0a1f7f785a725ae72574c6862127a2201/images/e4412cdfc9c3976de1a172ec826bcd81/original.png",
    amazonUrl: "https://us.amazon.com/UIKit-Apprentice-Second-Beginning-Development/dp/1950325474",
  },
  {
    title: "Continuous Discovery Habits: Discover Products that Create Customer Value and Business Value",
    author: "Teresa Torres",
    coverImage: "https://m.media-amazon.com/images/I/611QkQ+CXES._SL1500_.jpg",
    amazonUrl: "https://www.amazon.com/Continuous-Discovery-Habits-Discover-Products/dp/1736633309",
  },
]

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
    slug: "the-manual-transmission",
    title: "The Manual Transmission: Why Your SwiftUI Brain is Fighting UIKit",
    excerpt: "Moving from SwiftUI back to UIKit feels like being told you now have to build the stage and move every puppet yourself. Here is how to survive the transition from declarative to imperative thinking.",
    date: "2025-01-08",
    content: `There is a specific kind of silence that happens when an iOS developer, raised on the magic of SwiftUI, opens a legacy UIKit file for the first time. It’s the sound of a \"scriptwriter\" being told they now have to build the entire stage, sew the costumes, and manually push every puppet across the floor. In SwiftUI, we got used to saying \"make a list,\" and it appeared. In UIKit, you have to explain exactly how to register a cell, how to calculate its height, and what happens to the memory when that cell disappears. Moving \"backward\" from SwiftUI to UIKit isn't just a change in tools; it’s a transition from trusting the system to taking total, exhaustive responsibility for every single frame. 

The first thing that hits you is the loss of the \"Single Source of Truth.\" In SwiftUI, if the data changes, the UI reflects it. It’s a law of nature. But in UIKit, the data and the UI are two strangers living in different houses who only talk if you manually carry a message between them. From a product manager’s perspective, this is where the danger lies. UIKit apps are prone to \"ghost states\"—where the data says the user is logged in, but the button still says \"Sign In\" because someone forgot to call 	exttt{button.setTitle()} in one specific edge case. To survive this, you have to stop thinking of your UI as a function of state and start thinking of it as a series of manual events that you must orchestrate perfectly.

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

Then comes the layout. If SwiftUI is a \"negotiation\" where views find their own space, UIKit is a \"dictatorship\" of math. Auto Layout doesn't care about your design \"intent\"; it only cares about whether your constraints are mathematically satisfiable. From a UI/UX designer’s point of view, UIKit allows for a level of pixel-level precision that SwiftUI sometimes struggles with, but it comes at the cost of extreme rigidity. You aren't just saying \"put this in the center\"; you are writing a system of linear equations. The \"Stranger Test\" here is brutal: a stranger (or the compiler) looks at your constraints and asks, \"What happens if the text gets longer?\" In SwiftUI, the box grows. In UIKit, the box clips, or worse, the entire layout \"breaks\" and throws a wall of red text into the console.

\`\`\`swift
// The SwiftUI \"Negotiation\"
VStack {
    Text("Hello")
    Text("World")
}

// The UIKit \"Dictatorship\" (Manual Constraints)
NSLayoutConstraint.activate([
    label.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
    label.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
    label.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16)
    // If you forget one, the label disappears. If you add a conflicting one, it breaks.
])
\`\`\`

The \"Architecture of Intent\" changes here, too. To be a good mid-level developer in UIKit, you have to embrace the **Delegate Pattern**. It is the oldest conversation in iOS development. It feels like a chore—creating protocols, setting 	exttt{weak var delegate}, and implementing methods—but it is how you keep your app from becoming a tangled mess. My actionable advice for anyone making this move: don't fight the lifecycle. In SwiftUI, we barely care about *when* a view appears. In UIKit, the 	exttt{viewDidLoad} vs. 	exttt{viewWillAppear} distinction is the heartbeat of your performance. If you do heavy work in the wrong method, the app feels sluggish. 

The transition is hard because it forces you to be a craftsman of the \"invisible.\" You have to care about the memory cycles, the layout passes, and the manual synchronization of every label. But there is a hidden reward: once you master UIKit, you finally understand what SwiftUI is actually doing under the hood. You realize that the \"magic\" isn't magic at all—it’s just a very good puppeteer hiding the strings. Building in UIKit makes you more precise, more defensive, and ultimately, more intentional about every single frame you put in front of a user.`,
  },
]
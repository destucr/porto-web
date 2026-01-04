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
    videoUrl: "",
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
    videoUrl: "/images/telly-demo.mp4",
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
    slug: "building-is-the-stricter-test",
    title: "Building is the Stricter Test",
    excerpt: "You don't truly understand an app idea until you've tried to build it. Coding isn't just expressing a plan; it's the process of discovering that your plan was incomplete.",
    date: "2025-01-05",
    content: "Building an app, even for a problem you know well, usually shows you that you didn't know the problem as well as you thought. Putting ideas into code is a severe test. The first architecture you choose is usually wrong; you have to rewrite functions and refactor modules over and over to get them exactly right. And your product logic won't just be imprecise, but incomplete too. Half the features that end up in a shipping app will be ones you thought of while you were debugging it. Indeed, that's why I build them.\n\nOnce you release an app, the convention is that whatever you shipped was what you had in mind before you started. These were your features, and now you've implemented them. But you know this isn't true. You know that putting your ideas into code changed them. And not just the features you shipped. Presumably there were others that turned out to be too broken to fix, and those you discarded instead.\n\nIt's not just having to commit your logic to specific lines of code that makes engineering so exacting. The real test is using what you've built. You have to pretend to be a neutral user who knows nothing of what's in your head, only what's on the screen. When he taps this button, does the result seem correct? Does the flow feel complete? If you make an effort, you can use your app as if you were a complete stranger, and when you do, the news is usually bad. It takes me many cycles before I can get an interface past \"the stranger.\"\n\n### The Illusion of \"Up here\"\n\nThere may exist people whose product visions are so perfectly formed that they just flow straight into a production-ready binary. But I've never known anyone who could do this. Indeed, this is a trope in startups: the founder who claims to have a \"perfect plan\" for a difficult market, and who when questioned further, taps his head and says \"It's all up here.\" Everyone who has ever shipped code knows what that means. At best, the plan is vague. Very likely there's some undiscovered edge case that invalidates the core loop completely.\n\nYou can know a great deal about a user's problem without building a solution for it. Can you ever know so much that you wouldn't learn more from trying to implement what you know? I don't think so. I've built apps for two subjects I know well—audio processing and productivity—and in both cases, I learned a lot from building them. In both cases, there were UX hurdles I didn't consciously realize until I had to solve them in Swift. A great deal of product knowledge is unconscious, and experts have if anything a higher proportion of unconscious knowledge than beginners.\n\n### The Hill of Implementation\n\nPutting ideas into code doesn't have to mean building a full app, of course. You can also do it the old way, by sketching on paper or talking. But in my experience, coding is the stricter test. You have to commit to a single, optimal sequence of logic. Less can go unsaid when you don't have a human to interpret your \"you know what I mean.\" The compiler is the ultimate rational stranger. It doesn't care about your intentions; it only cares about what you wrote.\n\nThe reason I've spent so long establishing this rather obvious point is that it leads to another that many people will find shocking. If building your ideas always makes them more precise and more complete, then no one who hasn't built a solution has a fully formed idea of the problem. And someone who never builds has no fully formed ideas about anything nontrivial.\n\nBuilding is certainly no guarantee that you'll be right. Far from it. But though implementation is not a sufficient condition for a great product, it is a necessary one.",
    tags: ["Engineering", "Philosophy", "iOS"],
  },
  {
    slug: "the-screen-is-a-harsh-mirror",
    title: "The Screen is a Harsh Mirror",
    excerpt: "The gap between a 'beautiful mockup' and a 'useful app' is where the actual engineering happens. Here is why the screen is the only place truth exists.",
    date: "2025-01-06",
    content: "Mockups are dangerous because they are static. In a design tool, everything is perfect. The data is exactly the right length, the user always follows the intended path, and the network never fails.\n\nBut the moment you move that design onto a real device, the mirror reflects a much harsher reality.\n\n### Truth in Motion\n\nThe first thing the screen tells you is that your animations are too slow. In your head, that transition was \"elegant.\" On the device, it feels like an obstacle. You realize that the user doesn't want to watch your clever code; they want to get their work done.\n\nThis is the \"Stranger Test\" again. The device is a neutral observer. It shows you the friction you were too close to see. It shows you that the button you thought was accessible is actually too small for a thumb in a hurry.\n\n### The Pedagogy of the Bug\n\nWe often think of bugs as mistakes, but they are actually lessons. A bug is the computer telling you: **\"You didn't think about this.\"**\n\nWhen I was building the recording flow for my heartbeat app, I had a perfect mental model of how the audio would save. But the first time I ran it on a real device, it crashed. Why? Because I hadn't considered what happens if a user gets a phone call in the middle of a session.\n\nThat crash forced me to learn about `AVAudioSession` interruptions—something I never would have researched if I had just stayed in the \"idea phase.\"\n\n### Beyond the Mockup\n\nI've learned to stop spending weeks in design tools. Now, I try to get a prototype on the screen as fast as possible. The screen is where the narrative of your app actually begins. It's where you stop talking about what the app *could* be and start dealing with what it *is*. It forces you to be honest.\n\nAnd most importantly, it forces you to be helpful. A beautiful mockup can win an award, but only a functioning, battle-tested app can solve a problem.",
    tags: ["Design", "Engineering", "iOS"],
  },
]
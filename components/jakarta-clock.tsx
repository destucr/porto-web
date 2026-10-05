"use client"

import * as React from "react"

function jakartaTime(now: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(now)
}

// Jakarta time, ticking. No network — pure Intl, same string on server
// and client so first paint already shows the time (no pop-in, no shift).
// Tabular numerals keep the width steady when the minute rolls over.
export function JakartaClock() {
  const [time, setTime] = React.useState(() => jakartaTime(new Date()))

  React.useEffect(() => {
    const id = window.setInterval(() => setTime(jakartaTime(new Date())), 20_000)
    return () => window.clearInterval(id)
  }, [])

  return <span className="tnum">{time} WIB</span>
}

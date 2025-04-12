import { useState, useEffect } from "react";

const routine = {
  morning: {
    time: "7:00–9:00 AM",
    items: [
      { text: "Wrist Circles – 10x each direction", diagram: "/diagrams/wrist-circles.png" },
      { text: "Finger Slides – 10 reps", diagram: "/diagrams/finger-slides.png" },
      { text: "Tendon Gliding – 5 reps each hand", diagram: "/diagrams/tendon-glide.png" },
      { text: "Thumb 'Thumbs Up' Control – 10 reps each thumb", diagram: "/diagrams/thumb-control.png" }
    ]
  },
  microBreaks: {
    time: "Hourly (Workday)",
    items: [
      { text: "Isometric Thumb Presses – 3–5 rounds", diagram: "/diagrams/thumb-press.png" },
      { text: "Finger Lifts – 2–3 rounds", diagram: "/diagrams/finger-lift.png" },
      { text: "Rubber Band Finger Spread – 10 reps", diagram: "/diagrams/finger-spread.png" },
      { text: "Neuromotor Drill – 30 sec per hand", diagram: "/diagrams/neuromotor.png" }
    ]
  },
  neuro: {
    time: "Midday or Evening (as needed)",
    items: [
      { text: "One-Hand Isolation Drill – 3 mins", diagram: "/diagrams/hand-isolation.png" },
      { text: "Eyes-Closed Finger Control – 1 min per side", diagram: "/diagrams/finger-control.png" }
    ]
  },
  evening: {
    time: "7:00–9:00 PM",
    items: [
      { text: "Soft Ball Squeeze – 10–15 reps", diagram: "/diagrams/ball-squeeze.png" },
      { text: "Finger Resistance Press – 5 sec per finger", diagram: "/diagrams/finger-resistance.png" },
      { text: "Thumb Isometric Holds – 5x each thumb", diagram: "/diagrams/thumb-hold.png" },
      { text: "Massage & Heat for Pinky – 5 mins heat, massage, gentle glide", diagram: "/diagrams/pinky-massage.png" }
    ]
  },
  optional: {
    time: "Before Bed",
    items: [
      { text: "Warm water soak or cloth wrap", diagram: "/diagrams/soak.png" },
      { text: "Thumb, wrist, pinky massage", diagram: "/diagrams/massage.png" },
      { text: "Breathing + hand relaxation", diagram: "/diagrams/breathing.png" }
    ]
  },
  nerveCare: {
    time: "Anytime (Preventative)",
    items: [
      { text: "Median Nerve Glide – 5 reps", diagram: "/diagrams/median-nerve-glide.png" },
      { text: "Ulnar Nerve Glide – 5 reps", diagram: "/diagrams/ulnar-nerve-glide.png" },
      { text: "Wrist Position Reset – neutral wrist alignment check", diagram: "/diagrams/wrist-reset.png" },
      { text: "Desk Ergonomic Check – monitor height, keyboard level", diagram: "/diagrams/ergonomics.png" }
    ]
  }
};

export default function HandCareRoutine() {
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const toggle = (section, index) => {
    const key = `${section}-${index}`;
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sendNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "700px", margin: "auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
        Hand Care Daily Routine
      </h1>
      <button onClick={() => sendNotification("Micro-Break", "Time to stretch your hands!")}>
        Test Notification
      </button>
      {Object.entries(routine).map(([key, section]) => (
        <div key={key} style={{ marginTop: "1.5rem" }}>
          <h2>{key.charAt(0).toUpperCase() + key.slice(1)} – {section.time}</h2>
          {section.items.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggle(key, idx)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#333",
                padding: "0.5rem",
                marginTop: "0.5rem",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <img src={item.diagram} alt="diagram" style={{ width: 48, height: 48 }} />
                <span style={{ textDecoration: completed[`${key}-${idx}`] ? "line-through" : "none" }}>
                  {item.text}
                </span>
              </div>
              <input type="checkbox" readOnly checked={!!completed[`${key}-${idx}`]} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

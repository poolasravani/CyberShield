import { useState } from "react";
import "./App.css";

function App() {
  // SafeScreen
  const [text, setText] = useState("");
  const [scanResult, setScanResult] = useState("");

  // Threat Scanner
  const [threatText, setThreatText] = useState("");
  const [threatResult, setThreatResult] = useState("");

  // CyberMirror
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [exposureResult, setExposureResult] = useState("");

  // SafeScreen Scan
  function scanSensitiveInfo() {
    let result = text;
    let found = [];

    const emailPattern =
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

    const phonePattern = /\b[6-9]\d{9}\b/g;

    const otpPattern = /\b\d{6}\b/g;

    if (emailPattern.test(text)) {
      found.push("Email");
      result = result.replace(emailPattern, "████████████");
    }

    if (phonePattern.test(text)) {
      found.push("Phone Number");
      result = result.replace(phonePattern, "██████████");
    }

    if (otpPattern.test(text)) {
      found.push("OTP");
      result = result.replace(otpPattern, "██████");
    }

    if (found.length === 0) {
      setScanResult("✅ No sensitive information detected.");
    } else {
      setScanResult(
        "⚠️ Detected: " +
          found.join(", ") +
          "\n\n🔒 Protected Text:\n" +
          result
      );
    }
  }

  // Threat Scanner
  function scanThreat() {
    if (!threatText.trim()) {
      setThreatResult("⚠️ Please enter a message or URL.");
      return;
    }

    let risks = [];

    const suspiciousWords = [
      "urgent",
      "verify",
      "password",
      "otp",
      "winner",
      "prize",
      "free money",
      "click now",
      "account blocked",
      "bank",
      "upi",
    ];

    const lowerText = threatText.toLowerCase();

    suspiciousWords.forEach((word) => {
      if (lowerText.includes(word)) {
        risks.push(word);
      }
    });

    if (lowerText.includes("http://")) {
      risks.push("Unsecured HTTP link");
    }

    if (
      lowerText.includes("bit.ly") ||
      lowerText.includes("tinyurl") ||
      lowerText.includes("t.co")
    ) {
      risks.push("Shortened URL");
    }

    if (risks.length >= 3) {
      setThreatResult(
        "🔴 HIGH RISK\n\n" +
          "Suspicious indicators:\n• " +
          risks.join("\n• ") +
          "\n\n❌ Do not click the link or share personal information."
      );
    } else if (risks.length > 0) {
      setThreatResult(
        "🟠 MEDIUM RISK\n\n" +
          "Suspicious indicators:\n• " +
          risks.join("\n• ") +
          "\n\n⚠️ Verify the sender before taking action."
      );
    } else {
      setThreatResult(
        "🟢 LOW RISK\n\nNo obvious suspicious indicators detected.\n\nStill verify important messages before responding."
      );
    }
  }

  // CyberMirror
  function checkExposure() {
    let risks = [];

    if (name.trim()) {
      risks.push("Public name exposure");
    }

    if (college.trim()) {
      risks.push("College/education exposure");
    }

    if (city.trim()) {
      risks.push("Location clue exposure");
    }

    if (email.trim()) {
      risks.push("Email exposure");
    }

    if (risks.length >= 4) {
      setExposureResult(
        "🔴 HIGH EXPOSURE\n\n" +
          "Potential exposure areas:\n• " +
          risks.join("\n• ") +
          "\n\n⚠️ This information may help attackers perform phishing or social engineering."
      );
    } else if (risks.length >= 2) {
      setExposureResult(
        "🟠 MEDIUM EXPOSURE\n\n" +
          "Potential exposure areas:\n• " +
          risks.join("\n• ") +
          "\n\n⚠️ Avoid sharing unnecessary personal information publicly."
      );
    } else {
      setExposureResult(
        "🟢 LOW EXPOSURE\n\nLimited information provided.\n\nContinue minimizing unnecessary public information."
      );
    }
  }

  // Dashboard buttons
  function protectScreen() {
    document
      .getElementById("safescreen")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function openThreatScanner() {
    document
      .getElementById("threatscanner")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function openCyberMirror() {
    document
      .getElementById("cybermirror")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <h1>🛡️ CyberShield</h1>
        <p>Your Personal Digital Bodyguard</p>

        <div className="status">
          🟢 Protection Active
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h2>Stay Safe. Stay Protected.</h2>

        <p>
          CyberShield helps protect your digital identity, screen,
          messages and personal information.
        </p>

        <div className="security-status">
          <span>Overall Security Status</span>
          <strong>🟢 LOW RISK</strong>
        </div>
      </section>

      {/* DASHBOARD CARDS */}
      <section className="cards">

        <div className="card">
          <div className="icon">🖥️</div>

          <h3>SafeScreen</h3>

          <p>
            Detect and protect sensitive information before
            sharing your screen.
          </p>

          <button onClick={protectScreen}>
            Protect Screen
          </button>
        </div>

        <div className="card">
          <div className="icon">🔗</div>

          <h3>Threat Scanner</h3>

          <p>
            Check suspicious messages and links for possible
            cyber threats.
          </p>

          <button onClick={openThreatScanner}>
            Scan Threat
          </button>
        </div>

        <div className="card">
          <div className="icon">👤</div>

          <h3>CyberMirror</h3>

          <p>
            Understand how publicly available information may
            expose you to cyber attacks.
          </p>

          <button onClick={openCyberMirror}>
            Check Exposure
          </button>
        </div>

      </section>

      {/* SAFESCREEN */}
      <section className="scanner" id="safescreen">

        <h2>🖥️ SafeScreen</h2>

        <p>
          Check text for sensitive information before sharing
          your screen.
        </p>

        <textarea
          placeholder="Example: My email is test@gmail.com and my OTP is 123456"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={scanSensitiveInfo}>
          🔍 Scan & Protect
        </button>

        {scanResult && (
          <div className="scan-result">
            {scanResult}
          </div>
        )}

      </section>

      {/* THREAT SCANNER */}
      <section className="scanner" id="threatscanner">

        <h2>🔗 Threat Scanner</h2>

        <p>
          Paste a suspicious message or URL to check for common
          warning signs.
        </p>

        <textarea
          placeholder="Example: URGENT! Your bank account is blocked. Click http://example.com to verify OTP."
          value={threatText}
          onChange={(e) => setThreatText(e.target.value)}
        />

        <button onClick={scanThreat}>
          🔍 Scan Threat
        </button>

        {threatResult && (
          <div className="scan-result">
            {threatResult}
          </div>
        )}

      </section>

      {/* CYBERMIRROR */}
      <section className="scanner" id="cybermirror">

        <h2>👤 CyberMirror</h2>

        <p>
          Enter information you voluntarily share publicly to
          understand possible exposure risks.
        </p>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="College / Organization"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={checkExposure}>
          👁️ Check Exposure
        </button>

        {exposureResult && (
          <div className="scan-result">
            {exposureResult}
          </div>
        )}

      </section>

      {/* FOOTER */}
      <footer>
        <p>
          🛡️ CyberShield — Intelligent Personal Cybersecurity
        </p>

        <p>
          Stay Alert • Stay Secure • Protect Your Digital Identity
        </p>
      </footer>

    </div>
  );
}

export default App;
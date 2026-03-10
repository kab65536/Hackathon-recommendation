"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserProfile = {
  interests: string[];
  languages: string[];
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  participationType: "Team" | "Solo";
  mode: "Online" | "Offline";
  location: string;
};

const interestOptions = [
  { value: "AI", label: "AI" },
  { value: "Web", label: "Web" },
  { value: "Game", label: "ゲーム" },
  { value: "IoT", label: "IoT" },
  { value: "Research", label: "研究" },
];

const languageOptions = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "C++", label: "C++" },
  { value: "Go", label: "Go" },
];

const experienceOptions = [
  { value: "Beginner", label: "初心者" },
  { value: "Intermediate", label: "中級者" },
  { value: "Advanced", label: "上級者" },
];

const participationOptions = [
  { value: "Team", label: "チーム参加" },
  { value: "Solo", label: "個人参加" },
];

const modeOptions = [
  { value: "Online", label: "オンライン" },
  { value: "Offline", label: "オフライン" },
];

const defaultProfile: UserProfile = {
  interests: [],
  languages: [],
  experienceLevel: "Beginner",
  participationType: "Team",
  mode: "Online",
  location: "",
};

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem("userProfile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile({
          ...defaultProfile,
          ...parsed,
        });
      } catch {
        setProfile(defaultProfile);
      }
    }
  }, []);

  if (!mounted) return null;

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("プロフィールを保存しました");
  };

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  const toggleArrayValue = (
    field: "interests" | "languages",
    value: string
  ) => {
    setProfile((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((v) => v !== value)
          : [...prev[field], value],
      };
    });
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginBottom: "1.5rem" }}>プロフィール設定</h1>

        <Section title="興味分野">
          {interestOptions.map((item) => (
            <Checkbox
              key={item.value}
              label={item.label}
              checked={profile.interests.includes(item.value)}
              onChange={() => toggleArrayValue("interests", item.value)}
            />
          ))}
        </Section>

        <Section title="使用言語">
          {languageOptions.map((item) => (
            <Checkbox
              key={item.value}
              label={item.label}
              checked={profile.languages.includes(item.value)}
              onChange={() => toggleArrayValue("languages", item.value)}
            />
          ))}
        </Section>

        <Section title="経験レベル">
          <select
            value={profile.experienceLevel}
            onChange={(e) =>
              setProfile({
                ...profile,
                experienceLevel: e.target.value as UserProfile["experienceLevel"],
              })
            }
            style={inputStyle}
          >
            {experienceOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Section>

        <Section title="参加形式">
          <select
            value={profile.participationType}
            onChange={(e) =>
              setProfile({
                ...profile,
                participationType:
                  e.target.value as UserProfile["participationType"],
              })
            }
            style={inputStyle}
          >
            {participationOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Section>

        <Section title="開催形式">
          <select
            value={profile.mode}
            onChange={(e) =>
              setProfile({
                ...profile,
                mode: e.target.value as UserProfile["mode"],
              })
            }
            style={inputStyle}
          >
            {modeOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </Section>

        <Section title="居住地">
          <input
            value={profile.location}
            onChange={(e) =>
              setProfile({ ...profile, location: e.target.value })
            }
            style={inputStyle}
          />
        </Section>

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <button style={primaryButton} onClick={handleSave}>
            保存
          </button>

          <button style={secondaryButton} onClick={goToDashboard}>
            おすすめを見る
          </button>

          <button
            style={secondaryButton}
            onClick={() => router.push("/")}
          >
            トップへ戻る
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>
      {children}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label style={{ marginRight: "1rem" }}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f1f5f9",
  padding: "2rem",
};

const cardStyle: React.CSSProperties = {
  background: "white",
  padding: "2rem",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "700px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const primaryButton: React.CSSProperties = {
  padding: "0.8rem 1.5rem",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#3b82f6",
  color: "white",
  cursor: "pointer",
};

const secondaryButton: React.CSSProperties = {
  padding: "0.8rem 1.5rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  backgroundColor: "white",
  cursor: "pointer",
};

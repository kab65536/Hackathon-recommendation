"use client";

import { useState, useEffect } from "react";

interface UserProfile {
  interests: string[];
  languages: string[];
  experienceLevel: string;
  experienceYears: number;
  purpose: string;
  participationStyle: string;
}

const interestOptions = ["AI", "Web", "Game", "IoT", "Research"];
const languageOptions = ["JavaScript", "Python", "Java", "C++", "Go"];
const purposeOptions = ["Job Hunting", "Research", "Skill Up", "Hobby"];
const participationOptions = [
  "Team - Online",
  "Team - Offline",
  "Solo - Online",
  "Solo - Offline",
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    interests: [],
    languages: [],
    experienceLevel: "",
    experienceYears: 0,
    purpose: "",
    participationStyle: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile Saved!");
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
    <main style={{ padding: "2rem" }}>
      <h1>User Profile</h1>

      <h3>Interests</h3>
      {interestOptions.map((item) => (
        <label key={item} style={{ marginRight: "1rem" }}>
          <input
            type="checkbox"
            checked={profile.interests.includes(item)}
            onChange={() => toggleArrayValue("interests", item)}
          />
          {item}
        </label>
      ))}

      <h3>Programming Languages</h3>
      {languageOptions.map((item) => (
        <label key={item} style={{ marginRight: "1rem" }}>
          <input
            type="checkbox"
            checked={profile.languages.includes(item)}
            onChange={() => toggleArrayValue("languages", item)}
          />
          {item}
        </label>
      ))}

      <h3>Experience Level</h3>
      <select
        value={profile.experienceLevel}
        onChange={(e) =>
          setProfile({ ...profile, experienceLevel: e.target.value })
        }
      >
        <option value="">Select</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <h3>Years of Experience</h3>
      <input
        type="number"
        value={profile.experienceYears}
        onChange={(e) =>
          setProfile({
            ...profile,
            experienceYears: Number(e.target.value),
          })
        }
      />

      <h3>Purpose</h3>
      <select
        value={profile.purpose}
        onChange={(e) =>
          setProfile({ ...profile, purpose: e.target.value })
        }
      >
        <option value="">Select</option>
        {purposeOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <h3>Participation Style</h3>
      <select
        value={profile.participationStyle}
        onChange={(e) =>
          setProfile({
            ...profile,
            participationStyle: e.target.value,
          })
        }
      >
        <option value="">Select</option>
        {participationOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={handleSave}>Save Profile</button>
    </main>
  );
}

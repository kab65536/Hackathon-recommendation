import { Level, ParticipationType, Mode } from "./hackathon";

export type UserProfile = {
  interests: string[];
  languages: string[];
  experienceLevel: Level;
  participationType: ParticipationType;
  mode: Mode;
  location: string;
};

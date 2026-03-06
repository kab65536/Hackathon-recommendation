import { Hackathon } from "@/types/hackathon";

export type FilterOptions = {
  tag?: string;
  level?: string;
  keyword?: string;
};

export function filterHackathons(
  hackathons: Hackathon[],
  filter: FilterOptions
): Hackathon[] {
  return hackathons.filter((hackathon) => {
    if (filter.tag && !hackathon.tags.includes(filter.tag)) {
      return false;
    }

    if (filter.level && hackathon.level !== filter.level) {
      return false;
    }

    if (
      filter.keyword &&
      !hackathon.name.toLowerCase().includes(filter.keyword.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}

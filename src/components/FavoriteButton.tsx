"use client";

import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  hackathonId: string;
};

export default function FavoriteButton({ hackathonId }: Props) {

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {

    const stored = localStorage.getItem("favorites");

    if (stored) {

      const favs: string[] = JSON.parse(stored);
      setIsFavorite(favs.includes(hackathonId));

    }

  }, [hackathonId]);

  function toggleFavorite() {

    const stored = localStorage.getItem("favorites");

    let favs: string[] = stored ? JSON.parse(stored) : [];

    if (favs.includes(hackathonId)) {

      favs = favs.filter((id) => id !== hackathonId);
      setIsFavorite(false);

    } else {

      favs.push(hackathonId);
      setIsFavorite(true);

    }

    localStorage.setItem("favorites", JSON.stringify(favs));

  }

  return (

    <Button
      colorScheme={isFavorite ? "pink" : "gray"}
      onClick={toggleFavorite}
    >
      {isFavorite ? "❤️ お気に入り済み" : "🤍 お気に入り"}
    </Button>

  );
}

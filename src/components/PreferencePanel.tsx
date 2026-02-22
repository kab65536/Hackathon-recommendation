"use client";

import { Box, Heading, Text, VStack, Slider } from "@chakra-ui/react";
import { useState } from "react";

export type Weights = {
  prize: number;
  popularity: number;
  difficulty: number;
  sponsor: number;
};

type Props = {
  onChange: (weights: Weights) => void;
};

export default function PreferencePanel({ onChange }: Props) {
  const [weights, setWeights] = useState<Weights>({
    prize: 3,
    popularity: 3,
    difficulty: 3,
    sponsor: 3,
  });

  const updateWeight = (key: keyof Weights, value: number) => {
    const updated = { ...weights, [key]: value };
    setWeights(updated);
    onChange(updated);
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="md">
      <Heading size="md" mb={4}>
        条件の重みづけ
      </Heading>

      <VStack gap={6} align="stretch">
        <WeightSlider
          label="賞金"
          value={weights.prize}
          onChange={(v) => updateWeight("prize", v)}
        />
        <WeightSlider
          label="知名度"
          value={weights.popularity}
          onChange={(v) => updateWeight("popularity", v)}
        />
        <WeightSlider
          label="難易度"
          value={weights.difficulty}
          onChange={(v) => updateWeight("difficulty", v)}
        />
        <WeightSlider
          label="企業協賛"
          value={weights.sponsor}
          onChange={(v) => updateWeight("sponsor", v)}
        />
      </VStack>
    </Box>
  );
}

function WeightSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Box>
      <Text mb={2}>
        {label}: {value}
      </Text>

      <Slider.Root
        min={0}
        max={5}
        step={1}
        value={[value]}
        onValueChange={(details) => onChange(details.value[0])}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
           <Slider.Thumb index={0} />
        </Slider.Control>
      </Slider.Root>
    </Box>
  );
}

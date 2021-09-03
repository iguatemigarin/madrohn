const g = (id: string) => {
  const node = document.getElementById(id);

  if (!node) {
    throw new Error("Element not found");
  }

  return node;
};

export const h = (tag: string) => document.createElement(tag);

export const Nodes = {
  playChord: g("play-chord"),
  volume: g("volume"),
  oscs: g("oscs")
};

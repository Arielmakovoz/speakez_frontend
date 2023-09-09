export type lengths = 10 | 30 | 60;

export const phrases = {
  10: [
    "The quick brown fox jumps over the lazy dog today.",
    "The quick brown fox jumps over the lazy dog tomorrow.",
  ],
  30: [
    "The quick brown fox jumps over the lazy dog today. The fox jumped over the dog to get to the other side of the road where he met a chicken.",
    "The quick brown fox jumps over the lazy dog tomorrow. The fox jumped over the dog to get to the other side of the road where he met a chicken.",
  ],
  60: [
    "The quick brown fox jumps over the lazy dog today. The fox jumped over the dog to get to the other side of the road where he met a chicken. The quick brown fox jumps over the lazy dog today. The fox jumped over the dog to get to the other side of the road where he met a chicken.",
    "The quick brown fox jumps over the lazy dog tomorrow. The fox jumped over the dog to get to the other side of the road where he met a chicken. The quick brown fox jumps over the lazy dog today. The fox jumped over the dog to get to the other side of the road where he met a chicken.",
  ],
};

export const choosePhrase = (length: lengths, exclude?: string) => {
  let idx;
  do {
    idx = Math.floor(Math.random() * phrases[length].length);
    console.log(idx, phrases[length][idx], exclude);
  } while (phrases[length][idx] === exclude);

  return phrases[length][idx] ?? "";
};

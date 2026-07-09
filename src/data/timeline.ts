export interface Event {
  title: string;
  from: Date;
  to?: Date;
  description: string;
}

export const events: Event[] = [
  {
    title: "BSc Computer Science with AI",
    from: new Date("2023-09-01"),
    to: new Date("2026-07-01"),
    description:
      "Graduated with Upper Second-Class Honours (2:1) from the University of Birmingham.",
  },
  {
    title: "Software Developer Intern at WeDonate",
    from: new Date("2025-03-01"),
    to: new Date("2025-04-30"),
    description:
      "Developed a web scraper that extracted and structured over 3,000 data points from competitor websites, enabling the team to benchmark pricing and positioning.",
  },
];

export function endOf(e: Event): Date {
  return e.to ?? new Date();
}

export function groupEvents(input: Event[]): Event[][] {
  const remaining: Event[] = input.slice();
  const output: Event[][] = [];

  while (remaining.length > 0) {
    const seedEvent = remaining.shift()!;
    const currentGroup: Event[] = [seedEvent];
    let groupMin = seedEvent.from;
    let groupMax = endOf(seedEvent);

    let i = 0;
    while (i < remaining.length) {
      const candidate = remaining[i]!;
      const candidateStart = candidate.from;
      const candidateEnd = endOf(candidate);
      if (candidateStart < groupMax && groupMin < candidateEnd) {
        currentGroup.push(candidate);
        if (candidateStart < groupMin) groupMin = candidateStart;
        if (candidateEnd > groupMax) groupMax = candidateEnd;
        remaining.splice(i, 1);
        i = 0;
      } else {
        i++;
      }
    }
    output.push(currentGroup);
  }

  return output;
}

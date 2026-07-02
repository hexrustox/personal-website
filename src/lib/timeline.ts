export interface Event {
  title: string;
  from: Date;
  to?: Date;
  description: string;
}

export const events: Event[] = [
  {
    title: "Software Engineer @ Example Co",
    from: new Date("2023-03-01"),
    description: "Building backend services in Rust and TypeScript.",
  },
  {
    title: "Junior Developer @ Studio North",
    from: new Date("2021-06-01"),
    to: new Date("2023-02-28"),
    description:
      "Shipped customer-facing Vue 3 dashboards and internal tooling.",
  },
  {
    title: "B.Sc. Computer Science @ University of Somewhere",
    from: new Date("2017-09-01"),
    to: new Date("2021-06-30"),
    description:
      "Studied systems programming, algorithms, and human–computer interaction.",
  },
  {
    title: "Open-source maintainer of pgwire-proxy",
    from: new Date("2022-01-01"),
    description:
      "Postgres protocol proxy written in Rust. Listed under Projects.",
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

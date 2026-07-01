export interface Event {
  title: string;
  from: Date;
  to?: Date;
  description: string;
}

export interface PlacedEvent {
  ev: Event;
  topRem: number;
  heightRem: number;
  toYear: number;
}

export interface TimelineGroup {
  min: Date;
  max: Date;
  spanYears: number;
  heightRem: number;
  events: PlacedEvent[];
}

export const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;
export const YEARS_TO_REM = 4;
export const REM_DECIMALS = 2;

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

function rem(value: number): number {
  const factor = 10 ** REM_DECIMALS;
  return Math.round(value * factor) / factor;
}

function placeEventsInGroup(
  group: Event[],
  min: Date,
  max: Date,
  spanYears: number,
): PlacedEvent[] {
  const spanMs = max.getTime() - min.getTime();
  return group.map((ev) => {
    const eventEnd = endOf(ev);
    const topRatio = (ev.from.getTime() - min.getTime()) / spanMs;
    const heightRatio = (eventEnd.getTime() - ev.from.getTime()) / spanMs;
    return {
      ev,
      topRem: rem(topRatio * spanYears * YEARS_TO_REM),
      heightRem: rem(heightRatio * spanYears * YEARS_TO_REM),
      toYear: eventEnd.getFullYear(),
    };
  });
}

export function buildLayout(input: Event[]): TimelineGroup[] {
  const sorted = [...input].sort((a, b) => a.from.getTime() - b.from.getTime());
  return groupEvents(sorted).map((group) => {
    const min = group.reduce(
      (acc, e) => (e.from < acc ? e.from : acc),
      group[0]!.from,
    );
    const max = group.reduce((acc, e) => {
      const end = endOf(e);
      return end > acc ? end : acc;
    }, endOf(group[0]!));
    const spanYears = (max.getTime() - min.getTime()) / MS_PER_YEAR;
    return {
      min,
      max,
      spanYears,
      heightRem: rem(spanYears * YEARS_TO_REM),
      events: placeEventsInGroup(group, min, max, spanYears),
    };
  });
}

import re

def main():
    with open('../puzzle.txt') as file:
        input = setup(sorted([row for row in file]))
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    s_guard, s_total = 0, 0

    for guard, record in input.items():
        if sum(record) > s_total:
            s_guard, s_total = guard, sum(record)

    s_min, s_record = 0, input[s_guard]

    for minute in range(60):
        if s_record[minute] > s_record[s_min]:
            s_min = minute

    return s_guard * s_min


def part_2(input):
    s_min, s_freq, s_guard = 0, 0, 0

    for guard, record in input.items():
        for minute in range(60):
            if record[minute] > s_freq:
                s_min, s_freq, s_guard = minute, record[minute], guard

    return s_guard * s_min


def setup(lines):
    records = {}
    currentGuard = 0
    sleepStart = 0

    for line in lines:
        match = re.match(r'^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] (?:Guard #(\d+) begins shift|(falls asleep)|(wakes up))$', line)
        if match:
            minute, guard, fallsAsleep, wakesUp = match.groups()
            if guard:
                currentGuard = int(guard)
                if currentGuard not in records:
                    records[currentGuard] = [0] * 60
            if fallsAsleep:
                sleepStart = int(minute[-2:])
            if wakesUp:
                for i in range(sleepStart, int(minute[-2:])):
                    records[currentGuard][i] = records[currentGuard][i] + 1 if records[currentGuard][i] else 1

    return records


if __name__ == '__main__':
    main()
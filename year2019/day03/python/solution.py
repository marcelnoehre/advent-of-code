def main():
    print(part_1())
    print(part_2())


def part_1():
    wire1, wire2 = map(parse_wire_1, input)
    return min(abs(x) + abs(y) for x, y in (wire1 & wire2))


def part_2():
    wire1, wire2 = map(parse_wire_2, input)
    return min(wire1[intersection] + wire2[intersection] for intersection in (wire1.keys() & wire2.keys()))


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = [row for row in file]


def parse_wire_1(wire):
    x, y, parsed = 0, 0, set()
    for e in wire.split(","):
        dx, dy = {"U": (0, -1), "D": (0, 1), "L": (-1, 0), "R": (1, 0)}[e[0]]

        for _ in range(int(e[1:])):
            x, y = x + dx, y + dy
            parsed.add((x, y))

    return parsed


def parse_wire_2(wire):
    x, y, parsed, count = 0, 0, {}, 0
    for e in wire.split(","):
        dx, dy = {"U": (0, -1), "D": (0, 1), "L": (-1, 0), "R": (1, 0)}[e[0]]

        for _ in range(int(e[1:])):
            x, y, count = x + dx, y + dy, count + 1

            if (x, y) not in parsed:
                parsed[(x, y)] = count

    return parsed


if __name__ == '__main__':
    setup(('../puzzle.txt'))
    main()
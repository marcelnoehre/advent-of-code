def main():
    with open('../puzzle.txt') as file:
        input = [(dir, int(val)) for dir, val in (row.split() for row in file)]
    
    print(part1(input))
    print(part2(input))


def part1(input):
    h, d = 0, 0

    for (c,v) in input:
        if c == 'forward':
            h += v
        elif c == 'up':
            d -= v
        elif c == 'down': 
            d += v

    return h * d


def part2(input):
    a, h, d = 0, 0, 0

    for (c,v) in input:
        if c == 'forward':
            h += v
            d += v * -a
        elif c == 'up':
            a += v
        elif c == 'down':
            a -= v

    return h * d


if __name__ == '__main__':
    main()
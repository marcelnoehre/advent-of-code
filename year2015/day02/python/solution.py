def main():
    with open('../puzzle.txt') as file:
        input = [[int(d) for d in row.split('x')] for row in file]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return sum(2 * (l * w + l * h + w * h) + l * w for l, w, h in (sorted(box) for box in input))


def part_2(input):
    return sum(2 * (l + w) + l * w * h for l, w, h in (sorted(box) for box in input))


if __name__ == '__main__':
    main()
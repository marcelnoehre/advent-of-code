def main():
    with open('../puzzle.txt') as file:
        input = [int(row) for row in file]
    
    print(part1(input))
    print(part2(input))


def part1(input):
    return sum([b > a for a, b in zip(input, input[1:])])


def part2(input):
    return sum(sum(input[i+1:i+4]) > sum(input[i:i+3]) for i in range(len(input)-2))


if __name__ == '__main__':
    main()
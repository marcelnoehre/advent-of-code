def main():
    with open('../puzzle.txt') as file:
        input = [sum(map(int, input_string.split())) for input_string in file.read().split('\n\n')]
    
    print(part1(input))
    print(part2(input))


def part1(input):
    return max(input)


def part2(input):
    return sum(sorted(input, reverse=True)[:3])


if __name__ == '__main__':
    main()
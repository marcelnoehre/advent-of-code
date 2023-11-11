import re

def main():
    with open('../puzzle.txt') as file:
        input = [row.rstrip('\n') for row in file]
    
    print(part1(input))
    print(part2(input))


def part1(input):
    sum = 0
    for rucksack in input:
        compartments = re.findall(f".{{1,{len(rucksack) // 2}}}", rucksack)
        sum += get_char_value(''.join(set(compartments[0]) & set(compartments[1])))

    return sum


def part2(input):
    sum = 0
    groups = [input[i:i+3] + [None] * (3 - len(input[i:i+3])) for i in range(0, len(input), 3)]
    for group in groups:
        sum += get_char_value(''.join(set(group[0]) & set(group[1]) & set(group[2])))

    return sum


def get_char_value(c):
    return ord(c) - (ord(c) > 96 and 96 or 38)


if __name__ == '__main__':
    main()
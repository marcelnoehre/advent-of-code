def main():
    with open('../puzzle.txt') as file:
        input = [*file.read()]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return len(set(decode_instructions(input)))


def part_2(input):
    return len(set(decode_instructions(input[1::2])).union(decode_instructions(input[0::2])))


def decode_instructions(instructions):    
    houses = [(0, 0)]
    x, y = 0, 0
    for instruction in instructions:
        dx, dy = (0, 1) if instruction == '^' else (0, -1) if instruction == 'v' else (-1, 0) if instruction == '<' else (1, 0)
        x += dx
        y += dy
        houses.append((x, y))
    
    return [','.join(map(str, house)) for house in houses]


if __name__ == '__main__':
    main()
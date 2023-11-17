def main():
    with open('../puzzle.txt') as file:
        input = [int(num) for num in file.read().split(',')]
    
    print(part_2(input))
    print(part_1(input))


def part_1(input):
    return simulate(input, 12, 2)


def part_2(input):
    input.pop()
    for noun in range(len(input)):
        for verb in range(len(input)):
            if simulate(input[:], noun, verb) == 19690720:
                return 100 * noun + verb


def simulate(codes, noun, verb):
    codes[1], codes[2] = noun, verb
    i = 0
    while codes[i] != 99:
        codes[codes[i + 3]] = codes[codes[i + 1]] + codes[codes[i + 2]] if codes[i] == 1 else codes[codes[i + 1]] * codes[codes[i + 2]]
        i += 4

    return codes[0]


if __name__ == '__main__':
    main()
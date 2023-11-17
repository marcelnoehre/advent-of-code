def main():
    with open('../puzzle.txt') as file:
        input = [int(row) for row in file]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    for i in range(len(input) - 1):
        for j in range(i + 1, len(input)):
            if input[i] + input[j] == 2020:
                return input[i] * input[j]


def part_2(input):
    for i in range(len(input)):
        for j in range(i + 1, len(input)):
            for k in range(j + 1, len(input)):
                if input[i] + input[j] + input[k] == 2020:
                    return input[i] * input[j] * input[k]


if __name__ == '__main__':
    main()
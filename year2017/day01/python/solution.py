def main():
    with open('../puzzle.txt') as file:
        input = [int(num) for num in [*file.read()]]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    sum = 0
    for i in range(len(input)):
        if input[i] == input[(i + 1) % len(input)]:
            sum += input[i]

    return sum


def part_2(input):
    sum = 0
    for i in range(len(input)):
        if input[i] == input[(i + len(input) // 2) % len(input)]:
            sum += input[i]

    return sum


if __name__ == '__main__':
    main()
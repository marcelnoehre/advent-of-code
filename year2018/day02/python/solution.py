def main():
    with open('../puzzle.txt') as file:
        input = [row for row in file]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    twice, thrice = 0, 0
    for row in input:
        counter = {}

        for c in row:
            counter[c] = counter.get(c, 0) + 1

        twice += 1 if 2 in counter.values() else 0
        thrice += 1 if 3 in counter.values() else 0

    return twice * thrice


def part_2(input):
    for x in range(len(input)):
        for y in range(len(input)):
            if x != y and len(input[x]) == len(input[y]):
                difference, position = 0, 0
                
                for z in range(len(input[x])):
                    if input[x][z] != input[y][z]:
                        position, difference = z, difference + 1

                if difference == 1:
                    return (input[x][:position] + input[x][position + 1:]).rstrip()


if __name__ == '__main__':
    main()
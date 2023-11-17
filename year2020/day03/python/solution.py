def main():
    with open('../puzzle.txt') as file:
        input = [row.rstrip() for row in file]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return check_trees(input, 3)


def part_2(input):
    product = 1
    for step in [1, 3, 5, 7]:
        product *= check_trees(input, step)

    return product * check_trees(input, 1, 1)


def check_trees(input, step, skip=None):
    index, counter, i = 0, 0, 0
    while i < len(input):
        if input[i][index] == '#':
            counter += 1

        index = (index + step) % len(input[i])
        i = i + skip if skip is not None else i
        i += 1

    return counter
 

if __name__ == '__main__':
    main()
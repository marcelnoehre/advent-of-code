def main():
    with open('../puzzle.txt') as file:
        input = [list(map(lambda tupel: list(map(int, tupel.split('-'))), group.split(','))) for group in file.read().split('\n')]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return len(list(filter(lambda pair: overlaps(pair[0], pair[1]), input)))


def part_2(input):
    return len(list(filter(lambda pair: contains(pair[0], pair[1]), input)))


def overlaps(pair1, pair2):
    return (pair1[0] <= pair2[0] and pair1[1] >= pair2[1]) or (pair2[0] <= pair1[0] and pair2[1] >= pair1[1])


def contains(pair1, pair2):
    return ((pair1[0] >= pair2[0] and pair1[0] <= pair2[1]) or (pair2[0] >= pair1[0] and pair2[0] <= pair1[1]) or (pair1[1] <= pair2[1] and pair1[1] >= pair2[0]) or (pair2[1] <= pair1[1] and pair2[1] >= pair1[0]))


if __name__ == '__main__':
    main()
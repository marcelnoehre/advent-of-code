def main():
    with open('../puzzle.txt') as file:
        input = ([*file.read()])
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return getMarker(input, 4)


def part_2(input):
    return getMarker(input, 14)


def getMarker(input, length):
    return next((i + length for i, _ in enumerate(input[:-length]) if len(set(input[i:i+length])) == length), None)


if __name__ == '__main__':
    main()
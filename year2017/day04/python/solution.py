def main():
    with open('../puzzle.txt') as file:
        input = [row.split(' ') for row in file.read().split('\n')]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return sum(len(set(passphrase)) == len(passphrase) for passphrase in input)


def part_2(input):
    return sum(len(set([''.join(sorted(word)) for word in [*passphrase]])) == len(passphrase) for passphrase in input)


if __name__ == '__main__':
    main()
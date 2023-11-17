def main():
    with open('../puzzle.txt') as file:
        input = tuple(map(int, file.read().split('-')))
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return len([pw for pw in map(str, range(input[0], input[1] + 1)) if len(set(pw)) < len(pw) and pw == ''.join(sorted(pw))])


def part_2(input):
    return len([pw for pw in map(str, range(input[0], input[1] + 1)) if pw == ''.join(sorted(pw)) and any(pw[i] == pw[i + 1] and (i == 0 or pw[i] != pw[i - 1]) and (i + 2 == len(pw) or pw[i] != pw[i + 2]) for i in range(len(pw) - 1))])


if __name__ == '__main__':
    main()
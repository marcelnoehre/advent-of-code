def main():
    with open('../puzzle.txt') as file:
        input = setup_seats([[line[:7], line[-3:]] for line in file.read().split('\n')])

    print(part_1(input))
    print(part_2(input))


def part_1(input):
    return max(input)


def part_2(input):
    input.sort()
    return next((seat - 1 for seat, prev_seat in zip(input[1:], input) if seat - prev_seat != 1), 0)


def setup_seats(input):
    seats = []
    for pass_ in input:
        rl, ru, cl, cu = 0, 127, 0, 7
        for char in pass_[0]:
            if char == 'F':
                ru = (rl + ru) // 2
            else:
                rl = (rl + ru) // 2 + 1

        for char in pass_[1]:
            if char == 'L':
                cu = (cl + cu) // 2
            else:
                cl = (cl + cu) // 2 + 1

        seats.append(rl * 8 + cl)
    return seats


if __name__ == '__main__':
    main()

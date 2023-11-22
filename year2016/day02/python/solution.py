def main():
    with open('../puzzle.txt') as file:
        input = file.read().split('\n')
        directions = {'L': [-1, 0],'R': [1, 0],'U': [0, 1],'D': [0, -1]}
    
    print(part_1(input, directions))
    print(part_2(input, directions))


def part_1(input, directions):
    password, x, y = '', 1, 1
    keypad = [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3]
    ]

    for sequenz in input:
        for move in sequenz:
            x = min(max(x + directions[move][0], 0), 2)
            y = min(max(y + directions[move][1], 0), 2)

        password += str(keypad[x][y])

    return password


def part_2(input, directions):
    password, x, y = '', 1, 3
    keypad = [
        [None, None, None, None, None, None, None],
        [None, None, None, '5', None, None, None],
        [None, None, 'A', '6', '2', None, None],
        [None, 'D', 'B', '7', '3', '1', None],
        [None, None, 'C', '8', '4', None, None],
        [None, None, None, '9', None, None, None],
        [None, None, None, None, None, None, None]
    ]

    for sequenz in input:
        for move in sequenz:
            if keypad[x + directions[move][0]][y + directions[move][1]] is not None:
                x += directions[move][0]
                y += directions[move][1]

        password += keypad[x][y]

    return password


if __name__ == '__main__':
    main()
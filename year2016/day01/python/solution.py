def main():
    with open('../puzzle.txt') as file:
        input = file.read().split(', ')
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    directions, pos, direction = [(0, 1), (1, 0), (0, -1), (-1, 0)], [0, 0], 0

    for move in input:
        direction = (direction + (1 if move[0] == 'R' else -1) + 4) % 4
        pos[0] += int(move[1:]) * directions[direction][0]
        pos[1] += int(move[1:]) * directions[direction][1]

    return abs(pos[0] + pos[1])


def part_2(input_moves):
    directions, visited, pos, direction = [(0, 1), (1, 0), (0, -1), (-1, 0)], set(), [0, 0], 0

    for move in input_moves:
        direction = (direction + (1 if move[0] == 'R' else -1) + 4) % 4
        max_value = int(move[1:]) * directions[direction][int(directions[direction][0] == 0)]
        
        for _ in range(abs(max_value)):
            pos[0] += directions[direction][0]
            pos[1] += directions[direction][1]

            if tuple(pos) in visited:
                return abs(pos[0]) + abs(pos[1])
            
            else:
                visited.add(tuple(pos))


if __name__ == '__main__':
    main()
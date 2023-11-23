def main():    
    print(part_1())
    print(part_2())


def part_1():
    directions, pos, direction = [(0, 1), (1, 0), (0, -1), (-1, 0)], [0, 0], 0

    for move in input:
        direction = (direction + (1 if move[0] == 'R' else -1) + 4) % 4
        pos[0] += int(move[1:]) * directions[direction][0]
        pos[1] += int(move[1:]) * directions[direction][1]

    return abs(pos[0] + pos[1])


def part_2():
    directions, visited, pos, direction = [(0, 1), (1, 0), (0, -1), (-1, 0)], set(), [0, 0], 0

    for move in input:
        direction = (direction + (1 if move[0] == 'R' else -1) + 4) % 4
        max_value = int(move[1:]) * directions[direction][int(directions[direction][0] == 0)]
        
        for _ in range(abs(max_value)):
            pos[0] += directions[direction][0]
            pos[1] += directions[direction][1]

            if tuple(pos) in visited:
                return abs(pos[0]) + abs(pos[1])
            
            else:
                visited.add(tuple(pos))


def setup(path):
    global input
    
    with open(path, 'r') as file:
        input = file.read().split(', ')


if __name__ == '__main__':
    setup('../puzzle.txt')
    main()
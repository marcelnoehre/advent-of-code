import math

def main():
    with open('../puzzle.txt') as file:
        input = int(file.read())
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    steps, x, y = float('inf'), pow(((math.floor(math.sqrt(input - 1) / 2) + 1) * 2 - 1), 2), pow(((math.floor(math.sqrt(input - 1) / 2) + 1) * 2 + 1), 2)
    for i in range(4):
        steps = min(steps, abs(input - ((1 - (i / 4 + 0.125)) * x + (i / 4 + 0.125) * y)))

    return steps + (math.floor(math.sqrt(input - 1) / 2) + 1)


def part_2(input):
    grid = {}
    for x, y in generate_field():
        value = sum(grid.get(f"{x + i},{y + j}", 0) for i in [-1, 0, 1] for j in [-1, 0, 1] if not (i == 0 and j == 0)) or 1
        
        if value > input:
            return value
        
        grid[f"{x},{y}"] = value


def generate_field():
    x, y, dx, dy, s, i = 0, 0, 1, 0, 0, 1
    
    while True:
        yield x, y

        i, x, y = i + 1, x + dx, y + dy
        
        if i >= (s * 2 + 1) ** 2:
            s += 1

        if abs(x + dx) > s or abs(y + dy) > s:
            dx, dy = dy, -dx


if __name__ == '__main__':
    main()
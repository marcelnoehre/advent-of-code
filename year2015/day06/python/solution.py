def main():
  print(part_1())
  print(part_2())


def part_1():
  return result[0]


def part_2():
  return result[1]


def setup(path):
  global input
  global result

  with open(path, 'r') as file:
    input = map(parse, file.read().splitlines())

  result = calc(input)


def parse(line):
  x1, y1 = map(int, line.split()[-3].split(','))
  x2, y2 = map(int, line.split()[-1].split(','))
  return line.split()[len(line.split()) == 5], range(x1, x2+1), range(y1, y2+1)


def calc(data):
  grid = ([[0 for _ in range(1000)] for _ in range(1000)], [[0 for _ in range(1000)] for _ in range(1000)])
  for cmd, xs, ys in data:
    for x in xs:
      for y in ys:
        if cmd == 'on':
          grid[0][x][y] = 1
          grid[1][x][y] += 1
        elif cmd == 'off':
          grid[0][x][y] = 0
          grid[1][x][y] = max(0, grid[1][x][y] - 1)
        else:
          grid[0][x][y] = 1 - grid[0][x][y]
          grid[1][x][y] += 2
  return sum(map(sum, grid[0])), sum(map(sum, grid[1]))


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()

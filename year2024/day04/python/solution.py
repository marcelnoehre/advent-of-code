def main():
  print(part_1())
  print(part_2())


def part_1():
  n, m, res = len(input), len(input[0]), 0
  for i in range(n):
    for j in range(m):
      if i < n - 3 and input[i][j] + input[i + 1][j] + input[i + 2][j] + input[i + 3][j] in ("XMAS", "SAMX"):
        res += 1
      if j < n - 3 and input[i][j : j + 4] in ("XMAS", "SAMX"):
        res += 1
      if i < n - 3 and j < n - 3:
        if input[i][j] + input[i + 1][j + 1] + input[i + 2][j + 2] + input[i + 3][j + 3] in ("XMAS", "SAMX"):
          res += 1
        if input[i + 3][j] + input[i + 2][j + 1] + input[i + 1][j + 2] + input[i][j + 3] in ("XMAS", "SAMX"):
          res += 1
  return res


def part_2():
  return sum(input[i][j] + input[i + 1][j + 1] + input[i + 2][j + 2] in ("MAS", "SAM") and input[i + 2][j] + input[i + 1][j + 1] + input[i][j + 2] in ("MAS", "SAM") for i in range(len(input) - 2) for j in range(len(input[0]) - 2))


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [row.strip() for row in file]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
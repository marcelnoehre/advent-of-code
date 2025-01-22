def main():
  print(part_1())
  print(part_2())


def part_1():
  return sum(len(row) - len(eval(row)) for row in input)


def part_2():
  return sum(row.count(r'"') + row.count('\\') + 2 for row in input)


def setup(path):
  global input

  with open(path, 'r') as file:
    input = file.read().splitlines()


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()


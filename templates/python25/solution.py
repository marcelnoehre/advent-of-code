def main():
  print(part_1())


def part_1():
  pass


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [row for row in file]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
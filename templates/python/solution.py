import pathlib

def main():
  print(part_1())
  print(part_2())


def part_1():
  pass


def part_2():
  pass


def setup(path):
  global input

  input = pathlib.Path(path).read_text()


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
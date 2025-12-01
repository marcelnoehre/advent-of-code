import pathlib

def main():
  print(part_1())
  print(part_2())


def part_1():
  pos, res = 50, 0
  for line in input:
    pos = (pos + (-1 if line[0] == 'L' else 1) * int(line[1:])) % 100
    res += pos == 0
  return res


def part_2():
  pos, res = 50, 0
  for line in input:
    for _ in range(int(line[1:])):
      pos = (pos + (-1 if line[0] == 'L' else 1)) % 100
      res += pos == 0
  return res


def setup(path):
  global input

  input = pathlib.Path(path).read_text().splitlines()


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
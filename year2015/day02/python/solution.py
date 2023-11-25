def main():
  print(part_1())
  print(part_2())


def part_1():
  return sum(2 * (l * w + l * h + w * h) + l * w for l, w, h in (sorted(box) for box in input))


def part_2():
  return sum(2 * (l + w) + l * w * h for l, w, h in (sorted(box) for box in input))


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [[int(d) for d in row.split('x')] for row in file]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
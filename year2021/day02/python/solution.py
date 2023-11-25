def main():
  print(part_1())
  print(part_2())


def part_1():
  h, d = 0, 0

  for (c,v) in input:
    if c == 'forward':
      h += v
    elif c == 'up':
      d -= v
    elif c == 'down':
      d += v

  return h * d


def part_2():
  a, h, d = 0, 0, 0

  for (c,v) in input:
    if c == 'forward':
      h += v
      d += v * -a
    elif c == 'up':
      a += v
    elif c == 'down':
      a -= v

  return h * d


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [(dir, int(val)) for dir, val in (row.split() for row in file)]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
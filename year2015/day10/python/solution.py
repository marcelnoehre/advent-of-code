def main():
  print(part_1())
  print(part_2())


def part_1():
  return len(calc(input, 40))


def part_2():
  return len(calc(input, 50))


def calc(ds, t):
  ds = list(map(int, ds))
  for _ in range(t):
    d = ds[0]
    r = 0
    nds = []
    for digit in ds:
      if digit == d: r += 1
      else:
        nds.append(r)
        nds.append(d)
        d = digit
        r = 1
    nds.append(r)
    nds.append(d)
    ds = nds
  return ds


def setup(path):
  global input

  with open(path, 'r') as file:
    input = file.read().strip()


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()

from itertools import permutations

def main():
  print(part_1())
  print(part_2())


def part_1():
  return calc(min)


def part_2():
  return calc(max)


def calc(f):
  return f(sum(r[t] for t in zip(rt, rt[1:])) for rt in permutations(l))


def setup(path):
  global input, l, r
  with open(path, 'r') as file:
    input = [(row.split()[0], row.split()[2], int(row.split()[4])) for row in file]
  l = set()
  r = dict()
  for a, b, d in input:
    l |= {a, b}
    r[(a, b)] = d
    r[(b, a)] = d


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()

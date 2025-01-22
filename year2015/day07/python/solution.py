from functools import lru_cache
from operator import and_, or_, lshift, rshift

def main():
  print(part_1())
  print(part_2())


def part_1():
  return calc(input)


def part_2():
  return calc(input, b=calc(input))


def calc(ws, w='a', b=None):
  @lru_cache
  def a(wire):
    try: return int(wire)
    except ValueError: lhs = ws[wire]
    return (a(lhs[0]) if len(lhs) == 1 else ~a(lhs[1]) & 0xffff if len(lhs) == 2 else {'AND': and_, 'OR': or_, 'LSHIFT': lshift, 'RSHIFT': rshift}[lhs[1]](a(lhs[0]), a(lhs[2])))
  if b is not None: ws['b'] = [b]
  return a(w)


def setup(path):
  global input
  parser = lambda data: {(s := line.split(' -> '))[1]: s[0].split() for line in data}

  with open(path, 'r') as file:
    input = parser(file.read().splitlines())


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
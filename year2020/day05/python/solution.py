def main():
  print(part_1())
  print(part_2())


def part_1():
  return max(input)


def part_2(input):
  input.sort()
  return next((seat - 1 for seat, prev_seat in zip(input[1:], input) if seat - prev_seat != 1), 0)


def setup(path):
  global input

  with open(path, 'r') as file:
    input = setup_seats([[line[:7], line[-3:]] for line in file.read().split('\n')])


def setup_seats(input):
  seats = []
  for pass_ in input:
    rl, ru, cl, cu = 0, 127, 0, 7
    for char in pass_[0]:
      if char == 'F':
        ru = (rl + ru) // 2
      else:
        rl = (rl + ru) // 2 + 1

    for char in pass_[1]:
      if char == 'L':
        cu = (cl + cu) // 2
      else:
        cl = (cl + cu) // 2 + 1

    seats.append(rl * 8 + cl)
  return seats


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
def main():
  print(part_1())
  print(part_2())


def part_1():
  return calc(input, 1)


def part_2():
  return calc(input, 5)


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [int(num) for num in file.read().split(',')]


def calc(input, mode):
  program = list(input)
  result, i = -1, 0

  def get_value(param, mode):
    return param if mode == 1 else program[param]

  while program[i] % 100 != 99:
    if program[i] % 100 in [1, 2, 7, 8]:
      p1, p2, p3 = program[i + 1:i + 4]
      val1 = get_value(p1, (program[i] - program[i] % 100) // 100 % 10)
      val2 = get_value(p2, (program[i] - program[i] % 100) // 1000 % 10)

      if program[i] % 100 == 1:
        program[p3] = val1 + val2
      elif program[i] % 100 == 2:
        program[p3] = val1 * val2
      elif program[i] % 100 == 7:
        program[p3] = 1 if val1 < val2 else 0
      elif program[i] % 100 == 8:
        program[p3] = 1 if val1 == val2 else 0

      i += 4

    elif program[i] % 100 in [5, 6]:
      p1, p2 = program[i + 1:i + 3]
      val1 = get_value(p1, (program[i] - program[i] % 100) // 100 % 10)
      val2 = get_value(p2, (program[i] - program[i] % 100) // 1000 % 10)

      if (program[i] % 100 == 5 and val1 != 0) or (program[i] % 100 == 6 and val1 == 0):
        i = val2
      else:
        i += 3

    elif program[i] % 100 == 3:
      program[program[i + 1]] = mode
      i += 2

    elif program[i] % 100 == 4:
      result = get_value(program[i + 1], (program[i] - program[i] % 100) // 100 % 10)
      i += 2

  return result



if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
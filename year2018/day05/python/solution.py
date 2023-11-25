def main():
  print(part_1())
  print(part_2())


def part_1():
  return (len(react(input)))


def part_2():
  best = {"unit": None, "reacted": input}
  for i in range(26):
    reacted = react([unit for unit in input if unit.lower() != chr(ord('a') + i)])

    if len(reacted) < len(best["reacted"]):
      best = {"unit": chr(ord('a') + i), "reacted": reacted}

  return len(best["reacted"])


def setup(path):
  global input

  with open(path, 'r') as file:
    input = file.read().split()


def react(units):
  result = []
  for unit in units:
    if len(result) > 0 and abs(ord(unit) - ord(result[-1])) == 32:
      result.pop()

    else:
      result.append(unit)

  return result


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
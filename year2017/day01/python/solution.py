def main():
  print(part_1())
  print(part_2())


def part_1():
  sum = 0
  for i in range(len(input)):
    if input[i] == input[(i + 1) % len(input)]:
      sum += input[i]

  return sum


def part_2():
  sum = 0
  for i in range(len(input)):
    if input[i] == input[(i + len(input) // 2) % len(input)]:
      sum += input[i]

  return sum


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [int(num) for num in [*file.read()]]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
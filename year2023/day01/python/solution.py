def main():
  print(part_1())
  print(part_2())


def part_1():
  sum = 0
  for val in input:
    sum += int(next((char for char in val if char.isdigit()), None) + next((char for char in reversed(val) if char.isdigit()), None))

  return sum


def part_2():
  sum = 0
  for val in input:
    digits = []

    for i, char in enumerate(val):
      if char.isdigit():
          digits.append(char)

      for digit, str_num in enumerate(['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']):
        if val[i:].startswith(str_num):
          digits.append(str(digit))

    sum += int(digits[0] + digits[-1])
    
  return sum


def setup(path):
  global input

  with open(path, 'r') as file:
    input = [row for row in file]


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
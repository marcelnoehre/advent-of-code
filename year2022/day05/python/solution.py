def main():
  print(part_1())
  print(part_2())


def part_1():
  stacks = [list(stack) for stack in intial_stacks]

  for move in instructions:
    stacks[move[5] - 1].extend(stacks[move[3] - 1][-move[1]:][::-1])
    stacks[move[3] - 1] = stacks[move[3] - 1][:-move[1]]

  return ''.join(str(stack.pop()) for stack in stacks)


def part_2():
  stacks = [list(stack) for stack in intial_stacks]

  for move in instructions:
    stacks[move[5] - 1].extend(stacks[move[3] - 1][-move[1]:])
    stacks[move[3] - 1] = stacks[move[3] - 1][:-move[1]]

  return ''.join(str(stack.pop()) for stack in stacks)


def setup(path):
  global intial_stacks
  global instructions

  with open(path, 'r') as file:
    input = file.read().split('\n\n')
    intial_stacks = setup_stacks(input[0].split('\n')[:-1][::-1])
    instructions = [[int(value) if value.isdigit() or (value[1:].isdigit() and value[0] == '-') else float('nan') for value in row.split(' ')] for row in input[1].split('\n')]


def setup_stacks(arr):
  build = [[] for _ in range(9 if len(arr) == 8 else 3)]
  for i in range(1, len(arr[0]), 4):
    for stack in arr:
      if stack[i].isalpha() and stack[i].isupper():
        build[i // 4].append(stack[i])
  return build


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
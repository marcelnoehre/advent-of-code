import re
import json

def main():
  print(part_1())
  print(part_2())


def remove(input_obj):
  if isinstance(input_obj, dict):
    return {k: remove(v) for k, v in input_obj.items()} if "red" not in input_obj.values() else {}
  elif isinstance(input_obj, list):
    return [remove(v) for v in input_obj]
  else:
    return input_obj

def part_1():
  return sum([int(x) for x in re.compile(r"(?<![\"\d-])-?\d+(?![\"\d])").findall(input)])

def part_2():
  return sum([int(x) for x in re.compile(r"(?<![\"\d-])-?\d+(?![\"\d])").findall(json.dumps(json.dumps(json.dumps(remove(json.loads(input))))))])
  

def setup(path):
  global input

  with open(path, 'r') as file:
    input = file.read()


if __name__ == '__main__':
  setup('../puzzle.txt')
  main()
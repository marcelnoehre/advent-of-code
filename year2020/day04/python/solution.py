import re

def main():
    with open('../puzzle.txt') as file:
        input = [passport.split() for passport in file.read().split('\n\n')]
    
    print(part_1(input))
    print(part_2(input))


def part_1(input):
    required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    return len([passport for passport in input if all(field in {seq.split(":")[0] for seq in passport} for field in required)])


def part_2(input):
    return len([passport for passport in input if validate(dict([entry.split(':') for entry in passport]))])


def validate(passport_dict):
    fields = {
        'byr': (1920, 2002),
        'iyr': (2010, 2020),
        'eyr': (2020, 2030),
        'hcl': r'^#[0-9a-f]{6}$',
        'ecl': ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
        'pid': r'^\d{9}$'
    }

    for field, rule in fields.items():
        if field not in passport_dict:
            return False
        
        if isinstance(rule, tuple):
            if not (rule[0] <= int(passport_dict[field]) <= rule[1]):
                return False
            
        elif isinstance(rule, str):
            if not re.match(rule, passport_dict[field]):
                return False
            
        elif isinstance(rule, list):
            if passport_dict[field] not in rule:
                return False
    
    if 'hgt' in passport_dict:
        hgt_value = passport_dict['hgt'][:-2]
        hgt_unit = passport_dict['hgt'][-2:]
        if hgt_unit == "cm" and 150 <= int(hgt_value) <= 193:
            return True
        
        elif hgt_unit == "in" and 59 <= int(hgt_value) <= 76:
            return True
    
    return False


if __name__ == '__main__':
    main()
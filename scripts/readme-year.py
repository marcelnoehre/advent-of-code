import os
import re
import requests

def main():
    year = input('Year:')
    remove_empty_folders('year' + year)
    response = requests.get(f'https://adventofcode.com/{year}', cookies={'session': os.getenv('AOC_SESSION_COOKIE')})

    with open(os.path.join('templates', 'readme', 'readme-year.md'), 'r', encoding='utf-8') as f:
        readme = f.read()
    
    with open(os.path.join(f'year{year}', 'README.md'), 'w', encoding='utf-8') as f:
        overview = parser(response.text, year)
        f.write(readme.replace('{YYYY}', year)
                .replace('{TYPESCRIPT_OVERVIEW}', overview['typescript'])
                .replace('{JAVA_OVERVIEW}', overview['java'])
                .replace('{PYTHON_OVERVIEW}', overview['python']))


def parser(response, year):
    templates = {
        2: '[<img src="https://badgen.net/badge/{DAY}/★★/yellow">](https://github.com/marcelnoehre/advent-of-code/tree/master/year{YEAR}/day{DAY}/{LANG})\n',
        1: '[<img src="https://badgen.net/badge/{DAY}/★☆/gray">](https://github.com/marcelnoehre/advent-of-code/tree/master/year{YEAR}/day{DAY}/{LANG})\n',
        0: '![{DAY}](https://badgen.net/badge/{DAY}/☆☆/black)\n',
    }

    overview = {
        'typescript': '',
        'java': '',
        'python': ''
    }

    two_stars = re.findall(r'aria-label="Day (\d+), two stars"', response, re.DOTALL)

    for lang in ['typescript', 'java', 'python']:
        for day in range(1, 26):
            day_str = ('0' + str(day)) if day < 10 else str(day)

            if os.path.exists(os.path.join('year' + year, 'day' + day_str, lang)):
                overview[lang] += templates[2 if str(day) in two_stars else 1].replace('{DAY}', day_str).replace('{YEAR}', year).replace('{LANG}', lang)
                
            else:
                overview[lang] += templates[0].replace('{DAY}', day_str)
            
            if day % 5 == 0 and day != 25:
                overview[lang] += '\n'

    return overview


def remove_empty_folders(directory):
    for folder_name, subfolders, file_names in os.walk(directory, topdown=False):
        for subfolder in subfolders:
            folder_path = os.path.join(folder_name, subfolder)
            
            if not any(os.listdir(folder_path)):
                os.rmdir(folder_path)
                print(f"Removed empty folder: {folder_path}")


if __name__ == '__main__':
    main()
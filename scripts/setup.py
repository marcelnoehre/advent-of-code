import os
import shutil
import requests

def main():
    year = input('Year:')
    day = input('Day:')
    lang = input('Lang:')
    while lang not in ['typescript', 'java', 'python']: lang = input('Lang:').lower()

    remove_empty_folders('year' + year)
    response = requests.get(f'https://adventofcode.com/{year}/day/{day}/input', cookies={'session': os.getenv('AOC_SESSION_COOKIE')})

    if response.status_code == 200:
        os.makedirs(os.path.dirname(os.path.join(f'year{year}', f'day{day if int(day) > 9 else '0' + day}')), exist_ok=True)
        shutil.copytree(os.path.join('templates', (lang + day) if int(day) == 25 else lang), os.path.join(f'year{year}', f'day{day if int(day) > 9 else '0' + day}', lang))

        if lang == 'typescript':
            with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else '0' + day}', lang, 'solution.spec.ts'), 'r', encoding='utf-8') as f:
                ts_spec = f.read()

            with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else '0' + day}', lang, 'solution.spec.ts'), 'w', encoding='utf-8') as f:
                f.write(ts_spec.replace('Advent of Code {YYYY}, Day {DD}', f'Advent of Code {year}, Day {day if int(day) > 9 else '0' + day}'))

        elif lang == 'java':
            with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else '0' + day}', lang, 'Solution.java'), 'r', encoding='utf-8') as f:
                java = f.read()

            with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else '0' + day}', lang, 'Solution.java'), 'w', encoding='utf-8') as f:
                f.write(java.replace('package yearYYYY.dayDD.java;', f'package year{year}.day{day if int(day) > 9 else '0' + day}.java;'))

        with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else '0' + day}', 'puzzle.txt'), 'w', encoding='utf-8') as f:
            f.write(response.text)

        if not os.path.exists(os.path.join(f'year{year}', f'day{day if int(day) > 9 else '0' + day}', 'example.txt')):
            with open(os.path.join(f'year{year}', f'day{day if int(day) > 9 else '0' + day}', 'example.txt'), 'w', encoding='utf-8') as f:
                pass

    else:
        print(f'Failed to retrieve puzzle input. Response: {response.status_code, response.text}')


def remove_empty_folders(directory):
    for folder_name, subfolders, file_names in os.walk(directory, topdown=False):
        for subfolder in subfolders:
            folder_path = os.path.join(folder_name, subfolder)
            if not any(os.listdir(folder_path)):
                os.rmdir(folder_path)
                print(f"Removed empty folder: {folder_path}")


if __name__ == '__main__':
    main()
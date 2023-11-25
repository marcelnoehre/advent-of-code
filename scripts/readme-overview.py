import os
import re
import requests
from bs4 import BeautifulSoup

def main():
    with open(os.path.join('templates', 'readme', 'readme-overview.md'), 'r', encoding='utf-8') as f:
        readme = f.read()

    with open('README.md', 'w', encoding='utf-8') as f:
        for year in range(2022, 2014, -1): 
            readme += parse(str(year))
        f.write(readme)


def parse(year):
    remove_empty_folders('year' + year)
    response = requests.get(f'https://adventofcode.com/{year}', cookies={'session': os.getenv('AOC_SESSION_COOKIE')})

    templates = {
        'start': '<table><tr><th colspan="10" style="text-align:center">{YYYY}</th></tr>',
        'row1': '<tr><td><a href="{HREF}">{DD}{LANGS}</a></td>', 
        'row0': '<td><a href="{HREF}">{DD}{LANGS}</a></td></tr>',
        'row': '<td><a href="{HREF}">{DD}{LANGS}</a></td>',
        'lang': '<img height="20" src="assets/{LANG}.svg">',
        'href': 'https://github.com/marcelnoehre/advent-of-code/tree/master/year{YYYY}/day{DD}',
        'aoc': 'https://github.com/marcelnoehre/advent-of-code',
        'end': '</table><hr>'
    }
    
    html = templates['start'].replace('{YYYY}', year)

    for day in range(1, 26):
        day_str = ('0' + str(day)) if day < 10 else str(day)
        if str(day) in re.findall(r'aria-label="Day (\d+)"', response.text, re.DOTALL):
            href, langs = templates['aoc'], ''
        else:
            href = templates['href'].replace('{YYYY}', year).replace('{DD}', day_str)
            langs = ''.join(templates['lang'].replace('{LANG}', lang) for lang in ['typescript', 'java', 'python'] if os.path.exists(os.path.join('year' + year, 'day' + day_str, lang)))

        html += (templates['row1'] if day % 5 == 1 else (templates['row0'] if day % 5 == 0 else templates['row'])).replace('{HREF}', href).replace('{DD}', day_str).replace('{LANGS}', langs)

    return BeautifulSoup(html + templates['end'], "html.parser").prettify()


def remove_empty_folders(directory):
    for folder_name, subfolders, file_names in os.walk(directory, topdown=False):
        for subfolder in subfolders:
            folder_path = os.path.join(folder_name, subfolder)
            
            if not any(os.listdir(folder_path)):
                os.rmdir(folder_path)
                print(f"Removed empty folder: {folder_path}")


if __name__ == '__main__':
    main()
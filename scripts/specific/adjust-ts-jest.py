import os

def main():
    for year in range(2024, 2014, -1): 
        remove_empty_folders('year' + str(year))
        
        for day in range(1, 26):
            day_str = ('0' + str(day)) if day < 10 else str(day)
            year = str(year)

            if os.path.exists(os.path.join(f'year{year}', f'day{day_str}', 'typescript')):
                os.remove(os.path.join(f'year{year}', f'day{day_str}', 'typescript', 'solution.js'))
                
                with open(os.path.join('templates', 'typescript', 'start.sh'), 'r', encoding='utf-8') as f:
                    start_sh = f.read()
    
                with open(os.path.join(f'year{year}', f'day{day_str}', 'typescript', 'start.sh'), 'w', encoding='utf-8') as f:
                    f.write(start_sh)

                with open(os.path.join('templates', 'typescript', 'test.sh'), 'r', encoding='utf-8') as f:
                    test_sh = f.read()
    
                with open(os.path.join(f'year{year}', f'day{day_str}', 'typescript', 'test.sh'), 'w', encoding='utf-8') as f:
                    f.write(test_sh.replace('jest solution-YYYY-DD.spec.ts', f'jest solution-{year}-{day_str}.spec.ts'))

                with open(os.path.join(f'year{year}', f'day{day_str}', 'typescript', 'solution.ts'), 'r', encoding='utf-8') as f:
                    ts = f.read()

                with open(os.path.join(f'year{year}', f'day{day_str}', 'typescript', 'solution.ts'), 'w', encoding='utf-8') as f:
                    f.write(ts.replace('function part_1', 'export function part_1').replace('function part_2', 'export function part_2')
                            .replace("const file:any = readFileSync('../puzzle.txt', 'utf-8')", "const file:any = readFileSync('../' + (process.argv[2] === 'puzzle' ? 'puzzle' : 'example') +  '.txt', 'utf-8')")
                            .replace("console.log(part_1());\nconsole.log(part_2());", "if(process.argv[2] === 'puzzle') {\n    console.log(part_1());\n    console.log(part_2());\n}").replace('arr', 'input'))

                with open(os.path.join('templates', 'typescript', 'solution.spec.ts'), 'r', encoding='utf-8') as f:
                    spec_ts = f.read()

                with open(os.path.join(f'year{year}', f'day{day_str}', 'typescript', 'solution.spec.ts'), 'w', encoding='utf-8') as f:
                    f.write(spec_ts.replace('Advent of Code {YYYY}, Day {DD}', f'Advent of Code {year}, Day {day_str}'))

                os.rename(os.path.join(f'year{year}', f'day{day_str}', 'typescript', 'solution.spec.ts'), os.path.join(f'year{year}', f'day{day_str}', 'typescript', f'solution-{year}-{day_str}.spec.ts'))
                
                

def remove_empty_folders(directory):
    for folder_name, subfolders, file_names in os.walk(directory, topdown=False):
        for subfolder in subfolders:
            folder_path = os.path.join(folder_name, subfolder)
            if not any(os.listdir(folder_path)):
                os.rmdir(folder_path)
                print(f"Removed empty folder: {folder_path}")


if __name__ == '__main__':
    main()
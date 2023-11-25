import os
import shutil

def main():
    for year in range(2022, 2014, -1):
        remove_unused_items('year' + str(year))
        replace_tabs('year' + str(year))


def remove_unused_items(directory):
    for folder_name, subfolders, file_names in os.walk(directory, topdown=False):
        for subfolder in subfolders:
            folder_path = os.path.join(folder_name, subfolder)

            if any(os.listdir(folder_path)):
                for item in os.listdir(folder_path):
                    item_path = os.path.join(folder_path, item)
                    
                    if item.endswith(".class"):
                        os.remove(item_path)
                        print(f"Removed class file: {item_path}")

                    if item == '__pycache__' and os.path.isdir(item_path):
                        shutil.rmtree(item_path)
                        print(f"Removed pycache: {item_path}")

            if not any(os.listdir(folder_path)):
                os.rmdir(folder_path)
                print(f"Removed empty folder: {folder_path}")


def replace_tabs(directory):
    for folder_name, subfolders, file_names in os.walk(directory, topdown=False):
        for subfolder in subfolders:
            folder_path = os.path.join(folder_name, subfolder)

            for item in os.listdir(folder_path):
                item_path = os.path.join(folder_path, item)

                if os.path.isdir(item_path):
                    for file in os.listdir(item_path):
                        file_path = os.path.join(item_path, file)

                        with open(file_path, 'r') as f:
                            lines = f.readlines()

                        lines = [line.rstrip().replace('    ', '  ') for line in lines]
                        
                        with open(file_path, 'w') as f:
                            f.writelines('\n'.join(lines))


if __name__ == '__main__':
    main()
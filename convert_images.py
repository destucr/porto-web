
from PIL import Image
import os

input_dir = 'public/images/logo'
output_dir = 'public/images/logo'

files = [
    ('logo-dark.png', 'logo-dark.webp'),
    ('logo-light.png', 'logo-light.webp')
]

for input_file, output_file in files:
    input_path = os.path.join(input_dir, input_file)
    output_path = os.path.join(output_dir, output_file)
    
    if os.path.exists(input_path):
        print(f"Converting {input_file} to {output_file}...")
        try:
            with Image.open(input_path) as im:
                im.save(output_path, 'WEBP', quality=80)
            print(f"Successfully converted {input_file} to {output_file}")
        except Exception as e:
            print(f"Error converting {input_file}: {e}")
    else:
        # Check for different casing if lowercase fails
        input_file_capitalized = input_file.replace('logo','Logo').replace('dark','Dark').replace('light','Light')
        # Actually let's just try case insensitive search or try capitalized versions
        # The file system listing showed lowercase, so lowercase should work.
        # But just in case, let's try reading the directory listing to be robust.
        print(f"File {input_file} not found directly. Checking directory...")
        
        # Simple fallback logic: if file not found, try to find it in the dir
        for f in os.listdir(input_dir):
            if f.lower() == input_file.lower():
                print(f"Found {f} matching {input_file} (case-insensitive). using that.")
                input_path = os.path.join(input_dir, f)
                with Image.open(input_path) as im:
                    im.save(output_path, 'WEBP', quality=80)
                print(f"Successfully converted {f} to {output_file}")
                break
        else:
            print(f"Could not find {input_file} in {input_dir}")


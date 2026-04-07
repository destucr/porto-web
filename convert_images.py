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
        print(f"Resizing and converting {input_file} to {output_file}...")
        try:
            with Image.open(input_path) as im:
                # Resize for logos (128px is more than enough for a 48px logo)
                im.thumbnail((256, 256)) 
                # Save as WebP with high compression
                im.save(output_path, 'WEBP', quality=85)
            print(f"Successfully converted and shrunk {input_file} to {output_file}")
        except Exception as e:
            print(f"Error converting {input_file}: {e}")
    else:
        print(f"File {input_file} not found in {input_dir}")

# Cleanup the huge original PNGs to prevent accidental bundling
for f, _ in files:
    p = os.path.join(input_dir, f)
    if os.path.exists(p):
        os.remove(p)
        print(f"Removed large original: {f}")

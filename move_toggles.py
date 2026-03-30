import os
import re

directory = r'd:\PROJECT\Picnic_popup'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

for filename in html_files:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Track changes
    original_content = content

    # 1. Update theme toggle in header (if it doesn't already have hidden lg:block)
    if 'class="theme-toggle ' not in content:
        content = re.sub(
            r'<button id="theme-toggle"\s+class="([^"]*)">((?:.|\n)*?)</button>',
            r'<button id="theme-toggle" class="theme-toggle hidden lg:block \1">\2</button>',
            content
        )

    # 2. Update RTL toggle in header
    if 'class="rtl-toggle ' not in content:
        content = re.sub(
            r'<button id="rtl-toggle"\s+class="([^"]*)">([^<]*)</button>',
            r'<button id="rtl-toggle" class="rtl-toggle hidden lg:block \1">\2</button>',
            content
        )

    # 3. Add to mobile menu
    if 'theme-toggle p-2' not in content:
        mobile_toggles = '''
        <!-- Toggles (Mobile View) -->
        <div class="flex items-center space-x-6 py-4">
            <button class="theme-toggle p-2 hover:text-primary transition-colors"></button>
            <button class="rtl-toggle px-4 py-1.5 text-sm border border-primary text-primary rounded-full uppercase font-semibold">RTL</button>
        </div>
'''
        # Insert before the pt-8 div in mobile menu
        
        content = re.sub(
            r'(<div class="pt-8 flex flex-col items-center space-y-4">)',
            mobile_toggles + r'        \1',
            content
        )

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")

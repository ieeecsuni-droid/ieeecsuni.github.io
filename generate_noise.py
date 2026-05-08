import os
import struct
import zlib
from PIL import Image, ImageDraw, ImageFilter
import random
import math

def crc32(data):
    return struct.pack('>I', zlib.crc32(data) & 0xffffffff)

def chunk(type, data):
    return struct.pack('>I', len(data)) + type + data + crc32(type + data)

# ─── Create base image ───────────────────────────────
width, height = 512, 512
img = Image.new('RGB', (width, height), color=(0, 0, 0))
pixels = img.load()

# ─── Color palette (Cyber aesthetic) ───────────────
colors = {
    'dark': (5, 7, 12),
    'grid': (15, 25, 40),
    'accent': (59, 130, 246),  # Blue
    'glow': (147, 197, 253),   # Light blue
    'cyan': (34, 211, 238),
    'purple': (139, 92, 246),
}

# ─── 1. Create grid pattern (circuit-like) ──────────
grid_size = 16
for x in range(width):
    for y in range(height):
        # Base
        r, g, b = colors['dark']
        
        # Grid lines
        if (x % grid_size == 0 or y % grid_size == 0):
            r, g, b = colors['grid']
            
            # Make some lines brighter (circuit nodes)
            if (x % (grid_size * 3) == 0 and y % (grid_size * 3) == 0):
                r, g, b = colors['accent']
        
        pixels[x, y] = (r, g, b)

# ─── 2. Add scanlines (CRT effect) ──────────────────
for y in range(height):
    if y % 2 == 0:
        intensity = 0.92  # Slight darkening
        for x in range(width):
            r, g, b = pixels[x, y]
            pixels[x, y] = (int(r * intensity), int(g * intensity), int(b * intensity))

# ─── 3. Add organic circuit paths ────────────────────
draw = ImageDraw.Draw(img, 'RGBA')

# Random circuit nodes and connections
nodes = []
for _ in range(12):
    x = random.randint(50, width - 50)
    y = random.randint(50, height - 50)
    nodes.append((x, y))

# Draw connections with glow
for i in range(len(nodes) - 1):
    x1, y1 = nodes[i]
    x2, y2 = nodes[i + 1]
    
    # Draw line
    for j in range(100):
        t = j / 100
        x = int(x1 + (x2 - x1) * t)
        y = int(y1 + (y2 - y1) * t)
        
        # Draw with glow effect
        draw.ellipse([x-1, y-1, x+1, y+1], fill=(59, 130, 246, 80))

# Draw nodes
for x, y in nodes:
    draw.ellipse([x-3, y-3, x+3, y+3], fill=(147, 197, 253, 200))
    draw.ellipse([x-6, y-6, x+6, y+6], outline=(59, 130, 246, 100), width=1)

# ─── 4. Add subtle noise/grain ──────────────────────
for _ in range(width * height // 500):
    x = random.randint(0, width - 1)
    y = random.randint(0, height - 1)
    r, g, b = pixels[x, y]
    
    # Add minimal grain
    grain = random.randint(-5, 5)
    r = max(0, min(255, r + grain))
    g = max(0, min(255, g + grain))
    b = max(0, min(255, b + grain))
    
    pixels[x, y] = (r, g, b)

# ─── 5. Add subtle vignette ─────────────────────────
for x in range(width):
    for y in range(height):
        distance = math.sqrt((x - width/2)**2 + (y - height/2)**2)
        max_distance = math.sqrt(width**2 + height**2) / 2
        vignette = 1 - (distance / max_distance) * 0.15
        
        r, g, b = pixels[x, y]
        pixels[x, y] = (int(r * vignette), int(g * vignette), int(b * vignette))

# ─── 6. Add blue chromatic aberration hints ────────
for x in range(0, width, 4):
    for y in range(0, height, 4):
        if random.random() > 0.97:
            r, g, b = pixels[x, y]
            # Enhance blue channel slightly
            pixels[x, y] = (r, g, min(255, b + 30))

# ─── Apply slight blur for sophistication ──────────
img = img.filter(ImageFilter.GaussianBlur(radius=0.5))

# ─── Save as PNG ────────────────────────────────────
output_path = 'ieeeCSUNI-fronted/public/cyber-texture.png'
os.makedirs(os.path.dirname(output_path), exist_ok=True)
img.save(output_path, 'PNG')

print(f"Cyber texture generated: {output_path}")
print(f"  Resolution: {width}x{height}")
print(f"  Features: Grid pattern, Scanlines, Circuit nodes, Vignette, Grain")
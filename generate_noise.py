import os
import random
import struct
import zlib

def crc32(data):
    return struct.pack('>I', zlib.crc32(data) & 0xffffffff)

def chunk(type, data):
    return struct.pack('>I', len(data)) + type + data + crc32(type + data)

width=256
height=256
pixels = b''
for y in range(height):
    pixels += b'\x00' + bytes([random.randint(0,255) for _ in range(width*3)])

idat = zlib.compress(pixels)
png = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)) + chunk(b'IDAT', idat) + chunk(b'IEND', b'')

with open('ieeeCSUNI-fronted/public/noise.png', 'wb') as f:
    f.write(png)

print("Noise texture generated.")

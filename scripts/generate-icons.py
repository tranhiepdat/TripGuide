from pathlib import Path

from PIL import Image, ImageDraw


OUTPUT = Path(__file__).resolve().parents[1] / "public"


def build_icon(size: int, filename: str) -> None:
    scale = size / 512
    image = Image.new("RGB", (size, size), "#14261f")
    draw = ImageDraw.Draw(image)

    radius = round(108 * scale)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill="#14261f")
    draw.ellipse(
        tuple(round(value * scale) for value in (96, 96, 416, 416)),
        outline="#6c7f76",
        width=max(2, round(12 * scale)),
    )
    for line in ((256, 92, 256, 122), (256, 390, 256, 420), (92, 256, 122, 256), (390, 256, 420, 256)):
        draw.line(tuple(round(value * scale) for value in line), fill="#f4f0e7", width=max(2, round(11 * scale)))

    pin = [(256, 424), (198, 354), (154, 290), (142, 244), (149, 199), (173, 161),
           (210, 137), (256, 129), (302, 137), (339, 161), (363, 199), (370, 244),
           (358, 290), (314, 354)]
    draw.polygon([(round(x * scale), round(y * scale)) for x, y in pin], fill="#f39a5e")
    draw.ellipse(
        tuple(round(value * scale) for value in (205, 196, 307, 298)),
        fill="#f6f2e9",
    )
    compass = [(274, 220), (262, 255), (227, 268), (239, 232)]
    draw.polygon([(round(x * scale), round(y * scale)) for x, y in compass], fill="#1c3b30")
    image.save(OUTPUT / filename, "PNG", optimize=True)


for icon_size, icon_name in ((180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
    build_icon(icon_size, icon_name)

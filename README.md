# vdx

```sh
# Crop
$ vdx input.mp4 --crop 0 0 240 160

# Convert to GIF
$ vdx input.mp4 --gif

# Strip audio
$ vdx input.mp4 --no-audio

# Resize
$ vdx input.mp4 --resize 640 360

# Trim
$ vdx input.mp4 --trim 0:05 0:20

# Multiple
$ vdx '*.mp4' --resize 640 360 --no-audio --trim 0:05 0:20 --output build --parallel 2
```

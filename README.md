# vdx

> A simple, opinionated CLI for common video processing tasks.

```sh
# Crop
$ vdx input.mp4 --crop 0,0,200,100
$ vdx input.mp4 --crop 200,100

# Convert to GIF
$ vdx input.mp4 --format gif

# Remove audio
$ vdx input.mp4 --no-audio

# Resize
$ vdx input.mp4 --resize 360,640

# Trim
$ vdx input.mp4 --trim 0:03
$ vdx input.mp4 --trim 0:03,0:14
$ vdx input.mp4 --trim 3
$ vdx input.mp4 --trim 3,14

# Multiple
$ vdx '*.mp4' --no-audio --resize 360,640 --trim 0:03,0:14 --output build --parallel 2
```

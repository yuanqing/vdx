# vdx [![npm Version](https://img.shields.io/npm/v/vdx?cacheSeconds=1800)](https://www.npmjs.org/package/vdx) [![build](https://github.com/yuanqing/vdx/workflows/build/badge.svg)](https://github.com/yuanqing/vdx/actions?query=workflow%3Abuild)

> An intuitive CLI for processing video, powered by [FFmpeg](https://ffmpeg.org)

- Crop, trim, resize, reverse, rotate, remove audio, change the speed, change the frame rate, change the volume, convert to a different file format
- Run multiple operations on multiple video files concurrently

## Quick start

*Requires [FFmpeg](https://ffmpeg.org) and [Node.js](https://nodejs.org).*

```sh
$ npm install --global vdx
```

A variety of common video processing operations are supported:

```sh
$ vdx '*.mov' --crop 360,640    # Crop to width 360, height 640
$ vdx '*.mov' --format gif      # Convert to GIF
$ vdx '*.mov' --fps 12          # Change the frame rate to 12
$ vdx '*.mov' --no-audio        # Remove audio
$ vdx '*.mov' --resize 360,-1   # Resize to width 360, maintaining the aspect ratio
$ vdx '*.mov' --reverse         # Reverse
$ vdx '*.mov' --rotate 90       # Rotate 90 degrees clockwise
$ vdx '*.mov' --speed 2         # Double the speed
$ vdx '*.mov' --trim 0:05,0:10  # Trim from 0:05 to 0:10
$ vdx '*.mov' --volume 0.5      # Halve the volume
```

We can also run multiple operations all at once:

```sh
$ vdx '*.mov' --format gif --fps 12 --resize 360,640 --speed 2 --trim 0:05,0:10
```

By default, the processed files will be written to a directory called `./build`. To change this, use the `--output` option:

```sh
$ vdx '*.mov' --format gif --output './gifs'
```

By default, up to 3 video files will be processed concurrently. To change this, use the `--parallel` option:

```sh
$ vdx '*.mov' --format gif --output './gifs' --parallel 5
```

## Usage

```
Usage: vdx <files> [options]
```

### &lt;files&gt;

One or more globs of video files to process.

### [options]

Use the `-d` or `--debug` option to print the underlying FFmpeg commands that are being run.

#### -c, --crop

Crop the video to `<width>,<height>` or `<x>,<y>,<width>,<height>`.

```sh
# Crop to width 360, height 640
$ vdx '*.mov' --crop 360,640

# Crop to width 360, height 640, starting from coordinates (10, 20)
$ vdx '*.mov' --crop 10,20,360,640
```

#### -f, --format

Convert the video to a different file format.

```sh
# Convert to GIF
$ vdx '*.mov' --format gif
```

#### -fp, --fps

Change the frame rate of the video.

```sh
# Change the frame rate to 12
$ vdx '*.mov' --fps 12
```

#### --no-audio

Remove audio from the video.

```sh
# Remove audio
$ vdx '*.mov' --no-audio
```

#### -o, --output

Set the output directory. Defaults to `./build`.

```sh
# Output files to './gifs'
$ vdx '*.mov' --format gif --output './gifs'
```

#### -p, --parallel

Set the maximum number of video files to process concurrently. Defaults to `3`.

```sh
# Process up to 5 files concurrently
$ vdx '*.mov' --format gif --parallel 5
```

#### -r, --resize

Resize the video to `<width>,<height>`. Set either `<width>` or `<height>` to `-1` to maintain the aspect ratio.

```sh
# Resize to width 360, height 640
$ vdx '*.mov' --resize 360,640

# Resize to width 360, maintaining the aspect ratio
$ vdx '*.mov' --resize 360,-1

# Resize to height 640, maintaining the aspect ratio
$ vdx '*.mov' --resize -1,640
```

#### -rv, --reverse

Reverse the video.

```sh
# Reverse
$ vdx '*.mov' --reverse
```

#### -ro, --rotate

Rotate the video by `-90`, `90`, or `180` degrees.

```sh
# Rotate 90 degrees clockwise
$ vdx '*.mov' --rotate 90

# Rotate 90 degrees counter-clockwise
$ vdx '*.mov' --rotate -90

# Rotate 180 degrees
$ vdx '*.mov' --rotate 180
```

#### -s, --speed

Change the speed of the video. To slow down, set to a number greater than `0` and less than `1`. To speed up, set to a number greater than `1`.

```sh
# Halve the speed
$ vdx '*.mov' --speed 0.5

# Double the speed
$ vdx '*.mov' --speed 2
```

#### -t, --trim

Trim to `<start>,<end>` where `<start>` and `<end>` are timestamps in the format `HH:MM` or `HH:MM.mmm`. Omit `<end>` to trim from `<start>` to the end of the video.

```sh
# Trim from 0:05 to 0:10
$ vdx '*.mov' --trim 0:05,0:10

# Trim from 0:05 to the end of the video
$ vdx '*.mov' --trim 0:05
```

#### -vo, --volume

Change the volume of the video. To remove audio from the video, set to `0`. To decrease the volume, set to a number greater than `0` and less than `1`. To increase the volume, set to a number greater than `1`.

```sh
# Remove audio from the video
$ vdx '*.mov' --volume 0

# Halve the volume
$ vdx '*.mov' --volume 0.5

# Double the volume
$ vdx '*.mov' --volume 2
```

## Installation

```sh
$ npm install --global vdx
```

## Docker

Build:

```sh
$ docker build -t local/vdx .
```

Use:

```sh
$ docker run --rm -u $(id -u):$(id -g) \
    -v /home/me/Videos/:/files/ \
    local/vdx '*.mp4' --output=./output
```

## Prior art

- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

## See also

- [FFmpeg Cheatsheet](https://github.com/yuanqing/ffmpeg-cheatsheet)

## License

[MIT](/LICENSE.md)

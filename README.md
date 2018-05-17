# vdx [![npm Version](https://img.shields.io/npm/v/vdx.svg?style=flat)](https://www.npmjs.org/package/vdx) [![Build Status](https://img.shields.io/travis/yuanqing/vdx.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/vdx)

> An intuitive CLI for processing video, powered by [FFmpeg.](https://www.ffmpeg.org/)

- Crop, trim, resize, reverse, rotate, strip audio, change the speed, change the frame rate, change the volume, convert between file formats
- Run multiple operations on multiple files concurrently

## Installation

Ensure that you have the latest versions of [FFmpeg](https://www.ffmpeg.org/) and [Node.js](https://nodejs.org/) installed. Then:

```sh
$ npm install --global vdx
```

## Quick start

A variety of common video processing operations are supported:

```sh
$ vdx '*.mov' --crop 360,640    # Crop to width 360, height 640
$ vdx '*.mov' --format gif      # Convert to GIF
$ vdx '*.mov' --fps 12          # Set the frame rate to 12
$ vdx '*.mov' --no-audio        # Strip audio
$ vdx '*.mov' --resize 360,-1   # Resize to width 360, maintaining aspect ratio
$ vdx '*.mov' --reverse         # Reverse
$ vdx '*.mov' --rotate 90       # Rotate 90 degrees clockwise
$ vdx '*.mov' --speed 2         # Double the speed
$ vdx '*.mov' --trim 0:05,0:10  # Trim from time 0:05 to 0:10
$ vdx '*.mov' --volume 0.5      # Halve the volume
```

Running multiple operations all at once is also supported:

```sh
$ vdx '*.mov' --format gif --fps 12 --resize 360,640 --speed 2 --trim 0:05,0:10
```

By default, the processed files will be written to a directory called `./build`. To change this, use the `--output` flag:

```sh
$ vdx '*.mov' --format gif --output './gifs'
```

By default, up to 3 input files will be processed concurrently. To change this, use the `--parallel` flag:

```sh
$ vdx '*.mov' --format gif --output './gifs' --parallel 5
```

## CLI

```sh
Usage: vdx [input] [options]
```

### [input]

Globs of input files to process. Read from `stdin` if not specified.

### [options]

#### -c, --crop [&lt;x&gt;,&lt;y&gt;,]&lt;width&gt;,&lt;height&gt;

```sh
# Crop to width 360, height 640
$ vdx '*.mov' --crop 360,640

# Crop to width 360, height 640, starting from coordinate (10, 20)
$ vdx '*.mov' --crop 10,20,360,640
```

#### -f, --format &lt;format&gt;

```sh
# Convert to GIF
$ vdx '*.mov' --format gif
```

#### -fp, --fps &lt;fps&gt;

```sh
# Set the frame rate to 12
$ vdx '*.mov' --fps 12
```

#### -na, --no-audio

```sh
# Strip audio
$ vdx '*.mov' --no-audio
```

#### -o, --output &lt;directory&gt;

`<directory>` defaults to `'./build'`

```sh
# Write files to './gifs'
$ vdx '*.mov' --format gif --output './gifs'
```

#### -p, --parallel &lt;concurrency&gt;

`<concurrency>` defaults to `3`

```sh
# Process up to 5 files concurrently
$ vdx '*.mov' --format gif --parallel 5
```

#### -r, --resize &lt;width&gt;,&lt;height&gt;

```sh
# Resize to width 360, height 640
$ vdx '*.mov' --resize 360,640

# Resize to width 360, maintaining the aspect ratio
$ vdx '*.mov' --resize 360,-1

# Resize to height 640, maintaining the aspect ratio
$ vdx '*.mov' --resize -1,640
```

#### -ro, --rotate

```sh
# Rotate 90 degrees clockwise
$ vdx '*.mov' --rotate 90

# Rotate 90 degrees counter-clockwise
$ vdx '*.mov' --rotate -90

# Rotate 180 degrees
$ vdx '*.mov' --rotate 180
```

#### -rv, --reverse

```sh
# Reverse
$ vdx '*.mov' --reverse
```

#### -s, --speed &lt;speed&gt;

```sh
# Halve the speed
$ vdx '*.mov' --speed 0.5

# Double the speed
$ vdx '*.mov' --speed 2
```

#### -t, --trim &lt;start&gt;[,&lt;end&gt;]

```sh
# Trim from time 0:05 to the end of the input file
$ vdx '*.mov' --trim 0:05

# Trim from time 0:05 to 0:10
$ vdx '*.mov' --trim 0:05,0:10
```

#### -vo, --volume &lt;volume&gt;

```sh
# Halve the volume
$ vdx '*.mov' --volume 0.5

# Double the volume
$ vdx '*.mov' --volume 2
```

## Related

- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

## License

[MIT](LICENSE.md)

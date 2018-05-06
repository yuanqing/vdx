<div align="center">

# vdx

***An intuitive CLI for processing video and audio, powered by [FFmpeg.](https://www.ffmpeg.org/)***

[![npm Version](https://img.shields.io/npm/v/vdx.svg?style=flat)](https://www.npmjs.org/package/vdx) [![Build Status](https://img.shields.io/travis/yuanqing/vdx.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/vdx) [![Prettier](https://img.shields.io/badge/code_style-prettier-41718c.svg)](https://prettier.io) [![JavaScript Standard Style](https://img.shields.io/badge/code_style-standard-e0c807.svg)](https://standardjs.com)

</div>

- Crop, trim, resize, speed up, slow down, change the frame rate, strip audio, convert between file formats
- Run multiple operations on multiple files concurrently

<div align="center">

[**Installation**](#installation) &nbsp;&middot;&nbsp; [**Usage**](#usage) &nbsp;&middot;&nbsp; [**Related**](#related) &nbsp;&middot;&nbsp; [**License**](#license)

</div>

---

## Installation

Ensure that you have the latest versions of [FFmpeg](https://www.ffmpeg.org/) and [Node.js](https://nodejs.org/) installed. Then:

```sh
$ npm install --global vdx
```

## Usage

```sh
vdx [input] [options]
```

### [input]

Globs of input files to process. Read from `stdin` if not specified.

### [options]

#### -c, --crop [&lt;x&gt;,&lt;y&gt;,]&lt;width&gt;,&lt;height&gt;

```sh
# Crop to a rectangle starting from coordinate (0, 0), with width 360 and height 640
$ vdx input.mov --crop 360,640

# Crop to a rectangle starting from coordinate (10, 20), with width 360 and height 640
$ vdx input.mov --crop 10,20,360,640
```

#### -f, --format &lt;format&gt;

```sh
# Convert to GIF
$ vdx input.mov --format gif
```

#### -x, --fps &lt;fps&gt;

```sh
# Set the frame rate to 12
$ vdx input.mov --fps 12
```

#### -n, --no-audio

```sh
# Strip audio
$ vdx input.mov --no-audio
```

#### -r, --resize &lt;width&gt;,&lt;height&gt;

```sh
# Resize to width 360 and height 640
$ vdx input.mov --resize 360,640

# Resize to width 360, maintaining the aspect ratio
$ vdx input.mov --resize 360,-1

# Resize to height 640, maintaining the aspect ratio
$ vdx input.mov --resize -1,640
```

#### -o, --output &lt;directory&gt;

`<directory>` defaults to `'./build'`

```sh
# Write files to the './gifs' directory
$ vdx '*.mov' --format gif --output './gifs'
```

#### -p, --parallel &lt;concurrency&gt;

`<concurrency>` defaults to `3`

```sh
# Process up to 5 files concurrently
$ vdx '*.mov' --format gif --parallel 5
```

#### -s, --speed &lt;speed&gt;

```sh
# Halve the speed
$ vdx input.mov --speed 0.5

# Double the speed
$ vdx input.mov --speed 2
```

#### -t, --trim &lt;start&gt;[,&lt;end&gt;]

```sh
# Trim out a clip from 0:05 to the end of the input file
$ vdx input.mov --trim 0:05

# Trim out a clip from 0:05 to 0:10
$ vdx input.mov --trim 0:05,0:10
```

---

### Running multiple operations on multiple files

```sh
$ vdx '*.mov' --format gif --fps 12 --output './gifs' --parallel 5 --resize 360,640 --trim 0:05,0:10
```

## Related

- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

## License

[MIT](LICENSE.md)

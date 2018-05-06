# vdx

> A simple way to process video on the terminal, powered by [FFmpeg](https://www.ffmpeg.org/).

## Quick start

Requires [FFmpeg](https://www.ffmpeg.org/) and [Node.js](https://nodejs.org/).

```sh
$ npm install --global vdx
```

```sh
$ ls
input.mov

# Crop
$ vdx input.mov --crop 0,0,200,100
$ vdx input.mov --crop 200,100

# Convert to GIF
$ vdx input.mov --format gif

# Remove audio
$ vdx input.mov --no-audio

# Resize
$ vdx input.mov --resize 360,640

# Trim
$ vdx input.mov --trim 0:03
$ vdx input.mov --trim 0:03,0:14
$ vdx input.mov --trim 3
$ vdx input.mov --trim 3,14

# Multiple
$ vdx '*.mov' --no-audio --resize 360,640 --trim 0:03,0:14 --output build --parallel 2
```

## Usage

```
Usage: vdx [input] [options]

Input:
  Glob of input files. Reads from stdin if not specified.

Options:
  -c, --crop <options>  Crop the input files. <options> is one of
                        <x>,<y>,<width>,<height> or <width>,<height>.
  -f, --format <format>  Set the format of the output files.
  -x  --fps <fps>  Set the frame rate.
  -g, --gif  Shorthand for \`--format gif\`
  -h, --help  Print this message.
  -n, --no-audio  Remove audio from the input files.
  -o, --output <directory>  Set the output directory. Defaults
                            to 'build'.
  -p, --parallel <concurrency>  Set the maximum number of files to
                                process at any one time.
  -r, --resize <options>  Resize the input files. <options> is
                          specified as <width>,<height>.
  -s, --speed <speed>  Set the speed of the input files. To slow down
                       the video, set <speed> to a number between 0
                       and 1. To speed up the video, set <speed> to a
                       number greater than 1.
  -t, --trim <options>  Trim the input files to a specific duration.
                        <options> is either <start>,<end> or <end>.
  -v, --version  Print the version number.
```

## Installation

```sh
$ npm install --global vdx
```

Or:

```sh
$ yarn global add vdx
```

## License

[MIT](LICENSE.md)

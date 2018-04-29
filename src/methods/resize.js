function resize (options) {
  // https://superuser.com/questions/624563/how-to-resize-a-video-to-make-it-smaller-with-ffmpeg
  return {
    s: `${options.width}x${options.height}`
  }
}

module.exports = resize

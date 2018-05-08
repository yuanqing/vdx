const flagsTransforms = require('./transforms/flags')
const audioFiltersTransforms = require('./transforms/audio-filters')
const videoFiltersTransforms = require('./transforms/video-filters')

function createFlags (options) {
  return Object.keys(flagsTransforms).reduce(function (result, key) {
    const flag = flagsTransforms[key](options[key])
    if (flag) {
      return {
        ...result,
        ...flag
      }
    }
    return result
  }, {})
}

function createFilters (transforms, options) {
  const result = Object.keys(transforms).reduce(function (result, key) {
    const value = transforms[key](options[key])
    if (value) {
      result.push(value)
    }
    return result
  }, [])
  if (result.length) {
    return `"${result.join(',')}"`
  }
  return null
}

function createFFmpegOptions (options) {
  return {
    flags: createFlags(options),
    filters: {
      af: createFilters(audioFiltersTransforms, options),
      vf: createFilters(videoFiltersTransforms, options)
    }
  }
}

module.exports = createFFmpegOptions

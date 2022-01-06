// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
require('@tensorflow/tfjs-node') 
const canvas = require('canvas')


const faceapi=require('face-api.js')
// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement, additionally an implementation
// of ImageData is required, in case you want to use the MTCNN
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

module.exports ={ canvas}



# FFmpeg commands
```
# Encode video from image sequence
# from https://gist.github.com/Vestride/278e13915894821e1d6f
ffmpeg -start_number 0 -i %07d.png -vcodec libvpx-vp9 -b:v 1M -framerate 60 -pattern_type sequence test.webm
```
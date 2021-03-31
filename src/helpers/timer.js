// eslint-disable-next-line import/prefer-default-export
export const Timer = {
  on_10_seconds: false,
  set_10_seconds() {
    Timer.on_10_seconds = true
    setTimeout(() => {
      Timer.on_10_seconds = false
    }, 3000)
  },
}

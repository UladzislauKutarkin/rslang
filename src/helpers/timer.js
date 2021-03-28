// eslint-disable-next-line import/prefer-default-export
export const Timer = {
  on_10_seconds: false,
  set_10_seconds() {
    console.log("timer - ", this.on_10_seconds)
    Timer.on_10_seconds = true
    console.log("timer - ", this.on_10_seconds)
    setTimeout(() => {
      Timer.on_10_seconds = false
      console.log("timer - ", this.on_10_seconds)
    }, 3000)
  },
}

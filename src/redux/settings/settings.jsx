export const CHANGE_SETTINGS_TRANSLATE = "CHANGE_SETTINGS_TRANSLATE"
export const CHANGE_SETTINGS_BUTTONS = "CHANGE_SETTINGS_BUTTONS"

const initialState = {
  translate: true,
  buttons: true,
}

const SettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SETTINGS_TRANSLATE:
      return { ...state, translate: action.payload }
    case CHANGE_SETTINGS_BUTTONS:
      return { ...state, buttons: false }
    default:
      return state
  }
}

export const changeSettingsTranslate = (mode) => ({
  type: CHANGE_SETTINGS_TRANSLATE,
  payload: mode,
})

export const changeSettingsButtons = (mode) => ({
  type: CHANGE_SETTINGS_BUTTONS,
  payload: mode,
})
export default SettingsReducer

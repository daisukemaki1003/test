import contentLoaded from "./content_loaded"
import Load from "./load"

document.addEventListener('DOMContentLoaded', () => {
    contentLoaded()
})

window.addEventListener('load', () => {
    Load()
})

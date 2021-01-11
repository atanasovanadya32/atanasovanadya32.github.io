
const extractValue = (idstring) => {
    console.log(idstring)
    const element = document.getElementById(idstring)
    console.log(element.value)
    return element.value
}

const updateButton = document.getElementById("update_button")

updateButton.addEventListener("click", ()=>{
    const object = {}
    object["distance"] = extractValue("distance")
    object["radius"] = extractValue("radius")
    object["wiggle"] = extractValue("wiggle")
    object["orbit_speed"] = extractValue("orbit_speed")
    object["tail_length"] = extractValue("tail_length")
    object["number_of_planets"] = extractValue("number_of_planets")
    universe.update(object)
})
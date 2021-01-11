const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

circ(ctx, {x: canvas.width / 2, y: canvas.height / 2}, 10)

class solarSystem{
    constructor(n){
        this.pos = {x: canvas.width / 2, y: canvas.height / 2}
        this.planets = {}
        this.maxIndex = 0
        this.number_of_planets = 5
        this.distance = 200
        this.radius = 10
        this.orbit_speed = 0.01
        this.tail_length = 100
        this.wiggle = 10
        this.init(n)
        this.occur()
    }
    update(obj) {
        this.distance = obj.distance
        this.radius = obj.radius
        this.wiggle = obj.wiggle
        this.orbit_speed = obj.orbit_speed / 1000
        this.tail_length = obj.tail_length
        this.number_of_planets = obj.number_of_planets
        this.init(this.number_of_planets)   
    }
    addPlanet(distance, angle, speed, radius, color){
        this.planets[this.maxIndex] = new planet(this, distance, angle, speed, radius, color, this.tail_length, this.wiggle)
        this.maxIndex++
    }

    init(n){
        this.planets = {}
        for (let i = 0; i < n; i++){
            const radi = (this.radius / 2) + rand(this.radius)
            this.addPlanet(rand(this.distance), rand(Math.PI * 2), negrand(this.orbit_speed), radi, [rand(255),rand(255),rand(255)])
        }
        Object.keys(this.planets).forEach((id, i) => {
            if(i < 5) {return}
            const len = Object.values(this.planets).length
            const planetLink = this.planets[Object.keys(this.planets)[roundrand(len - 1)]]
            if(planetLink.center.angle) {
                if(planetLink.center.center.angle) {
                    if(planetLink.center.center.center !== this) {return}
                }
            }
            this.planets[id].center = planetLink
        })
        console.log(this.planets)
    }

    happen(){
        Object.keys(this.planets).forEach(planetID => {
            const planet = this.planets[planetID]
            planet.happen()
        })
    }

    occur(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.happen()
        setTimeout(() => {this.occur()}, 0)
    }
}

class planet{
    constructor(center, distance, angle, speed, r, color, tail_length, wiggle){
        this.center = center
        this.distance = distance;
        this.angle = angle;
        this.r = r;
        this.color = color;
        this.targetColor = [rand(255), rand(255), rand(255)]
        this.colChange = 2
        this.speed = speed;
        this.pos = {x: undefined, y: undefined}
        this.positions = []
        this.maxPositions = tail_length
        this.wiggle = wiggle
        this.init()
    }
    init() {
        const x = this.center.pos.x + this.distance*Math.cos(this.angle)
        const y = this.center.pos.y - this.distance*Math.sin(this.angle)
        const pos = {x: x, y: y} 
        this.pos = pos
        console.log(x, y)
    }
    moveColor(){
        let matching = 0
        this.color = this.color.map((v, i) => {
            if(v == this.targetColor[i]) {
                matching++
                return v
            }
            let col = v
           // console.log(v, this.targetColor[i])
            if(v < this.targetColor[i] + 5 && v > this.targetColor[i] - 5) {col = this.targetColor[i]}
            if(col < this.targetColor[i]) {col += this.colChange}
            if(col > this.targetColor[i]) {col -= this.colChange}
            return col
        })
        if(matching > 2) {
            this.targetColor = [roundrand(255), roundrand(255), roundrand(255)]
        }
        //console.log(this.color, this.colChange)
    }
    move(){
        const x = this.center.pos.x + this.distance*Math.cos(this.angle)
        const y = this.center.pos.y - this.distance*Math.sin(this.angle)
        const pos = {x: x, y: y} 
        this.pos = pos
        this.angle += this.speed
        if (this.angle > Math.PI*2){
            this.angle = this.angle - Math.PI*2
        }else if (this.angle < 0){
            this.angle = this.angle + Math.PI*2
        }
        this.positions.unshift(pos)
        if(this.positions.length > this.maxPositions){
            this.positions.pop()
        }
    }

    draw(){
        this.moveColor()
        this.positions.forEach((pos, i) => {
            const r = this.r * (1 - (i / this.positions.length))**2
            const color = this.color.map(v => v - (v * (i / this.positions.length)))
            pos.x += negrand(i*this.wiggle / 100)
            pos.y += negrand(i*this.wiggle / 100)
            circ(ctx, pos, r , `rgb(${color})`)
        })
    }

    happen(){
        this.move()
        this.draw()
    }
}

const universe = new solarSystem(15)
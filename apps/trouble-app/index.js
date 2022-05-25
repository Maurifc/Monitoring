const express = require('express')

const app = express()

app.use(express.json())

function calcChance(percent){
    const random0to100 = Math.random() * 101

    return random0to100 < percent
}

function response301(req, res){
    res.send().status(301)
    console.log(`${req.path} 301 - User has been redirected`)
}

function response400(req, res){
    res.send().status(400)
    console.log(`${req.path} 400 - User's bad request`)
}

function response404(req, res){
    res.send().status(404)
    console.log(`${req.path} 404 - Not found`)
}

function response500(req, res){
    res.send().status(500)
    console.log(`${req.path} 500 - Unknown error`)
}

function response200(req, res, payload){
    res.send(payload).status(200)
    console.log(`${req.path} 200 - Everything is fine`)
}

// Slow requests
app.get('/turtle', async(req, res) => {
    // Introduce random delay (for emulated latency)
    const latencyInMiliseconds = Math.floor(Math.random() * 1000) + 100

    await new Promise(r => setTimeout(r, latencyInMiliseconds)) // Sleep from 100 to 1100ms
    
    res.send()
    console.log(`${req.path} - Latency: ${latencyInMiliseconds}`)
})

// Random response status
app.get('/', async (req, res) => {
    const cars = [
        {car: "Acura RSX"},
        {car: "Audi TT"},
        {car: "Ford Focus"},
        {car: "Maxda RX-7"},
        {car: "Nissa 350Z"},
        {car: "Audi A3"}
    ]

    // 10 percent of chance to redirec user
    if(calcChance(10)){
        response301(req, res)
        return
    }
    
    // 5 percent of chance to get a 400
    if(calcChance(5)){
        response400(req, res)
        return
    }
    
    // 1 percent of chance to get a exception: Unknown error
    if(calcChance(1)){
        response500(req, res)
        return
    }
    
    response200(req, res, cars)
})

// Only responds 400, 404 and 500
app.get('/nightmare', async (req, res) => {
    // 5 percent of change to timeout request
    if(calcChance(5)){
        await new Promise(r => setTimeout(r, 2000)) // Sleep for 2s
        console.log(`${req.path} - Sleep for 2s`);
    }

    // 50 percent of chance to get a exception: Unknown error 500
    if(calcChance(50)){
        response500(req, res)
        return
    }

    // 10 percent of chance to get a 404
    if(calcChance(10)){
        response404(req, res)
        return
    }

    // Else returns a 400
    response400(req, res)
})

app.listen(3000, () => { console.log('Server has started')})
const monstaForm = document.createElement('form')
const monstaWall = document.getElementById('monster-container')
const monstaCreator = document.getElementById('create-monster')
const MONSTER_URL = "http://localhost:3000/monsters"

document.addEventListener('DOMContentLoaded', () => {
    displayMonsters()
})

function displayMonsters(monsters){
    fetch(MONSTER_URL)
    .then(resp => resp.json())
        .then(monsters => {
            monsters.forEach(monster => {
                let monsterCard = document.createElement('div')
                monsterCard.innerHTML = `
                <h2>${monster.name}</h2>
                <h4>${monster.age}</h4>
                <p>${monster.description}</p>`
                monstaWall.append(monsterCard)
        })
    })
}

    monstaForm.innerHTML = `
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button>Create</button>`
    monstaCreator.append(monstaForm)

document.addEventListener('submit', function(e){
    e.preventDefault()
    fetch(`${MONSTER_URL}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "name": e.target.name.value,
            "age":  e.target.age.value,
            "description": e.target.description.value
        })
    }).then(resp => resp.json()).then(monster => {
        let monsterCard = document.createElement('div')
        monsterCard.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>`
        monstaWall.append(monsterCard)
        e.target.reset()
        alert(`${monster.name} added to list!`)
    })
})
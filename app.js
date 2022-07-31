const container = document.createElement("div")
container.classList.add("container")
document.body.appendChild(container)

const todos = document.createElement("div")
todos.classList.add("todo")
container.appendChild(todos)

const h1 = document.createElement("h1")
h1.textContent = "🧠 To do list 📃"
todos.appendChild(h1)

const p = document.createElement("p")
p.textContent = "⛅ What do you want to get done today?"
todos.appendChild(p)

const form = document.createElement("form")
todos.appendChild(form)

const getValue = document.createElement("div")
getValue.classList.add("get-value")
form.appendChild(getValue)

const input = document.createElement("input")
input.setAttribute("type", "text")
input.setAttribute("placeholder", "👉 Enter task")
getValue.appendChild(input)

const description = document.createElement("input")
description.setAttribute("type", "text")
description.setAttribute("placeholder", "📃 Description")
getValue.appendChild(description)

const printData = document.createElement("div")
printData.classList.add("print-data")
form.appendChild(printData)

const sumTask = document.createElement("span")
printData.appendChild(sumTask)

const sumTaskChecked = document.createElement("span")
printData.appendChild(sumTaskChecked)

const br = document.createElement("br")
form.appendChild(br)

const button = document.createElement("button")
button.setAttribute("id", "button")
button.textContent = "Submit"
form.appendChild(button)

const listTodo = document.createElement("div")
listTodo.classList.add("list-todo")
container.appendChild(listTodo)

const todo = document.createElement("ul")
todo.setAttribute("id", "todo")
listTodo.appendChild(todo)

form.addEventListener("submit", (event) => {
    event.preventDefault()
    addTodo()
})

let todoList = []

const deleteBtn = (index) => {
    todoList.splice(index, 1)
    localStorage.setItem('todos', JSON.stringify(todoList))
    render()
}

const addTodo = () => {
    const newTodo = input.value
    const newDesc = description.value

    if (!newTodo && !newDesc)
        return alert("No value: title and description for your task! ❌")
    else if (!newTodo)
        return alert("No value: title task! ❌")
    else if (!newDesc)
        return alert("No value: description ❌")

    todoList.push({
        text: newTodo,
        desc: newDesc,
        completed: false
    })

    localStorage.setItem("todos", JSON.stringify(todoList))

    input.value = ""
    description.value = ""

    render()
}

let dataTask = [{
    totalTask: 0,
    totalTaskChecked: 0,
    totalTaskUnchecked: 0
}]



sumTaskChecked.innerHTML = `${"Total task checked: " + "<b>" + dataTask[0].totalTask + "</b>"}`
localStorage.setItem('dataList', JSON.stringify(dataTask))


const render = () => {
    todo.innerHTML = null
    todoList = JSON.parse(localStorage.getItem("todos")) || []
    console.log(todoList)
    sumTask.innerHTML = `${"Total task: " + "<b>" + todoList.length + "</b>" + "</br>"}`

    for (let i = 0; i < todoList.length; i++){
        let li = document.createElement("li")
        li.classList.add("todolist")
        todo.appendChild(li)
        li.innerHTML = `${"▪ " + todoList[i].text }`

        let textDesc = document.createElement("p")
        textDesc.classList.add("desc")
        textDesc.innerHTML = `${todoList[i].desc}`
        todo.appendChild(textDesc)

        let div = document.createElement("div")
        div.classList.add("tools")

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.style.cursor = "pointer"
        div.appendChild(checkbox)

        let btn = document.createElement("button")
        let text = document.createTextNode("X")
        btn.classList.add("delBtn")
        btn.setAttribute("onclick", "deleteBtn("+ i +")")

        btn.appendChild(text)
        div.appendChild(btn)
        li.appendChild(div)

        if (todoList[i].completed == true) {
            li.classList.add("completed")
            li.classList.remove("uncompleted")
            textDesc.classList.add("completed")
            textDesc.classList.remove("uncompleted")
            checkbox.checked = todoList[i].completed
            dataTask[0].totalTaskChecked++
        } else if (todoList[i].completed == false){
            li.classList.add("uncompleted")
            li.classList.remove("completed")
            textDesc.classList.add("uncompleted")
            textDesc.classList.remove("completed")
            checkbox.checked = todoList[i].completed
            dataTask[0].totalTaskUnchecked++
        }
        
        checkbox.addEventListener("click", (event) => {
            todoList[i].completed = event.target.checked
            if (todoList[i].completed) {
                li.classList.add("completed")
                li.classList.remove("uncompleted")
                textDesc.classList.add("completed")
                textDesc.classList.remove("uncompleted")
                checkbox.checked = todoList[i].completed
            } else {
                li.classList.add("uncompleted")
                li.classList.remove("completed")
                textDesc.classList.add("uncompleted")
                textDesc.classList.remove("completed")
                checkbox.checked = todoList[i].completed
            }
            localStorage.setItem('todos', JSON.stringify(todoList))
        })
    }   
}

(() => {
    render()
})()
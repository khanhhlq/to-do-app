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

const input = document.createElement("input")
input.setAttribute("type", "text")
input.setAttribute("placeholder", "👉 Enter task")
form.appendChild(input)

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

    if (!newTodo) return alert("No value! ❌")
    todoList.push({
        text: newTodo,
        completed: false
    })

    localStorage.setItem("todos", JSON.stringify(todoList))

    input.value = ""

    render()
}

const render = () => {
    todo.innerHTML = null
    todoList = JSON.parse(localStorage.getItem("todos")) || []

    for (let i = 0; i < todoList.length; i++){
        let li = document.createElement("li")
        li.classList.add("todolist")
        todo.appendChild(li)
        li.innerHTML = `${todoList[i].text}`

        let div = document.createElement("div")
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

        if (todoList[i].completed) {
            li.classList.add("completed")
            li.classList.remove("uncompleted")
            checkbox.checked = todoList[i].completed
        } else{
            li.classList.add("uncompleted")
            li.classList.remove("completed")
            checkbox.checked = todoList[i].completed
        }
        
        checkbox.addEventListener("click", (event) => {
            todoList[i].completed = event.target.checked
            if (todoList[i].completed) {
                li.classList.add("completed")
                li.classList.remove("uncompleted")
                checkbox.checked = todoList[i].completed
            } else
                li.classList.add("uncompleted"),
                li.classList.remove("completed"),
                checkbox.checked = todoList[i].completed

            localStorage.setItem('todos', JSON.stringify(todoList))
        })

    }   
}

(() => {
    render()
})()
let tasksData = {};
const Todo = document.querySelector("#Todo");
const Progress = document.querySelector("#Progress");
const Done = document.querySelector("#Done");
columns = [Todo,Done,Progress];
let dragElemnt=null;
   


let data={};
if(localStorage.getItem("tasks"))  {
     data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data);

    for(const col in data){               //for in ka mtlb huaa jitana bhi data ke anadar property  hoga ushke uper loop chalega//
      // console.log(col,  data[ col ]);
      const column = document.querySelector(`#${col}`);
      data[col].forEach(Task =>{
        const div = document.createElement("div");
         
        div.classList.add("Task");
        div.setAttribute("draggable","true");

        div.innerHTML=`
       <h2>${Task.title}</h2>
       <p>${Task.desc}</p>
       <button>delete</button>
    `
      column.appendChild(div);

      div.addEventListener("drag",(e)=>{
        dragElemnt = div;
    })

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click",()=>{
        div.remove();
        updateTaskCount();
    })
      

    const tasks = column.querySelectorAll(".Task");
    const count =column.querySelector(".right");
    count.innerHTML =tasks.length;

    })
    }
}

console.log(Todo,Progress,Done);

const tasks =document.querySelectorAll('.Task');

tasks.forEach(Task =>{
    Task.addEventListener("drag" ,(e)=>{
        // console.log("dragging", e)
        dragElemnt=Task;
    })
})

// Progress.addEventListener("dragenter",(e) =>{
//     // console.log("drag the enter",e);
//     Progress.classList.add("hover-over");
// })

// Progress.addEventListener("dragleave" ,(e)=>{
//     Progress.classList.remove("hover-over");
// })
// Done.addEventListener("dragenter",(e) =>{
//     // console.log("drag the enter",e);
//     Done.classList.add("hover-over");
// })

// Done.addEventListener("dragleave" ,(e)=>{
//     Drogress.classList.remove("hover-over");
// })

// Todo.addEventListener("dragenter",(e) =>{
//     // console.log("drag the enter",e);
//     Todo.classList.add("hover-over");
// })

// Todo.addEventListener("dragleave" ,(e)=>{
//     Todo.classList.remove("hover-over");
// })

function addDragEventsOnColumn(column){
    column.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover",(e)=>{  //dragover means one column Element go to another column because browers do not allow one column to another column//
        e.preventDefault();
    })

    column.addEventListener("drop",(e)=>{
        e.preventDefault();
       

        column.appendChild(dragElemnt);
        column.classList.remove("hover-over");


       columns.forEach(col=>{

            const tasks = col.querySelectorAll(".Task");
            const Count = col.querySelector(".right");

            tasksData[col.id]=Array.from(tasks).map( t => {
                return{
                    title: t.querySelector("h2").innerText,
                    desc: t.querySelector("p").innerText

                }

            })

            localStorage.setItem("tasks",JSON.stringify(tasksData)) 
            Count.innerText = tasks.length;
        })

    
         

       
    })

}
addDragEventsOnColumn(Todo);
addDragEventsOnColumn(Progress);
addDragEventsOnColumn(Done);

// modal related logic
const ToggleModalButton =document.querySelector("#Toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton =document.querySelector("#Add-new-task");

ToggleModalButton.addEventListener("click",()=>{
     modal.classList.toggle("active")
     
})

modalBg.addEventListener("click",()=>{
    modal.classList.toggle("active");
})

addTaskButton.addEventListener("click",()=>{
   
     const tasktitle = document.querySelector("#task-title-input").value ;
     const taskdesc = document.querySelector("#task-desc-input").value;

    const div= document.createElement("div");
    div.classList.add("Task");
    div.setAttribute("draggable","true");

    document.querySelector("#task-title-input").value="";
    document.querySelector("#task-desc-input").value="";




    div.innerHTML=`
       <h2>${tasktitle}</h2>
       <p>${taskdesc}</p>
       <button>delete</button>
    `
    Todo.appendChild(div);

    columns.forEach(col=>{

            const tasks = col.querySelectorAll(".Task");
            const Count = col.querySelector(".right");

            tasksData[col.id]=Array.from(tasks).map( t => {
                return{
                   title: t.querySelector("h2").innerText,
                    desc: t.querySelector("p").innerText

                }

            })

            localStorage.setItem("tasks",JSON.stringify(tasksData)) 
            Count.innerText = tasks.length;
        })



     div.addEventListener("drag",(e)=>{
        dragElemnt=div;
    })

    modal.classList.remove("active");



})


// modal related logic








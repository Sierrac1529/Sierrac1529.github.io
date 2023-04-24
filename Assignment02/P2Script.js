

			document.addEventListener('DOMContentLoaded', function(){

				const taskList = {
        				"taskArray": []
        
					}
				let array = taskList.taskArray;


				document.querySelector("#newTask").onsubmit = function(){

					//check radio buttons 
					let compBool;

					if(document.getElementById('pending').checked == true) {
						compBool = document.getElementById('pending').value;}
					if(document.getElementById('completed').checked == true) {
						compBool = document.getElementById('completed').value;}



					//create variables
					const li = document.createElement('li');
					let ttitle = document.querySelector('#tasktitle').value;
					let tprio = document.querySelector('#taskPriority').value;



					//remove & complete button
					let task_text = ttitle +" - " + tprio + ", " + compBool;
					let complete_html=``;

					

					if (document.getElementById('pending').checked == true){
						complete_html= `
						<button class="complete"> Complete </button>
						`
					}


					let new_task_html= `
					<span> ${task_text} </span>
					<button class="remove"> Remove </button>
					`

				
					//add task to list
					if (document.getElementById('completed').checked == true){
							new_task_html= `
							<span><s> ${task_text} </s></span>
							<button class="remove"> Remove </button>
							`
					}

					li.innerHTML = new_task_html + complete_html;
					document.querySelector('#tasks_list').append(li);
					

					// create the task object 

					const taskData = {
						"task": {
							"title": ttitle,
							"priority": tprio,
							"status": compBool
						}

					}

					//put the object into an array and show in console
					taskList['taskArray'].push(taskData.task);
						console.log(array);

					//reset form
					document.querySelector('#tasktitle').value = '';
					document.querySelector('#taskPriority').value = 'Low Priority';
					return false;
				}


				//Remove & Complete button functions
				document.addEventListener('click', function(event){
					element = event.target;

					//Remove button
					if (element.className === 'remove'){

						//get title of task
						var t = element.parentElement.firstElementChild.innerText;
						let firstWord = t.split(" ")[0];

						//get the set from the array
						function isName(name) {
 			 				return name.title === firstWord;
 			 			}

						let check = array.find(isName);


						//get index of set in the array
						const item = (element) => element==check;
						let i = array.findIndex(item);


						//remove from array and show in console
						array.splice(i);
						console.log(array);
        					

        				//remove from list
						element.parentElement.remove();
				
						}


					//complete button
					if (element.className === 'complete'){

						//get title of task
						var t = element.parentElement.firstElementChild.innerText;
						let firstWord = t.split(" ")[0];
			

						//get the set from the array
						function isName(name) {
 			 				return name.title === firstWord;
 			 			}

						let check = array.find(isName);



						//edit array to completed
						delete check.status;
						check.status = "Completed";


						//read elements from array
						let n = check.title;
						let p = check.priority;
						let s = check.status;



						//rewrite list item with remove button
						console.log(element.parentElement);
						let rewrite = n +" - " + p + ", " + s;
						element.parentElement.remove();

						const li = document.createElement('li');
						let rewrite_html= `
							<span><s> ${rewrite} </s></span>
							<button class="remove"> Remove </button>
						`

						li.innerHTML = rewrite_html;
						document.querySelector('#tasks_list').append(li);

						



					}
				

				})



			})
			 

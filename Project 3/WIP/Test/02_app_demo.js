// File : 02_app_demo.js
//
//


// The questions array represents the model of the applications. 
// In the demo code the model is hard-coded; However, in 
// a real application the model will be loaded from a RESTFUL API.

//define the API request

let Java_api='https://my-json-server.typicode.com/Sierrac1529/Project3Java/Javaquestions'

let HTML_api = 'https://my-json-server.typicode.com/Sierrac1529/Project3HTML/HTMLquestions';

let HTML_schema = {
  results: []
};

let Java_schema = {
  results: []
};

let answered = 0;
let score = 0;
let seconds = 0;


const request = new XMLHttpRequest();
request.open('GET', HTML_api);

request.onload = function() {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    HTML_schema.results = data;
    console.log(HTML_schema);
  }
};


request.open('GET', Java_api);

request.onload = function() {
  if (request.status === 200) {
    const jdata = JSON.parse(request.responseText);
    Java_schema.results = jdata;
    console.log(Java_schema);
  }
};

request.send();




// appState, keep information about the State of the application.
const appState = {
    current_view : "#intro_view",
    current_question : -1,
    current_model : {}
}

//
// Start: begin the applications.
//

document.addEventListener('DOMContentLoaded', () => {
  // Set the state
  appState.current_view =  "#intro_view";
  appState.current_model = {
    action : "Start"
  }
  update_view(appState);

  //
  // EventDelegation - handle all events of the widget
  //

let qType;
  document.querySelector("#widget_view").onclick = (e) => {
    
      handle_widget_event(e)
  }
});


function update_view(appState) {


    const HTML_element = render_widget(appState.current_model, appState.current_view)
    document.querySelector("#widget_view").innerHTML = HTML_element;

    document.querySelector("#tot").innerHTML = ""+score;
    document.querySelector("#qa").innerHTML = ""+answered;
  }

  const render_widget = (model,view) => {
    // Get the template HTML
    template_source = document.querySelector(view).innerHTML
    // Handlebars compiles the above source into a template
    var template = Handlebars.compile(template_source);

    // apply the model to the template.
    var HTML_widget_element = template({...model,...appState})

    return HTML_widget_element
  }


//HTML QUESTIONS

let db = HTML_schema;
if(qType=="HTML"){db = HTML_schema};
if(qType=="Java"){db = Java_schema};


 function setQuestionView(appState) {

        //HTML questions
          if (qType=="HTML") {
            if (appState.current_question == HTML_schema.results.length) {
              appState.current_view  = "#end_view";
              return
            }

            if (appState.current_model.questionType == "mc"){
              appState.current_view = "#question_view_mc";}


            if (appState.current_model.questionType == "true_false"){
              appState.current_view = "#question_view_true_false";}
            if (appState.current_model.questionType == "text_input") {
              appState.current_view = "#question_view_text_input";
              
          }
            
          }

        //Java questions
        if (qType=="Java") {
            if (appState.current_question == Java_schema.results.length) {
              appState.current_view  = "#end_view";
              return
            }

            if (appState.current_model.questionType == "mc"){
              appState.current_view = "#question_view_mc";}



            if (appState.current_model.questionType == "true_false"){
              appState.current_view = "#question_view_true_false";}

            if (appState.current_model.questionType == "text_input") {
              appState.current_view = "#question_view_text_input";
          }



        }
      }

 function check_user_response(user_answer, model) {
        answered = answered+ 1;
        if (user_answer == model.correctAnswer) {
            alert('Good Job!');
            score = score+1;
            return true;
          }

        if (user_answer != model.correctAnswer){
          let exp = model.explanation;
          alert('Incorrect. ' + exp);
          return false;}

        }

 function updateQuestion(appState) {


      //HTML questions
      if(qType=="HTML"){
        if (appState.current_question < HTML_schema.results.length-1) {
          appState.current_question =   appState.current_question + 1;
          appState.current_model = HTML_schema.results[appState.current_question];
        }
        else {
          appState.current_question = -2;
          appState.current_model = {};
        }
      }

        //Java questions
        if(qType=="Java"){
          if (appState.current_question < Java_schema.results.length-1) {
            appState.current_question =   appState.current_question + 1;
            appState.current_model = Java_schema.results[appState.current_question];
          }
          else {
            appState.current_question = -2;
            appState.current_model = {};
          }
        }
      }



function handle_widget_event(e) {
  
  //for introduction view
    if (appState.current_view == "#intro_view"){
      qType = document.querySelector('#quizType').value;
      console.log(qType);
      if (qType == "HTML"){
        if (e.target.dataset.action == "Start") {
          document.getElementById("total").style.color = "black";
          document.getElementById("tot").style.color = "black";
          document.getElementById("time").style.color = "black";
          document.getElementById("score").style.color = "black";
          document.getElementById("clock").style.color = "black"

         
          let timer = setInterval(function() {
            seconds++;
            //console.log(seconds);
            document.querySelector("#clock").innerHTML = seconds + " seconds";
          }, 1400);



          // Update State (current model + state variables)
          appState.current_question = 1;
          
          appState.current_model = HTML_schema.results[appState.current_question];
          console.log(appState);
          // process the appState, based on question type update appState.current_view
          setQuestionView(appState);
         
          // Now that the state is updated, update the view.

          update_view(appState);
        }

      }


      if (qType == "Java"){
        if (e.target.dataset.action == "Start") {
          document.getElementById("total").style.color = "black";
          document.getElementById("tot").style.color = "black";
          document.getElementById("time").style.color = "black";
          document.getElementById("score").style.color = "black";
          document.getElementById("clock").style.color = "black"

         
          let timer = setInterval(function() {
            seconds++;
            //console.log(seconds);
            document.querySelector("#clock").innerHTML = seconds + " seconds";
          }, 1400);



          // Update State (current model + state variables)
          appState.current_question = 1;
          
          appState.current_model = Java_schema.results[appState.current_question];
          console.log(appState);
          console.log("model: "+appState.current_model);
          // process the appState, based on question type update appState.current_view
          setQuestionView(appState);
         
          // Now that the state is updated, update the view.

          update_view(appState);
        }
        
      }
    }

    if (qType == "HTML"){
      // Handle the answer event.
      if (appState.current_view == "#question_view_true_false") {

        if (e.target.dataset.action == "answer") {
           // Controller - implement logic.
           isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
            console.log(isCorrect);


           // Update the state.
           updateQuestion(appState);


           //appState.current_question =   appState.current_question + 1;
          appState.current_model = HTML_schema.results[appState.current_question];
          console.log(appState.current_model);

          setQuestionView(appState);
          update_view(appState);

        }
      }

       // Handle answer event for  text questions.
      if (appState.current_view == "#question_view_text_input") {
        if (e.target.dataset.action == "submit") {

          user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
          isCorrect = check_user_response(user_response, appState.current_model);
          console.log(isCorrect);

          updateQuestion(appState);
         
          
          appState.current_model = HTML_schema.results[appState.current_question];
          console.log(appState.current_model);

          setQuestionView(appState);
          update_view(appState);
        }
      }

        // Handle answer event for  text questions.
      if (appState.current_view == "#end_view") {
        if (e.target.dataset.action == "start_again") {
          appState.current_view =  "#intro_view";
          appState.current_model = {
            action : "Start"
          }
          update_view(appState);

        }
      }
    }

    if (qType == "Java"){
      // Handle the answer event.
      if (appState.current_view == "#question_view_true_false") {

        if (e.target.dataset.action == "answer") {
           // Controller - implement logic.
           isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
            console.log(isCorrect);


           // Update the state.
           updateQuestion(appState);


           //appState.current_question =   appState.current_question + 1;
          appState.current_model = Java_schema.results[appState.current_question];
          console.log(appState.current_model);

          setQuestionView(appState);
          update_view(appState);

        }
      }


      if (appState.current_view == "#question_view_mc") {

        if (e.target.dataset.action == "answer") {
           // Controller - implement logic.
           isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
            console.log(isCorrect);


           // Update the state.
           updateQuestion(appState);


           //appState.current_question =   appState.current_question + 1;
          appState.current_model = Java_schema.results[appState.current_question];
          console.log(appState.current_model);

          setQuestionView(appState);
          update_view(appState);

        }
      }




       // Handle answer event for  text questions.
      if (appState.current_view == "#question_view_text_input") {
        if (e.target.dataset.action == "submit") {

          user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
          isCorrect = check_user_response(user_response, appState.current_model);
          console.log(isCorrect);

          updateQuestion(appState);
         
          
          appState.current_model = Java_schema.results[appState.current_question];
          console.log(appState.current_model);

          setQuestionView(appState);
          update_view(appState);
        }
      }

        // Handle answer event for  text questions.
      if (appState.current_view == "#end_view") {
        if (e.target.dataset.action == "start_again") {
          appState.current_view =  "#intro_view";
          appState.current_model = {
            action : "Start"
          }
          update_view(appState);

        }
      }
    }
}


  
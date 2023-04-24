// File : 02_app_demo.js
//
//


// The questions array represents the model of the applications. 
// In the demo code the model is hard-coded; However, in 
// a real application the model will be loaded from a RESTFUL API.

const questions = [
  {
    questionType : "true_false",
    questionText : "2+2 = 4",
    correctAnswer : "true",
    options : ["true", "false"],
  },
  {
    questionType : "text_input",
    questionText : "What is the value of the expression 1+1",
    correctAnswer : "2",
    answerFieldId : "answer_to_question"
  },
  {
    questionType : "true_false",
    questionText : "Is 18 even or odd?",
    correctAnswer : "even",
    options : ["even", "odd"],
  },
  {
    questionType : "true_false",
    questionText : "The square root of 36 is 4.",
    correctAnswer : "false",
    options : ["true", "false"]
  }
]




const geoQuestions =[
  {
    questionType : "true_false",
    questionText : "Paris is in Italy.",
    correctAnswer : "false",
    options : ["true", "false"],
  },
  {
    questionType : "text_input",
    questionText : "Is London located in England or Germany?",
    correctAnswer : "England",
    answerFieldId : "answer_to_question"
  }]




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






function handle_widget_event(e) {
  
  //for introduction view
    if (appState.current_view == "#intro_view"){
      qType = document.querySelector('#quizType').value;
      if (qType == "Math"){
        if (e.target.dataset.action == "Start") {
          document.getElementById("total").style.color = "black";
          document.getElementById("time").style.color = "black";
          document.getElementById("score").style.color = "black";

          // Update State (current model + state variables)
          appState.current_question = 0
          appState.current_model = questions[appState.current_question];
          // process the appState, based on question type update appState.current_view
          setQuestionView(appState);
         
          // Now that the state is updated, update the view.

          update_view(appState);
        }
      }


      if (qType == "Geography"){ 
        if (e.target.dataset.action == "Start") {
        document.getElementById("total").style.color = "black";
        document.getElementById("time").style.color = "black";
        document.getElementById("score").style.color = "black";
        // Update State (current model + state variables)
        appState.current_question = 0
        appState.current_model = geoQuestions[appState.current_question];
        // process the appState, based on question type update appState.current_view
        setQuestionView(appState);
         
        // Now that the state is updated, update the view.

         update_view(appState);
       }
      }
    }

    if (qType == "Math"){
      // Handle the answer event.
      if (appState.current_view == "#question_view_true_false") {

        if (e.target.dataset.action == "answer") {
           // Controller - implement logic.
           isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
         
           // Update the state.
           appState.current_question =   appState.current_question + 1;
           appState.current_model = questions[appState.current_question];
           setQuestionView(appState);
         
           // Update the view.  
           update_view(appState);

        }
      }

       // Handle answer event for  text questions.
      if (appState.current_view == "#question_view_text_input") {
        if (e.target.dataset.action == "submit") {
         
          user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
          isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
          updateQuestion(appState)
          //appState.current_question =   appState.current_question + 1;
          //appState.current_model = questions[appState.current_question];
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

    if (qType == "Geography"){

    // Handle the answer event.
    if (appState.current_view == "#question_view_true_false") {

      if (e.target.dataset.action == "answer") {
         // Controller - implement logic.
         isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
       
         // Update the state.
         appState.current_question =   appState.current_question + 1;
         appState.current_model = geoQuestions[appState.current_question];
         setQuestionView(appState);
       
         // Update the view.  
         update_view(appState);

      }
    }

    // Handle answer event for  text geoQuestions.
    if (appState.current_view == "#question_view_text_input") {
      if (e.target.dataset.action == "submit") {
        user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
        isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
        updateQuestion(appState)
        //appState.current_question =   appState.current_question + 1;
        //appState.current_model = geoQuestions[appState.current_question];
        setQuestionView(appState);
        update_view(appState);
      }
    }

      // Handle answer event for  text geoQuestions.
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
// end of handle_widget_event



// MATH QUESTIONS //

if (qType == "Math") {
    function check_user_response(user_answer, model) {
      if (user_answer == model.correctAnswer) {
        function correct() {
          alert('Good Job!');
        }
        
        return true;
      }
      function wrong() {
        alert('Incorrect.');
      }
      
      return false;
    }

    function updateQuestion(appState) {
        if (appState.current_question < questions.length-1) {
          appState.current_question =   appState.current_question + 1;
          appState.current_model = questions[appState.current_question];
        }
        else {
          appState.current_question = -2;
          appState.current_model = {};
        }
    }

    function setQuestionView(appState) {
      if (appState.current_question == questions.length-1) {
        appState.current_view  = "#end_view";
        return
      }

      if (appState.current_model.questionType == "true_false")
        appState.current_view = "#question_view_true_false";
      else if (appState.current_model.questionType == "text_input") {
        appState.current_view = "#question_view_text_input";
      }
    }



    function update_view(appState) {

    const html_element = render_widget(appState.current_model, appState.current_view)
    document.querySelector("#widget_view").innerHTML = html_element;
    }
  //

    const render_widget = (model,view) => {
    // Get the template HTML
    template_source = document.querySelector(view).innerHTML
    // Handlebars compiles the above source into a template
    var template = Handlebars.compile(template_source);

    // apply the model to the template.
    var html_widget_element = template({...model,...appState})

    return html_widget_element
   }
}

// GEOGRAPHY QUESTIONS //

if (qType == "Geography") {


  function G_check_user_response(user_answer, model) {
    if (user_answer == model.correctAnswer) {
      function correct() {
        alert('Good Job!');
      }
      return true;
    }
    function wrong() {
      alert('Incorrect.');
    }
    setTimeout(wrong, 1000);
    return false;
  }

  function G_updateQuestion(appState) {
      if (appState.current_question < geoQuestions.length-1) {
        appState.current_question =   appState.current_question + 1;
        appState.current_model = geoQuestions[appState.current_question];
      }
      else {
        appState.current_question = -2;
        appState.current_model = {};
      }
  }

  function G_setQuestionView(appState) {
    if (appState.current_question == geoQuestions.length-1) {
      appState.current_view  = "#end_view";
      return
    }

    if (appState.current_model.questionType == "true_false")
      appState.current_view = "#question_view_true_false";
    else if (appState.current_model.questionType == "text_input") {
      appState.current_view = "#question_view_text_input";
    }
  }

}

  function update_view(appState) {

    const html_element = render_widget(appState.current_model, appState.current_view)
    document.querySelector("#widget_view").innerHTML = html_element;
  }
  //

  const render_widget = (model,view) => {
    // Get the template HTML
    template_source = document.querySelector(view).innerHTML
    // Handlebars compiles the above source into a template
    var template = Handlebars.compile(template_source);

    // apply the model to the template.
    var html_widget_element = template({...model,...appState})

    return html_widget_element
  }
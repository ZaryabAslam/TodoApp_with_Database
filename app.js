var list = document.getElementById("List");

function addtask(){
    var input = document.getElementById("input");

    var key = firebase.database().ref('todos').push().key;
    var todo = {
        name:  input.value,
        key: key
    }
    firebase.database().ref('todo').child(key).set(todo)
    
    input.value= "";

}

//function to retrieve daat from database           

firebase.database().ref('todo').on('child_added',function(data){
    var li = document.createElement("li");
    var text = document.createTextNode(data.val().name); //here wea re taking input not from input box directly but input is giving data to firebase and we are retrieving data from firebase
    li.appendChild(text);
    list.appendChild(li);


    var dlt = document.createElement("button");
    var dlttext = document.createTextNode("DELETE");
    dlt.appendChild(dlttext);
    li.appendChild(dlt);
    var edit = document.createElement("button");
    var edittext = document.createTextNode("EDIT");
    edit.appendChild(edittext);
    li.appendChild(edit);
    dlt.setAttribute("onclick","dlt(this)")
    dlt.setAttribute("class","dltbtn")
    dlt.setAttribute("id",data.val().key)//it will store particular key for particular button which will be used to dlt that data
    edit.setAttribute("onclick","edt(this)")
    edit.setAttribute("class","editbtn")
    edit.setAttribute("id",data.val().key)//it will store particular key for particular button which will be used to edit that data
    li.setAttribute("class","lii")
})
function dlt(e){ // by passing e as parameter and giving this in the class function we can call the actual button
    firebase.database().ref('todo').child(e.id).remove() // this line is for remove from db and line beneath it is for remove from user interface. (e.id) contains particular key for which we are deleting
    e.parentNode.remove()   //remove() is a function used to remove nodes. 
}
function edt(e){
    // console.log(e.parentNode.firstChild.nodeValue)
    var newvalue = prompt("enter new task",e.parentNode.firstChild.nodeValue)
    var edittodo = {
        name: newvalue,
        key: e.id
    }
    firebase.database().ref('todo').child(e.id).set(edittodo)
    e.parentNode.firstChild.nodeValue = newvalue;
}
function dltAll(){
    list.innerHTML = ""
}

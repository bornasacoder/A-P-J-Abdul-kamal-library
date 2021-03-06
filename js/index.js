console.log("welcome to A.P.J abdul kalam library");

// constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// display constructor
function Display() {

}

// add methods to display prototype
Display.prototype.add = function (Book) {
    console.log("adding to UI");
  let tablebody = document.getElementById('tablebody');
    let uistring = `<tr> 
                            <td>${Book.name}</td>
                             <td>${Book.author}</td>
                            <td>${Book.type}</td>
                        </tr>`;
    tablebody.innerHTML += uistring;
}
// implement the clear function
Display.prototype.clear = function () {
    let libraryform = document.getElementById('libraryform');
    libraryform.reset();
}
// implement the validate function
Display.prototype.validate = function (book) {
   if(book.name.length < 2 || book.author.length < 2){
       return false;
   }else{
       return true;
   }
  }
Display.prototype.show = function(type,displaymessage){
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong> Message : </strong> ${displaymessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
                        setTimeout(function(){
                            message.innerHTML = ''
                        },2000);

}



//add submit event listener to library form
  libraryform = document.getElementById('libraryform');
libraryform.addEventListener('submit', libraryfromsubmit);

function libraryfromsubmit(e) {
    console.log('you havs submiited the library form');
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let science = document.getElementById('science');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (science.checked) {
        type = science.value;
    }

    let book = new Book(name, author, type);
    e.preventDefault();
    let display = new Display();
    if(display.validate(book)){

        display.add(book);
        display.clear();
        display.show('success','your book has been successfully added');
    }else{
        // show error to the user
        display.show('danger','Sorry you cannot add this book');
    }
    console.log(book);
}
console.log("this is es6 version of project 2");
class Book{
    constructor(name,author,type){
        this.name = name;
        this.author = author;
        this.type = type;

    }
}
class Display {
    add(Book) {
        console.log("adding to UI");
        let library = localStorage.getItem("library");
        if(library == null){
            libraryobj = [];
        }else{
            libraryobj = JSON.parse(library);
        }
      let tablebody = document.getElementById('tablebody');
      let uistring = "";
       libraryobj.forEach(function(element,index){
           
                    uistring += `<tr> 
                                   <td>${element.bookname}</td>
                                    <td>${element.authorname}</td>
                                   <td>${element.category}</td>
                               </tr>`;
       });
        if(libraryobj.length != 0){
            tablebody.innerHTML = uistring;
        }else{
            tablebody.innerHTML = `nothing to show ! add a book in a library`;
        }
    }
    clear() {
        let libraryform = document.getElementById('libraryform');
        libraryform.reset();
    }
    validate(book) {
        if(book.name.length < 2 || book.author.length < 2){
            return false;
        }else{
            return true;
        }
       }
    show(type,displaymessage){
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
    
}
//add submit event listener to library form
let libraryform = document.getElementById('libraryform');
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
    let library = localStorage.getItem("library");
    if(library == null){
        libraryobj = [];
    }else{
        libraryobj = JSON.parse(library);
    }
    let mylibrary = {
        bookname: name,
        authorname: author,
        category: type
    }
    console.log(mylibrary);
    libraryobj.push(mylibrary);
    localStorage.setItem("library",JSON.stringify(libraryobj));
    
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
    name = "";
    author = "";
    console.log(book);
}
import React, {Component} from "react";

export default class Saved extends Component {
    constructor(props){
        super(props);

        this.state = {
        	books:[]
        }

        this.getBooks = this.getBooks.bind(this)

    }

    componentDidMount(){
    	this.getBooks()
    }

    getBooks(){
    	var cls = this;
    	var url = "http://localhost:3009/api/books"
    	fetch(url)
    	.then(res => res.json())
    	.then((results) => {
    		console.log('results', results)
    		cls.setState({books:results})
    	});
    }

    deleteBook(id, e){

    	var url = "http://localhost:3009/api/books/" + id
    	fetch(url,{
            method: 'DELETE', 
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (result.msg == 'success'){
                    alert("Book was successfuly deleted!")
                } else {
                    alert("Deleting book was unsuccessful...")
                }
            })

    }

    render(){
        return (
        	<div>
        		<h1>saved</h1>
        		{   
                    this.state.books.map(function(book, index){
                        return (
                            <div>
                                <p>{book.title}</p>
                                <img src={book.image}></img>
                                <p>{book.authors}</p>
                                <p>{book.description}</p>
                                <a href={book.link}>book link</a>
                                <button onClick={this.deleteBook.bind(this, book._id)}>delete</button>
                            </div>
                        )
                    }, this)
                }
        	</div>
        	)
    }
}
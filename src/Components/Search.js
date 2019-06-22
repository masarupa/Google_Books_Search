import React, {Component} from "react";

export default class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            query:"",
            results:[]
        }

        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.saveBook = this.saveBook.bind(this);
    }
    submit(e){
 
        var url = "https://www.googleapis.com/books/v1/volumes?q="+ this.state.query
        var cls = this;
        
        fetch(url)
        .then(res => res.json())
        .then((result) => {
            var results = []
            result.items.forEach(function(item, index){

            results.push({
                title:item.volumeInfo.title,
                authors:item.volumeInfo.authors,
                description:item.volumeInfo.description,
                image:item.volumeInfo.imageLinks.thumbnail,
                link:item.selfLink,
            })
            cls.setState({results:results})
            })
        });

        e.preventDefault();
    }

    onChange(e){
        this.setState({query: e.target.value})

    }

    saveBook(index, e){

        var data = this.state.results[index]
        var url = "http://localhost:3009/api/books"

        fetch(url,{
            method: 'POST', 
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (result.msg == 'success'){
                    alert("Book was successfuly saved!")
                } else {
                    alert("Saving book was unsuccessful...")
                }
            })
    }

    render(){
        
        return (
            <div>
                <h1>search</h1>
                <form onSubmit={this.submit}>
                    <input onChange={this.onChange}></input>
                    <input type="submit" value="Submit"></input>
                </form>
                
                <h1>results</h1>
                {   
                    this.state.results.map(function(book, index){
                        return (
                            <div>
                                <p>{book.title}</p>
                                <img src={book.image}></img>
                                <p>{book.authors}</p>
                                <p>{book.description}</p>
                                <a href={book.link}>book link</a>
                                <button onClick={this.saveBook.bind(this, index)} i={index}>save</button>
                            </div>
                        )
                    }, this)
                }
            </div>
            


        )
    }
}
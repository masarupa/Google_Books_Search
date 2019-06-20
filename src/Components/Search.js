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
        
    }
    submit(e){
        console.log("submit")
        console.log(this.state.query)
        var url = "https://www.googleapis.com/books/v1/volumes?q="+ this.state.query
        var cls = this;
        fetch(url).then(
         res => res.json()
     ).then((result) => {
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
        }
        )


         console.log(result)
     });

     e.preventDefault();
    }

    onChange(e){
        this.setState({query: e.target.value})

    }

    renderResults(){
        console.log("results")
        return this.state.results
    }

    render(){
        
        return (
            <div>
            <form onSubmit={this.submit}>
            <input onChange={this.onChange}></input>
            <input type="submit" value="Submit"></input>
            </form>
            results
            {this.state.results.map(function(book, index){
                return (
                    <div>
                    <p>{book.title}</p>
                    <img src={book.image}></img>
                    <p>{book.authors}</p>
                    <p>{book.description}</p>
                    <a href={book.link}>book link</a>
                    <button>save</button>
                    </div>
                )
            })}
            </div>
            


        )
    }
}